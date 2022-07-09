<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="partyname"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"
              @selection-change="handleSelectionChange">
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
          <el-button type="success" @click="payBill(scope.row)">查看账单</el-button>
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

    <el-dialog title="账单信息" :visible.sync="dialogFormVisible2" width="30%">
      <el-table :data="dialogTableData" border stripe :header-cell-class-name="'headerBg'" id="out-table">
        <el-table-column label="账单类型" prop="isAa">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.isAa === 1">AA费用</el-tag>
            <el-tag type="warning" v-if="scope.row.isAa === 0">独立费用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="billName" label="账单名称"></el-table-column>
        <el-table-column label="账单费用" prop="billPrice"></el-table-column>
        <el-table-column label="发起用户" prop="billUsername"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button
            type="primary"
            icon="el-icon-download"
            @click="exportData"
        >导出</el-button>
        <el-button @click="dialogFormVisible2 = false">关 闭</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  name: "PartyHistory",
  data() {
    return {
      tableData: [],
      dialogTableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      partyname: "",
      form: {},
      menuDialogVis: false,
      dialogFormVisible2: false,
      multipleSelection: [],
      menuData: [],
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
  },
  methods: {
    load() {
      this.userid = JSON.parse(localStorage.getItem("user")).id
      //console.log(this.userid)
      this.request.get("/partyinfo/allendparty", {
        ///partyinfo/page
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.userid,
          partyname: this.partyname,
        }
      }).then(res => {
        //console.log(res.data)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    reset() {
      this.partyname = ""
      this.load()
    },
    payBill(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.request.get("/partybill/all", {
        params: {
          partyId: row.id
        }
      }).then(res => {
        if (res.code === '200') {
          this.dialogTableData = res.data
          this.dialogFormVisible2 = true
          //计算账单总花费
          let billSum = 0
          for (const bill of this.dialogTableData) {
            billSum += bill.billPrice
          }
        } else {
          this.$message.error("失败")
        }
      })
    },
    exportData(){
      let excelName = '活动账单.xlsx';
      let xlsxParam = { raw: true };//转换成excel时，使用原始的格式
      // 克隆节点
      let tables = document.getElementById("out-table").cloneNode(true);
      // 判断是否为固定列，解决（为固定列时，会重复生成表格）
      if (tables.querySelector('.el-table__fixed') !== null) {
        tables.removeChild(tables.querySelector('.el-table__fixed'))
      }
      let table_book = this.$XLSX.utils.table_to_book(tables,xlsxParam);
      let table_write = this.$XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        this.$FileSaver.saveAs(
            new Blob([table_write], { type: "application/octet-stream" }),
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
