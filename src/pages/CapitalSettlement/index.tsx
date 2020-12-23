import React, { FC, useState, useEffect } from 'react';
import { ColumnProps } from 'antd/es/table';
import { Table, Tabs, DatePicker, Input, Space, Form, Button } from 'antd';
import classNames from 'lg-classnames';
import CityCascader from '@/components/CityCascader';
import moment from 'moment';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// 过滤数据类型
type FilterParamsType = {
  date?: any[];
  city?: string[];
  searchKey?: string;
};

type AColumnsType = {
  key: string;
  orderNo: string /** 结算单号 */;
  date: string /** 结算时间 */;
  merchantId: string /** 结算商家id */;
  merchantName: string /** 结算商家 */;
  area: string /** 商家所属区域 */;
  bd: string /** 所属BD */;
  orderNum: number /** 累计订单 */;
  collection: number /** 商家累计收款（元） */;
  dPoint: number /** 累计返D积分 */;
  amount: number /** 结算金额（元） */;
  type: string /** 结算类型 */;
  status: number /** 结算状态 */;
  wechatNo: string /** 微信转账单号 */;
};
type BColumnsType = {
  key: string;
  orderNo: string /** 结算单号 */;
  date: string /** 结算时间 */;
  merchantId: string /** 结算商家id */;
  merchantName: string /** 结算商家 */;
  area: string /** 商家所属区域 */;
  bd: string /** 所属BD */;
  dPoint: number /** 结算D积分  */;
  amount: number /** 结算金额（元） */;
  status: number /** 结算状态 */;
  wechatNo: string /** 微信转账单号 */;
};
type CColumnsType = {
  key: string;
  orderNo: string /** 结算单号 */;
  date: string /** 结算时间 */;
  bd: string /** 结算BD */;
  amount: number /** 结算金额（元） */;
  status: number /** 结算状态 */;
  wechatNo: string /** 微信转账单号 */;
};

const CapitalSettlement: FC = () => {
  // columns
  /** 商家现金结算 */
  const aColumns: ColumnProps<AColumnsType>[] = [
    {
      width: 150,
      title: '结算单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      fixed: 'left',
    },
    {
      width: 160,
      title: '结算时间',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
    },
    {
      width: 200,
      title: '结算商家 ',
      key: 'merchantName',
      align: 'center',
      render: (record: AColumnsType) =>
        `ID：${record.merchantId} ${record.merchantName}`,
    },
    {
      width: 120,
      title: '商家所属区域',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
    },
    {
      width: 100,
      title: '所属BD ',
      dataIndex: 'bd',
      key: 'bd',
      align: 'center',
    },
    {
      width: 100,
      title: '累计订单',
      dataIndex: 'orderNum',
      key: 'orderNum',
      align: 'center',
    },
    {
      width: 160,
      title: '商家累计收款（元）',
      dataIndex: 'collection',
      key: 'collection',
      align: 'center',
    },
    {
      width: 120,
      title: '累计返D积分',
      dataIndex: 'dPoint',
      key: 'dPoint',
      align: 'center',
    },
    {
      width: 120,
      title: '结算金额（元）',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      width: 100,
      title: '结算类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      width: 100,
      title: '结算状态  ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) =>
        status === 0 ? '结算中' : status === 1 ? '已结算' : '结算失败',
    },
    {
      width: 130,
      title: '微信转账单号',
      dataIndex: 'wechatNo',
      key: 'wechatNo',
      align: 'center',
    },
    {
      width: 80,
      title: '操作',
      align: 'center',
      fixed: 'right',
      render: () => <a>详情</a>,
    },
  ];
  /** D积分结算  */
  const bColumns: ColumnProps<BColumnsType>[] = [
    {
      width: 150,
      title: '结算单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      fixed: 'left',
    },
    {
      width: 160,
      title: '结算时间',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
    },
    {
      width: 200,
      title: '结算商家 ',
      key: 'merchantName',
      align: 'center',
      render: (record: BColumnsType) =>
        `ID：${record.merchantId} ${record.merchantName}`,
    },
    {
      width: 120,
      title: '商家所属区域',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
    },
    {
      width: 90,
      title: '所属BD ',
      dataIndex: 'bd',
      key: 'bd',
      align: 'center',
    },
    {
      width: 100,
      title: '结算D积分',
      dataIndex: 'dPoint',
      key: 'dPoint',
      align: 'center',
    },
    {
      width: 120,
      title: '结算金额（元）',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      width: 90,
      title: '结算状态  ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) =>
        status === 0 ? '结算中' : status === 1 ? '已结算' : '结算失败',
    },
    {
      title: '微信转账单号',
      dataIndex: 'wechatNo',
      key: 'wechatNo',
      align: 'center',
    },
  ];
  // BD业绩结算
  const cColumns: ColumnProps<CColumnsType>[] = [
    {
      title: '结算单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      fixed: 'left',
    },
    {
      title: '结算时间',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
    },
    {
      title: '结算BD ',
      dataIndex: 'bd',
      key: 'bd',
      align: 'center',
    },
    {
      title: '结算金额（元）',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      title: '结算状态  ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) =>
        status === 0 ? '结算中' : status === 1 ? '已结算' : '结算失败',
    },
    {
      title: '微信转账单号',
      dataIndex: 'wechatNo',
      key: 'wechatNo',
      align: 'center',
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
        setAPage(prev => ({
          ...prev,
          filters: value,
        }));
        break;
      case '2':
        setBPage(prev => ({
          ...prev,
          filters: value,
        }));
        break;
      case '3':
        setCPage(prev => ({
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
    switch (activeKey) {
      case '1':
        let a: AColumnsType[] = [];
        for (let i = 0; i < 66; i++) {
          a.push({
            key: `a___${i}`,
            orderNo: '2989302032220',
            date: '2020/11/11 23:11:11',
            merchantId: 'KJ32KD',
            merchantName: ' 佳佳之星超市',
            area: '成都武侯区',
            bd: '周杰伦',
            orderNum: 50,
            collection: 3000,
            dPoint: 90000,
            amount: 900.0,
            type: '2020/11/11',
            status: 1,
            wechatNo: '2989302032220',
          });
        }
        setADataSource(a);
        setATotal(a.length);
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
            orderNo: '2989302032220',
            date: '2020/11/11 23:11:11',
            merchantId: 'KJ32KD',
            merchantName: ' 佳佳之星超市',
            area: '成都武侯区',
            bd: '周杰伦',
            dPoint: 90000,
            amount: 900.0,
            status: 1,
            wechatNo: '2989302032220',
          });
        }
        setBDataSource(b);
        setBTotal(b.length);
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
            orderNo: '2989302032220',
            date: '2020/11/11 23:11:11',
            bd: '周杰伦',
            amount: 900.0,
            status: 1,
            wechatNo: '2989302032220',
          });
        }
        setCDataSource(c);
        setCTotal(c.length);
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
              <section
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
              </section>
            ))}
          </div>
          {/* 额外信息 */}
          <Space size="large">
            {/* 商家现金结算 */}
            {activeKey === '1' && (
              <>
                <span>
                  <span className="site-top-bar__label">订单笔数：</span>
                  <span className="site-top-bar__value">3232132笔</span>
                </span>
                <span>
                  <span className="site-top-bar__label">收款总额：</span>
                  <span className="site-top-bar__value">232323元</span>
                </span>
                <span>
                  <span className="site-top-bar__label">返D积分：</span>
                  <span className="site-top-bar__value">232322</span>
                </span>
                <span>
                  <span className="site-top-bar__label">结算金额：</span>
                  <span className="site-top-bar__value">23232323元</span>
                </span>
              </>
            )}
            {/* D积分结算 */}
            {activeKey === '2' && (
              <>
                <span>
                  <span className="site-top-bar__label">结算D积分：</span>
                  <span className="site-top-bar__value">232323232</span>
                </span>
                <span>
                  <span className="site-top-bar__label">结算金额：</span>
                  <span className="site-top-bar__value">2323232.32元</span>
                </span>
              </>
            )}
            {/* BD业绩结算 */}
            {activeKey === '3' && (
              <>
                <span>
                  <span className="site-top-bar__label">收款金额：</span>
                  <span className="site-top-bar__value">232323元</span>
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
                  disabledDate={current =>
                    current && current > moment().subtract(1, 'days')
                  }
                />
              </Form.Item>
              {/* 城市区域 */}
              {activeKey !== '3' && (
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
        {/* 商家现金结算 */}
        <TabPane tab="商家现金结算" key="1">
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
                setAPage(prev => ({
                  ...prev,
                  page,
                })),
              onShowSizeChange: (current: number, size: number) =>
                setAPage(prev => ({
                  ...prev,
                  pageSize: size,
                  page: current,
                })),
            }}
          />
        </TabPane>
        {/* D积分结算 */}
        <TabPane tab="D积分结算" key="2">
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
                setBPage(prev => ({
                  ...prev,
                  page,
                })),
              onShowSizeChange: (current: number, size: number) =>
                setBPage(prev => ({
                  ...prev,
                  pageSize: size,
                  page: current,
                })),
            }}
          />
        </TabPane>
        {/* BD业绩结算 */}
        <TabPane tab="BD业绩结算" key="3">
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
                setCPage(prev => ({
                  ...prev,
                  page,
                })),
              onShowSizeChange: (current: number, size: number) =>
                setCPage(prev => ({
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

export default CapitalSettlement;
