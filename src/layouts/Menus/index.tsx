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
    icon: <DashboardOutlined />,
  },
  {
    path: '/manage-merchants',
    title: '商家管理',
    icon: <TransactionOutlined />,
  },
  {
    path: '/manage-user',
    title: '用户管理',
    icon: <UserOutlined />,
  },
  {
    path: '/manage-bd',
    title: '商务管理',
    icon: <BlockOutlined />,
  },
  {
    path: '/capital-settlement',
    title: '资金结算',
    icon: <DollarOutlined />,
  },
  {
    path: '/deal-flow',
    title: '交易流水',
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
        <h1 className="title">后台管理系统模板</h1>
        <img className="cursor ani-move-to-right" src={require('../../assets/images/cursor.png')}/>
      </div>
      {/* 菜单栏 */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname]}
      >
        {menus.map((item) => (
          <Menu.Item key={process.env.BASE + item.path} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default withRouter(Menus);
