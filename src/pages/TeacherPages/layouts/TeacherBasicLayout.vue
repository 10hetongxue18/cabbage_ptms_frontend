<template>
  <!-- region -->
  <div id="teacher-layout">
    <el-container>
      <el-aside width="200px" style="background-color: #99a9bf">
        <div style="height: 75px"></div>
        <el-menu
            :default-active="router.currentRoute.value.fullPath"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-el"
            background-color="#f0f0f0"
            active-text-color="lightpink"
            text-color="black"
            :router="true"
        >
<!--          <el-menu-item index="/teacherHomePage" route="teacherHomePage" replace><el-icon><HomeFilled /></el-icon>主页</el-menu-item>-->
          <el-menu-item index="/teaInternshipPlan" route="teaInternshipPlan" ><el-icon><Notebook /></el-icon>实习计划</el-menu-item>
          <el-menu-item index="/TeaInternshipDocument" route="TeaInternshipDocument" ><el-icon><Document /></el-icon>实习周报</el-menu-item>
          <el-menu-item index="/teaInternshipReport" route="teaInternshipReport" style="margin-right: 20px"><el-icon><DocumentChecked /></el-icon>实习报告</el-menu-item>
          <el-menu-item index="/teacherPersonalInfo" route="teacherPersonalInfo" replace><el-icon><UserFilled /></el-icon>个人信息</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu
              :default-active="router.currentRoute.value.fullPath"
              class="el-menu-demo"
              mode="horizontal"
              :ellipsis="false"
              :router="true"
          >
            <img src="../../../assets/avatar/header.png" />
            <div class="flex-grow"/>
            <el-popover
                placement="bottom"
                :width="150"
                trigger="hover"
                content="this is content"
            >
              <el-menu
                  text-color="black"
                  background-color="#fff"
                  :default-active="router.currentRoute.value.fullPath"
                  :router="true"
              >
                <el-menu-item index="teacherPersonalInfo" route="teacherPersonalInfo">
                  <el-icon>
                    <User/>
                  </el-icon>
                  <span>个人中心</span>
                </el-menu-item>
                <el-menu-item index="logout" @click="logout()">
                  <el-icon>
                    <RemoveFilled/>
                  </el-icon>
                  <span>退出登录</span>
                </el-menu-item>
              </el-menu>
              <template #reference>
                <el-avatar :size="50" style="margin-top: 10px" src="src/assets/avatar/teacher.png"/>
                <p>admin</p>
              </template>
            </el-popover>
          </el-menu>
        </el-header>
        <el-main style="margin-left: 200px; opacity: 0.7">
          <el-backtop :right="50" :bottom="70"/>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>


  </div>



</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../../plugins/myAxios.js";

const router = useRouter()
const route = useRoute()

onMounted(() => {


})
//退出登录
const logout = async () => {
  const res= await myAxios.post('/user/logout')
  if(res.data==true){
    // localStorage.removeItem("uid")
    //清除信任令牌
    localStorage.removeItem('authorization')
    await router.push('/login')
  }
}


</script>

<style scoped>
.el-header{
  padding: 0;
}
.el-main{
  padding: 0;
}
/*侧边栏*/
.el-aside{
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
/*导航栏样式*/
.el-menu-demo {
  padding: 10px;
  background-color: #475669;
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  z-index: 99999999;
}
.el-menu-el{
  /*min-height: 100vh;*/
  padding-top: 15px!important;
}

.flex-grow {
  flex-grow: 1;
}
/*搜索框*/
.input {
  width: 300px;
  height: 40px;
  margin-top: 10px;
}
#teacher-layout{
  /*background-image: url("src/assets/温迪.png");*/
  background-color: gainsboro;
  background-repeat: no-repeat;
  background-position: center 0;
  background-attachment:fixed;
  background-size: 100% 100%;
  /*opacity: 0.8;*/
  min-height: 100vh
}


</style>

<style>
/*.el-scrollbar__thumb{*/
/*  display: none;*/
/*}*/
</style>



