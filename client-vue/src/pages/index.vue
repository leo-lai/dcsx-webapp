<template>
  <div class="content">
    <!-- Slider -->
    <div class="swiper-container" data-space-between='0'>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="~assets/banner-002.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="~assets/banner-002.jpg" alt="">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- Slider end-->
    <!-- 车辆信息 -->
    <div class="l-index-carinfo l-margin-b">
      <!-- 没有车辆信息 -->
      <router-link class="l-padding l-margin-b l-text-center l-index-carinfo-has l-link" to="/car/info">
        <p class="l-margin-tb l-text-gray l-fs-s">您还没添加车辆</p>
      </router-link>

      <!-- 已有车辆信息 -->
      <router-link class="l-flex-h l-padding l-margin-b l-index-carinfo-has l-link" to="/car/info">
        <img class="l-thumb-circle l-margin-r-s" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=Logo&w=120&h=120">
        <div class="l-rest l-margin-r-s">
          <h4 class="l-margin-0 l-text-clamp">宝马 WRANGLER RUBICON 3.6L越野的飞机的扩大解放车</h4>
          <i class="_carnum">粤A · 38343</i>
        </div>
      </router-link>
    </div>
    <!-- 车辆信息 end-->
    <!-- 首页菜单 -->
    <div class="l-index-menu">
      <div class="row no-gutter">
        <a class="col-50 l-text-default l-link l-border-r" href="coupons.html">
          <p><img src="~assets/img-019.jpg"></p>
          <p>优惠中心</p>
        </a>
        <a class="col-50 l-text-default l-link">
          <p><img src="~assets/img-020.jpg"></p>
          <p>套餐年卡<span class="badge">8</span></p>
        </a>
      </div>
      <div class="row no-gutter">
        <a class="col-50 l-text-default l-link l-border-r l-border-t">
          <p><img src="~assets/img-021.jpg"></p>
          <p>阿里车码头</p>
        </a>
        <a class="col-50 l-text-default l-link l-border-t" href="shop.html">
          <p><img src="~assets/img-022.jpg"></p>
          <p>特价商城</p>
        </a>
      </div>
    </div>
    <!-- 首页菜单 end-->
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    
  },
  mounted() {
    $('.swiper-container').swiper()
  },
  updated() {

  },
  methods: {
  }
}
</script>
<style>
.l-index-carinfo{margin: -0.75rem 0.75rem 0.75rem; z-index: 1; position: relative; }
.l-index-carinfo-has,
.l-index-carinfo-add{position: relative; background:#fff url(~assets/img-017.png) no-repeat 50% 0; background-size: 100%; color: inherit;}
.l-index-carinfo-has:after{
  content: ''; position: absolute; right:0; bottom: 0; width: 1.8rem; height: 1.8rem; 
  background: url(~assets/img-018.png) no-repeat 50% 50%; background-size: contain;
}
.l-index-carinfo-has ._carnum{display: inline-block; background-color: #d7d7d7; color: #fff; font-size: 0.6rem; padding: 1px 0.25rem; border-radius: 1px; }
.l-index-menu{background-color: #fff; margin: 0.75rem 0; text-align: center; }
.l-index-menu .col-50{padding: 1.25rem 0; font-size: 0.75rem; }
.l-index-menu img{display: block; width: 3.75rem; height: 3.25rem; margin: 0 auto 0.25rem; }
.l-index-menu .badge{color: white; background: red; height: .8rem; min-width: .8rem; padding: 0 .2rem; font-size: .6rem; line-height: .8rem; margin-left: 0.25rem; }
/* 特惠商场 */
.l-shop-goods-list{margin: 0.75rem 0.75rem 0 0.75rem}
.l-shop-goods-item{background-color: #fff;margin-bottom: 4%;}
.l-shop-goods-item .l-thumb{display: block; width: 100%; height: 8.6rem; margin:auto;}
.l-shop-goods-price{margin: 0.375rem 0;}
.l-shop-goods-price .l-icon{margin:0 0 0 -0.175rem}
.l-shop-goods-coupon{
  float: right;background-color: #e3243a;color: #fff;position: relative;
  font-size: 0.6rem;padding:0.2rem 0.25rem 0.2rem 0.5rem; margin-right: -0.375rem;
}
.l-shop-goods-coupon:before{
  content: '';background: #fff;
  width: 0.25rem; position: absolute; left: 0; top: 0; bottom: 0; 
  -webkit-clip-path: polygon(100% 50%, 0 0, 0 100%);
  clip-path: polygon(100% 50%, 0 0, 0 100%);
}
</style>