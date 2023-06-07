<template>
<!--日常文档页-->
  <div id="dailyDoc">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>日常文档</span>
          <el-button class="button" text>点击查看</el-button>
        </div>
      </template>
      <div>
<!--   日常文档上传     -->
        <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
        >
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png 文件.大小小于500k
            </div>
          </template>
        </el-upload>
      </div>
    </el-card>

  </div>


</template>

<script setup>
// import { ref } from 'vue'
// import { ElMessage, ElMessageBox } from 'element-plus'
// import { UploadProps, UploadUserFile } from 'element-plus'


</script>

<style scoped>
#dailyDoc{
  padding: 20px;
}
.box-card{
  margin: 40px auto;
  /*width: 950px;*/
  height: 500px;
}
</style>