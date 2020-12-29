import React, { FC, useState, useEffect } from 'react';
import { ColumnProps } from 'antd/es/table';
import moment from 'moment';
import {
  Tabs,
  Table,
  Tooltip,
  DatePicker,
  Input,
  Select,
  Button,
  Space,
  Modal,
  Descriptions,
  Form,
} from 'antd';
import classNames from 'lg-classnames';
import { useBoolean } from '@umijs/hooks';
import CityCascader from '@/components/CityCascader';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

// 过滤数据类型
type FilterParamsType = {
  date?: any[];
  city?: string[];
  searchKey?: string;
  bdmUid?: string;
};

// 最新申请
type AColumnsType = {
  key: string;
  date: string /** 提交时间    */;
  name: string /** 姓名 */;
  phone: string /** 手机号 */;
  area: string /** 城市/区县 */;
  introduction: string /** 个人介绍 */;
  note: string /** 备注 */;
};

// 已认证BD
type BColumnsType = {
  key: string;
  date: string /** 认证时间 */;
  name: string /** 姓名 */;
  phone: string /** 手机号 */;
  area: string /** 城市/区县 */;
  wechat: string /** 绑定微信 */;
  bdm: string /** 对接BDM  */;
  merchantNum: number /**  负责商家数量（家） */;
  guests: number /** 锁客（人） */;
  tasks: number /** 完成佣金任务（次） */;
  balance: number /** 余额（元） */;
  note: string /** 备注 */;
};

const settleDatas = [
  { merchantName: '佳佳便利店', amount: 100, key: 0 },
  { merchantName: '红旗超市', amount: 100, key: 1 },
  { merchantName: '永辉超市', amount: 100, key: 2 },
  { merchantName: '百分百超市', amount: 100, key: 3 },
  { merchantName: '司南超市', amount: 100, key: 4 },
  { merchantName: '司南超市', amount: 100, key: 5 },
  { merchantName: '司南超市', amount: 100, key: 6 },
  { merchantName: '司南超市', amount: 100, key: 7 },
  { merchantName: '司南超市', amount: 100, key: 8 },
  { merchantName: '司南超市', amount: 100, key: 9 },
];

const Manage_BD: FC = () => {
  // columns data
  const settlementColumns: ColumnProps<any>[] = [
    {
      title: '店铺名称',
      dataIndex: 'merchantName',
      key: 'merchantName',
    },
    {
      title: '结算金额',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];
  const aColumns: ColumnProps<AColumnsType>[] = [
    {
      width: 60,
      title: '序号',
      render: (text: AColumnsType, record: AColumnsType, index) =>
        `${index + 1}`,
    },
    {
      width: 180,
      title: '提交时间',
      dataIndex: 'date'
    },
    {
      width: 100,
      title: '姓名',
      dataIndex: 'name'
    },
    {
      width: 120,
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      width: 120,
      title: '城市/区县',
      dataIndex: 'area'
    },
    {
      title: '个人介绍',
      dataIndex: 'introduction',
      render: (introduction: string) => (
        <Tooltip title={introduction}>
          <div className="line-clamp-1 text-left">{introduction}</div>
        </Tooltip>
      ),
    },
    {
      width: 60,
      title: '备注',
      dataIndex: 'note',
      render: (record: string) => {
        return record.length > 0 ? (
          <a onClick={showRemark}>有</a>
        ) : (
          <span>无</span>
        );
      },
    },
  ];
  const bColumns: ColumnProps<BColumnsType>[] = [
    {
      width: 60,
      title: '序号',
      render: (text: BColumnsType, record: BColumnsType, index) =>
        `${index + 1}`,
    },
    {
      width: 180,
      title: '认证时间',
      dataIndex: 'date',
    },
    {
      width: 100,
      title: '姓名',
      dataIndex: 'name'
    },
    {
      width: 120,
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      width: 120,
      title: '城市/区县',
      dataIndex: 'area'
    },
    {
      width: 200,
      title: '绑定微信',
      dataIndex: 'wechat'
    },
    {
      width: 100,
      title: '对接BDM',
      dataIndex: 'bdm'
    },
    {
      width: 160,
      title: '负责商家数量（家）',
      dataIndex: 'merchantNum'
    },
    {
      width: 100,
      title: '锁客（人）',
      dataIndex: 'guests'
    },
    {
      width: 160,
      title: '完成佣金任务（次）',
      dataIndex: 'tasks'
    },
    {
      width: 100,
      title: '余额（元）',
      dataIndex: 'balance'
    },
    {
      width: 80,
      title: '备注',
      dataIndex: 'note',
      render: (record: string) => {
        return record.length > 0 ? (
          <a onClick={showRemark}>有</a>
        ) : (
          <span>无</span>
        );
      },
    },
    {
      width: 160,
      title: '操作',
      align: 'center',
      key: 'operation',
      fixed: 'right',
      render: () => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            style={{ color: '#458edb' }}
            onClick={showBdDetails}
          >
            详情/编辑
          </Button>
          <Button type="text" size="small" danger onClick={showSettlement}>
            结算
          </Button>
        </Space>
      ),
    },
  ];

  // state

  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('1');
  const [filterParams, setFilterParams] = useState<FilterParamsType>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const [aDataSource, setADataSource] = useState<AColumnsType[]>([]);
  const [bDataSource, setBDataSource] = useState<BColumnsType[]>([]);

  const [aTotal, setATotal] = useState(0);
  const [bTotal, setBTotal] = useState(0);

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

  const {
    state: bdDetailsVisible,
    setTrue: showBdDetails,
    setFalse: hideBdDetails,
  } = useBoolean();
  const {
    state: settlementVisible,
    setTrue: showSettlement,
    setFalse: hideSettlement,
  } = useBoolean();
  const {
    state: remarkVisible,
    setTrue: showRemark,
    setFalse: hideRemark,
  } = useBoolean();

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
            date: '2020/11/11 23:11:11 ',
            name: '李鸿耀',
            phone: '17398888669',
            area: '成都武侯区',
            introduction:
              '天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为。所以动心忍性，增益其所不能。',
            note: '曾经沧海难为水，疑是银河落九天。',
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
            date: '2020/11/11 23:11:11 ',
            name: '李鸿耀',
            phone: '17398888669',
            area: '成都武侯区',
            merchantNum: 100,
            guests: 99999,
            tasks: 1000,
            balance: 300,
            note: '曾经沧海难为水，疑是银河落九天。',
            wechat: 'Li_HONGYAO',
            bdm: '周杰伦',
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
    }
  }, [activeKey, aPage, bPage]);

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
            {activeKey === '2' && (
              <>
                <span>
                  <span className="site-top-bar__label">商家数量：</span>
                  <span className="site-top-bar__value">23232家</span>
                </span>
                <span>
                  <span className="site-top-bar__label">锁客：</span>
                  <span className="site-top-bar__value">23233232人</span>
                </span>
                <span>
                  <span className="site-top-bar__label">余额：</span>
                  <span className="site-top-bar__value">232322元</span>
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
              {/* 锁定BD */}
              <Form.Item label="时间：" name="date">
                {/* 限制只能选取当日之前的日期 */}
                <RangePicker
                  disabledDate={current =>
                    current && current > moment().subtract(1, 'days')
                  }
                />
              </Form.Item>
              {/* 城市区域 */}
              <Form.Item label="城市区域：" name="city">
                <CityCascader />
              </Form.Item>
              {/* BDM */}
              {activeKey === '2' && (
                <Form.Item label="BD：" name="bdmUid">
                  <Select placeholder="请选择" allowClear>
                    <Option value="李鸿耀">李鸿耀</Option>
                    <Option value="王理">王理</Option>
                  </Select>
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
                <Button htmlType="submit" type="primary" size="middle">
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
    <div className="page site-page ">
      {/* tabs */}
      <Tabs
        activeKey={activeKey}
        defaultValue="apply"
        renderTabBar={renderTabBar}
      >
        <TabPane tab="最新申请" key="1">
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
        <TabPane tab="已认证BD" key="2">
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
      </Tabs>
      {/* 弹框 */}
      {/* BD详情 */}
      <Modal
        title="BD详情"
        visible={bdDetailsVisible}
        width={1000}
        onOk={() => {
          hideBdDetails();
        }}
        onCancel={hideBdDetails}
        okText="保存"
      >
        <Descriptions
          size="small"
          bordered
          column={3}
          className="descriptions-wrapper"
        >
          <Descriptions.Item label="姓名">王老九</Descriptions.Item>
          <Descriptions.Item label="认证时间">
            2020/11/11 09:11:21
          </Descriptions.Item>
          <Descriptions.Item label="城市区县">成都 武侯区</Descriptions.Item>
          <Descriptions.Item label="手机号">17398888669</Descriptions.Item>
          <Descriptions.Item label="绑定微信">Li_HONGYAO</Descriptions.Item>
          <Descriptions.Item label="对接BDM">唐大军</Descriptions.Item>
          <Descriptions.Item label="锁客人数（人）">32323</Descriptions.Item>
          <Descriptions.Item label="余额（元）">232322.00</Descriptions.Item>
          <Descriptions.Item label="已结算">2323323.00</Descriptions.Item>
          <Descriptions.Item label="负责商家数量（家）">7</Descriptions.Item>
          <Descriptions.Item label="完成佣金任务（次）">5</Descriptions.Item>
        </Descriptions>
        <Descriptions
          size="small"
          bordered
          style={{ marginTop: 12 }}
          className="descriptions-wrapper"
        >
          <Descriptions.Item label="BDM" span={3}>
            <Select style={{ width: 300 }} defaultValue="刘以达 17398888669">
              <Option key="bdm_1" value="刘以达 17398888669">
                刘以达 17398888669
              </Option>
              <Option key="bdm_2" value="李达康 17398888669">
                李达康 17398888669
              </Option>
            </Select>
          </Descriptions.Item>
        </Descriptions>
        <div className="my-12">备注</div>
        <TextArea allowClear placeholder="请输入备注信息" />
      </Modal>
      {/* 结算 */}
      <Modal
        title="结算"
        visible={settlementVisible}
        width={500}
        onOk={() => {
          hideSettlement();
        }}
        onCancel={hideSettlement}
        okText="提交结算"
      >
        <Descriptions size="small" column={2} className="descriptions-wrapper">
          <Descriptions.Item key="se1" label="BD">
            王老九 19384929022
          </Descriptions.Item>
          <Descriptions.Item key="se2" label="收款微信ID">
            阿拉斯加小的
          </Descriptions.Item>
        </Descriptions>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <Button
            type="primary"
            size="small"
            disabled={selectedRowKeys.length === 0}
            onClick={() => setSelectedRowKeys([])}
          >
            重新选择
          </Button>
          <span style={{ marginLeft: 8 }}>
            当前选中 {selectedRowKeys.length} 家店铺
          </span>
        </div>
        <Table
          size="small"
          columns={settlementColumns}
          dataSource={settleDatas}
          style={{ marginTop: 12 }}
          pagination={false}
          scroll={{y: `calc(100vh - 450px)`}}
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              setSelectedRowKeys(selectedRowKeys);
            },
            selectedRowKeys,
          }}
          // summary={() => {
          //   return (
          //     <Table.Summary.Row>
          //       <Table.Summary.Cell index={0}>结算：</Table.Summary.Cell>
          //       <Table.Summary.Cell index={1}>
          //         <span className="f18 f-bold">200元</span>
          //       </Table.Summary.Cell>
          //     </Table.Summary.Row>
          //   );
          // }}
        />
        <div className="mt-12">
          <span>结算：</span>
          <span className="f18 f-bold">200元</span>
        </div>
      </Modal>
      {/* 备注 */}
      <Modal
        title="备注"
        visible={remarkVisible}
        onOk={hideRemark}
        onCancel={hideRemark}
        okText="保存"
      >
        <TextArea
          placeholder="请输入备注信息，不多于500字"
          maxLength={500}
          rows={5}
        ></TextArea>
      </Modal>
    </div>
  );
};

export default Manage_BD;
