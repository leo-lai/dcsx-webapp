<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <footer class="l-page-footer l-border-t l-flex-hc">
        <div class="l-rest l-margin-l">
          <p>套餐价格：<span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{ toFixed(serviceInfo.favourable_cost, 2) }}</span></p>
          <p class="l-fs-s l-text-gray">套餐原价：<del><i class="l-icon">&#xe6cb;</i>{{ toFixed(serviceInfo.original_cost, 2) }}</del></p>
        </div>
        <button class="button button-fill l-btn" :disabled="submiting || serviceList.length === 0" @click="submit">&ensp;提交订单&ensp;</button>
      </footer>
      <div class="content">
        <div class="l-margin-b">
          <!-- 已有车辆信息 -->
          <div v-if="carList.length > 0" class="l-flex-hc l-padding l-car-list-item l-link" onclick="$.openPanel('#panelCarList')">
            <img class="l-thumb l-margin-r" :src="sltedCar.logo">
            <div class="l-rest">
              <h4 class="l-margin-0 l-text-wrap2 l-fs-m" v-text="sltedCar.model_name"></h4>
              <i class="_carnum" v-text="sltedCar.car_license"></i>
            </div>
            <i class="_edit"></i>
          </div>
          <!-- 没有车辆信息 -->
          <router-link v-else class="l-padding l-text-center l-car-list-item l-link" to="/car/add">
            <p class="l-margin-tb l-text-gray l-fs-s">您还没添加车辆</p>
            <i class="_edit"></i>
          </router-link>
        </div>
        <!-- 套餐服务内容 -->
        <div class="l-service-item" v-for="item in serviceList" @click="sltParts(item)">
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">服务项目：{{item.service_name}}</span>
          </div>
          <div class="l-service-info">
            <ul>
              <li><p>单次工时费：{{item.service_price}}元，工时次数：{{item.service_num}}</p></li>
              <template v-if="item.is_goods == 0">
                <li><p>适用配件：无</p></li>
              </template>
              <template v-else>
                <li><p>适用配件：{{item.service_goods.goods_name}}</p></li>
                <li><p>配件单价：{{item.service_goods.goods_price}}元，配件数量：{{item.service_goods.goods_num}}</p></li>  
              </template>
            </ul>
          </div>
          <i class="_edit" v-if="item.is_goods != 0"></i>
        </div>
        <!-- 套餐服务内容 end-->
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

    <!-- 更换配件 -->
    <div class="panel panel-right panel-reveal l-panel-big" id="panelPartsList">
      <header class="bar bar-nav">
        <h3 class="title">更换配件</h3>
      </header>
      <div class="content">
        <div class="l-service-parts" v-for="item in partsList">
          <div class="_item" @click="changeParts(item)" :class="{'active': currentService.service_goods.goods_id === item.goods_id}">
            <p v-text="item.goods_name"></p>
            <p class="l-fs-m l-text-gray">
              配件单价：<i class="l-icon">&#xe6cb;</i>{{item.market_price}}&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 更换配件end -->
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
      sltedCar: {},
      carList: [],
      serviceList: [],
      serviceInfo: {},
      currentService: {},
      partsList: [],
      submiting: false,
      buyPay: 0,
      jsonData: {}
    }
  },
  methods: {
    toFixed(num = 0, point = 1) {
      return (num - 0).toFixed(point)
    },
    sltCar(item) {
      if(item.id !== this.sltedCar.id){
        this.sltedCar = item
        this.getService()
      }
      $.closePanel()
    },
    changeParts(item) {
      this.currentService.service_goods.goods_id = item.goods_id
      this.currentService.service_goods.goods_name = item.goods_name
      this.currentService.service_goods.goods_price = item.market_price
      this.$nextTick(()=>{
        $.closePanel()
      })
    },
    sltParts(item) {
      if(item.is_goods == 0) {
        return
      }

      this.currentService = item
      $.showIndicator()
      this.$server.combo.getParts(item.service_id, this.sltedCar.carid)
      .then(({list})=>{
        this.partsList = list
        this.$nextTick(()=>{
          $.openPanel('#panelPartsList')
        })
      }).finally(()=>{
        $.hideIndicator()
      })
    },
    getService() {
      $.showIndicator()
      this.$server.combo.getService(this.$route.params.id, this.sltedCar.carid)
      .then(({list, obj})=>{
        this.serviceList = list.map((item)=>{
          if(!item.service_goods){
            item.is_goods = 0
          }
          return item
        })

        this.serviceInfo = obj
      }).catch(()=>{
        this.serviceList = []
      }).finally(()=>{
        $.hideIndicator()
      })
    },
    submit() {
      if(this.submiting) return
      
      this.submiting = true
      $.showIndicator()
      
      this.jsonData.suit_id = this.$route.params.id
      this.jsonData.carid = this.sltedCar.carid
      
      this.$server.combo.order(this.jsonData)
      .then(({obj})=>{
        obj.type = 2
        $.hideIndicator()
        this.$storage.session.set('temp_pay_info', obj)
        $.toast('提交订单成功', 2000, 'l-toast')
        setTimeout(()=>{
          this.submiting = false
          window.location.replace('/order/pay')
        }, 1500)
        // this.$router.replace('/order/pay')
      }).catch(()=>{
        $.hideIndicator()
      })
    }
  },
  created() {
    const self = this
    self.watchServiceList = self.$watch('serviceList', function(val){
      let buyPay = 0
      let service = []
      val.forEach((item)=>{
        buyPay += item.service_price * item.service_num

        let temp = {
          service_id: item.service_id,
          num: item.service_num,
          goods_id: 0
        }

        if(item.is_goods == 1){
          buyPay += item.service_goods.goods_price * item.service_goods.goods_num
          temp.goods_id = item.service_goods.goods_id
        }

        service.push(temp)
      })

      self.jsonData.goods = service
      // self.buyPay = buyPay

    }, { deep: true })

    setTimeout(()=>{
      $.showIndicator()
      // 获取车辆信息
      self.$server.car.getList().then(({list})=>{
        self.carList = list
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
                  self.$router.push('/car/add')
                }
              },
            ]
          })
        }else{
          self.sltedCar = list.filter( item => item.is_default == 1 )[0] || list[0]
          self.getService()
        }
      })
    }, 600)
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel()
    this.watchServiceList()
    next()
  }
}
</script>
<style scoped lang="less">
.l-page-footer{height: 3.2rem;}
.l-page-footer ~ .content{bottom: 3.2rem;}
.l-page-footer .button{height: 3.2rem; line-height: 3.2rem;}
.l-service-parts{
  ._item{
    margin: 0.75rem;
    border:1px solid #f3f3f3;
    border-radius: 1px;
    padding: 0.75rem;
    text-align: center;
  }
  ._item.active{
    border-color: #3d93f5;
  }
}
.l-service-info{
  padding: 0.5rem 0.75rem;
  ul{margin: 0; padding-left: 0.8rem; color: #999;font-size: 0.7rem;}
  p{color:#333; font-size:0.75rem;}
}
.l-service-item{
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  background: #fff;
  position: relative;
  ._edit{
    position: absolute; right:0; bottom: 0; width: 1.8rem; height: 1.8rem; 
    background: url(~assets/img-018.png) no-repeat 50% 50%; background-size: contain;
  }
}

.list-block.media-list .item-inner{
  align-self: center;
}
</style>