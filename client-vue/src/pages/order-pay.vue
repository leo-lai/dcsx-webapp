<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <!-- 订单信息 -->
        <div class="l-panel-title l-border-b">
          <span class="l-text-gray">订单信息</span>
        </div>
        <div class="l-panel-content l-margin-b" style="padding: 0.375rem 0.75rem;">
          <table class="l-text-table">
            <tr>
              <td class="_tit">订单编号</td>
              <td>{{orderInfo.order_sn}}</td>
            </tr>
            <tr>
              <td class="_tit">订单金额</td>
              <td>{{orderInfo.total_money}}元</td>
            </tr>
            <tr>
              <td class="_tit">创建时间</td>
              <td>{{orderInfo.time}}</td>
            </tr>
            <tr>
              <td class="_tit">当前状态</td>
              <td><span class="l-text-error">待支付</span></td>
            </tr>
            <tr>
              <td class="_tit">客服电话</td>
              <td>400-8200000</td>
            </tr>
          </table>
        </div>
        <!-- 订单信息 end-->
        
        <!-- 支付方式 -->
        <div>
          <div class="l-panel-title l-margin-t">
            <span class="l-text-gray">支付方式</span>
          </div>
          <div class="list-block media-list">
            <ul>
              <li>
                <label class="label-checkbox item-content">
                  <input type="radio" name="pay-way" value="2" v-model="payway">
                  <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                  <div class="item-inner">
                    <i class="l-icon-fill-wx">&#xe66f;</i>&ensp;&ensp;微信支付
                  </div>
                </label>
              </li>
              <li>
                <label class="label-checkbox item-content">
                  <input type="radio" name="pay-way" value="1" v-model="payway">
                  <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                  <div class="item-inner">
                    <i class="l-icon-fill">&#xe62c;</i>&ensp;&ensp;个人钱包
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <div class="l-margin">
            <a class="button button-fill l-btn l-rest">确定支付</a>  
          </div>
        </div>
        <!-- 支付方式 end-->
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
      payway: '2',
      orderInfo: {}
    }
  }, 
  created() {
    this.orderInfo = this.$storage.session.get('temp_pay_info') || {}
  },
  beforeRouteLeave(to, from, next) {
    this.$storage.session.remove('temp_pay_info')
    next()
  }
}
</script>