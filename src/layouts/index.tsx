import React, { FC, useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.less';
import Menus from './Menus';
import Headers from './Headers';
const { Content } = Layout;
const Layouts: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const onTrigger = () => {
    setCollapsed((prev) => !prev);
  };
  // render
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout">
        {/* 菜单 */}
        <Menus collapsed={collapsed} />
        {/* 右侧内容 */}
        <Layout>
          {/* 头部 */}
          {/* @ts-ignore */}
          <Headers visible={collapsed} onTrigger={onTrigger} />
          {/* 内容 */}
          <Content className="site-layout-content">{props.children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Layouts;
