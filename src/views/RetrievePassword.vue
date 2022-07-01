<template>
  <div class="wrapper">
    <div
        style="margin: 200px auto; background-color: #fff; width: 550px; height: 400px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>找 回 密 码</b></div>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">身份验证</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">密码重置</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">重置完成</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <!-- 步骤一的内容-->
            <el-form ref="form" :rules="rules" :model="user">
              <el-form-item prop="email">
                <el-input placeholder="请输入邮箱" size="medium" style="margin: 5px 0; width: 70%"
                          prefix-icon="el-icon-message" v-model="user.email"></el-input>
                <el-button type="primary" size="small" :disabled="flag" @click="getAuthCode">{{ msg }}</el-button>
              </el-form-item>
              <el-form-item prop="verCode">
                <el-input placeholder="请输入验证码" size="medium" style="margin: 5px 0" v-model="user.verCode"></el-input>
              </el-form-item>
              <el-form-item style="margin: 5px 0; text-align: center">
                <el-button type="primary" size="small" autocomplete="off" @click="checkCode">下一步</el-button>
                <el-button size="small" autocomplete="off" @click="$router.push('/login')">返回登录</el-button>
              </el-form-item>
            </el-form>
          </v-stepper-content>

          <v-stepper-content step="2">
            <!-- 步骤二的内容-->
            <el-form ref="form2" :rules="rules2" :model="pwdFrom">
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
                          show-password v-model="pwdFrom.password"></el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input placeholder="请确认密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock"
                          show-password v-model="pwdFrom.confirmPassword"></el-input>
              </el-form-item>
              <el-form-item style="margin: 5px 0; text-align: center">
                <el-button type="primary" size="small" autocomplete="off" @click="changePWD">下一步</el-button>
                <el-button size="small" autocomplete="off" @click="$router.push('/login')">返回登录</el-button>
              </el-form-item>
            </el-form>
          </v-stepper-content>

          <v-stepper-content step="3">
            <!-- 步骤三的内容-->
            <div style="text-align: center">
              <div>
                <br><br>密码重置完成，请重新登录!<br><br><br><br>
              </div>
              <el-button type="primary" size="middle" @click="$router.push('/login')">重新登录</el-button>
            </div>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
export default {
  //19200130224@post.usts.edu.cn
  name: "RetrievePassword",
  data() {
    let checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      e1: 1,
      user: {},
      pwdFrom: {},
      msg: "点击获取验证码",
      flag: false,
      Email: "",
      rules: {
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ],
      },
      rules2: {
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    getAuthCode() {
      this.$refs['form'].validate((valid) => {
        if (valid) {  // 表单校验合法
          this.request.post("/user/checkEmail", this.user).then(res => {
            if (res.code === '200') {
              //this.$message.success("邮箱存在")
              console.log(res)
              this.Email = res.data.email
              const _this = this;//！！坑！setInterval中的this指向问题
              this.flag = true; //！按钮不可重复点击
              let time = 90;//定义时间变量 150s
              let timer = null;//定义定时器
              timer = setInterval(function () {
                if (time === 0) {
                  _this.msg = "重新获取验证码";
                  _this.flag = false;
                  clearInterval(timer);//清除定时器
                } else {
                  _this.msg = time + "秒后重新获取";
                  time--;
                }
              }, 1000)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    checkCode() {
      if (this.user.email == null) {
        this.$message.error("邮箱不能为空")
        return false
      }
      else if (this.user.verCode == null) {
        this.$message.error("验证码不能为空")
        return false
      }
      else {
        this.request.post("/user/checkCode", this.user).then(res => {
          console.log(res)
          if (res.code === '200') {
            //this.$message.success("重置成功")
            console.log(res.data)
            if (res.data === 'true') {
              this.e1 = 2
            } else {
              this.$message.error("验证码错误！")
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    changePWD() {
      this.$refs['form2'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if (this.pwdFrom.password !== this.pwdFrom.confirmPassword) {
            this.$message.error("两次输入的密码不一致")
            return false
          }
          this.pwdFrom.email = this.Email
          //console.log(this.pwdFrom)
          this.request.post("/user/resetPassword", this.pwdFrom).then(res => {
            if (res.code === '200') {
              //this.$message.success("重置成功")
              this.e1 = 3
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    }
  },
}
</script>

<style>
.wrapper {
  height: 100vh;
  background: linear-gradient(red, transparent),
  linear-gradient(to top left, lime, transparent),
  linear-gradient(to top right, blue, transparent);
  background-blend-mode: screen;
  overflow: hidden;
}
</style>