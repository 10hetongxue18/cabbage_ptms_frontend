<template>
<!--个人信息页-->
  <div>
    <el-container >
      <!--主体-->
      <el-main>
        <el-card style="height: 140px;margin-top: 10px">
          <el-avatar :size="100" src="src/assets/avatar/teacher.png"/>
          <!--          <h3 style="margin-left: 23px">{{ loginInfo.userName }}</h3>-->
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <el-row>
                <el-col :span="4">
                  <span>个人信息</span>
                </el-col>
                <el-col :span="10">

                </el-col>
                <el-col :span="10" :push="8">
                  <el-button class="button" type="primary" @click="details()">编辑信息</el-button>
                </el-col>
              </el-row>
            </div>
          </template>
          <el-row :gutter="20" align="bottom">
            <el-col :span="3">姓名</el-col>
            <el-col :span="4">{{ schTeacherInfo.name }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">性别</el-col>
            <el-col :span="4">{{ schTeacherInfo.gender }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">联系电话</el-col>
            <el-col :span="5">{{ schTeacherInfo.phone }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">邮箱</el-col>
            <el-col :span="6">{{ schTeacherInfo.email }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">工号</el-col>
            <el-col :span="5">{{ schTeacherInfo.workId }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">学校</el-col>
            <el-col :span="6">{{ schTeacherInfo.school }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">院系</el-col>
            <el-col :span="5">{{ schTeacherInfo.faculty }}</el-col>
          </el-row>
<!--          <el-row :gutter="20" >-->
<!--            <el-col :span="3">系部Id</el-col>-->
<!--            <el-col :span="5">{{ schTeacherInfo.depId }}</el-col>-->
<!--          </el-row>-->
<!--          <el-row :gutter="20" >-->
<!--            <el-col :span="3">专业Id</el-col>-->
<!--            <el-col :span="5">{{ schTeacherInfo.proId }}</el-col>-->
<!--          </el-row>-->
        </el-card>
      </el-main>

    </el-container>
  </div>



  <!--  点击弹出详情页-->
  <el-dialog
      v-model="centerDialogVisible"
      title="个人信息更新"
      width="60%"
      align-center
      style="border-radius: 10px;"
      draggable
      center
  >
    <el-form :model="formDate" :rules="rules" ref="ruleAddFormRef" style="margin-right: 70px">
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="formDate.name" clearable placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
        <el-input v-model="formDate.gender" clearable placeholder="请输入性别"/>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="formDate.phone" clearable placeholder="请输入联系电话"/>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="formDate.email" clearable placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item label="工号" :label-width="formLabelWidth" prop="workId">
        <el-input v-model="formDate.workId" clearable placeholder="请输入工号"/>
      </el-form-item>
      <el-form-item label="学校" :label-width="formLabelWidth" prop="school">
        <el-input v-model="formDate.school" clearable placeholder="请输入学校"/>
      </el-form-item>
      <el-form-item label="院系" :label-width="formLabelWidth" prop="faculty">
        <el-input v-model="formDate.faculty" clearable placeholder="请输入院系"/>
      </el-form-item>
      <el-form-item label="系部Id" :label-width="formLabelWidth" prop="depId">
        <el-input v-model="formDate.depId" clearable placeholder="请输入系部Id"/>
      </el-form-item>
      <el-form-item label="专业Id" :label-width="formLabelWidth" prop="proId">
        <el-input v-model="formDate.proId" clearable placeholder="请输入专业Id"/>
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

  <!--region-->



  <!--endregion-->
</template>

<script setup>


import {onMounted, ref, reactive} from "vue";
import myAxios from "../../../plugins/myAxios.js";
import {useRoute, useRouter} from "vue-router";

const router=useRouter();
const route=useRoute();
//表单数据
const formDate=ref({
  id:'',
  name:'',
  gender:'',
  phone:'',
  email:'',
  workId:'',
  school:'',
  faculty:'',
  depId:'',
  proId:'',
})
//表单宽度
const formLabelWidth='100px'

//性别级联选择器
const options=[
  {
  value:'0',
  label:'男',
  },
  {
    value:'1',
    label:'女',
  },
]


//验证规则
const rules=reactive({
  name:[
    {required:true,message:'请输入姓名',trigger:'blur'},
    {min:2,max:10,message:'姓名长度在2 to 10',trigger:'blur'},
  ],

})

//是否弹出
const centerDialogVisible = ref(false)
//弹出详情信息页
const details=()=>{
  centerDialogVisible.value=true;
  formDate.value=schTeacherInfo.value;
  console.log(formDate.value)
}

//详情信息页提交按钮
const submitForm=async()=>{
  centerDialogVisible.value=false;
  const res=await myAxios.post('/teacher/updateSchTeacherInfo',{
    id:formDate.value.id,
    name:formDate.value.name,
    gender:formDate.value.gender=='男'?0:1,
    phone:formDate.value.phone,
    email:formDate.value.email,
    workId:formDate.value.workId,
    school:formDate.value.school,
    faculty:formDate.value.faculty,
    depId:formDate.value.depId,
    proId:formDate.value.proId,
  })
  console.log(res.data)
  if(res.code===0){
    ElMessage({
      message: '更新成功',
      type: 'success',
      center:true,
      offset:50,
    })
  }
  //回调获取学生信息接口
  await getSchTeacherInfo()
}
//取消事件
const cancel=()=>{
  centerDialogVisible.value = false;
  getSchTeacherInfo()
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

//存放校内老师信息数据
const schTeacherInfo=ref({
  id:'',
  name:'',
  gender:'',
  phone:'',
  email:'',
  workId:'',
  school:'',
  faculty:'',
  depId:'',
  proId:'',
});

const getLoginInfo=async()=>{
  const res=await myAxios.get("/user/personalInfo")
  loginInfo.value=res.data;
  transNum();
  // console.log(res.data)
}
const getSchTeacherInfo=async()=>{
  const res=await myAxios.get("/teacher/schTeacherInfo")
  schTeacherInfo.value=res.data;
  transNum();
  // console.log(res.data)
}
//转换数字
const transNum=()=>{
  if(loginInfo.value.gender==0){
    loginInfo.value.gender='男';
  }else if(loginInfo.value.gender==1){
    loginInfo.value.gender='女';
  }
  if(schTeacherInfo.value.gender==0){
    schTeacherInfo.value.gender='男';
  }else if(schTeacherInfo.value.gender==1){
    schTeacherInfo.value.gender='女';
  }
}

onMounted(()=>{
 // 获取当前登录用户信息
  getLoginInfo()
  // 获取当前校内老师信息
  getSchTeacherInfo()
  // 转换数字
  transNum()
})
</script>

<style scoped>

.box-card{
  margin-top: 20px;
  height: 550px;
}
.card-header{
  /*height: 20px;*/
}
.el-row{
  margin-top: 20px;
  font-family: 方正姚体;
}


</style>