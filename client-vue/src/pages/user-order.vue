<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="buttons-tab l-order-tab">
          <a href="#tab1" @click="tabClick(1)" class="tab-link button active"><img src="~assets/img-040.jpg">待付款</a>
          <a href="#tab2" @click="tabClick(2)" class="tab-link button"><img src="~assets/img-041.jpg">待收货</a>
          <a href="#tab3" @click="tabClick(3)" class="tab-link button"><img src="~assets/img-042.jpg">待评价</a>
          <a href="#tab4" @click="tabClick(4)" class="tab-link button"><img src="~assets/img-043.jpg">已完成</a>
        </div>
        <div class="tabs">
          <div id="tab1" class="tab active">
            <l-order-list :list="orderList1" :type="1"></l-order-list>
          </div>
          <div id="tab2" class="tab">
            <l-order-list :list="orderList2" :type="2"></l-order-list>
          </div>
          <div id="tab3" class="tab">
            <l-order-list :list="orderList3" :type="3"></l-order-list>
          </div>
          <div id="tab4" class="tab">
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
      orderType: 1,
      orderList1: [],
      orderList2: [],
      orderList3: [],
      orderList4: [],
    }
  },
  methods: {
    tabClick(type) {
      this.orderType = type || this.orderType
      if(this['orderList' + this.orderType].length === 0){
        $.showIndicator()
        this.$server.order.getList(1, 10, this.orderType)
        .then(({list})=>{
          $.hideIndicator()
          this['orderList' + this.orderType] = list
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