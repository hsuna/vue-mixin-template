import api from './index';

const {
  API_URL
} = api;

export default {
  //////// 用户模块 ////////
  getUserInfo: API_URL + "user/userInfo", //获取用户信息
};
