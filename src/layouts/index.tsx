import React, { FC } from 'react';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.less';
import Menus from './Menus';
import Headers from './Headers';
// 86fbbf9d6ba4a9cb9e553bda67cf047a
const { Content } = Layout;

const Layouts: FC = (props) => {
  // render
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout">
        {/* 菜单 */}
        <Menus />
        {/* 右侧内容 */}
        <Layout>
          {/* 头部 */}
          <Headers />
          {/* 内容 */}
          <Content className="site-layout-content">{props.children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Layouts;
