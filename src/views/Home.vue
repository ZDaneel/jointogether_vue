<template>
  <div style="color: #666;font-size: 14px;">
    <div style="padding-bottom: 20px">
      <b>欢迎你！{{ user.nickname }}</b>
    </div>
    <el-card>
      欢迎登录拼团系统！
      <el-divider/>
      功能主要包括主页、创建活动、参加活动、管理活动、增加费用等功能；
      <br><br>
      开发环境为Java环境，JDK1.8，IDE为IntelliJ IDEA，数据库使用MYSQL 5.6以上。
      <br><br>
    </el-card>
    <div style="height: 1px; background: #ddd; margin: 20px 0"/>

    <el-row :gutter="30">
      <el-col :span="12">
      </el-col>
      <el-col :span="12">
        <div style="padding: 20px 0; font-size: 20px;" >技术栈</div>
        <el-row>
          <el-col :span="10" style="line-height: 30px">
            <div><b>后端</b></div>
            <div>Spring</div>
            <div>SpringMVC</div>
            <div>Mybatis</div>
            <div>Lombok</div>
            <div>Hutool</div>
          </el-col>
          <el-col :span="10" style="line-height: 30px">
            <b>前端</b>
            <div>Vue2</div>
            <div>Vue-Router</div>
            <div>VueX</div>
            <div>ElementUI</div>
            <div>Axios</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  }
}
</script>
