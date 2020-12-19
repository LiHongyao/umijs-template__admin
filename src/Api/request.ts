import Utils from '@/utils/utils';
import { extend, RequestOptionsInit } from 'umi-request';
import { message } from 'antd';
import Cookie from 'lg-cookie';
import Tools from 'lg-tools';

const service = extend({
  prefix: process.env.HOST,
  timeout: 20000,
  errorHandler: error => {
    console.log('____error', JSON.stringify(error));
    if (/timeout/.test(error.message)) {
      message.error('请求超时');
    } else {
      message.error('系统升级，请稍后再试');
    }
    return null;
  },
});

service.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  // GET请求添加时间戳
  if (options.method && /get/i.test(options.method)) {
    options.params = {
      ...options.params,
      timeState: Tools.randomCharacters(1, 'uppercase') + Date.now(),
    };
  }
  return {
    url,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookie.get('D_POINT_ADMIN_TOKEN') || '',
      },
    },
  };
});

// 响应拦截
service.interceptors.response.use(async (response, options) => {
  const res = await response.clone().json();

  switch (res.code) {
    case 0:
      return res;
    case -10:
      Utils.push('/login');
      return res;
    default:
      message.error(res.msg);
      return res;
  }
});
export default service;
