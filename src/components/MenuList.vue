<template>
    <div>
        <div v-for="item in list" :key="item.path">
            <el-submenu :index="item.path"  v-if="item.children">
                <template slot="title">
                    <i :class="item.icon" v-if="item.icon"></i>
                    <span slot="title" class="submenu"  >{{item.name}}</span>
                </template>
                <MenuList :list="item.children"></MenuList>
            </el-submenu>         
            <el-menu-item  v-else :index="item.path">
                <i :class="item.icon" v-if="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            "list":{type:Array,default(){return []}}
        }
    }
</script>