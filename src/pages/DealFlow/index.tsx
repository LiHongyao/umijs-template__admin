import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import {
  Table,
  Tabs,
  Select,
  DatePicker,
  Input,
  Space,
  Form,
  Button,
  message,
} from 'antd';
import { ColumnProps } from 'antd/es/table';
import classNames from 'lg-classnames';
import CityCascader from '@/components/CityCascader';

// 过滤数据类型
type FilterParamsType = {
  date?: any[];
  city?: string[];
  searchKey?: string;
  bdUid?: string;
};

// 交易流水
type AColumnsType = {
  key: string;
  serialNo: string /** 交易流水号 */;
  date: string /** 交易时间 */;
  area: string /** 交易地区 */;
  uid: string /** 触发用户 */;
  userName: string /** 用户昵称 */;
  merchantName: string /** 交易商家 */;
  merchantId: string /** 交易商家ID */;
  orderAmount: number /** 订单总金额（元） */;
  deductDbeans: number /** 抵扣D积分  */;
  payAmount: number /** 支付现金（元） */;
  merchantRebateDbeans: number /** 商家返D积分  */;
  platformRebateDbeans: number /** 平台补贴D积分  */;
};
// 签到奖励
type BColumnsType = {
  key: string;
  time: string /** 签到时间 */;
  area: string /** 签到地区 */;
  uid: string /** 触发用户 */;
  userName: string /** 用户昵称 */;
  merchantName: string /** 签到商家 */;
  merchantId: string /** 签到商家ID */;
  merchantRebateDbeans: number /** 商家补贴D积分  */;
  platformRebateDbeans: number /** 平台补贴D积分 */;
};

// BD收入
type CColumnsType = {
  key: string;
  date: string /** 收入时间  */;
  bdName: string /** 收入BD -- 名字  */;
  bdPhone: string /** 收入BD -- 手机号 */;
  amount: number /** 收入金额（元） */;
  merchantName: string /** 触发商家 */;
  events: string /** 收入事件 */;
};

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const DealFlow: FC = () => {
  // columns
  const aColumns: ColumnProps<AColumnsType>[] = [
    {
      width: 280,
      title: '交易流水号',
      dataIndex: 'serialNo',
    },
    {
      width: 150,
      title: '交易时间',
      dataIndex: 'date',
    },
    {
      width: 100,
      title: '交易地区',
      dataIndex: 'area',
    },
    {
      width: 220,
      title: '触发用户',
      key: 'uid',
      render: (record: AColumnsType) => `ID：${record.uid} ${record.userName}`,
    },
    {
      width: 240,
      title: '交易商家',
      key: 'merchantName',
      render: (record: AColumnsType) =>
        `ID：${record.merchantId} ${record.merchantName}`,
    },
    {
      width: 150,
      title: '订单总金额（元）',
      dataIndex: 'orderAmount',
    },
    {
      width: 200,
      title: '抵扣D积分',
      key: 'deductDbeans',
      render: (record: AColumnsType) =>
        `${record.deductDbeans}（¥${(record.deductDbeans / 100).toFixed(2)}）`,
    },
    {
      width: 120,
      title: '支付现金（元）',
      dataIndex: 'payAmount',
    },
    {
      width: 110,
      title: '商家返D积分',
      dataIndex: 'merchantRebateDbeans',
    },
    {
      width: 120,
      title: '平台补贴D积分',
      dataIndex: 'platformRebateDbeans',
    },
  ];
  const bColumns: ColumnProps<BColumnsType>[] = [
    {
      title: '签到时间',
      dataIndex: 'time',
    },
    {
      title: '签到地区',
      dataIndex: 'area',
    },
    {
      title: '触发用户',
      key: 'uid',
      render: (record: BColumnsType) => `ID：${record.uid} ${record.userName}`,
    },
    {
      title: '签到商家',
      key: 'merchantName',
      render: (record: BColumnsType) =>
        `ID：${record.merchantId} ${record.merchantName}`,
    },
    {
      title: '商家补贴D积分',
      dataIndex: 'merchantRebateDbeans',
    },
    {
      title: '平台补贴D积分',
      dataIndex: 'platformRebateDbeans',
    },
  ];
  const cColumns: ColumnProps<CColumnsType>[] = [
    {
      title: '收入时间',
      dataIndex: 'date',
    },
    {
      title: '收入BD',
      key: 'bd',
      render: (record: CColumnsType) => `${record.bdName} ${record.bdPhone}`,
    },
    {
      title: '收入金额（元）',
      dataIndex: 'amount',
    },
    {
      title: '触发商家',
      dataIndex: 'merchantName',
    },
    {
      title: '收入事件',
      dataIndex: 'events',
    },
  ];
  // state
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('1');
  const [filterParams, setFilterParams] = useState<FilterParamsType>({});

  const [aDataSource, setADataSource] = useState<AColumnsType[]>([]);
  const [bDataSource, setBDataSource] = useState<BColumnsType[]>([]);
  const [cDataSource, setCDataSource] = useState<CColumnsType[]>([]);

  const [aTotal, setATotal] = useState(0);
  const [bTotal, setBTotal] = useState(0);
  const [cTotal, setCTotal] = useState(0);

  const [aPage, setAPage] = useState<DP.TablePageDataType<FilterParamsType>>(
    () => ({
      pageSize: 20,
      page: 1,
      filters: {},
    }),
  );
  const [bPage, setBPage] = useState<DP.TablePageDataType<FilterParamsType>>(
    () => ({
      pageSize: 20,
      page: 1,
      filters: {},
    }),
  );
  const [cPage, setCPage] = useState<DP.TablePageDataType<FilterParamsType>>(
    () => ({
      pageSize: 20,
      page: 1,
      filters: {},
    }),
  );

  // events
  const onFormFinish = (value: FilterParamsType) => {
    setFilterParams(value);
    switch (activeKey) {
      case '1':
        setAPage((prev) => ({
          ...prev,
          filters: value,
        }));
        break;
      case '2':
        setBPage((prev) => ({
          ...prev,
          filters: value,
        }));
        break;
      case '3':
        setCPage((prev) => ({
          ...prev,
          filters: value,
        }));
        break;
    }
  };

  // effects
  useEffect(() => {
    let startDate: string | undefined;
    let endDate: string | undefined;
    if (filterParams.date) {
      startDate = filterParams.date[0].format('YYYY-MM-DD');
      endDate = filterParams.date[1].format('YYYY-MM-DD');
    }
    message.loading('数据加载中...');
    switch (activeKey) {
      case '1':
        let a: AColumnsType[] = [];
        for (let i = 0; i < 66; i++) {
          a.push({
            key: `a___${i}`,
            serialNo: '20201205837283282912392929321293',
            date: '2020/11/11 23:11:11 ',
            area: '成都武侯区',
            uid: 'KJ32KD',
            userName: '蓉城木子李',
            merchantId: 'M3JS89',
            merchantName: ' 佳佳之星超市',
            orderAmount: 100,
            deductDbeans: 200,
            payAmount: 1000,
            merchantRebateDbeans: 10,
            platformRebateDbeans: 20,
          });
        }
        setTimeout(() => {
          setADataSource(a);
          setATotal(a.length);
          message.destroy();
        }, 1000);
        console.log(`
          请求数据
          请求页码：${aPage.page}
          每页条数：${aPage.pageSize}
          过滤数据：${JSON.stringify(aPage.filters)}
        `);
        break;
      case '2':
        let b: BColumnsType[] = [];
        for (let i = 0; i < 88; i++) {
          b.push({
            key: `b___${i}`,
            time: '2020/11/11 23:11:11 ',
            area: '成都武侯区',
            uid: 'KJ32KD',
            userName: '蓉城木子李',
            merchantId: 'M3JS89',
            merchantName: ' 佳佳之星超市',
            merchantRebateDbeans: 10,
            platformRebateDbeans: 20,
          });
        }
        setTimeout(() => {
          setBDataSource(b);
          setBTotal(b.length);
          message.destroy();
        }, 1000);
        console.log(`
          请求数据
          请求页码：${bPage.page}
          每页条数：${bPage.pageSize}
          过滤数据：${JSON.stringify(bPage.filters)}
        `);
        break;
      case '3':
        let c: CColumnsType[] = [];
        for (let i = 0; i < 75; i++) {
          c.push({
            key: `c___${i}`,
            date: '2020/11/11 23:11:11 ',
            bdName: '李鸿耀',
            bdPhone: '17398888669',
            amount: 100,
            merchantName: '佳佳之星超市',
            events: '商家服务开通后邀新用户达到100人',
          });
        }

        setTimeout(() => {
          setCDataSource(c);
          setCTotal(c.length);
          message.destroy();
        }, 1000);
        console.log(`
          请求数据
          请求页码：${cPage.page}
          每页条数：${cPage.pageSize}
          过滤数据：${JSON.stringify(cPage.filters)}
        `);
        break;
    }
  }, [activeKey, aPage, bPage, cPage]);

  // render
  const renderTabBar = (props: any, DefaultTabBar: React.ComponentType) => {
    const tabInfos = props.panes.map((item: any) => {
      return {
        key: item.key,
        title: item.props.tab,
      };
    });
    return (
      <>
        <div className="site-top-bar">
          <div className="site-top-bar__menu">
            {tabInfos.map((item: { key: string; title: string }) => (
              <Button
                size="small"
                type="text"
                className={classNames([
                  'site-top-bar__menu_item',
                  { active: activeKey === item.key },
                ])}
                key={item.key}
                onClick={() => {
                  // 点击tab项时，更新activekey，并且将对应tab过滤数据复制
                  setActiveKey(item.key);
                  switch (item.key) {
                    case '1':
                      setFilterParams(aPage.filters);
                      break;
                    case '2':
                      setFilterParams(bPage.filters);
                      break;
                    case '3':
                      setFilterParams(cPage.filters);
                      break;
                  }
                  setTimeout(() => {
                    form.resetFields();
                  }, 0);
                }}
              >
                {item.title}
              </Button>
            ))}
          </div>
          {/* 额外信息 */}
          <Space size="small">
            {/* 交易流水 */}
            {activeKey === '1' && (
              <>
                <span>
                  <span className="site-top-bar__label">订单笔数：</span>
                  <span className="site-top-bar__value">22233笔</span>
                </span>
                <span>
                  <span className="site-top-bar__label">订单总额：</span>
                  <span className="site-top-bar__value">232323元</span>
                </span>
                <span>
                  <span className="site-top-bar__label">抵扣D积分：</span>
                  <span className="site-top-bar__value">232322</span>
                </span>
                <span>
                  <span className="site-top-bar__label">支付现金：</span>
                  <span className="site-top-bar__value">23232323元</span>
                </span>
                <span>
                  <span className="site-top-bar__label">商家返D积分：</span>
                  <span className="site-top-bar__value">23232323</span>
                </span>
                <span>
                  <span className="site-top-bar__label">平台补贴D积分：</span>
                  <span className="site-top-bar__value">232323</span>
                </span>
              </>
            )}
            {/* 签到奖励 */}
            {activeKey === '2' && (
              <>
                <span>
                  <span className="site-top-bar__label">签到人次：</span>
                  <span className="site-top-bar__value">2323232</span>
                </span>
                <span>
                  <span className="site-top-bar__label">商家奖励D积分：</span>
                  <span className="site-top-bar__value">232323</span>
                </span>
                <span>
                  <span className="site-top-bar__label">平台补贴D积分：</span>
                  <span className="site-top-bar__value">232323</span>
                </span>
              </>
            )}
          </Space>
        </div>
        {/* 过滤栏 */}
        <div className="site-filter-bar">
          <Form
            form={form}
            onFinish={onFormFinish}
            initialValues={filterParams}
            autoComplete="off"
          >
            <Space size="large">
              {/* 时间 */}
              <Form.Item label="时间：" name="date">
                {/* 限制只能选取当日之前的日期 */}
                <RangePicker
                  disabledDate={(current) =>
                    current && current > moment().subtract(1, 'days')
                  }
                />
              </Form.Item>
              {/* BD && 城市区域 */}
              {activeKey === '3' ? (
                <Form.Item label="BD：" name="bdUid">
                  <Select placeholder="请选择" allowClear>
                    <Option value="李鸿耀">李鸿耀</Option>
                    <Option value="王理">王理</Option>
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item label="城市区域：" name="city">
                  <CityCascader />
                </Form.Item>
              )}
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
        </div>
      </>
    );
  };

  return (
    <div className="page deal-flow">
      <Tabs activeKey={activeKey} defaultValue="1" renderTabBar={renderTabBar}>
        {/* 交易流水 */}
        <TabPane tab="交易流水" key="1">
          <Table
            columns={aColumns}
            dataSource={aDataSource}
            bordered
            size="small"
            scroll={{ y: 'calc(100vh - 280px)' }}
            pagination={{
              current: aPage.page /** 当前页数 */,
              hideOnSinglePage: false /** 只有一页时是否隐藏分页器 */,
              pageSize: aPage.pageSize /** 每页条数 */,
              showSizeChanger: true /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */,
              showQuickJumper: false /** 是否可以快速跳转至某页 */,
              total: aTotal,
              showTotal: (total: number, range: [number, number]) =>
                `共 ${total} 条`,
              onChange: (page: number) =>
                setAPage((prev) => ({
                  ...prev,
                  page,
                })),
              onShowSizeChange: (current: number, size: number) =>
                setAPage((prev) => ({
                  ...prev,
                  pageSize: size,
                  page: current,
                })),
            }}
          />
        </TabPane>
        {/* 签到奖励 */}
        <TabPane tab="签到奖励" key="2">
          <Table
            columns={bColumns}
            dataSource={bDataSource}
            bordered
            size="small"
            scroll={{ y: 'calc(100vh - 280px)' }}
            pagination={{
              current: bPage.page /** 当前页数 */,
              hideOnSinglePage: false /** 只有一页时是否隐藏分页器 */,
              pageSize: bPage.pageSize /** 每页条数 */,
              showSizeChanger: true /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */,
              showQuickJumper: false /** 是否可以快速跳转至某页 */,
              total: bTotal,
              showTotal: (total: number, range: [number, number]) =>
                `共 ${total} 条`,
              onChange: (page: number) =>
                setBPage((prev) => ({
                  ...prev,
                  page,
                })),
              onShowSizeChange: (current: number, size: number) =>
                setBPage((prev) => ({
                  ...prev,
                  pageSize: size,
                  page: current,
                })),
            }}
          />
        </TabPane>
        {/* BD收入 */}
        <TabPane tab="BD收入" key="3">
          <Table
            columns={cColumns}
            dataSource={cDataSource}
            bordered
            size="small"
            scroll={{ y: 'calc(100vh - 280px)' }}
            pagination={{
              current: cPage.page /** 当前页数 */,
              hideOnSinglePage: false /** 只有一页时是否隐藏分页器 */,
              pageSize: cPage.pageSize /** 每页条数 */,
              showSizeChanger: true /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */,
              showQuickJumper: false /** 是否可以快速跳转至某页 */,
              total: cTotal,
              showTotal: (total: number, range: [number, number]) =>
                `共 ${total} 条`,
              onChange: (page: number) =>
                setCPage((prev) => ({
                  ...prev,
                  page,
                })),
              onShowSizeChange: (current: number, size: number) =>
                setCPage((prev) => ({
                  ...prev,
                  pageSize: size,
                  page: current,
                })),
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DealFlow;
