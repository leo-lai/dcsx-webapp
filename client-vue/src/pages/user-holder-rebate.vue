<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <div class="l-text-table l-margin-b" v-for="item in scroll.alldata">
            <div class="_tr l-border-b">
              <div class="_tit">消费单号</div>
              <div class="_rest" v-text="item.order_sn"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">消费门店</div>
              <div class="_rest" v-text="item.org_name"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">消费人员</div>
              <div class="_rest" v-text="item.nickname"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">消费时间</div>
              <div class="_rest" v-text="item.posttime"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">消费金额</div>
              <div class="_rest"><span class="l-text-hot" v-text="item.charge"></span> 元</div>
            </div>
            <div class="_tr">
              <div class="_tit">返利金额</div>
              <div class="_rest"><span class="l-text-ok" v-text="item.invite_rate"></span> 元</div>
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
  created() {
    this.scroll = this.$server.holder.getRebate()
    setTimeout(()=>{
      this.scroll.init()
    }, 600)
  }
}
</script>