<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <div class="bar bar-tab-secondary l-flex-hc" style="z-index:100;padding-right:0;">
        <label class="l-checkbox" @click="checkAll">
          <input type="checkbox" v-model="isCheckAll">
          <i class="l-icon l-icon-radio"></i>
          <span>全选</span>
        </label>
        <div class="l-rest l-text-center">
          合计：<span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{goodsPay.toFixed(2)}}</span>
        </div>
        <button class="button button-fill l-btn" style="width: 5.0rem;" :disabled="submiting" @click="submit">去结算</button>
      </div>
      <div class="content" >
        <div class="l-shopcar-hd l-flex-hc l-border-b">
          <div class="l-rest"></div>
          <a @click="delGoods">删除</a>
        </div>
        <!-- 列表 -->
        <div class="l-shopcar-list">
          <div class="l-shopcar-item l-flex-h l-border-b" v-for="item in goodsList">
            <label class="l-checkbox" @click="checkItem(item)">
              <input type="checkbox" v-model="item.checked">
              <i class="l-icon l-icon-radio"></i>
            </label>
            <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
            <div class="l-rest">
              <h4 class="l-text-clamp" v-text="item.goods_name"></h4>
              <div class="l-shopcar-item-disc">
                <span class="pull-right l-number">
                  <i class="l-icon" @click="minusNum(item)">&#xe635;</i>
                  <input type="tel" v-model="item.goods_number">
                  <i class="l-icon" @click="addNum(item)">&#xe62a;</i>
                </span>
                <span class="l-text-warn">
                  <i class="l-icon">&#xe6cb;</i>{{item.goods_price}}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 列表 end-->
      </div>
    </div>
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'
import lTabbar from 'components/l-tabbar'

export default {
  components: {
    lHeader, lTabbar
  },
  data () {
    return {
      submiting: false,
      isCheckAll: false,
      goodsPay: 0,
      goodsList: []
    }
  },
  methods: {
    minusNum(item) {
      item.goods_number = --item.goods_number > 0 ? item.goods_number : 1
    },
    addNum(item) {
      item.goods_number = Number(item.goods_number) + 1
    },
    checkItem(item) {
      item.checked = !item.checked
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll
      this.goodsList.map((item)=>{
        item.checked = this.isCheckAll
        return item
      })
    },
    delGoods: function(){
      if(this.jsonData.goods.length === 0){
        $.toast('您还没有选择商品哦', 2000, 'l-toast')
        return
      }
    },
    submit() {
      if(this.jsonData.goods.length === 0){
        $.toast('您还没有选择商品哦', 2000, 'l-toast')
        return
      }
    }
  },
  created() {
    const self = this
    self.watchGoodsList = self.$watch('goodsList', function(val){
      let sum = 0
      let goods = []
      val.forEach((item)=>{
        if(item.checked){
          sum += item.goods_price * item.goods_number
          goods.push({
            goods_id: item.goods_id,
            goods_number: item.goods_number
          })
        }
      })

      self.isCheckAll = goods.length > 0 && goods.length === val.length

      self.jsonData = {
        longitude: 0,
        latitude: 0,
        goods
      }
      self.goodsPay = sum

    }, { deep: true })

    $.showIndicator()
    self.$server.shopcar.getList().then(({list})=>{
      list.map((item)=>{
        item.checked = false
      })

      self.goodsList= list
    }).finally(()=>{
      $.hideIndicator()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.watchGoodsList()
    next()
  }
}
</script>
<style>

</style>