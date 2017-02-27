<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="bar bar-header-secondary l-bg">
        <div class="l-flex-hc l-padding-tb-s l-text-center l-text-gray">
          <span class="l-rest" @click="sortByPrice">
            按价格排序 
            <i class="l-icon" v-show="sortType === 'desc'">&#xe8d7;</i>
            <i class="l-icon" v-show="sortType === 'asc'">&#xe609;</i>
          </span>
          <span class="l-rest" onclick="$.openPanel('#panelCategory2')">
            分类筛选 
            <i class="l-icon">&#xe61b;</i>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="l-goods-list">
          <div class="row">
            <router-link class="col-50 l-goods-item l-text-default" :to="'/shop/goods/info/' + item.id " v-for="item in goodsList">
              <img class="l-thumb" :src="item.picpath">
              <div class="l-margin-xs">
                <h4 class="l-text-wrap1" v-text="item.goods_name"></h4>
              </div>
              <div class="l-margin-xs l-fs-m">
                <span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{item.market_price}}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 二级分类 -->
    
    <div class="panel panel-right panel-cover l-panel-big" id="panelCategory2">
      <header class="bar bar-nav">
        <h1 class="title">选择商品分类</h1>
      </header>
      <div class="content">
        <ul class="l-goods-category2">
          <li class="active" @click="sltCategory2({cateid: 0}, $event)">全部</li>
          <li v-for="item in category2" @click="sltCategory2(item, $event)" v-text="item.name"></li>
        </ul>
      </div>
    </div>
    <!-- 二级分类 end-->
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
      sortType: '', // asc
      category2: [],
      goodsList: []
    }
  },
  methods: {
    getGoodsList(category2_id = 0) {
      $.showIndicator()
      return this.$server.shop.getGoodsList(1, 10, this.category1_id, category2_id)
      .then(({list})=>{
        this.goodsList = list
      }).finally(()=>{
        $.hideIndicator()
      })
    },
    sltCategory2(item, event) {
      $(event.target).addClass('active').siblings('.active').removeClass('active')
      this.getGoodsList(item.cateid).then(()=>{
        $.closePanel('#panelCategory2')  
      })
    },
    sortByPrice() {
      this.sortType = this.sortType === 'desc' ? 'asc' : 'desc'
      this.goodsList = this.goodsList.sort((item1, item2)=>{
        let price1 = item1.market_price
        let price2 = item2.market_price
        return this.sortType === 'desc' ? (price1 - price2) : (price2 - price1)
      })
    }
  },
  created() {
    this.category1_id = this.$route.params.id

    setTimeout(()=>{
      // 商品列表
      this.getGoodsList()

      // 二级分类
      this.$server.shop.getCategory2(this.category1_id)
      .then(({list})=>{
        this.category2 = list
      })
    }, 600)
  },
  beforeRouteLeave(to, from, next) {
    $.closePanel()
    next()
  }
}
</script>
<style scoped lang="less">
.l-goods-item{height: 11.5rem; overflow: hidden;}
.l-goods-category2{overflow: hidden; list-style: none; margin: 0; padding: 4%;}
.l-goods-category2 li{float: left; border: 1px solid rgba(0,0,0,0.1); padding: 0.375rem 0.25rem; width: 48%;margin-bottom: 4%;text-align: center; font-size: 0.75rem;}
.l-goods-category2 li:nth-child(odd){margin-right: 4%;}
.l-goods-category2 li.active{border-color: #3d93f5;}
</style>