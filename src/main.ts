// @ts-ignore
import { createApp } from 'vue';
import App from './App.vue';
// 引入 ant design vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 引入图标
import * as Icons from '@ant-design/icons-vue'
// 引入路由
import router from './router';
// 引入 Pinia
import { createPinia } from 'pinia'
import VueFullscreen from 'vue-fullscreen'
// 引入 axios
import axios from 'axios';
// 对象复制
import objCoppy from './utils/objCoppy';
// 信息确定弹框
import myconfirm from './utils/myconfirm';


import './permission'

const app = createApp(App)
import { permission } from '@/directives/permission'
const pinia = createPinia()
// 全局挂载
app.config.globalProperties.$objCoppy = objCoppy
app.config.globalProperties.$myconfirm = myconfirm
// 注册图标主键
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
})
app.use(Antd)
app.use(router)
app.use(pinia)
app.use(VueFullscreen)

app.mount('#app')
app.directive('permission',permission)