<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <!-- 这里是页面内容区 -->
      <div class="content">
        <!-- user info -->
        <div class="l-panel-user l-flex-v">
          <div class="l-panel-user-bg" :style="{'background-image': 'url('+ userInfo.avator +')'}"></div>
          <div class="l-panel-user-avatar l-rest l-flex-vhc">
            <img class="l-icon-qrcode" src="~assets/icon-qrcode.png" @click="showQrcode" alt="">
            <div class="l-avatar" :style="{'background-image': 'url('+ userInfo.avator +')'}"></div>
            <h3 v-text="userInfo.username"></h3>
            <p class="l-fs-s" v-text="userInfo.level_name"></p>
          </div>
          <div class="l-panel-user-bar l-flex-h l-border-t l-fs-s">
            <div class="l-rest l-flex-hvc l-border-r">
              账户余额：<strong v-text="userInfo.total_amount"></strong>
            </div>
            <div class="l-rest l-flex-hvc">
              账户积分：<strong v-text="userInfo.point"></strong>
            </div>
          </div>  
        </div>
        <div class="row no-gutter l-user-menu l-margin-b">
          <router-link class="col-33 l-text-default" to="/user/combos">
            <p><img src="~assets/img-026.jpg"></p>
            <p>套餐</p>
          </router-link>
          <router-link class="col-33 l-text-default" to="/user/coupons">
            <p><img src="~assets/img-027.jpg"></p>
            <p>优惠券</p>
          </router-link>
          <router-link class="col-33 l-text-default" to="/user/order">
            <p><img src="~assets/img-028.jpg"></p>
            <p>商品</p>
          </router-link>
        </div>
        <div class="row no-gutter l-user-menu">
          <router-link class="col-33 l-text-default" to="/user/stores">
            <p><img src="~assets/img-029.jpg"></p>
            <p>查看门店</p>
          </router-link>
          <router-link class="col-33 l-text-default" to="/user/order/history">
            <p><img src="~assets/img-030.jpg"></p>
            <p>消费记录</p>
          </router-link>
          <router-link class="col-33 l-text-default" to="/user/agent">
            <p><img src="~assets/img-031.jpg"></p>
            <p>分销记录</p>
          </router-link>
        </div>
        <div class="row no-gutter l-user-menu">
          <router-link class="col-33 l-text-default" to="/user/holder">
            <p><img src="~assets/img-032.jpg"></p>
            <p>分红记录</p>
          </router-link>
          <a class="col-33 l-text-default">
            <p><img src="~assets/img-033.jpg"></p>
            <p>充值</p>
          </a>
          <a class="col-33 l-text-default" @click="exit">
            <p><img src="~assets/img-034.jpg"></p>
            <p>退出登录</p>
          </a>
        </div>
      </div>
    </div>
    <!-- 二维码弹窗 -->
    <transition name="fade">
      <div class="l-layer l-flex-vhc" v-cloak v-show="isShowQrcode">
        <div class="l-panel-user-qrcode">
          <div class="l-flex-hc l-margin-b">
            <div class="l-avatar l-margin-r" :style="{'background-image': 'url('+ userInfo.avator +')'}"></div>
            <h3 v-text="userInfo.username"></h3>
          </div>
          <div class="l-qrcode l-bg-cover l-mask" :style="{'background-image': 'url('+ userInfo.avator +')'}">
            <img src="~assets/temp-003.jpg" alt="">
          </div>
        </div>
        <i class="l-icon l-close-radius" @click="showQrcode">&#xe62e;</i>
      </div>
    </transition>
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
      images: {
        temp1: require('assets/temp-001.jpg'),
        temp2: require('assets/temp-002.jpg'),
      },
      userInfo: {},
      isShowQrcode: false  // 显示二维码
    }
  },
  created() {
    this.$server.user.getInfo().then(({obj})=>{
      this.userInfo = obj
    })
  },
  methods: {
    exit: function(){
      $.confirm('确定退出登录？', ()=>{
        this.$server.logout(true)
      })
    },
    showQrcode() {
      this.isShowQrcode = !this.isShowQrcode
    }
  }
}
</script>
<style scoped>
/*个人中心*/
.l-user-menu{
  background-color: #fff;
  text-align: center;
  padding: 0.75rem 0;
}
.l-user-menu img{
  width: 3.0rem;
  height: 2.25rem;
}
.l-user-level{position: relative; }
.l-user-level:after{
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1rem;
  height: 1rem;
  background: url(~assets/icon-gold.png) no-repeat 50% 50%;
  background-size: contain;
}
.l-panel-user{position:relative; z-index:0; height: 10rem; padding-top: 0.75rem;margin-top: -0.75rem;}
.l-panel-user:before{
  content: ''; position: absolute; left:0; top:0; width:100%; height: 100%;
  background-color: rgba(0,0,0, 0.5);
}
.l-panel-user-bg{
  background: #666 no-repeat 50% 50%; background-size: cover;
  position: absolute; left:0; top:0; width:100%; height: 100%;
  z-index: -1; filter: blur(5px);
}
.l-panel-user-bar{
  position: relative; width:100%; padding: 0.5rem 0;
  background-color: rgba(0,0,0,0.2);
}
.l-panel-user-bar.l-border-t:before{opacity: 0.3;}
.l-panel-user-bar .l-border-r:after{opacity: 0.3;}
.l-panel-user-bar > .l-rest{color: #fff; width: 50%; height: 100%; text-align: center; }
.l-panel-user-bar strong{color: #fd9502; font-weight: 400; }
.l-panel-user-avatar{position: relative;text-align: center; overflow: hidden; color: #fff; }
.l-panel-user-avatar .l-icon-qrcode{font-size: 1.2rem; color: rgba(255,255,255,0.6); width: 1.25rem;height: 1.25rem;
  position: absolute;top: 0.5rem;right: 0.75rem;}
.l-panel-user-avatar h3{margin:0.375rem 0 0 0;}
/*.l-panel-user-avatar p{margin:0;}*/
.l-list-block-user{background-color: #fff;}
/*.l-list-block-user .item-content:last-child .item-inner:after{visibility: hidden;}*/
.l-list-block-user .l-icon{font-size: 1rem;}
.l-panel-user-qrcode{background-color: #fff;border-radius: 5px;padding: 1.0rem;}
.l-panel-user-qrcode .l-qrcode{padding: 1.5rem;}
.l-panel-user-qrcode .l-qrcode img{width: 10.0rem;height: 10.0rem;}
</style>