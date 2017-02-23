<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <div class="content">
        <!-- Slider -->
        <div class="swiper-container" data-space-between='0' style="height: 8.5rem;">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in activity" @click="$link(item.linkurl)">
              <img width="100%" height="100%" :src="item.picurl" :alt="item.title">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <!-- Slider end-->
        <!-- 车辆信息 -->
        <div class="l-index-carinfo l-margin-b">
          <!-- 已有车辆信息 -->
          <router-link v-if="carList.length > 0" class="l-flex-hc l-padding l-car-list-item l-link" :to="'/car/list'">
            <img class="l-thumb-circle l-margin-r" :src="defaultCar.logo">
            <div class="l-rest">
              <h4 class="l-margin-0 l-text-wrap2 l-fs-m" v-text="defaultCar.model_name"></h4>
              <i class="_carnum" v-text="defaultCar.car_license"></i>
            </div>
            <i class="_edit"></i>
          </router-link>
          <!-- 没有车辆信息 -->
          <router-link v-else class="l-padding l-text-center l-car-list-item l-link" to="/car/add">
            <p class="l-margin-tb l-text-gray l-fs-s">您还没添加车辆</p>
            <i class="_edit"></i>
          </router-link>
        </div>
        <!-- 车辆信息 end-->
        <!-- 首页菜单 -->
        <div class="l-index-menu">
          <div class="row no-gutter">
            <a class="col-50 l-text-default l-border-r" href="coupons.html">
              <p><img src="~assets/img-019.jpg"></p>
              <p>优惠中心</p>
            </a>
            <a class="col-50 l-text-default">
              <p><img src="~assets/img-020.jpg"></p>
              <p>套餐年卡<span class="badge">8</span></p>
            </a>
          </div>
          <div class="row no-gutter">
            <a class="col-50 l-text-default l-border-r l-border-t">
              <p><img src="~assets/img-021.jpg"></p>
              <p>阿里车码头</p>
            </a>
            <a class="col-50 l-text-default l-border-t" href="shop.html">
              <p><img src="~assets/img-022.jpg"></p>
              <p>特惠商城</p>
            </a>
          </div>
        </div>
        <!-- 首页菜单 end-->
      </div>
    </div>
  </div>
</template>

<script>
import lHeader from 'components/l-header'
import lTabbar from 'components/l-tabbar'

export default {
  components: {
    lHeader, lTabbar
  },
  data () {
    return {
      carList: [],
      activity: []
    }
  },
  computed: {
    defaultCar() {
      return this.carList.filter( item => item.is_default == 1 )[0] || this.carList[0]
    }
  },
  created() {
    // 获取车辆信息
    this.$server.car.getList().then((response)=>{
      this.carList = response.list
    })

    // 获取活动信息
    this.$server.activity.getList().then((response)=>{
      this.activity = response.list
      this.$nextTick(()=>{
        $('.swiper-container').swiper()
      })
    })
  },
  mounted() {
    
  }
}
</script>
<style>
.l-index-carinfo{margin: -0.75rem 0.75rem 0.75rem; z-index: 1; position: relative; }
.l-index-menu{background-color: #fff; margin: 0.75rem 0; text-align: center; }
.l-index-menu .col-50{padding: 1.25rem 0; font-size: 0.75rem; }
.l-index-menu img{display: block; width: 3.75rem; height: 3.25rem; margin: 0 auto 0.25rem; }
.l-index-menu .badge{color: white; background: red; height: .8rem; min-width: .8rem; padding: 0 .2rem; font-size: .6rem; line-height: .8rem; margin-left: 0.25rem; }
</style>