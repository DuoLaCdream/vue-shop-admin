import Vue from 'vue'
import Router from 'vue-router'
//导入login组件
import Login from '@/components/login'
//导入home组件
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: Home }

  ]
})
