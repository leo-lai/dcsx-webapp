<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <div class="buttons-tab l-sticky">
          <div class="tab-link button" @click="tabClick(1)" :class="{' active': tabIndex == 1}">可用优惠券</div>
          <div class="tab-link button" @click="tabClick(2)" :class="{' active': tabIndex == 2}">失效优惠券</div>
        </div>
        <div class="tabs">
          <div class="tab" :class="{' active': tabIndex == 1}">
            <l-scroll :scroll="scroll1">
              <div class="l-coupon-list">
                <div class="l-coupon-item l-link l-margin-b" v-for="item in scroll1.alldata">
                  <div class="_bd l-flex-hc">
                    <div class="_val l-border-r l-text-wrap1">
                      <i class="l-icon">&#xe6cb;</i><span v-text="item.coupon_charge"></span>
                    </div>
                    <div class="_desc l-rest">
                      <h3 class="l-text-wrap1" v-text="item.title"></h3>
                      <p class="l-text-wrap2 l-fs-s" v-text="item.description">~</p>
                    </div>
                  </div>
                  <div class="_ft l-border-t">
                    <span class="l-text-gray">{{item.sale_type_name}} · 失效日期：{{item.valid}}</span>
                  </div>
                </div>
              </div>
              <div slot="data-null">
                <img src="~assets/youhuiquan.png" alt="">
                <p>咦~您还没优惠券？</p>
                <p><router-link class="button button-round" to="/coupons">赶紧去领取</router-link></p>
              </div>
            </l-scroll>
          </div>
          <div class="tab" :class="{' active': tabIndex == 2}">
            <l-scroll :scroll="scroll2">
              <div class="l-coupon-list l-coupon-invalid">
                <div class="l-coupon-item l-link l-margin-b" v-for="item in scroll2.alldata">
                  <div class="_bd l-flex-hc">
                    <div class="_val l-border-r l-text-wrap1">
                      <i class="l-icon">&#xe6cb;</i><span v-text="item.coupon_charge"></span>
                    </div>
                    <div class="_desc l-rest">
                      <h3 class="l-text-wrap1" v-text="item.title"></h3>
                      <p class="l-text-wrap2 l-fs-s" v-text="item.description">~</p>
                    </div>
                  </div>
                  <div class="_ft l-border-t">
                    <span class="l-text-gray">{{item.sale_type_name}} · 失效日期：{{item.valid}}</span>
                  </div>
                </div>
              </div>
              <div slot="data-null">
                <img src="~assets/youhuiquan.png" alt="">
                <p>没有相关的优惠券</p>
              </div>
            </l-scroll>
          </div>
        </div>
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
      tabIndex: 0,
      scroll1: {},
      scroll2: {}
    }
  },
  methods: {
    getCoupons(type, page, row) {
      return this.$server.user.getCoupons(page, row, type)
      .then(({list})=>{
        this['couponList' + type] = list
      }) 
    },
    tabClick(type = 1) {
      this.tabIndex = type
      const currentScroll = this['scroll' + this.tabIndex]
      if(!currentScroll.isAjax){
        currentScroll.init()  
      }
      this.$router.replace(`/user/coupons?tab=` + this.tabIndex)
    }
  },
  created() {
    // 初始化数据
    this.scroll1 = this.$server.user.getCoupons(1)
    this.scroll2 = this.$server.user.getCoupons(2)

    setTimeout(()=>{
      this.tabClick(this.$route.query.tab)
    }, 600)
  }
}
</script>