import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'umi';
import {
  UserOutlined,
  TransactionOutlined,
  BlockOutlined,
  DashboardOutlined,
  StockOutlined,
  DollarOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
import './index.less';

const menus = [
  {
    path: '/index',
    title: '仪表概览',
    key: process.env.BASE + '/index',
    icon: <DashboardOutlined />,
  },
  {
    path: '/manage-merchants',
    title: '商家管理',
    key: process.env.BASE + '/manage-merchants',
    icon: <TransactionOutlined />,
  },
  {
    path: '/manage-user',
    title: '用户管理',
    key: process.env.BASE + '/manage-user',
    icon: <UserOutlined />,
  },
  {
    path: '/manage-bd',
    title: '商务管理',
    key: process.env.BASE + '/manage-bd',
    icon: <BlockOutlined />,
  },
  {
    path: '/capital-settlement',
    title: '资金结算',
    key: process.env.BASE + '/capital-settlement',
    icon: <DollarOutlined />,
  },
  {
    path: '/deal-flow',
    title: '交易流水',
    key: process.env.BASE + '/deal-flow',
    icon: <StockOutlined />,
  },
];

const Menus: FC = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      {/* 标题栏 */}
      <div className="layout-logo">
        <img
          src={require('../../assets/images/icon_logo.png')}
          className="logo"
          alt=""
        />
        <h1 className="title css2513cee11522c9a">D积分后台管理系统</h1>
      </div>
      {/* 菜单栏 */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname]}
      >
        {menus.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default withRouter(Menus);
