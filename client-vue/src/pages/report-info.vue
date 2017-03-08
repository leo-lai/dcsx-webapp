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
        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">检测结果</span></div>
          <div class="l-check-result">
            <ul>
              <li class="l-border-t l-link-arrow" @click="showInfo">
                <div><span class="pull-right l-text-error">异常</span>仪表信息</div>
                <div class="l-img-list l-flex-wrap">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                </div>
              </li>
              <li class="l-border-t l-link-arrow" @click="showInfo">
                <div><span class="pull-right l-text-error">异常</span>仪表信息</div>
              </li>
              <li class="l-border-t l-link-arrow" @click="showInfo">
                <div><span class="pull-right l-text-error">异常</span>仪表信息</div>
              </li>
              <li class="l-border-t l-link-arrow" @click="showInfo">
                <div><span class="pull-right l-text-error">异常</span>仪表信息</div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 检测结果 end-->

        <!-- 技师建议 -->
        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">技师建议</span></div>
          <div class="l-panel-content l-padding"> 胎压是影响轮胎寿命的重要因素，不要过高或者过低，要 按照车辆标示的胎压进行充气。夏天尽量让胎压低一些冬 季寒冷，尽量保证汽车的轮胎气比夏天足一些。 
          </div>
        </div>
        <!-- 技师建议 end-->

        <!-- 建议项目 -->
        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">建议项目</span></div>
          <div class="l-technician-suggest">
            <ul>
              <li class="l-border-t"><p>更换机油滤清器</p></li>
            </ul>
          </div>
        </div>
        <!-- 建议项目 end-->

        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">预估报价</span></div>
          <div class="l-panel-content l-padding"><span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>0.00</span></div>
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
                  <div class="item-text l-fs-xs" v-text="item.car_license"></div>
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
      <div class="l-layer l-flex-vhc" v-show="isShowInfo">
        <div class="l-report-info">
          <div class="l-report-item">
            <div class="_tit">
              <h4><span class="l-text-error pull-right">异常</span>轮胎压力</h4>  
            </div>
            <div class="_cont">
              <table class="l-check-cate3">
                <tr>
                  <td>
                    <p class="l-text-wrap2"><i class="l-icon l-text-error">&#xe6d4;</i> 左前轮左前轮左前轮左前轮左前轮左前轮</p>
                  </td>
                  <td>10-80mpa</td>
                  <td class="l-text-error">90mpa</td>
                </tr>
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error">90mpa</td>
                </tr>
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error">90mpa</td>
                </tr>
              </table>
              <p class="_desc">二级分类描述二级分类描述</p>
            </div>
          </div>
          <div class="l-report-item">
            <div class="_tit">
              <h4><span class="l-text-error pull-right">异常</span>轮胎压力</h4>  
            </div>
            <div class="_cont">
              <table class="l-check-cate3">
                <tr>
                  <td>左前轮 <i class="l-icon l-text-error">&#xe6d4;</i></td>
                  <td>10-80mpa</td>
                  <td class="l-text-error">90mpa</td>
                </tr>
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error">90mpa</td>
                </tr>
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error">90mpa</td>
                </tr>
              </table>
              <p class="_desc">二级分类描述二级分类描述</p>
            </div>
          </div>
          <div class="l-report-item">
            <div class="_tit">
              <h4><span class="l-text-ok pull-right">正常</span>轮胎压力</h4>  
            </div>
            <div class="_cont">
              <table class="l-check-cate3">
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error"></td>
                </tr>
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error"></td>
                </tr>
              </table>
              <p class="_desc">二级分类描述二级分类描述</p>
            </div>
          </div>
          <div class="l-report-item">
            <div class="_tit">
              <h4><span class="l-text-ok pull-right">正常</span>轮胎压力</h4>  
            </div>
            <div class="_cont">
              <table class="l-check-cate3">
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error"></td>
                </tr>
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error"></td>
                </tr>
              </table>
              <p class="_desc">二级分类描述二级分类描述</p>
            </div>
          </div>
          <div class="l-report-item">
            <div class="_tit">
              <h4><span class="l-text-ok pull-right">正常</span>轮胎压力</h4>  
            </div>
            <div class="_cont">
              <table class="l-check-cate3">
                <tr>
                  <td>左前轮左前轮左前轮左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error"></td>
                </tr>
                <tr>
                  <td>左前轮</td>
                  <td>10-80mpa</td>
                  <td class="l-text-error"></td>
                </tr>
              </table>
              <p class="_desc">二级分类描述二级分类描述</p>
            </div>
          </div>
        </div>
        <i class="l-icon l-close-radius" @click="showInfo">&#xe62e;</i>
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
      return list.filter(item => item.check_status == 0)
    },
    getReporte() {
      this.$server.getReport(this.sltedCar.id).then(({checkInfoObj, list})=>{
        this.reportInfo = checkInfoObj
        this.abnormalList = this.abnormal(list)
        $.hideIndicator()
      })
    },
    showInfo() {
      this.isShowInfo = !this.isShowInfo
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
<style scoped lang="less">
.l-report-info{
  position: relative;
  background-color: #fff; min-height: 7.5rem; width: 90%; max-height: 80%; border-radius: 2px;
  overflow: auto; -webkit-overflow-scrolling: touch;
}
.l-report-item{
  font-size: 0.75rem;
  border-bottom: 1px solid #f1f1f1;
  ._tit{padding: 0.375rem 0.75rem;border-bottom: 1px solid #f3f3f3;background-color: #f3f3f3;}
  ._cont{padding: 0.375rem  0.75rem;}
  .l-check-cate3{margin-top: 0;}
  ._desc{color: #999; margin-top: 0.25rem;}
}
</style>