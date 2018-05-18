/*
 * @Description 公共Vue
 * @Author: Hsuan
 * @Date: 2018-03-17 10:15:47
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-03-28 00:36:21
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

/**添加-http访问 */
import VueResouse from 'vue-resource';
Vue.use(VueResouse);

/* 添加-axios拦截器 */
// import Axios from "./axios";
// Vue.prototype.$http = Axios;

/**注册-全局mixin */
// import mixin from "./mixin";
// Vue.mixin(mixin);

/**注册-全局过滤器 */
import Filters from "../filters"; // global filters
//console.log(Filters);
Vue.prototype.$filter = Filters;
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key]);
});

// 按需引入部分组件
import Plugin from './plugins';
Plugin.component.forEach(comp => {
  Vue.component(comp.name, comp);
});
Object.keys(Plugin.prototype).forEach(key => {
  Vue.prototype[key] = Plugin.prototype[key];
});


/* 引用-框架样式 */
import 'assets/styles/modules/_el-variables.scss';
/* 引用-字体库 */
//import "assets/styles/reset.scss";

/**添加-store */
//import store from "./store";

Vue.config.productionTip = false;

export default Vue;
