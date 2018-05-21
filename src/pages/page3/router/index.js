import Vue from "vue";

/**使用路由器 */
import VueRouter from "vue-router";
Vue.use(VueRouter);

/**添加路由配置 */
import routes from './routes';
const router = new VueRouter({
  routes
});

export default router;
