import React, { FC, useState, useEffect } from 'react';
import { ColumnProps } from 'antd/es/table';
import {
  Table,
  Tabs,
  DatePicker,
  Input,
  Space,
  Form,
  Button,
  Modal,
  message,
} from 'antd';
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

// 商家现金结算
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
// D积分结算
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
// BD业绩结算
type CColumnsType = {
  key: string;
  orderNo: string /** 结算单号 */;
  date: string /** 结算时间 */;
  bd: string /** 结算BD */;
  amount: number /** 结算金额（元） */;
  status: number /** 结算状态 */;
  wechatNo: string /** 微信转账单号 */;
};
// 结算列表
type DColumnsType = {
  key: string;
  serialNo: string /** 交易流水号 */;
  date: string /** 交易时间 */;
  area: string /** 交易地区 */;
  uid: string /** 触发用户id */;
  uName: string /** 触发用户 */;
  merchantId: string /** 交易商家id */;
  merchantName: string /** 交易商家 */;
  totalAmount: number /** 订单总金额（元） */;
  deductionDPoint: number /** 抵扣D积分 */;
  payAmount: number /** 支付现金（元） */;
  merchantDPoint: number /** 商家返D积分 */;
  platformatDPoint: number /** 平台补贴D积分  */;
};

const CapitalSettlement: FC = () => {
  // columns
  /** 商家现金结算 */
  const aColumns: ColumnProps<AColumnsType>[] = [
    {
      width: 150,
      title: '结算单号',
      dataIndex: 'orderNo',
      fixed: 'left',
    },
    {
      width: 160,
      title: '结算时间',
      dataIndex: 'date',
    },
    {
      width: 200,
      title: '结算商家 ',
      render: (record: AColumnsType) =>
        `ID：${record.merchantId} ${record.merchantName}`,
    },
    {
      width: 120,
      title: '商家所属区域',
      dataIndex: 'area',
    },
    {
      width: 100,
      title: '所属BD ',
      dataIndex: 'bd',
    },
    {
      width: 100,
      title: '累计订单',
      dataIndex: 'orderNum',
    },
    {
      width: 160,
      title: '商家累计收款（元）',
      dataIndex: 'collection',
    },
    {
      width: 120,
      title: '累计返D积分',
      dataIndex: 'dPoint',
    },
    {
      width: 120,
      title: '结算金额（元）',
      dataIndex: 'amount',
    },
    {
      width: 100,
      title: '结算类型',
      dataIndex: 'type',
    },
    {
      width: 100,
      title: '结算状态  ',
      dataIndex: 'status',
      render: (status: number) =>
        status === 0 ? '结算中' : status === 1 ? '已结算' : '结算失败',
    },
    {
      width: 130,
      title: '微信转账单号',
      dataIndex: 'wechatNo',
    },
    {
      width: 80,
      title: '操作',
      align: 'center',
      fixed: 'right',
      render: () => <a onClick={() => setDetailsModalVisile(true)}>结算详情</a>,
    },
  ];
  /** D积分结算  */
  const bColumns: ColumnProps<BColumnsType>[] = [
    {
      width: 150,
      title: '结算单号',
      dataIndex: 'orderNo',
      fixed: 'left',
    },
    {
      width: 160,
      title: '结算时间',
      dataIndex: 'date',
    },
    {
      width: 200,
      title: '结算商家 ',
      render: (record: BColumnsType) =>
        `ID：${record.merchantId} ${record.merchantName}`,
    },
    {
      width: 120,
      title: '商家所属区域',
      dataIndex: 'area',
    },
    {
      width: 90,
      title: '所属BD ',
      dataIndex: 'bd',
    },
    {
      width: 100,
      title: '结算D积分',
      dataIndex: 'dPoint',
    },
    {
      width: 120,
      title: '结算金额（元）',
      dataIndex: 'amount',
    },
    {
      width: 90,
      title: '结算状态  ',
      dataIndex: 'status',
      render: (status: number) =>
        status === 0 ? '结算中' : status === 1 ? '已结算' : '结算失败',
    },
    {
      title: '微信转账单号',
      dataIndex: 'wechatNo',
    },
  ];
  // BD业绩结算
  const cColumns: ColumnProps<CColumnsType>[] = [
    {
      title: '结算单号',
      dataIndex: 'orderNo',
      fixed: 'left',
    },
    {
      title: '结算时间',
      dataIndex: 'date',
    },
    {
      title: '结算BD ',
      dataIndex: 'bd',
    },
    {
      title: '结算金额（元）',
      dataIndex: 'amount',
    },
    {
      title: '结算状态  ',
      dataIndex: 'status',
      render: (status: number) =>
        status === 0 ? '结算中' : status === 1 ? '已结算' : '结算失败',
    },
    {
      title: '微信转账单号',
      dataIndex: 'wechatNo',
    },
  ];
  // 结算列表
  const dColumns: ColumnProps<DColumnsType>[] = [
    {
      width: 150,
      title: '结算单号',
      dataIndex: 'serialNo',
      fixed: 'left',
    },
    {
      width: 160,
      title: '结算时间',
      dataIndex: 'date',
    },
    {
      width: 120,
      title: '交易地区',
      dataIndex: 'area',
    },
    {
      width: 180,
      title: '触发用户',
      render: (record: DColumnsType) => `ID：${record.uid} ${record.uName}`,
    },
    {
      width: 220,
      title: '交易商家',
      render: (record: DColumnsType) =>
        `ID：${record.merchantId} ${record.merchantName}`,
    },
    {
      width: 160,
      title: '订单总金额（元）',
      dataIndex: 'totalAmount',
    },
    {
      width: 120,
      title: '抵扣D积分',
      dataIndex: 'deductionDPoint',
    },
    {
      width: 120,
      title: '支付现金（元）',
      dataIndex: 'payAmount',
    },
    {
      width: 120,
      title: '商家返D积分',
      dataIndex: 'merchantDPoint',
    },
    {
      width: 120,
      title: '平台补贴D积分 ',
      dataIndex: 'platformatDPoint',
    },
  ];

  // state
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('1');
  const [filterParams, setFilterParams] = useState<FilterParamsType>({});
  const [detailsModalVisible, setDetailsModalVisile] = useState(false);

  const [aDataSource, setADataSource] = useState<AColumnsType[]>([]);
  const [bDataSource, setBDataSource] = useState<BColumnsType[]>([]);
  const [cDataSource, setCDataSource] = useState<CColumnsType[]>([]);
  const [dDataSource, setDDataSource] = useState<DColumnsType[]>([]);

  const [aTotal, setATotal] = useState(0);
  const [bTotal, setBTotal] = useState(0);
  const [cTotal, setCTotal] = useState(0);
  const [dTotal, setDTotal] = useState(0);

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
  const [dPage, setDPage] = useState<DP.TablePageDataType<FilterParamsType>>(
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
    let d: DColumnsType[] = [];
    for (let i = 0; i < 66; i++) {
      d.push({
        key: `d___${i}`,
        serialNo: '2989302032220',
        date: '2020/11/11 23:11:11',
        area: '成都武侯区',
        uid: '83293239',
        uName: '李鸿耀',
        merchantId: 'KJ32KD',
        merchantName: ' 佳佳之星超市',
        totalAmount: 100,
        deductionDPoint: 215,
        payAmount: 97.85,
        merchantDPoint: 10,
        platformatDPoint: 5,
      });
    }
    setDDataSource(d);
    setDTotal(d.length);
    console.log(`
      请求数据
      请求页码：${dPage.page}
      每页条数：${dPage.pageSize}
    `);
  }, [dPage]);
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
                type="text"
                disabled={item.key === '3'}
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
                  disabledDate={(current) =>
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
      {/* 结算详情 */}
      <Modal
        visible={detailsModalVisible}
        title="结算详情"
        width={`calc(100vw - 426px)`}
        onOk={() => setDetailsModalVisile(false)}
        onCancel={() => setDetailsModalVisile(false)}
      >
        <Table
          columns={dColumns}
          dataSource={dDataSource}
          bordered
          size="small"
          scroll={{ y: 'calc(100vh - 400px)' }}
          pagination={{
            current: dPage.page /** 当前页数 */,
            hideOnSinglePage: false /** 只有一页时是否隐藏分页器 */,
            pageSize: dPage.pageSize /** 每页条数 */,
            showSizeChanger: true /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */,
            showQuickJumper: false /** 是否可以快速跳转至某页 */,
            total: dTotal,
            showTotal: (total: number, range: [number, number]) =>
              `共 ${total} 条`,
            onChange: (page: number) =>
              setDPage((prev) => ({
                ...prev,
                page,
              })),
            onShowSizeChange: (current: number, size: number) =>
              setDPage((prev) => ({
                ...prev,
                pageSize: size,
                page: current,
              })),
          }}
        />
      </Modal>
    </div>
  );
};

export default CapitalSettlement;
