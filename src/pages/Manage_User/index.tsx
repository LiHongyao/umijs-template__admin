import React, { FC, useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import {
  Table,
  Select,
  Input,
  InputNumber,
  Button,
  Modal,
  Space,
  Form,
  message
} from 'antd';
import { useBoolean } from '@umijs/hooks';

type UserType = {
  uid: string /** 用户ID */;
  phone: string /** 手机账号 */;
  nickName: string /** 用户微信昵称 */;
  merchantName: string /** 锁客商家 */;
  bdName: string /** 锁客BD名称 */;
  bdPhone: string /** 锁客BD手机号 */;
  dbeanBalance: number /** 账户D积分 */;
  deductDbeanCount: number /** 历史消费D积分 */;
  firstScanTime: string /** 首次扫码时间 */;
};

type FilterParamsType = {
  bindPhone?: boolean;
  bdUid?: string;
  searchKey?: string;
};

const { Option } = Select;

const columns: ColumnProps<UserType>[] = [
  {
    title: '用户ID',
    dataIndex: 'uid',
    fixed: 'left',
    width: 120,
  },
  {
    title: '手机账号',
    dataIndex: 'phone'
  },
  {
    title: '用户微信昵称',
    dataIndex: 'nickName'
  },
  {
    title: '锁客商家',
    dataIndex: 'merchantName'
  },
  {
    width: 200,
    title: '锁客BD',
    render: (record: UserType) => `${record.bdName} ${record.bdPhone}`,
  },
  {
    title: '账户D积分',
    dataIndex: 'dbeanBalance',
    defaultSortOrder: 'descend',
    sorter: (rowA: UserType, rowB: UserType) =>
      rowA.dbeanBalance - rowB.dbeanBalance
  },
  {
    title: '历史消费D积分',
    dataIndex: 'deductDbeanCount'
  },
  {
    title: '首次扫码时间',
    dataIndex: 'firstScanTime'
  },
];

const Manage_User: FC = () => {
  // hooks
  const { state: modalVisible, toggle: toggleModalVisible } = useBoolean();
  // state
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<DP.TablePageDataType<FilterParamsType>>(
    () => ({
      pageSize: 20,
      page: 1,
      filters: {},
    }),
  );
  // effects
  useEffect(() => {
    console.log(`
      请求数据
      请求页码：${page.page}
      每页条数：${page.pageSize}
      过滤数据：${JSON.stringify(page.filters)}
    `);
    message.loading('数据加载中...');
    const tempArr: UserType[] = [];
    for (let i = 0; i < 88; i++) {
      tempArr.push({
        uid: 'NO.000' + i,
        phone: i % 10 === 0 ? '未激活手机' : '17398888669',
        nickName: '木子李',
        merchantName: '天猫超市',
        bdName: '李鸿耀',
        bdPhone: '15888899917',
        dbeanBalance: 80000 + i,
        deductDbeanCount: 60000 + i,
        firstScanTime: '2020/11/11 09:11:11',
      });
    }
    setTimeout(() => {
      setDataSource(tempArr);
      setTotal(tempArr.length);
      message.destroy();
    }, 1000);
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
        <Form
          form={form}
          autoComplete="off"
          onFinish={(value: FilterParamsType) =>
            setPage(prev => ({
              ...prev,
              filters: value,
            }))
          }
        >
          <Space size="large">
            {/* 锁定BD */}
            <Form.Item label="锁定BD：" name="bdUid">
              <Select style={{ width: 120 }} placeholder="请选择" allowClear>
                <Option value="李鸿耀">李鸿耀</Option>
                <Option value="王理">王理</Option>
                <Option value="卢鸶">卢鸶</Option>
                <Option value="何凯">何凯</Option>
              </Select>
            </Form.Item>
            {/* 是否已绑定手机 */}
            <Form.Item label="是否已绑定手机：" name="bindPhone">
              <Select style={{ width: 120 }} placeholder="请选择" allowClear>
                <Option value={1}>已绑定</Option>
                <Option value={0}>未绑定</Option>
              </Select>
            </Form.Item>
            {/* 搜索 */}
            <Form.Item label="搜索：" name="searchKey">
              <Input
                placeholder="商家名称/商家手机号"
                style={{ width: 180 }}
                allowClear
                size="middle"
              />
            </Form.Item>
            {/* 提交 */}
            <Form.Item>
              <Button htmlType="submit" type="primary">
                搜索
              </Button>
            </Form.Item>
          </Space>
        </Form>
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
        scroll={{ y: 'calc(100vh - 280px)' }}
        rowKey="uid"
        pagination={{
          current: page.page /** 当前页数 */,
          hideOnSinglePage: false /** 只有一页时是否隐藏分页器 */,
          pageSize: page.pageSize /** 每页条数 */,
          showSizeChanger: true /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */,
          showQuickJumper: false /** 是否可以快速跳转至某页 */,
          total: total,
          showTotal: (total: number, range: [number, number]) =>
            `共 ${total} 条`,
          onChange: (page: number) =>
            setPage(prev => ({
              ...prev,
              page,
            })),
          onShowSizeChange: (current: number, size: number) =>
            setPage(prev => ({
              ...prev,
              pageSize: size,
              page: current,
            })),
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
