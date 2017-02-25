<template>
  <transition :name="direction">
    <router-view></router-view>  
  </transition>
</template>

<script>

export default {
	components: {
		
	},
	data() {
		return {
      direction: 'page',
		}
	},
  watch: {
    
  },
	created() {
    // 监听页面切换
    this.$eventHub.$on('APP-DIRECTION', (data)=>{
      this.direction = data
    })
	},
	mounted() {
    this.initSui()
	},
	updated() {
    
	},
  methods: {
    // sui mobile 初始化
    initSui() {
      this.$nextTick(()=>{
        setTimeout(()=>{
          $.init()  
        }, 500)  
      })
    }
  }
}

</script>

<style lang="less">
@import '~src/styles/base.less';
@import '~src/styles/global.less';
@import '~src/styles/transition.css';
.l-app{position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow-x: hidden;}
</style>
