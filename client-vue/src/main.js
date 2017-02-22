// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { storage, utils } from 'src/scripts/utils'
import App from './App'

Vue.use(VueRouter)

let eventHub = new Vue()
Vue.mixin({
  created() {
  	// zepto ajax
  	const baseUrl = 'http://twww.dongcheshixiong.com'
    this.$http = {
    	ajax(option = {}) {
    		option.url = baseUrl + option.url
    		$.ajax(option)
    	},
    	getJSON(url = '', params = {}) {
    		url = baseUrl + url
    		return new Promise((resolve, reject)=>{
    			$.getJSON(url, function(response){
	    			if(response.status_code !== 0){
	    				$.alert(response.status_msg)
	    			}
	    			resolve(response)
	    		})
    		})
    	}
    }

    // 本地缓存
    this.$storage = storage

    // 组件通信中心
    this.$eventHub = eventHub
  }
})


const routes = [
	{ 
		path: '/', 
		redirect: '/index'
	},
	{
		path: '/index',
		meta: { mainPage: true, title: '首页'	},
		component: (resolve) => require(['./pages/index'], resolve)
	},
	{
		path: '/message',
		meta: { mainPage: true, title: '动态'	},
		component: (resolve) => require(['./pages/message'], resolve)
	},
	// {
	// 	path: '/shopcar',
	// 	component: (resolve) => require(['./pages/shopcar'], resolve)
	// },
	// {
	// 	path: '/user',
	// 	component: (resolve) => require(['./pages/user'], resolve)
	// }
	{
		path: '/car/info',
		meta: { title: '车辆信息管理'	},
		component: (resolve) => require(['./pages/car-info'], resolve)
	},
	{
		path: '/car/brands',
		meta: { title: '车辆品牌'	},
		component: (resolve) => require(['./pages/car-brands'], resolve)
	},
	{
		path: '/car/family/:id',
		meta: { title: '品牌系列'	},
		component: (resolve) => require(['./pages/car-family'], resolve)
	},
	{
		path: '/car/city',
		meta: { title: '车牌城市'	},
		component: (resolve) => require(['./pages/car-city'], resolve)
	},
]

const router = new VueRouter({
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  },
  routes
})

// 记录页面浏览顺序，用来判断动画方向
let _history = {  count: 0 , prevPath: '/', currPath: '' }

// 调用发生在整个切换流水线之前。如果此钩子函数拒绝了切换，整个切换流水线根本就不会启动
router.beforeEach((to, from, next) => {
  console.log('%s router beforeEach!', to.path)
  // 记录当前地址和上一页地址
  _history.prevPath = from.path
  _history.currPath = to.path
  
  // 判断页面进场方向
  let toIndex = _history[to.path]
  let fromIndex = _history[from.path]
  
  
  if(!toIndex){
    // $.showPreloader()
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

  // from.path.startsWith(to.path) 安卓微信报错
  if(from.path){
    if(from.path.indexOf(to.path) === 0){
      eventHub.$emit('APP-DIRECTION', 'page-out')
    }else if(to.path.indexOf(from.path) === 0){
      eventHub.$emit('APP-DIRECTION', 'page-in')
    }
  }

  storage.session.set('_history', _history)
  setTimeout(next, 100)
})

// 此钩子函数一个类型为切换对象的参数，但是你只能访问此参数的 to 和 from 属性, 这两个属性都是路由对象。在这个后置钩子函数里不能调用任何切换函数。
router.afterEach((route) => {
  console.log('%s router afterEach!', route.path)
  // $.hidePreloader()
  utils.setTitle(route.meta.title)
  storage.session.set('_history', _history)
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
