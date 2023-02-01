import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入重置css
import "normalize.css";
// 导入Element-ui（全局导入）（推荐按需导入）
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 全局导入组件
import MenuList from "@/components/MenuList.vue";
// 全局导入
Vue.component("MenuList", MenuList);
Vue.use(ElementUI);

import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
