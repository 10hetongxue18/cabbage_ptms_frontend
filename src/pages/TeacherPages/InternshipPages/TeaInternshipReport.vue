<template>
  <div id="reportPage">
    <el-container>
      <el-main>

        <el-card class="box-card">
          <template #header>
            <div style="text-align: center;margin-top: 20px">
              <span style="font-family: 华文行楷;font-size: 25px;">实习报告</span>
              <div style="text-align: right">
                <el-select v-model="selectData.state" class="m-2" placeholder="请选择报告状态..." @change="selectReportState()">
                  <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </template>
          <el-table :data="tableData" height="390" stripe style="width: 100%">
            <el-table-column prop="name" label="学生姓名" align="center"/>
            <el-table-column prop="reportName" label="报告名" align="center"/>
            <el-table-column prop="createTime" label="上传时间" align="center"/>
            <el-table-column prop="operate" label="操作" align="center">
              <template #default="scope">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="点击下载报告"
                    placement="bottom"
                >
                  <el-button text icon="Download" @click="downloadFile(scope.row)">下载报告</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="operate" label="实习总结" align="center" >
              <template #default="scope">
                <el-tooltip content="点击查看实习总结" placement="bottom" effect="light">
                  <el-button text icon="Pointer" @click="showSummary(scope.row)">总结</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
      <el-aside width="30%" style="margin-top: 20px;margin-right: 20px;">
        <div>
          <el-card style="height: 600px;position: relative">
            <el-divider content-position="left" border-style="dashed">
              <span style="font-family: 华文行楷;font-size: 20px;" v-if="name==''">实习总结</span>
              <span style="font-family: 华文行楷;font-size: 20px;" v-else>{{ name }}的实习总结</span>
            </el-divider>
            <div style="border: 1px black dashed;padding: 1rem;border-radius: 10px;">
              <div v-if="summary!=null">
                <p>{{ summary }}</p>
              </div>
              <div v-else>
                <el-empty description="暂无报告" image="src/assets/state/state3.png" :image-size="200"/>
              </div>
            </div>

            <div style="bottom: 0;position: absolute;">
              <el-button type="primary" @click="adopt()" v-if="summary==null" disabled>通过</el-button>
              <el-button type="primary" @click="adopt()" v-else>通过</el-button>
              <el-button type="info" style="margin-left: 100px">取消</el-button>

            </div>
          </el-card>
        </div>

      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import myAxios from "../../../plugins/myAxios.js";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";

const router=useRouter()
//表格数据
const tableData =ref([])
//获取实习报告数据
const getInternshipReport=async ()=>{
  const res=await myAxios.get("/teacher/getInternshipReport",{
    params:{
      state:0
    }
  })
  console.log(res.data)
  tableData.value=res.data
}
/*文件下载*/
const downloadFile=async(row)=> {
  const fileName=row.reportName;
  myAxios.get('file/downloadReport',{
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
/*报告名称*/
const reportName=ref('')
/*学生姓名*/
const name=ref('')
/*实习总结*/
const summary=ref(null)
/*获取实习总结内容*/
const showSummary=async (row)=>{
  name.value=row.name
  reportName.value=row.reportName
  const res=await myAxios.get("/teacher/getSummary",{
    params:{
      reportName:reportName.value
    }
  })
  console.log(res.data)
  summary.value=res.data
}
/*通过按钮*/
const adopt=()=>{
  router.push({
    name:'ReportProcessing',
    query:{reportName:reportName.value}
  })
}
/*选择报告状态*/
const selectData=ref({
  state:'',
})
const stateOptions = [
  {
    value: '0',
    label: '未通过',
  },
  {
    value: '1',
    label: '已通过',
  },
]
/*文档状态选择器*/
const selectReportState=async ()=>{
  const res=await myAxios.get("/teacher/getInternshipReport",{
    params:{
      state:selectData.value.state
    }
  })
  console.log(res.data)
  tableData.value=res.data
}
onBeforeMount(()=>{
  //获取实习报告数据
  getInternshipReport()
})
</script>

<style scoped>
#reportPage{
  margin-top: 70px;
  border: #747bff 1px solid;
}
</style>