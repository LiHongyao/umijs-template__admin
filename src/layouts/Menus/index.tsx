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
  AppstoreOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
import './index.less';

type MenuItemType = {
  path: string;
  title: string;
  icon?: JSX.Element;
  children?: MenuItemType[]
}

const menus: MenuItemType[] = [
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
  {
    path: '/us',
    title: '其他分类',
    icon: <AppstoreOutlined />,
    children: [
      {
        path: '/us/about-us',
        title: '关于我们',
      },
      {
        path: '/us/teams',
        title: '团队介绍',
      },
    ],
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
        <img
          className="cursor ani-move-to-right"
          src={require('../../assets/images/cursor.png')}
        />
      </div>
      {/* 菜单栏 */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname]}
      >
        {menus.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.path} icon={item.icon} title={item.title}>
              {item.children.map((subItem) => (
                <Menu.Item key={process.env.BASE + subItem.path}>
                  <Link to={subItem.path}>{subItem.title}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={process.env.BASE + item.path} icon={item.icon}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ),
        )}
      </Menu>
    </Sider>
  );
};

export default withRouter(Menus);
