import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Loading from './plugins/loading'

Vue.use(Loading);

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()

wx.setEnableDebug({
  enableDebug: process.env.NODE_ENV === 'development'
})

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/consult/server/index/main',
      'pages/consult/server/list/main',
      'pages/consult/server/detail/main',
      'pages/consult/server/message/main',
      'pages/user/main'
    ], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    window: {
      navigationBarBackgroundColor: '#FF8DA1',
      navigationBarTitleText: '首页',
      navigationBarTextStyle: 'white',
      backgroundColor: '#f2f2f2'
    },
    tabBar: {
      color: '#333333',
      selectedColor: '#FF8DA1',
      backgroudColor: '#FFFFFF',
      borderStyle: 'black',
      list: [
        {
          text: '服务',
          pagePath: 'pages/consult/server/index/main'
        },
        {
          text: '我',
          pagePath: 'pages/user/main'
        }
      ]
    }
  }
}
