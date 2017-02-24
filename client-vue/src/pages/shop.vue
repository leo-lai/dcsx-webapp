<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <router-link class="l-block l-margin" :to="'/shop/goods/' + item.cateid" v-for="item in category1">
          <img class="l-block" :src="item.picpath">
        </router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'

export default {
  components: {
    lHeader
  },
  data () {
    return {
      category1: [] // 一级分类
    }
  },
  created() {
    setTimeout(()=>{
      this.$server.shop.getCategory1(1, 10).then(({list})=>{
        this.category1 = list
      })
    }, 600)
  }
}
</script>
<style>
</style>