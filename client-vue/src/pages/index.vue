<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <div class="content">
        <!-- Slider -->
        <div class="swiper-container" key="index-swiper" style="height: 8.5rem;">
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
          <router-link v-if="carList.length > 0" class="l-flex-hc l-padding l-car-list-item l-link" to="/car/list">
            <div class="l-thumb-bg l-margin-r" :style="{'background-image': 'url(' +defaultCar.logo+ ')'}"></div>
            <div class="l-rest">
              <h4 class="l-margin-0 l-text-wrap2 l-fs-m" v-text="defaultCar.model_name"></h4>
              <i class="_carnum" v-text="defaultCar.car_license"></i>
            </div>
            <i class="_edit"></i>
          </router-link>
          <!-- 没有车辆信息 -->
          <router-link v-else class="l-padding l-text-center l-car-list-item l-link" to="/car/add">
            <p style="margin:0.975rem 0" class="l-text-gray l-fs-s">您还没添加车辆</p>
            <i class="_edit"></i>
          </router-link>
        </div>
        <!-- 车辆信息 end-->
        <!-- 首页菜单 -->
        <div class="l-index-menu">
          <div class="row no-gutter">
            <router-link class="col-50 l-text-default l-border-r" to="/coupons">
              <p><img src="~assets/img-019.jpg"></p>
              <p>优惠中心</p>
            </router-link>
            <router-link class="col-50 l-text-default" to="/combos">
              <p><img src="~assets/img-020.jpg"></p>
              <p>套餐年卡<!-- <span class="badge">8</span> --></p>
            </router-link>
          </div>
          <div class="row no-gutter">
            <router-link class="col-50 l-text-default l-border-r l-border-t" to="/alicar">
              <p><img src="~assets/img-021.jpg"></p>
              <p>阿里车码头</p>
            </router-link>
            <router-link class="col-50 l-text-default l-border-t" to="/shop">
              <p><img src="~assets/img-022.jpg"></p>
              <p>特惠商城</p>
            </router-link>
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
      return this.carList.filter( item => item.is_default == 1 )[0] || this.carList[0] || {}
    }
  },
  created() {
    setTimeout(()=>{
      $.showIndicator()
      // 获取车辆信息
      this.$server.car.getList().then(({list})=>{
        $.hideIndicator()
        this.carList = list
      })

      // 获取活动信息
      this.$server.activity.getList().then(({list})=>{

        $.hideIndicator()
        this.activity = list
        this.$nextTick(()=>{
          $.reinitSwiper('#app-page')
          $('.swiper-container').swiper({
            autoplay: 3000
          })  
        })
      })
    }, 600)
  },

}
</script>
<style scoped>
.l-index-carinfo{margin: -0.75rem 0.75rem 0.75rem; z-index: 1; position: relative; }
.l-index-menu{background-color: #fff; margin: 0.75rem 0; text-align: center; }
.l-index-menu .col-50{padding: 1.25rem 0; font-size: 0.75rem; }
.l-index-menu img{display: block; width: 3.75rem; height: 3.25rem; margin: 0 auto 0.25rem; }
</style>