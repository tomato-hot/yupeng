<template>
  <div>
    <div class="con">
      <div class="title">待处理</div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <div class="img">
              <img src="@/assets/dcl1.png" alt="" />
            </div>
            <div class="text">
              <div class="text">{{ this.staticMenu[1].name }}</div>
              <div class="num">{{ this.staticMenu[1].num }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="img">
              <img src="@/assets/dcl2.png" alt="" />
            </div>
            <div class="text">
              <div class="text">{{ this.staticMenu[2].name }}</div>
              <div class="num">{{ this.staticMenu[2].num }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="img">
              <img src="@/assets/dcl3.png" alt="" />
            </div>
            <div class="text">
              <div class="text">{{ this.staticMenu[3].name }}</div>
              <div class="num">{{ this.staticMenu[3].num }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="img">
              <img src="@/assets/dcl4.png" alt="" />
            </div>
            <div class="text">
              <div class="text">{{ this.staticMenu[4].name }}</div>
              <div class="num">{{ this.staticMenu[4].num }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="con">
      <div class="title">销售总览</div>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content one color">
            <div style="font-size: 36px; margin: 10px 0">2065</div>
            <div style="font-size: 20px">今日订单</div>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content two color">
            <div style="font-size: 36px; margin: 10px 0">56211</div>
            <div style="font-size: 20px">今日销售总额</div>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content three color">
            <div style="font-size: 36px; margin: 10px 0">152265</div>
            <div style="font-size: 20px">今日活动订单</div>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content four color">
            <div style="font-size: 36px; margin: 10px 0">21635</div>
            <div style="font-size: 20px">今日活动销售额（元）</div>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="con">
      <div class="title">商品总览</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple ys">
            <div>
              <p style="font-size: 20px">2159</p>
              <p style="font-size: 10px; color: #777">已下架</p>
            </div>
            <div>
              <p style="font-size: 20px">52163</p>
              <p style="font-size: 10px; color: #777">已上架</p>
            </div>
            <div>
              <p style="font-size: 20px">21</p>
              <p style="font-size: 10px; color: #777">活动商品</p>
            </div>
            <div>
              <p style="font-size: 20px">99999999</p>
              <p style="font-size: 10px; color: #777">全部商品</p>
            </div>
          </div></el-col
        >
        <el-col :span="12">
          <div class="grid-content bg-purple ys">
            <div>
              <p style="font-size: 20px">25</p>
              <p style="font-size: 10px; color: #777">今日新增</p>
            </div>
            <div>
              <p style="font-size: 20px">568</p>
              <p style="font-size: 10px; color: #777">昨日新增</p>
            </div>
            <div>
              <p style="font-size: 20px">5462</p>
              <p style="font-size: 10px; color: #777">本月新增</p>
            </div>
            <div>
              <p style="font-size: 20px">16</p>
              <p style="font-size: 10px; color: #777">阅读天数</p>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script>
import { GetStaticMenu } from "@/api/dash";

export default {
  data() {
    return {
      staticMenu: [],
    };
  },
  created() {
    this.getStaticMenu();
  },
  methods: {
    getStaticMenu() {
      GetStaticMenu()
        .then((res) => {
          if (res.data.code === 0) {
            this.staticMenu = res.data.list;
            console.log(this.staticMenu);
          }
        })
        .catch((err) => {
          console.log(err, "网络错误");
        });
    },
  },
};
</script>
<style lang="scss">
.con {
  margin: 10px 0;
}
.ys {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.color {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 10px;
  color: #fff;
}
.one {
  background: url("@/assets/5.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.two {
  background: url("@/assets/6.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.three {
  background: url("@/assets/7.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.four {
  background: url("@/assets/8.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.img {
  margin-right: 10px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #ccc;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
    object-fit: contain;
  }
}
.title {
  border-left: 3px solid rgb(0, 119, 255);
  margin: 4px;
  padding-left: 4px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 92px;
  display: flex;
  align-items: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>