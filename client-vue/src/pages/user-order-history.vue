<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <template v-for="item in scroll.alldata">
            <div class="l-panel-title l-link-arrow" @click="viewInfo(item)">
              <a class="pull-right">明细</a>
              <span class="l-text-gray">订单信息</span>
            </div>
            <div class="l-text-table l-margin-b l-border-t">
              <div class="_tr">
                <div class="_tit">订单编号</div>
                <div class="_rest" v-text="item.order_sn"></div>
              </div>
              <div class="_tr l-border-t">
                <div class="_tit">消费金额</div>
                <div class="_rest"><span v-text="item.order_amount"></span> 元</div>
              </div>
              <div class="_tr l-border-t">
                <div class="_tit">消费门店</div>
                <div class="_rest" v-text="item.org_name"></div>
              </div>
              <div class="_tr l-border-t">
                <div class="_tit">消费时间</div>
                <div class="_rest" v-text="item.finish_time"></div>
              </div>
            </div>
          </template>
        </l-scroll>
      </div>
    </div>
    <!-- 订单明细 -->
    <div class="panel panel-right panel-reveal l-panel-big" id="itemInfo">
      <header class="bar bar-nav">
        <h1 class="title">消费项目({{itemInfo.length}})</h1>
      </header>
      <div class="content">
        <div class="l-text-table l-fs-m">
          <div class="_tr" :class="{'l-border-t': index > 0}" v-for="(item, index) in itemInfo">
            <div class="_rest l-margin-r" v-text="item.service_name"></div>
            <div class="_td"><span class="l-text-hot" v-text="item.service_charge"></span> 元</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单明细 end-->
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
      scroll: {},
      itemInfo: []
    }
  },
  methods: {
    viewInfo(item) {
      this.itemInfo = item.project_list
      this.$nextTick(()=>{
        $.openPanel('#itemInfo')
      })
    }
  },
  created() {
    this.scroll = this.$server.order.getHistory()
    setTimeout(()=>{
      this.scroll.init()
    }, 600)
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel()
    next()
  }
}
</script>
<style scoped>
</style>