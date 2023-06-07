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
          <el-row>
            <el-col :span="15">
              <el-card style="margin-top: 50px;height: 400px;text-align: center">
                <span style="font-family: 华文行楷;font-size: 25px;">实习数据</span>
<!--                <el-empty :image-size="200" />-->
                <el-descriptions title="Inter Data" column="1" size="large" style="margin-top: 50px;font-family: 隶书">
                  <el-descriptions-item label="实习学生人数">88</el-descriptions-item>
                  <el-descriptions-item label="已发布实习计划" >3</el-descriptions-item>
                  <el-descriptions-item label="已提交实习文档" >34</el-descriptions-item>
                </el-descriptions>
              </el-card>
            </el-col>
            <el-col :span="9">
              <el-card style="margin-top: 50px;margin-left: 20px;height: 400px;text-align: center">
                <span style="font-family: 华文行楷;font-size: 25px;">实习计划概览</span>
                <el-scrollbar height="350px">
                  <!--时间线-->
                  <el-timeline style="padding: 20px">
                    <el-timeline-item v-for="item in tableData" :key="item" :timestamp=item.createTime placement="top" @click="interPlan">
                      <el-card>
                        <h4>{{ item.fileName }}</h4>
                        <p>已下载次数-{{ item.downloadNum }}次</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>


          <!--      实习信息卡片-->
<!--          <el-card class="big-card">-->
<!--            <template #header >-->
<!--              <div>-->
<!--                <span style="color: #747bff;font-family: 华文行楷;font-size: 30px">实习信息</span>-->
<!--              </div>-->
<!--            </template>-->


<!--          </el-card>-->
        </el-main>

        <el-aside width="300px">
          <el-card style="margin-top: 70px;height: 750px;text-align: center">
            <span style="font-family: 华文行楷;font-size: 25px">实习日程</span>
            <div style="margin-top: 10px">
<!--              <el-calendar v-model="value" />-->

            </div>


          </el-card>
        </el-aside>
      </el-container>



    </div>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import myAxios from "../../../plugins/myAxios.js";
import {useRouter} from "vue-router";
const router=useRouter()
/*点击实习计划跳转*/
const interPlan=()=>{
  router.push('/teaInternshipPlan')
}
/*实习计划数据*/
const tableData =ref([])
/*获取已上传文件信息*/
const getUploadFile=async ()=>{
  const res=await myAxios.get('teacher/uploadFileInfo')
  console.log(res.data)
  tableData.value=res.data
}




//页面刷新获取新闻信息
onMounted(()=>{
  /*获取已上传文件信息*/
  getUploadFile()
})





</script>

<style scoped>

/*大卡片*/
.big-card{
  margin-top: 30px;
  /*padding: 30px;*/
  border-radius: 10px;
  opacity: 0.8;
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
}


</style>

