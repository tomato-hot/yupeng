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
// 商品信息
function shopMsg(data){
    return request.get("/api/yp/product",data)
}
//  退款详情 /退款统计
function DrawbackDetail(data){
    return request.get("/api/yp/drawback/static",data)
}
// 退款处理 /静态订单数据
function backClear(data){
    return request.get("/api/yp/drawback",data)
}
// 更新订单
function updateOrder(data){
    return request.get("/api/yp/orderlist",data)
}

export {GetOrderStatic,GetOrderList,GetOrderDetail,shopMsg,DrawbackDetail,backClear,updateOrder}

//    post（增） del（删 +id）put（改）get（查）