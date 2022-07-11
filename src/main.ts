import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/router/guards'
// import '@/mock'
import '@/axios'
// 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import "@/styles/common.less";
import "nprogress/nprogress.css";
import 'element-plus/theme-chalk/index.css'
import piniaPersist from 'pinia-plugin-persist'
import "default-passive-events"; //浏览器警告



const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
