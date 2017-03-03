<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
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
              <td>400-158-6677</td>
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
                <label class="label-checkbox item-content" @click.prevent="sltPayWay(1)">
                  <input type="radio" name="pay-way" :checked="payway == 1">
                  <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title"><i class="l-icon-fill">&#xe62c;</i>&ensp;&ensp;个人钱包</div>
                      <div class="item-after l-fs-m">
                        可用余额：{{toFixed(userAmount, 2)}}
                      </div>
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <label class="label-checkbox item-content" @click.prevent="sltPayWay(2)">
                  <input type="radio" name="pay-way" :checked="payway == 2">
                  <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title"><i class="l-icon-fill-wx">&#xe66f;</i>&ensp;&ensp;微信支付</div>
                      <div class="item-after"></div>
                    </div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <div class="l-margin l-flex-h">
            <button class="button button-fill l-btn l-rest" :disabled="submiting" @click="submit">确定支付</button>  
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
      payway: '1',
      orderInfo: {},
      submiting: false,
      formData: {},
      userAmount: 0
    }
  },
  methods: {
    toFixed(num = 0, point = 1) {
      return (num - 0).toFixed(point)
    },
    sltPayWay(type = 1) {
      this.payway = type + ''
    },
    submit() {
      const self = this
      let promise = null

      $.showIndicator()
      self.submiting = true

      if(self.payway == 1){ // 钱包支付
        if(Number(self.orderInfo.total_money) > Number(self.userAmount)){
          $.alert('钱包可用余额不足，请及时充值！')
          return
        }
        if(self.orderInfo.type == 2){  // 套餐
          promise = self.$server.combo.pay(self.formData)
        }else{  // 商品
          promise = self.$server.user.cashPay(self.formData)
        }

      }else if(self.payway == 2){ // 微信支付
        promise = this.$server.chooseWXPay2(self.orderInfo.order_id)
      }

      promise.then(()=>{
        if(self.orderInfo.type == 2){
          $.modal({
            title:  '支付成功',
            text: '请到【我的->套餐】查看详情',
            buttons: [
              {
                text: '返回',
                onClick() {
                  self.$router.back()
                }
              },
              {
                text: '查看套餐',
                bold: true,
                onClick() {
                  self.$router.replace('/user/combos')
                }
              },
            ]
          })
        }else{ // 支付商品
          $.modal({
            title:  '支付成功',
            text: '请到【我的->商品】查看详情',
            buttons: [
              {
                text: '返回',
                onClick() {
                  self.$router.back()
                }
              },
              {
                text: '查看订单',
                bold: true,
                onClick() {
                  self.$router.replace('/user/order?tab=2')
                }
              },
            ]
          })
        }

        this.$storage.session.remove('temp_pay_info')
      }).finally(()=>{
        $.hideIndicator()
        self.submiting = false
      })
    }
  },
  created() {
    this.orderInfo = this.$storage.session.get('temp_pay_info') || {}
    this.formData.order_id = this.orderInfo.order_id
    this.formData.charge = this.orderInfo.total_money

    setTimeout(()=>{
      $.showIndicator()
      this.$server.user.getCash().then(({obj})=>{
        this.userAmount = obj.total_amount
      }).finally(()=>{
        $.hideIndicator()
      })
    }, 600)
  }
}
</script>
<style scoped>
.list-block.media-list .item-title-row{align-items: center;}
</style>