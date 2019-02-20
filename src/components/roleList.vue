<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 添加角色按钮 -->
      <el-row>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-row>
      <!-- 展示角色列表 -->
      <el-table :data="tableData" border style="width: 100%">
        <!-- 展开项内容 -->
        <el-table-column type="expand" label="权限详情" width="180">
          <template slot-scope="info">
            <el-row
              v-for="(item,k) in info.row.children"
              :key="item.id"
              :style="{'border-bottom':'1px solid rgb(235, 238, 245)','border-top':k===0?'1px solid rgb(235, 238, 245)':''}"
            >
              <el-col :span="5">
                <el-tag closable>{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item2,ii) in item.children"
                  :key="item2.id"
                  :style="{'border-top':ii!==0 ? '1px solid #EBEEF5' : ''}"
                >
                  <el-col :span="6">
                    <el-tag closable type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      type="warning"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="*"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="*"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="info">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="eduRole(info.row.id)"
            >编辑</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRole(info.row.id)"
            >删除</el-button>
            <!-- 分配角色按钮 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="fenpeiUser(info.row.id,info.row.children)"
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户弹出层 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialog" width="50%">
      <el-form
        :model="adduserRole"
        ref="addRoleFormref"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="adduserRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="adduserRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleNO">取 消</el-button>
        <el-button type="primary" @click="addRoleOK">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户弹出层 -->
    <el-dialog title="添加用户" :visible.sync="eduUserDialog" width="50%">
      <el-form
        :model="eduUserRole"
        ref="eduRoleFormref"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="eduUserRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="eduUserRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="eduRoleNO">取 消</el-button>
        <el-button type="primary" @click="eduRoleOK">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色弹出层 -->
    <el-dialog title="分配角色" :visible.sync="fenpeiUserDialog" width="50%">
      <el-form
        :model="fenpeiUserData"
        ref="fenpeiUserFormref"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      ></el-form>
      <!-- 树状图 -->
      <el-tree
        :data="fenpeiUserData.data"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="keys"
        :props="defaultProps"
        ref="treeData"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <template>
         <el-button @click="fenpeiUserNO">取 消</el-button>
        <el-button type="primary" @click="fenpeiUserOK">确 定</el-button>
        </template>
        
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    // 加载首屏数据
    this.getList()
  },
  data() {
    return {
      // 角色数据
      tableData: [],
      // 添加用户弹出层控制
      addUserDialog: false,
      // 编辑用户弹出层
      eduUserDialog: false,
      //分配用户弹出层
      fenpeiUserDialog: false,
      // 通用表单描述
      rules: {
        // 账号验证
        roleName: [
          {
            required: true,
            message: '请输入角色',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符'
          }
        ]
      },
      // 添加用户数据
      adduserRole: {},
      // 编辑用户数据
      eduUserRole: {},
      //分配角色数据
      fenpeiUserData: {},
      //树状图属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      //树状图默认key
      keys: [],
      // 正在操作的角色id
      treeid:''
    }
  },
  methods: {
    // 获取首屏数据
    async getList() {
      const { data } = await this.$http.get('roles')
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.tableData = data.data
    },
    // 添加角色
    addRole() {
      this.addUserDialog = true
    },
    // 添加角色弹框取消方法
    addRoleNO() {
      this.addUserDialog = false
      this.$refs.addRoleFormref.resetFields()
    },
    // 添加角色弹框确认方法
    async addRoleOK() {
      const { data } = await this.$http.post('roles', this.adduserRole)
      if (data.meta.status !== 201) {
        return this.$message.error(data.meta.msg)
      }
      this.$message(data.meta.msg)
      this.getList()
      this.addUserDialog = false
      this.$refs.addRoleFormref.resetFields()
    },
    // 编辑角色
    async eduRole(id) {
      this.eduUserDialog = true
      const { data } = await this.$http.get('roles/' + id)
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.eduUserRole = data.data
    },
    // 编辑角色弹框取消方法
    eduRoleNO() {
      this.eduUserDialog = false
    },
    // 编辑角色弹框确认方法
    async eduRoleOK() {
      const { data } = await this.$http.put(
        'roles/' + this.eduUserRole.roleId,
        this.eduUserRole
      )
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }

      this.$message.success('数据更新成功')
      this.getList()
      this.eduUserDialog = false
    },
    // 删除角色
    removeRole(id) {
      this.$confirm('此操作将永久删除该角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.delete('roles/' + id)
          if (data.meta.status !== 200) {
            return this.$message.error(data.meta.msg)
          }
          this.$message(data.meta.msg)
          this.getList()
        })
        .catch(() => {
          this.$message('已取消删除')
        })
    },
    //分配角色按钮
    async fenpeiUser(id, item) {
      this.fenpeiUserDialog = true
      const { data } = await this.$http.get('rights/tree')
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.fenpeiUserData = data
      console.log(item)
      //处理keys
      const key = []
      item.forEach(item2 => {
        item2.children.forEach(item3 => {
          item3.children.forEach(item4 => {
            key.push(item4.id)
          })
        })
      })
      this.keys = key
      this.treeid = id
    },
    //分配角色取消
    fenpeiUserNO() {
      this.fenpeiUserDialog = false
    },
    //分配角色确定
    async fenpeiUserOK() {
      this.fenpeiUserDialog = false
      const k1 = this.$refs.treeData.getHalfCheckedKeys()
      const k2 = this.$refs.treeData.getCheckedKeys() 
      const ridstr = [...k1,...k2].join(',')
      const {data} = await this.$http.post('roles/'+this.treeid+'/rights',{rids : ridstr})
      if(data.meta.status !== 200){
        return this.$message.error(data.meta.msg)
      }
      this.$message.success(data.meta.msg)
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 10px 10px;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>
