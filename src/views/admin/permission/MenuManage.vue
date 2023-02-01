<template slot-scope="scope">
  <div>
    菜单管理
    <div style="margin: 16px; margin-left: 0">
      <el-button @click="visible = true">+ 新增</el-button>
      <el-button @click="visibleShow = true">* 编辑</el-button>
      <el-button @click="open">- 删除</el-button>
    </div>
    <el-table
      :data="menus"
      row-key="id"
      border
      @selection-change="handleSelectionChange"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="path" label="url" width="180"> </el-table-column>
      <el-table-column label="图标" width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon" style="font-size: 48px"></i>
        </template>
      </el-table-column>
      <el-table-column prop="component" label="组件名"></el-table-column>
      <el-table-column prop="meta" label="元信息"> </el-table-column>
      <el-table-column prop="des" label="描述"> </el-table-column>
      <el-table-column prop="linkname" label="key" width="180">
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <AddMenu
      :parent="multipleSelection[0]"
      :visible.sync="visible"
      @addSuccess="getMenu()"
    ></AddMenu>
    <!-- 编辑
         -->
    <EditMenu
      :parent="multipleSelection[0]"
      :visible.sync="visibleShow"
      @EditSuccess="getMenu()"
    ></EditMenu>
 <!-- 法二 -->
    <!-- <EditMenu
      visible = "visibleShow"
      @update:visible = "visibleShow = $event"
      :parent="multipleSelection[0]"
      :v-if="visibleShow"
      @EditSuccess="getMenu()"
    ></EditMenu> -->

    <!-- 
            :visible.sync="visible"
            =
            :visible="visible"
            @update:visible="visible=$event"
         -->
  </div>
</template>
<script>
import { GetAllMenu, DelMenu } from "@/api/permission";
// 导入新增弹框组件
import AddMenu from "@/components/AddMenu";
import EditMenu from "@/components/EditMenu";
export default {
  // 注册组件
  components: {
    AddMenu,
    EditMenu,
  },

  data() {
    return {
      // 定义所有菜单
      menus: [],
      // 选中的行
      multipleSelection: [],
      // 是否显示添加菜单组件AddMenu
      visible: false,
      // 是否显示编辑组件EditMenu
      visibleShow: false,
    };
  },
  created() {
    // 创建成功，默认获取一次
    this.getMenu();
  },
  methods: {
    // 选择发生变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log( this.multipleSelection[0].name);
    },
    // 获取所有菜单
    getMenu() {
      GetAllMenu().then((res) => {
        // 更新菜单信息
        this.menus = res.data.list;
        // 调用vuex中的获取权限命令(更新左侧菜单)
        this.$store.dispatch("getMenu");
      });
    },
    delMenu() {
      // 映射出一个promise列表
      var list = this.multipleSelection.map((item) => DelMenu(item.id));
      // .all多个promise全部执行完毕后才执行.then
      // .race 有个最先执行
      Promise.all(list)
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          // 更新菜单
          this.getMenu();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "批量删除失败",
          });
        });
      // for(let i=0;i<this.multipleSelection.length;i++){
      //     DelMenu(this.multipleSelection[i].id)
      //     .then(res=>{
      //         console.log(res.data.msg);
      //     })
      // }
    },
    // 删除选项
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delMenu();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
