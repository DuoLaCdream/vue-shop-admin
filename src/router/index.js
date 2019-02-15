import Vue from 'vue'
import Router from 'vue-router'
//  导入login组件
import Login from '@/components/login'
//  导入home组件
import Home from '@/components/home'
//  导入welcome组件
import Welcome from '@/components/welcome'
//  导入users组件
import Users from '@/components/users'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', name: 'Welcome', component: Welcome },
        { path: '/users', name: 'Users', component: Users }
      ]
    }
  ]
})
