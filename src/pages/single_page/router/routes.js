const routes = [
  /////////////////前台路由////////////////
  {
    name: "page1",
    path: "/page1",
    component: resolve => require(["../views/page1.vue"], resolve),
  },
  {
    name: "page2",
    path: "/page2",
    component: resolve => require(["../views/page2.vue"], resolve),
  }
];

export default routes;