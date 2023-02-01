<style lang="scss" scoped>
  .well{
    padding: 16px;
    display: flex;
    margin-left: -16px;
    margin-top: -16px;
    margin-bottom: 16px;
    width:100%;
    background-color: #fafafa;
    justify-content: space-between;
  }
</style>
<template>
    <div>
        <div class="well">
          <div>
            <el-button @click="$router.push('/admin/auth/addStaff')">+ 新增</el-button>
          </div>
          <div>
            <el-button type="primary" @click="search.current=1;getStaff()">搜索</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
          </div>
        </div>
        <el-form :inline="true"  :model="search" ref="searchForm"  label-width="120px">
            <el-form-item label="账号名"  prop="name">
                <el-input v-model="search.name" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名"  prop="realname">
                <el-input v-model="search.realname" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="所属店铺"  prop="shop">
              <el-autocomplete
                 
                  v-model="shop"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入店铺名称"
                  @select="handleSelect"
              ></el-autocomplete>
              {{search.shop }}
            </el-form-item>
            <br/>
            <el-form-item label="角 色"  prop="user_group">
              <el-autocomplete
                  value-key="name"
                  v-model="usergroup"
                  :fetch-suggestions="getUserGroup"
                  placeholder="请输入角色名称"
                  @select="handleGroupSelect"
              ></el-autocomplete>
                
            </el-form-item>
            <el-form-item label="状态"  prop="state">
              <el-select v-model="search.state" placeholder="请选择状态">
                <el-option                  
                  key="无效"
                  label="无效"
                  value="无效">
                </el-option>
                <el-option                  
                  key="有效"
                  label="有效"
                  value="有效">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
       
        <el-table
      :data="staff"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="账号名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sname"
        label="所属门店">
      </el-table-column>
      <el-table-column
        prop="gname"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="lastTime"
        label="最后登录时间">
      </el-table-column>
      <el-table-column        
        label="操作">
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push('/admin/auth/editStaff/'+scope.row.id)">编辑</el-button>
        <el-button type="text" size="small" @click="delStaff(scope.row.id)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagnation.current"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="pagnation.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagnation.total">
    </el-pagination>
    </div>
</template>
<script>
    import {GetUserInfo,DelStaff} from '@/api/user'
    // 导入获取店铺的接口
    import {GetShop} from '@/api/shop'
    // 获取角色
    import {GetUserGroup} from '@/api/permission'
    export default {
        data(){
            return {
                //员工列表
                staff:[],
                // 搜索条件
                search:{
                    realname:"",
                    name:"",
                    // 当前页
                    current:1,
                    // 每页多少条
                    size:10,
                    // 降序
                    order:"asc",
                    // 所属门店
                    shop:'',
                    user_group:""
                },
                shop:"",
                usergroup:"",
                // 分页信息
                pagnation:{

                },
                // 搜索提示
                
            }
        },
        created(){
            // 获取员工列表
            this.getStaff();
        },
        methods:{
            delStaff(id){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                DelStaff(id)
                .then(res=>{
                  if(res&&res.data&&res.data.code===0){
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    // 删除成功，重新获取员工
                    this.getStaff();
                  }else{
                    this.$message({
                      type: 'success',
                      message: res.data.msg||"删除失败"
                    });
                  }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
           
            },
            handleGroupSelect(item){
              this.search.user_group = item.id;
            },
            getUserGroup(queryString, cb){
                var data = {order:"asc"};
                if(queryString){
                  data.name = queryString;
                }
                GetUserGroup(data)
                .then(res=>{
                  var results = res.data.data
                  cb(results);
                })
            },
            // 处理选择
            handleSelect(item){
              // console.log(item);
              this.search.shop = item.id;
            },
            // 搜索条件的获取
            querySearchAsync(queryString, cb) {
              // 提示的结果
              var data = {};
              if(queryString){
                data.name = queryString;
              }
           
              GetShop(data)
              .then(res=>{
                // 搜索提示显示的字段默认是item.value,如果没有item.value
                //   value-key="name" 要求搜索提示渲染item.name
                var results = res.data.data.map(item=>({...item,value:item.name}))
                cb(results);
              })
             
              // 返回提示
             
          },
            // 重置表单
            resetForm(formName){                
                this.$refs[formName].resetFields();
                this.shop= "";
                this.usergroup= "";
                this.getStaff();
              
            },
            // 处理size变化
            handleSizeChange(val) {
                // 当每页多少条发生变化时候，重新更新搜索条件size
                // 重新获取员工列表
                console.log(`每页 ${val} 条`);
                this.search.size=val;
                this.getStaff();
            },
            // 处理current变化
            handleCurrentChange(val) {
                // 当当前页发生变化时候更新 搜索条件的当前页
                // 获取数据
                this.search.current=val;
                this.getStaff();
            },
            getStaff(){
                // 获取员工列表
                var search = {};
                // 如果是空的字段，不添加到搜索条件
                for(var k in this.search){
                    if(this.search[k]){
                        search[k] = this.search[k]
                    }
                }
                GetUserInfo(search)
                .then(res=>{
                    // 更新staff
                    this.staff = res.data.data;
                    this.pagnation = res.data.pagnation;
                    this.pagnation.current =  this.pagnation.current*1;
                    this.pagnation.size = this.pagnation.size*1;
                })
            }
        }
    }
</script>