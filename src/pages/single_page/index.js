import Vue from 'modules/common/vue-common';

/**添加-vue路由器 */
import router from "./router";

import App from './App';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})