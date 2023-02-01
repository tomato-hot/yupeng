<template>
  <router-view></router-view>
</template>
<script>
 export default {
  created(){
    // 获取本地用户信息
    var userInfo = JSON.parse(localStorage.getItem("userInfo")||"{}");
    // 执行获取用户全信息的方法(存储在vuex中)
    this.$store.dispatch("getFullUserInfo",userInfo)
    // App重新获取菜单
    this.$store.dispatch("getMenu");
  }
 }
</script>