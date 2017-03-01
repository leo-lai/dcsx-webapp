<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-text-table l-margin-b" v-for="item in list">
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
      this.$server.holder.getRebate(1, 10).then(({list})=>{
        this.list = list
      }).finally(()=>{
        $.hideIndicator()
      })
    }, 600)
  }
}
</script>