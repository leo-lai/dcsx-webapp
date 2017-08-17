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
      const self = this
      // 监听内容滚动
      this.$nextTick(()=>{
        let scrollTimeid = 0
        $('.content.l-infinite-scroll').off('scroll')
        .on('scroll', function(e){
          clearTimeout(scrollTimeid)
          scrollTimeid = setTimeout(()=>{
            if(this.scrollTop - 30 <= 0){
              console.log('到顶部了')

            }else if(this.scrollTop + this.clientHeight >= this.scrollHeight - 50){
              console.log('到底部了')
              self.$eventHub.$emit('APP-SCROLL-BOTTOM')
            }
          }, 600)
        })
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
    // console.log('app mounted')
    this.scrollListener()
  },
  updated() {
    // console.log('app updated')
    this.scrollListener()
  }
}
</script>
<style lang="less">
@import '~src/styles/base.less';
@import '~src/styles/global.less';
@import '~src/styles/transition.less';
</style>
