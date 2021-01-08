/*
 * @Author: Li-HONGYAO
 * @Date: 2021-01-04 16:31:33
 * @LastEditTime: 2021-01-08 13:28:49
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /umijs-template__admin/src/layouts/Headers/index.tsx
 */

// 天气API => ref：https://id.qweather.com/#/homepage
// 定位API => ref：https://console.amap.com/dev/index
/**
 * 温馨提示：
 * 模板使用者请注意啦，由于天气查询及定位API接口（免费版）有每日调用次数限制，所以大家可以点击上面的API链接，
 * 注册对应平台的开发者账号并且创建应用，然后将本模板中调用API的key值替换成你创建的应用key值，感谢配合！
 * 
 * 替换位置：
 * 定位API => ./src/pages/document.ejs 
 * 天气API => 当前文件，搜索变量 “key”
 */

import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Space, message, Avatar } from 'antd';
import {
  history,
  ConnectProps,
  connect,
  UserModelState,
  withRouter,
} from 'umi';

import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,
  LoginOutlined,
  LockOutlined,
  EnvironmentFilled,
} from '@ant-design/icons';

import moment from 'moment';
import Tools from 'lg-tools';
import Cookie from 'lg-cookie';
import 'moment/locale/zh-cn';
import './index.less';

const { Header } = Layout;

interface IProps extends ConnectProps {
  user: UserModelState;
}


const Headers: FC<IProps> = (props) => {
  // state
  const [isFull, setIsFull] = useState(false);
  const [city, setCity] = useState('');
  const [tips, setTips] = useState('');
  const [weather, setWeather] = useState({
    tempMin: 0,
    tempMax: 0,
    text: '',
    icon: ''
  });
  // events
  const onChangePSW = () => {
    message.warning('暂未开放');
  };
  const onLoginOut = () => {
    Cookie.del('XXX_ADMIN_TOKEN');
    history.push('/login');
  };
  // effects

  // 提示语
  useEffect(() => {
    const list = [
      '百川东到海，何时复西归？少壮不尽力，老大徒伤悲。——汉乐府《长歌行》',
      '百学须先立志。——朱熹',
      '老当益壮，宁移白首之心；穷且益坚，不坠青云之志。——唐·王勃',
      '子曰：“知者不惑，仁者不忧，勇者不惧。”——《子罕》',
      '志不强者智不达，言不信者行不果。——墨翟',
      '天行健，君子以自强不息。地势坤，君子以厚德载物。——《易经》',
      '古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。——苏轼',
      '海纳百川，有容乃大；壁立千仞，无欲则刚。——林则徐',
      '其身正，不令而行；其身不正，虽令不从。——《论语》',
      '穷则独善其身，达则兼善天下。——《孟子》',
      '勿以恶小而为之，勿以善小而不为。——刘备'
    ];
    const index = Tools.randomInteger(0, list.length);
    setTips(list[index]);
  }, []);

  // 全屏
  useEffect(() => {
    const handler = () => {
      if (document.fullscreenElement) {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
    };
    window.addEventListener('resize', handler, false);
    return () => window.removeEventListener('resize', handler, false);
  }, []);

  // 处理定位 & 天气
  useEffect(() => {
    const mapObj = new window.AMap.Map('iCenter');
    mapObj.plugin('AMap.Geolocation', function () {
      const geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new window.AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition();
      window.AMap.event.addListener(geolocation, 'complete', (data: any) => {
        // 记录位置信息
        setCity(data.addressComponent.city + data.addressComponent.district);
        // 请求天气数据
        const location = `${data.position.lng},${data.position.lat}`;
        const key = '59f15e551c5b4772851dcc0026e67f6a';
        const url = `https://devapi.qweather.com/v7/weather/3d?location=${location}&key=${key}`;
        fetch(url).then(async (response: any) => {
          const res = await response.clone().json();
          if (res.code === '200') {
            setWeather({
              tempMin: res.daily[0].tempMin,
              tempMax: res.daily[0].tempMax,
              text: res.daily[0].textDay,
              icon: res.daily[0].iconDay
            });
          }
        });
      }); //返回定位信息
      window.AMap.event.addListener(geolocation, 'error', (err: any) => {
        console.log(err);
      }); //返回定位出错信息
    });
  }, []);
  // render
  return (
    <Header className="site-layout-header">
      {/* 左侧提示信息 */}
      <div>{tips}</div>
      {/* 右侧内容 */}
      <Space size="large">
        {/* 日期 */}
        <span>{moment().format('YYYY年MM月DD日 dddd')}</span>
        {/* 定位信息 & 天气 */}
        <Space>
          <>
            <EnvironmentFilled />
            <span>{city}</span>
          </>
          <span>{weather.text}</span>
          {weather.icon && (
            <img src={require(`../../assets/images/qweather/${weather.icon}.png`)} className="icon-38x38"/>
          )}
          <span>
            {weather.tempMin}℃ ~ {weather.tempMax}℃
          </span>
        </Space>
        {/* 下拉菜单 */}
        <Dropdown
          trigger={['click']}
          overlay={() => (
            <Menu>
              <Menu.Item
                key="changePsw"
                icon={<LockOutlined />}
                onClick={onChangePSW}
              >
                修改密码
              </Menu.Item>
              <Menu.Item
                key="loginOut"
                icon={<LoginOutlined />}
                onClick={onLoginOut}
              >
                退出登录
              </Menu.Item>
            </Menu>
          )}
        >
          <div
            onClick={(e) => e.preventDefault()}
            className="cursor-pointer flex-center"
          >
            <Avatar size="small" style={{background: '#00a2ae'}}>U</Avatar>
            <span className="mx-8">{props.user.username || '管理员'}</span>
            <DownOutlined />
          </div>
        </Dropdown>
        {isFull ? (
          <FullscreenExitOutlined
            onClick={() => Tools.exitFullscreen()}
            style={{ fontSize: 20 }}
          />
        ) : (
          <FullscreenOutlined
            onClick={() => Tools.launchFullscreen()}
            style={{ fontSize: 20 }}
          />
        )}
      </Space>
    </Header>
  );
};

const mapStateToProps = ({ user }: { user: UserModelState }) => ({
  user,
});

export default withRouter(
  // @ts-ignore
  connect(mapStateToProps)(Headers),
);
