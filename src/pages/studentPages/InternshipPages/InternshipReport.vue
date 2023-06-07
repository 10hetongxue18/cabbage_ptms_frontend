<template>
<!--实习报告页面-->
  <div id="reportPage">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="16">
            <p>已审查的实习文档数量：{{interDocNum}}份</p>
          </el-col>
          <el-col :span="8">
            <div style="margin-top: 20px;text-align: center;">
              <el-button type="primary" size="large" icon="Pointer" plain v-if="active==3&&interDocNum==15" @click="generateReport">一键生成实习报告</el-button>
              <el-button type="primary" size="large" icon="Pointer" disabled plain v-else>一键生成实习报告</el-button>
<!--              <el-button type="primary" size="large" icon="Pointer" plain  @click="generateReport">一键生成实习报告</el-button>-->
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-main>
          <el-steps :active="active">
            <el-step title="实习单位基本情况" description="填写实习单位基本情况"/>
            <el-step title="实习岗位与实习任务" description="填写实习岗位与实习任务"/>
            <el-step title="实习体会" description="填写实习体会"/>
          </el-steps>
          <div>
            <el-button style="margin-top: 12px" @click="last" plain circle>
              <p v-if="active!=0"><el-icon><ArrowLeftBold /></el-icon></p>
              <p v-else><el-icon><CloseBold /></el-icon></p>
            </el-button>
            <el-button style="margin-top: 12px" @click="next" plain circle>
              <p v-if="active!=3"><el-icon><ArrowRightBold /></el-icon></p>
              <p v-else><el-icon><Select /></el-icon></p>
            </el-button>
          </div>
          <div style="margin: 20px auto;">
            <div v-if="active==0">
              <el-input
                  v-model="textArea.oneTextArea"
                  :autosize="{minRows: 15, maxRows:15}"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  placeholder="请填写实习单位基本情况"
              />
            </div>

            <div v-if="active==1">
              <el-input
                  v-model="textArea.twoTextArea"
                  :autosize="{minRows: 15, maxRows:15}"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  placeholder="请填写实习岗位与实习任务"
              />
            </div>

            <div v-if="active==2">
              <el-input
                  v-model="textArea.threeTextArea"
                  :autosize="{minRows: 15, maxRows:15}"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  placeholder="请填写实习体会"
              />
            </div>

            <div v-if="active==3">
              <el-empty description="你的实习报告已全部填好，点击一键生成顶岗实习报告" v-if="interDocNum==15"/>
              <el-empty description="实习文档数量未满15篇！" v-else/>
            </div>

          </div>

        </el-main>
        <el-aside width="400px">
<!--          <el-card style="margin-top: 100px">-->
            <div style="margin-top: 20vh;text-align: center">
              <el-link :underline="false">
                <p style="font-size: 20px" v-if="reportName!=''" @click="downloadFile">实习报告：{{reportName}}</p>
                <el-empty description="暂无实习报告！"  v-else image="src/assets/state/state3.png" :image-size="200"/>
              </el-link>
            </div>
<!--          </el-card>-->
        </el-aside>
      </el-container>
    </el-container>

  </div>



</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import myAxios from "../../../plugins/myAxios.js";
import {ElNotification} from "element-plus";
const active = ref(0)

/*步骤条*/
const last = () => {
  if(active.value>0){
    active.value--
  }
}
const next = () => {
  if(active.value<=2){
    active.value++
  }
}
/*文本域*/
const textArea=ref({
  oneTextArea:'',
  twoTextArea:'',
  threeTextArea:'',
})
/*实习文档数量*/
const interDocNum=ref('')

/*获取实习文档信息*/
const getDocument=async ()=>{
  const res=await myAxios.get('student/getDocument',{
    params:{
      state:2
    }
  })
  console.log(res.data)
  interDocNum.value=res.data.length
}
/*自动生成实习报告*/
const generateReport=async ()=>{
  const res=await myAxios.post('student/generateReport',{
    oneTextArea:textArea.value.oneTextArea,
    twoTextArea:textArea.value.twoTextArea,
    threeTextArea:textArea.value.threeTextArea,
  })
  console.log(res.data)
  if(res.data==true){
    /*查询学生生成的实习报告*/
    await getUploadFile()
    ElNotification({
      title: '实习实训报告',
      message: '实习报告成功生成',
      type: 'success',
      position: 'bottom-right',
    })
  }else if(res.data==null){
    ElNotification({
      title: '实习实训报告',
      message: '已审核文档数量未满15篇！',
      type: 'error',
      position: 'bottom-right',
    })
  }
}
const reportName=ref('')
/*查询学生生成的实习报告*/
const getUploadFile=async ()=>{
  const res=await myAxios.get("student/uploadFileInfo")
  console.log(res.data)
  reportName.value=res.data.fileName;
}
/*报告下载*/
const downloadFile=async()=> {
  const fileName=reportName.value;
  myAxios.get('student/downloadFile',{
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
onBeforeMount(()=>{
  /*获取实习文档信息*/
  getDocument()
  /*查询学生生成的实习报告*/
  getUploadFile()
})


</script>

<style scoped>
#reportPage{
  margin-top: 40px;
}
/*文本域颜色*/
.el-textarea{
  --el-input-bg-color:#f0f0f0
}
</style>