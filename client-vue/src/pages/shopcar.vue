<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <div class="bar bar-tab-secondary l-flex-hc" style="z-index:100;padding-right:0;">
        <label class="l-checkbox">
          <input type="checkbox" v-model="checkAll">
          <i class="l-icon l-icon-radio"></i>
          <span>全选</span>
        </label>
        <div class="l-rest l-text-center">
          合计：<span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>0.00</span>
        </div>
        <a v-if="!isEdit" class="button button-fill l-btn" style="width: 4.0rem;" href="shopcar-order.html">去结算</a>
        <a v-else class="button button-fill l-btn l-btn-error" style="width: 4.0rem;">删除</a>
      </div>
      <div class="content" >
        <div class="l-shopcar-hd l-flex-hc l-border-b">
          <div class="l-rest"></div>
          <a @click="edit" v-text="isEdit ? '完成': '编辑'">编辑</a>
        </div>
        <!-- 列表 -->
        <div class="l-shopcar-list">
          <div class="l-shopcar-item l-flex-h l-border-b" v-for="item in goodsList">
            <label class="l-checkbox">
              <input type="checkbox" :checked="checkAll">
              <i class="l-icon l-icon-radio"></i>
            </label>
            <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
            <div class="l-rest">
              <h4 class="l-text-clamp" v-text="item.goods_name"></h4>
              <div class="l-shopcar-item-disc">
                <span v-if="!isEdit" class="pull-right l-num">x{{item.goods_number}}</span>
                <span v-else class="pull-right l-number">
                  <i class="l-icon">&#xe635;</i>
                  <input type="tel" v-model="item.goods_number">
                  <i class="l-icon">&#xe62a;</i>
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
      isEdit: false,
      checkAll: false,
      goodsList: []
    }
  },
  created() {
    $.showIndicator()
    this.$server.shopcar.getList().then(({list})=>{
      this.goodsList= list
    }).finally(()=>{
      $.hideIndicator()
    })
  },
  methods: {
    edit: function(){
      this.isEdit = !this.isEdit;
    },
    del: function(){

    }
  }
}
</script>
<style>

</style>