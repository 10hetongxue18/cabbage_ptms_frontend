<template>
<!--实习计划页面-->
<!--  <div v-if="tableData==null" class="mainBox">-->
<!--    <el-empty description="暂无数据" />-->
<!--  </div>-->
  <div id="plan">

    <el-container>
      <el-main>

        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-family: 华文行楷;font-size: 25px">每日实习计划</span>
              <el-button class="button" text>TODO</el-button>
            </div>
          </template>
          <el-table :data="tableData" height="650" stripe style="width: 100%">
            <el-table-column prop="fileName" label="文件名" align="center"/>
            <el-table-column prop="name" label="发布人" align="center"/>
            <el-table-column prop="createTime" label="发布时间" align="center"/>
            <el-table-column prop="operate" label="操作" align="center">
              <template #default="scope">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="点击下载文件"
                    placement="bottom"
                >
                  <el-button text icon="Download" @click="downloadFile(scope.row)">下载文件</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

      </el-main>
      <el-aside width="400px" style="margin-top: 20px;margin-right: 20px;">
        <el-card style="height: 500px;">
          <template #header>
            <div>
              <span style="font-family: 华文行楷;font-size: 25px">我的实习信息</span>
                <el-button class="button" text style="margin-left: 120px;font-family: 华文行楷;">Cabbage</el-button>
            </div>
          </template>
<!--    region      -->
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">实习地址</el-col>
            <el-col :span="9">{{ internshipInfo.address }}</el-col>
          </el-row>
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">实习企业名称</el-col>
            <el-col :span="12">{{ internshipInfo.entName }}</el-col>
          </el-row>
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">责任人</el-col>
            <el-col :span="9">{{ internshipInfo.leader }}</el-col>
          </el-row>
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">实习岗位</el-col>
            <el-col :span="9">{{ internshipInfo.post }}</el-col>
          </el-row>
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">学号</el-col>
            <el-col :span="9">{{ internshipInfo.stuId }}</el-col>
          </el-row>
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">实习状态</el-col>
            <el-col :span="9">{{ internshipInfo.state }}</el-col>
          </el-row>
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">开始时间</el-col>
            <el-col :span="9">{{ internshipInfo.createTime }}</el-col>
          </el-row>
          <el-row :gutter="20" justify="space-evenly">
            <el-col :span="8">结束时间</el-col>
            <el-col :span="9">~~~~~~~~~~</el-col>
          </el-row>
          <!--    endregion      -->
        </el-card>

<!--        <el-card style="margin-top: 30px">-->
<!--          <template #header>-->
<!--            <div>-->
<!--              <span style="font-family: 华文行楷;font-size: 25px">TODO</span>-->
<!--            </div>-->
<!--          </template>-->

<!--        </el-card>-->

      </el-aside>
    </el-container>





  </div>



</template>

<script setup>
import myAxios from "../../../plugins/myAxios.js";
import {onBeforeMount, ref} from "vue";
import {ElNotification} from "element-plus";

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
const getInternshipInfo=async()=>{
  const res=await myAxios.get("/student/internshipInfo")
  internshipInfo.value=res.data;
  transNum();
  console.log(res.data)
}
/*文件下载*/
const downloadFile=async(row)=> {
  const fileName=row.fileName;
  myAxios.get('file/downloadFile',{
    params: {fileName},
    responseType: 'blob'
  }).then(res=>{
    console.log(res)
    let blob = new Blob([res])
    let url = window.URL.createObjectURL(blob)
    console.log(url)
    let a = document.createElement('a');
    a.setAttribute('download',fileName)
    a.style.display = 'none';
    document.body.appendChild(a)
    a.href = url
    a.click()
    document.body.removeChild(a)
    ElNotification({
      title: fileName,
      message: '下载成功',
      type: 'success',
      position: 'bottom-right',
    })
  })
}
// const downloadFile=async(row)=> {
//     const fileName=row.fileName;
//     console.log(row.fileName)
//     let a = document.createElement('a');
//     a.style.display = 'none';
//     // a.href = myAxios.getUri()+'fileOperationController/download?fileName='+fileName;
//     a.href = myAxios.getUri()+'file/downloadFile?fileName='+fileName;
//     // 点击下载
//     a.click();
//     //下载完成移除元素
//     document.body.removeChild(a)
// }



/*表格数据*/
const tableData =ref([])
/*获取指定老师上传的文件名*/
const getFileName=async ()=>{
  const res=await myAxios.get('student/getFileDetailInfo')
  console.log(res.data)
  tableData.value=res.data
}
//转换数字
const transNum=()=>{
  if(internshipInfo.value.state==0){
    internshipInfo.value.state='未实习';
  }else if(internshipInfo.value.state==1){
    internshipInfo.value.state='实习中';
  }
}



onBeforeMount(()=>{
  //获取下载文件信息
  getFileName()
  // 获取当前学生实习信息
  getInternshipInfo()
  // 转换数字
  transNum()
})
</script>

<style scoped>
#plan{
  margin:30px auto;
}
/*卡片*/
/*.box-card{*/

/*}*/
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-row{
  margin-top: 20px;
  font-family: 方正姚体;
}




</style>