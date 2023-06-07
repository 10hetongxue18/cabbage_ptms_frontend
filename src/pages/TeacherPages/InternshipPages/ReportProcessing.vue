<template>
  <div id="report_Processing">
    <el-card class="main_card">
      <el-container>
        <el-main>
          <div id="box">
            <table style="width: 50%;border: 1px solid black;">
              <thead>
              <tr>
                <th colspan="8" id="title">实习报告鉴定意见</th>
              </tr>
              </thead>
              <tbody>
              <tr style="height:40px">
                <td>等级</td>
                <td>优秀</td>
                <td>良好</td>
                <td>中等</td>
                <td>及格</td>
                <td>不及格</td>
              </tr>
                <tr style="height:40px">
                  <td>实习记录</td>
                  <td><el-radio v-model="radioGroupOne" label="1" size="large">A</el-radio></td>
                  <td><el-radio v-model="radioGroupOne" label="2" size="large">B</el-radio></td>
                  <td><el-radio v-model="radioGroupOne" label="3" size="large">C</el-radio></td>
                  <td><el-radio v-model="radioGroupOne" label="4" size="large">D</el-radio></td>
                  <td><el-radio v-model="radioGroupOne" label="5" size="large">E</el-radio></td>
                </tr>
              <tr style="height:40px">
                <td>实习报告</td>
                <td><el-radio v-model="radioGroupTwo" label="1" size="large">A</el-radio></td>
                <td><el-radio v-model="radioGroupTwo" label="2" size="large">B</el-radio></td>
                <td><el-radio v-model="radioGroupTwo" label="3" size="large">C</el-radio></td>
                <td><el-radio v-model="radioGroupTwo" label="4" size="large">D</el-radio></td>
                <td><el-radio v-model="radioGroupTwo" label="5" size="large">E</el-radio></td>
              </tr>
              <tr style="height:40px">
                <td>综合评价</td>
                <td><el-radio v-model="radioGroupThree" label="1" size="large">A</el-radio></td>
                <td><el-radio v-model="radioGroupThree" label="2" size="large">B</el-radio></td>
                <td><el-radio v-model="radioGroupThree" label="3" size="large">C</el-radio></td>
                <td><el-radio v-model="radioGroupThree" label="4" size="large">D</el-radio></td>
                <td><el-radio v-model="radioGroupThree" label="5" size="large">E</el-radio></td>
              </tr>
              </tbody>
            </table>
          </div>
          <el-divider border-style="dashed" />
              <div>
                <span style="font-weight: bolder;">顶岗实习综合成绩：（请输入）&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp</span>
                <el-input-number
                    v-model="resultNum"
                    class="mx-4"
                    :min="1"
                    :max="100"
                    controls-position="right"
                    @change="handleChange"
                />
              </div>
          <div style="margin-top: 20px;">
            <el-button type="primary" @click="submit()">提交</el-button>
          </div>
        </el-main>
        <el-aside widtd="200px">
          <el-descriptions title="学生信息" column="2">
            <el-descriptions-item label="姓名：">{{ stuInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="学号：">{{ stuInfo.stuId }}</el-descriptions-item>
            <el-descriptions-item label="性别：">{{ stuInfo.gender }}</el-descriptions-item>
            <el-descriptions-item label="学院：">{{ stuInfo.faculty }}</el-descriptions-item>
            <el-descriptions-item label="年级：">{{ stuInfo.grade }}</el-descriptions-item>
            <el-descriptions-item label="专业：">{{ stuInfo.major }}</el-descriptions-item>
            <el-descriptions-item label="班级：">{{ stuInfo.classes }}</el-descriptions-item>
          </el-descriptions>
        </el-aside>
      </el-container>
    </el-card>

  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../../plugins/myAxios.js";
import {ElNotification} from "element-plus";
const router=useRouter()
const route=useRoute()

/*路由接收实习报告名称*/
const reportName=ref(route.query)
/*单选按钮组1*/
const radioGroupOne =ref('0')
/*单选按钮组2*/
const radioGroupTwo =ref('0')
/*单选按钮组3*/
const radioGroupThree =ref('0')
/*数字输入框*/
const resultNum = ref(0)
const handleChange = (value) => {
  console.log(value)
}
/*学生信息集合*/
const stuInfo=ref({
  name:'',
  gender:'',
  stuId:'',
  faculty:'',
  major:'',
  grade:'',
  classes:'',
})
/*根据实习报告名称查询学生的相关信息*/
const getStuInfo=async ()=>{
  const res=await myAxios.get("/teacher/getStuInfo",{
    params:reportName.value
  })
  console.log(res.data)
  // console.log(reportName.value.reportName)
  stuInfo.value=res.data
  if(stuInfo.value.gender==0){
    stuInfo.value.gender='男'
  }else if(stuInfo.value.gender==1){
    stuInfo.value.gender='女'
  }
}

/*实习鉴定意见与成绩提交按钮*/
const submit=async ()=>{
  const res=await myAxios.post("/teacher/addTotalScore",{
    stuId:stuInfo.value.stuId,
    record:radioGroupOne.value,
    report:radioGroupTwo.value,
    evaluate:radioGroupThree.value,
    resultNum:resultNum.value,
  })
  // console.log(res.data)
  if(res.data==true){
    ElNotification({
      title: reportName.value.reportName,
      message: '评分成功！',
      type: 'success',
      position: 'bottom-right',
    })
    await router.push("/teaInternshipReport")
  }

}


onBeforeMount(()=>{
  /*根据实习报告名称查询学生的相关信息*/
  getStuInfo()
})

</script>

<style scoped>
#report_Processing{

}
.main_card{
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
/*表格样式*/
#box #title{
  padding-top:30px!important;
  padding-bottom: 30px!important;
}
#box{
  /*widtd: 300px;*/
  /*margin: auto;*/
  /*border: 2px solid black;*/
  /*padding-bottom: 30px!important;*/
}
#box table{
  border-collapse:collapse;
}
#box table thead td{
  font-size: 20px;
  padding:10px;
}
#box table tbody tr{
  height:30px;
  font-size:14px;
}
#box table tbody td{
  widtd:25%;
  border: 1px solid black;
  text-align: center!important;
}




</style>