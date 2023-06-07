<template>




<!-- region -->
  <div id="admin-layout">
    <el-container style="min-height: 100vh">
      <!--侧边栏-->
      <el-aside width="200px">
        <div style="height: 44px">
          <p style="padding: 10px;font-family: 华文行楷;font-size: 20px">工院实习管理后台</p>
        </div>
<!-- 控制菜单栏开关       -->
<!--        :collapse="isCollapse"-->
        <el-menu
            :default-active="router.currentRoute.value.fullPath"
            @open="handleOpen"
            @close="handleClose"
            active-text-color="lightpink"
            text-color="cadetblue"
            :router="true"
        >

<!--          <el-menu-item index="/adminIndex" route="adminIndex" @click="progress()">-->
<!--            <el-icon><icon-menu /></el-icon>-->
<!--            <template #title>主页</template>-->
<!--          </el-menu-item>-->
          <el-sub-menu index="/studentManagement" >
            <template #title>
              <el-icon><User /></el-icon>
              <span>学生管理</span>
            </template>
            <el-menu-item index="/studentBasicInfo" route="studentBasicInfo" @click="progress()">学生基本信息</el-menu-item>
            <el-menu-item index="/studentInterInfo" route="studentInterInfo" @click="progress()">学生实习信息</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/classManagement" route="classManagement" @click="progress()">
            <el-icon><document /></el-icon>
            <template #title>班级管理</template>
          </el-menu-item>
          <el-sub-menu index="/teacherManagement" >
            <template #title>
              <el-icon><User /></el-icon>
              <span>指导老师管理</span>
            </template>
                <el-menu-item index="/schTeacherManagement" route="schTeacherManagement" >校内指导老师管理</el-menu-item>
                <el-menu-item index="/entTeacherManagement" route="entTeacherManagement" >企业指导老师管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/newsManagement" route="newsManagement" >
            <el-icon><setting /></el-icon>
            <template #title>新闻管理</template>
          </el-menu-item>
          <el-sub-menu index="/internship" >
            <template #title>
              <el-icon><User /></el-icon>
              <span>实习管理</span>
            </template>
<!--              <el-menu-item index="/internshipInfoManagement" route="internshipInfoManagement" >-->
<!--                <el-icon><document /></el-icon>-->
<!--                <template #title>实习信息管理</template>-->
<!--              </el-menu-item>-->
<!--              <el-menu-item index="6-2" route="" >-->
<!--                <el-icon><document /></el-icon>-->
<!--                <template #title>实习基地管理</template>-->
<!--              </el-menu-item>-->
            <el-menu-item index="/internshipDocManagement" route="internshipDocManagement" >
              <el-icon><document /></el-icon>
              <template #title>实习文档管理</template>
            </el-menu-item>
            <el-menu-item index="/internshipInfoManagement" route="internshipInfoManagement" >
              <el-icon><document /></el-icon>
              <template #title>实习报告管理</template>
            </el-menu-item>
          </el-sub-menu>
<!--          <el-menu-item index="/messageManagement" route="messageManagement" >-->
<!--            <el-icon><setting /></el-icon>-->
<!--            <template #title>留言管理</template>-->
<!--          </el-menu-item>-->
        </el-menu>

        <!--控制菜单栏开关-->
<!--        <el-radio-group v-model="isCollapse">-->
<!--          <div v-if="isCollapse==true" >-->
<!--            <el-radio-button :label="false" ><el-icon ><Expand /></el-icon></el-radio-button>-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            <el-radio-button :label="true" ><el-icon ><Fold /></el-icon></el-radio-button>-->
<!--          </div>-->
<!--        </el-radio-group>-->
      </el-aside>
      <el-container>
        <!--顶部-->
        <el-header style="text-align: right">
          <el-row :gutter="20">
            <el-col :span="8">
              <!--面包屑-->
              <el-breadcrumb separator="/" style="padding: 22px">
                <el-breadcrumb-item
                    v-for="item in add"
                    :key="item.path"
                    :to="{ path: item.path }"
                >
                  {{item.meta.title}}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="8">
              <h1 style="font-family: 华文行楷;color: black;text-align: left;">湖南工业职业技术学院《白菜出品》</h1>
            </el-col>
            <el-col :span="8">
              <div class="toolbar" >
<!--                <h1 style="font-family: 华文行楷;color: black;text-align: left;">湖南工业职业技术学院</h1>-->
                <el-dropdown>
                  <el-icon style="margin-right: 8px; margin-top: 1px"
                  ><setting
                  /></el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>个人资料</el-dropdown-item>
                      <el-dropdown-item>布局设置</el-dropdown-item>
                      <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span style="text-align: right">管理员</span>
              </div>
            </el-col>
          </el-row>

        </el-header>
        <!--主体-->
        <el-main>
<!--    region    -->
          <!--          tab标签栏-->
<!--          <el-tabs-->
<!--              v-model="editableTabsValue"-->
<!--              type="card"-->
<!--              class="demo-tabs"-->
<!--              closable-->
<!--              @tab-remove="removeTab"-->
<!--          >-->
<!--            <el-tab-pane-->
<!--                v-for="item in editableTabs"-->
<!--                :key="item.name"-->
<!--                :label="item.title"-->
<!--                :name="item.name"-->
<!--            >-->
<!--              {{ item.content }}-->
<!--&lt;!&ndash;              <router-view></router-view>&ndash;&gt;-->
<!--            </el-tab-pane>-->
<!--          </el-tabs>-->
<!--          <div style="margin-bottom: 20px">-->
<!--            <el-button size="small" @click="addTab(editableTabsValue)">-->
<!--              add tab-->
<!--            </el-button>-->
<!--          </div>-->
          <!--    endregion    -->
<!--    进度条      -->
          <el-progress :percentage="percentNum" :format="format" :indeterminate="true" v-if="percentNum!=0" />
          <el-backtop :right="50" :bottom="70"/>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- endregion -->


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import myAxios from "../../../plugins/myAxios.js";
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
/*进度条*/
const percentNum=ref(0);
const format = (percentNum) => (percentNum === 100 ? '' : `${percentNum}%`)
// const format = ref();
const progress=()=>{
  for (let i = 0; i < 100; i++) {
    percentNum.value+=10;
    if(percentNum.value>100){
      percentNum.value=100
    }
  }
  setTimeout(() => {
    for (let i = 100; i >0 ; i--) {
      percentNum.value-=10;
      if(percentNum.value<0){
        percentNum.value=0
      }
    }
  }, 1000)
}
/*region*/
//tab、面包屑
// let tabIndex = 2
// const editableTabsValue = ref('2')
// const editableTabs = ref([
//   {
//     title: 'Tab 1',
//     name: '1',
//     content: 'Tab 1 content',
//   },
//   {
//     title: 'Tab 2',
//     name: '2',
//     content: 'Tab 2 content',
//   },
// ])
// const addTab = (targetName: string) => {
//   const newTabName = `${++tabIndex}`
//   editableTabs.value.push({
//     title: route.meta.title,
//     name: route.path,
//     content: route.path,
//   })
//   editableTabsValue.value = newTabName
// }
// const removeTab = (targetName: string) => {
//   const tabs = editableTabs.value
//   let activeName = editableTabsValue.value
//   if (activeName === targetName) {
//     tabs.forEach((tab, index) => {
//       if (tab.name === targetName) {
//         const nextTab = tabs[index + 1] || tabs[index - 1]
//         if (nextTab) {
//           activeName = nextTab.name
//         }
//       }
//     })
//   }
//
//   editableTabsValue.value = activeName
//   editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
// }
/*endregion*/

const isCollapse = ref(true)
const router = useRouter()
const route = useRoute()

onMounted(() => {
  progress()
})

//计算属性，计算路由
const add=computed(()=>{
  return route.matched
})
//Loading加载组件
// const openFullScreen = () => {
//   const loading = ElLoading.service({
//     lock: true,
//     text: 'Loading',
//     background: 'rgba(0, 0, 0, 0.7)',
//   })
//   setTimeout(() => {
//     loading.close()
//   }, 2000)
// }

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
/*菜单*/
.el-menu{
  border-right: none;
  /*background-color: var(--el-color-primary-light-7);*/
  /*font-family: 华文行楷;*/
}
.el-menu-item{


}
/*头部*/
.el-header{
  position: relative;
  /*background-color: beige;*/
}

.toolbar{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

/*侧边栏*/
.el-aside{
  background-color: #6b778c;
}
.el-main{
  padding: 0;
}
/*主页面样式*/
#admin-layout{
  /*background-image: url("src/assets/官图.jpg");*/
  background-repeat: no-repeat;
  background-position: center 0;
  background-attachment:fixed;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
/*tab样式*/
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

<style>

</style>



