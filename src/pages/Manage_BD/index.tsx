import React, { FC, useState } from 'react';
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
} from 'antd';
import classNames from 'lg-classnames';
import { useBoolean } from '@umijs/hooks';
import CityCascader from '@/components/CityCascader';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Search, TextArea } = Input;
const { Option } = Select;

type ApplyType = {
  key: number;
  submitDate: string;
  name: string;
  phone: string;
  from: string;
  introduce: string;
  note: string;
};

type CertifiedType = {
  key: number;
  certifiedDate: string;
  name: string;
  phone: string;
  from: string;
  wechat: string;
  bdm: string;
  merchants: number;
  guest: number;
  tasks: number;
  balance: number;
  remark: string;
};

const applyDatasource: ApplyType[] = [];
const certifiedDataSource: CertifiedType[] = [];

(function() {
  for (let i = 0; i < 100; i++) {
    applyDatasource.push({
      key: i,
      submitDate: '2020/11/11',
      name: '李鸿耀',
      phone: '17398888669',
      from: '成都/高新区',
      introduce:
        '帅哥的卡萨就打开了的健康路撒即可得了拉萨的记录卡倒计时咔经典款拉数据枯鲁杜鹃快来撒简历打开',
      note: '超级大帅哥',
    });
  }
  for (let i = 0; i < 100; i++) {
    certifiedDataSource.push({
      key: i,
      certifiedDate: '2020/11/11 09:11:32',
      name: '李鸿耀',
      phone: '17398888669',
      from: '成都 武侯区',
      wechat: 'Li-HONGYAO',
      bdm: '王理',
      merchants: 7,
      guest: 18978,
      tasks: 2032,
      balance: 100003,
      remark: '有',
    });
  }
})();

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
  const applyColumns: ColumnProps<ApplyType>[] = [
    {
      width: 60,
      title: '序号',
      align: 'center',
      render: (text: ApplyType, record: ApplyType, index) => `${index + 1}`,
    },
    {
      width: 120,
      title: '提交时间',
      dataIndex: 'submitDate',
      key: 'submitDate',
      align: 'center',
    },
    {
      width: 100,
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      width: 120,
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      width: 120,
      title: '城市/区县',
      dataIndex: 'from',
      key: 'from',
      align: 'center',
    },
    {
      title: '个人介绍',
      dataIndex: 'introduce',
      key: 'introduce',
      align: 'center',
      render: (introduce: string) => (
        <Tooltip title={introduce}>
          <div className="line-clamp-2 text-left">{introduce}</div>
        </Tooltip>
      ),
    },
    {
      width: 200,
      title: '备注',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
    },
  ];
  const certifiedColumns: ColumnProps<CertifiedType>[] = [
    {
      width: 60,
      title: '序号',
      align: 'center',
      render: (text: CertifiedType, record: CertifiedType, index) =>
        `${index + 1}`,
    },
    {
      width: 200,
      title: '认证时间',
      align: 'center',
      dataIndex: 'certifiedDate',
      key: 'certifiedDate',
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      align: 'center',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '城市/区县',
      align: 'center',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: '绑定微信',
      align: 'center',
      dataIndex: 'wechat',
      key: 'wechat',
    },
    {
      title: '对接BDM',
      align: 'center',
      dataIndex: 'bdm',
      key: 'bdm',
    },
    {
      width: 160,
      title: '负责商家数量（家）',
      align: 'center',
      dataIndex: 'merchants',
      key: 'merchants',
    },
    {
      title: '锁客（人）',
      align: 'center',
      dataIndex: 'guest',
      key: 'guest',
    },
    {
      width: 160,
      title: '完成佣金任务（次）',
      align: 'center',
      dataIndex: 'tasks',
      key: 'tasks',
    },
    {
      title: '余额（元）',
      align: 'center',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      key: 'remark',
      render: record => {
        return record === '有' ? (
          <a onClick={showRemark}>{record}</a>
        ) : (
          <span>{record}</span>
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      key: 'operation',
      fixed: 'right',
      width: 160,
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
  const [activeKey, setActiveKey] = useState('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
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
                onClick={() => setActiveKey(item.key)}
              >
                {item.title}
              </section>
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
          <Space size="large">
            {/* 锁定BD */}
            <section>
              <span>时间：</span>
              <RangePicker
                disabledDate={current => {
                  return current && current > moment().endOf('day');
                }}
              />
            </section>
            {/* 城市区域 */}
            <section>
              <span>城市区域：</span>
              <CityCascader
                onChange={value => {
                  console.log(value);
                }}
              />
            </section>
            {/* BDM */}
            {activeKey === '2' && (
              <section>
                <span>BDM：</span>
                <Select style={{ width: 120 }} defaultValue="全部">
                  <Option key="B1" value="全部">
                    全部
                  </Option>
                  <Option key="B2" value="已绑定">
                    已绑定
                  </Option>
                  <Option key="B3" value="未绑定">
                    未绑定
                  </Option>
                </Select>
              </section>
            )}
            {/* 搜索 */}
            <section>
              <Search
                placeholder="BD姓名/手机号"
                style={{ width: 220 }}
                allowClear
                enterButton="搜索"
                size="middle"
              />
            </section>
          </Space>
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
            columns={applyColumns}
            dataSource={applyDatasource}
            bordered
            size="small"
            scroll={{ y: 'calc(100vh - 300px)' }}
          />
        </TabPane>
        <TabPane tab="已认证BD" key="2">
          <Table
            scroll={{ x: 1700, y: 'calc(100vh - 300px)' }}
            columns={certifiedColumns}
            dataSource={certifiedDataSource}
            bordered
            size="small"
            pagination={{
              pageSize: 12,
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
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              setSelectedRowKeys(selectedRowKeys);
            },
            selectedRowKeys,
          }}
          summary={() => {
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>结算：</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span className="f18 f-bold">200元</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
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
