<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <footer class="l-page-footer l-flex-hc l-border-t">
        <div class="l-rest">
          <div class="l-icon-shocar l-text-gray" @click="$link('/shopcar', 'page-in')">
            <span class="icon l-icon">&#xe60a;</span>
            <span class="badge" v-text="shopcarNum"></span>
          </div>
        </div>
        <button style="width: 6.0rem;" class="button button-fill l-btn l-btn-blue2" @click="addToShopcar">加入购物车</button>
        <button style="width: 6.0rem;" class="button button-fill l-btn l-btn-blue" @click="$link(`/order/confirm/${goodsInfo.id}`, 'page-in')">
          立即购买
        </button>
      </footer>
      <div class="content" v-show="goodsInfo.id">
        <div class="l-banner">
          <img :src="goodsInfo.picpath">
        </div>
        <div class="l-padding l-bg l-border-b">
          <h3 v-text="goodsInfo.goods_name"></h3>
          <div class="l-margin-t-s">
            <strong class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{goodsInfo.market_price}}</strong>&ensp;&ensp;
            <del class="l-text-gray"><i class="l-icon">&#xe6cb;</i>{{goodsInfo.cost_price}}</del>
          </div>
        </div>
        <div class="l-panel-title l-border-b l-margin-t">
          <h3>商品描述</h3>
        </div>
        <div class="l-bg l-padding" style="overflow:hidden;">
          <div v-html="goodsInfo.detail"></div>
          <img class="l-margin-t-s l-block" :src="item.image_path" v-for="item in images">
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
      submiting: false,
      shopcarNum: 0,
      goodsInfo: {},
      images: []
    }
  },
  methods: {
    addToShopcar() {
      $.showIndicator()
      this.$server.shopcar.add(this.goodsInfo.id, 1).then(({obj})=>{
        $.hideIndicator()
        this.shopcarNum = obj.total
        $.toast('已加入购物车', 2000, 'l-toast')
      }).catch(()=>{
        $.hideIndicator()
      })
    }
  },
  created() {
    setTimeout(()=>{
      $.showIndicator()
      // 获取商品详情
      this.$server.shop.getGoodsInfo(this.$route.params.id)
      .then(({obj, list})=>{
        this.images = list
        this.goodsInfo = obj
      }).finally(()=>{
        $.hideIndicator()
      })

      // 获取购物车数量
      this.$server.shopcar.getList().then(({list})=>{
        this.shopcarNum = list.length
      })
    }, 600)
  }
}
</script>
<style scoped lang="less">
.l-icon-shocar{position: relative;width: 2.0rem; display: inline-block; font-size: 1.2rem; text-align: center; margin: 0.15rem 0 0 0.375rem;}
.l-icon-shocar .badge{position: absolute; top: 0; right: 0;}
</style>