<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <router-link class="l-shop-category" :to="'/shop/goods/' + item.cateid" v-for="item in category1">
          <img :src="item.picpath">
        </router-link>
        <div class="l-data-null" v-if="isAjax && category1.length === 0">
          <img src="~assets/shuju.png" alt="">
          <p>没有相关数据</p>
        </div>
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
      category1: [], // 一级分类
      isAjax: false
    }
  },
  created() {
    $.showIndicator()
    this.$server.shop.getCategory1().then(({list})=>{
      setTimeout(()=>{
        this.isAjax = true
        this.category1 = list
      }, 600)
    }).finally(()=>{
      $.hideIndicator()
    })
    
  }
}
</script>
<style scoped>
.l-shop-category{display: block;margin:0.75rem;}
.l-shop-category img{display: block; width: 100%; max-height: 10.0rem;}
</style>