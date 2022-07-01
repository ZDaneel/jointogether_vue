<template>
  <div class="wrapper">
    <div
        style="margin: 200px auto; background-color: #fff; width: 350px; height: 350px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="user.password"></el-input>
        </el-form-item>

        <el-form-item style="margin: 10px 0;">
          <el-button type="primary" size="medium" style="width:100%" autocomplete="off" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item style="padding-top: 10px">
          <div style="float: left">
            <el-link type="white" @click="$router.push('/retrievePassword')">忘记密码</el-link>
          </div>
          <div style="float:right;">
            <el-link type="white" @click="$router.push('/register')">还没有账号？点击注册</el-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {setRoutes} from "@/router";

export default {
  name: "Login",
  data() {
    return {
      user: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          this.request.post("/user/login", this.user).then(res => {
            if (res.code === '200') {
              localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
              localStorage.setItem("menus", JSON.stringify(res.data.menus))  // 存储用户信息到浏览器
              // 动态设置当前用户的路由
              setRoutes()
              this.$message.success("登录成功")
              // 权限控制跳转
              if (res.data.role === 'ROLE_STUDENT') {
                this.$router.push("/front/home")
              } else {
                this.$router.push("/")
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh;
  background:
      linear-gradient(red, transparent),
      linear-gradient(to top left, lime, transparent),
      linear-gradient(to top right, blue, transparent);
  background-blend-mode: screen;
  overflow: hidden;
}
</style>
<!--
//background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
background: -webkit-gradient(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));-->
