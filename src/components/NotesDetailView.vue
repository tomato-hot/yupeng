<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: this.visible,
    };
  },
  props: {
    // 父组件传递的参数visible（控制是否显示弹框）
    visible: {
      type: Boolean,
      default: false,
    },
  },
  //   methods: {
  //     handleClose(done) {
  //       this.$confirm("确认关闭？")
  //         .then((_) => {
  //           done();
  //         })
  //         .catch((_) => {});
  //     },
  //   },
};
</script>