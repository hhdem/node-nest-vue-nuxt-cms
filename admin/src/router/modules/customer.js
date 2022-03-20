import Layout from '@/layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  redirect: '/customer/list',
  name: 'Customer',
  meta: {
    title: 'customer',
    icon: 'list',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/customer/list'),
      name: 'CustomerListManagement',
      meta: { title: 'customerListManagement', noCache: true },
    },
    {
      path: 'create',
      component: () => import('@/views/customer/create'),
      name: 'CustomerCreate',
      breadcrumb: false,
      meta: { title: 'customerCreate', noCache: true },
    },
    {
      path: 'update',
      component: () => import('@/views/customer/update'),
      hidden: true,
      name: 'CustomerUpdate',
      breadcrumb: false,
      meta: { title: 'customerUpdate', noCache: true },
    },
  ],
}
export default customerRouter
