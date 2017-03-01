<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="buttons-tab l-order-tab">
          <a @click="tabClick(1)" class="tab-link button" :class="{'active': orderType == 1}"><img src="~assets/img-040.jpg">待付款</a>
          <a @click="tabClick(2)" class="tab-link button" :class="{'active': orderType == 2}"><img src="~assets/img-041.jpg">待收货</a>
          <!-- <a @click="tabClick(3)" class="tab-link button" :class="{'active': orderType == 3}"><img src="~assets/img-042.jpg">待评价</a> -->
          <a @click="tabClick(4)" class="tab-link button" :class="{'active': orderType == 4}"><img src="~assets/img-043.jpg">已完成</a>
        </div>
        <div class="tabs">
          <div class="tab" :class="{'active': orderType == 1}">
            <l-order-list :list="orderList1" :type="1"></l-order-list>
          </div>
          <div class="tab" :class="{'active': orderType == 2}">
            <l-order-list :list="orderList2" :type="2"></l-order-list>
          </div>
          <!-- <div class="tab" :class="{'active': orderType == 3}">
            <l-order-list :list="orderList3" :type="3"></l-order-list>
          </div> -->
          <div class="tab" :class="{'active': orderType == 4}">
            <l-order-list :list="orderList4" :type="4"></l-order-list>
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
      orderList1: [],
      orderList2: [],
      orderList3: [],
      orderList4: [],
    }
  },
  methods: {
    tabClick(type = 1) {
      this.orderType = type
      if(this['orderList' + this.orderType].length === 0){
        $.showIndicator()
        this.$server.order.getList(1, 10, this.orderType)
        .then(({list})=>{
          $.hideIndicator()
          this['orderList' + this.orderType] = list
        })
      }

      this.$router.replace(`/user/order?tab=` + this.orderType)
    }
  },
  created() {
    this.$eventHub.$on('ORDER-CANCEL', (orderId)=>{
      this.orderList1 = this.orderList1.filter((item)=>{
        return item.order_id !== orderId
      })
    })
    setTimeout(()=>{
      this.tabClick(this.$route.query.tab)
    }, 600)
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