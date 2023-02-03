import request from "@/utils/request";
// 商品列表
export function produceList(data){
    return request.get('/api/yp/product',data)
}
// 静态商品统计
export function staticProduce(data){
    return request.get('/api/yp/product/static',data)
}
