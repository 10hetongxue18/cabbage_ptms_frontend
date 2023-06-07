<template>
<!--个人信息页-->
  <div>
    <el-container >
      <!--主体-->
      <el-main>
        <el-card style="height: 140px;margin-top: 30px">
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
          <el-row :gutter="20" >
            <el-col :span="3">企业ID</el-col>
            <el-col :span="7">{{ entTeacherInfo.entId }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">企业名称</el-col>
            <el-col :span="7">{{ entTeacherInfo.entName }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">企业工号</el-col>
            <el-col :span="7">{{ entTeacherInfo.entLoginId }}</el-col>
          </el-row>
          <el-row :gutter="20" align="bottom">
            <el-col :span="3">姓名</el-col>
            <el-col :span="4">{{ entTeacherInfo.name }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">性别</el-col>
            <el-col :span="4">{{ entTeacherInfo.gender }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">所属部门</el-col>
            <el-col :span="6">{{ entTeacherInfo.department }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">联系电话</el-col>
            <el-col :span="5">{{ entTeacherInfo.phone }}</el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="3">邮箱</el-col>
            <el-col :span="6">{{ entTeacherInfo.email }}</el-col>
          </el-row>
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
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="entName">
        <el-input v-model="formDate.entName" clearable placeholder="请输入企业名称"/>
      </el-form-item>
      <el-form-item label="企业工号" :label-width="formLabelWidth" prop="entLoginId">
        <el-input v-model="formDate.entLoginId" clearable placeholder="请输入工号"/>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="formDate.name" clearable placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
        <el-input v-model="formDate.gender" clearable placeholder="请输入性别"/>
      </el-form-item>
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="department">
        <el-input v-model="formDate.department" clearable placeholder="请输入部门名称"/>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="formDate.phone" clearable placeholder="请输入联系电话"/>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="formDate.email" clearable placeholder="请输入邮箱"/>
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
  entId:'',
  entName:'',
  entLoginId:'',
  name:'',
  gender:'',
  department:'',
  phone:'',
  email:'',
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
  formDate.value=entTeacherInfo.value;
  console.log(formDate.value)
}

//详情信息页提交按钮
const submitForm=async()=>{
  centerDialogVisible.value=false;
  const res=await myAxios.post('/teacher/updateEntTeacherInfo',{
    id:formDate.value.id,
    entName:formDate.value.entName,
    entLoginId:formDate.value.entLoginId,
    name:formDate.value.name,
    gender:formDate.value.gender=='男'?0:1,
    department:formDate.value.department,
    phone:formDate.value.phone,
    email:formDate.value.email,
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
  //回调获取企业老师信息接口
  await getEntTeacherInfo()
}
//取消事件
const cancel=()=>{
  centerDialogVisible.value = false;
  getEntTeacherInfo()
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

//存放企业老师信息数据
const entTeacherInfo=ref({
  id:'',
  entId:'',
  entName:'',
  entLoginId:'',
  name:'',
  gender:'',
  department:'',
  phone:'',
  email:'',
});

const getLoginInfo=async()=>{
  const res=await myAxios.get("/user/personalInfo")
  loginInfo.value=res.data;
  transNum();
  // console.log(res.data)
}
const getEntTeacherInfo=async()=>{
  const res=await myAxios.get("/teacher/entTeacherInfo")
  entTeacherInfo.value=res.data;
  transNum();
  console.log(res.data)
}
//转换数字
const transNum=()=>{
  if(loginInfo.value.gender==0){
    loginInfo.value.gender='男';
  }else if(loginInfo.value.gender==1){
    loginInfo.value.gender='女';
  }
  if(entTeacherInfo.value.gender==0){
    entTeacherInfo.value.gender='男';
  }else if(entTeacherInfo.value.gender==1){
    entTeacherInfo.value.gender='女';
  }
}

onMounted(()=>{
 // 获取当前登录用户信息
  getLoginInfo()
  // 获取当前企业老师信息
  getEntTeacherInfo()
  // 转换数字
  // transNum()
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