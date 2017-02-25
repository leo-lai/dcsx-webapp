<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <router-link class="l-shop-category" :to="'/shop/goods/' + item.cateid" v-for="item in category1">
          <img :src="item.picpath">
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
<style scoped>
.l-shop-category{display: block;margin:0.75rem;}
.l-shop-category img{display: block; width: 100%; max-height: 10.0rem;}
</style>