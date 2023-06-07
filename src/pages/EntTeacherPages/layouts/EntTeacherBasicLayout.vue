<template>
  <div id="student-layout">

    <el-container>
      <el-aside width="200px" style="background-color: #99a9bf">
        <div style="height: 75px"></div>
        <el-menu
            :default-active="router.currentRoute.value.fullPath"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-el"

            active-text-color="lightpink"
            text-color="black"
            :router="true"
        >
          <el-menu-item index="/entTeacherHomePage" route="entTeacherHomePage">主页</el-menu-item>
          <el-menu-item index="/entTeaPost" route="entTeaPost" >发布实习岗位</el-menu-item>
          <el-menu-item index="/entTeaPositionApplication" route="entTeaPositionApplication" >岗位申请情况</el-menu-item>
<!--          <el-menu-item index="/entTeaInternshipReport" route="entTeaInternshipReport" style="margin-right: 20px">实习详情</el-menu-item>-->
          <el-menu-item index="/entTeacherPersonalInfo" route="entTeacherPersonalInfo" replace>个人信息</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
<!--          <el-affix :offset="0" style="width: 100%;left: 0">-->
            <el-menu
                :default-active="router.currentRoute.value.fullPath"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                :router="true"
            >
              <!--            <el-menu-item style="color: blue;font-family: 华文行楷;font-size: 25px"></el-menu-item>-->
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
                  <el-menu-item index="/entTeacherPersonalInfo" route="entTeacherPersonalInfo">
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
<!--          </el-affix>-->
        </el-header>
        <el-main style="margin-left: 200px">
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
/*导航栏样式*/
.el-menu-demo {
  /*背景透明度*/
  /*opacity: 0.8;*/
  /*边框渐变*/
  /*border-radius: 20px;*/
  padding: 10px;
  background-color: #475669;
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  z-index: 99999999;
}
.flex-grow {
  flex-grow: 1;
}
#student-layout{
  /*background-image: url("src/assets/温迪.png");*/
  background-color: gainsboro;
  background-repeat: no-repeat;
  background-position: center 0;
  background-attachment:fixed;
  background-size: 100% 100%;
  /*opacity: 0.8;*/
  min-height: 100vh
}
/*侧边栏*/
.el-aside{
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.el-menu-el{
  /*min-height: 100vh;*/
  padding-top: 15px!important;

}

</style>

<style>

</style>



