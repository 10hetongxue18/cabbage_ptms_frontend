<template>
<!--个人信息页-->
  <el-container>
    <!--    侧边栏-->
    <el-aside width="200px">
      <!--      <h5 style="text-align: center">个人中心</h5>-->
      <el-menu
          default-active="1"
      >
        <el-menu-item index="1">
          <el-icon><User /></el-icon>
          <span>个人资料</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Star /></el-icon>
          <span>成绩报告</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><ChatLineRound /></el-icon>
          <span>实习通知</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Stamp /></el-icon>
          <span>我的信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!--主体-->
    <el-main>
      <el-card>
        <el-avatar :size="100" src="src/assets/宵宫.jpeg"/>
        <h3>小白菜</h3>
      </el-card>

      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col :span="4">
                <span>信息</span>
              </el-col>
              <el-col :span="20" :push="8">
                <el-button class="button" type="primary">编辑信息</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-row :gutter="20" align="bottom">
          <el-col :span="3">姓名</el-col>
          <el-col :span="4">白菜</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">性别</el-col>
          <el-col :span="4">男</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">年龄</el-col>
          <el-col :span="4">20</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">出生年月</el-col>
          <el-col :span="5">2002/01/02</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">联系电话</el-col>
          <el-col :span="5">18282061018</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">邮箱</el-col>
          <el-col :span="6">3433380878@qq.com</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">学号</el-col>
          <el-col :span="5">202004260047</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">学校</el-col>
          <el-col :span="6">湖南工业职业技术学院</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">院系</el-col>
          <el-col :span="5">信息工程学院</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">专业</el-col>
          <el-col :span="5">软件技术</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">年级</el-col>
          <el-col :span="5">2020</el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="3">班级</el-col>
          <el-col :span="5">计软-2</el-col>
        </el-row>
      </el-card>


    </el-main>
  </el-container>


</template>

<script setup>

</script>

<style scoped>
.box-card{
  margin-top: 20px;
}
.el-row{
  margin-top: 20px;
  font-family: 方正姚体;
}
</style>