<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <div class="l-text-table l-margin-b" v-for="item in scroll.alldata">
            <div class="_tr l-border-b">
              <div class="_tit">提现单号</div>
              <div class="_rest" v-text="item.log_sn"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">提现渠道</div>
              <div class="_rest" v-text="item.channel"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">提现金额</div>
              <div class="_rest"><span v-text="item.money"></span> 元</div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">提现时间</div>
              <div class="_rest" v-text="item.drawal_date"></div>
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
    this.scroll = this.$server.holder.getDrawal()
    setTimeout(()=>{
      this.scroll.init()
    }, 600)
  }
}
</script>