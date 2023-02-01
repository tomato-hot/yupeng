<template>
  <el-container style="height: 100vh">
    <el-aside :style="{ width: isCollapse ? '64px' : '200px' }" class="aside">
      <div class="logo">
        <img src="@/assets/logo1.png" v-if="isCollapse" />
        <img src="@/assets/logo2.png" width="100%" v-else />
      </div>
      <div
        class="toggle"
        @click="isCollapse = !isCollapse"
        :style="{ 'justify-content': isCollapse ? 'center' : 'flex-start' }"
      >
        <i class="el-icon-s-unfold" v-if="isCollapse"></i>
        <i
          class="el-icon-s-fold"
          v-else
          style="margin-left: 20px; margin-right: 5px"
        ></i>
        <span v-if="!isCollapse" style="font-size: 14px">收起</span>
      </div>
      <el-menu
      @select="menuSelect"
        :collapse="isCollapse"
        router
        mode="vertical"
        class="el-menu-vertical-demo"
      >
        <MenuList :list="$store.state.user.menu"></MenuList>
      </el-menu>
    </el-aside>
    <el-container style="background-color: #f0f0f0">
      <el-header class="header">
        <div>
          <img src="@/assets/bell.png" />
        </div>
        <label class="avatar">
          <img :src="$store.state.user.fullUserInfo.avatar" />
          <span>{{ $store.state.user.fullUserInfo.name }}</span>
          <input type="file" style="display: none" ref="inp" @change="upImg" />
        </label>
        <div @click="$store.commit('LOGIN_OUT')">
          退出登录 <img src="@/assets/out.png" />
        </div>
      </el-header>
      <el-main>
        <!-- 切换标签 -->
        <el-tabs
          @tab-click="tabClick"
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove= "removeTab"
        >
          <el-tab-pane
            :key="item.path"
            v-for="item in editableTabs"
            :label="item.name"
            :name="item.path"
          >
          </el-tab-pane>
        </el-tabs>
        <keep-alive :max="10">
          <router-view
            style="background: #fff; min-height: 100%; padding: 16px"
          ></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<script src="./index.js">
</script>
<style>
.el-menu--collapse .submenu {
  display: none;
}
</style>
<style lang="scss" scoped>
@import "./admin.scss";
</style>
<style>
.el-tabs__header{
    margin-bottom: 0;
}
.el-tabs__item.is-active{
    background-color: #fff;
}
</style>