<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <div class="l-goods-list">
            <div class="row">
              <router-link class="col-50 l-goods-item l-text-default" :to="'/combos/info/' + item.suit_id" v-for="item in scroll.alldata">
                <span class="l-goods-coupon" v-text="item.charge"></span>
                <img class="l-thumb" :src="item.banner">
                <div class="l-padding-xs">
                  <h4 class="l-text-wrap1" v-text="item.name"></h4>
                </div>
              </router-link>
            </div>
          </div>
        </l-scroll>
      </div>
    </div>
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'
import lScroll from 'components/l-scroll'

export default {
  components: {
    lHeader, lScroll
  },
  data () {
    return {
      scroll: {}
    }
  },
  created() {
    this.scroll = this.$server.combo.getList()
    setTimeout(()=>{
      this.scroll.init()
    }, 600)
  }
}
</script>
<style scoped lang="less">
.l-goods-item{height: 10.5rem; overflow: hidden;}
</style>