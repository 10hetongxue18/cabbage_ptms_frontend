<template>
  <div>
    <!-- 头部功能区   -->
    <div style="padding: 10px;">
      <!--  搜索框    -->
      <el-row :gutter="20">
        <label style="padding: 10px;font-weight: bold;">岗位名称</label>
        <el-col :span="4">
          <el-input v-model="inputData.postName" placeholder="请输入岗位名称" clearable size="large" />
        </el-col>
        <label style="padding: 10px;font-weight: bold">实习信息</label>
        <el-col :span="4">
          <el-input v-model="inputData.message" placeholder="请输入实习详情" clearable size="large" />
        </el-col>
      </el-row>

      <!--   搜索、重置按钮   -->
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="2" style="margin-left: 52px;">
          <el-button type="primary" icon="Search" @click="search()">搜索</el-button>
        </el-col>
        <el-col :span="2" style="margin-left: 24px;">
          <el-button color="lightcoral" icon="Refresh" @click="refresh()">重置</el-button>
        </el-col>
      </el-row>
      <!--  添加按钮    -->
      <el-row :gutter="20" style="margin-top: 30px">
        <el-col :span="2" style="margin-left: 52px;">
          <el-button color="lightpink" plain icon="Plus" @click="addInfo()">添加</el-button>
        </el-col>
      </el-row>

    </div>


    <el-card class="big-card">

      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>实习新闻信息</span>
            <el-button class="button" text>todo</el-button>
          </div>
        </template>
        <el-table :data="tableData" stripe="true"   style="width: 100%;">
          <el-table-column prop="postName" label="岗位名称" align="center"  />
          <el-table-column prop="message" label="实习详情" align="center"  />
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column prop="updateTime" label="修改时间" align="center" />
          <el-table-column prop="operate" label="操作" align="center">
            <template #default="scope">
              <el-button text icon="EditPen" @click="updateInfo(scope.row)">修改</el-button>
              <el-popconfirm
                  confirm-button-text="是"
                  cancel-button-text="否"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确定要删除这条数据吗?"
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
      <!--  分页插件-->
      <el-config-provider :locale="zhCn">
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </el-config-provider>
    </el-card>


    <!--  点击弹出添加页-->
    <el-dialog
        v-model="addDialogVisible"
        title="添加老师信息"
        width="60%"
        align-center
        style="border-radius: 10px;"
        draggable
        center
    >
      <el-form :model="formData" :rules="rules" ref="ruleAddFormRef" style="margin-right: 70px">
        <el-form-item label="岗位名称" :label-width="formLabelWidth" prop="postName">
          <el-input v-model="formData.postName" clearable placeholder="请输入岗位名称"/>
        </el-form-item>
        <el-form-item label="实习详情" :label-width="formLabelWidth" prop="message">
          <el-input v-model="formData.message" clearable placeholder="请输入实习详情"/>
        </el-form-item>
        <el-form-item label="实习基地id" :label-width="formLabelWidth" prop="areaId">
          <el-input v-model="formData.areaId" clearable placeholder="请输入实习基地id"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="addCancel()">取消</el-button>
        <el-button type="primary" @click="addSubmitForm()">
          添加
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!--点击弹出修改页-->
    <el-dialog
        v-model="updateDialogVisible"
        title="修改老师信息"
        width="60%"
        align-center
        style="border-radius: 10px;"
        draggable
        center
    >
      <el-form :model="formData" :rules="rules" ref="ruleAddFormRef" style="margin-right: 70px">
        <el-form-item label="岗位名称" :label-width="formLabelWidth" prop="postName">
          <el-input v-model="formData.postName" clearable placeholder="请输入岗位名称"/>
        </el-form-item>
        <el-form-item label="实习详情" :label-width="formLabelWidth" prop="message">
          <el-input v-model="formData.message" clearable placeholder="请输入实习详情"/>
        </el-form-item>
        <el-form-item label="实习基地id" :label-width="formLabelWidth" prop="areaId">
          <el-input v-model="formData.areaId" clearable placeholder="请输入实习基地id"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateCancel()">取消</el-button>
        <el-button type="primary" @click="updateSubmitForm()">
          更新
        </el-button>
      </span>
      </template>
    </el-dialog>


  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import myAxios from "../../../plugins/myAxios.js";

/*删除功能*/
const deleteInfo=async (row)=>{
  const res=await myAxios.post("/admin/deleteNewsInfo",{
    id:row.id,
  })
  // console.log(res)
  if(res.code===0){
    ElMessage({
      message: '删除成功',
      type: 'success',
      center:true,
      offset:50,
    })
  }
  //回调获取老师信息接口
  await getNewsInfo()
}
//表单宽度
const formLabelWidth='100px'
//表单数据
const formData=ref({
  id:'',
  postName:'',
  message:'',
  areaId:'',
})
//是否弹出
const updateDialogVisible = ref(false)
//弹出修改信息页
const updateInfo=(row)=>{
  formData.value.id=row.id
  formData.value.postName=row.postName
  formData.value.message=row.message
  formData.value.areaId=row.areaId
  updateDialogVisible.value=true;
}
//修改老师信息提交按钮
const updateSubmitForm=async()=>{
  updateDialogVisible.value=false;
  const res=await myAxios.post('/admin/updateNewsInfo',{
    id:formData.value.id,
    postName:formData.value.postName,
    message:formData.value.message,
  })
  console.log(res.data)
  if(res.code===0){
    ElMessage({
      message: '更新成功',
      type: 'success',
      center:true,
      offset:50,
    })
  }
  //回调获取老师信息接口
  await getNewsInfo()
}
//取消事件
const updateCancel=()=>{
  updateDialogVisible.value = false;
}
//是否弹出
const addDialogVisible = ref(false)
//弹出添加信息页
const addInfo=()=>{
  addDialogVisible.value=true;
}
//添加学生信息提交按钮
const addSubmitForm=async()=>{
  addDialogVisible.value=false;
  const res=await myAxios.post('/admin/addNewsInfo',{
    postName:formData.value.postName,
    message:formData.value.message,
    areaId:formData.value.areaId,
  })
  console.log(res.data)
  if(res.code===0){
    ElMessage({
      message: '添加成功',
      type: 'success',
      center:true,
      offset:50,
    })
  }
  //回调获取老师信息接口
  await getNewsInfo()
}
//取消事件
const addCancel=()=>{
  addDialogVisible.value = false;
}

/*搜索按钮*/
const search=async()=>{
  const res=await myAxios.get('/admin/searchNewsInfo',{params:{
      postName:inputData.value.postName,
      message:inputData.value.message,
    }})
  // console.log(res.data)
  tableData.value=res.data
  /*条件搜索后的分页总条数*/
  let count=0;
  for (let tableDataKey in tableData.value) {
    count=count+1;
  }
  total.value=count
}

/*重置按钮*/
const refresh=()=>{
  inputData.value.postName=null;
  inputData.value.message=null;
  getNewsInfo()
}
/*分页获取实习新闻信息*/
const getNewsInfo=async ()=>{
  const res=await myAxios.get("/admin/list/newsInfo",{params:{
      current:currentPage.value,
      pageSize:pageSize.value
    }})
  console.log(res.data)
  tableData.value=res.data.tbNews;
  total.value=res.data.total
}
//表格数据
const tableData=ref([])
/*输入框属性*/
const inputData=ref({
  postName:null,
  message:null,
})

/*分页*/
const currentPage = ref(1)
const pageSize = ref(5)
const total=ref(12)

const handleSizeChange = (val) => {
  pageSize.value=val
  getNewsInfo()

}
const handleCurrentChange = (val) => {
  currentPage.value=val
  getNewsInfo()
}

onBeforeMount(()=>{
  getNewsInfo()
})

</script>

<style scoped>
.big-card {
  margin: 10px;
  opacity: 0.8;
  border-radius: 20px;
}
.box-card {
  /*width: 480px;*/
  margin: 10px;
  border-radius: 10px;
}
</style>