<template>
  <div>
  	<div class="l-app page">
  		<!-- 标题栏 -->
      <transition>
        <header class="bar bar-nav l-bar-nav">
          <a class="pull-left icon icon-left" v-if="!mainPage" @click="$router.back()"></a>
          <a class="pull-right icon icon-refresh "></a>
          <h1 class="title" v-text="title"></h1>
        </header>
      </transition>
      <!-- 工具栏 -->
      <nav id="tabbar" class="bar bar-tab l-bar-tab" v-if="mainPage">
        <router-link class="tab-item" to="/index" :class="{'active': $route.path === '/index'}">
          <span class="icon l-icon">&#xe604;</span>
          <span class="tab-label">首页</span>
        </router-link>
        <router-link class="tab-item" to="/message" :class="{'active': $route.path === '/message'}">
          <span class="icon l-icon">&#xe685;</span>
          <span class="tab-label">动态</span>
        </router-link>
        <router-link class="tab-item" to="/shopcar" :class="{'active': $route.path === '/shopcar'}">
          <span class="icon l-icon">&#xe60a;</span>
          <span class="tab-label">购物车</span>
        </router-link>
        <router-link class="tab-item" to="/user" :class="{'active': $route.path === '/user'}">
          <span class="icon l-icon">&#xe740;</span>
          <span class="tab-label">我的</span>
        </router-link>
      </nav>
      <transition :name="direction">
        <router-view></router-view>  
      </transition>
  	</div>
    <div class="panel-overlay"></div>
    <!-- 车牌城市 -->
    <div class="panel panel-right panel-cover l-panel-big" id="panelCarCity">
      <header class="bar bar-nav">
        <h1 class="title" v-text="sltedCarCity.province">车辆城市</h1>
      </header>
      <div class="content">
        <ul class="l-car-prefix-list">
          <li v-for="item in sltedCarCity.city" @click="sltCarCity(item)">
            <span v-text="item.oldName"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 车牌城市 end-->
  </div>
</template>

<script>

export default {
	components: {
		
	},
	data() {
		return {
      direction: 'page',
      sltedCarCity: {}
		}
	},
	computed: {
		title() {
			return this.$route.meta.title || '懂车师兄'
		},
    mainPage() {
      return !!this.$route.meta.mainPage
    }
	},
  watch: {
    
  },
	created() {
    // 监听页面切换
    this.$eventHub.$on('APP-DIRECTION', (data)=>{
      this.direction = data
    })
    // 监听车辆城市选择
    this.$eventHub.$on('APP-CAR-CITY', (data)=>{
      this.sltedCarCity = data
      setTimeout(()=>{
        $.openPanel('#panelCarCity')
      }, 50)
    })

	},
	mounted() {
    $.init()
		console.log('mounted')
	},
	updated() {
		console.log('updated')
	},
  methods: {
    sltCarCity(item) {
      this.$storage.local.set('sltCarCity', item)
      $.closePanel('#panelCarCity')
      this.$router.go(-1)
    }
  }
}

</script>

<style>
@import '~src/styles/global.less';
.content{background: #f3f3f3;}
.l-panel-big{background-color: #fff; color: inherit;}
/* 车牌城市 */
.l-car-prefix-list{padding: 0.375rem;margin: 0;overflow: hidden;background: #fff;}
.l-car-prefix-list li{float: left;width: 33%;padding: 0.375rem;text-align: center;list-style: none;}
</style>
