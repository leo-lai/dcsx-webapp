<template>
  <div>
  	<!-- 列表 -->
    <div class="l-user-good l-margin-tb" v-for="item in list">
      <div class="l-user-good-hd l-link-arrow">
        <span class="l-text-gray">订单编号：{{item.order_sn}}</span>
      </div>
      <a class="l-user-good-bd l-border-t l-flex-hc" v-if="item.goods_list.length > 1">
        <div class="l-rest l-thumbs">
          <img class="l-thumb" :src="good.picpath" v-for="good in item.goods_list">
        </div>
        <div class="l-margin-l l-text-center">
          <p class="l-fs-s">共{{item.num}}件</p>
          <p class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{item.order_amount}}</p>
        </div>
      </a>
      <a class="l-user-good-bd l-border-t l-flex-hc" v-else>
        <img class="l-thumb" :src="item.goods_list[0].picpath">
        <div class="l-rest">
          <h4 class="l-text-wrap2 l-fs-s" v-text="item.goods_list[0].goods_name"></h4>
          <p class="l-fs-s l-text-gray">
            <!-- <span class="pull-right">x{{item.goods_list[0].goods_num}}</span> -->
            <span><i class="l-icon"></i>单价：{{item.goods_list[0].market_price}}</span>
          </p>
        </div>
        <div class="l-margin-l l-text-center">
          <p class="l-fs-s">共{{item.num}}件</p>
          <p class="l-text-warn"><i class="l-icon">&#xe6cb;</i>{{item.order_amount}}</p>
        </div>
      </a>
      <div class="l-user-good-ft l-flex-hc l-border-t l-fs-m">
        <template v-if="type == 1">
          <div class="l-rest">待付款</div>
          <a class="button l-btn-gray">取消</a>
          <a class="button button-fill l-margin-l-s">支付</a>
        </template>
      </div>
    </div>
    <!-- 列表 end-->
  </div>
</template>
<script>
export default {
  props: {
    list: { // 订单列表数据
      type: Array,
      default: []
    },
    type: { // 订单状态 1待收货2待发货3待评价4已完成
      type: Number,
      default: 1
    }
  }
}
</script>
<style scoped>
a.button{border-radius: 0;}
.button.l-btn-gray{border-color: transparent !important; color: #999; background-color: transparent !important;}
.l-user-good{background-color: #fff;}
.l-user-good-hd{padding:0.5rem 0.75rem; font-size: 0.75rem;}
.l-user-good-bd{padding: 0.75rem; color: inherit;}
.l-user-good-bd .l-thumb{margin-right: 0.5rem;border:1px solid #f3f3f3;}
.l-user-good-bd p{font-size: 0.7rem;}
.l-user-good-ft{background-color: #fff;padding: 0.375rem 0.75rem;}
.l-user-good-bd .l-text-wrap2{height: 2rem;}
.l-user-good-bd .l-thumbs{margin:-0.375rem 0 0 -0.375rem;}
.l-user-good-bd .l-thumbs .l-thumb{margin:0.375rem 0 0 0.375rem;vertical-align: top;}
</style>