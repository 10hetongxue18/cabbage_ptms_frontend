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
        <label style="padding: 10px;font-weight: bold">学号</label>
        <el-col :span="4">
          <el-input v-model="inputData.stuId" placeholder="请输入学号" clearable size="large" />
        </el-col>
        <label style="padding: 10px;font-weight: bold">实习状态</label>
        <el-col :span="4">
          <el-select v-model="inputData.state" clearable placeholder="请选择状态" size="large">
            <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px">
        <label style="padding: 10px;font-weight: bold;">实习地址</label>
        <el-col :span="4">
          <el-input v-model="inputData.address" placeholder="请输入实习地址" clearable size="large" />
        </el-col>
          <label style="padding: 10px;font-weight: bold;">企业名称</label>
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
          <el-button color="lightpink" plain icon="Plus">添加</el-button>
        </el-col>
      </el-row>

    </div>


    <el-card class="big-card">

      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>学生实习信息</span>
            <el-button class="button" text>todo</el-button>
          </div>
        </template>

            <el-table :data="tableData" stripe="true"   style="width: 100%;">
              <el-table-column prop="name" label="姓名" align="center"  width="100px"/>
              <el-table-column prop="gender" label="性别" align="center"  width="100px"/>
              <el-table-column prop="stuId" label="学号" align="center" width="125px"/>
              <el-table-column prop="address" label="实习地址" align="center"  width="120px"/>
              <el-table-column prop="entName" label="实习企业名称" align="center" width="120px"/>
              <el-table-column prop="leader" label="负责人" align="center" width="100px"/>
              <el-table-column prop="post" label="实习岗位" align="center" width="110px"/>
              <el-table-column prop="state" label="实习状态" align="center" width="100px"/>
              <el-table-column prop="createTime" label="开始时间" align="center" width="110px"/>
              <el-table-column prop="updateTime" label="结束时间" align="center" width="110px"/>
              <el-table-column prop="operate" label="操作" align="center">
                <el-button text icon="EditPen">修改</el-button>
                <el-button text icon="Delete">删除</el-button>
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
/*输入框属性*/
const inputData=ref({
  name: null,
  gender: null,
  stuId: null,
  state: null,
  address: null,
  entName: null,
})
/*搜索按钮*/
const search=async()=>{
  const res=await myAxios.get('/admin/searchInterInfo',{params:{
      name:inputData.value.name,
      gender:transGender(),
      stuId:inputData.value.stuId,
      state:inputData.value.state,
      address:inputData.value.address,
      entName:inputData.value.entName,
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
  transGender()
  transState()
}

/*重置按钮*/
const refresh=()=>{
  inputData.value.name=null;
  inputData.value.gender=null;
  inputData.value.stuId=null;
  inputData.value.state=null;
  inputData.value.address=null;
  inputData.value.entName=null;
  getInterInfo()
}

const tableData = ref([{
  name:'',
  gender:'',
  stuId:'',
  address:'',
  entName:'',
  leader:'',
  post:'',
  state:'',
  createTime:'',
  updateTime:'',
}])
/*分页获取学生实习信息*/
const getInterInfo=async ()=>{
  const res=await myAxios.get("/admin/list/InterInfo",{params:{
      current:currentPage.value,
      pageSize:pageSize.value
    }})
  console.log(res.data)
  tableData.value=res.data.tbInterInfos
  for (let tbStuInfosKey in res.data.tbStuInfos) {
    tableData.value[tbStuInfosKey].name=res.data.tbStuInfos[tbStuInfosKey].name
    tableData.value[tbStuInfosKey].gender=res.data.tbStuInfos[tbStuInfosKey].gender
  }
  transGender()
  transState()
  total.value=res.data.total
}

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
const stateOptions = [
  {
    value: '未实习',
    label: '未实习',
  },
  {
    value: '实习中',
    label: '实习中',
  },
]

/*分页*/
const currentPage = ref(1)
const pageSize = ref(10)
const total=ref(12)

const handleSizeChange = (val) => {
  pageSize.value=val
}
const handleCurrentChange = (val) => {
  currentPage.value=val
}

/*转换性别*/
const transGender=()=>{
  for (let tableDataKey in tableData.value) {
    if(tableData.value[tableDataKey].gender==0){
      tableData.value[tableDataKey].gender='男'
    }else if(tableData.value[tableDataKey].gender==1){
      tableData.value[tableDataKey].gender='女'
    }
  }
}
/*转换状态*/
const transState=()=>{
  for (let tableDataKey in tableData.value) {
    if(tableData.value[tableDataKey].state==0){
      tableData.value[tableDataKey].state='未实习'
    }else if(tableData.value[tableDataKey].state==1){
      tableData.value[tableDataKey].state='实习中'
    }
  }
}

onBeforeMount(()=>{
  getInterInfo()
  transGender()
  transState()
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