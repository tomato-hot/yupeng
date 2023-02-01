<template>
    <el-dialog
    title="新增"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
    export default {
        props:{
            // 控制是否显示弹框
            visible:{type:Boolean,default:false},
            // 父菜单信息
            parent:{type:Object,default(){return {id:0,name:"根目录"}},
            }
        },
        data(){
            return {
                // 控制组件是否显示弹框
                dialogVisible:this.visible
            }
        },
        methods:{
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