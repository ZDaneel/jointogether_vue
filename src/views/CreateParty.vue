<template>
  <div>
    <el-card shadow="never" color="#DCDFE6" style="height: 850px;overflow: auto;">
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="partyname">
          <el-input v-model="ruleForm.partyname"></el-input>
        </el-form-item>
        <el-form-item label="活动地点" prop="place">
          <el-input v-model="ruleForm.place"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <div class="block">
            <el-date-picker
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="缴纳费用" prop="charge">
          <el-input v-model.number="ruleForm.charge"></el-input>
        </el-form-item>
        <el-form-item label="拼团人数" prop="number">
          <el-input-number
              v-model="ruleForm.number"
              :min="1"
              :max="10000"
              label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="活动简介" prop="partyintro">
          <el-input
              type="textarea"
              v-model="ruleForm.partyintro"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" >立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
let id = 1000;
export default {
  name: "CreateParty",
  data() {
    return {
      tabledata: [],
      form: {
        subpartyname: '',
        subcharge: "",
      },
      cfvisible: false,
      dialogVisible: false,
      ruleForm: {
        partyname: "",
        place: "",
        date: "",
        charge: "",
        number: "",
        partyintro: "",
      },
      num: 1,
      input: "",
      rules: {
        partyname: [
          {required: true, message: "请输入活动名称", trigger: "blur"},
          {min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur"},
        ],
        place: [{required: true, message: "请选择活动地点", trigger: "blur"}],
        charge: [
          {required: true, message: "请输入应缴纳费用", trigger: "blur"},
          {type: 'number',required: true, message: "请输入数字", trigger: "blur"}
        ],
        number: [{required: true, message: "请选择人数", trigger: "blur"}],
        partyintro: [
          {required: true, message: "请填写活动形式", trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.ruleForm.username = JSON.parse(localStorage.getItem("user")).username
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        this.request.post("/partyinfo", this.ruleForm).then(res => {
          if (res.code === '200') {
            this.$message.success("创建成功")
            this.$router.push({path: "/mycreate"}); // 页面路由跳转
/*            this.dialogFormVisible = false
            this.load()*/
          } else {
            this.$message.error("创建失败")
          }
        })
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>

</style>