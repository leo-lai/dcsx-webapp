<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-goods-list">
          <div class="row">
            <router-link class="col-50 l-goods-item l-text-default" :to="'/combos/info/' + item.suit_id" v-for="item in goodsList">
              <span class="l-goods-coupon" v-text="item.charge"></span>
              <img class="l-thumb" :src="item.banner">
              <div class="l-padding-xs">
                <h4 class="l-text-wrap1" v-text="item.name"></h4>
              </div>
            </router-link>
          </div>
        </div>
        <div class="l-data-null" v-if="goodsList.length === 0">
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
      goodsList: []
    }
  },
  created() {
    setTimeout(()=>{
      $.showIndicator()
      this.$server.combo.getList(1, 10).then(({list})=>{
        $.hideIndicator()
        this.goodsList = list
      })
    }, 600)
  }
}
</script>
<style scoped lang="less">
.l-goods-item{height: 10.5rem; overflow: hidden;}
</style>