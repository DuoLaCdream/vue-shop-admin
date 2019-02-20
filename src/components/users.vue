<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片画布 -->
    <el-card>
      <div>
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
              <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- 表格部分 -->
        <el-table :data="userTable.users" border style="width: 100%; margin-top:20px">
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
          <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
          <el-table-column label="状态" width="80">
            <el-switch v-model="info.row.mg_state" slot-scope="info"></el-switch>
          </el-table-column>
          <el-table-column label="操作" width="230">
            <template slot-scope="info">
              <!-- 文字提示 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="修改角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showuserdata(info.row.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeUser(info.row.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="feipeisole(info.row.id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页部分 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userTable.totalpage"
            :page-sizes="[3, 5, 10, 20]"
            :page-size="3"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userTable.total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
    <!-- 添加用户弹出层 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="adduser"
        :rules="addrules"
        ref="addruleFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="adduser.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="adduser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="adduser.email"></el-input>
        </el-form-item>
        <el-form-item label="	手机号" prop="mobile">
          <el-input v-model="adduser.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addNO">取 消</el-button>
        <el-button type="primary" @click="addOK">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户弹出层 -->
    <el-dialog title="修改用户" :visible.sync="reviseuser" width="50%">
      <el-form
        :model="reviseuserdata"
        :rules="addrules"
        ref="reviseruleFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="reviseuserdata.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="reviseuserdata.email"></el-input>
        </el-form-item>
        <el-form-item label="	手机号" prop="mobile">
          <el-input v-model="reviseuserdata.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="reviseNO">取 消</el-button>
        <el-button type="primary" @click="reviseOK()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配用户弹出层 -->
    <el-dialog title="分配角色" :visible.sync="usersole" width="50%">
      <el-form
        :model="fenpeisoledata"
        :rules="addrules"
        ref="addruleFormref"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称：">{{fenpeisoledata.username}}</el-form-item>
        <el-form-item label="分配新角色：" prop="rid">
          <el-select v-model="fenpeisoledata.rid" placeholder="请选择">
            <el-option
              v-for="item in fenpeisoleoptions"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="feipeiNO">取 消</el-button>
        <el-button type="primary" @click="feipeiOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    // 获取首屏数据
    this.getUesr()
  },
  data() {
    return {
      // 请求用户列表参数
      userdata: {
        //搜索内容
        query: '',
        //总页数
        pagenum: 1,
        // 每页的数据
        pagesize: 3
      },
      // 表格数据
      userTable: [],
      // 添加用户弹窗控制
      dialogVisible: false,
      // 修改用户弹窗控制
      reviseuser: false,
      // 用户权限弹窗控制
      usersole: false,
      // 添加用户
      adduser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 修改用户
      reviseuserdata: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      //分配用户
      fenpeisoledata: {},
      //分配用户角色信息
      fenpeisoleoptions: [],
      // 添加用户数据验证
      addrules: {
        // 账号验证
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: '长度在 6 到 30 个字符'
          },
          {
            pattern: /^(\w){6,20}$/,
            message: '只能输入6-20个字母、数字、下划线'
          }
        ],
        email: [
          {
            required: false, //是否必填
            message: '请输入邮箱地址', //错误提示信息
            trigger: 'blur' //检验方式（blur为鼠标点击其他地方，）
          },
          {
            type: 'email', //要检验的类型（number，email，date等）
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'] //（change为检验的字符变化的时候）
          }
        ],
        mobile: [
          {
            required: false,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 获取首屏数据
    async getUesr() {
      const { data } = await this.$http.get('users', { params: this.userdata })
      this.userTable = data.data
    },
    // 分页函数
    handleSizeChange(value) {
      this.userdata.pagesize = value
      this.getUesr()
    },
    handleCurrentChange(value) {
      this.userdata.pagenum = value
      this.getUesr()
    },
    // 添加弹出框确定取消
    addNO() {
      this.dialogVisible = false
      this.$refs.addruleFormref.resetFields()
    },
    //提交添加用户数据
    async addOK() {
      const { data } = await this.$http.post('users', this.adduser)
      this.dialogVisible = false
      this.$refs.addruleFormref.resetFields()
      this.getUesr()
      this.$message(data.meta.msg)
    },
    // 修改弹出框取消
    reviseNO() {
      this.reviseuser = false
      this.$refs.reviseruleFormref.resetFields()
    },
    // 修改弹出框确定
    async reviseOK() {
      const { data } = await this.$http.put(
        'users/' + this.reviseuserdata.id,
        this.reviseuserdata
      )
      if (data.meta.status == !200) {
        return this.$message(data.meta.msg)
      }
      this.$message(data.meta.msg)
      this.getUesr()
      this.reviseuser = false
      this.$refs.reviseruleFormref.resetFields()
    },
    // 展示修改用户数据
    async showuserdata(id) {
      const { data } = await this.$http.get('users/' + id)
      this.reviseuser = true
      this.reviseuserdata.username = data.data.username
      this.reviseuserdata.email = data.data.email
      this.reviseuserdata.mobile = data.data.mobile
      this.reviseuserdata.id = data.data.id
    },
    // 删除user用户
    removeUser(id) {
      this.$confirm('此操作将永久删除该用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.delete('users/' + id)
          if (data.meta.status !== 200) {
            return this.$message.error('删除失败')
          }
          this.$message(data.meta.msg)
          this.getUesr()
        })
        .catch(() => {
          this.$message('已取消删除')
        })
    },
    //查询分配用户信息
    async feipeisole(id) {
      this.usersole = true
      const { data } = await this.$http.get('users/' + id)
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.fenpeisoledata = data.data
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.fenpeisoleoptions = res.data
    },
    //分配角色取消
    feipeiNO() {
      this.usersole = false
    },
    // 分配角色确定
    async feipeiOK() {
      const { data } = await this.$http.put(
        'users/' + this.fenpeisoledata.id + '/role' ,{rid : this.fenpeisoledata.rid}
      )
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.getUesr()
      this.$message.success(data.meta.msg)
      this.usersole = false
    }
  }
}
</script>
<style lang="less" scoped>
.block {
  margin-top: 20px;
}
</style>
