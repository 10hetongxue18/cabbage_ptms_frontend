<template>
<!--个人信息页-->
  <div>
    <el-container >
      <!--主体-->
      <el-main>
        <el-card style="margin-top: 30px;padding: 0px">
          <el-container>
            <el-aside width="200px">
              <div style="text-align: center;">
                <el-avatar :size="100" src="src/assets/avatar/student.jpeg"/>
                <h4 style="margin: 0px">{{ studentInfo.name }}</h4>
              </div>
            </el-aside>
            <el-main>

            </el-main>
          </el-container>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <el-row>
                <el-col :span="4">
                  <span style="font-weight: bolder">个人信息</span>
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
            <el-col :span="4">{{ studentInfo.name }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">性别</el-col>
            <el-col :span="4">{{ studentInfo.gender }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">出生年月</el-col>
            <el-col :span="5">{{ studentInfo.dateBirth }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">联系电话</el-col>
            <el-col :span="5">{{ studentInfo.phone }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">邮箱</el-col>
            <el-col :span="6">{{ studentInfo.email }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">学号</el-col>
            <el-col :span="5">{{ studentInfo.stuId }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">学校</el-col>
            <el-col :span="6">{{ studentInfo.school }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">院系</el-col>
            <el-col :span="5">{{ studentInfo.faculty }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">专业</el-col>
            <el-col :span="5">{{ studentInfo.major }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">年级</el-col>
            <el-col :span="5">{{ studentInfo.grade }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">班级</el-col>
            <el-col :span="5">{{ studentInfo.classes }}</el-col>
          </el-row>
        </el-card>
      </el-main>

    </el-container>
  </div>



  <!--  点击弹出详情页-->
  <el-dialog
      v-model="centerDialogVisible"
      title="个人信息更新"
      width="40vw"
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
<!--        <el-cascader v-model="formDate.gender" :options="options" />-->
      </el-form-item>
      <el-form-item label="出生年月" :label-width="formLabelWidth" prop="dateBirth">
        <el-date-picker
            v-model="formDate.dateBirth"
            type="date"
            placeholder="请选择日期"
            size="default"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="formDate.phone" clearable placeholder="请输入联系电话"/>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="formDate.email" clearable placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item label="学号" :label-width="formLabelWidth" prop="stuId">
        <el-input v-model="formDate.stuId" clearable placeholder="请输入学号"/>
      </el-form-item>
      <el-form-item label="学校" :label-width="formLabelWidth" prop="school">
        <el-input v-model="formDate.school" clearable placeholder="请输入学校"/>
      </el-form-item>
      <el-form-item label="院系" :label-width="formLabelWidth" prop="faculty">
        <el-input v-model="formDate.faculty" clearable placeholder="请输入院系"/>
      </el-form-item>
      <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
        <el-input v-model="formDate.major" clearable placeholder="请输入专业"/>
      </el-form-item>
      <el-form-item label="年级" :label-width="formLabelWidth" prop="grade">
        <el-input v-model="formDate.grade" clearable placeholder="请输入年级"/>
      </el-form-item>
      <el-form-item label="班级" :label-width="formLabelWidth" prop="classes">
        <el-input v-model="formDate.classes" clearable placeholder="请输入班级"/>
      </el-form-item>
    </el-form>

<!--region-->



<!--endregion-->


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
import {useRoute, useRouter} from "vue-router";
// import {ElMessage} from "element-plus";
import UploadProps  from 'element-plus'
const router=useRouter();
const route=useRoute();
//表单数据
const formDate=ref({
  id:'',
  name:'',
  gender:'',
  dateBirth:'',
  phone:'',
  email:'',
  stuId:'',
  school:'',
  faculty:'',
  major:'',
  grade:'',
  classes:'',
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
  formDate.value=studentInfo.value;
  console.log(formDate.value)
}

//详情信息页提交按钮
const submitForm=async()=>{
  centerDialogVisible.value=false;
  console.log(formDate.value.gender)
  const res=await myAxios.post('/student/updateStudentInfo',{
    id:formDate.value.id,
    name:formDate.value.name,
    gender:formDate.value.gender=='男'?0:1,
    dateBirth:formDate.value.dateBirth,
    phone:formDate.value.phone,
    email:formDate.value.email,
    stuId:formDate.value.stuId,
    school:formDate.value.school,
    faculty:formDate.value.faculty,
    major:formDate.value.major,
    grade:formDate.value.grade,
    classes:formDate.value.classes,
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
  await getStudentInfo()
}
//取消事件
const cancel=()=>{
  centerDialogVisible.value = false;
  getStudentInfo()
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
//存放学生信息数据
const studentInfo=ref({
  id:'',
  name:'',
  gender:'',
  dateBirth:'',
  phone:'',
  email:'',
  stuId:'',
  school:'',
  faculty:'',
  major:'',
  grade:'',
  classes:'',
});

const getLoginInfo=async()=>{
  const res=await myAxios.get("/user/personalInfo")
  loginInfo.value=res.data;
  transNum();
  // console.log(res.data)
}
const getStudentInfo=async()=>{
  const res=await myAxios.get("/student/studentInfo")
  studentInfo.value=res.data;
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
  if(studentInfo.value.gender==0){
    studentInfo.value.gender='男';
  }else if(studentInfo.value.gender==1){
    studentInfo.value.gender='女';
  }
}

onMounted(()=>{
 // 获取当前登录用户信息
  getLoginInfo()
  // 获取当前学生信息
  getStudentInfo()
  // 转换数字
  transNum()
})
</script>

<style scoped>

.box-card{
  margin-top: 20px;
  /*height: 60vh;*/
}
.card-header{
  /*height: 20px;*/
}
.el-row{
  margin-top: 20px;
  font-family: 方正姚体;
}
/*.el-menu{*/
/*  border-right: none;*/
/*  !*background-color: var(--el-color-primary-light-7);*!*/
/*  !*font-family: 华文行楷;*!*/
/*  min-height: 91.3vh;*/
/*  !*margin-top: 50px;*!*/
/*}*/
/*!*侧边栏*!*/
/*.el-aside{*/
/*  !*border: #99a9bf 1px solid;*!*/
/*  height: 100%;*/
/*  margin-top: -60px;*/
/*  !*position: relative;*!*/
/*}*/

</style>