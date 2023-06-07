<template>
<!--  :default-active="router.currentRoute.value.fullPath"-->
  <!--个人信息页-->
  <div id="personal">
    <el-container >
      <el-affix >
      <el-aside width="200px" style="background-color: #99a9bf">
        <div style="height: 78px"></div>
        <el-menu
          :default-active="router.currentRoute.value.fullPath"
        @open="handleOpen"
            @close="handleClose"
            active-text-color="lightpink"
            text-color="black"
            :router="true"
        >
          <el-menu-item index="/personalInfo" route="personalInfo" replace>个人信息</el-menu-item>
          <el-menu-item index="/internshipInfo" route="internshipInfo" replace>实习信息</el-menu-item>
          <el-menu-item index="/1" route="" replace>成绩报告</el-menu-item>
          <el-menu-item index="/2" route="" replace>实习通知</el-menu-item>
        </el-menu>
      </el-aside>
      </el-affix>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>








</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
const router=useRouter();
const route=useRoute();



</script>

<style scoped>
#personal{

}
.el-menu{
  border-right: none;
  min-height: 91.3vh;
  /*margin-top: 50px;*/
}
/*侧边栏*/
.el-aside{
  /*border: #99a9bf 1px solid;*/
  height: 100%;
  margin-top: -60px;
  /*position: relative;*/
}
</style>