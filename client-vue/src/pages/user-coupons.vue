<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="buttons-tab l-sticky">
          <div class="tab-link button" @click="tabClick(1)" :class="{' active': tabIndex === 1}">可用优惠券</div>
          <div class="tab-link button" @click="tabClick(2)" :class="{' active': tabIndex === 2}">失效优惠券</div>
        </div>
        <div class="l-coupon-list" v-show="tabIndex === 1">
          <div class="l-coupon-item l-link l-margin-b" v-for="item in couponList1">
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
              <span class="l-text-gray">{{item.sale_type_name}} · 失效日期：{{item.valid}}</span>
            </div>
          </div>
        </div>
        <div class="l-coupon-list l-coupon-invalid" v-show="tabIndex === 2">
          <div class="l-coupon-item l-link l-margin-b" v-for="item in couponList2">
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
              <span class="l-text-gray">{{item.sale_type_name}} · 失效日期：{{item.valid}}</span>
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
      tabIndex: 1,
      couponList1: [],
      couponList2: []
    }
  },
  methods: {
    getCoupons(type, page, row) {
      return this.$server.user.getCoupons(page, row, type)
      .then(({list})=>{
        this['couponList' + type] = list
      }) 
    },
    tabClick(index = 1) {
      this.tabIndex = index
      if(this['couponList' + index].length === 0){
        $.showIndicator()
        this.getCoupons(index).finally(()=>{
          $.hideIndicator()
        })
      }
    }
  },
  created() {
    setTimeout(()=>{
      this.tabClick(1)
    }, 600)
  }
}
</script>