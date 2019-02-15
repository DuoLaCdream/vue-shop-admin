<template>
  <div id="login-container">
    <!-- 主容器 -->
    <div id="login-box">
      <!-- logo -->
      <div id="login-logo">
        <img src="../assets/img/logo.png">
      </div>
      <el-form ref="loginFormref" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>

        <el-row>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        // 账号验证
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormref.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post('login', this.loginForm)
          if (data.meta.status == 200) {
            // 储存check到浏览器
            window.sessionStorage.setItem('token',data.data.token)
            // 验证成功跳转到home页面
            this.$router.push('/home')
            this.$message(data.meta.msg)
          } else {
            this.$message.error(data.meta.msg)
            return false
          }
        } else {
          this.$message.error('账号密码不能为空')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginFormref.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
// 主容器
#login-container {
  background-color: #2b4b6b;
  height: 100%;
  // 表单部分
  #login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // logo部分
    #login-logo {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 8px;
      background-color: #fff;
      box-shadow: 0 0 10px #eee;
      img {
        width: 100%;
        height: 100%;
        background-color: #eee;
        border-radius: 50%;
      }
    }
    // 表单部分
    .el-form {
      width: 100%;
      margin-top: 98px;
      padding: 20px;
      box-sizing: border-box;

      .el-row {
        float: right;
      }
    }
  }
}
</style>