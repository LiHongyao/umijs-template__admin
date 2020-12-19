import request from './request';

/**
 * 登录
 * @param data 
 */
export function login<T>(data: {
  username: string;
  password: string;
}) {
  return request.post<T>('/admin/user/login', {
    data
  })
}

/**
 * 退出登录
 */
export function logout<T>() {
  return request.post<T>('/admin/user/logout')
}