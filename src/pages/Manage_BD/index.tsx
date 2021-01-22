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
  Form,
  message,
  Modal,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'lg-classnames';
import CityCascader from '@/components/CityCascader';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// 过滤数据类型
type FilterParamsType = {
  date?: any[];
  city?: string[];
  searchKey?: string;
  bdmUid?: string;
};

// 列数据类型
type ColumnsType = {
  key: string;
  subTime: string /** 提交时间 */;
  checkTime: string /** 认证时间 */;
  name: string /** 姓名 */;
  phone: string /** 手机号 */;
  area: string /** 城市/区县 */;
  introduction: string /** 个人介绍 */;
  wechat: string /** 绑定微信 */;
  bdm: string /** 对接BDM  */;
  merchantNum: number /**  负责商家数量（家） */;
  guests: number /** 锁客（人） */;
  tasks: number /** 完成佣金任务（次） */;
  balance: number /** 余额（元） */;
};

const Manage_BD: FC = () => {
  // columns data
  const aColumns: ColumnProps<ColumnsType>[] = [
    {
      width: 60,
      title: '序号',
      render: (text: ColumnsType, record: ColumnsType, index) => `${index + 1}`,
    },
    {
      title: '提交时间',
      dataIndex: 'subTime',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '城市/区县',
      dataIndex: 'area',
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
  ];
  const bColumns: ColumnProps<ColumnsType>[] = [
    {
      width: 60,
      title: '序号',
      render: (text: ColumnsType, record: ColumnsType, index) => `${index + 1}`,
    },
    {
      title: '认证时间',
      dataIndex: 'checkTime',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '城市/区县',
      dataIndex: 'area',
    },
    {
      title: '绑定微信',
      dataIndex: 'wechat',
    },
    {
      title: '对接BDM',
      dataIndex: 'bdm',
    },
    {
      title: '负责商家数量（家）',
      dataIndex: 'merchantNum',
    },
    {
      title: '锁客（人）',
      dataIndex: 'guests',
    },
    {
      title: '完成佣金任务（次）',
      dataIndex: 'tasks',
    },
    {
      title: '余额（元）',
      dataIndex: 'balance',
    },
  ];

  // state

  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('1');
  const [filterParams, setFilterParams] = useState<FilterParamsType>({});

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectModalVisible, setRejectModalVisible] = useState(false);

  const [aDataSource, setADataSource] = useState<ColumnsType[]>([]);
  const [bDataSource, setBDataSource] = useState<ColumnsType[]>([]);

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
    }
  };
  // 审核
  const callAudit = (status: number) => {
    message.success('操作成功！');
    setSelectedRowKeys([]);
    setRejectReason('');
    setRejectModalVisible(false);
  };
  const onAudit = (status: number) => {
    if (selectedRowKeys.length === 0) {
      message.info(
        `请选择需要 ${status ? '「通过审核」' : '「驳回审核」'} 的条目！`,
      );
      return;
    }
    if (status === 1) {
      callAudit(1);
    } else {
      setRejectModalVisible(true);
    }
  };
  // effects
  useEffect(() => {
    let startDate: string | undefined;
    let endDate: string | undefined;
    if (filterParams.date) {
      startDate = filterParams.date[0].format('YYYY-MM-DD');
      endDate = filterParams.date[1].format('YYYY-MM-DD');
      console.log(startDate, endDate);
    }
    message.loading('数据加载中...');
    switch (activeKey) {
      case '1':
        let a: ColumnsType[] = [];
        for (let i = 0; i < 66; i++) {
          a.push({
            key: `a___${i}`,
            subTime: '2020/11/11 23:11:11 ',
            name: '李鸿耀',
            phone: '17398888669',
            area: '成都武侯区',
            introduction: '前端技术专家',
          } as ColumnsType);
        }

        console.log(`
          请求数据
          请求页码：${aPage.page}
          每页条数：${aPage.pageSize}
          过滤数据：${JSON.stringify(aPage.filters)}
        `);
        setTimeout(() => {
          setADataSource(a);
          setATotal(a.length);
          message.destroy();
        }, 1000);
        break;
      case '2':
        let b: ColumnsType[] = [];
        for (let i = 0; i < 88; i++) {
          b.push({
            key: `b___${i}`,
            checkTime: '2020/11/11 23:11:11 ',
            name: '李鸿耀',
            phone: '17398888669',
            area: '成都武侯区',
            merchantNum: 100,
            guests: 99999,
            tasks: 1000,
            balance: 300,
            wechat: 'Li_HONGYAO',
            bdm: '周杰伦',
          } as ColumnsType);
        }

        setTimeout(() => {
          message.destroy();
          setBDataSource(b);
          setBTotal(b.length);
        }, 1000);
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
            {/* 锁定BD */}
            <Form.Item label="时间：" name="date">
              {/* 限制只能选取当日之前的日期 */}
              <RangePicker
                disabledDate={(current) =>
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
              <Button
                htmlType="submit"
                type="primary"
                size="middle"
                icon={<SearchOutlined />}
              >
                搜索
              </Button>
            </Form.Item>
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
        <TabPane tab="待审核BD" key="1">
          <Table
            columns={aColumns}
            dataSource={aDataSource}
            bordered
            size="small"
            scroll={{ y: 'calc(100vh - 300px)' }}
            rowKey="key"
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys) =>
                setSelectedRowKeys(selectedRowKeys),
              selectedRowKeys,
            }}
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
            footer={() => (
              <Space>
                <span style={{ marginLeft: 8 }}>
                  当前选中 {selectedRowKeys.length} 家店铺
                </span>
                <Button size="small" type="primary" onClick={() => onAudit(1)}>
                  审核通过
                </Button>
                <Button
                  size="small"
                  danger
                  type="primary"
                  onClick={() => onAudit(0)}
                >
                  审核驳回
                </Button>
              </Space>
            )}
          />
        </TabPane>
        <TabPane tab="已认证BD" key="2">
          <Table
            columns={bColumns}
            dataSource={bDataSource}
            bordered
            size="small"
            scroll={{ y: 'calc(100vh - 275px)' }}
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
      </Tabs>

      {/* 驳回/发放失败理由 */}
      <Modal
        title="驳回理由"
        visible={rejectModalVisible}
        onOk={() => {
          if (rejectReason) {
            callAudit(0);
          } else {
            message.info('请填写驳回原因！');
          }
        }}
        onCancel={() => {
          setRejectReason('');
          setRejectModalVisible(false);
        }}
        okText="确认驳回"
      >
        <TextArea
          placeholder="请输入驳回理由，不多于100个字符"
          maxLength={100}
          rows={2}
          value={rejectReason}
          onChange={({ target: { value } }) => {
            setRejectReason(value);
          }}
        />
      </Modal>
    </div>
  );
};

export default Manage_BD;
