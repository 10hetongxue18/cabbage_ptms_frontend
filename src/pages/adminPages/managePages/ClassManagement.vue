<template>
  <div>
    <!-- 头部功能区   -->
    <div class="header">
      <!--  搜索框    -->
      <el-row :gutter="20">
        <label style="padding: 10px;font-weight: bold">院系</label>
        <el-col :span="4">
          <el-input v-model="inputData.faculty" placeholder="请输入院系" clearable size="large" />
        </el-col>
        <label style="padding: 10px;font-weight: bold">专业</label>
        <el-col :span="4">
          <el-input v-model="inputData.major" placeholder="请输入专业" clearable size="large" />
        </el-col>
        <label style="padding: 10px;font-weight: bold">年级</label>
        <el-col :span="4">
          <el-input v-model="inputData.grade" placeholder="请输入年级" clearable size="large" />
        </el-col>
        <label style="padding: 10px;font-weight: bold">班级</label>
        <el-col :span="4">
          <el-input v-model="inputData.classes" placeholder="请输入班级" clearable size="large" />
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
            <span>学生基本信息</span>
            <el-button class="button" text>todo</el-button>
          </div>
        </template>
        <el-table :data="tableData" stripe="true"   style="width: 100%;">
          <el-table-column prop="name" label="姓名" align="center"  width="90px"/>
          <el-table-column prop="gender" label="性别" align="center"  width="90px"/>
          <el-table-column prop="stuId" label="学号" align="center"/>
          <el-table-column prop="faculty" label="院系" align="center"/>
          <el-table-column prop="major" label="专业" align="center" width="100px"/>
          <el-table-column prop="grade" label="年级" align="center" width="100px"/>
          <el-table-column prop="classes" label="班级" align="center"/>
          <el-table-column prop="createTime" label="创建时间" align="center" width="110px"/>
          <el-table-column prop="updateTime" label="修改时间" align="center" width="110px"/>
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

<!--region-->
    <!--点击弹出修改页-->
    <el-dialog
        v-model="updateDialogVisible"
        title="修改班级信息"
        width="60%"
        align-center
        style="border-radius: 10px;"
        draggable
        center
    >
      <el-form :model="formData" :rules="rules" ref="ruleAddFormRef" style="margin-right: 70px">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="formData.name" clearable placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="formData.gender" clearable placeholder="请选择性别" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" prop="stuId">
          <el-input v-model="formData.stuId" clearable placeholder="请输入学号"/>
        </el-form-item>
        <el-form-item label="院系" :label-width="formLabelWidth" prop="faculty">
          <el-input v-model="formData.faculty" clearable placeholder="请输入院系"/>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
          <el-input v-model="formData.major" clearable placeholder="请输入专业"/>
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth" prop="grade">
          <el-input v-model="formData.grade" clearable placeholder="请输入年级"/>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth" prop="classes">
          <el-input v-model="formData.classes" clearable placeholder="请输入班级"/>
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

    <!--endregion-->




  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import myAxios from "../../../plugins/myAxios.js";
/*删除功能*/
const deleteInfo=async (row)=>{
  const res=await myAxios.post("/admin/deleteStudentInfo",{
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
  //回调获取班级信息接口
  await getClassInfo()
}

/*dialog弹出框*/
//是否弹出
const updateDialogVisible = ref(false)
//弹出修改信息页
const updateInfo=(row)=>{
  formData.value.id=row.id
  formData.value.name=row.name
  formData.value.gender=row.gender
  formData.value.stuId=row.stuId
  formData.value.faculty=row.faculty
  formData.value.major=row.major
  formData.value.grade=row.grade
  formData.value.classes=row.classes
  updateDialogVisible.value=true;
}
//修改班级信息提交按钮
const updateSubmitForm=async()=>{
  updateDialogVisible.value=false;
  const res=await myAxios.post('/admin/updateStudentInfo',{
    id:formData.value.id,
    name:formData.value.name,
    gender:formData.value.gender=='男'?0:1,
    stuId:formData.value.stuId,
    faculty:formData.value.faculty,
    major:formData.value.major,
    grade:formData.value.grade,
    classes:formData.value.classes,
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
  //回调获取班级信息接口
  await getClassInfo()
}
//取消事件
const updateCancel=()=>{
  updateDialogVisible.value = false;
}

//表单数据
const formData=ref({
  id:'',
  name:'',
  gender:'',
  stuId:'',
  faculty:'',
  major:'',
  grade:'',
  classes:'',
})
//表单宽度
const formLabelWidth='100px'

/*输入框属性*/
const inputData=ref({
  // name:null,
  gender:null,
  stuId:null,
  faculty:null,
  major:null,
  grade:null,
  classes:null,
})

/*el-select选择器*/
const options = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
]
/*转换性别*/
const transGender=()=>{
  if(inputData.value.gender=='男'){
    return 0;
  }else if(inputData.value.gender=='女'){
    return 1;
  }
}
/*搜索按钮*/
const search=async()=>{
  const res=await myAxios.get('/admin/searchClassInfo',{params:{
      // name:inputData.value.name,
      gender:transGender(),
      stuId:inputData.value.stuId,
      faculty:inputData.value.faculty,
      major:inputData.value.major,
      grade:inputData.value.grade,
      classes:inputData.value.classes,
    }})
  // console.log(res.data)
  tableData.value=res.data
  /*条件搜索后的分页总条数*/
  let count=0;
  for (let tableDataKey in tableData.value) {
    count=count+1;
  }
  // console.log(inputData.value.gender)
  total.value=count
  transNum()
}

/*重置按钮*/
const refresh=()=>{
  inputData.value.faculty=null;
  inputData.value.major=null;
  inputData.value.grade=null;
  inputData.value.classes=null;
  getClassInfo()
}

/*分页*/
const currentPage = ref(1)
const pageSize = ref(5)
const total=ref(12)

const handleSizeChange = (val) => {
  pageSize.value=val
  getClassInfo()
}
const handleCurrentChange = (val) => {
  currentPage.value=val
  getClassInfo()
}

/*表格数据*/
const tableData =ref([])
/*分页获取班级信息*/
const getClassInfo=async ()=>{
  const res=await myAxios.get("/admin/list/studentInfo",{params:{
      current:currentPage.value,
      pageSize:pageSize.value
    }})
  console.log(res.data)
  tableData.value=res.data.tbStuInfo
  transNum()
  total.value=res.data.total
}
/*转换数字*/
const transNum=()=>{
  for (let tableDataKey in tableData.value) {
    if(tableData.value[tableDataKey].gender==0){
      tableData.value[tableDataKey].gender='男'
    }else if(tableData.value[tableDataKey].gender==1){
      tableData.value[tableDataKey].gender='女'
    }
  }
}

onBeforeMount(()=>{
  getClassInfo()
  transNum()
})



</script>

<style scoped>
.big-card {
  margin: 10px;
  /*opacity: 0.7;*/
  border-radius: 20px;
  /*background-color: pink;*/
}
.box-card {
  /*width: 480px;*/
  margin: 10px;
  border-radius: 10px;
  opacity: 0.8;
}
.header{
  margin: 10px;
  /*padding: 10px;*/
  /*border-radius: 20px;*/
  /*background-color: #475669;*/
}
</style>