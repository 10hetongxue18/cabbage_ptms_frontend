<template>
<!--登录页面-->
<div id="login">
  <el-container>
    <el-main>
      <div class="LoginPage">
        <el-card class="box-card">
          <div style="margin-top: 25vh">
            <div class="card-header">
              <span style="color: red;font-family: 华文隶书;font-size: 40px">湖南工业&nbsp;<span style="color: #747bff;font-size: 25px">职业技术学院</span></span>
              <span style="color: blue;font-family: 华文隶书;font-size: 15px"><img src="../../../assets/avatar/c1.jpg" alt="实习实训管理系统"></span>
            </div>
            <div style="border: 5px darkseagreen dashed;border-radius: 20px">
              <el-container>
                <el-main>
                  <div style="margin: 20px;">
                    <el-input v-model="userAccount" prefix-icon="User" placeholder="请输入账号" clearable style="width: 300px;height: 40px;"/>
                  </div>
                  <div style="margin: 20px">
                    <el-input
                        v-model="userPassword"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                        prefix-icon="Lock"
                        style="width: 300px;height: 50px"
                    />
                  </div>
                </el-main>
                <el-aside width="100px">
                  <div>
                    <el-button circle size="large" type="primary" plain style="margin-top: 70px" @click="userLogin()">
                      <el-icon><Right /></el-icon>
                    </el-button>
                  </div>
                </el-aside>
              </el-container>
            </div>


              <div style="margin-top: 20px">
                <el-row>
                  <el-col :span="8"><a href="https://github.com/10hetongxue18/">❤支持项目</a></el-col>
                  <el-col :span="8"><a href="https://www.bilibili.com/">😍联系作者</a></el-col>
                  <el-col :span="8"><a href="https://www.zhaopin.com/">👽免责声明</a></el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                  <el-col :span="5"></el-col>
                  <el-col :span="10"><span style="font-family: 华文行楷;">©2022 cabbage出品|2022/10/20</span></el-col>
                  <el-col :span="8"></el-col>
                </el-row>
              </div>

          </div>
        </el-card>
      </div>
    </el-main>
<!--    <el-aside width="500px">-->

<!--    </el-aside>-->
  </el-container>
</div>




</template>

<script setup>
import {ref} from 'vue'
import myAxios from "../../../plugins/myAxios.js";
import {useRouter} from "vue-router";
// import {ElMessage} from "element-plus";


const router=useRouter()

const userAccount = ref('')
const userPassword = ref('')

const userLogin =async () => {
  const res=await myAxios.post("/user/login",{
    "userAccount":userAccount.value,
    "userPassword":userPassword.value
  })
  console.log(res.data)
  //Loading加载组件
  // const loading = ElLoading.service({
  //   lock: true,
  //   text: '稍等一下，马上就好...',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // })
  setTimeout(() => {
    if(res.code===0){
      localStorage.setItem('uid',res.data.userName)
      ElNotification({
        title: '登录成功!',
        message: '欢迎进入系统首页',
        type: 'success',
        position: 'bottom-right',
      })
      if(res.data.userRole===0){
         router.replace("/studentHomePage")
      }else if(res.data.userRole===1){
         router.replace("/teaInternshipPlan")
      }
      else if(res.data.userRole===2){
         router.replace("/entTeacherHomePage")
      }
      else if(res.data.userRole===3){
        router.replace("/studentBasicInfo")
      }
    }else{
      ElMessage.error('账号或密码错误')
    }
    // loading.close()
  }, 1000)

}


</script>

<style scoped>

.el-header{
  padding: 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*background-color: red;*/
  padding: 10px;


}

.box-card {
  width: 500px;
  /*边框渐变*/
  border-radius:10px;
  position: fixed;
  top: 0;
  right: 0;
  /*margin-top: 2px;*/
  background-color: oldlace;
  /*opacity: 0.7;*/
  height: 100vh;
  /*gainsboro*/
  /*darkcyan*/
}
/*登录按钮*/
.log_btn {
  margin-top: 30px;
  margin-left: 200px;
  position: relative;
}
/*导航栏样式*/
.el-menu-demo {
  background-color: #99a9bf;
  /*背景透明度*/
  /*边框渐变*/
  /*border-radius: 20px;*/
}
img{
  width: 30px;
  height: 30px;
}
#login{
  background-image: url("../../../assets/avatar/官图.jpg");
  /*background-color: gainsboro;*/
  background-repeat: no-repeat;
  background-position: center 0;
  background-attachment:fixed;
  background-size: 100% 100%;
  /*opacity: 0.7;*/
  width: 100%;
  height: 100vh;
}


</style>

<style lang="scss">
.el-textarea__inner,.el-input__inner {
  background: transparent !important;
}

</style>