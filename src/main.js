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
      '^pages/consult/server/list/main'
    ], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    window: {
      navigationBarBackgroundColor: '#9a7acf',
      navigationBarTitleText: '在线问诊',
      navigationBarTextStyle: 'white',
      backgroundColor: '#f2f2f2'
    },
    tabBar: {
      color: '#333333',
      selectedColor: '#9a7acf',
      backgroudColor: '#FFFFFF',
      borderStyle: 'black',
      list: [
        {
          text: '找医生',
          pagePath: 'pages/consult/server/list/main',
          iconPath: 'static/images/nav-doctor.png',
          selectedIconPath: 'static/images/nav-doctor-select.png'
        },
        {
          text: '消息',
          pagePath: 'pages/consult/server/list/main',
          iconPath: 'static/images/nav-message.png',
          selectedIconPath: 'static/images/nav-message-select.png'
        },
        {
          text: '我的',
          pagePath: 'pages/consult/server/list/main',
          iconPath: 'static/images/nav-my.png',
          selectedIconPath: 'static/images/nav-my-select.png'
        }
      ]
    }
  }
}
