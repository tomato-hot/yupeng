// 导入request
import request from '@/utils/request'

// 登录
export function Login(data){
   return request.post("/api/login",data)
}

// 获取用户信息(全)
export function GetUserInfo(params){
    return request.get("/api/user",{
        params:params
    })
}
// 上传头像
export function UpImg(data){
    return request.post("/api/file/upload",data)
}

// 修改用户
export function UpdateUser(data){
    return request.put("/api/user",data)
}

// 获取菜单
export function GetMenu(){
    return request.get("/api/yp/user_permission");
}

// 添加员工 api
export function AddStaff(data){
    return request.post("/api/user",data)
}

// 删除员工
export function DelStaff(id){
    return request.delete("/api/user/"+id)
}
// export function login            import {Login} from 'xxxx'
// export default fuction Login     import Login from 'xxxx'