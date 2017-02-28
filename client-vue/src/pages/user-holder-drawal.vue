<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-text-table l-margin-b" v-for="item in list">
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
      list: []
    }
  },
  created() {
    setTimeout(()=>{
      $.showIndicator()
      this.$server.holder.getDrawal(1, 10).then(({list})=>{
        this.list = list
      }).finally(()=>{
        $.hideIndicator()
      })
    }, 600)
  }
}
</script>