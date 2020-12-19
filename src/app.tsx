import Cookie from 'lg-cookie';
import { history } from 'umi';

// 登录鉴权
export function render(oldRender: any) {
  if (Cookie.get('XXX_ADMIN_TOKEN')) {
    oldRender();
  } else {
    history.push('/login');
    oldRender();
  }
}
