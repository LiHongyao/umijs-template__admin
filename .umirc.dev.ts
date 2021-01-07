/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-19 20:00:28
 * @LastEditTime: 2021-01-07 15:53:37
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: /umijs-template__admin/.umirc.dev.ts
 */
import { defineConfig } from 'umi';

// 开发中，可能配置了多个后端人员，为了方便操作
// 我们可以将起服务器地址存储起来，以便使用
let HOST = {
  '后台A': '此处为后台A服务器地址',
  '后台B': '此处为后台B服务器地址',
}

export default defineConfig({
  define: {
    "process.env.BASE": '',
    "process.env.NAME": 'development',
    "process.env.HOST": HOST.后台A
  },
});
