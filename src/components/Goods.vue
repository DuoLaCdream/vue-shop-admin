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
            <el-input placeholder="请输入内容" :clearable="true">
              <el-button slot="append" icon="el-icon-search"></el-button>
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
      <!-- 商品数据展示 -->
      <el-table :data="tableData" border style="width: 100%"> 
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop='cat_name' label="商品名称" width="*"></el-table-column>
        <el-table-column prop="roleDesc" label="商品价格(元)" width="*"></el-table-column>
        <el-table-column prop="roleDesc" label="商品重量" width="*"></el-table-column>
        <el-table-column prop="roleDesc" label="创建时间" width="*"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="info">
            <!-- 编辑按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="eduShop(info.row.id)">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeShop(info.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    // 获取首屏数据
    this.getShopList()
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    // 获取首屏数据
    async getShopList() {
      const { data } = await this.$http.get('categories',[2])
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.tableData = data.data.filter((item) => {
        if(item.cat_level == 2){
          return item
        }
      })
      console.log(data)
    },
    // 修改用户按钮
    eduShop(){},
    // 删除按钮操作
    removeShop(){}
  }
}
</script>
<style lang="less" scoped>
</style>
