<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <div class="buttons-tab l-order-tab l-sticky">
          <a @click="tabClick(1)" class="tab-link button" :class="{'active': tabIndex == 1}"><img src="~assets/img-040.jpg">待付款</a>
          <a @click="tabClick(2)" class="tab-link button" :class="{'active': tabIndex == 2}"><img src="~assets/img-041.jpg">待收货</a>
          <!-- <a @click="tabClick(3)" class="tab-link button" :class="{'active': tabIndex == 3}"><img src="~assets/img-042.jpg">待评价</a> -->
          <a @click="tabClick(4)" class="tab-link button" :class="{'active': tabIndex == 4}"><img src="~assets/img-043.jpg">已完成</a>
        </div>
        <div class="tabs">
          <div class="tab" :class="{'active': tabIndex == 1}">
            <l-scroll :scroll="scroll1">
              <l-order-list :list="scroll1.alldata" :type="1"></l-order-list>
              <div slot="data-null">
                <img src="~assets/shangping.png" alt="">
                <p>没有相关的商品</p>
              </div>
            </l-scroll>
          </div>
          <div class="tab" :class="{'active': tabIndex == 2}">
            <l-scroll :scroll="scroll2">
              <l-order-list :list="scroll2.alldata" :type="2"></l-order-list>
              <div slot="data-null">
                <img src="~assets/shangping.png" alt="">
                <p>没有相关的商品</p>
              </div>
            </l-scroll>
          </div>
          <div class="tab" :class="{'active': tabIndex == 4}">
            <l-scroll :scroll="scroll4">
              <l-order-list :list="scroll4.alldata" :type="4"></l-order-list>
              <div slot="data-null">
                <img src="~assets/shangping.png" alt="">
                <p>没有相关的商品</p>
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
import lOrderList from 'components/l-order-list'

export default {
  components: {
    lHeader, lScroll, lOrderList
  },
  data () {
    return {
      tabIndex: 0,
      scroll1: {},
      scroll2: {},
      scroll4: {}
    }
  },
  methods: {
    tabClick(type = 1) {
      this.tabIndex = type
      const currentScroll = this['scroll' + this.tabIndex]
      if(!currentScroll.isAjax){
        currentScroll.init()  
      }
      this.$router.replace(`/user/order?tab=` + this.tabIndex)
    }
  },
  created() {
    // 取消订单
    this.$eventHub.$on('ORDER-CANCEL', (orderId)=>{
      this.scroll1.alldata = this.scroll1.alldata.filter((item)=>{
        return item.order_id !== orderId
      })
    })

    // 确认收货
    this.$eventHub.$on('ORDER-RECIVE', (orderId)=>{
      this.scroll2.alldata = this.scroll2.alldata.filter((item)=>{
        if(item.order_id === orderId){
          this.scroll4.alldata.unshift(item)  
        }
        return item.order_id !== orderId
      })
    })

    // 初始化数据
    this.scroll1 = this.$server.order.getList(1)
    this.scroll2 = this.$server.order.getList(2)
    this.scroll4 = this.$server.order.getList(4)

    setTimeout(()=>{
      this.tabClick(this.$route.query.tab)  
    }, 600)
  },
  mounted() {
    // $.initPullToRefresh('.pull-to-refresh-content')
    // setTimeout(()=>{
    //   $.pullToRefreshTrigger('.pull-to-refresh-content')  
    // }, 2000)
  },
  beforeDestroy() {
    // $.destroyPullToRefresh('.pull-to-refresh-content')
  }

}
</script>
<style scoped>
.l-order-tab .tab-link{
  line-height: inherit;
  height: auto;
  padding: 0.25rem 0;
  font-size: 0.7rem;
}
.l-order-tab .tab-link img{
  display: block;
  height: 1.25rem;
  margin: 0.125rem auto;
}
</style>