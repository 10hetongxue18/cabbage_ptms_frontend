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
              <span style="font-family: 华文行楷;font-size: 25px">我发布的文档</span>
              <el-button class="button" text>TODO</el-button>
            </div>
          </template>
          <el-table :data="tableData" height="650" stripe style="width: 100%">
            <el-table-column prop="fileName" label="已上传的文件" align="center"/>
            <el-table-column prop="downloadNum" label="下载次数" align="center"/>
            <el-table-column prop="isVisible" label="是否可见" align="center">
              <template #default="scope">
                <el-switch
                    v-model="scope.row.isVisible"
                    :loading="loading"
                    inline-prompt
                    :active-icon="Check"
                    :inactive-icon="Close"
                    :active-value="1"
                    :inactive-value="0"
                    @change="changeStatus(scope.row)"
                    :before-change="beforeChange"
                />
              </template>

            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" align="center"/>
<!--            <el-table-column prop="operate" label="操作" align="center">-->
<!--              <template #default="scope">-->
<!--                <el-button text icon="Download" @click="downloadFile(scope.row)">下载文件</el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </el-card>

      </el-main>
      <el-aside width="600px" style="margin-top: 20px;margin-right: 20px;">
        <el-card style="height: 500px">
          <template #header>
            <div style="text-align: center">
              <span style="font-family: 华文行楷;font-size: 25px">日常文档上传区</span>
            </div>
          </template>

          <el-upload
              class="upload-demo"
              drag
              action="http://localhost:1018/api/file/uploadFile"
              multiple
              :on-success="handleSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="3"
              :on-exceed="handleExceed"
              :before-upload="beforeUpload"
              :headers="headers"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处 或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip" style="text-align: center">
                <label style="font-size: 15px;">上传类型需为<label style="color: hotpink;font-weight: bold">word</label>文档</label>
              </div>
            </template>
          </el-upload>
        <!--region-->
<!--          <el-upload-->
<!--              v-model:file-list="fileList"-->
<!--              class="upload-demo"-->
<!--              action="http://localhost:1018/api/file/uploadFile"-->
<!--              multiple-->
<!--              :on-success="handleSuccess"-->
<!--              :on-preview="handlePreview"-->
<!--              :on-remove="handleRemove"-->
<!--              :before-remove="beforeRemove"-->
<!--              :limit="3"-->
<!--              :on-exceed="handleExceed"-->
<!--              :before-upload="beforeUpload"-->
<!--              :headers="headers"-->
<!--          >-->
<!--            <el-button type="primary">点击上传日常文档</el-button>-->
<!--            <template #tip>-->
<!--              <div class="el-upload__tip">-->
<!--                <label style="font-size: 15px">上传限定类型为<label style="color: hotpink;font-weight: bold">word</label>文档</label>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-upload>-->
          <!--endregion-->

        </el-card>

      </el-aside>
    </el-container>



  </div>


</template>

<script lang="ts" setup>
import {computed, onBeforeMount, ref, watch} from 'vue'
import {ElMessage, ElMessageBox, ElNotification, UploadFile, UploadFiles} from 'element-plus'
import myAxios from "../../../plugins/myAxios.js";
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Check, Close } from '@element-plus/icons-vue'
/*文件下载*/
// const downloadFile=async(row)=> {
//   const fileName=row.fileName;
//   myAxios.get('file/downloadFile',{
//     params: {fileName},
//     responseType: 'blob'
//   }).then(res=>{
//     console.log(res)
//     let blob = new Blob([res])
//     let url = window.URL.createObjectURL(blob)
//     console.log(url)
//     let a = document.createElement('a');
//     a.setAttribute('download',fileName)
//     a.style.display = 'none';
//     document.body.appendChild(a)
//     a.href = url
//     a.click()
//     document.body.removeChild(a)
//   })
// }
/*开关*/
const loading = ref(false)
const beforeChange = () => {
  loading.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false
      ElMessage.success('切换成功')
      return resolve(true)
    }, 1000)
  })
}
/*文件是否可见*/
const changeStatus=async (row)=>{
  const res=myAxios.post("/teacher/updateFileState",{
    id:row.id,
    isVisible:row.isVisible//启用状态：false-未启用，true-启用
  })
  console.log((await res).data)
}
/*表格数据*/
const tableData =ref([])

/*获取已上传文件信息*/
const getUploadFile=async ()=>{
  const res=await myAxios.get('teacher/uploadFileInfo')
  // console.log(res.data)
  tableData.value=res.data
}

/*上传文件列表*/
const fileList = ref<UploadUserFile[]>([

])
// watch(()=>tableData.value,(newValue, oldValue)=>{
//   console.log(1)
//   console.log('oldValue 已触发', oldValue)
//   console.log('newValue 已触发', newValue)
// })
/*上传携带请求头*/
const headers:any=computed(()=>{
  let token = localStorage.getItem('authorization')
  return {
    authorization:token
  }
})

/*文件上传成功时的钩子*/
const handleSuccess: UploadProps["onSuccess"] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log(uploadFile)
  // console.log(uploadFiles)
  ElNotification({
    title: uploadFile.name,
    message: '上传成功',
    type: 'success',
    position: 'bottom-right',
  })
  setTimeout(()=>{
    location.reload()
  },4000)
}
/*点击文件列表中已上传的文件时的钩子*/
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
/*文件列表移除文件时的钩子*/
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
  ElNotification({
    title: file.name,
    message: '已将文件从列表中移除',
    type: 'info',
    position: 'bottom-right',
  })
}
/*当超出限制时，执行的钩子函数*/
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
      `最多可同时上传3份文件，本次上传了 ${files.length} 份文件，超出了最大限制！`
  )
}
/*上传文件之前的钩子，参数为上传的文件，若返回false或者返回Promise且被reject，则停止上传*/
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    console.log(rawFile.type)
    ElMessage.error('必须为word文件!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('word文件大小不能超过10MB!')
    return false
  }
  return true
}
/*删除文件之前的钩子，参数为上传的文件和文件列表，若返回false或者返回Promise 且被reject，则停止删除*/
const beforeRemove: (uploadFile, uploadFiles) => Promise<boolean> = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `要将文件 ${uploadFile.name} 从列表移除吗?`
  ).then(
      () => true,
      () => false
  )
}

onBeforeMount(()=>{
  /*获取已上传文件信息*/
  getUploadFile()
})
</script>

<style scoped>
#plan{
  margin:30px auto;
}
/*卡片*/
.box-card{
  /*height: 500px*/
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}





</style>