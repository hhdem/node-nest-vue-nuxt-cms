import defu from 'defu'
import destr from 'destr'
import KY from 'ky'

class HTTP {
  constructor(defaults, ky = KY) {
    this._defaults = {
      hooks: {},
      ...defaults
    }

    this._ky = ky
  }

  getBaseURL () {
    return this._defaults.prefixUrl
  }

  setBaseURL (baseURL) {
    this._defaults.prefixUrl = baseURL
  }

  setHeader(name, value) {
    if (!value) {
      delete this._defaults.headers[name];
    } else {
      this._defaults.headers[name] = value
    }
  }

  setToken(token, type) {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value)
  }

  _hook(name, fn) {
    if (!this._defaults.hooks[name]) {
      this._defaults.hooks[name] = []
    }
    this._defaults.hooks[name].push(fn)
  }

  onRequest(fn) {
    this._hook('beforeRequest', fn)
  }

  onRetry(fn) {
    this._hook('beforeRetry', fn)
  }

  onResponse(fn) {
    this._hook('afterResponse', fn)
  }

  onError(fn) {
    this._hook('onError', fn)
  }

  create(options) {
    const { retry, timeout, prefixUrl, headers } = this._defaults

    return createHttpInstance(defu(options, { retry, timeout, prefixUrl, headers }))
  }
}

for (let method of ['get', 'head', 'delete', 'post', 'put', 'patch']) {
  const hasBody = ['post', 'put', 'patch'].includes(method)

  HTTP.prototype[method] = async function (url, arg1, arg2) {
    let options

    if (!hasBody) {
      options = arg1
    } else {
      options = arg2 || {}
      if (arg1 !== undefined) {
        if (arg1.constructor === Object || Array.isArray(arg1)) {
          options.json = arg1
        } else {
          options.body = arg1
        }
      }
    }

    const _options = { ...this._defaults, ...options }

    if (/^https?/.test(url)) {
      delete _options.prefixUrl
    } else if (_options.prefixUrl && typeof url === 'string' && url.startsWith('/')) {
      // Prevents `ky` from throwing "`input` must not begin with a slash when using `prefixUrl`"
      url = url.substr(1)
    }

    try {
      const response = await this._ky[method](url, _options)
      return response
    } catch (error) {
      // Try to fill error with useful data
      if (error.response) {
        error.statusCode = error.response.status
        try {
          const text = await error.response.text()
          error.response.text = () => Promise.resolve(text)
          const json = destr(text)
          error.response.json = () => Promise.resolve(json)
          error.response.data = json
        } catch (_) { }
      }

      // Call onError hook
      if (_options.hooks.onError) {
        for (const fn of _options.hooks.onError) {
          const res = fn(error)
          if (res !== undefined) {
            return res
          }
        }
      }

      // Throw error
      throw error
    }
  }

  HTTP.prototype['$' + method] = function (url, arg1, arg2) {
    return this[method](url, arg1, arg2)
      .then(response => (response && response.text) ? response.text() : response)
      .then(body => destr(body))
  }
}

const createHttpInstance = options => {
  // Create new HTTP instance
  const http = new HTTP(options)

  // Setup interceptors

  return http
}

export default (ctx, inject) => {
  // runtimeConfig
  const runtimeConfig = ctx.$config && ctx.$config.http || {}

  // prefixUrl
  const prefixUrl = process.browser
      ? (runtimeConfig.browserBaseURL || 'https://www.chengbaoyimin.com/')
      : (runtimeConfig.baseURL || process.env._HTTP_BASE_URL_ || 'https://www.chengbaoyimin.com/')

  const headers = {}

  // Defaults
  const defaults = {
    retry: 0,
    timeout: process.server ? false : false,
    prefixUrl,
    headers
  }

  // Proxy SSR request headers headers
  if (process.server && ctx.req && ctx.req.headers) {
    const reqHeaders = { ...ctx.req.headers }
    for (let h of ["accept","host","cf-ray","cf-connecting-ip","content-length","content-md5","content-type"]) {
      delete reqHeaders[h]
    }
    defaults.headers = { ...reqHeaders, ...defaults.headers }
  }

  if (process.server) {
    // Don't accept brotli encoding because Node can't parse it
    defaults.headers['accept-encoding'] = 'gzip, deflate'
  }

  const http = createHttpInstance(defaults)

  // Inject http to the context as $http
  ctx.$http = http
  inject('http', http)
}
