<template>

  <div class="common-layout">

    <el-container>
      <!--导航栏-->
      <!--  上    -->
      <el-header>
        <el-affix :offset="0">
          <el-menu
              :default-active="router.currentRoute.value.fullPath"
              class="el-menu-demo"
              mode="horizontal"
              :ellipsis="false"
              router="true"
          >
            <el-menu-item style="color: blue;font-family: 华文行楷;font-size: 25px">湖南工业职业技术学院</el-menu-item>
            <!--搜索框-->
            <el-input v-model="inputVal" placeholder="请输入搜索内容" @keyup.enter="search" class="input">
              <template #append>
                <el-button :icon="Search" @click="search" type="primary"/>
              </template>
            </el-input>

            <div class="flex-grow"/>
            <el-menu-item index="/home" route="/home" replace>主页</el-menu-item>
            <el-sub-menu>
              <template #title>实习中心</template>
              <el-menu-item index="/internshipPlan" route="internshipPlan" replace>实习计划</el-menu-item>
              <el-menu-item index="/practiceBase" route="practiceBase" replace>实习基地</el-menu-item>
              <el-menu-item index="/internshipTasks" route="internshipTasks" replace>实习任务</el-menu-item>
              <el-menu-item index="/internshipReport" route="internshipReport" replace>实习报告</el-menu-item>
              <el-menu-item index="/internshipResults" route="internshipResults" replace>实习成绩</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/dailyDocuments" route="dailyDocuments" replace>日常文档</el-menu-item>
            <el-menu-item index="/personalInfo" route="personalInfo" replace>个人中心</el-menu-item>

            <el-popover
                placement="bottom"
                :width="150"
                trigger="hover"
                content="this is content, this is content, this is content"
            >
              <el-menu
                  text-color="black"
                  background-color="#fff"
                  :default-active="activeIndex"
              >
                <el-menu-item index="personalInfo" @click="router.push('/personalInfo')">
                  <el-icon>
                    <User/>
                  </el-icon>
                  <span>个人中心</span>
                </el-menu-item>
                <el-menu-item index="4" @click="logout()">
                  <el-icon>
                    <RemoveFilled/>
                  </el-icon>
                  <span>退出登录</span>
                </el-menu-item>
              </el-menu>
              <template #reference>
                <el-avatar :size="50" src="src/assets/宵宫.jpeg"/>
                <p>admin</p>
              </template>
            </el-popover>
          </el-menu>

        </el-affix>
      </el-header>

      <!--   中   -->
      <el-main>
        <el-backtop :right="50" :bottom="70"/>
        <router-view></router-view>
      </el-main>

      <!--  下    -->
      <el-footer>
        <div style="margin-top: 30px;position:relative">
          <el-row>
            <el-col :span="8"><a href="https://github.com/10hetongxue18/">❤支持项目</a></el-col>
            <el-col :span="8"><a href="https://www.bilibili.com/">😍联系作者</a></el-col>
            <el-col :span="8"><a href="https://www.zhaopin.com/">👽免责声明</a></el-col>
          </el-row>
          <span style="font-family: 华文行楷">©2022 cabbage出品|2022/10/20</span>
        </div>
      </el-footer>

    </el-container>


  </div>


</template>

<script setup>
import HomePage from "../basePages/HomePage.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter()
const route = useRoute()
const activeIndex = ref('home')

const handleSelect = () => {
  // activeIndex.value=route.path
}

onMounted(() => {
  // activeIndex.value='home'
  // activeIndex.value=this.$route.path
  // router.push('/home')

})
//退出登录
const logout = () => {
  router.push('/login')
}


</script>

<style scoped>
/*导航栏样式*/
.el-menu-demo {
  /*背景透明度*/
  opacity: 0.8;
  /*边框渐变*/
  border-radius: 20px;
  padding: 10px;
  /*border: 1px black solid;*/
}

.flex-grow {
  flex-grow: 1;
}

/*搜索框*/
.input {
  width: 300px;
  height: 40px;
  margin-top: 10px;
  /*margin-left: 70px;*/
  /*float:left;*/
  /*transition:.3s linear;*/
}

/*.input:focus{*/
/*  width: 500px;*/
/*}*/

</style>



