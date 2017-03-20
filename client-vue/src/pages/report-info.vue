<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <!-- <div class="l-flex-hc l-bg l-padding l-link-arrow l-margin-b">
          <img class="l-thumb-circle l-margin-r" src="http://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=Logo&w=64&h=64" alt="">
          <div class="l-rest">
            <h3>胡杨树<span class="l-text-gray">·</span>高级检测技师</h3>
            <p class="l-text-gray">2017-01-01</p>
          </div>
        </div> -->

        <div style="height:4.5rem;">
          <template v-if="sltedCar">
            <div v-if="sltedCar.id" class="l-flex-hc l-padding l-car-list-item l-link-arrow" onclick="$.openPanel('#panelCarList')">
              <div class="l-thumb-bg l-margin-r" :style="{'background-image': 'url(' +sltedCar.logo+ ')'}"></div>
              <div class="l-rest">
                <h4 class="l-margin-0 l-text-wrap2 l-fs-m" v-text="sltedCar.model_name"></h4>
                <i class="_carnum" v-text="sltedCar.car_license"></i>
              </div>
            </div>
            <div v-else @click="$link('/car/list', 'page-in')" class="l-block l-text-center l-fs-m" style="padding: 1.7rem 0;">
              您还没添加车辆，点击<span class="l-text-link">这里</span>添加
            </div>
          </template>
        </div>

        <!-- 检测结果 -->
        <div class="l-panel l-margin-tb l-technician-work" v-if="abnormalList && abnormalList.length > 0">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">检测结果</span></div>
          <ul class="l-check-cate1">
            <li class="l-border-t" v-for="(cate1, index) in abnormalList" @click="showInfo(index)">
              <div class="_tit l-link-arrow">
                <span v-if="cate1.check_status == 0" class="pull-right l-text-error">异常</span>
                <span v-else class="pull-right l-text-ok">正常</span>
                {{cate1.cate_name}}
              </div>
            </li>
          </ul>
        </div>
        <!-- 检测结果 end-->
        <template v-if="reportInfo">
          <!-- 技师建议 -->
          <div class="l-panel l-margin-tb l-technician-work" v-show="reportInfo.advice_note">
            <div class="l-panel-title l-border-b"><span class="l-text-gray">技师建议</span></div>
            <div class="l-panel-content l-padding" v-text="reportInfo.advice_note"></div>
          </div>
          <!-- 技师建议 end-->

          <!-- 建议项目 -->
          <!-- <div class="l-panel l-margin-tb l-technician-work">
            <div class="l-panel-title l-border-b"><span class="l-text-gray">建议项目</span></div>
            <div class="l-technician-suggest">
              <ul>
                <li class="l-border-t"><p></p></li>
              </ul>
            </div>
          </div> -->
          <!-- 建议项目 end-->

          <div class="l-panel l-margin-tb l-technician-work">
            <div class="l-panel-title l-border-b"><span class="l-text-gray">预估报价</span></div>
            <div class="l-panel-content l-padding"><span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{ reportInfo.advice_price }}</span></div>
          </div>
        </template>
        <div v-else class="l-fs-m l-text-center">
          <br><br><br><br>
          <span class="l-text-gray">该车辆没有检测报告</span>
        </div>
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
                  <div class="item-text l-fs-s" v-text="item.car_license"></div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 车辆列表end -->

    <!-- 报告详情 -->
    <transition name="fade">
      <div class="l-layer l-flex-vhc" v-cloak v-show="isShowInfo">
        <div class="l-report-info">
          <div class="l-report-item" v-for="cate2 in infoData">
            <div class="_tit">
              <h4>
                <span v-if="cate2.check_status == 0" class="pull-right l-text-error">异常</span>
                <span v-else class="pull-right l-text-ok">正常</span>
                {{cate2.item_name}}
              </h4>
            </div>
            <div class="_cont">
              <table class="l-check-cate3">
                <tr v-for="cate3 in cate2.list" v-if="cate3">
                  <td><p class="l-text-wrap2">{{cate3.sub_name}}</p></td>
                  <td class="l-text-ok">{{cate3.remark}}</td>
                  <td class="l-text-error">{{cate3.abnormal_note}}</td>
                  <td>
                    <i class="l-icon l-text-error" v-if="cate3.check_status == 0">&#xe865;</i>
                    <i class="l-icon l-text-ok" v-else>&#xe627;</i>
                  </td>
                </tr>
              </table>
              <p v-show="cate2.remark" class="_desc">{{cate2.remark}}</p>
            </div>
          </div>
        </div>
        <i class="l-icon l-close-radius" @click="showInfo">&#xe660;</i>
      </div>
    </transition>
    <!-- 报告详情 end-->
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
      isShowInfo: false,
      infoData: [],
      sltedCar: null,
      reportInfo: null,
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
      return list.filter(item => item && item.check_status == 0)
    },
    getReporte() {
      this.$server.getReport(this.sltedCar.id).then(({checkInfoObj, list})=>{
        this.reportInfo = checkInfoObj
        this.abnormalList = list
        $.hideIndicator()
      })
    },
    showInfo(index) {
      if(!this.isShowInfo){
        this.infoData = this.abnormalList[index].list ? this.abnormalList[index].list.filter(item => item) : []
        if(this.infoData.length > 0){
          this.isShowInfo = true
        }
      }else{
        this.isShowInfo = false 
      }
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
        self.sltedCar = list.filter( item => item.id == this.$route.params.id )[0] || list[0]
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
<style scoped lang="less">
.l-report-info{
  position: relative;
  background-color: #fff; width: 90%; max-height: 80%; border-radius: 2px;
  overflow: auto; -webkit-overflow-scrolling: touch;
}
.l-report-item{
  font-size: 0.75rem;
  border-bottom: 0.05rem solid #f1f1f1;
  ._tit{padding: 0.375rem 0.75rem ; border-bottom: 0.05rem solid #f3f3f3; margin-bottom: -0.05rem;}
  ._cont{padding: 0.375rem  0.75rem;}
  .l-check-cate3{margin-top: 0;}
  ._desc{color: #999; margin-top: 0.25rem; font-size: 0.7rem;}
}
.l-report-item:last-child{border:none;}
</style>