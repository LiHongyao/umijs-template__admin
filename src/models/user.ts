// 示例文档
import { Effect, Reducer, Subscription } from 'umi';

// 数据类型
export interface UserModelState {
  token: string;
  username: string;
}

// dva模型
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {};
  reducers: {
    update: Reducer<UserModelState>;
  };
  subscriptions: {};
}

// dva实例
const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    token: '',
    username: '',
  },
  effects: {},
  reducers: {
    update(state = UserModel.state, { payload }) {
      return { ...payload };
    },
  },
  subscriptions: {},
};

export default UserModel;
