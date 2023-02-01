import request from '@/utils/request'
export function GetStaticMenu(params){
    return request.get('/api/yp/orders/static',{params:params})
}