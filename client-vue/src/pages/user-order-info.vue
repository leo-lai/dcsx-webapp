<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <footer class="l-footer-fixed l-flex-hc l-padding-s" v-if="orderInfo.order_status == 1">
        <button class="l-rest button l-btn-bg2 l-margin-r-s" @click="orderCancel">取消订单</button>
        <button class="l-rest button l-btn-bg1" @click="orderPay">去支付</button>  
      </footer>
      <footer class="l-footer-fixed l-flex-hc l-padding-s" v-else-if="orderInfo.order_status == 2">
        <button class="l-rest button l-btn-bg1" @click="orderRecive">确认收货</button>  
      </footer>
      <div class="content l-fs-m" v-show="orderInfo.order_id">
        <!-- 订单信息 -->
        <div class="l-panel-title">
          <span class="l-text-gray">订单信息</span>
        </div>
        <div class="l-text-table l-margin-b l-border-t">
          <div class="_tr">
            <div class="_tit">订单编号</div>
            <div class="_rest" v-text="orderInfo.order_sn"></div>
          </div>
          <div class="_tr l-border-t">
            <div class="_tit">订单金额</div>
            <div class="_rest"><span v-text="orderInfo.order_amount"></span> 元</div>
          </div>
          <div class="_tr l-border-t">
            <div class="_tit">下单时间</div>
            <div class="_rest" v-text="orderInfo.add_time"></div>
          </div>
          <div class="_tr l-border-t">
            <div class="_tit">订单状态</div>
            <div class="_rest" v-text="status[orderInfo.order_status]"></div>
          </div>
          <div class="_tr l-border-t">
            <div class="_tit">客服电话</div>
            <div class="_rest">400-158-6677</div>
          </div>
        </div>
        <!-- 订单信息 end-->
        
        <!-- 商品信息 -->
        <div class="l-panel-title">
          <span class="l-text-gray">商品信息</span>
        </div>
        <div class="list-block media-list">
          <ul>
            <li class="item-content" v-for="item in goodsList">
              <div class="item-media">
                <img class="l-thumb-s" :src="item.picpath">
              </div>
              <div class="item-inner">
                <div class="item-subtitle" v-text="item.goods_name"></div>
                <div class="item-subtitle l-text-gray">
                  <span class="pull-right">x{{item.goods_num}}</span>
                  <span>
                    <i class="l-icon">&#xe6cb;</i>{{item.market_price}}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 商品信息 end-->

        <!-- 门店信息 -->
        <div class="l-panel-title l-border-b">
          <span class="l-text-gray">门店信息</span>
        </div>
        <div class="l-store-item l-margin-b">
          <router-link class="l-store-item-bd l-flex-h" :to="'/user/stores/info/'+orderInfo.orgid">
            <img class="l-thumb-s l-margin-r" :src="orderInfo.picpath">
            <div class="l-rest l-flex-v">
              <div class="l-rest">
                <span class="l-fs-s l-text-gray pull-right"><i class="l-icon">&#xe634;</i>{{orderInfo.distance}}km</span>
                <h4 v-text="orderInfo.org_name"></h4>
              </div>
              <p v-text="orderInfo.address"></p>
            </div>
          </router-link>
          <div class="l-store-item-ft l-flex-h l-border-t">
            <a class="l-rest l-flex-hvc l-border-r l-text-default" :href="'tel:' + orderInfo.phone">
              <i class="l-icon">&#xe640;</i><span>&ensp;电话</span>
            </a>
            <div class="l-rest l-flex-hvc" @click="openLocation()">
              <i class="l-icon">&#xe601;</i><span>&ensp;导航</span>
            </div>
          </div>
        </div>
        <!-- 门店信息 end-->
      </div>
    </div>
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
      status: {
        '1': '待支付',
        '2': '待收货',
        '3': '待评价',
        '4': '已完成'
      },
      orderInfo: {},
      goodsList: []
    }
  },
  methods: {
    orderCancel() {
      const self = this
      $.confirm('确定要取消订单？', ()=>{
        $.showIndicator()
        self.$server.order.cancel(self.orderInfo.order_id)
        .then(()=>{
          
          $.toast('取消订单成功')
          this.$router.back()
        }).finally(()=>{
          $.hideIndicator()
        })
      })
    },
    orderRecive() {
      $.showIndicator()
      this.$server.order.recive(self.orderInfo.order_id)
      .then(()=>{
        $.toast('确认收货成功')
        this.getOrderInfo()
      }).finally(()=>{
        $.hideIndicator()
      })
    },
    orderPay() {
      this.$storage.session.set('temp_pay_info', {
        order_id: this.orderInfo.order_id,
        order_sn: this.orderInfo.order_sn,
        time: this.orderInfo.add_time,
        total_money: this.orderInfo.order_amount
      })

      window.location.href = '/order/pay'
      // this.$router.push('/order/pay')
    },
    getOrderInfo() {
      this.$server.order.getInfo(this.$route.params.id)
      .then(({obj, list})=>{
        obj.distance = 0
        this.orderInfo = obj
        this.goodsList = list
        this.$server.getPosition().then((position)=>{
          this.orderInfo.distance = this.$server.getDistance(
            Number(position.longitude),
            Number(position.latitude),
            Number(obj.longitude),
            Number(obj.latitude)
          )
        })
      }).finally(()=>{
        $.hideIndicator()
      })
    },
    openLocation() {
      $.showIndicator()
      this.$server.getWxConfig().then((wx)=>{
        if(wx._ready){
          wx.openLocation({
            latitude: Number(this.orderInfo.latitude),     // 纬度，浮点数，范围为90 ~ -90
            longitude: Number(this.orderInfo.longitude),   // 经度，浮点数，范围为180 ~ -180。
            name: this.orderInfo.org_name,                 // 位置名
            address: this.orderInfo.address,               // 地址详情说明
            scale: 26,                                // 地图缩放级别,整形值,范围从1~28。默认为最大
            fail(err) {
              $.alert('打开地图失败：' + err.errMsg)
            }
          })    
        }else{
          $.alert('请在微信内打开')
        }
      }).finally(()=>{
        $.hideIndicator()
      })
    }
  },
  created() {
    setTimeout(()=>{
      $.showIndicator()
      this.getOrderInfo()
    }, 600)
  }
}
</script>
<style scoped>
.list-block.media-list .item-inner{align-self: center;}
</style>