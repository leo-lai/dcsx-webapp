<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <footer class="l-page-footer l-border-t l-flex-hc">
        <div class="l-rest l-margin-l">
          订单金额：<span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{toFixed(buyPay, 2)}}</span>
        </div>
        <button class="button button-fill l-btn" :disabled="submiting" @click="submit">&ensp;提交订单&ensp;</button>
      </footer>
      <div class="content" v-show="buyInfo.id">
        <!-- 购买的商品 -->
        <div class="l-shopcar-item l-flex-h l-border-t l-bg">
          <img class="l-thumb" :src="buyInfo.picpath">
          <div class="l-rest">
            <h4 class="l-text-wrap2" v-text="buyInfo.goods_name"></h4>
            <div class="l-shopcar-item-disc">
              <span class="pull-right l-number">
                <i class="l-icon" @click="minus">&#xe635;</i>
                <input type="tel" v-model="buyNum">
                <i class="l-icon" @click="add">&#xe62a;</i>
              </span>
              <span class="l-text-warn">
                <i class="l-icon">&#xe6cb;</i>{{buyInfo.market_price}}
              </span>
            </div>
          </div>
        </div>
        <!-- 购买的商品 end-->

        <!-- 配送方式 -->
        <div class="list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title l-text-gray">配送方式</div>
                <div class="item-after" v-text="buyInfo.shopping"></div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title l-text-gray">支持取货时间</div>
                <div class="item-after" v-text="buyInfo.receive_time"></div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 配送方式 end-->

        <!-- 选择门店 -->
        <div class="l-panel-title l-link-arrow" onclick="$.openPanel('#panelStoreList')">
          <a class="pull-right">更换</a>
          <h3 class="l-text-gray">选择门店</h3>
        </div>
        <div class="l-store-item l-border-t l-margin-b">
          <a class="l-store-item-bd l-flex-hc">
            <img class="l-thumb" :src="sltedStore.picpath">
            <div class="l-rest">
              <div>
                <span class="pull-right l-fs-s l-text-gray"><i class="l-icon">&#xe634;</i>{{toFixed(sltedStore.distance)}}km</span>
                <h4 v-text="sltedStore.store_name"></h4>
              </div>
              <p class="l-text-wrap2" v-text="sltedStore.address"></p>
            </div>
          </a>
        </div>
        <!-- 选择门店 end-->

        <!-- 优惠选项 -->
        <div class="l-panel-title l-margin-t">
          <h3 class="l-text-gray">优惠选项</h3>
        </div>
        <div class="list-block media-list">
          <ul>
            <li :class="{'l-point-disabled': buyInfo.point_money <= 0}">
              <label class="label-checkbox item-content" @click.prevent="usePoint">
                <input type="radio" :checked="buyInfo.point_money > 0 && pointType === 1">
                <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">使用积分抵扣</div>
                  </div>
                  <div class="item-text">当前可用积分{{buyInfo.point}}，可使用{{buyInfo.point_rude}}</div>
                </div>
              </label>
            </li>
          </ul>
        </div>

        <!-- 优惠选项 end-->
      </div>
    </div>
    <!-- 门店列表 -->
    <div class="panel panel-right panel-reveal l-panel-big" id="panelStoreList">
      <header class="bar bar-nav">
        <h1 class="title">选择门店</h1>
      </header>
      <div class="content">
        <div class="list-block media-list" style="margin:-1px 0;">
          <ul>
            <li v-for="item in storeList">
              <label class="label-checkbox item-content" @click.prevent="sltStore(item)">
                <input type="radio" name="store" :checked="item.store_id === sltedStore.store_id">
                <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                <div class="item-media l-margin-l-s">
                  <img class="l-thumb-s" :src="item.picpath">
                </div>
                <div class="item-inner l-margin-l-s">
                  <div class="item-subtitle">
                    <span class="l-fs-s l-text-gray pull-right"><i class="l-icon">&#xe634;</i>{{toFixed(item.distance)}}km</span>
                    <span v-text="item.store_name"></span>
                  </div>
                  <div class="item-text l-fs-s" v-text="item.address"></div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 门店列表end -->
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
      storeList: [],
      sltedStore: {},
      buyInfo: {},
      buyNum: 1,
      pointMoney: 0,
      pointType: 2  // 1使用积分2不使用
    }
  },
  computed: {
    buyPay() {
      return Math.max(this.buyNum * (this.buyInfo.market_price || 0) - this.pointMoney, 0)
    }
  },
  methods: {
    minus() {
      this.buyNum = --this.buyNum > 0 ? this.buyNum : 1
    },
    add() {
      this.buyNum++
    },
    toFixed(num = 0, point = 1) {
      return (num - 0).toFixed(point)
    },
    sltStore(item) {
      this.sltedStore = item
      $.closePanel()
    },
    usePoint() { // 使用积分

      if(this.buyInfo.point_money <= 0) {
        $.alert('您的积分不足，不能使用')
        return
      }

      if(this.pointType !== 1){
        this.pointType = 1
        this.pointMoney = this.buyInfo.point_money || 0 
      }else{
        this.pointType = 2
        this.pointMoney = 0
      }
    },
    submit() { // 提交订单
      if(this.submiting) return

      this.submiting = true
      $.showIndicator()
      
      this.$server.order.add({
        id: this.buyInfo.id,
        goods_number: this.buyNum,
        orgid: this.sltedStore.store_id,
        point_type: this.pointType
      }).then(({obj})=>{
        obj.type = 0
        $.hideIndicator()
        this.$storage.session.set('temp_pay_info', obj)
        $.toast('提交订单成功', 2000, 'l-toast')
        setTimeout(()=>{
          this.submiting = false
          window.location.replace('/order/pay')
        }, 1500)
        // this.$router.replace('/order/pay')
      }).catch(()=>{
        this.submiting = false
      })
    }
  },
  created() {
    const id = this.$route.params.id
    $.showIndicator()
    this.$server.getPosition().then((position)=>{
      this.$server.shop.getBuyInfo(id, position.longitude, position.latitude)
      .then(({obj, list})=>{
        setTimeout(()=>{
          this.buyInfo = obj
          if(this.pointType == 1){
            this.pointMoney = obj.point_money  
          }
          this.storeList = list
          this.sltedStore = list[0] || {}
        }, 600)
      }).finally(()=>{
        $.hideIndicator()
      })
    }) 
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel()
    next()
  }
}
</script>
<style scoped>
.l-point-disabled{
  filter: grayscale(100%);
  opacity: 0.4;
}
</style>