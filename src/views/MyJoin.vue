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
      <h2>已参加活动</h2>
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
      <el-table-column label="初始费用" prop="charge"></el-table-column>
      <el-table-column label="活动人数" prop="number"></el-table-column>
      <el-table-column label="已报名人数" prop="nownumber"></el-table-column>
      <el-table-column label="团长" prop="username"></el-table-column>
      <el-table-column label="活动介绍" prop="partyintro"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!--          <el-button type="success" @click="handleEdit(scope.row)">成团 </el-button>-->
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定退出活动吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference" v-if="scope.row.username === username" disabled>退出</el-button>
            <el-button type="danger" slot="reference" v-if="scope.row.username !== username">退出</el-button>
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
<!--    layout="total, sizes, prev, pager, next, jumper"-->

    <el-header>
      <h2>已成团活动</h2>
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
      <el-table-column label="活动费用" prop="charge"></el-table-column>
      <el-table-column label="活动人数" prop="number"></el-table-column>
      <el-table-column label="已报名人数" prop="nownumber"></el-table-column>
      <el-table-column label="团长" prop="username"></el-table-column>
      <el-table-column label="活动介绍" prop="partyintro"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit2(scope.row)">增加独立费用</el-button>
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
          :total="total2">
      </el-pagination>
    </div>

    <el-header>
      <h2>缴纳费用</h2>
    </el-header>
    <el-table :data="tableData3" border stripe :header-cell-class-name="'headerBg'"
              @selection-change="handleSelectionChange3">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="partyname" label="名称"></el-table-column>
      <el-table-column label="活动地点" prop="place"></el-table-column>
      <el-table-column label="活动时间" prop="date">
        <template slot-scope="scope">{{ timeConvert(scope.row.date) }}</template>
      </el-table-column>
      <el-table-column label="活动费用" prop="charge"></el-table-column>
      <el-table-column label="活动人数" prop="number"></el-table-column>
      <el-table-column label="已报名人数" prop="nownumber"></el-table-column>
      <el-table-column label="团长" prop="username"></el-table-column>
      <el-table-column label="活动介绍" prop="partyintro"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="payBill(scope.row)">缴费</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :current-page="pageNum3"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total3">
      </el-pagination>
    </div>

    <el-dialog title="增加独立费用" :visible.sync="dialogFormVisible3" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="账单名称">
          <el-input v-model="addBillForm.billName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账单费用">
          <el-input v-model.number="addBillForm.billPrice" oninput="value=value.replace(/[^\d]/g,'')" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false;">关 闭</el-button>
        <el-button type="primary" @click="saveAddBill">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="账单信息" :visible.sync="dialogFormVisible2" width="30%">
      <p>你需要支付{{ avgNum }}元</p>
      <br>
      <el-table :data="dialogTableData" border stripe :header-cell-class-name="'headerBg'" id="out-table" show-summary>
        <el-table-column label="账单类型" prop="isAa">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.isAa === 1">AA费用</el-tag>
            <el-tag type="warning" v-if="scope.row.isAa === 0">独立费用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="账单名称" prop="billName"></el-table-column>
        <el-table-column label="发起用户" prop="billUsername"></el-table-column>
        <el-table-column label="账单费用" prop="billPrice"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button
            type="primary"
            icon="el-icon-download"
            @click="exportData"
        >导出
        </el-button>
        <el-button type="primary" @click="payBillConfirm">确 定</el-button>
        <el-button @click="dialogFormVisible2 = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyJoin",
  data() {
    return {
      tableData: [],
      tableData2: [],
      tableData3: [],
      dialogTableData: [],
      total: 0,
      total2: 0,
      total3: 0,
      pageNum: 1,
      pageSize: 5,
      pageNum2: 1,
      pageSize2: 5,
      pageNum3: 1,
      pageSize3: 5,
      avgNum: 0,
      partyname: "",
      username: "",
      form: {},
      addBillForm: {
        billName: null,
        billPrice: null,
        billPartyId: null,
        billUsername: null,
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      menuDialogVis: false,
      multipleSelection: [],
      multipleSelection2: [],
      multipleSelection3: [],
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
    this.load3()
  },
  methods: {
    load() {
      this.userid = JSON.parse(localStorage.getItem("user")).id
      this.username = JSON.parse(localStorage.getItem("user")).username
      //console.log(this.userid)
      this.request.get("/partyinfo/myjoin", {
        ///partyinfo/page
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.userid
          //partyname: this.partyname,
        }
      }).then(res => {
        //console.log(res.data)
        this.tableData = res.data.list
        this.total = res.data.total
        //console.log(this.total)
      })

    },
    load2() {
      this.userid = JSON.parse(localStorage.getItem("user")).id
      //console.log(this.userid)
      this.request.get("/partyinfo/myjoingrouped", {
        ///partyinfo/page
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.userid
          //partyname: this.partyname,
        }
      }).then(res => {
        //console.log(res.data)
        this.tableData2 = res.data.list
        this.total2 = res.data.total
      })

    },
    load3() {
      this.userid = JSON.parse(localStorage.getItem("user")).id
      this.request.get("/partyinfo/myjoinunpaid", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.userid
        }
      }).then(res => {
        this.tableData3 = res.data.list
        this.total3 = res.data.total
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      //this.dialogFormVisible = true
      this.$confirm('请问是否加入该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.joinParty(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消加入'
        });
      });
    },
    handleEdit2(row) {
      this.addBillForm.billPartyId = row.id
      this.addBillForm.billUsername = JSON.parse(localStorage.getItem("user")).nickname
      this.dialogFormVisible3 = true
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
      this.request.get("/partyinfo/endjoinedparty", {
        params: {
          userId: this.userid,
          partyId: id
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.success("退出成功")
          this.load()
        } else {
          this.$message.error("退出失败")
        }
      })
    },
    saveAddBill() {
      //添加的是独立费用
      this.addBillForm.isAa = 0
      this.request.post("/partybill", this.addBillForm).then(res => {
        if (res.code === '200') {
          this.$message.success("增加成功")
          this.dialogFormVisible3 = false
          //清空
          this.addBillForm.billName = null
          this.addBillForm.billPrice = null
          //刷新
          this.load2()
        } else {
          this.$message.error("增加失败")
        }
      })
    },
    payBill(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.request.get("/partybill", {
        params: {
          partyId: row.id,
          userId: this.userid
        }
      }).then(res => {
        if (res.code === '200') {
          this.dialogTableData = res.data
          //计算账单总花费
          let billSum = 0
          for (let bill of this.dialogTableData) {
            //如果是AA制，就处理费用
            if (bill.isAa === 1) {
              //除以参加人数
              bill.billPrice = bill.billPrice / this.form.nownumber
            }
            billSum += bill.billPrice
          }
          this.avgNum = parseFloat(billSum).toFixed(2)

          this.dialogFormVisible2 = true

        } else {
          this.$message.error("失败")
        }
      })
    },//报名费用
    payBillConfirm() {
      this.request.get("/partybill/payconfirm", {
        params: {
          userId: this.userid,
          partyId: this.form.id
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.success("缴费成功")
          this.load3()
          this.dialogFormVisible2 = false
        } else {
          this.$message.error("缴费失败")
          this.dialogFormVisible2 = false
        }
      })
    },
    exportData() {
      let excelName = '活动账单.xlsx';
      let xlsxParam = {raw: true};//转换成excel时，使用原始的格式
      // 克隆节点
      let tables = document.getElementById("out-table").cloneNode(true);
      // 判断是否为固定列，解决（为固定列时，会重复生成表格）
      if (tables.querySelector('.el-table__fixed') !== null) {
        tables.removeChild(tables.querySelector('.el-table__fixed'))
      }
      let table_book = this.$XLSX.utils.table_to_book(tables, xlsxParam);
      let table_write = this.$XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        this.$FileSaver.saveAs(
            new Blob([table_write], {type: "application/octet-stream"}),
            excelName
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
      }
      return table_write;
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleSelectionChange2(val) {
      console.log(val)
      this.multipleSelection2 = val
    },
    handleSelectionChange3(val) {
      console.log(val)
      this.multipleSelection3 = val
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
    handleSizeChange3(pageSize) {
      console.log(pageSize)
      this.pageSize3 = pageSize
      this.load3()
    },
    handleCurrentChange3(pageNum) {
      console.log(pageNum)
      this.pageNum3 = pageNum
      this.load3()
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




