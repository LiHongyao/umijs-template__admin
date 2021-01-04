import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Space, message } from 'antd';
import {
  history,
  ConnectProps,
  connect,
  UserModelState,
  withRouter,
} from 'umi';

import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,
  LoginOutlined,
  LockOutlined,
} from '@ant-design/icons';

import moment from 'moment';
import Tools from 'lg-tools';
import Cookie from 'lg-cookie';
import './index.less';

const { Header } = Layout;

interface IProps extends ConnectProps {
  user: UserModelState;
}

const Headers: FC<IProps> = (props) => {
  // state
  const [isFull, setIsFull] = useState(false);
  // events
  const onChangePSW = () => {
    message.warning('暂未开放');
  };
  const onLoginOut = () => {
    Cookie.del('XXX_ADMIN_TOKEN');
    history.push('/login');
  };
  // effects
  useEffect(() => {
    const handler = () => {
      if (document.fullscreenElement) {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
    };
    window.addEventListener('resize', handler, false);
    return () => window.removeEventListener('resize', handler, false);
  }, []);

  return (
    <Header className="site-layout-header">
      <div>
        天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为。所以动心忍性，增益其所不能。
      </div>
      <Space size="large">
        <span>{moment().locale('zh').format('YYYY年MM月DD日 星期e')}</span>
        <Dropdown
          trigger={['click']}
          overlay={() => (
            <Menu>
              <Menu.Item
                key="changePsw"
                icon={<LockOutlined />}
                onClick={onChangePSW}
              >
                修改密码
              </Menu.Item>
              <Menu.Item
                key="loginOut"
                icon={<LoginOutlined />}
                onClick={onLoginOut}
              >
                退出登录
              </Menu.Item>
            </Menu>
          )}
        >
          <div
            onClick={(e) => e.preventDefault()}
            className="cursor-pointer flex-center"
          >
            <img
              src="https://img.meituan.net/csc/684988f82620882034067237186480e91348.png"
              className="icon-16x16"
            />
            <span className="mx-10">{props.user.username || '管理员'}</span>
            <DownOutlined />
          </div>
        </Dropdown>
        {isFull ? (
          <FullscreenExitOutlined
            onClick={() => Tools.exitFullscreen()}
            style={{ fontSize: 20 }}
          />
        ) : (
          <FullscreenOutlined
            onClick={() => Tools.launchFullscreen()}
            style={{ fontSize: 20 }}
          />
        )}
      </Space>
    </Header>
  );
};

const mapStateToProps = ({ user }: { user: UserModelState }) => ({
  user,
});

export default withRouter(
  // @ts-ignore
  connect(mapStateToProps)(Headers),
);
