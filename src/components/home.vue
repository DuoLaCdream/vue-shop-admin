<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <!-- 左侧logo -->
      <div id="leftLogo">
        <img src="../assets/img/heima.png">
        <span>电商后台管理系统</span>
      </div>
      <el-row>
        <el-button type="info" @click="Logout">退出</el-button>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="show?'200px':'65px'">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :style="!show?'width:65px;':'width:200px;'"
          :unique-opened="true"
          :collapse="!show"
          :collapse-transition="false"
          :router="true"
        >
          <div id="navFlex" @click="show=!show">|||</div>
          <el-submenu :index="item.id+''" v-for="(item,i) in leftnav" :key="item.id">
            <template slot="title">
              <i slot="prefix" :class="'iconfont icon-'+icon[i]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
                <i class="el-icon-menu"></i>
                {{item2.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created() {
    // 加载页面获取左侧菜单数据
    this.getlist()
  },
  data() {
    return {
      show: true,
      leftnav: [],
      //字体图标
      icon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    //退出功能
    Logout() {
      this.$confirm('确定退出登录?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //退出清除token
          window.sessionStorage.removeItem('token')
          //跳转到登录页面
          this.$router.push('/')
        })
        .catch(() => {})
    },
    // 发送axios得到左侧菜单数据
    async getlist() {
      const { data } = await this.$http.get('menus')

      if (data.meta.status !== 200) {
        this.$message(data.meta.msg)
      }
      this.leftnav = data.data
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  // 头部样式
  .el-header {
    width: 100%;
    height: 60px;
    padding-left: 0;
    background-color: #373d41;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #leftLogo {
      height: 60px;
      display: flex;
      align-items: center;
      float: left;
      img {
        width: 50px;
        height: 50px;
        padding-right: 10px;
      }
      span {
        font-size: 22px;
        color: #fff;
      }
    }
  }
  // 左侧样式
  .el-aside {
    .el-menu {
      width: 200px;
    }
    background-color: rgb(51, 55, 68);
    #navFlex {
      height: 25px;
      background-color: #4a5064;
      font-size: 12px;
      line-height: 25px;
      text-align: center;
      color: #fff;
      letter-spacing: 0.1em;
    }
  }
}
</style>