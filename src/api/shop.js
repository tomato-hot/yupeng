// 导入request
import request from '@/utils/request' 

export function GetShop(params){
    return request.get("/api/yp/shop",{params})
}
