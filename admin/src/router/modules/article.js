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
    // 分类
    {
      path: 'category/list',
      component: () => import('@/views/article/category/list'),
      name: 'CategoryManagement',
      meta: { title: 'categoryManagement', noCache: true },
    },
    {
      path: 'category/create',
      component: () => import('@/views/article/category/create'),
      hidden: true,
      name: 'ArticleCategoryCreate',
      breadcrumb: false,
      meta: { title: 'articleCategoryCreate', noCache: true },
    },
    {
      path: 'category/update',
      component: () => import('@/views/article/category/update'),
      hidden: true,
      name: 'ArticleCategoryUpdate',
      breadcrumb: false,
      meta: { title: 'articleCategoryUpdate', noCache: true },
    },
  ],
}
export default articleRouter
