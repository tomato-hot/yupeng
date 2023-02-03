<template>
  <div class="orderlist">
    <!-- tab选项卡 -->
    <div>
      <el-tabs v-model="search.status" @tab-click="tabClick">
        <el-tab-pane
          :label="item.name + '(' + item.num + ')'"
          :name="item.name == '全部' ? '' : item.name"
          v-for="item in orderStatic"
          :key="item.id"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 搜索 -->
    <div style="margin-top: 18px">
      <el-form
        :model="search"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :inline="true"
      >
        <el-form-item label="订单编号" prop="orderNum">
          <el-input v-model="search.orderNum" placeholder="订单编号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-input v-model="search.status"></el-input>
        </el-form-item>
        <el-form-item label="下单日期" prop="createStart">
          <el-date-picker
            v-model="search.createStart"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >搜索</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        border
        ref="multipleTable"
        :data="orderList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="OrderNum" label="订单编号"> </el-table-column>
        <el-table-column label="申请时间" width="200">
          <template slot-scope="scope">{{ scope.row.createAt }}</template>
        </el-table-column>
        <el-table-column prop="customerId" label="会员账号"> </el-table-column>
        <el-table-column
          prop="customer_total_amount"
          label="订单总额"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="shoppingAdd" label="所属门店"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span style="color: limegreen" v-if="scope.row.status == '已完成'"
              >已完成</span
            >
            <span style="color: orange" v-else-if="scope.row.status == '待付款'"
              >待付款</span
            >
            <span style="color: purple" v-else-if="scope.row.status == '待发货'"
              >待发货</span
            >
            <span style="color: red" v-else-if="scope.row.status == '待退款'"
              >待退款</span
            >
            <span v-else>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="comfirm_at" label="处理时间" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="orderclear(scope.row)"
              :style="{ color: 'blue' }"
            >
              查看订单</el-button
            >
            <!-- 弹框 -->
            <!-- :before-close="handleClose" -->
            <el-dialog :visible.sync="dialogVisible" width="30%">
              <p
                :style="{
                  position: 'absolute',
                  top: '5px',
                  backgroundColor: 'rgb(63, 120, 246)',
                  color: 'white',
                  height: '30px',
                  lineHeight: '30px',
                  borderRadius: '5px',
                  width: '80%',
                }"
              >
                服务单详情
              </p>
              <p>订单编号：{{ scope.row.OrderNum }}</p>
              <p>当前状态:{{ scope.row.status }}</p>
              <p>退款单号：{{ scope.row.OrderNum }}</p>
              <p>申请时间：{{ scope.row.createAt }}</p>
              <p>用户账号:{{ scope.row.phone }}</p>
              <br />
              <br />
              <br />
              <p>订单金额：{{ scope.row.total_amount }}</p>
              <p>确认退款金额：{{ scope.row.total_amount }}</p>
              <p>退款方式:到原支付渠道</p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="pagination.current"
          :page-sizes="[5, 10, 15, 20, 25, 30]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 订单详情弹框组件 -->
  </div>
</template>
<script>
// 获取所有列表api
// GetOrderList
import { GetOrderStatic, GetOrderList } from "@/api/order";
export default {
  data() {
    return {
      // 弹框
      dialogVisible: false,
      orderStatic: [], //静态统计数据
      orderList: [], //订单列表
      pagination: {}, //分页数据
      search: { status: "", orderNum: "" }, //查询条件
      activeName: "second",
    };
  },

  created() {
    //获取订单统计数据
    GetOrderStatic().then((res) => {
      this.orderStatic = res.data.list;
    });
    this.getOrderList();
  },

  methods: {
    orderclear(e) {
      this.dialogVisible = true;
      console.log(e);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getOrderList();
        } else {
          1;
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.search.createEnd = "";
      this.$refs[formName].resetFields();
      console.log(this.$refs[formName]);
    },
    //获取订单列表（这个方法会多次执行）
    getOrderList() {
      if (this.search.status == 0) {
        this.search.status = "";
      }
      // 如果面试官问，你在使用这个组件遇到哪些问题时，你就说当时有个tabs组件，默认的要是你给他绑定的为空或者null时哦，他就默认返回0，所以我直接修改数据，让它是0是让它为空
      GetOrderList(this.search)
        .then((res) => {
          this.orderList = res.data.data;
          this.excel = res.data.data;
          this.pagination = res.data.pagnation;
          this.pagination.current = this.pagnation.current * 1;
          this.pagination.size = this.pagnation.size * 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tabClick(tab) {
      //   console.log(tab, event);
      this.search.status = tab.name;
      //   console.log(tab);
      this.getOrderList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style>
.orderlist {
  height: 100%;
  overflow-y: auto;
}
</style>
