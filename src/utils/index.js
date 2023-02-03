// 计算动态路由配置
export function getRoutes(list){
    // 返回的数组
    var temp = [];
    list.forEach(item=>{
        // 如果有children
        if(item.children){
            // 现有的数组连接 getRoutes返回的数组 （把childen作为参数传入）
            temp = temp.concat(getRoutes(item.children))
        }else{
            // 如果没有children
            if(item.component){
                // 如果有components就在temp中加入一个配置 /admin
                temp.push({path:item.path.slice(7),component:()=>import("@/views"+item.component)})
            }
        }
    })
    return temp;
}
// 头部标签
// 递归查找 单击菜单的url也就是e 在vuex中菜单对应项item
export function findItem(url, list) {
    // 遍历所有list
    for (var i = 0; i < list.length; i++){
        // 如果找到url 和path一致
        if (list[i].path == url)
        {
            // 直接返回
            return list[i]
        } else {
            //  如果找不到 并且他还有children
            if (list[i].children) {
                // 递归查找
                var item = findItem(url,list[i].children)
                // 如果找到了 才返回
                if (item) {
                    return item
                }
            }
        }
    }
    
}