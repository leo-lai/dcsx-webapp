<template>
  <transition :name="direction">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
	data() {
		return {
      direction: 'page-in',
		}
	},
	created() {
    // 监听页面切换
    this.$eventHub.$on('APP-DIRECTION', (data)=>{
      this.direction = data
    })
	}
}
</script>
<style lang="less">
@import '~src/styles/base.less';
@import '~src/styles/global.less';
@import '~src/styles/transition.css';
</style>
