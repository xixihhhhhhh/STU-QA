import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
// 导入全局样式表
import './assets/css/global.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false



// 引入高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
// 注册指令
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线,$bus就是当前应用的vm
  }
}).$mount('#app')
