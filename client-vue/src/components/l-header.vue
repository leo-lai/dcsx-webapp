<template>
	<!-- 标题栏 -->
  <header class="bar bar-nav l-bar-nav" v-if="!$device.isWechat">
    <a class="pull-left icon icon-left" v-if="!mainPage" @click="$router.back()"></a>
    <!-- <a class="pull-right icon icon-refresh "></a> -->
    <h1 class="title" v-text="title"></h1>
  </header>
</template>
<script>
export default {
	computed: {
		title() {
			return this.$route.meta.title || '懂车师兄'
		},
    mainPage() {
      return !!this.$route.meta.mainPage
    }
	}
}
</script>
<style>
	
</style>