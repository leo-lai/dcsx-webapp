<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <div class="l-combo-list">
            <router-link class="l-combo-item" :to="'/combos/info/' + item.suit_id" v-for="item in scroll.alldata">
              <img class="_thumb" :src="item.banner">
              <div class="_name">
                <span class="l-goods-coupon2 pull-right" v-text="item.charge"></span>
                <h4 class="l-text-wrap1" v-text="item.name"></h4>
              </div>
            </router-link>
          </div>
          <!-- 
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
          -->
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
.l-combo-item{
  margin-bottom: 0.75rem;
  display: block;
  background: #fff;
  color: inherit;
  ._thumb{
    vertical-align: top;
    width: 100%;
    max-height: 10.0rem;
  }
  ._name{
    padding: 0.5rem 0.75rem;
  }
}
.l-goods-coupon2{
  background-color: #ff9100 ;color: #fff; display: inline-block; margin-top: -0.15rem;
  font-size: 0.6rem; padding:0.2rem 0.5rem; margin-right: -0.375rem;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%);
  clip-path: polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%);
}
</style>