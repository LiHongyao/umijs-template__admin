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
        // 交易流水
        {
          exact: true,
          path: '/deal-flow',
          component: '@/pages/DealFlow',
        },
        // BD管理
        {
          exact: true,
          path: '/manage-bd',
          component: '@/pages/Manage_BD',
        },
        // 资金结算
        {
          exact: true,
          path: '/capital-settlement',
          component: '@/pages/CapitalSettlement',
        },
        { path: '*', component: '@/pages/404' },
      ],
    },
  ],
});
