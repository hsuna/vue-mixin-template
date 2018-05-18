//自定义使用vue，不引用公共的vue
import Vue from "vue";

Vue.config.productionTip = false;

/* eslint-disable no-new */
import App from './App';
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})