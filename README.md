### Description
技术栈: vue3+ts+vite + pinia
ui框架: Element plus
功能：权限管理,动态路由,暗黑模式,改变主题色
### Example
后台管理系统 [在线地址](http://119.23.40.46/)

### #Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### plugin

rollup-plugin-visualizer 打包后分析各模块大小
pinia-plugin-persist pinia 持久化插件
vue-ls webStriage 存储结合 持久化使用
zdog 绘画3D模型
xe-utils js常用方法,项目使用了 [数据克隆clone] [扁平化数组变树状结构toArrayTree] [处理树状结构数据mapTree]

unplugin-auto-import 自动导入API,组件，项目配置 vue3 API,vue-rout API,Elemnet UI组件,el-icon
unplugin-vue-components 声明模块全局组件，配合 auto-iport 使用
unplugin-icons 声明全局 icon 组件，配合 auto-iport 使用
@iconify-json/ep 图标集[上万个,SVG图标，不是字体图标] [自动下载的插件/ep，enabledCollections自己配置,最好配置，否则有可能不自动生成声明组件]，
unplugin-icons 从这个库获取

vite-plugin-style-import 自动导入 ElMessage 等弹框css

vite-plugin-resolve-externals 配置某些模块CDN引入,减少包体积，提高首屏加载速度

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
