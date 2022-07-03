import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from "@/utils/request";
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'


// main.js全局注册
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// use
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: "mini" });

import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
Vue.use(Vuetify)

import Print from 'vue-print-nb'
// Global instruction
Vue.use(Print);

// 隐藏 右侧浏览器 滚动条
import VueSmoothScroll from "vue2-smooth-scroll";
Vue.use(VueSmoothScroll)


//设置全局
Vue.prototype.request=request
Vue.prototype.$FileSaver = FileSaver;
Vue.prototype.$XLSX = XLSX;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
