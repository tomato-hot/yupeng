// 导入request
import request  from "@/utils/request";

// 订单统计
function GetOrderStatic(){
    return request.get("/api/yp/orders/static")
}
// 根据查询参数获取订单
function GetOrderList(data){
    return request.get("/api/yp/orderlist",{params:data})
}
//订单详情
function GetOrderDetail(orderNum){
    return request.get("/api/yp/orderDetail/"+orderNum)
}

export {GetOrderStatic,GetOrderList,GetOrderDetail}

//    post（增） del（删 +id）put（改）get（查）