<template>
<!--发布实习岗位-->
  <div id="post">

    <el-container>
      <el-header>
        <div style="width: 100%;height: 100px;margin-top: 20px">
          <el-button type="primary" @click="dialog()">发布实习岗位</el-button>
        </div>

      </el-header>
      <el-main>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-family: 华文行楷;font-size: 25px">我发布的岗位</span>
            </div>
          </template>
          <el-table :data="tableData" height="650" stripe style="width: 100%">
<!--            <el-table-column prop="picture" label="基地展示图" align="center" >-->
<!--                <el-image  :src="pictureData.picture"/>-->
<!--&lt;!&ndash;                <el-image v-for="item in tableData" :key="item" :src="item.picture"/>&ndash;&gt;-->
<!--            </el-table-column>-->
            <el-table-column prop="postName" label="岗位名称" align="center"/>
            <el-table-column prop="message" label="详细信息" align="center"/>
            <el-table-column prop="address" label="实习地址" align="center"/>
            <el-table-column prop="createTime" label="发布时间" align="center"/>
            <el-table-column prop="operate" label="操作" align="center">
              <template #default="scope">
                <el-popconfirm
                    confirm-button-text="是"
                    cancel-button-text="否"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="确定要删除该实习信息吗?"
                    @confirm="deleteInfo(scope.row)"
                    @cancel="cancelEvent"
                >
                  <template #reference>
                    <el-button text icon="Delete" >删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>

  <el-dialog v-model="dialogTableVisible" title="发布岗位" align-center width="40%">
<!--    <el-upload-->
<!--        class="avatar-uploader"-->
<!--        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
<!--        :show-file-list="false"-->
<!--        :on-success="handleAvatarSuccess"-->
<!--        :before-upload="beforeAvatarUpload"-->
<!--    >-->
<!--      <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
<!--      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>-->
<!--    </el-upload>-->
    <el-form :model="form" >

<!--      <el-form-item label="基地风光">-->
<!--        <el-input v-model="form.picture" />-->
<!--      </el-form-item>-->
      <el-form-item label="岗位名称">
        <el-input v-model="form.postName" />
      </el-form-item>
      <el-form-item label="详细信息">
        <el-input v-model="form.message" />
      </el-form-item>
      <el-form-item label="实习地址">
        <el-input v-model="form.address" />
      </el-form-item>
    </el-form>

    <el-divider />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submit()">
          发布
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, ref} from 'vue'
import myAxios from "../../../plugins/myAxios.js";
/*form表单*/
const form = reactive({
  picture:'',
  postName:'',
  message:'',
  address:'',
})
/*dialog*/
const dialogData=ref('')
const dialogTableVisible = ref(false)
/*dialog弹出框*/
const dialog=(row)=>{
  dialogTableVisible.value=true;
  dialogData.value=row
}
/*基地展示图*/
const pictureData=ref([])
/*岗位表格数据*/
const tableData=ref([
  {
    picture:'',
    postName:'',
    message:'',
    address:'',
    createTime:'',
  }
])
/*获取当前登录企业老师发布的所有实习岗位信息*/
const getAllPostInfo=async()=>{
  const res=await myAxios.get("/teacher/getAllPostInfo")
  // console.log(res.data)
  tableData.value=res.data
  console.log(tableData.value)
  for (let tableDataKey in tableData) {
      // pictureData.value=tableData.value[tableDataKey].picture
    console.log(tableData.value[tableDataKey].picture)
  }
}

/*钩子函数*/
onBeforeMount(()=>{
  getAllPostInfo()
})
</script>

<style scoped>
#post{
  margin:30px auto;
}
/*卡片*/
.box-card{
  /*height: 450px*/
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}




</style>