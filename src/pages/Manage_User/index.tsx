import React, { FC, useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { Table, Select, Input, InputNumber, Button, Modal, Space } from 'antd';
import { useBoolean } from '@umijs/hooks';

type UserType = {
  id: string;
  account: string;
  nikeName: string;
  merchants: string;
  business: string;
  dPoint: number;
  cPoint: number;
  date: string;
};

const { Option } = Select;
const { Search } = Input;

const columns: ColumnProps<UserType>[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    fixed: 'left',
    width: 120,
  },
  {
    title: '手机账号',
    dataIndex: 'account',
    key: 'account',
    align: 'center',
  },
  {
    title: '用户微信昵称',
    dataIndex: 'nikeName',
    key: 'nikeName',
    align: 'center',
  },
  {
    title: '锁客商家',
    dataIndex: 'merchants',
    key: 'merchants',
    align: 'center',
  },
  {
    title: '锁客BD',
    dataIndex: 'business',
    key: 'business',
    align: 'center',
  },
  {
    title: '账户D积分',
    dataIndex: 'dPoint',
    key: 'dPoint',
    defaultSortOrder: 'descend',
    sorter: (rowA: UserType, rowB: UserType) => rowA.dPoint - rowB.dPoint,
    align: 'center',
  },
  {
    title: '历史消费D积分',
    dataIndex: 'cPoint',
    key: 'cPoint',
    align: 'center',
  },
  { title: '首次扫码时间', dataIndex: 'date', key: 'date', align: 'center' },
];

const dataSource: any[] = [];
(function() {
  for (let i = 0; i < 100; i++) {
    dataSource.push({
      key: i,
      id: 'NO.0000x',
      account: i % 4 === 0 ? '未激活手机' : '17398888669',
      nikeName: '木子李',
      merchants: '天猫超市',
      business: '李鸿耀',
      dPoint: 80000 + i,
      cPoint: 60000 + i,
      date: '2020/11/11 09:11:11',
    });
  }
})();

const Manage_User: FC = () => {
  // hooks
  const { state: modalVisible, toggle: toggleModalVisible } = useBoolean();
  // const [dataSource, setDataSource] = useState();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  useEffect(() => {
    console.log(`加载第${page}页数据`);
  }, [page]);
  // render
  return (
    <div className="page user ">
      {/* 顶栏 */}
      <div className="site-top-bar">
        <section>
          <span className="site-top-bar__title">用户</span>
        </section>
        <section>
          <Button
            type="text"
            danger
            style={{ color: '#458edb' }}
            onClick={() => toggleModalVisible()}
          >
            最高可抵D豆
          </Button>
        </section>
      </div>
      {/* 过滤栏 */}
      <div className="site-filter-bar">
        {/* 左侧内容 */}
        <Space size="large">
          {/* 锁定BD */}
          <section>
            <span>锁定BD：</span>
            <Select style={{ width: 120 }} defaultValue="全部">
              <Option value="全部">全部</Option>
              <Option value="李鸿耀">李鸿耀</Option>
              <Option value="王理">王理</Option>
            </Select>
          </section>
          {/* 是否已绑定手机 */}
          <section>
            <span>是否已绑定手机：</span>
            <Select style={{ width: 120 }} defaultValue="全部">
              <Option value="全部">全部</Option>
              <Option value="已绑定">已绑定</Option>
              <Option value="未绑定">未绑定</Option>
            </Select>
          </section>
          {/* 搜索 */}
          <section>
            <Search
              placeholder="商家名称/商家手机号"
              style={{ width: 280 }}
              allowClear
              enterButton="搜索"
              size="middle"
            />
          </section>
        </Space>
        {/* 右侧内容 */}
        <Space size="large">
          <span>
            <span className="site-top-bar__label">D积分：</span>
            <span className="site-top-bar__value">232323</span>
          </span>
          <span>
            <span className="site-top-bar__label">历史消费D积分：</span>
            <span className="site-top-bar__value">232323232</span>
          </span>
        </Space>
      </div>
      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        size="small"
        scroll={{ y: 'calc(100vh - 300px)' }}
        pagination={{
          current: page /** 当前页数 */,
          hideOnSinglePage: false /** 只有一页时是否隐藏分页器 */,
          pageSize: pageSize /** 每页条数 */,
          pageSizeOptions: [] /** 指定每页可以显示多少条 */,
          showSizeChanger: true /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */,
          showQuickJumper: false /** 是否可以快速跳转至某页 */,
          total: dataSource.length,
          showTotal: (total: number, range: [number, number]) =>
            `共 ${total} 条`,
          onChange: (page: number) => setPage(page),
        }}
      />
      {/* 模态框 */}
      <Modal
        visible={modalVisible}
        title="最高可抵D豆"
        onOk={() => toggleModalVisible()}
        onCancel={() => toggleModalVisible()}
      >
        <div>
          <section>
            <span>最高可抵：</span>
            <InputNumber
              placeholder="请输入最高可抵数量"
              style={{ width: 180, margin: '0 8px' }}
            />
            <span>/每用户每天</span>
          </section>
          <section className="mt-6">价值：100元</section>
        </div>
      </Modal>
    </div>
  );
};

export default Manage_User;
