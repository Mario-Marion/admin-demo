import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/router/guards'
// import '@/mock'
import '@/axios'
// 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'element-plus/theme-chalk/index.css'
import "@/styles/common.less";
import "nprogress/nprogress.css";
import piniaPersist from 'pinia-plugin-persist'
import "default-passive-events"; //浏览器警告



const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
