<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content infinite-scroll pull-to-refresh-content">
        <!-- 默认的下拉刷新层 -->
        <div class="pull-to-refresh-layer">
          <div class="preloader"></div>
          <div class="pull-to-refresh-arrow"></div>
        </div>
        <div class="buttons-tab l-order-tab l-sticky">
          <a @click="tabClick(1)" class="tab-link button" :class="{'active': orderType == 1}"><img src="~assets/img-040.jpg">待付款</a>
          <a @click="tabClick(2)" class="tab-link button" :class="{'active': orderType == 2}"><img src="~assets/img-041.jpg">待收货</a>
          <!-- <a @click="tabClick(3)" class="tab-link button" :class="{'active': orderType == 3}"><img src="~assets/img-042.jpg">待评价</a> -->
          <a @click="tabClick(4)" class="tab-link button" :class="{'active': orderType == 4}"><img src="~assets/img-043.jpg">已完成</a>
        </div>
        <div class="tabs">
          <div class="tab" :class="{'active': orderType == 1}">
            <l-order-list :list="scroll1.alldata" :type="1"></l-order-list>
            <div class="l-data-null" v-if="scroll1.isAjax && scroll1.alldata.length === 0">
              <img src="~assets/shangping.png" alt="">
              <p>您还没有相关的商品</p>
            </div>
            <div v-show="scroll1.isLoading" class="infinite-scroll-preloader">
              <div class="preloader"></div>
            </div>
            <div v-show="scroll1.isNull && scroll1.alldata.length > 0" class="infinite-scroll-preloader">
              <span class="l-text-gray">没有更多了</span>
            </div>
          </div>
          <div class="tab" :class="{'active': orderType == 2}">
            <l-order-list :list="scroll2.alldata" :type="2"></l-order-list>
            <div class="l-data-null" v-if="scroll2.isAjax && scroll2.alldata.length === 0">
              <img src="~assets/shangping.png" alt="">
              <p>您还没有相关的商品</p>
            </div>
            <div v-show="scroll2.isLoading" class="infinite-scroll-preloader">
              <div class="preloader"></div>
            </div>
          </div>
          <div class="tab" :class="{'active': orderType == 4}">
            <l-order-list :list="scroll4.alldata" :type="4"></l-order-list>
            <div class="l-data-null" v-if="scroll4.isAjax && scroll4.alldata.length === 0">
              <img src="~assets/shangping.png" alt="">
              <p>您还没有相关的商品</p>
            </div>
            <div v-show="scroll4.isLoading" class="infinite-scroll-preloader">
              <div class="preloader"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lHeader from 'components/l-header'
import lOrderList from 'components/l-order-list'

export default {
  components: {
    lHeader, lOrderList
  },
  data () {
    return {
      orderType: 0,
      scroll1: {},
      scroll2: {},
      scroll4: {}
    }
  },
  methods: {
    tabClick(type = 1) {
      const self = this
      self.orderType = type
      const currentScroll = this['scroll' + this.orderType]
      if(!currentScroll.isAjax){
        currentScroll.row = 4
        currentScroll.callback = function(){
          
        }
        currentScroll.init()  
      }
      this.$router.replace(`/user/order?tab=` + this.orderType)
    }
  },
  created() {
    const self = this

    // 取消订单
    self.$eventHub.$on('ORDER-CANCEL', (orderId)=>{
      self.scroll1.alldata = self.scroll1.alldata.filter((item)=>{
        return item.order_id !== orderId
      })
    })

    // 确认收货
    self.$eventHub.$on('ORDER-RECIVE', (orderId)=>{
      self.scroll2.alldata = self.scroll2.alldata.filter((item)=>{
        if(item.order_id === orderId){
          self.scroll4.alldata.unshift(item)  
        }
        return item.order_id !== orderId
      })
    })

    // 初始化数据
    self.scroll1 = self.$server.order.getList(1)
    self.scroll2 = self.$server.order.getList(2)
    self.scroll4 = self.$server.order.getList(4)

    setTimeout(()=>{
      self.tabClick(self.$route.query.tab)  
    }, 600)
    
    // 监听滚动到底部
    // self.$eventHub.$on('APP-INFINITE', ()=>{
    //   self['scroll' + this.orderType].next()
    // })
  },
  mounted() {
    $.initPullToRefresh('.pull-to-refresh-content')
    // setTimeout(()=>{
    //   $.pullToRefreshTrigger('.pull-to-refresh-content')  
    // }, 2000)
  },
  beforeDestroy() {
    $.destroyPullToRefresh('.pull-to-refresh-content')
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