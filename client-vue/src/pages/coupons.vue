<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <div class="l-coupon-list">
            <div class="l-coupon-item l-link l-margin-b" v-for="item in scroll.alldata" @click="pick(item)">
              <div class="_bd l-flex-hc">
                <div class="_val l-border-r l-text-wrap1">
                  <i class="l-icon">&#xe6cb;</i><span v-text="item.coupon_charge"></span>
                </div>
                <div class="_desc l-rest">
                  <h3 class="l-text-wrap1" v-text="item.title"></h3>
                  <p class="l-text-wrap2 l-fs-s" v-text="item.description">看这里是一行优惠劵描述，我有这么长~</p>
                </div>
              </div>
              <div class="_ft l-border-t">
                <a class="pull-right">点击领取</a>
                <!-- <span class="l-text-gray">{{item.sale_type_name}} · 截止日期：{{item.offline}}</span> -->
                <span class="l-text-gray">{{item.sale_type_name}}</span>
              </div>
            </div>
          </div>
        </l-scroll>
      </div>
    </div>
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'
import lScroll from 'components/l-scroll'

export default {
  components: {
    lHeader, lScroll
  },
  data () {
    return {
      scroll: {}
    }
  },
  methods: {
    pick(item) {
      const self = this
      $.showIndicator()
      this.$server.coupon.pick(item.coupon_id).then(()=>{
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
                self.$link('/user/coupons?tab=1', 'page-in')
              }
            },
          ]
        })
      }).finally(()=>{
        $.hideIndicator()
      })
    }
  },
  created() {
    this.scroll = this.$server.coupon.getList()
    setTimeout(()=>{
      this.scroll.init()
    }, 600)
  }
}
</script>