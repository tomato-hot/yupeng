<template>
  <div>
    <el-carousel   class="carousel" height="100vh">
      <el-carousel-item v-for="item in 4" :key="item" class="item">
        <img :src="require('../assets/'+item+'.jpg')"/>
      </el-carousel-item>
    </el-carousel>
    <div class="loginBlock">
      <h1>
        <span style="color:dodgerblue">登录</span>
        <span style="font-size: 16px;">欢迎使用悦朋软件</span>
      </h1>
      <el-form   label-width="0" :model="user"  :rules="rules">
        <el-form-item label=""  prop="name">
            <el-input 
            prefix-icon="el-icon-user"
            placeholder="用户名"
            v-model="user.name"></el-input>
        </el-form-item>
      <el-form-item label=""  prop="password">
        <el-input 
        prefix-icon="el-icon-lock"
        placeholder="密码"
        v-model="user.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button round type="primary" style="width:100%" @click="$store.dispatch('login',user)">登录</el-button>
      </el-form-item>
    </el-form>
     
    </div>
  </div>
 
</template>
<script>
  export default {
    data(){
      return {
        user:{name:"",password:""},
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {pattern:/\w{6,18}/,message: '长度在 6 到 18 个字符', trigger: 'blur' }
            // { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
      },
     }
    }
  }
</script>
<style lang="scss" scoped>
  .loginBlock{
    position: absolute;
    right:25%;
    top:50%;
    transform: translate(0,-50%);
    width:320px;
    height:320px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 2px 6px #ccc;
    z-index: 1000;
    padding: 30px;
  }
  .carousel{
    
    .item{
      height: 100%;
      width:100%;
      img{
      height: 100%;
      // 图片适应容器
      object-fit: contain;
     }
    }
   
  }
</style>