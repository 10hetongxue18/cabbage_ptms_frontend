import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";

// import * as VueRouter from 'vue-router'

/**
 * 学生页面路由
 */
import StudentHomePage from "../pages/studentPages/basePages/StudentHomePage.vue"
import UserLoginPage from "../pages/studentPages/basePages/LoginPage.vue"
import StudentBasicLayout from "../pages/studentPages/layouts/StudentBasicLayout.vue"
import PersonalInfo from "../pages/studentPages/personalPages/PersonalInfo.vue"
import PersonalCenter from "../pages/studentPages/personalPages/PersonalCenter.vue"
import InternshipInfo from "../pages/studentPages/personalPages/InternshipInfo.vue"
import DailyDocuments from "../pages/studentPages/basePages/DailyDocuments.vue"
import NewsDetailsPage from "../pages/studentPages/basePages/NewsDetailsPage.vue"
import InternshipPlan from "../pages/studentPages/InternshipPages/InternshipPlan.vue"
import InternshipDoc from "../pages/studentPages/InternshipPages/InternshipDoc.vue"
import InternshipReport from "../pages/studentPages/InternshipPages/InternshipReport.vue"

/**
 * 校内老师页面路由
 */
import TeacherBasicLayout from "../pages/TeacherPages/layouts/TeacherBasicLayout.vue"
import TeacherHomePage from "../pages/TeacherPages/basePages/TeacherHomePage.vue"
import TeacherPersonalInfo from "../pages/TeacherPages/personalPages/TeacherPersonalInfo.vue"
import TeaInternshipInfo from "../pages/TeacherPages/InternshipPages/TeaInternshipInfo.vue"
import TeaInternshipPlan from "../pages/TeacherPages/InternshipPages/TeaInternshipPlan.vue"
import TeaInternshipDocument from "../pages/TeacherPages/InternshipPages/TeaInternshipDocument.vue"
import TeaInternshipReport from "../pages/TeacherPages/InternshipPages/TeaInternshipReport.vue"
import ReportProcessing from "../pages/TeacherPages/InternshipPages/ReportProcessing.vue"

/**
 * 企业老师页面路由
 */
import EntTeacherBasicLayout from "../pages/EntTeacherPages/layouts/EntTeacherBasicLayout.vue"
import EntTeacherHomePage from "../pages/EntTeacherPages/basePages/EntTeacherHomePage.vue"
// import UploadDailyDocuments from "../pages/EntTeacherPages/basePages/UploadDailyDocuments.vue"
import EntTeacherPersonalCenter from "../pages/EntTeacherPages/personalPages/EntTeacherPersonalCenter.vue"
import EntTeacherPersonalInfo from "../pages/EntTeacherPages/personalPages/EntTeacherPersonalInfo.vue"
// import EntTeaInternshipInfo from "../pages/EntTeacherPages/InternshipPages/EntTeaInternshipInfo.vue"
import EntTeaPost from "../pages/EntTeacherPages/InternshipPages/EntTeaPost.vue"
import EntTeaPositionApplication from "../pages/EntTeacherPages/InternshipPages/EntTeaPositionApplication.vue"
import EntTeaInternshipReport from "../pages/EntTeacherPages/InternshipPages/EntTeaInternshipReport.vue"

/**
 * 管理员页面路由
 */
import AdminBasicLayout from "../pages/adminPages/layouts/AdminBasicLayout.vue"
import AdminIndex from "../pages/adminPages/basePages/AdminIndex.vue"
import StudentBasicInfo from "../pages/adminPages/managePages/studentManagePages/StudentBasicInfo.vue"
import StudentInterInfo from "../pages/adminPages/managePages/studentManagePages/StudentInterInfo.vue"
import ClassManagement from "../pages/adminPages/managePages/ClassManagement.vue"
import SchTeacherManagement from "../pages/adminPages/managePages/SchTeacherManagement.vue"
import EntTeacherManagement from "../pages/adminPages/managePages/EntTeacherManagement.vue"
import NewsManagement from "../pages/adminPages/managePages/NewsManagement.vue"
import MessageManagement from "../pages/adminPages/managePages/MessageManagement.vue"
import InternshipInfoManagement from "../pages/adminPages/managePages/internshipManagePages/InternshipInfoManagement.vue"
import InternshipDocManagement from "../pages/adminPages/managePages/internshipManagePages/InternshipDocManagement.vue"


const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: UserLoginPage,name:'login'},
    /**
     * 学生页面路由
     */
    {path: '/studentBasicLayout', component: StudentBasicLayout, children: [
            {path: '/studentHomePage', name:'StudentHomePage', component: StudentHomePage ,props:{ newsletterPopup:false} ,meta:{title:'主页'}},
            // {path: '/personalCenter', name:'PersonalCenter', component: PersonalCenter, redirect:'/personalInfo',
            //     children: [
            //         {path: '/personalInfo', name:'PersonalInfo', component: PersonalInfo},
            //         {path: '/internshipInfo', name:'InternshipInfo', component: InternshipInfo},
            //     ]
            // },
            {path: '/personalInfo', name:'PersonalInfo', component: PersonalInfo ,meta:{title:'个人信息'}},
            {path: '/internshipInfo', name:'InternshipInfo', component: InternshipInfo, meta:{title:'实习信息'}},
            {path: '/newsDetailsPage', name:'NewsDetailsPage', component: NewsDetailsPage, meta:{title:'岗位详情'}},
            // {path: '/dailyDocuments', name:'DailyDocuments', component: DailyDocuments, meta:{title:''}},
            {path: '/internshipPlan', name:'InternshipPlan', component: InternshipPlan, meta:{title:'实习计划'}},
            {path: '/internshipDoc', name:'InternshipDoc', component: InternshipDoc, meta:{title:'实习文档'}},
            {path: '/internshipReport', name:'InternshipReport', component: InternshipReport, meta:{title:'实习报告'}},
        ]
    },

    /**
     * 校内老师页面路由
     */
    {path: '/teacherBasicLayout', name:'TeacherBasicLayout', component: TeacherBasicLayout, children: [
            {path: '/teacherHomePage', name:'TeacherHomePage', component: TeacherHomePage},
            {path: '/teacherPersonalInfo', name:'TeacherPersonalInfo', component: TeacherPersonalInfo},
            {path: '/teaInternshipInfo', name:'TeaInternshipInfo', component: TeaInternshipInfo},
            {path: '/teaInternshipPlan', name:'TeaInternshipPlan', component: TeaInternshipPlan},
            {path: '/teaInternshipDocument', name:'TeaInternshipDocument', component: TeaInternshipDocument},
            {path: '/teaInternshipReport', name:'TeaInternshipReport', component: TeaInternshipReport},
            {path: '/reportProcessing', name:'ReportProcessing', component: ReportProcessing},
        ]
    },

    /**
     * 企业老师页面路由
     */
    {path: '/entTeacherBasicLayout', name:'EntTeacherBasicLayout', component: EntTeacherBasicLayout, children: [
            {path: '/entTeacherHomePage', name:'EntTeacherHomePage', component: EntTeacherHomePage},
            {path: '/entTeacherPersonalInfo', name:'EntTeacherPersonalInfo', component: EntTeacherPersonalInfo},
            // {path: '/entTeacherPersonalCenter', name:'EntTeacherPersonalCenter', component: EntTeacherPersonalCenter, redirect:'/entTeacherPersonalInfo',
            //     children: [
            //         {path: '/entTeacherPersonalInfo', name:'EntTeacherPersonalInfo', component: EntTeacherPersonalInfo},
            //     ]
            // },
            {path: '/entTeaPost', name:'EntTeaPost', component: EntTeaPost},
            {path: '/entTeaPositionApplication', name:'EntTeaPositionApplication', component: EntTeaPositionApplication},
            {path: '/entTeaInternshipReport', name:'EntTeaInternshipReport', component: EntTeaInternshipReport},
        ]
    },

    /**
     * 管理员页面路由
     */
    {path: '/adminBasicLayout', name:'AdminBasicLayout', component: AdminBasicLayout, redirect:'/AdminIndex', meta:{title:'首页'}, children: [
            {path: '/adminIndex', name:'AdminIndex', component: AdminIndex, meta:{title:'主页'}},
            {path: '/studentBasicInfo', name:'StudentBasicInfo', component: StudentBasicInfo, meta:{title:'学生基本信息'}},
            {path: '/studentInterInfo', name:'StudentInterInfo', component: StudentInterInfo, meta:{title:'学生实习信息'}},
            {path: '/classManagement', name:'ClassManagement',  component: ClassManagement, meta:{title:'班级管理'}},
            {path: '/schTeacherManagement', name:'SchTeacherManagement', component: SchTeacherManagement, meta:{title:'校内指导老师管理'}},
            {path: '/entTeacherManagement', name:'EntTeacherManagement', component: EntTeacherManagement, meta:{title:'企业指导老师管理'}},
            {path: '/newsManagement', name:'NewsManagement', component: NewsManagement, meta:{title:'新闻管理'}},
            {path: '/messageManagement', name:'MessageManagement', component: MessageManagement, meta:{title:'消息管理'}},
            {path: '/internshipInfoManagement', name:'InternshipInfoManagement', component: InternshipInfoManagement, meta:{title:'实习信息管理'}},
            {path: '/internshipDocManagement', name:'InternshipDocManagement', component: InternshipDocManagement, meta:{title:'实习文档管理'}},
        ]},



]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

// 设置全局的前置导航守卫
// router.beforeEach((to, from, next) => {
//     // 如果跳转的目的路径是 login 界面, 不做操作
//     if (to.path === '/login') {
//         next()
//     } else {
//         /**
//          * 如果是其他界面, 判断本地是否存在 Token
//          * 如果存在, 则正常跳转
//          * 否则重定向到 login 界面
//          */
//         let token = localStorage.getItem('authorization')
//         if (!token) {
//             next('/login')
//         } else {
//             next()
//         }
//     }
// })



export default router