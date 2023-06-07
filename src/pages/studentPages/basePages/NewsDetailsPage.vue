<template>
  <div id="newsDetails-layout">
    <el-container>
      <el-main>
<!--实习详情页-->
        <el-card class="main-card">
          <template #header>
            <div class="card-header">
              <span>实习详情</span>
            </div>
          </template>
          <div >
            <el-container>
              <el-aside width="400px">
                <el-card shadow="hover">
                  <el-image
                      style="width: 100%; height: 100%"
                      :src="showData.picture"
                  />
                </el-card>
              </el-aside>
              <el-main>
                <div style="margin-left: 30px">
                  <el-descriptions title="#cabbage#"  column="1">
                    <el-descriptions-item label="企业联系人:">{{ showData.entTeaName  }}</el-descriptions-item>
                    <el-descriptions-item label="企业名称:">{{ showData.entName }}</el-descriptions-item>
                    <el-descriptions-item label="岗位名称:">{{ showData.postName }}</el-descriptions-item>
                    <el-descriptions-item label="详细信息:">{{ showData.message }}</el-descriptions-item>
                    <el-descriptions-item label="实习地址:">{{ showData.address }}</el-descriptions-item>
                    <el-descriptions-item label="电话:">{{ showData.phone }}</el-descriptions-item>
                    <el-descriptions-item label="邮箱:">{{ showData.email }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-main>
            </el-container>
            <el-divider  />
            <div>
              <el-button type="primary" icon="Pointer" @click="apply()">点击申请</el-button>
            </div>
          </div>
        </el-card>
<!--评论卡片-->
<!--        <el-card class="left-card">-->
<!--          <template #header>-->
<!--            <div class="card-header">-->
<!--              <span>评论</span>-->
<!--              <el-button type="primary" icon="ChatDotRound" >写评论</el-button>-->
<!--            </div>-->
<!--          </template>-->

<!--        </el-card>-->

      </el-main>
      <el-aside width="30%">
        <el-card class="right-card">
          <span>更多实习</span>
          <div style="padding: 10px">
            <el-scrollbar height="700px">
              <el-row align="middle" >
                <el-col  v-for="o in news" :key="o" style="margin: 20px auto">
<!--                  <el-card shadow="hover" style="background-color: #f0f0f0;">-->

                    <el-link :underline="false" style="font-family: 华文行楷;font-size: 20px" @click="details(o)">
                      <div class="img">
                        <el-image style="width: 100%;height: 100%;border-radius: 20px;" :src="o.picture"  />
                      </div>
                    </el-link>
                    <p style="text-align: center;font-weight: bolder">{{o.entName}}</p>
<!--                  </el-card>-->
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>

<!--dialog-->
  <el-dialog v-model="dialogFormVisible" title="申请实习" align-center>
<!--  实习描述  -->
    <el-descriptions title=""  column="3">
      <el-descriptions-item label="企业联系人:">{{ showData.entTeaName  }}</el-descriptions-item>
      <el-descriptions-item label="岗位名称:">{{ showData.postName }}</el-descriptions-item>
      <el-descriptions-item label="企业名称:">{{ showData.entName }}</el-descriptions-item>
      <el-descriptions-item label="实习地址:">{{ showData.address }}</el-descriptions-item>
      <el-descriptions-item label="详细信息:">{{ showData.message }}</el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">
      <label style="font-weight: bolder;color: lightpink;font-size: 20px">《自我简介》</label>
    </el-divider>
    <el-input type="textarea" :rows="10" v-model="form.introduction" style="margin-top: 20px"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消申请</el-button>
        <el-button type="primary" @click="submitForm()">
          提交申请
        </el-button>
      </span>
    </template>
  </el-dialog>



</template>

<script setup>
import {markRaw, onBeforeMount, onUpdated, reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import { Postcard } from '@element-plus/icons-vue'
import myAxios from "../../../plugins/myAxios.js";
const router=useRouter()
const route=useRoute()

//跳转更多实习详情
const details=(o)=>{
  router.push({
    name: 'NewsDetailsPage',
    query: {id:o.id}
  })
  console.log(o.id)
}

/*dialog*/
const dialogFormVisible = ref(false)

const form = reactive({
  introduction:'',
})
//详情信息页提交按钮
const submitForm=async()=>{
    dialogFormVisible.value=false;
    const res=await myAxios.post('/student/addApplication',{
      newsId:showData.value.newsId,
      areaId:showData.value.areaId,
      entId:showData.value.entTeaId,
      introduction:form.introduction,
      state:1,
  })
  console.log(res.data)
  if(res.code===0){
    ElMessage({
      message: '提交申请成功',
      type: 'success',
      center:true,
      offset:50,
    })
  }

}
//取消事件
const cancel=()=>{
  dialogFormVisible.value = false;
}
/*实习详情id*/
const id=ref(route.query);

/*描述列表数据*/
const showData=ref({
  newsId:'',
  areaId:'',
  entTeaId:'',
  entTeaName:'',
  entName:'',
  postName:'',
  message:'',
  picture:'',
  address:'',
  phone:'',
  email:'',
})
/*获取实习详情*/
const getInterInfo=async ()=>{
  const res=await myAxios.get("/student/getNewsDetail", {
    params: id.value
  })
  console.log(res.data)
  showData.value=res.data
}

/*申请按钮*/
const apply=async ()=>{

  ElMessageBox.confirm(
      '确定要申请该实习吗?',
      '实习申请',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        // draggable: true,
        icon: markRaw(Postcard),
      }
  )
      .then(() => {
        dialogFormVisible.value=true
        // ElMessage({
        //   type: 'success',
        //   message: '已发送申请',
        // })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消申请',
        })
      })
}
/*实习新闻对象*/
const news=ref('')

/*更多实习*/
const moreInternships=async()=>{
  const res=await myAxios.get('/student/getMoreInternships',{
    params:id.value
  });
  console.log(res.data)
  news.value=res.data
}

onBeforeMount(()=>{
  /*获取实习详情*/
  getInterInfo()
  /*获取更多实习信息*/
  moreInternships()
})

</script>

<style scoped>
#newsDetails-layout{

}
.main-card{
  /*height: 500px;*/
  margin: 20px auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right-card{
  margin-top: 40px ;
  margin-right: 20px;
  height: 770px;
  background-color: #f0f0f0;
  text-align: center;
}
.img{
  width: 333px;
  height: 200px;
  border-radius: 20px
}
</style>