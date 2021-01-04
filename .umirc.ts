/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-19 17:24:26
 * @LastEditTime: 2021-01-04 15:55:17
 * @LastEditors: Li-HONGYAO
 * @Description: 路由
 * @FilePath: /umijs-template__admin/.umirc.ts
 */

// ref: https://umijs.org/zh-CN/config

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {},
  ignoreMomentLocale: true,
  dynamicImport: {
    loading: '@/Loading',
  },
  hash: true,
  history: { type: 'browser' },
  routes: [
    { path: '/login', component: '@/pages/Login' }, // 登录
    {
      path: '/',
      component: '@/layouts',
      routes: [
        { path: '/', redirect: '/index' },
        { path: '/index', component: '@/pages/Dashboard' }, // 仪表盘
        { path: '/manage-merchants', component: '@/pages/Manage_Merchants' }, // 商家管理
        { path: '/manage-user', component: '@/pages/Manage_User' }, // 用户管理
        { path: '/deal-flow', component: '@/pages/DealFlow' }, // 交易流水
        { path: '/manage-bd', component: '@/pages/Manage_BD' }, // BD管理
        { path: '/capital-settlement', component: '@/pages/CapitalSettlement' }, // 资金结算
        { path: '*', component: '@/pages/404' }, // 404
      ],
    },
  ],
});
