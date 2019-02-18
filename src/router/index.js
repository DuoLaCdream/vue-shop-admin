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
//  导入powerList组件
import PowerList from '@/components/powerList'
//  导入roleList组件
import RoleList from '@/components/roleList'
//  导入Goods组件
import Goods from '@/components/Goods'
//  导入Catagories组件
import Categories from '@/components/Categories'
//  导入Params组件
import Params from '@/components/Params'
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
        { path: '/users', name: 'Users', component: Users },
        { path: '/rights', name: 'PowerList', component: PowerList },
        { path: '/roles', name: 'RoleList', component: RoleList },
        { path: '/goods', name: 'Goods', component: Goods },
        { path: '/categories', name: 'Categories', component: Categories },
        { path: '/params', name: 'Params', component: Params },
      ]
    }
  ]
})
