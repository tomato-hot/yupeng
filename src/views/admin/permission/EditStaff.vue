<template>
    <div>
        <h2 style="margin-top:0;margin-left:100px;">编辑员工</h2>        
        <el-form 
        style="max-width: 800px;"
        :model="staff"          
        ref="ruleForm" 
        label-width="100px" 
        :rules="rules"
        class="demo-ruleForm">
        <el-form-item label="账号" prop="name">
            <el-input v-model="staff.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="staff.password"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
            <el-input v-model="staff.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="staff.email"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="staff.realname"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="name">
            <el-cascader-panel 
            @change="userGroupChange"
            v-model="staff.user_group" :options="options" :props="{'value':'id','label':'name'}"></el-cascader-panel>
        </el-form-item>
        <el-form-item label="门店" prop="shop">
            <el-input v-model="staff.shop" style="max-width:600px;"></el-input>
            <el-button type="text" style="margin-left:10px;" @click="dialogFormVisible=true">选择门店</el-button>
        </el-form-item>
        <el-form-item label="状态" prop="state">
            <el-radio-group v-model="staff.state">
                <el-radio :label="'有效'">有效</el-radio>
                <el-radio :label="'无效'">无效</el-radio>                
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  style="width:100%" @click="editStaff()" >保存</el-button>
        </el-form-item>
        </el-form>
        <el-dialog title="选择门店" :visible.sync="dialogFormVisible">
            <el-form :model="search"  :inline="true">
                <!-- 搜索店铺名称 -->
                <el-form-item label="门店:" label-width="100" prop="search">
                    <el-input v-model="search.name" ></el-input>
                </el-form-item>
                <el-form-item>
                <!-- 重新搜索：获取新的店铺信息 -->
                    <el-button @click="getShop();">搜索</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格显示店铺 -->
            <el-table :data="shopData" 
                 @selection-change="handleSelectionChange">
                 <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column property="id" label="门店编码"  ></el-table-column>
                    <el-table-column property="name" label="门店名称"  ></el-table-column>                     
            </el-table>
            <!-- 分页信息 -->
            <el-pagination
            small
            layout="prev, pager, next"
            :current-page="pagnation.current"
            @current-change="currentChange"
            :total="pagnation.total">
            </el-pagination>
            <!-- 确定取消案例 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button 
                type="primary" 
                @click="staff.shop=tempId;dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {GetUserGroup}from '@/api/permission'
import {GetShop} from '@/api/shop'
// 导入添加员工的api
import {AddStaff,GetUserInfo,UpdateUser} from '@/api/user'
export default{
    data(){
        return {
            staff:{
                email:"",
                tel:"",
                password:"",
                name:"",
                //用户的组（角色）
                user_group:4,
                // state默认有效
                state:'有效',
                // 店铺信息
                shop:513,
                
            },
            // 角色级联列表需要的数据
            options: [
               
            ],
            //是否显示弹框
            dialogFormVisible:false,
            // 店铺列表数据
            shopData:[],
            // 搜索条件
            search:{
                name:"",
                // size:30,
                // order:'asc'
            },
            // 临时选择的id
            tempId:null,
            // 分页信息
            pagnation:{},
            // 表单验证
            rules: {
          name: [
            { required: true, message: '请输入员工名称', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在6 到 18 个字符', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          tel: [
            { pattern:/^1\d{10}/,   message: '请输入正确的手机号', trigger: 'blur' }
          ],
          email: [
            { type: 'email',  message: '请输入正确邮箱', trigger: 'change' }
          ],
          
        }
        }

    },
    created(){
        // 获取用户信息
        // $route.params.id 传入的用户id
        GetUserInfo({id:this.$route.params.id})
        .then(res=>{
            if(res&&res.data&&res.data.code==0){
                // 更新staff的数据
                this.staff = res.data.data[0];
            }
        })

        // 组件创建获取角色
        this.getUserGroup();
        // 获取门店
        this.getShop();
    },
    methods:{
        // 编辑员工
        editStaff(){
            var data = {...this.staff};
            // 如果用户的密码为空就不改密码
            // 不为空则修改密码
            if(!data.password){
                delete data.password
            }
            UpdateUser(data)
            .then(res=>{
                if(res&&res.data&&res.data.code===0){
                    this.$message({
                        type:"success",
                        message:'编辑成功，2秒后自动返回'
                    })
                    setTimeout(()=>{
                        this.$router.back();
                    },1500)
                }
            })
        },
        addStaff(){
            AddStaff(this.staff)
            .then(res=>{
                if(res.data&&res.data.code==0){
                    // 添加成功
                    this.$message({
                        type:"success",
                        message:res.data.msg
                    })
                    // 重置表单
                    this.$refs.ruleForm.resetFields();
                }
            })
        },  
        // 分页发生变化
        currentChange(val){
            console.log(`当前页: ${val}`);
            // 更新搜索条件的分页信息
            this.search.current = val;
            // 获取最新店铺
            this.getShop();
        },
        // 处理选择
        handleSelectionChange(val) {
            // 获取到选择id
            this.tempId = val[0].id;
        
        },
        // 获取店铺信息
        getShop(){
            var data = {};
            // 如果搜索条件中不为空，当做搜索条件存入data
            for(var k in this.search){
                if(this.search[k]){
                    data[k] = this.search[k]
                }
            }
            GetShop(data)
            .then(res=>{
                // 更新店铺信息
                this.shopData = res.data.data;
                // console.log(res);
                // 更新分页信息
                this.pagnation = res.data.pagnation;
                // 转换为数字（修复bug，让后端解决）
                this.pagnation.current = this.pagnation.current*1;
                this.pagnation.total =  this.pagnation.total*1;
            })
        },

 
        userGroupChange(e){
            // 更新角色组
            this.staff.user_group = e[0];
        },
        // 获取角色
        getUserGroup(){
            // 请求接口
            GetUserGroup({
                order:'asc',
                size:30
            })
            .then(res=>{
                this.options = res.data.data;
            })
        }
    }
}
</script>