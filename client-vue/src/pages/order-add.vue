<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <footer class="l-page-footer l-border-t l-flex-hc">
        <div class="l-rest l-margin-l">
          订单金额：<span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>210.00</span>
        </div>
        <a class="button button-fill l-btn">&ensp;提交订单&ensp;</a>
      </footer>
      <div class="content">
        <!-- 购买的商品 -->
        <div class="l-shopcar-item l-flex-h l-border-t l-bg">
          <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
          <div class="l-rest">
            <h4 class="l-text-clamp">商品名称商品名称商</h4>
            <div class="l-shopcar-item-disc">
              <span class="pull-right l-number">
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
        <!-- 购买的商品 end-->

        <!-- 配送方式 -->
        <div class="list-block">
          <ul>
            <li class="item-link item-content">
              <div class="item-inner">
                <div class="item-title l-text-gray">配送方式</div>
                <div class="item-after">
                  <div class="item-input">
                    <input class="l-text-right" id="delivery-way" type="text" placeholder="请选择" readonly value="到店自取">
                  </div>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title l-text-gray">支持取货时间</div>
                <div class="item-after">即可</div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 配送方式 end-->

        <!-- 选择门店 -->
        <div class="l-panel-title l-link-arrow">
          <a class="pull-right">更换</a>
          <h3 class="l-text-gray">选择门店</h3>
        </div>
        <div class="l-store-item l-border-t l-margin-b">
          <a class="l-store-item-bd l-flex-h" href="store-details.html">
            <img class="l-thumb" src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0894ec&txtclr=fff&txt=120x120&w=120&h=120">
            <div class="l-rest l-flex-v">
              <div class="l-rest">
                <span class="pull-right l-fs-s l-text-gray"><i class="l-icon">&#xe634;</i>3.8km</span>
                <h4>化州店</h4>
              </div>
              <p>番禺区新胶东路的方式看见对方333号</p>
            </div>
          </a>
        </div>
        <!-- 选择门店 end-->

        <!-- 适用车型 -->
        <div class="l-panel-title l-margin-t">
          <h3 class="l-text-gray">适用车型</h3>
        </div>
        <div class="l-flex-hc l-padding l-bg l-border-t">
          <img class="l-thumb-circle-s l-margin-r-s" src="https://placeholdit.imgix.net/~text?txtsize=28&amp;bg=0894ec&amp;txtclr=fff&amp;txt=Logo&amp;w=120&amp;h=120">
          <div class="l-rest l-margin-r-s">
            <h4 class="l-margin-0">宝马 WRANGLER RUBICON 3.6L越野的飞机的扩大解放车</h4>
          </div>
        </div>
        <!-- 适用车型 end-->

        <!-- 商品总价 -->
        <div class="l-panel-title l-margin-t">
          <h3 class="l-text-gray">优惠选项</h3>
        </div>
        <div class="l-discount-list l-margin-b">
          <div class="l-flex-h l-padding l-border-t">
            <label class="l-checkbox l-margin-r-s">
              <input type="radio" name="discount" checked>
              <i class="l-icon l-icon-radio"></i>
            </label>
            <div class="l-rest">
              <h4 class="l-margin-0">使用积分抵扣</h4>
              <p class="l-margin-0 l-fs-s">当前可用积分1000，可使用100积分抵扣10元</p>
            </div>
          </div>
          <div class="l-flex-h l-padding l-border-t">
            <label class="l-checkbox l-margin-r-s">
              <input type="radio" name="discount">
              <i class="l-icon l-icon-radio"></i>
            </label>
            <div class="l-rest">
              <h4 class="l-margin-0">使用积分抵扣</h4>
              <p class="l-margin-0 l-fs-s">当前可用积分1000，可使用100积分抵扣10元</p>
            </div>
          </div> 
        </div>
        <!-- 商品总价 end-->
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
     
    }
  }
}
</script>