<template>
    <el-dialog
    title="新增"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="menu" label-width="80px" >
        <el-form-item label="父级目录" >
           {{parent.name }}
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input v-model="menu.name"></el-input>
        </el-form-item>
        <el-form-item label="url" prop="path">
            <el-input v-model="menu.path"></el-input>
        </el-form-item>
        <el-form-item label="组件" prop="component">
            <el-input v-model="menu.component"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
            <el-input v-model="menu.icon"></el-input>
        </el-form-item>
        <el-form-item label="元信息" prop="meta">
            <el-input v-model="menu.meta"></el-input>
        </el-form-item>
        <el-form-item label="key" prop="linkname">
            <el-input v-model="menu.linkname"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="des">
            <el-input v-model="menu.des"  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureAddMenu">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
    // 导入添加菜单api
    import {AddMenu} from '@/api/permission'
    export default {
        props:{
            // 控制是否显示弹框
            visible: {
                type: Boolean
                , default: false
            },
            // 父菜单信息
            parent: {
                type: Object
                , default() { return { id: 0, name: "根目录" } },
            }
        },
        data(){
            return {
                // 控制组件是否显示弹框
                dialogVisible:this.visible,
                // 被添加的menu
                menu:{                 
                "linkname": "",
                "name": "",
                "path": "",
                "icon": "",
                "fid": this.parent.id,
                "rank": "100",
                "meta": "",
                "component": "",
                "des": ""     
                }
            }
        },
        methods:{
            sureAddMenu(){
                // 发送请求前，更新父id
                AddMenu({...this.menu,fid:this.parent.id})
                .then(res=>{
                    if(res.data.code===0){
                        // 弹框提示成功
                        this.$message({
                            type:"success",
                            message:"添加成功"
                        })
                    }
                    // 通知父组件添加成功
                    this.$emit("addSuccess",true);
                    // this.$parent.getMenu()//不推荐
                    // 关闭当前组件
                    this.dialogVisible = false;
                })
            },
            handleClose(done){
                // 告诉父组件更新visible 值false              
                // 关闭弹框
                done();              
            }
        },
        watch:{
            "dialogVisible":{
                handler(){
                    // 监听dialogVisible变化，告诉父组件更新visible属性值
                    this.$emit("update:visible",this.dialogVisible)
                },
                deep:true,
            },
            "visible":{
                handler(){
                    // 当复制的visible发生变化时候更新当前组件的
                    this.dialogVisible = this.visible;
                }
            }
        
        }
    }
</script>