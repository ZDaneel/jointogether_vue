<template>
  <div>
<!--    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="partyname"></el-input>
      &lt;!&ndash;      <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>&ndash;&gt;
      &lt;!&ndash;      <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>&ndash;&gt;
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>-->


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
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">参加 </el-button>
<!--          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>-->
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

    <!--    <el-dialog title="类别名称" :visible.sync="dialogFormVisible" width="30%" >
          <el-form label-width="80px" size="small">
            <el-form-item label="名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </el-dialog>-->
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
          <el-button type="primary" @click="join()">参 加</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PartyInfo",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      partyname: "",
      form: {},
      dialogFormVisible: false,
      menuDialogVis: false,
      multipleSelection: [],
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
  },
  methods: {
    load() {
      this.userid = JSON.parse(localStorage.getItem("user")).id
      //console.log(this.userid)
      this.request.get("/partyinfo/page", {
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
      console.log(row)
      this.form = JSON.parse(JSON.stringify(row))
      //console.log(this.form)
      //this.dialogFormVisible = true
      this.$confirm('请问是否加入该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.nownumber < row.number) {
          this.joinParty(row)
        } else {
          this.$message({
            type: 'warning',
            message: '活动人数已满'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消加入'
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
