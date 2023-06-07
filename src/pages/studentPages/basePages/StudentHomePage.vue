<template>
<!-- 主页 -->
<!-- 空状态 -->
<!--  <div v-if="news==null" style="margin-top:200px">-->
<!--    <el-empty description="暂无数据" />-->
<!--  </div>-->
<!--  <div v-else>-->

    <div class="mainBox">
      <el-container>
        <el-main>
          <el-card class="big-card" v-for="o in news" :key="o">
<!--      卡片内部布局      -->
            <el-container>
              <el-main>
                <p style="padding: 0 12px;margin-top: 20px;font-weight: bolder;font-family: 华文行楷;font-size:20px;text-align: center">{{o.entName}}</p>
                <p style="padding: 0 12px;margin-top: 20px;">岗位名称：{{o.postName}}</p>
                <p style="padding: 0 12px;margin-top: 20px;">岗位详情：{{o.message}}</p>
              </el-main>
              <el-aside width="300px" style="height: 210px">

                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="点击查看详情"
                    placement="bottom"
                >
                  <el-link :underline="false" style="font-family: 华文行楷;font-size: 20px" @click="details(o)">
                    <div style="width: 300px;height: 200px;border-radius: 20px;text-align: center;">
                      <img style="width: 100%;height: 100%;" :src="o.picture"/>
<!--                      <el-image style="width: 100%;height: 100%;border-radius: 20px;" :src="o.picture"  />-->
                    </div>
                  </el-link>
                </el-tooltip>
              </el-aside>
            </el-container>
          </el-card>

        </el-main>
        <el-aside width="30%">
          <el-card style="margin-top: 50px">
            <div v-if="schTea==null">
              <p style="font-family: 华文行楷;font-size: 20px;">请选择你的实习指导老师</p>
              <el-select v-model="inputData.teacher" clearable placeholder="请选择校指导老师" size="large" style="margin-left: 10px">
                <el-option
                    v-for="item in teaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                />
              </el-select>
              <el-button type="primary" style="margin-left: 10px" @click="confirmBtn()">确认</el-button>
            </div>
            <div v-else>
              <el-descriptions title="校指导老师信息" column="2">
                <el-descriptions-item label="姓名:">{{schTea.name}}</el-descriptions-item>
                <el-descriptions-item label="专业:">{{schTea.faculty}}</el-descriptions-item>
                <el-descriptions-item label="电话:">{{schTea.phone}}</el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
          <el-card style="margin-top: 30px;height: 470px;text-align: center;">
            <template #header >
              <div>
                <span style="font-family: 华文行楷;font-size: 25px;">实习计划概览</span>
              </div>
            </template>
            <div v-if="tableData==null">
              <el-empty  description="暂无上传文件"/>
            </div>
            <div v-else>
            <el-scrollbar height="350px">
              <!--时间线-->
              <el-timeline style="padding: 20px">
                <el-timeline-item v-for="item in tableData" :key="item" :timestamp=item.createTime placement="top" @click="interPlan">
                <el-card>
                    <h4>{{ item.fileName }}</h4>
                    <p>{{ item.name }}于 {{ item.createTime }} 上传</p>
                </el-card>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
            </div>
          </el-card>
        </el-aside>
      </el-container>
    </div>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from 'vue'
import myAxios from "../../../plugins/myAxios.js";
import {useRouter} from "vue-router";
const value = ref(new Date())
const router=useRouter()
/*点击实习计划跳转*/
const interPlan=()=>{
  router.push('/internshipPlan')
}
/*实习计划数据*/
const tableData =ref([])
/*获取指定老师上传的文件名*/
const getFileName=async ()=>{
  const res=await myAxios.get('student/getFileDetailInfo')
  console.log(res.data)
  tableData.value=res.data
}
/*实习新闻对象*/
const news=ref()
/*文档信息*/
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
/*获取当前学生信息*/
const getStudentInfo=async()=>{
  const res=await myAxios.get("/student/studentInfo")
  studentInfo.value=res.data;
  transNum();
}
//获取新闻接口
const getListNews=async ()=>{
    const res=await myAxios.get("/student/list/news")
    console.log(res.data)
    news.value=res.data
}
/*文档标题*/
const inputData=ref({
  id:'',
  teacher:'',
})
/*选择器内容*/
const teaOptions = ref([])
//学生实习指导老师
const schTea=ref(null)
//查询学生实习指导老师情况
const getSchTeaDetails=async ()=>{
  const res=await myAxios.get("/student/getSchTeaDetails")
  if(res.data!=null){
    schTea.value=res.data
  }
}
//根据当前学生的院系信息查询对应的老师信息
const getFacultyInfo=async ()=>{
  const res=await myAxios.get("/student/getFacultyInfo")
  for (let i = 0; i < res.data.length; i++) {
    // console.log(res.data[i].name)
    teaOptions.value[i]=res.data[i]
  }
}
//选择实习老师确认按钮
const confirmBtn=async ()=>{
  //获取老师对应的id信息
  for (let i = 0; i < teaOptions.value.length; i++) {
    if(inputData.value.teacher===teaOptions.value[i].name){
      inputData.value.id=teaOptions.value[i].id
      //发送请求
      const res=await myAxios.post("/student/chooseTeacher",{
        teacherId:inputData.value.id
      })
      console.log(res.data)
      console.log(inputData.value.id)
      //获取指定老师上传的文件名
      await getFileName()
      //查询学生实习指导老师情况
      await getSchTeaDetails()
    }else{
      ElMessage({
        message: '当前老师信息有误！',
        type: 'warning',
      })
    }
  }
}
//转换数字
const transNum=()=>{
  if(studentInfo.value.gender==0){
    studentInfo.value.gender='男';
  }else if(studentInfo.value.gender==1){
    studentInfo.value.gender='女';
  }
}
onBeforeMount( ()=>{
  //获取新闻接口
  getListNews()
  //获取当前学生信息
  getStudentInfo()
  //获取指定老师上传的文件名
  getFileName()
  //查询学生实习指导老师情况
  getSchTeaDetails()
  //根据当前学生的院系信息查询对应的老师信息
  getFacultyInfo()
})


//弹出实习信息详情页
const details=(o)=>{
  router.push({
    name: 'NewsDetailsPage',
    query: {id:o.id}
  })
  console.log(o.id)
}


</script>

<style scoped>

/*大卡片*/
.big-card{
  margin-top: 30px;
  /*padding: 30px;*/
  /*border-radius: 10px;*/
  height: auto;
  background-color: #f0f0f0;
}
/*卡片样式*/
.box-card {
  /*背景透明度*/
  /*opacity: 0.8;*/
  padding: 1rem;
  border-radius: 10px;
  height: 200px;
  width: 300px;
}


/*主体盒子*/
.mainBox {
  /*margin-top: 50px;*/
  /*margin: 50px auto;*/
  weight: 100%;
  /*border: 1px red solid;*/
  /*position: relative;*/
  padding: 20px;
}

/*折叠面板*/
.el-collapse {
  margin-top: 30px;
}

/*点击弹出详情页*/
.dialog-footer button:first-child {
  margin-right: 10px;
}

/*日历样式*/
.el-calendar {
  --el-calendar-border: var(--el-table-border, 1px solid var(--el-border-color-lighter));
  --el-calendar-header-border-bottom: var(--el-calendar-border);
  --el-calendar-selected-bg-color: var(--el-color-primary-light-9);
  --el-calendar-cell-width: px;
  background-color: var(--el-fill-color-blank);
}

.el-descriptions-item{
  background-color: #f0f0f0;
}
</style>

