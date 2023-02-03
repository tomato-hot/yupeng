<template>
  <div class="orderBackDetail">
    <div>
      <el-tabs v-model="orderback" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name + '(' + item.num + ')'"
          :name="item.name == '全部' ? '' : item.name"
          v-for="item in orderback"
          :key="item.id"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div>
    </div>
  </div>
</template>
<script >
// 退款信息头部 退款处理
import { DrawbackDetail,backClear } from "@/api/order";
export default {
  data() {
    return {
      orderback: [],
    };
  },
  methods: {
    // 头部切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  created() {
    DrawbackDetail().then((res) => {
      this.orderback = res.data.list;
      console.log(res.data.list, "退款详情测试");
    });
    backClear().then((res) => {
      // this.orderback = res.data.list;
      console.log(res.data.list, "退款处理测试");
    });
  },
};
</script>