<template>
  <!--实习文档页面-->
  <div>
    <el-card style="margin-top: 50px;margin-left: 20px;margin-right: 20px">
      <template #header>
        <div>
          <span style="font-family: 华文行楷;font-size: 25px;">实习周报</span>
        </div>
      </template>

      <el-container>
        <el-main>
          <el-row>
            <el-col :span="9">
<!--              <span style="font-family: 华文行楷;font-size: 20px">文档名</span>-->
              <el-select v-model="inputData.title" placeholder="请选择周报名" size="large" style="margin-left: 10px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <div style="margin: 30px 0" />
          <div style="width: 60%">
            <el-input
                v-model="textarea"
                :autosize="{ minRows: 15, maxRows: 15 }"
                type="textarea"
                show-word-limit
                minlength="300"
                maxlength="1000"
                placeholder="请填写文档内容（限定字数300）
    1.岗位任务及完成情况
    2.心得与体会
    3.存在问题与解决办法"
            />
          </div>
          <el-row style="margin-top: 20px">
            <el-col :span="3" >
              <el-button type="primary" plain icon="DocumentAdd" @click="submitFile()">提交</el-button>
            </el-col>
            <el-col :span="3" >
              <el-button color="lightcoral" plain icon="Refresh" @click="reset()">重置</el-button>
            </el-col>
          </el-row>
        </el-main>
        <el-aside width="20%">
          <div style="text-align: center">
                <el-select v-model="selectData.state" class="m-2" placeholder="请选择周报..." size="small" @change="selectDocState()">
                  <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
          </div>
          <el-table :data="DocumentInfo" stripe style="width: 100%">
            <el-table-column prop="title" label="名称"  align="center" width="100px"/>
            <el-table-column prop="state" label="状态"  align="center" width="90px"/>
            <el-table-column prop="operate" label="操作" align="center" >
              <template #default="scope">
                <el-tooltip content="点击查看内容" placement="right" effect="light">
                  <el-button text icon="Pointer" @click="showDoc(scope.row)">查看</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-aside>
      </el-container>
    </el-card>

  </div>

</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import myAxios from "../../../plugins/myAxios.js";
const textarea = ref('')

    /*存储文档信息*/
    const DocumentInfo=ref();

    /*文档标题*/
    const inputData=ref({
      title:'',
    })

    /*更新文档*/
    // const updateFile=async ()=>{
    //   const res=await myAxios.post('student/updateDocument',{
    //     title:inputData.value.title,
    //     content:valueHtml.value
    //   })
    //   console.log(res.data)
    //   if(res.code===0){
    //     ElMessage({
    //       message: '更新成功',
    //       type: 'success',
    //       center:true,
    //       offset:50,
    //     })
    //   }
    // }


    /*查看文档详情*/
    const showDoc=(row)=>{
      console.log(row.content)
      textarea.value=row.content
    }

    /*提交文档*/
    const submitFile=async ()=>{
      if(inputData.value.title==''){
        ElMessage({
          message: '请选择文档名！',
          type: 'warning',
          offset: 110,
        })
      }else if(textarea.value==''){
        ElMessage({
          message: '请补充完整文档！',
          type: 'warning',
          offset: 110,
        })
      }else{
        console.log(inputData.value.title)
        const res=await myAxios.post('student/addSubmitDoc',{
          title:inputData.value.title,
          content:textarea.value
        })
        console.log(res.data)
        /*回显数据*/
        await getDocument()
        reset()
        if(res.code===0){
          ElMessage({
            message: '提交成功',
            type: 'success',
            center:true,
            offset:50,
          })
        }
      }
    }

    /*重置文档*/
    const reset=()=>{
      textarea.value=''
    }
    /*获取文档信息*/
    const getDocument=async ()=>{
      const res=await myAxios.get("student/getDocument",{
        params:{
          state:1
        }
      })
      // console.log(res.data)
      DocumentInfo.value=res.data
      transNum()
    }

    const selectData=ref({
      state:'',
    })
    /*文档状态选择器*/
    const selectDocState=async ()=>{
      const res=await myAxios.get("student/getDocument",{
        params:{
          state:selectData.value.state
        }
      })
      console.log(res.data)
      DocumentInfo.value=res.data
      transNum()
    }

    const value = ref('')

    const stateOptions = [
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
      },
    ]
    //转换数字
    const transNum=()=>{
      for (const documentInfoKey in DocumentInfo.value) {
        if(DocumentInfo.value[documentInfoKey].state==0){
          DocumentInfo.value[documentInfoKey].state='未提交';
        }else if(DocumentInfo.value[documentInfoKey].state==1){
          DocumentInfo.value[documentInfoKey].state='已提交';
        } else if(DocumentInfo.value[documentInfoKey].state==2){
          DocumentInfo.value[documentInfoKey].state='已审查';
        }
      }
    }
    /*选择器内容*/
    const options = [
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

</style>