import Layout from '@/layout'

const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article/list',
  name: 'Article',
  meta: {
    title: 'article',
    icon: 'list',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/article/list'),
      name: 'ArticleListManagement',
      meta: { title: 'articleListManagement', noCache: true },
    },
    {
      path: 'create',
      component: () => import('@/views/article/create'),
      name: 'ArticleCreate',
      breadcrumb: false,
      meta: { title: 'articleCreate', noCache: true },
    },
    {
      path: 'update',
      component: () => import('@/views/article/update'),
      hidden: true,
      name: 'ArticleUpdate',
      breadcrumb: false,
      meta: { title: 'articleUpdate', noCache: true },
    },
  ],
}
export default articleRouter
