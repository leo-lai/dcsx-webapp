<template>
	<!-- 工具栏 -->
  <nav class="bar bar-tab l-bar-tab">
    <router-link class="tab-item" to="/index" replace active-class="active">
      <span class="icon l-icon">&#xe604;</span>
      <span class="tab-label">首页</span>
    </router-link>
    <router-link class="tab-item" to="/message" replace active-class="active">
      <span class="icon l-icon">&#xe685;</span>
      <span class="tab-label">动态</span>
    </router-link>
    <router-link class="tab-item" to="/shopcar" replace active-class="active">
      <span class="icon l-icon">&#xe60a;</span>
      <span class="tab-label">购物车</span>
    </router-link>
    <router-link class="tab-item" to="/user" replace active-class="active">
      <span class="icon l-icon">&#xe740;</span>
      <span class="tab-label">我的</span>
    </router-link>
  </nav>
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