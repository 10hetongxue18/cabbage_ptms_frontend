<template>
  <!--实习文档页面-->
  <div>

    <el-container>
      <el-main>

        <el-card style="height: 80vh;margin-top: 30px">
          <template #header>
            <div style="text-align: center">
              <span style="font-family: 华文行楷;font-size: 25px">实习岗位申请详情</span>
            </div>
          </template>
          <el-table :data="applicationInfo" height="66vh" stripe style="width: 100%">
            <el-table-column fixed prop="name" label="申请人"  align="center" width="100px"/>
            <el-table-column prop="gender" label="性别"  align="center" width="100px"/>
            <el-table-column prop="faculty" label="院系"  align="center" />
            <el-table-column prop="major" label="专业"  align="center" />
            <el-table-column prop="classes" label="班级"  align="center" />
            <el-table-column prop="postName" label="岗位名称"  align="center" />
            <el-table-column prop="message" label="详细信息"  align="center" />
            <el-table-column prop="address" label="实习地址"  align="center" />
            <el-table-column prop="state" label="申请状态"  align="center" />
            <el-table-column prop="operate" label="操作" align="center" >
              <template #default="scope">
                <el-button text type="primary" icon="Pointer" @click="dialog(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>

    <el-dialog v-model="dialogTableVisible" title="实习申请" align-center width="30%">
      <el-descriptions title=""  column="2">
        <el-descriptions-item label="申请人:">{{ dialogData.name  }}</el-descriptions-item>
        <el-descriptions-item align="right" label="院系:">{{ dialogData.faculty }}</el-descriptions-item>
        <el-descriptions-item label="专业:">{{ dialogData.major }}</el-descriptions-item>
        <el-descriptions-item align="right" label="申请岗位:">{{ dialogData.postName }}</el-descriptions-item>
        <el-descriptions-item  :width="100" label="实习地址:">{{ dialogData.address }}</el-descriptions-item>
<!--        <el-descriptions-item label="自我简介:">{{ dialogData.introduction }}</el-descriptions-item>-->
      </el-descriptions>
      <el-divider />
      <p>自我简介: {{ dialogData.introduction }}</p>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消操作</el-button>
        <el-button type="danger" @click="rejectApp()">拒绝申请</el-button>
        <el-button type="primary" @click="submit()">
          同意申请
        </el-button>
      </span>
      </template>
    </el-dialog>


  </div>

</template>

<script setup>
import { ElNotification } from 'element-plus'
import {ref, onBeforeMount} from 'vue'
import myAxios from "../../../plugins/myAxios.js";
/*dialog*/
const dialogData=ref('')
const dialogTableVisible = ref(false)
/*dialog弹出框*/
const dialog=(row)=>{
  dialogTableVisible.value=true;
  dialogData.value=row
  console.log(dialogData.value.id)
}
/*同意申请*/
const submit=async ()=>{
  const res=await myAxios.post("/teacher/yesApplication",{
    applicationId:dialogData.value.id,
    stuId:dialogData.value.stuId
  })
  console.log(res.data)
  dialogTableVisible.value = false
  if(res.code==0){
    ElNotification({
      title: dialogData.value.name,
      message: '实习申请已通过',
      type: 'success',
      position: 'bottom-right',
    })
  }
  await getPostApplication()
}
/*拒绝申请*/
const rejectApp=async ()=>{
  const res=await myAxios.post("/teacher/noApplication",{
    applicationId:dialogData.value.id,
    stuId:dialogData.value.stuId
  })
  console.log(res.data)
  dialogTableVisible.value = false
  if(res.code==0){
    ElNotification({
      title: dialogData.value.name,
      message: '实习申请未通过',
      type: 'error',
      position: 'bottom-right',
    })
  }
  await getPostApplication()
}
/*dialog取消按钮*/
const cancel=()=>{
  dialogTableVisible.value = false
}

/*存储岗位申请信息*/
const applicationInfo=ref();
/*查询已申请实习岗位申请情况*/
const getPostApplication=async ()=>{
  const res = await myAxios.get("/teacher/getPostApplication",{
    params:{
      state:1
    }
  })
  console.log(res.data)
  applicationInfo.value=res.data
  transNum()
}



  //转换数字
  const transNum=()=>{
    for (const applicationInfoKey in applicationInfo.value) {
      if(applicationInfo.value[applicationInfoKey].gender==0){
        applicationInfo.value[applicationInfoKey].gender='男'
      }else if(applicationInfo.value[applicationInfoKey].gender==1){
        applicationInfo.value[applicationInfoKey].gender='女'
      }
      if(applicationInfo.value[applicationInfoKey].state==0){
        applicationInfo.value[applicationInfoKey].state='未申请';
      }else if(applicationInfo.value[applicationInfoKey].state==1){
        applicationInfo.value[applicationInfoKey].state='已申请';
      }
    }
  }

onBeforeMount(() => {
  /*查询实习岗位申请情况*/
  getPostApplication()
})

</script>

<style scoped>

</style>