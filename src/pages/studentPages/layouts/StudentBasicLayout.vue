<template>

  <!-- region -->
  <div id="student-layout">
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
          <el-menu-item index="/studentHomePage" route="studentHomePage" replace><el-icon><HomeFilled /></el-icon>主页</el-menu-item>
          <el-menu-item index="/internshipPlan" route="internshipPlan" ><el-icon><Notebook /></el-icon>实习计划</el-menu-item>
          <el-menu-item index="/internshipDoc" route="internshipDoc" ><el-icon><Document /></el-icon>实习周报</el-menu-item>
          <el-menu-item index="/internshipReport" route="internshipReport" style="margin-right: 20px"><el-icon><DocumentChecked /></el-icon>实习报告</el-menu-item>
          <el-menu-item index="/personalInfo" route="personalInfo" replace><el-icon><UserFilled /></el-icon>个人信息</el-menu-item>
          <el-menu-item index="/internshipInfo" route="internshipInfo" replace><el-icon><Opportunity /></el-icon>实习信息</el-menu-item>
<!--          <el-menu-item index="/2" route="" replace><el-icon><BellFilled /></el-icon>实习通知</el-menu-item>-->
<!--          <el-menu-item index="/1" route="" replace><el-icon><TrendCharts /></el-icon>成绩报告</el-menu-item>-->
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
                <el-menu-item index="personalInfo" route="personalInfo">
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
                <el-avatar :size="50" style="margin-top: 10px" src="src/assets/avatar/student.jpeg"/>
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


      <!--  下    -->
<!--      <el-footer>-->
<!--        <div style="left: 300px;right: 300px;bottom: 0;position: fixed;width: 100%;">-->
<!--          <el-row>-->
<!--            <el-col :span="8"><a href="https://github.com/10hetongxue18/">❤支持项目</a></el-col>-->
<!--            <el-col :span="8"><a href="https://www.bilibili.com/">😍联系作者</a></el-col>-->
<!--            <el-col :span="8"><a href="https://www.zhaopin.com/">👽免责声明</a></el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="7"></el-col>-->
<!--            <el-col :span="8"><span style="font-family: 华文行楷;">©2022 cabbage出品|2022/10/20</span></el-col>-->
<!--            <el-col :span="8"></el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </el-footer>-->
  </div>
  <!-- endregion -->



</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
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

.flex-grow {
  flex-grow: 1;
}

#student-layout{
  /*background-image: url("src/assets/官图.jpg");*/
  background-color: #cccccc;
  background-repeat: no-repeat;
  background-position: center 0;
  background-attachment:fixed;
  background-size: 100% 100%;
  /*opacity: 0.8;*/
  min-height: 100vh;
}
.el-menu-el{
  /*min-height: 100vh;*/
  padding-top: 15px!important;
}

</style>

<style>
/*.el-scrollbar__thumb{*/
/*  display: none;*/
/*}*/
</style>



