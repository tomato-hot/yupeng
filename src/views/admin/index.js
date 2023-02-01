// 导入接口
import { UpImg, UpdateUser } from '@/api/user'
import { findItem } from '@/utils';
export default {
    watch: {
        //监听动态标签变化 ，本地存储  
        editableTabs: {
            handler() {
                // 当标签变化时 存起来
                sessionStorage.setItem("editableTabs",JSON.stringify(this.editableTabs))
            },
            deep:true
        }
    },
    // 组件创建完毕后 从本地取回来
    created() {
        //从本地获取到动态标签 ，获取不到就用默认  
        var editableTabs  =JSON.parse(sessionStorage.getItem("editableTabs")||`[{
            "path": '/admin/dash',
            "name": '概览'
}]`)
        // 更新动态标签
        this.editableTabs  =editableTabs
        // 更新当前选中的标签
        this.editableTabsValue  =this.$route.fullPath
    },
    data(){
        return {
            // 是否折叠
            isCollapse: false,
            // 标题数据
            editableTabsValue: '/admin/dash',
            // 动态标签页数据
            editableTabs: [{
              "path": '/admin/dash',
              "name": '概览',
            }
            ]
        }
    },
    methods: {
        // 菜单被选中
        menuSelect(e) {
            // 通过单击的path（e）找到对应的菜单
            var item  = findItem(e,this.$store.state.user.menu)
            var  flag = this.editableTabs.some(value=>value.path == item.path)
            if (!flag) {
                this.editableTabs.push({...item})
            }
            this.editableTabsValue = item.path
        },
        // 动态标签被点击
        tabClick(e) {
            this.$router.push(e.name)
        },
        removeTab(targetName) {
            // 首页不删除
            if (targetName != "/admin/dash") {
                // 找到删除元素对应的id
                var ind = this.editableTabs.findIndex(item=>item.path==targetName)
                // 删除一个标签
                this.editableTabs.splice(ind,1)
                if (this.editableTabsValue === targetName) {
                    // 路由应该跳转上一个标签页面
                    this.$router.push(this.editableTabs[ind-1].path)
                    // 更新选中的标签
                    this.editableTabsValue =this.editableTabs[ind-1].path
                }
            }
        },
        upImg(){
            // 创建一个表单对象
            var data = new FormData();
            // 添加一个文件，表单的文件的第0个
            data.append("file",this.$refs.inp.files[0]);
            UpImg(data)
            .then(res=>{
                //上传头像获取到头像的地址
                // 更改用户信息，把原来信息覆盖掉，添加avatar
               UpdateUser({
                ...this.$store.state.user.fullUserInfo,
                avatar:'http://dida100.com:8888'+res.data.file.path})                
               .then(result=>{
                    // 如果修改成功
                    if(result.data&&result.data.code===0){
                        // 获取本地头像信息
                        var userinfo = JSON.parse(localStorage.getItem("userInfo")||"{}")
                        // 修改avatar
                        userinfo.avatar =  'http://dida100.com:8888'+res.data.file.path;
                        // 存储本地信息
                        localStorage.setItem("userInfo",JSON.stringify(userinfo));
                        // 修改vuex中用户信息
                        this.$store.state.user.fullUserInfo.avatar = 'http://dida100.com:8888'+res.data.file.path;
                        this.$message({
                            type:"success",
                            message:"修改头像成功"
                        })
                    }
               })
            })
           
        }
    }
}