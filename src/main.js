// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入公共的css
import './assets/css/global.css'
//引入elementcss
import 'element-ui/lib/theme-chalk/index.css'
//引入字体图标库
import './assets/fonts/iconfont.css'
//引入element-ui
import ElementUI from 'element-ui'
//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
