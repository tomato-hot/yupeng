<template>
    <div class="orderdetai">
        {{ this.orderDetail }}
    </div>
</template>
<script>
import {GetOrderDetail}  from "@/api/order";
export default {
    data() {
        return {
            orderDetail:[],
        }
    },
    created(){
        GetOrderDetail(72082005306).then((res) => {
            console.log(res,"111");
             this.GetOrderDetail()
        })
       
    }
}

</script>