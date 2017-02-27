<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="buttons-tab l-order-tab">
          <a href="#tab2" class="tab-link button active"><img src="~assets/img-040.jpg">待付款</a>
          <a href="#tab3" class="tab-link button"><img src="~assets/img-041.jpg">待收货</a>
          <a href="#tab4" class="tab-link button"><img src="~assets/img-042.jpg">待评价</a>
          <a href="#tab5" class="tab-link button"><img src="~assets/img-043.jpg">已完成</a>
        </div>
        <div class="tabs">
          <div id="tab2" class="tab active">
            <!-- 列表 -->
            <div class="l-user-good l-margin-tb" v-for="item in orderList1">
              <a class="l-user-good-bd l-flex-h">
                <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
                <div class="l-rest l-flex-v">
                  <div class="l-rest">
                    <h4 class="l-text-wrap2 l-fs-s">地方了发动机里看到寄过来的空间隔离开关的广泛的了感觉</h4>
                  </div>
                  <p>
                    <span class="pull-right">x1</span>
                    <span class="l-text-warn"><i class="l-icon"></i>200.00</span>
                  </p>
                </div>
              </a>
              <div class="l-user-good-ft l-flex-hc l-border-t l-fs-m">
                <div class="l-rest">待付款</div>
                <a class="button l-btn-gray">取消</a>
                <a class="button button-fill l-margin-l-s">支付</a>
              </div>
            </div>
            <!-- 列表 end-->
          </div>
          <div id="tab3" class="tab">
            <!-- 列表 -->
            <div class="l-user-good l-margin-tb">
              <a class="l-user-good-bd l-flex-h">
                <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
                <div class="l-rest l-flex-v">
                  <div class="l-rest">
                    <h4 class="l-text-wrap2">地方了发动机里看到寄过来的空间隔离开关的广泛的了感觉到了地方了发动机里看到寄过来的空间隔离开关的</h4>
                  </div>
                  <p>
                    <span class="pull-right">x1</span>
                    <span class="l-text-warn"><i class="l-icon"></i>200.00</span>
                  </p>
                </div>
              </a>
              <div class="l-user-good-ft l-flex-hc l-border-t">
                <div class="l-text-warn l-rest">待收货</div>
                <a href="#" class="button">查看物流</a>
              </div>
            </div>
            <!-- 列表 end-->
          </div>
          <div id="tab4" class="tab">
            <!-- 列表 -->
            <div class="l-user-good l-margin-tb">
              <a class="l-user-good-bd l-flex-h">
                <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
                <div class="l-rest l-flex-v">
                  <div class="l-rest">
                    <h4 class="l-text-wrap2">地方了发动机里看到寄过来的空间隔离开关的广泛的了感觉到了地方了发动机里看到寄过来的空间隔离开关的</h4>
                  </div>
                  <p>
                    <span class="pull-right">x1</span>
                    <span class="l-text-warn"><i class="l-icon"></i>200.00</span>
                  </p>
                </div>
              </a>
              <div class="l-user-good-ft l-flex-hc l-border-t">
                <div class="l-text-warn l-rest">待评价</div>
                <a href="user-goods-evaluate.html" class="button">评价</a>
              </div>
            </div>
            <!-- 列表 end-->
          </div>
          <div id="tab5" class="tab">
            <!-- 列表 -->
            <div class="l-user-good l-margin-tb">
              <a class="l-user-good-bd l-flex-h">
                <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
                <div class="l-rest l-flex-v">
                  <div class="l-rest">
                    <h4 class="l-text-wrap2">地方了发动机里看到寄过来的空间隔离开关的广泛的了感觉到了地方了发动机里看到寄过来的空间隔离开关的</h4>
                  </div>
                  <p>
                    <span class="pull-right">x1</span>
                    <span class="l-text-warn"><i class="l-icon"></i>200.00</span>
                  </p>
                </div>
              </a>
              <div class="l-user-good-ft l-flex-hc l-border-t">
                <div class="l-text-warn l-rest">已完成</div>
              </div>
            </div>
            <!-- 列表 end-->
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
a.button{border-radius: 0;}
.button.l-btn-gray{border-color: transparent !important; color: #999; background-color: transparent !important;}
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