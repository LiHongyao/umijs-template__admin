/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-19 17:24:26
 * @LastEditTime: 2021-01-21 10:48:49
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
        { path: '/manage-bd', component: '@/pages/Manage_BD' }, // BD管理
        { path: '/us/about-us', component: '@/pages/Us/AboutUs' }, // 关于我们
        { path: '/us/teams', component: '@/pages/Us/Teams' }, // 团队介绍
        { path: '*', component: '@/pages/404' }, // 404
      ],
    },
  ],
});
