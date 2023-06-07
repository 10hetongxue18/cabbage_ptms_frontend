<template>
    <div class="mainBox">
      <el-container>
        <el-main>
          <!-- 实习实习数据卡片 -->
          <el-card class="big-card">
            <template #header >
              <div>
                <el-row>
                  <el-col :span="5">
                    <div>
                      <el-image :src="entPicture" fit="fill" style="width: 100%;height: 100%"/>
                    </div>
                  </el-col>
                  <el-col :span="6" :push="1">
                    <el-descriptions title=""  column="1">
                      <el-descriptions-item label="企业ID:">{{ entTeacherInfo.entId  }}</el-descriptions-item>
                      <el-descriptions-item label="企业名称:">{{ entTeacherInfo.entName }}</el-descriptions-item>
                      <el-descriptions-item label="企业工号:">{{ entTeacherInfo.entLoginId }}</el-descriptions-item>
                      <el-descriptions-item label="姓名:">{{ entTeacherInfo.name }}</el-descriptions-item>
                      <el-descriptions-item label="性别:">{{ entTeacherInfo.gender }}</el-descriptions-item>
                      <el-descriptions-item label="所属部门:">{{ entTeacherInfo.department  }}</el-descriptions-item>
                      <el-descriptions-item label="联系电话:">{{ entTeacherInfo.phone }}</el-descriptions-item>
                      <el-descriptions-item label="邮箱:">{{ entTeacherInfo.email  }}</el-descriptions-item>
                    </el-descriptions>
                  </el-col>
                </el-row>
              </div>
            </template>
            <div style="text-align: right">
              <span style="color: #747bff;font-family: 华文行楷;font-size: 30px;text-align: center">实习数据</span>
            </div>
            <el-table :data="tableData" height="270" stripe style="width: 100%;margin-top: 5vh">
              <el-table-column prop="name" label="姓名"  align="center" width="100px"/>
              <el-table-column prop="gender" label="性别"  align="center" width="100px"/>
              <el-table-column prop="faculty" label="院系"  align="center" />
              <el-table-column prop="major" label="专业"  align="center" />
              <el-table-column prop="classes" label="班级"  align="center" />
              <el-table-column prop="postName" label="岗位名称"  align="center" />
              <el-table-column prop="address" label="实习地址"  align="center" />
              <el-table-column fixed="right" prop="state" label="实习状态"  align="center" />
            </el-table>
          </el-card>
        </el-main>
      </el-container>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../../../plugins/myAxios.js";
import {useRouter} from "vue-router";
const router=useRouter()

/*企业logo*/
const entPicture=ref('')
/*实习数据*/
const tableData =ref([])
/*获取通过实习申请的请求*/
const getPostApplication=async ()=>{
  const res=await myAxios.get('teacher/getPostApplication',{
    params:{
      state:3
    }
  })
  console.log(res.data)
  tableData.value=res.data
  entPicture.value=tableData.value[0].picture
  transNum()
}
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


/*获取当前登录企业老师信息*/
const getEntTeacherInfo=async()=>{
  const res=await myAxios.get("/teacher/entTeacherInfo")
  entTeacherInfo.value=res.data;
  console.log(res.data)
  if(entTeacherInfo.value.gender==0){
    entTeacherInfo.value.gender='男'
  }else if(entTeacherInfo.value.gender==1){
    entTeacherInfo.value.gender='女'
  }
}
//转换数字
const transNum=()=>{
  for (const tableDataKey in tableData.value) {
    if(tableData.value[tableDataKey].gender==0){
      tableData.value[tableDataKey].gender='男'
    }else if(tableData.value[tableDataKey].gender==1){
      tableData.value[tableDataKey].gender='女'
    }
    if(tableData.value[tableDataKey].state==2){
      tableData.value[tableDataKey].state='未通过';
    }else if(tableData.value[tableDataKey].state==3){
      tableData.value[tableDataKey].state='实习中';
    }
  }
}


//页面刷新获取新闻信息
onMounted(()=>{
  /*获取通过实习申请的请求*/
  getPostApplication()
  /*获取当前登录企业老师信息*/
  getEntTeacherInfo()
})





</script>

<style scoped>

/*大卡片*/
.big-card{
  margin-top: 30px;
  /*padding: 30px;*/
  border-radius: 10px;
  opacity: 0.8;
  height: 80vh;
}
/*卡片样式*/
.box-card {
  margin-top: 30px;
  /*背景透明度*/
  opacity: 0.8;
  padding: 20px;
  /*padding: 1rem;*/
  border-radius: 10px;

}

/*主体盒子*/
.mainBox {
  padding: 20px;
  /*margin-left: 200px;*/
}


</style>

