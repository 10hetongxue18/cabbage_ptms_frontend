<template>
<!-- 主页 -->
<!-- 空状态 -->
  <div v-if="news==null" class="mainBox">
    <el-empty description="暂无数据" />
  </div>
  <div v-else>
    <el-scrollbar always="false">
      <div class="mainBox">

        <!--走马灯-->
        <el-carousel indicator-position="none">
          <el-carousel-item v-for="item in carouseData" :key="item">
            <el-image :src="item.icon" fit="fill" style="width: 100%;height: 100%"/>
          </el-carousel-item>
        </el-carousel>



        <!--实习信息卡片-->
        <el-card class="box-card" >
          <template #header>
            <div class="card-header">
              <span style="color: #747bff;font-family: 华文行楷;font-size: 30px">实习信息</span>
            </div>
          </template>

          <el-card class="box-card" v-for="o in news" :key="o">
            <template #header>
              <div class="card-header">
                <span style="color: darkseagreen;font-family: 华文行楷;font-size: 20px">实习信息{{o.id}}</span>
              </div>
            </template>

            <el-row>
              <el-col :span="8">实习岗位：{{o.postName}}</el-col>
              <el-col :span="8">实习详情：{{o.message}}</el-col>
              <el-col :span="8">实习基地：{{o.areaId}}</el-col>
            </el-row>

            <el-button style="margin-top: 20px" @click="details(o)">点击查看详情</el-button>
          </el-card>

        </el-card>
      </div>
    </el-scrollbar>
  </div>



<!--  点击弹出详情页-->
  <el-dialog
      v-model="centerDialogVisible"
      title="实习信息详情"
      width="60%"
      align-center
      style="border-radius: 50px;"
      draggable
  >
<!--    <el-card style="border-radius: 20px">-->
      实习岗位：<span>{{dialog.postName}}</span>
    <br>
      实习信息：<span>{{dialog.message}}</span>
    <br>
      实习基地：<span>{{dialog.areaId}}</span>
    <!--    </el-card>-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>



</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../../../plugins/myAxios.js";
const centerDialogVisible = ref(false)
const news=ref()
const dialog=ref()

//页面刷新获取新闻信息
onMounted(async ()=>{
  //获取新闻接口
  const res=await myAxios.get("/user/news")

  console.log(res.data)
  news.value=res.data
})
//走马灯图片
const carouseData=ref([
  { icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/10/12/17/2/b53e21e3cfb84ceca100c25ccc0d7ce7_660-364.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href},
  { icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/8/31/9/14/1164d53adcb84637974d4e07ff034253_67.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href},
  { icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/10/9/18/33/a31cd78d1ab24aec8ea90a0cb5be987a_54.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href},
  { icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/9/30/19/51/40ccfb5d05534ada8ac96120edb20138_1.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href},
  { icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/10/12/17/2/b53e21e3cfb84ceca100c25ccc0d7ce7_660-364.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href},
  { icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/8/31/9/14/1164d53adcb84637974d4e07ff034253_67.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href},
  { icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/9/29/18/22/31951d2b759948a188110b7eface09b3_11.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href},
  {icon:new URL("https://xycy-file.zhaopin.com/xyactivity/2022/9/29/18/22/31951d2b759948a188110b7eface09b3_11.jpg?x-oss-process=image/resize,m_lfit,h_410,w_700",import.meta.url).href}
])

//弹出详情信息页
const details=(o)=>{
  centerDialogVisible.value=true;
  dialog.value=o
}


</script>

<style scoped>
/*卡片样式*/
.box-card {
  margin-top: 30px;
  /*背景透明度*/
  opacity: 0.8;
  /*height: 450px;*/
  padding: 30px;
  border-radius: 20px;
}

/*走马灯样式*/
.el-carousel {
  margin-top: 30px;
  /*背景透明度*/
  opacity: 0.8;
  border-radius: 20px;
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/*滚动条*/
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

/*主体盒子*/
.mainBox {
  /*margin-top: 50px;*/
  margin: 50px auto;
  width: 900px;
  /*height: 100%;*/
  /*border: 1px red solid;*/
  position: relative;
  padding-bottom: 50px;
}
/*折叠面板*/
.el-collapse {
  margin-top: 30px;
}

/*点击弹出详情页*/
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

<style>
.el-scrollbar__thumb{
  display: none;
}

</style>