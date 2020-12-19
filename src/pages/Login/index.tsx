import React, { FC, useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { history, connect, UserModelState } from 'umi';
import Particles from 'react-particles-js';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Cookie from 'lg-cookie';
import './index.less';

interface IProps {
  updateUserModel: (values: UserModelState) => void;
}

const Login: FC<IProps> = props => {
  // state
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // events
  const onLogin = (values: { username: string; password: string }) => {
    console.log(values);
    setLoading(true);
    // 模拟接口登录
    setTimeout(() => {
      setLoading(false);
      Cookie.set('XXX_ADMIN_TOKEN', '此处为服务器返回的token');
      props.updateUserModel({
        token: '此处为服务器返回的token',
        username: '____耀哥',
      });
      history.push('/');
    }, 1000);
  };
  // render
  return (
    <div className="page login">
      <Particles
        params={{
          particles: {
            line_linked: {
              shadow: {
                enable: true,
                color: '#fff',
                blur: 15,
              },
            },
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 1,
                sync: false,
              },
            },
            size: {
              value: 10,
              random: true,
              anim: {
                enable: false,
                speed: 180,
                size_min: 0.1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 6,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
            },
            modes: {
              grab: {
                distance: 100,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 100,
                size: 80,
                duration: 2,
                opacity: 0.8,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
      <div className="login-wrapper pt-20">
        <Row justify="center">
          <Col>
            <h2 className="title mb-0 css2513cee11522c9a">D积分后台管理系统</h2>
          </Col>
        </Row>
        <Form form={form} name="basic" onFinish={onLogin} autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '账号不能为空' }]}
          >
            <Input
              placeholder="请输入账号"
              allowClear
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password
              placeholder="请输入密码"
              allowClear
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{ marginTop: 10 }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }: { user: UserModelState }) => ({
  user,
});
const mapDispatchToProps = (dispatch: any) => ({
  updateUserModel: (user: UserModelState) => {
    dispatch({
      type: 'user/update',
      payload: user,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
