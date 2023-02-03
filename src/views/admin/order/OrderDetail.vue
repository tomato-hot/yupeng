<template>
  <div class="orderdetail">
    <div class="order" style="width: 90%; margin: 0 5%">
      <el-steps :active="1">
        <el-step title="提交订单" icon="el-icon-success"></el-step>
        <el-step title="支付订单" icon="el-icon-info"></el-step>
        <el-step title="待发货" icon="el-icon-info"></el-step>
        <el-step title="待收货" icon="el-icon-info"></el-step>
        <el-step title="已收货" icon="el-icon-info"></el-step>
      </el-steps>
      <!-- {{ this.orderDetail }} -->
      <div class="status">
        <div class="one">当前状态： 待付款</div>
        <div @click="visibleShow=true">备注详情</div>
        <div>添加备注</div>
      </div>
      <div class="head">
        <span class="blo"></span>
        <p class="msg">基本信息</p>
      </div>
      <!-- :data="tableData" 接收数据 -->
      <el-table
        :data="orderDetail"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#eaedf4' }"
      >
        <el-table-column prop="OrderNum" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="会员账号" width="180">
        </el-table-column>
        <el-table-column prop="pyment_method" label="支付方式">
        </el-table-column>
        <el-table-column prop="OrderNum" label="支付单号"> </el-table-column>
        <el-table-column prop="comfirm_at" label="提货日期"> </el-table-column>
        <el-table-column prop="shoppingAdd" label="提货门店"> </el-table-column>
      </el-table>
      <div class="head">
        <span class="blo"></span>
        <p class="msg">收货人信息</p>
      </div>
      <el-table
        :data="orderDetail"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#eaedf4' }"
      >
        <el-table-column width="200px" prop="consignee" label="收货人">
        </el-table-column>
        <el-table-column width="200px" prop="phone" label="练习电话">
        </el-table-column>
        <el-table-column prop="shoppingAdd" label="收货地址"> </el-table-column>
      </el-table>
      <div class="head">
        <span class="blo"></span>
        <p class="msg">商品信息</p>
      </div>
      <el-table
        :data="shopAllMsg"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#eaedf4' }"
      >
        <el-table-column prop="OrderNum" label="商品图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.gallery" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="cateName" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180">
        </el-table-column>
        <el-table-column prop="productName" label="规格"> </el-table-column>
        <el-table-column prop="stock" label="数量"> </el-table-column>
        <el-table-column prop="stock" label="小计"> </el-table-column>
      </el-table>
      <div class="head">
        <span class="blo"></span>
        <p class="msg">费用信息</p>
      </div>
      <el-table
        :data="shopAllMsg"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#eaedf4' }"
      >
        <el-table-column prop="isShow" label="商品合计" width="180">
        </el-table-column>
        <el-table-column prop="price" label="活动优惠" width="180">
        </el-table-column>
        <el-table-column prop="stock" label="订单总金额"> </el-table-column>
        <el-table-column prop="stock" label="应付款金额"> </el-table-column>
      </el-table>
      <div class="price">
        <p>合计: 999.00</p>
      </div>
    </div>
    <NotesDetailView :visible.sync="visibleShow"></NotesDetailView>
  </div>
</template>
<script>
import NotesDetailView from "@/components/NotesDetailView"
import { GetOrderDetail, shopMsg } from "@/api/order";
export default {
    components: {
        NotesDetailView
    }
    ,
  data() {
    return {
      // 订单详情弹框
      visibleShow: false,
      //   订单详情数据
      orderDetail: [],
      //   所有商品数据
      shopAllMsg: [],
    };
  },
  methods: {
    note() {
      console.log("测试");
    },
  },
  created() {
    // 订单详情数据
    // GetOrderDetail(this.$route.params.id).then((res) => {
    GetOrderDetail(72082005407).then((res) => {
      //   console.log(res, "111");
      this.orderDetail = res.data.data;
    });
    // 订单详情商品数据
    shopMsg().then((res) => {
      this.shopAllMsg = res.data.data;
      //   console.log(res.data.data,"测试");
    });
  },
};
</script>
<style>
.el-steps {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
<style lang="scss" scoped>
.orderdetail {
  .order {
    .price {
      p {
        font-size: 20px;
        font-weight: 700;
        color: rgb(63, 120, 246);
        text-align: right;
        padding-right: 10px;
      }
    }
    // background-color: rgb(63, 120, 246);
    .status {
      width: 1000px;
      display: flex;

      align-items: center;
      // justify-content: space-between;
      div:nth-child(1) {
        font-weight: 700;
        border-radius: 0 20px 20px 0;
        margin-right: 30px;
        text-align: center;
        color: blue;
        height: 40px;
        color: white;
        width: 170px;
        line-height: 40px;
        background-color: rgb(63, 120, 246);
      }
      div:nth-child(2) {
        border-radius: 5px;
        margin-right: 30px;
        text-align: center;
        color: white;
        border: 1px solid rgb(63, 120, 246);
        height: 30px;
        width: 80px;
        line-height: 30px;
        color: rgb(63, 120, 246);
        cursor: pointer;
      }
      div:nth-child(3) {
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        height: 30px;
        width: 80px;
        line-height: 30px;
        color: white;
        background-color: rgb(63, 120, 246);
      }
    }
    .head {
      display: flex;
      align-items: center;
      margin: 4px 0;
      span {
        display: block;
        height: 20px;
        width: 6px;
        background-color: rgb(63, 120, 246);
        border-radius: 4px;
      }
      p {
        // line-height: 30px;
        padding-left: 10px;
      }
    }
  }
}
</style>