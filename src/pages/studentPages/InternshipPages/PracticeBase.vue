<template>
<!--实习基地页-->
<!--  <el-skeleton :rows="11" animated/>-->
  <div v-if="tableData==null" class="mainBox">
    <el-empty description="暂无数据" />
  </div>
  <div style="margin: 30px auto" v-else>
    <!--  <el-skeleton :rows="11" animated/>-->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>实习基地</span>
        </div>
      </template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="picture" label="基地风光" width="200" />
        <el-table-column prop="address" label="基地地址" width="250" />
        <el-table-column prop="content" label="实习内容" width="200" />
        <el-table-column prop="internshipTeacher" label="实习联系人" width="200" />
        <el-table-column prop="operate" label="操作" >
          <el-button type="primary">查看详情</el-button>
        </el-table-column>
      </el-table>
    </el-card>


  </div>

</template>

<script setup>
const tableData = [
  {
    picture: '',
    address: '广东省深圳市腾讯计算机有限公司',
    content:'前端工程师',
    internshipTeacher:'王老师',
  },
  {
    picture: '',
    address: '广东省深圳市腾讯计算机有限公司',
    content:'前端工程师',
    internshipTeacher:'王老师',
  },
  {
    picture: '',
    address: '广东省深圳市腾讯计算机有限公司',
    content:'前端工程师',
    internshipTeacher:'王老师',
  },
  {
    picture: '',
    address: '广东省深圳市腾讯计算机有限公司',
    content:'前端工程师',
    internshipTeacher:'王老师',
  },
]
</script>

<style scoped>
/*卡片头*/
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}
</style>