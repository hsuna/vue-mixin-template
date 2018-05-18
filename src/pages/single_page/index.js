<<<<<<< HEAD
import Vue from 'modules/general';
=======
import Vue from 'modules/common/vue-common';
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11

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