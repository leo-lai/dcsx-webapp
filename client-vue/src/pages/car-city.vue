<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <ul class="l-car-prefix-list">
          <li v-for="item in carCityData" @click="sltProvince(item)">
            <span v-text="item.oldName"></span>
            (<span v-text="item.province"></span>)
          </li>
        </ul>
      </div>
    </div>
    <!-- 车牌城市 -->
    
    <div class="panel panel-right panel-cover l-panel-big" id="panelCarCity">
      <header class="bar bar-nav">
        <h1 class="title" v-text="sltedCarCity.province">车辆城市</h1>
      </header>
      <div class="content">
        <ul class="l-car-prefix-list">
          <li v-for="item in sltedCarCity.city" @click="sltCarCity(item)">
            <span v-text="item.oldName"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 车牌城市 end-->
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'
import initData from 'src/data/car-city.js'

export default {
  components: {
    lHeader
  },
  data () {
    return {
      carCityData: initData,   // 车牌城市
      sltedCarCity: {}
    }
  },
  methods: {
    sltProvince(item) {
      this.sltedCarCity = item
      $.openPanel('#panelCarCity')
    },
    sltCarCity(item) {
      this.$storage.session.set('sltCarCity', item)
      $.closePanel()
      this.$router.go(-1)
    }
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel()
    next()
  }
}
</script>
<style scoped>
.content{background-color: #fff; }
/* 车牌城市 */
.l-car-prefix-list{padding: 0.375rem;margin: 0;overflow: hidden;background: #fff;}
.l-car-prefix-list li{float: left;width: 33%;padding: 0.375rem;text-align: center;list-style: none;}
</style>