<template>
  <div>
    <!-- 头部功能区   -->
    <div style="padding: 10px;">
      <!--  搜索框    -->
      <el-row :gutter="20">
        <label style="padding: 10px;font-weight: bold;">文档名称</label>
        <el-col :span="4">
          <el-select v-model="inputData.title" clearable placeholder="请选择文档名称" size="large">
            <el-option
                v-for="item in docNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
        <label style="padding: 10px;font-weight: bold">文档状态</label>
        <el-col :span="4">
            <el-select v-model="inputData.state" clearable placeholder="请选择文档状态" size="large">
              <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
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
    </div>


    <el-card class="big-card">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>实习文档信息</span>
          </div>
        </template>
        <el-table :data="tableData" stripe="true"   style="width: 100%;">
          <el-table-column prop="stuName" label="学生姓名" align="center"  />
          <el-table-column prop="title" label="文档标题" align="center"  />
          <el-table-column prop="content" label="文档内容" align="center" :show-overflow-tooltip="true">
            <template #default="scope">
              <div v-html="scope.row.content" style="height:20px"></div>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="文档状态" align="center" />
          <el-table-column prop="createTime" label="提交时间" align="center" />
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

  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import myAxios from "../../../../plugins/myAxios.js";

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
  getInterDocInfo()
}
/*分页获取实习文档信息*/
const getInterDocInfo=async ()=>{
  const res=await myAxios.get("/admin/list/InterDocInfo",{params:{
      current:currentPage.value,
      pageSize:pageSize.value
    }})
  console.log(res.data)
  tableData.value=res.data;
  total.value=res.data[0].total
  transState()
}
//表格数据
const tableData=ref([])
/*输入框属性*/
const inputData=ref({
  title:null,
  state:null,
})

/*分页*/
const currentPage = ref(1)
const pageSize = ref(5)
const total=ref(12)

const handleSizeChange = (val) => {
  pageSize.value=val
  getInterDocInfo()

}
const handleCurrentChange = (val) => {
  currentPage.value=val
  getInterDocInfo()
}
/*文档状态转换*/
const transState=()=>{
  for (let tableDataKey in tableData.value) {
    if(tableData.value[tableDataKey].state==0){
      tableData.value[tableDataKey].state='未提交'
    }else if(tableData.value[tableDataKey].state==1){
      tableData.value[tableDataKey].state='已提交'
    }else if(tableData.value[tableDataKey].state==2){
      tableData.value[tableDataKey].state='已审核'
    }
  }
}
onBeforeMount(()=>{
  getInterDocInfo()
})
/*文档状态选择器*/
const stateOptions=[
  {
    value: '0',
    label: '未提交',
  },
  {
    value: '1',
    label: '已提交',
  },
  {
    value: '2',
    label: '已审查',
  }
]

/*文档名称选择器*/
const docNameOptions = [
  {
    value: '实习文档一',
    label: '实习文档一',
  },
  {
    value: '实习文档二',
    label: '实习文档二',
  },
  {
    value: '实习文档三',
    label: '实习文档三',
  },
  {
    value: '实习文档四',
    label: '实习文档四',
  },
  {
    value: '实习文档五',
    label: '实习文档五',
  },
  {
    value: '实习文档六',
    label: '实习文档六',
  },
  {
    value: '实习文档七',
    label: '实习文档七',
  },
  {
    value: '实习文档八',
    label: '实习文档八',
  },
  {
    value: '实习文档九',
    label: '实习文档九',
  },
  {
    value: '实习文档十',
    label: '实习文档十',
  },
  {
    value: '实习文档十一',
    label: '实习文档十一',
  },
  {
    value: '实习文档十二',
    label: '实习文档十二',
  },
  {
    value: '实习文档十三',
    label: '实习文档十三',
  },
  {
    value: '实习文档十四',
    label: '实习文档十四',
  },
  {
    value: '实习文档十五',
    label: '实习文档十五',
  },
]


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