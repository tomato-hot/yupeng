<style lang="scss" scoped>
    .content{
        display: flex;
        .permission{
            width: 40%;
        }
    }
</style>
<template>
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
        <div class="content">
            <div class="form">
                <el-form ref="form" :model="usergroup" label-width="90px">
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="usergroup.name"></el-input>
                    </el-form-item>
                    <el-form-item label="管理范围" prop="ranges">
                        <el-radio-group v-model="usergroup.ranges">
                            <el-radio label="总部" value="总部"></el-radio>
                            <el-radio label="店铺" value="店铺"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input 
                        type="textarea"
                        v-model="usergroup.description" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="permission" style="padding:16px; height:100%;overflow:hidden;" >
                <el-tree
                    ref="tree"
                    node-key="id"
                    :props="props"
                    :data="menus"                    
                    show-checkbox
                    @check-change="handleCheckChange">
                </el-tree>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button 
            type="primary" 
            @click="addUserGroup()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {GetPermission,AddUserGroup} from '@/api/permission'
    export default {
        created(){
            // 获取权限菜单（所有）
            GetPermission()
            .then(res=>{
                if(res&&res.data&&res.data.code===0){
                    //更新权限菜单
                    this.menus = res.data.list;
                }
            }) 
        },
        methods:{
            // 添加用户角色
             addUserGroup(){
                // 添加角色的api
                AddUserGroup(this.usergroup)
                .then(res=>{
                    if(res&&res.data&&res.data.code==0){
                        this.$emit("up",true)
                        // 添加角色成功 提示成功
                        this.$message({
                            type:"success",
                            message:"添加角色成功"
                        })
                        // 关闭弹框
                        this.dialogFormVisible = false;
                    }
                })
             },
            // 选择发生变化时候
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
                // 获取选择的key值也就是id值
                var temp = this.$refs.tree.getCheckedKeys();
                // 更新usergroup的permisson值（权限菜单id）
                this.usergroup.permission = temp.join(",");
            },
        },
        data(){
            return {
                // 树组件选项
                props: {
                    // 显示的名称用name字段
                    label: 'name'
                 },
                // 是否显示弹框
                dialogFormVisible:this.visible,
                // 角色信息
                usergroup:{
                    "name": "", //名称
                    "isSys": 1,//是否为系统
                    "ranges": "店铺",//范围
                    "description": "",//描述
                    "permission":"" //指定角色的权限
                },
                // 所有的菜单（权限）
                menus:[],
            }
        },
        props:{
            // 父组件传递的参数visible（控制是否显示弹框）
            visible:{
                type:Boolean,
                default:false,
            }
        },
        watch:{
            // 监听visible更新是否显示弹框
            "visible":{
                handler(){
                    this.dialogFormVisible=this.visible;
                },
                 
            },
            // 监听是否显示弹框的值，通过事件的方式更新父组件的visible值
            "dialogFormVisible":{
                handler(){
                    this.$emit("update:visible",this.dialogFormVisible);
                }
            }
        }
    }
</script>