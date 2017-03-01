<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-coupon-list">
          <div class="l-coupon-item l-link l-margin-b" v-for="item in couponList" :key="item.id" @click="pick(item)">
            <div class="_bd l-flex-hc">
              <div class="_val l-border-r">
                <i class="l-icon">&#xe6cb;</i><span v-text="item.coupon_charge"></span>
              </div>
              <div class="_desc l-rest">
                <h3 class="l-text-wrap1" v-text="item.title"></h3>
                <p class="l-text-wrap2 l-fs-s" v-text="item.description">看这里是一行优惠劵描述，我有这么长~</p>
              </div>
            </div>
            <div class="_ft l-border-t">
              <a class="pull-right">点击领取</a>
              <span class="l-text-gray">{{item.sale_type_name}} · 截止日期：{{item.offline}}</span>
            </div>
          </div>
        </div>
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
      couponList: []
    }
  },
  methods: {
    pick(item) {
      const self = this
      $.showIndicator()
      this.$server.coupon.pick(item.coupon_id).then((response)=>{
        $.hideIndicator()
        $.modal({
          title:  '领取成功',
          text: '请到【我的->优惠券】中查看',
          buttons: [
            {
              text: '返回'
            },
            {
              text: '查看',
              bold: true,
              onClick() {
                self.$router.push('/user/coupons?tab=1')
              }
            },
          ]
        })
      }).catch(()=>{
        $.hideIndicator()
      })
    }
  },
  created() {
    setTimeout(()=>{
      this.$server.coupon.getList(1, 10).then(({list})=>{
        this.couponList = list
      })  
    }, 600)
  }
}
</script>