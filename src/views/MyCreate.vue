<template>
  <div>
<!--    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="partyname"></el-input>
      &lt;!&ndash;      <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>&ndash;&gt;
      &lt;!&ndash;      <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>&ndash;&gt;
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>-->

    <el-header>
      未成团活动
    </el-header>
    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="partyname" label="名称"></el-table-column>
      <el-table-column label="活动地点" prop="place"></el-table-column>
      <el-table-column label="活动时间" prop="date">
        <template slot-scope="scope">{{ timeConvert(scope.row.date) }}</template>
      </el-table-column>
      <el-table-column label="报名费用" prop="charge"></el-table-column>
      <el-table-column label="活动人数" prop="number"></el-table-column>
      <el-table-column label="已报名人数" prop="nownumber"></el-table-column>
      <el-table-column label="团长" prop="username"></el-table-column>
      <el-table-column label="活动介绍" prop="partyintro"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">成团 </el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定取消活动吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">取消 </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-header>
      已成团活动
    </el-header>
    <el-table :data="tableData2" border stripe :header-cell-class-name="'headerBg'"
              @selection-change="handleSelectionChange2">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="partyname" label="名称"></el-table-column>
      <el-table-column label="活动地点" prop="place"></el-table-column>
      <el-table-column label="活动时间" prop="date">
        <template slot-scope="scope">{{ timeConvert(scope.row.date) }}</template>
      </el-table-column>
      <el-table-column label="报名费用" prop="charge"></el-table-column>
      <el-table-column label="活动人数" prop="number"></el-table-column>
      <el-table-column label="已报名人数" prop="nownumber"></el-table-column>
      <el-table-column label="团长" prop="username"></el-table-column>
      <el-table-column label="活动介绍" prop="partyintro"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">增加费用 </el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定结束活动吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">结束活动 </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="pageNum2"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="详情" :visible.sync="dialogFormVisible" width="90%">
      <el-form :model="form" ref="partyForm">
        <el-card>
          <el-table :data="partyInformation" border stripe style="margin-top: 20px">
            <el-table-column label="活动名称" prop="partyname"></el-table-column>
            <el-table-column label="活动地点" prop="place"></el-table-column>
            <el-table-column label="活动子项目" prop="subpartyname">
              <el-checkbox label="有奖问答  ￥0.01"></el-checkbox>
              <el-checkbox label="精选  ￥0.01"></el-checkbox>
              <el-checkbox label="党史问答  ￥0.01"></el-checkbox>
            </el-table-column>
            <el-table-column label="活动时间" prop="date">
              <template slot-scope="scope">{{ timeConvert(scope.row.date) }}</template>
            </el-table-column>
            <el-table-column label="活动子项目" prop="subparty"></el-table-column>
            <el-table-column label="报名费用" prop="charge"></el-table-column>
            <el-table-column label="活动人数" prop="number"></el-table-column>
            <el-table-column label="已报名人数" prop="nownumber"></el-table-column>
            <el-table-column label="团长" prop="username"></el-table-column>
            <el-table-column label="活动介绍" prop="partyintro"></el-table-column>
          </el-table>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="join()">成 团</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyCreate",
  data() {
    return {
      tableData: [],
      tableData2: [],
      total: 0,
      total2: 0,
      pageNum: 1,
      pageSize: 5,
      pageNum2: 1,
      pageSize2: 5,
      partyname: "",
      form: {},
      dialogFormVisible: false,
      menuDialogVis: false,
      multipleSelection: [],
      multipleSelection2: [],
      menuData: [],
      partyInformation: null,
      props: {
        label: 'name',
      },
      expends: [],
      checks: [],
      roleId: 0,
      roleFlag: '',
      ids: [],
      userid: []
    }
  },
  created() {
    this.load()
    this.load2()
  },
  methods: {
    load() {
      this.userid = JSON.parse(localStorage.getItem("user")).id
      //console.log(this.userid)
      this.request.get("/partyinfo/mycreate", {
        ///partyinfo/page
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.userid
          //partyname: this.partyname,
        }
      }).then(res => {
        //console.log(res.data)
        this.tableData = res.data
        this.total = res.data.total
      })

    },
    load2() {
      this.userid = JSON.parse(localStorage.getItem("user")).id
      //console.log(this.userid)
      this.request.get("/partyinfo/mycreategrouped", {
        ///partyinfo/page
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.userid
          //partyname: this.partyname,
        }
      }).then(res => {
        //console.log(res.data)
        this.tableData2 = res.data
        this.total2 = res.data.total
      })

    },
    save() {
      this.request.post("/category", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      //this.dialogFormVisible = true
      this.$confirm('请问是否成团?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消成团'
        });
      });
    },
    joinParty(row) {
      this.request.get("/partyinfo/joinparty", {
        params: {
          userId: this.userid,
          partyId: row.id
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.success("加入成功")
          //this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("加入失败")
        }
      })
    },
    del(id) {
      this.request.delete("/partyinfo/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleSelectionChange2(val) {
      console.log(val)
      this.multipleSelection2 = val
    },
    reset() {
      this.name = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleSizeChange2(pageSize) {
      console.log(pageSize)
      this.pageSize2 = pageSize
      this.load2()
    },
    handleCurrentChange2(pageNum) {
      console.log(pageNum)
      this.pageNum2 = pageNum
      this.load2()
    },
    timeConvert(timestamp) {
      //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳
      //将时间戳转换成正常时间格式
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      let D = date.getDate();
      let h = date.getHours();
      // 格林威治时间到东八区时间校准
      if (h < 8) {
        D = D - 1;
        h = h + 16;
      } else {
        h = h - 8;
      }
      let m =
          (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
          ":";
      let s = date.getSeconds() + "0";
      return Y + M + D;
      //h + ":" + m + s
    },
  }
}
</script>


<style>
.headerBg {
  background: #eee !important;
}
</style>
