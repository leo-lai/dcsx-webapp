// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import FastClick from 'fastclick'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { storage, utils } from 'src/scripts/utils'
import server from './server'
import routes from './routes'
import App from './App'
// FastClick.attach(document.body)

// 组件通信中心
const eventHub = new Vue()
Vue.mixin({
  created() {
    this.$eventHub = eventHub
  }
})

// 路由
Vue.use(VueRouter)
Vue.mixin({
  created() {
    // 可访问外部链接
    this.$link = function(url){
      if(!url) return

      if(/^http(s?)/i.test(url)){
        window.location.assign(url)
      }else{
        this.$router.push(url)
      }
    }
  }
})

const router = new VueRouter({
  routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})

// 记录首次进入app的路径，用于微信授权登录
storage.session.set('wx_url', window.location.href)

// 验证登陆
storage.local.set('token', 'QM6RhCq_ayTbINJR6q4wenSDQw7uz_b5BzdlyPfZ39cM6qDKgjPIRKR1FvSJfp8relwZqumxswSZyiN5bUkCy7fY_a0BcdkcxRJirQtdwV0dLM_c')
router.beforeEach((to, from, next) => {
  let isCheckLogin = to.meta.auth
  
  if(isCheckLogin === undefined) {
    isCheckLogin = true
  }
  if(isCheckLogin && !storage.local.get('token')){
    server.logout()
    return
  }
  next()
})

// 记录页面浏览顺序，用来判断动画方向
let _history = {  count: 0 , prevPath: '/', currPath: '' }

// 调用发生在整个切换流水线之前
router.beforeEach((to, from, next) => {
  // 记录当前地址和上一页地址
  _history.prevPath = from.path
  _history.currPath = to.path
  
  // 判断页面进场方向
  let toIndex = _history[to.path]
  let fromIndex = _history[from.path]
  
  if(!toIndex){
    $.showIndicator()
    _history[to.path] = ++_history.count
  }

  if(!from.path || (from.meta.mainPage && to.meta.mainPage)){
    eventHub.$emit('APP-DIRECTION', 'page-')
  }else if(!from.meta.mainPage && to.meta.mainPage){
    eventHub.$emit('APP-DIRECTION', 'page-out') 
  }else if(from.meta.mainPage && !to.meta.mainPage){
    eventHub.$emit('APP-DIRECTION', 'page-in') 
  }else if(!(toIndex < fromIndex)){
    eventHub.$emit('APP-DIRECTION', 'page-in')
  }else{
    eventHub.$emit('APP-DIRECTION', 'page-out')
  }

  if(to.query && to.query.direction){
    eventHub.$emit('APP-DIRECTION', to.query.direction)
  }

  if(from.path){
    // from.path.startsWith(to.path) 安卓微信报错
    if(from.path.indexOf(to.path) === 0){
      eventHub.$emit('APP-DIRECTION', 'page-out')
    }else if(to.path.indexOf(from.path) === 0){
      eventHub.$emit('APP-DIRECTION', 'page-in')
    }
  }

  next()
})

router.afterEach((route) => {
  $.hideIndicator()
  utils.setTitle(route.meta.title)
  storage.session.set('_history', _history)
})

router.onReady(()=>{
  setTimeout(()=>{
    $.init()
  }, 50) 
})

Vue._router = router
/* eslint-disable no-new */
const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

