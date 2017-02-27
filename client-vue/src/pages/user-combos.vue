<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-combo-list">
          <div class="l-combo-item" v-for="item in comboList">
            <div class="l-combo-item-hd">
              <h3 class="l-text-warn">豪华至尊套餐</h3>
              <p class="l-fs-m">购买价格：1000.00 元</p>
            </div>
            <div class="l-combo-item-bd">
              <table class="l-table-border-t l-fs-m">
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
            <div class="l-combo-item-ft l-padding l-fs-m l-text-gray">
              <span>有效期至：{{item.valid_date}}</span>
              <!-- <a class="pull-right">消费记录</a> -->
            </div>
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
      comboList: []
    }
  },
  created() {
    setTimeout(()=>{
      this.$server.user.getCombos(1, 10).then(({list})=>{
        this.comboList = list
      })
    }, 600)
  }
}
</script>
<style scoped>
.l-fs-m th, .l-fs-m td{padding: 0.5rem 0.25rem;}
.l-combo-list{margin: 0.75rem;}
.l-combo-item{background-color: #fff; margin-bottom: 0.75rem;}
.l-combo-item-hd{ position: relative; border-bottom: 1px dashed #f3f3f3;margin:0 0.75rem; padding: 1.25rem 0.75rem; text-align: center;}
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