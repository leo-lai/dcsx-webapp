<template>
  <transition :name="direction">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
	data() {
		return {
      direction: 'page',
		}
	},
  methods: {
    scrollListener(){
      // 监听内容滚动
      this.$nextTick(()=>{
        setTimeout(()=>{
          let scrollTimeid = 0
          $('.content.infinite-scroll').on('scroll', function(e){
            clearTimeout(scrollTimeid)
            scrollTimeid = setTimeout(()=>{
              console.log($(this).scrollTop())
              $(this).scroll('refresh')
            }, 600)
          })
        }, 600)
      })
    }
  },
	created() {
    // 监听页面切换
    this.$eventHub.$on('APP-DIRECTION', (data)=>{
      this.direction = data
    })
	},
  mounted() {
    console.log('app mounted')
    this.scrollListener()
  },
  updated() {
    console.log('app updated')
    this.scrollListener()
  }
}
</script>
<style lang="less">
@import '~src/styles/base.less';
@import '~src/styles/global.less';
@import '~src/styles/transition.css';
</style>
