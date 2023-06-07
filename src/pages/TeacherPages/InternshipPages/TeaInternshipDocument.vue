<template>
  <!--实习文档页面-->
  <div style="margin-right:40px;margin-left:40px;margin-top: 70px">
    <el-card >
      <template #header>
        <div class="card-header">
          <span style="font-family: 华文行楷;font-size: 25px">学生周报审核<el-icon size="large"><Tickets /></el-icon></span>
        </div>
      </template>
      <el-container>
        <el-main>
          <div>
            <h4 style="text-align: center">待审核的周报</h4>
          </div>
          <el-table :data="DocumentInfo" border height="600" stripe style="width: 100%">
            <el-table-column fixed prop="name" label="姓名"  align="center" width="100px"/>
            <el-table-column prop="gender" label="性别"  align="center" width="100px"/>
            <el-table-column prop="stuId" label="学号"  align="center" />
            <el-table-column prop="faculty" label="院系"  align="center" />
            <el-table-column prop="major" label="专业"  align="center" />
            <el-table-column prop="grade" label="年级"  align="center" />
            <el-table-column prop="classes" label="班级"  align="center" />
            <el-table-column prop="title" label="周报名"  align="center" />
            <el-table-column prop="state" label="状态"  align="center" />
            <!--            <el-table-column :fixed="'right'" prop="operate" label="操作" align="center" >-->
            <el-table-column prop="operate" label="操作" align="center" >
              <template #default="scope">
                <el-tooltip content="点击查看内容" placement="bottom" effect="light">
                  <el-button text icon="Pointer" @click="showDoc(scope.row)">查看</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-aside width="500px">
          <div>
            <h4 style="text-align: center">已审核的周报</h4>
          </div>
          <el-table :data="passDocumentInfo" border height="600" stripe style="width: 100%">
            <el-table-column fixed prop="name" label="姓名"  align="center" width="100px"/>
<!--            <el-table-column prop="gender" label="性别"  align="center" width="100px"/>-->
<!--            <el-table-column prop="stuId" label="学号"  align="center" />-->
<!--            <el-table-column prop="faculty" label="院系"  align="center" />-->
            <el-table-column prop="major" label="专业"  align="center" />
<!--            <el-table-column prop="grade" label="年级"  align="center" />-->
            <el-table-column prop="classes" label="班级"  align="center" />
            <el-table-column prop="title" label="周报名"  align="center" />
            <el-table-column prop="state" label="状态"  align="center" />
<!--            <el-table-column prop="operate" label="操作" align="center" >-->
<!--              <template #default="scope">-->
<!--                <el-tooltip content="点击查看内容" placement="bottom" effect="light">-->
<!--                  <el-button text icon="Pointer" @click="showDoc(scope.row)">查看</el-button>-->
<!--                </el-tooltip>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </el-aside>
      </el-container>
    </el-card>

<!--  侧边框  -->
    <el-drawer v-model="drawer" :direction="direction" size="50%">
      <template #title>
        <div style="text-align: center">
          <h4 style="font-family: 华文行楷;font-size: 25px;">实习周报审查</h4>
        </div>
      </template>
      <template #default>

        <el-card style="position: fixed;">
          <template #header>
            <div style="text-align: center">
              <span style="font-family: 华文行楷;font-size: 25px;"></span>
              <el-descriptions title="实习周报信息" column="3" >
                <el-descriptions-item label="姓名：">{{inputData.name}}</el-descriptions-item>
                <el-descriptions-item label="学号：">{{ inputData.stuId }}</el-descriptions-item>
                <el-descriptions-item label="班级：">{{ inputData.classes }}</el-descriptions-item>
                <el-descriptions-item label="性别：">{{ inputData.gender }}</el-descriptions-item>
                <el-descriptions-item label="实习周报名：">{{ inputData.title }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </template>


          <!--  富文本编辑器    -->
          <div style="border: 1px solid #ccc;">
            <Toolbar
                style="border-bottom: 1px solid #ccc;"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 380px; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
          </div>
        </el-card>

      </template>
      <template #footer>
        <div style="flex: auto;">
          <el-row justify="space-evenly">
            <el-col :span="5">
              <el-button type="primary" plain @click="confirmClick">周报评分</el-button>
            </el-col>
            <el-col :span="5">
<!--              <el-button type="danger" plain>驳回文档</el-button>-->
            </el-col>
            <el-col :span="5">
              <el-button type="info" plain @click="cancelClick">取消</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-drawer>


    <!-- dialog -->
    <el-dialog
        v-model="updateDialogVisible"
        title="实习周报评分"
        width="60%"
        align-center
        style="border-radius: 10px;"
        draggable
        center
    >

      <el-descriptions title="学生信息">
        <el-descriptions-item label="姓名：">{{inputData.name}}</el-descriptions-item>
        <el-descriptions-item label="性别：">{{inputData.gender}}</el-descriptions-item>
        <el-descriptions-item label="学号：">{{inputData.stuId}}</el-descriptions-item>
        <el-descriptions-item label="年级：">{{inputData.grade}}</el-descriptions-item>
        <el-descriptions-item label="班级：">{{inputData.classes}}</el-descriptions-item>
        <el-descriptions-item label="实习周报名：">{{inputData.title}}</el-descriptions-item>
        <el-descriptions-item label="实习文档状态：">{{inputData.state}}</el-descriptions-item>
        <el-descriptions-item label="成绩：">
          <el-select v-model="inputData.remarks" clearable placeholder="请选择成绩" size="large">
            <el-option
                v-for="item in resultOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-descriptions-item>
      </el-descriptions>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateCancel()">取消</el-button>
        <el-button type="primary" @click="updateSubmitForm()">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>



  </div>

</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import myAxios from "../../../plugins/myAxios.js";
import {ElMessageBox} from "element-plus";

export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref('')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      getStuDocument()
      getStuPassDocument()
      transNum()
      setTimeout(() => {
        // valueHtml.value = '<p></p>'

        // updateFile()
      }, 1500)
    })

    /*工具栏配置*/
    const toolbarConfig = {

    }

    const editorConfig = { placeholder: '请及时撰写实习周报...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }


    /*region*/
    /*文档信息*/
    const inputData=ref({
      id:'',
      name:'',
      stuId:'',
      grade:'',
      classes:'',
      title:'',
      state:'',
      remarks:'',
    })
    /*dialog弹出框*/
    //是否弹出
    const updateDialogVisible = ref(false)
    //实习文档评分按钮
    const updateSubmitForm=async()=>{
      if(inputData.value.remarks==null){
        ElMessage.info('请进行评分！')
      }else{
        const res=await myAxios.post('/teacher/updateStudentDocInfo',{
          id:inputData.value.id,
          state:inputData.value.state=='未提交'?0:1,
          remarks:inputData.value.remarks
        })
        console.log(res.data)
        if(res.code===0){
          ElMessage({
            message: '评分成功',
            type: 'success',
            center:true,
            offset:100,
          })
        }
        /*关闭dialog*/
        updateDialogVisible.value=false;
        //回调获取学生实习文档信息接口
        await getStuDocument()
      }

    }
//取消事件
    const updateCancel=()=>{
      updateDialogVisible.value = false;
    }

    /*endregion*/


    /*查看文档详情*/
    const showDoc=(row)=>{
      // console.log(row.content)
      drawer.value = true
      inputData.value=row
      transNum()
      valueHtml.value=row.content
    }
    /*重置文档*/
    const reset=()=>{
      valueHtml.value=''
    }

    /*侧边框*/
    const drawer = ref(false)
    const direction = ref('rtl')
    const cancelClick=()=> {
      drawer.value = false
    }
    const confirmClick=()=> {
      ElMessageBox.confirm(
          `是否要给该学生评分?`,
          {
            center: true,
            draggable: true,
          }
      )
          .then(() => {
            updateDialogVisible.value = true
            drawer.value = false
          })
          .catch(() => {
            // catch error
          })
    }
    /*存储待审核文档信息*/
    const DocumentInfo=ref();
    /*存储已审核文档信息*/
    const passDocumentInfo=ref();
    /*获取待审核学生文档信息*/
    const getStuDocument=async ()=>{
      const res=await myAxios.get("teacher/getStuDocument")
      // console.log(res.data)
      DocumentInfo.value=res.data
      transNum()
    }
    /*获取已审核学生文档信息*/
    const getStuPassDocument=async ()=>{
      const res=await myAxios.get("teacher/getStuDocument", {
        params:{
          docState:2
        }
      })
      // console.log(res.data)
      passDocumentInfo.value=res.data
      for (let i = 0; i <passDocumentInfo.value.length ; i++) {
        if(passDocumentInfo.value[i].state==2){
          passDocumentInfo.value[i].state='已审核';
        }
      }
      transNum()
    }
    //转换数字
    const transNum=()=>{
      for (const documentInfoKey in DocumentInfo.value) {
        if(DocumentInfo.value[documentInfoKey].gender==0){
          DocumentInfo.value[documentInfoKey].gender='男';
        }else if(DocumentInfo.value[documentInfoKey].gender==1){
          DocumentInfo.value[documentInfoKey].gender='女';
        }
        if(DocumentInfo.value[documentInfoKey].state==0){
          DocumentInfo.value[documentInfoKey].state='未提交';
        }else if(DocumentInfo.value[documentInfoKey].state==1){
          DocumentInfo.value[documentInfoKey].state='已提交';
        }
      }
    }
    /*选择器内容*/
    const resultOptions = [
      {
        value: 'A',
        label: 'A',
      },
      {
        value: 'B',
        label: 'B',
      },
      {
        value: 'C',
        label: 'C',
      },
      {
        value: 'D',
        label: 'D',
      },
    ]

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      reset,
      getStuDocument,
      showDoc,
      transNum,
      inputData,
      DocumentInfo,
      resultOptions,
      updateDialogVisible,
      updateSubmitForm,
      updateCancel,
      drawer,
      direction,
      cancelClick,
      confirmClick,
      getStuPassDocument,
      passDocumentInfo,
    };
  }
}
</script>

<style scoped>

</style>