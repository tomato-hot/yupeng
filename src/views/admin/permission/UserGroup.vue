<style lang="scss" scoped>
  .well{
    margin-top: -16px;
    margin-left: -16px;
    background-color: #fafafa;
    display: flex;
    height: 80px;
    align-items: center;
    width:100%;
    padding: 16px;
    box-sizing: border-box;
  }
</style>
<template>
    <div>
        <div class="well">
        <!-- 单击设置visible为true -->
          <el-button @click="visible=true;">新增</el-button>
        </div>
        <h2>角色管理</h2>
        <el-table
      :data="usergroupList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="50"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="150"
         >
      </el-table-column>
      <el-table-column
        prop="isSys"
        width="100"
        label="系统管理员">
      </el-table-column>
      <el-table-column
        prop="ranges"
        width="80"
        label="范围">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column       
      label="操作"
      width="100">
      <!-- 控制行的信息 -->
      <template slot-scope="scope">
        <!-- 查看员工信息 -->
        <el-button type="text"
        @click="visibleShow = true; check(scope)"
        >查看</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
            small
            layout="prev, pager, next"
            :current-page="pagnation.current"
            @current-change="currentChange"
            :total="pagnation.total">
    </el-pagination>
    <!-- :visible.sync="visible   是 :visible="visible"  @visible:update="visible=$event"的简写
        实现了类似父组件与子组件数据的双向改变（子组件好像更改了父组件的数据）
     -->
    <AddUserGroup :visible.sync="visible"
    @up="UserGroup()"
    ></AddUserGroup>
    <UserMsg :visible.sync="visibleShow" :UserMsg="userMsg"
    @up="UserGroup()"
    ></UserMsg>

    <!-- <AddUserGroup :visible="visible" @visible:update="visible=$event"></AddUserGroup> -->
    </div>
</template>
<script>
// 导入api
import {GetUserGroup} from '@/api/permission'
// 导入添加用户组件
import AddUserGroup from '@/components/AddUserGroup.vue'
import UserMsg from '@/components/UserMsg.vue'

export default {
  components:{AddUserGroup,UserMsg},
    data(){
        return {
          visible: false,
          // 员工信息弹框
          visibleShow:false,
            // 用户组列表
            usergroupList:[],
          userMsg:{},
            search:{
                size:10,
                order:'asc'
            },
            // 分页信息
            pagnation:{},

        }
    },
    created(){
        this.getUserGroup();
    },
  methods: {
    UserGroup(){
       this.getUserGroup()
    }
    ,
    check(e) {
      this.userMsg=e.row
      console.log(e.row);
    }
      ,
        currentChange(val){
          
            // 更新搜索条件的分页信息
            this.search.current = val;
            // 获取最新店铺
            this.getUserGroup();
        },
        // 获取用户组件
        getUserGroup(){
            GetUserGroup(this.search)
            .then(res=>{
                // 更新用户组信息
                this.usergroupList = res.data.data;
                // 更新分页信息
                this.pagnation = res.data.pagnation;
                // 转换为数字（修复bug，让后端解决）
                this.pagnation.current = this.pagnation.current*1;
                this.pagnation.total =  this.pagnation.total*1;
            })
        }
    }
}
</script>