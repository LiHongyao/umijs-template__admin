/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-04 15:41:47
 * @LastEditTime: 2021-01-21 10:49:02
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /umijs-template__admin/src/layouts/Menus/index.tsx
 */
import React, { FC } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'umi';
import {
  TransactionOutlined,
  BlockOutlined,
  BarChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import './index.less';

interface IProps {
  collapsed: boolean;
}

type MenuItemType = {
  path: string;
  title: string;
  icon?: JSX.Element;
  children?: MenuItemType[];
};
const { Sider } = Layout;
const menus: MenuItemType[] = [
  {
    path: '/index',
    title: '数据统计',
    icon: <BarChartOutlined />,
  },
  {
    path: '/manage-merchants',
    title: '商家管理',
    icon: <TransactionOutlined />,
  },
  {
    path: '/manage-bd',
    title: '商务管理',
    icon: <BlockOutlined />,
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

const Menus: FC<IProps> = (props) => {
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      {/* 标题栏 */}
      <div className="layout-logo">
        <div className="layout-logo__wrapper">
          {props.collapsed ? (
            <img
              src={require('../../assets/images/icon_logo.png')}
              className="logo"
              alt=""
            />
          ) : (
            <h1 className="title">后台管理系统模板</h1>
          )}
          <img
            className="cursor ani-move-to-right"
            src={require('../../assets/images/cursor.png')}
          />
        </div>
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

export default Menus;
