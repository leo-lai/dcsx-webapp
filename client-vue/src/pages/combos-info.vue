<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <footer class="l-page-footer l-border-t l-flex-hc">
        <div class="l-rest l-margin-l">
          订单金额：<span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{toFixed(buyPay, 2)}}</span>
        </div>
        <button class="button button-fill l-btn" :disabled="submiting" @click="submit">立即购买</button>
      </footer>
      <div class="content" v-show="combosInfo.name">
        <!-- Slider -->
        <div class="swiper-container" data-space-between='0'>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img :src="combosInfo.banner" alt="">
            </div>
          </div>
        </div>
        <!-- Slider end-->
        <div class="l-padding l-bg l-border-b">
          <h3 v-text="combosInfo.name"></h3>
          <div class="l-margin-t-s l-rel">
            <strong class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{combosInfo.favourable_cost}}</strong>&ensp;&ensp;
            <del class="l-text-gray"><i class="l-icon">&#xe6cb;</i>{{combosInfo.original_cost}}</del>
            <span class="l-goods-coupon2" v-text="combosInfo.str"></span>
          </div>
          <div class="l-text-gray l-border-t" style="margin-top: 0.75rem; padding-top: 0.75rem;">
            有效期：{{combosInfo.valid}}个月
          </div>
        </div>
        <div class="l-panel-title l-margin-t l-link-arrow">
          <span class="l-text-gray">套餐内容</span>
        </div>
        <div class="l-border-t l-bg l-padding-tb">
          <ul class="l-margin-0 l-fs-s" style="padding-left: 1.65rem;">
            <li v-for="item in serviceList">
              {{item.service_name}} x{{item.service_num}}
            </li>
          </ul>
        </div>

        <div class="l-panel-title l-border-b l-margin-t">
          <span class="l-text-gray">商品描述</span>
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
    },
    submit() {

    }
  },
  created() {
    setTimeout(()=>{
      this.$server.combo.getInfo(this.$route.params.id)
      .then(({obj, img_list, list})=>{
        this.combosInfo = obj
        this.images = img_list
        this.serviceList = list
      })
    }, 600)
  }
}
</script>
<style scoped lang="less">
.l-goods-coupon2{
  background-color: #ff9100 ;color: #fff;position: absolute; top: 0; right: 0;
  font-size: 0.6rem; padding:0.2rem 0.5rem; margin-right: -0.375rem;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%);
  clip-path: polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%);
}
</style>