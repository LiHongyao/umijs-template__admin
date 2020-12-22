import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, ConfigProvider, Dropdown, Space, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { history, Link, ConnectProps, connect, UserModelState } from 'umi';
import {
  UserOutlined,
  TransactionOutlined,
  BlockOutlined,
  DashboardOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,
  LoginOutlined,
  LockOutlined,
  StockOutlined
} from '@ant-design/icons';
import moment from 'moment';
import Tools from 'lg-tools';
import Cookie from 'lg-cookie';
import './index.less';

const { Header, Sider, Content } = Layout;

interface IProps extends ConnectProps {
  user: UserModelState;
}

const Layouts: FC<IProps> = props => {
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
  // render
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout">
        <Sider breakpoint="lg" collapsedWidth="0">
          {/* 标题栏 */}
          <div className="layout-logo">
            <img
              src={require('../assets/images/icon_logo.png')}
              className="logo"
              alt=""
            />
            <div className="f16">后台管理系统模板</div>
          </div>
          {/* 菜单栏 */}
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
              <Link to="/dashboard">仪表概览</Link>
            </Menu.Item>
            <Menu.Item key="/manage-merchants" icon={<TransactionOutlined />}>
              <Link to="/manage-merchants">商家管理</Link>
            </Menu.Item>
            <Menu.Item key="/manage-user" icon={<UserOutlined />}>
              <Link to="/manage-user">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="/manage-bd" icon={<BlockOutlined />}>
              <Link to="/manage-bd">商务管理</Link>
            </Menu.Item>
            <Menu.Item key="/deal-flow" icon={<StockOutlined />}>
              <Link to="/deal-flow">交易流水</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        {/* 右侧内容 */}
        <Layout>
          {/* 头部 */}
          <Header className="site-layout-header">
            <div>
              天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为。所以动心忍性，增益其所不能。
            </div>
            <Space size="large">
              <span>
                {moment()
                  .locale('zh-cn')
                  .format('YYYY年MM月DD日 dddd')}
              </span>
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
                  onClick={e => e.preventDefault()}
                  className="cursor-pointer flex-center"
                >
                  <img
                    src="https://img.meituan.net/csc/684988f82620882034067237186480e91348.png"
                    className="icon-16x16"
                  />
                  <span className="mx-10">
                    {props.user.username || '管理员'}
                  </span>
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
          {/* 内容 */}
          <Content className="site-layout-content">{props.children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const mapStateToProps = ({ user }: { user: UserModelState }) => ({
  user,
});

export default connect(mapStateToProps)(Layouts);
