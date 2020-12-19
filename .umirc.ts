import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {},
  routes: [
    {
      exact: true,
      path: '/login',
      component: '@/pages/Login',
    },
    {
      path: '/',
      component: '@/layouts',
      routes: [
        {
          exact: true,
          path: '/',
          redirect: '/dashboard',
        },
        // 仪表盘
        {
          exact: true,
          path: '/dashboard',
          component: '@/pages/Dashboard',
        },
        // 商家管理
        {
          exact: true,
          path: '/manage-merchants',
          component: '@/pages/Manage_Merchants',
        },
        // 用户管理
        {
          exact: true,
          path: '/manage-user',
          component: '@/pages/Manage_User',
        },
        // BD管理
        {
          exact: true,
          path: '/manage-bd',
          component: '@/pages/Manage_BD',
        },
        { path: '*', component: '@/pages/404' },
      ],
    },
    
  ],
});
