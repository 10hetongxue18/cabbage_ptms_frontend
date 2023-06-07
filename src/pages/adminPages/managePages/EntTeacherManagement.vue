<template>
  <div>
    <!-- 头部功能区   -->
    <div style="padding: 10px;">
      <!--  搜索框    -->
      <el-row :gutter="20">
        <label style="padding: 10px;font-weight: bold;">姓名</label>
        <el-col :span="4">
          <el-input v-model="inputData.name" placeholder="请输入姓名" clearable size="large" />
        </el-col>
        <label style="padding: 10px;font-weight: bold">性别</label>
        <el-col :span="4">
          <el-select v-model="inputData.gender" clearable placeholder="请选择性别" size="large">
            <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
        <label style="padding: 10px;font-weight: bold">企业工号</label>
        <el-col :span="4">
          <el-input v-model="inputData.entLoginId" placeholder="请输入企业工号" clearable size="large" />
        </el-col>
        <label style="padding: 10px;font-weight: bold">企业名称</label>
        <el-col :span="4">
          <el-input v-model="inputData.entName" placeholder="请输入企业名称" clearable size="large" />
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
            <span>企业老师信息</span>
            <el-button class="button" text>todo</el-button>
          </div>
        </template>
        <el-table :data="tableData" stripe="true"   style="width: 100%;">
          <el-table-column prop="name" label="姓名" align="center"  width="90px"/>
          <el-table-column prop="gender" label="性别" align="center"  width="90px"/>
          <el-table-column prop="entLoginId" label="企业工号" align="center" width="130px"/>
          <el-table-column prop="entId" label="企业Id" align="center" width="100px"/>
          <el-table-column prop="entName" label="企业名称" align="center" width="125px"/>
          <el-table-column prop="department" label="部门名称" align="center" width="110px"/>
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="phone" label="电话" align="center" width="115px"/>
          <el-table-column prop="createTime" label="创建时间" align="center" width="115px"/>
          <el-table-column prop="updateTime" label="修改时间" align="center" width="115px"/>
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
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="formData.name" clearable placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="formData.gender" clearable placeholder="请选择性别" size="large">
            <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth" prop="entLoginId">
          <el-input v-model="formData.entLoginId" clearable placeholder="请输入企业工号"/>
        </el-form-item>
        <el-form-item label="企业Id" :label-width="formLabelWidth" prop="entId">
          <el-input v-model="formData.entId" clearable placeholder="请输入企业Id"/>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="entName">
          <el-input v-model="formData.entName" clearable placeholder="请输入企业名称"/>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="department">
          <el-input v-model="formData.department" clearable placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="formData.email" clearable placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="formData.phone" clearable placeholder="请输入联系电话"/>
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
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="formData.name" clearable placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="formData.gender" clearable placeholder="请选择性别" size="large">
            <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth" prop="entLoginId">
          <el-input v-model="formData.entLoginId" clearable placeholder="请输入企业工号"/>
        </el-form-item>
        <el-form-item label="企业Id" :label-width="formLabelWidth" prop="entId">
          <el-input v-model="formData.entId" clearable placeholder="请输入企业Id"/>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="entName">
          <el-input v-model="formData.entName" clearable placeholder="请输入企业名称"/>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="department">
          <el-input v-model="formData.department" clearable placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="formData.email" clearable placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="formData.phone" clearable placeholder="请输入联系电话"/>
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
  const res=await myAxios.post("/admin/deleteEntTeacherInfo",{
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
  await getEntTeacherInfo()
}
//表单宽度
const formLabelWidth='100px'
//表单数据
const formData=ref({
  id:'',
  name:'',
  gender:'',
  entLoginId:'',
  entId:'',
  entName:'',
  department:'',
  email:'',
  phone:'',
})
//是否弹出
const updateDialogVisible = ref(false)
//弹出修改信息页
const updateInfo=(row)=>{
  formData.value.id=row.id
  formData.value.name=row.name
  formData.value.gender=row.gender
  formData.value.entLoginId=row.entLoginId
  formData.value.entId=row.entId
  formData.value.entName=row.entName
  formData.value.department=row.department
  formData.value.email=row.email
  formData.value.phone=row.phone
  updateDialogVisible.value=true;
}
//修改老师信息提交按钮
const updateSubmitForm=async()=>{
  updateDialogVisible.value=false;
  const res=await myAxios.post('/admin/updateEntTeacherInfo',{
    id:formData.value.id,
    name:formData.value.name,
    gender:formData.value.gender=='男'?0:1,
    entLoginId:formData.value.entLoginId,
    entId:formData.value.entId,
    entName:formData.value.entName,
    department:formData.value.department,
    email:formData.value.email,
    phone:formData.value.phone,
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
  await getEntTeacherInfo()
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
  const res=await myAxios.post('/admin/addEntTeacherInfo',{
    name:formData.value.name,
    gender:formData.value.gender=='男'?0:1,
    entLoginId:formData.value.entLoginId,
    entId:formData.value.entId,
    entName:formData.value.entName,
    department:formData.value.department,
    email:formData.value.email,
    phone:formData.value.phone,
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
  await getEntTeacherInfo()
}
//取消事件
const addCancel=()=>{
  addDialogVisible.value = false;
}

/*提交数据时转换性别*/
const transInputGender=()=>{
  if(inputData.value.gender=='男'){
    return 0;
  }else if(inputData.value.gender=='女'){
    return 1;
  }
}

/*搜索按钮*/
const search=async()=>{
  const res=await myAxios.get('/admin/searchEntTeacherInfo',{params:{
      name:inputData.value.name,
      gender:transInputGender(),
      entLoginId:inputData.value.entLoginId,
      entName:inputData.value.entName,
    }})
  // console.log(res.data)
  tableData.value=res.data
  /*条件搜索后的分页总条数*/
  let count=0;
  for (let tableDataKey in tableData.value) {
    count=count+1;
  }
  total.value=count
  transGender()
}

/*重置按钮*/
const refresh=()=>{
  inputData.value.name=null;
  inputData.value.gender=null;
  inputData.value.entLoginId=null;
  inputData.value.entName=null;
  getEntTeacherInfo()
}
/*分页获取校内老师信息*/
const getEntTeacherInfo=async ()=>{
  const res=await myAxios.get("/admin/list/entTeacherInfo",{params:{
      current:currentPage.value,
      pageSize:pageSize.value
    }})
  console.log(res.data)
  tableData.value=res.data.tbEntTeas;
  transGender()
  total.value=res.data.total
}
//表格数据
const tableData=ref([])
/*输入框属性*/
const inputData=ref({
  name:null,
  gender:null,
  entLoginId:null,
  entName:null,
})
/*el-select选择器*/
const genderOptions = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
]



/*分页*/
const currentPage = ref(1)
const pageSize = ref(5)
const total=ref(12)

const handleSizeChange = (val) => {
  pageSize.value=val
  getEntTeacherInfo()
}
const handleCurrentChange = (val) => {
  currentPage.value=val
  getEntTeacherInfo()
}
const transGender=()=>{
  for (let tableDataKey in tableData.value) {
    if(tableData.value[tableDataKey].gender==0){
      tableData.value[tableDataKey].gender='男'
    }else if(tableData.value[tableDataKey].gender==1){
      tableData.value[tableDataKey].gender='女'
    }
  }
}
onBeforeMount(()=>{
  getEntTeacherInfo()
  transGender()
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