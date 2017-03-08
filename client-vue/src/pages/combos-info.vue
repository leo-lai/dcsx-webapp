<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <footer class="l-page-footer l-border-t l-flex-hc">
        <router-link class="button button-fill l-btn l-rest" :to="'/combos/info/slt/' + combosInfo.suit_id">下单购买</a>
      </footer>
      <div class="content" v-show="combosInfo.suit_id">
        <!-- Slider -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img :src="combosInfo.banner">
            </div>
          </div>
        </div>
        <!-- Slider end-->
        <div class="l-padding l-bg l-border-b">
          <div class="l-flex-hc">
            <h3 class="l-rest" v-text="combosInfo.name"></h3>
            <span class="l-goods-coupon2" v-text="combosInfo.coupon_type"></span>
          </div>
          <div class="l-text-gray l-border-t" style="margin-top: 0.75rem; padding-top: 0.75rem;">
            有效期：{{combosInfo.valid}}
          </div>
        </div>
        <div class="l-panel-title l-margin-t">
          <span class="l-text-gray">套餐内容</span>
        </div>
        <div class="l-border-t l-bg l-padding-tb">
          <ul class="l-margin-0 l-fs-m" style="padding-left: 1.65rem;">
            <li v-for="item in serviceList">
              {{item.service_name}} x{{item.number}}
            </li>
          </ul>
        </div>

        <div class="l-panel-title l-border-b l-margin-t">
          <span class="l-text-gray">套餐描述</span>
        </div>
        <div class="l-bg l-padding l-margin-b" style="overflow:hidden;">
          <div v-html="combosInfo.detail"></div>
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
      buyPay: 0,
      combosInfo: {},
      serviceList: [],
      images: []
    }
  },
  methods: {
    toFixed(num = 0, point = 1) {
      return (num - 0).toFixed(point)
    }
  },
  created() {
    setTimeout(()=>{
      $.showIndicator()
      this.$server.combo.getInfo(this.$route.params.id)
      .then(({obj, img_list, list})=>{
        this.combosInfo = obj
        this.images = img_list
        this.serviceList = list
      }).finally(()=>{
        $.hideIndicator()
      })
    }, 600)
  }
}
</script>
<style scoped lang="less">
.l-goods-coupon2{
  background-color: #ff9100 ;color: #fff; display: inline-block;
  font-size: 0.6rem; padding:0.2rem 0.5rem; margin-right: -0.375rem;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%);
  clip-path: polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%);
}
</style>