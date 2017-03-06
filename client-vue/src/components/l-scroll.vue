<template>
  <div>
  	<slot></slot>
    <div class="l-data-null" v-if="scroll.isAjax && scroll.alldata.length === 0">
      <slot name="data-null">
        <img src="~assets/shuju.png">
        <p>没有相关数据</p>
      </slot>  
    </div>
    <div v-show="!scroll.isNull" class="infinite-scroll-preloader">
      <div class="preloader"></div>
    </div>
    <div v-show="scroll.isNull && scroll.alldata.length > 0" class="infinite-scroll-preloader">
      <span>没有更多了</span>
    </div>
  </div>
</template>
<script>
export default {
	props: {
    scroll: {
      type: Object,
      default: {
        isNull: false,
        isLoding: false,
        isAjax: false,
        alldata: [],
        next() {}
      }
    }
  },
  created() {
    // 监听滚动到底部
    this.$eventHub.$on('APP-SCROLL-BOTTOM', ()=>{
      this.scroll.next()
    })
  }
}
</script>
<style>
	
</style>