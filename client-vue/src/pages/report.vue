<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <div class="content">
        <div class="l-panel-carinfo l-bg-full">
          <template v-if="sltedCar">
            <div style="height:4.5rem;">
              <div v-if="sltedCar.id" class="l-flex-hc l-padding l-link-arrow" onclick="$.openPanel('#panelCarList')">
                <div class="l-thumb-bg l-margin-r" :style="{'background-image': 'url(' +sltedCar.logo+ ')'}"></div>
                <div class="l-rest">
                  <h4 class="l-margin-0 l-text-wrap2 l-fs-m" v-text="sltedCar.model_name"></h4>
                  <i class="_carnum" v-text="sltedCar.car_license"></i>
                </div>
              </div>
              <div v-else @click="$link('/car/list', 'page-in')" class="l-block l-text-center l-fs-m" style="padding: 1.7rem 0;">
                您还没添加车辆，点击<span class="l-text-link">这里</span>添加
              </div>
            </div>
            <div class="l-flex-h _info" style="height: 3.05rem;">
              <div class="_item l-rest l-flex-hc l-margin-r">
                <img src="~assets/img-024.png">
                <div class="l-rest">
                  <p class="l-fs-s" style="color: #bbb;">行驶里程(KM)</p>
                  <p style="color: #4295f2;" v-text="sltedCar.mileage"></p>
                </div>
              </div>
              <div class="_item l-rest l-flex-hc">
                <img src="~assets/img-025.png">
                <div class="l-rest">
                  <p class="l-fs-s" style="color: #bbb;">上路时间</p>
                  <p style="color: #4295f2;" v-text="sltedCar.license_date">0000-00-00</p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <template v-if="abnormalList">
          <!-- 检测报告 -->
          <template v-if="abnormalList.length > 0">
            <div class="l-panel l-margin-tb l-technician-work">
              <div class="l-panel-title l-border-b l-text-gray">
                <span>检测结果</span>
                <!-- <span class="l-fs-s">(共{{abnormalList.length}}项异常)</span> -->
              </div>
              <ul class="l-check-cate1">
                <li class="l-border-t" v-for="cate1 in abnormalList">
                  <h3><span class="pull-right l-text-error">异常</span>{{cate1.cate_name}}</h3>
                  <!-- <div class="_imgs l-flex-wrap">
                    <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                    <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                    <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                  </div> -->
                  <ul class="l-check-cate2">
                    <li v-for="cate2 in abnormal(cate1.list)">
                      <h4><i class="l-icon l-text-error">&#xe6d4;</i> {{cate2.item_name}}</h4>
                      <table class="l-check-cate3">
                        <tr v-for="cate3 in abnormal(cate2.list)">
                          <td>{{cate3.sub_name}}</td>
                          <td>{{cate3.remark}}</td>
                          <td class="l-text-error">{{cate3.abnormal_note}}</td>
                        </tr>
                      </table>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="l-margin">
              <router-link class="button l-btn-bg1" :to="'/report/info/' + sltedCar.id ">查看全部检测项目</router-link>
            </div>
          </template>
          <div v-else class="l-fs-m l-text-center">
            <br><br><br><br>
            <span class="l-text-gray">该车辆没有检测报告</span>
          </div>
          <!-- 检测报告 end-->
        </template>
      </div>
    </div>
    <!-- 车辆列表 -->
    <div class="panel panel-right panel-reveal l-panel-big" id="panelCarList">
      <header class="bar bar-nav">
        <h3 class="title">选择车辆</h3>
      </header>
      <footer class="l-page-footer l-border-t l-flex-hc">
        <button class="button button-fill l-btn l-rest" @click="$link('/car/add', 'page-in')">添加车辆</button>
      </footer>
      <div class="content">
        <div class="list-block media-list" style="margin:-1px 0;">
          <ul>
            <li v-for="item in carList">
              <label class="label-checkbox item-content" @click.prevent="sltCar(item)">
                <input type="radio" name="store" :checked="item.id === sltedCar.id">
                <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                <div class="item-media">
                  <img class="l-thumb-circle-xs" style="width: 3rem;" :src="item.logo">
                </div>
                <div class="item-inner l-margin-0">
                  <div class="item-subtitle">
                    <span v-text="item.model_name"></span>
                  </div>
                  <div class="item-text l-fs-xs" v-text="item.car_license"></div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 车辆列表end -->
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
      sltedCar: null,
      abnormalList: null,
      carList: []
    }
  },
  methods: {
    sltCar(item) {
      if(item.id !== this.sltedCar.id){
        this.sltedCar = item
        this.getReporte()
      }
      $.closePanel()
    },
    abnormal(list = []) {
      console.log(list)
      return list.filter(item => item && item.check_status == 0)
    },
    getReporte() {
      this.$server.getReport(this.sltedCar.id).then(({list})=>{
        this.abnormalList = this.abnormal(list)
        $.hideIndicator()  
      })
    }
  },
  created() {
    const self = this
    $.showIndicator()
    // 获取车辆信息
    self.$server.car.getList().then(({list})=>{
      setTimeout(()=>{
        self.carList = list
      }, 600)
      if(list.length === 0){
        $.hideIndicator()
        $.modal({
          text: '请先添加车辆',
          buttons: [
            {
              text: '返回',
              onClick() {
                self.$router.back()
              }
            },
            {
              text: '立即添加',
              bold: true,
              onClick() {
                self.$link('/car/add', 'page-in')
              }
            },
          ]
        })
      }else{
        self.sltedCar = list.filter( item => item.is_default == 1 )[0] || list[0]
        self.getReporte()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel()
    next()
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