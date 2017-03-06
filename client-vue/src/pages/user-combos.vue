<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content l-infinite-scroll">
        <l-scroll :scroll="scroll">
          <div class="l-combo-list">
            <div class="l-combo-item" v-for="item in scroll.alldata">
              <div class="l-combo-item-hd">
                <h3 class="l-text-warn" v-text="item.name"></h3>
                <p class="l-fs-m">购买价格：{{item.order_amount}} 元</p>
              </div>
              <div class="l-combo-item-bd">
                <table class="l-table-border-t l-fs-xs">
                  <tr class="l-text-gray l-text-nowrap">
                    <th>套餐项目</th>
                    <th>包含次数</th>
                    <th>剩余次数</th>
                  </tr>
                  <tr v-for="item2 in item.servicelist">
                    <td>{{item2.service_name}}</td>
                    <td>{{item2.total_number}}</td>
                    <td>{{item2.service_number}}</td>
                  </tr>
                </table>
              </div>
              <div class="l-combo-item-ft l-padding l-fs-xs l-text-gray">
                <span>有效期至：{{item.valid_date}}</span>
                <!-- <a class="pull-right">消费记录</a> -->
              </div>
            </div>
          </div>
          <div slot="data-null">
            <img src="~assets/taocan.png">
            <p>您还没有相关的套餐</p>
            <p><button class="button button-round" @click="$link('/combos', 'page-in')">去购买</button></p>
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
    this.scroll = this.$server.user.getCombos()
    setTimeout(()=>{
      this.scroll.init()
    }, 600)
  }
}
</script>
<style scoped>
.l-fs-m th, .l-fs-m td{padding: 0.5rem 0.25rem;}
.l-combo-list{margin: 0.75rem;}
.l-combo-item{background-color: #fff; margin-bottom: 0.75rem;}
.l-combo-item-hd{ position: relative; border-bottom: 1px dashed #f3f3f3;margin:0 0.75rem; padding: 1rem 0.75rem; text-align: center;}
.l-combo-item-hd h3{margin-bottom: 0.25rem;font-size: 1.0rem;}
.l-combo-item-hd:before,
.l-combo-item-hd:after{
  content: ''; position: absolute; top: 0; bottom: -0.5rem; width: 10px;
  background: radial-gradient(#efeff4 10px, transparent 0, transparent 0) no-repeat;
  background-size: 20px 20px;
}
.l-combo-item-hd:before{left: -0.75rem; background-position: -10px 100%; }
.l-combo-item-hd:after{right: -0.75rem; background-position: 0 100%; }
.l-combo-item-bd{margin: 0 0.75rem;}
</style>