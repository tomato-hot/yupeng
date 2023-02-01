// 导入request
import request from '@/utils/request' 
// 获取角色（用户组）api
export function GetUserGroup(params){
    return request.get("/api/yp/user_group",{params})
}
// 获取所有的权限
export function GetPermission(){
    return request.get("/api/yp/permission");
}

// 添加角色
export function AddUserGroup(data){
    return request.post("/api/yp/user_group",data)
}
// 编辑角色
export function ChangeUser(data){
    return request.put("/api/yp/user_group",data)
}
//获取全部菜单
export function GetAllMenu(params){
    return request.get("/api/yp/permission",{params})
}
// 添加菜单api
export function AddMenu(data){
    return request.post("/api/yp/permission",data)
}
// 定义删除功能
export function DelMenu(id){
    return request.delete("/api/yp/permission/"+id);
}
// 定义编辑功能
export function EditMenu(data) {
    return request.put("/api/yp/permission",data)
}