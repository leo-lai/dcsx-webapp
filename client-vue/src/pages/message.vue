<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <div class="content">
        <div class="l-panel-carinfo l-bg-full">
          <div style="height:4.5rem;" >
            <router-link v-if="carList.length > 0" class="l-flex-hc l-padding l-link-arrow" to="/car/list">
              <img class="l-thumb-circle l-margin-r" :src="defaultCar.logo">
              <div class="l-rest">
                <h4 class="l-margin-0 l-text-wrap2 l-fs-m" v-text="defaultCar.model_name"></h4>
                <i class="_carnum" v-text="defaultCar.car_license"></i>
              </div>
            </router-link>
            <router-link v-else to="/car/list" class="l-block l-text-center l-fs-m" style="padding: 1.7rem 0;">
              您还没添加车辆，点击<span class="l-text-link">这里</span>添加
            </router-link>
          </div>
          <div class="l-flex-h _info" style="height: 3.05rem;">
            <div class="_item l-rest l-flex-hc l-margin-r">
              <img src="~assets/img-024.png">
              <div class="l-rest">
                <p class="l-fs-s" style="color: #bbb;">行驶里程(KM)</p>
                <p style="color: #4295f2;" v-text="defaultCar.mileage"></p>
              </div>
            </div>
            <div class="_item l-rest l-flex-hc">
              <img src="~assets/img-025.png">
              <div class="l-rest">
                <p class="l-fs-s" style="color: #bbb;">上路时间</p>
                <p style="color: #4295f2;" v-text="defaultCar.license_date">0000-00-00</p>
              </div>
            </div>
          </div>
        </div>

        <div class="l-panel l-margin-tb">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">检测报告</span></div>
          <div class="l-panel-content l-padding">
            <span class="l-text-error">0项</span>异常
            <router-link class="button button-fill pull-right l-btn-s" style="margin-top: -0.1rem;" to="/message/info">查看明细</router-link>
          </div>
        </div>
        <div class="l-panel l-margin-tb">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">维修进程</span></div>
          <div class="l-panel-content l-padding">已完工</div>
        </div>
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
      carList: []
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
    }, 600)
  }
}
</script>
<style scoped>
.l-panel-carinfo{min-height: 5.65rem; color: #fff; overflow: hidden;background-image: url('../assets/img-023.jpg');}
.l-panel-carinfo a{color: #fff;}
.l-panel-carinfo ._carnum{display: inline-block; border:1px solid #f3f3f3; color: #fff; font-size: 0.6rem; padding: 1px 0.25rem; border-radius: 1px; margin-right: 0.375rem; opacity: 0.8;}
.l-panel-carinfo .l-text-wrap2{min-height: 1.4rem;}
.l-panel-carinfo ._info{padding:0.375rem 0.75rem; background: rgba(0,0,0,0.2);}
.l-panel-carinfo ._item{padding: 0 0.4rem; }
.l-panel-carinfo ._item img{margin-right: 0.75rem; width: 1.5rem; height: 1.5rem;}
.l-panel-carinfo .l-link-arrow:active{background-color: transparent; opacity: 0.8;}
</style>