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
          合计：<span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>200.00</span>
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
          <div class="l-shopcar-item l-flex-h l-border-b" v-for="item in 10">
            <label class="l-checkbox">
              <input type="checkbox" :checked="checkAll">
              <i class="l-icon l-icon-radio"></i>
            </label>
            <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
            <div class="l-rest">
              <h4 class="l-text-clamp">商品名称商品名称商</h4>
              <div class="l-shopcar-item-disc">
                <span v-if="!isEdit" class="pull-right l-num">x1</span>
                <span v-else class="pull-right l-number">
                  <i class="l-icon">&#xe635;</i>
                  <input type="tel" value="1">
                  <i class="l-icon">&#xe62a;</i>
                </span>
                <span class="l-text-warn">
                  <i class="l-icon">&#xe6cb;</i>200.00
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
      checkAll: false
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    
  },
  mounted() {
    
  },
  updated() {

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
/* 购物车 */
.l-shopcar-hd{padding: 0.375rem 0.75rem;background-color: #fff;}
.l-shopcar-list{background: #fff;}
.l-shopcar-item{padding: 0.75rem 0.75rem;}
.l-shopcar-item h4{line-height: 1.2;margin:0;height: 1.75rem; font-size: 0.8rem;font-weight: 400;}
.l-shopcar-item .l-thumb{/*width: 3.25rem;height: 3.25rem;*/margin-right: 0.5rem;}
.l-shopcar-item .l-checkbox{width: 2.0rem;margin-left: -0.25rem;}
.l-shopcar-item .l-checkbox .l-icon-radio{line-height: 3rem;}
.l-shopcar-item-disc{height: 1.5rem; line-height: 1.5rem;}
.l-shopcar-order-list{background-color: #fff;padding: 0.75rem 0.75rem 0.375rem;}
.l-shopcar-order-list .l-thumb{width: 3.0rem;height: 3.0rem;border-radius: 3px;margin:0 0.375rem 0.375rem 0; float: left;}
.l-discount-list{background-color: #fff;}
</style>