<template>
<!--实习信息页-->
  <el-container>
    <!--主体-->
    <el-main>
      <el-card style="margin-top: 30px">
        <el-container>
          <el-aside width="200px">
            <div style="text-align: center;margin-top: 40px">
              <el-avatar :size="100" src="src/assets/avatar/student.jpeg"/>
              <h2>实习信息记录</h2>
            </div>
          </el-aside>
          <el-main>
            <div class="demo-collapse">
              <el-collapse v-model="activeName" accordion v-for="(item,index) in allInternshipInfo" :key="index">
                <el-collapse-item  :title="'你的第'+(index+1)+'次实习信息'">
                  <el-descriptions :title="'昵称：'+loginInfo.userName">
                    <el-descriptions-item label="实习地址：">{{ item.address }}</el-descriptions-item>
                    <el-descriptions-item label="企业名称：">{{ item.entName }}</el-descriptions-item>
                    <el-descriptions-item label="责任人：">{{ item.leader }}</el-descriptions-item>
                    <el-descriptions-item label="实习岗位：">{{ item.post }}</el-descriptions-item>
                    <el-descriptions-item label="实习状态：">{{ item.state }}</el-descriptions-item>
                    <el-descriptions-item label="开始时间：">{{ item.createTime }}</el-descriptions-item>
                    <el-descriptions-item label="结束时间：">{{ item.updateTime }}</el-descriptions-item>
                  </el-descriptions>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-main>
        </el-container>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col :span="4">
                <span style="font-weight: bolder">实习信息</span>
              </el-col>
              <el-col :span="10">

              </el-col>
              <el-col :span="10" :push="8">
                <el-button class="button" type="primary" @click="details()">更新实习信息</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-row :gutter="20" align="bottom">
          <el-col :span="3">实习地址</el-col>
          <el-col :span="4">{{ internshipInfo.address }}</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">实习企业名称</el-col>
          <el-col :span="4">{{ internshipInfo.entName }}</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">责任人</el-col>
          <el-col :span="5">{{ internshipInfo.leader }}</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">实习岗位</el-col>
          <el-col :span="5">{{ internshipInfo.post }}</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">学号</el-col>
          <el-col :span="6">{{ internshipInfo.stuId }}</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">实习状态</el-col>
          <el-col :span="5">{{ internshipInfo.state }}</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">开始时间</el-col>
          <el-col :span="5">{{ internshipInfo.createTime }}</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">结束时间</el-col>
          <el-col :span="5">~~~~~~~~~~</el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>

  <!--  点击弹出详情页-->
  <el-dialog
      v-model="centerDialogVisible"
      title="更新实习信息"
      width="40vw"
      align-center
      style="border-radius: 10px;"
      draggable
      center
  >
    <el-form :model="formDate" :rules="rules" ref="ruleAddFormRef" style="margin-right: 70px">
      <el-form-item label="实习地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="formDate.address" clearable placeholder="请输入实习地址"/>
      </el-form-item>
      <el-form-item label="实习企业名称" :label-width="formLabelWidth" prop="entName">
        <el-input v-model="formDate.entName" clearable placeholder="请输入实习企业名称"/>
      </el-form-item>
      <el-form-item label="负责人" :label-width="formLabelWidth" prop="leader">
        <el-input v-model="formDate.leader" clearable placeholder="请输入负责人"/>
      </el-form-item>
      <el-form-item label="实习岗位" :label-width="formLabelWidth" prop="post">
        <el-input v-model="formDate.post" clearable placeholder="请输入实习岗位"/>
      </el-form-item>
      <el-form-item label="实习状态" :label-width="formLabelWidth" prop="state">
        <el-input v-model="formDate.state" clearable placeholder="请输入实习状态"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submitForm()">
          更新
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script setup>
import {onMounted, ref, reactive} from "vue";
import myAxios from "../../../plugins/myAxios.js";
const activeName = ref('1')
//表单数据
const formDate=ref({
  address:'',
  entName:'',
  leader:'',
  post:'',
  stuId:'',
  state:'',
})
//表单宽度
const formLabelWidth='100px'

//是否弹出
const centerDialogVisible = ref(false)
//弹出详情信息页
const details=()=>{
  centerDialogVisible.value=true;
}
//详情信息页提交按钮
const submitForm=async()=>{
  centerDialogVisible.value=false;
  console.log(formDate.value.state)
  const res=await myAxios.post('/student/updateInternshipInfo',{
    address:formDate.value.address,
    entName:formDate.value.entName,
    leader:formDate.value.leader,
    post:formDate.value.post,
    stuId:formDate.value.stuId,
    state:formDate.value.state=='未实习'?0:1,
  })
  console.log(res.data)
  if(res.code===0){
    ElMessage({
      message: '更新成功',
      type: 'success',
      center:true,
      offset:100,
    })
  }
  //回调获取实习信息接口
  await getInternshipInfo()
  //获取当前学生全部实习信息
  await getAllInternshipInfo()
}
//取消事件
const cancel=()=>{
  centerDialogVisible.value = false;
  getInternshipInfo();
}
//存放登录用户信息数据
const loginInfo=ref({
  id:'',
  userName:'',
  userAccount:'',
  avatarUrl:'',
  gender:'',
  phone:'',
  email:'',
});
//存放学生实习信息数据
const internshipInfo=ref({
  id:'',
  address:'',
  entName:'',
  leader:'',
  post:'',
  stuId:'',
  state:'',
  createTime:'',
  updateTime:'',
});
//存储学生全部实习信息数据
const allInternshipInfo=ref({
  address:'',
  entName:'',
  leader:'',
  post:'',
  state:'',
  createTime:'',
  updateTime:'',
})
// 获取当前登录用户信息
const getLoginInfo=async()=>{
  const res=await myAxios.get("/user/personalInfo")
  loginInfo.value=res.data;
  transNum();
  // console.log(res.data)
}
// 获取当前学生实习信息
const getInternshipInfo=async()=>{
  const res=await myAxios.get("/student/internshipInfo")
  internshipInfo.value=res.data;
  transNum();
  console.log(res.data)
}
// 获取当前学生全部实习信息
const getAllInternshipInfo=async ()=>{
  const res=await myAxios.get("/student/allInternshipInfo")
  allInternshipInfo.value=res.data
  for (let i = 0; i < allInternshipInfo.value.length; i++) {
    if(allInternshipInfo.value[i].state==0){
      allInternshipInfo.value[i].state='未实习';
    }else if(allInternshipInfo.value[i].state==1){
      allInternshipInfo.value[i].state='实习中';
    }
  }
  console.log(res.data)
}

//转换数字
const transNum=()=>{
  if(loginInfo.value.gender==0){
    loginInfo.value.gender='男';
  }else if(loginInfo.value.gender==1){
    loginInfo.value.gender='女';
  }
  if(internshipInfo.value.state==0){
    internshipInfo.value.state='未实习';
  }else if(internshipInfo.value.state==1){
    internshipInfo.value.state='实习中';
  }
}

onMounted(()=>{
 // 获取当前登录用户信息
  getLoginInfo()
  // 获取当前学生实习信息
  getInternshipInfo()
  // 获取当前学生全部实习信息
  getAllInternshipInfo()
  // 转换数字
  transNum()
})
</script>

<style scoped>
.box-card{
  margin-top: 20px;
  /*height: 77vh;*/
}
.card-header{
  /*height: 20px;*/
}
.el-row{
  margin-top: 20px;
  font-family: 方正姚体;
}
</style>