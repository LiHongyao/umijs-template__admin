import React, { CSSProperties, FC, useState } from 'react';
import { Input, Select, Table, Space, Modal, Descriptions, Button, InputNumber } from 'antd';
import { ColumnProps } from 'antd/es/table';
import CityCascader from '@/components/CityCascader';

import './index.less';

const { Search } = Input;
const { Option } = Select;

type MerchantsType = {
  key: string;
  id: string; /** 商家ID */
  from: string; /** 城市区域 */
  merchantName: string; /** 商家名称  */
  merchantType: string; /** 商家类型  */
  service: string; /** 服务 */
  lockGuests: number; /** 锁客（人） */
  cashBalance: number; /** 现金余额 */
  dbeanBalance: number; /** D豆余额 */
  merchantBack: string; /** 商家返豆 */
  platformBack: string; /** 平台返豆 */
  subsidies: number; /** 平台补贴上限 */
  rewardSignInMerchants: number; /** 签到商家奖励 */
  platformRewards: number; /** 签到平台奖励 */
  deductionThreshold: number; /** 抵扣门槛 */
  maximumDeductible: number; /** 最高可抵扣 */
};





const dataSource: MerchantsType[] = [];
(function() {
    for(let i = 0; i < 100; i++) {
        dataSource.push({
            key: `${i}`,
            id: 'NO.0000',
            from: '成都 武侯区',
            merchantName: '天猫超市',
            merchantType: '便利店',
            service: '返、抵',
            lockGuests: 93238,
            cashBalance: 5290.02,
            dbeanBalance: 23200,
            merchantBack: '0.01%',
            platformBack: '0.02%',
            subsidies: 500,
            rewardSignInMerchants: 1,
            platformRewards: 1,
            deductionThreshold: 1,
            maximumDeductible: 1000
        })
    }
})();


const Manage_Merchants: FC = () => {
	
	// state
  const [merchantDetailsModalVisible, setMerchantDetailsModalVisible] = useState(false);
  const [settlementModalVisible, setSettlementModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  // events

  
  // 数据源
  const columns: ColumnProps<MerchantsType>[] = [
    { title: '商家ID', dataIndex: 'id', key: 'id', align: 'center', fixed: 'left' },
    { title: '城市区域', dataIndex: 'from', key: 'from', align: 'center' },
    { title: '商家类型', dataIndex: 'merchantType', key: 'merchantType', align: 'center' },
    { title: '商家名称', dataIndex: 'merchantName', key: 'merchantName', align: 'center'},
    { title: '服务', dataIndex: 'service', key: 'service', align: 'center' },
    { title: '锁客（人）', dataIndex: 'lockGuests', key: 'lockGuests', align: 'center' },
    { title: '现金余额（元）', dataIndex: 'cashBalance', key: 'cashBalance', align: 'center' },
    { title: 'D豆余额', dataIndex: 'dbeanBalance', key: 'dbeanBalance', align: 'center' },
    { title: '商家返豆/笔', dataIndex: 'merchantBack', key: 'merchantBack', align: 'center' },
    { title: '平台返豆/笔', dataIndex: 'platformBack', key: 'platformBack', align: 'center' },
    { title: '平台补贴上限/天（D豆）', width: 145, dataIndex: 'subsidies', key: 'subsidies', align: 'center' },
    { title: '签到商家奖励/次（D豆）', width: 145, dataIndex: 'rewardSignInMerchants', key: 'rewardSignInMerchants', align: 'center' },
    { title: '签到平台奖励/次（D豆）', width: 145, dataIndex: 'platformRewards', key: 'platformRewards', align: 'center' },
    { title: '起抵门槛/笔（元）', dataIndex: 'deductionThreshold', key: 'deductionThreshold', align: 'center' },
    { title: '最高可抵/笔（D豆）', dataIndex: 'maximumDeductible', key: 'maximumDeductible', align: 'center' },
    { title: '操作', key:"action", align: 'center', fixed: 'right', width: 180, render: () => (
      <Space size="middle">
        <a onClick={() => setMerchantDetailsModalVisible(true)}>详情/编辑</a>
        <a onClick={() => setSettlementModalVisible(true)}>结算D积分</a>
      </Space>
    )}
  ];

  return (
    <div className="page site-page merchants">
      {/* 顶栏 */}
      <div className="site-top-bar">
        <section>
          <span className="site-top-bar__title">商家管理</span>
        </section>
        <Space size="large">
          <span>
            <span className="site-top-bar__label">锁客：</span>
            <span className="site-top-bar__value">23232</span>
          </span>
          <span>
            <span className="site-top-bar__label">现金余额：</span>
            <span className="site-top-bar__value">9282.91元</span>
          </span>
          <span>
            <span className="site-top-bar__label">D豆余额：</span>
            <span className="site-top-bar__value">23232</span>
          </span>
        </Space>
      </div>
      {/* 过滤栏 */}
      <div className="site-filter-bar">
        {/* 左侧内容 */}
        <Space size="large">
          {/* 城市区域 */}
          <section>
            <span>城市区域：</span>
            <CityCascader onChange={(value) => {
              console.log(value)
            }}/>
          </section>
          {/* 类型 */}
          <section>
            <span>类型：</span>
            <Select defaultValue="">
              <Option value="">全部一级分类</Option>
            </Select>
            <Select defaultValue="">
              <Option value="">全部二级分类</Option>
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
      </div>
      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        size="small"
        
        scroll={{ x: 2000, y: 'calc(100vh - 300px)' }} 
      />
			{/* Modal - 商家详情弹出层 */}
      <Modal 
        zIndex={1}
        width={1000} 
        title="商家详情" 
        visible={merchantDetailsModalVisible} 
        bodyStyle={{padding: `8px 24px`}} 
        className="merchant-details-modal"
        okText="保存"
        onCancel={() => setMerchantDetailsModalVisible(false)}
        onOk={() => setMerchantDetailsModalVisible(false)}
      >
				<div>
					<div className="rounded-8">
						<Descriptions size="small" bordered column={4}>
							<Descriptions.Item label="商家ID">123232</Descriptions.Item>
							<Descriptions.Item label="商家名称">佳佳之星超市</Descriptions.Item>
              <Descriptions.Item label="商家类型">商超购物-便利店</Descriptions.Item>
							<Descriptions.Item label="城市区域">成都 武侯区</Descriptions.Item>
              <Descriptions.Item label="接入服务">可返、可抵</Descriptions.Item>
							<Descriptions.Item label="接入时间">2020/11/11</Descriptions.Item>
							<Descriptions.Item label="联系人">王大兵</Descriptions.Item>
              <Descriptions.Item label="绑定微信">Li-HONGYAO</Descriptions.Item>
              <Descriptions.Item label="详细地址" span={4}>四川省成都市高新区雅和南四路216号龙湖九里晴川1栋1单元29楼4号房</Descriptions.Item>
							<Descriptions.Item label="手机账号" span={2}>157382973921</Descriptions.Item>
							<Descriptions.Item label="对接BD" span={2}>刘大河 19382986736</Descriptions.Item>
              <Descriptions.Item label="现金余额" span={2}>5920.12元 <span className="f12 color-888888">(注：T+1早上10:00自动结算)</span></Descriptions.Item>
              <Descriptions.Item label="累计结算" span={2} className="color-458EDB">50笔  共3000.00元</Descriptions.Item>
              <Descriptions.Item label="D豆余额" span={2}>23200 <Button size="small" type="primary" style={{fontSize: 12}} onClick={() => setSettlementModalVisible(true)}>结算D积分</Button></Descriptions.Item>
							<Descriptions.Item label="累计结算" span={2} className="color-458EDB">50笔  共3000个D豆</Descriptions.Item>
              <Descriptions.Item label="累计交易" span={2}>89000.00元</Descriptions.Item>
							<Descriptions.Item label="签到奖励D豆" span={2}>23200</Descriptions.Item>
              <Descriptions.Item label="累计返D豆" span={2}>23200</Descriptions.Item>
							<Descriptions.Item label="累计签到D豆" span={2}>23200</Descriptions.Item>
							<Descriptions.Item label="累计补贴D豆" span={2}>23200</Descriptions.Item>
							<Descriptions.Item label="累计签到补贴" span={2}>23200</Descriptions.Item>
						</Descriptions>
					</div>
					<div className="rounded-8 mt-8">
            <div className="d-flex justify-content-between">
              <h4># 设置商家返D豆/D豆抵扣</h4>
              {disabled ? (
                <span className="color-458EDB cursor-pointer" onClick={() => setDisabled(false)}>设置</span>
              ) : (
                <span className="color-458EDB cursor-pointer" onClick={() => setDisabled(true)}>取消</span>
              )}
            </div>
						<Descriptions size="small" bordered column={3}>
							<Descriptions.Item label="商家返豆/笔" >
                <InputNumber placeholder="" disabled={disabled}/>
                <span>%</span>
              </Descriptions.Item>
							<Descriptions.Item label="平台返豆/笔" >
                <InputNumber placeholder="" disabled={disabled}/>
                <span>%</span>
              </Descriptions.Item>
              <Descriptions.Item label="起抵门槛/笔" >
                <InputNumber placeholder="" disabled={disabled}/>
                <span>元</span>
              </Descriptions.Item>
              <Descriptions.Item label="平台补贴上限/天（D豆）" >
                <InputNumber placeholder="" disabled={disabled}/>
              </Descriptions.Item>
              <Descriptions.Item label="签到商家奖励（D豆）" >
                <InputNumber placeholder="" disabled={disabled}/>
              </Descriptions.Item>
              <Descriptions.Item label="签到平台奖励（D豆）" >
               <InputNumber placeholder="" disabled={disabled}/>
              </Descriptions.Item>
              <Descriptions.Item label="最高可抵/笔（D豆）" >
                <InputNumber placeholder="" disabled={disabled} />
              </Descriptions.Item>
						</Descriptions>
					</div>
				</div>
			</Modal>
      {/* Modal - 结算 */}
      <Modal 
        zIndex={2}
        title="结算D积分"
        className="merchant-details-modal"
        visible={settlementModalVisible}
        onOk={() => {
          Modal.confirm({
            title:"确认结算D豆",
            content: (
              <>
                <section>
                  <span className="color-666666">结算D豆：</span>
                  <span>2000</span>
                </section>
                <section>
                  <span className="color-666666">转账零钱：</span>
                  <span>20元</span>
                </section>
                <section>
                  <span className="color-666666">账户剩余：</span>
                  <span>21200</span>
                  <span className="f12 color-666666">(价值212.00元)</span></section>
              </>
            ),
            onOk: () => {
              setSettlementModalVisible(false)
            }
          });
        }}
        onCancel={() => setSettlementModalVisible(false)}
        width={1000}
        okText="提交结算"
      >
        <Descriptions size="small" bordered column={4}>
          <Descriptions.Item label="商家ID">1232132</Descriptions.Item>
          <Descriptions.Item label="商家名称">佳佳之星超市</Descriptions.Item>
          <Descriptions.Item label="城市区域">成都 武侯区</Descriptions.Item>
          <Descriptions.Item label="手机账号">17398888669</Descriptions.Item>
          <Descriptions.Item label="D豆余额" span={4}>23200</Descriptions.Item>
          <Descriptions.Item label="结算D豆" span={4}>
            <InputNumber placeholder="请输入结算D豆数量" style={{width: 200}}  />
            <span className="ml-10">剩余：</span>
            <span>23200（价值212.00元）</span>
          </Descriptions.Item>
          <Descriptions.Item label="付款金额" span={4}>20.00元</Descriptions.Item>
          <Descriptions.Item label="付款到" span={4}>商家零钱</Descriptions.Item>
          <Descriptions.Item label="商家微信" span={4}>阿拉斯加小的</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default Manage_Merchants;
