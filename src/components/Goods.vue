<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片画布 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <!-- 搜索框 -->
            <el-input
              v-model="userdata.query"
              placeholder="请输入内容"
              :clearable="true"
              @clear="getUesr"
            >
              <el-button slot="append" icon="el-icon-search" @click="getUesr"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <!-- 添加用户按钮 -->
            <el-button type="primary">添加用户</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopList:[]
    }
  },
  methods:{
    // 获取首屏数据
    async getShopList() {
       const { data} = await this.$http.get('categories')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
