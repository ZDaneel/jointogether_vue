<template>
  <div style="color: #666;font-size: 14px;">
    <div style="padding-bottom: 20px">
      <b>欢迎你！{{ user.nickname }}</b>
    </div>
    <el-card>
      欢迎登录商品管理系统！
      <el-divider/>
      功能需要包括主页、用户登录、用户管理、商品类别管理、信息查询、统计功能、打印功能等功能；
      <br><br>
      目标对象为商品信息管理相关的人员，有系统管理员、领班和员工；
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
