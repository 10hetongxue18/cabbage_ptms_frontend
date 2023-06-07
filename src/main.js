import { createApp } from 'vue'
// import './style.css'

import App from './App.vue'
import router from "./config/router.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//ElementPlus国际化配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



const app=createApp(App)

app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn,
})





app.mount('#app')
