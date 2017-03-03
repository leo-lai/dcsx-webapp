<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="buttons-tab l-sticky">
          <div class="tab-link button" @click="tabClick(1)" :class="{' active': tabIndex == 1}">可用优惠券</div>
          <div class="tab-link button" @click="tabClick(2)" :class="{' active': tabIndex == 2}">失效优惠券</div>
        </div>
        <div class="tabs">
          <div class="tab l-coupon-list" :class="{' active': tabIndex == 1}">
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
            <div class="l-data-null" v-if="couponList1.length === 0">
              <img src="~assets/img-050.png" alt="">
              <p>咦~您还没优惠券？</p>
              <p><router-link class="button button-round" to="/coupons">赶紧去领取</router-link></p>
            </div>
          </div>
          <div class="tab l-coupon-list l-coupon-invalid" :class="{' active': tabIndex == 2}">
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
            <div class="l-data-null" v-if="couponList2.length === 0">
              <img src="~assets/img-050.png" alt="">
              <p>您还没有相关的优惠券</p>
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
      tabIndex: 0,
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
      if(this['couponList' + this.tabIndex].length === 0){
        $.showIndicator()
        this.getCoupons(this.tabIndex).finally(()=>{
          $.hideIndicator()
        })
      }

      this.$router.replace(`/user/coupons?tab=` + this.tabIndex)
    }
  },
  created() {
    setTimeout(()=>{
      this.tabClick(this.$route.query.tab)
    }, 600)
  }
}
</script>