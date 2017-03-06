<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content" v-show="isShow">
        <!-- 分销记录 -->
        <div class="l-agnet-record" v-if="holderCode === 1">
          <div class="l-agent-hd">
            <div class="_notyet">
              <h3 style="font-size: 1.6rem;" v-text="holderInfo.holder_money"></h3>
              <p class="l-margin-t-s l-fs-m">
                <span>投资金额（单位：元）</span>
              </p>
              <p class="l-fs-s" style="opacity: 0.5;">
                投资时间：<span v-text="holderInfo.posttime"></span>
              </p>
            </div>
          </div>
          <div class="row no-gutter l-margin-b l-holder-menu">
            <router-link class="col-33 l-text-default" to="/user/holder/member">
              <p><img src="~assets/img-044.jpg"></p>
              <p>我的人脉</p>
              <p class="l-margin-t-s"><span class="l-text-warn" v-text="holderInfo.inviter_total"></span> 人</p>
            </router-link>
            <router-link class="col-33 l-text-default" to="/user/holder/rebate">
              <p><img src="~assets/img-045.jpg"></p>
              <p>累计分红</p>
              <p class="l-margin-t-s"><span class="l-text-warn" v-text="holderInfo.invite_charge"></span> 元</p>
            </router-link>
            <router-link class="col-33 l-text-default" to="/user/holder/drawal">
              <p><img src="~assets/img-046.jpg"></p>
              <p>提现记录</p>
              <p class="l-margin-t-s"><span class="l-text-warn" v-text="holderInfo.drawal_charge"></span> 元</p>
            </router-link>
          </div>

          <div class="l-holder-qrcode">
            <img :src="qrcode" alt="">
            <p class="l-text-gray l-fs-s">我的股东二维码</p>
          </div>
        </div>
        <!-- 分销记录 end-->
        <!-- 不是股东 -->
        <div class="l-agent-not" v-else>
          <div class="l-agent-hd l-margin-b">
            <div class="_notyet">
              <p class="l-margin-t-s"><img src="~assets/kulian.png" alt=""></p>
              <p class="l-margin-t-s">{{holderCodeMsg[holderCode]}}</p>
            </div>
          </div>
          <div class="l-panel l-margin-tb l-technician-work">
            <div class="l-panel-title l-border-b"><span class="l-text-gray">成为股东的好处</span></div>
            <div class="l-technician-suggest">
              <ul class="l-fs-m">
                <li class="l-border-t"><p>只需要少量投资便可以成为门店合伙人，无需参与管理；</p></li>
                <li class="l-border-t"><p>不管店铺是否盈利，只要通过您的二维码成为门店会员的车主消费了，您就有提成并实时到账，人脉越广，分红越多；</p></li>
                <li class="l-border-t"><p>投资金额可用于门店消费，洗车，办卡等，分红金额可提现，稳赚不赔，轻松创业；</p></li>
              </ul>
            </div>
          </div>
          <div class="l-panel l-margin-tb l-technician-work">
            <div class="l-panel-title l-border-b"><span class="l-text-gray">如何成为股东？</span></div>
            <div class="l-padding">
              <p class="l-fs-m">到门店与店主申请，店主同意您成为股东并在系统添加即可成为股东</p>
            </div>
          </div>
        </div>
        <!-- 不是股东 end-->
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
      isShow: false,
      qrcode: '',
      holderCode: 3,  // 0审核中1审核通过2审核拒绝3
      holderCodeMsg: ['您还不是股东', '审核通过'],
      holderInfo: {}
    }
  },
  created() {
    $.showIndicator()
    setTimeout(()=>{
      this.$server.holder.isTrue().then(({obj})=>{
        this.isShow = true
        this.holderCode = obj.code
        if(obj.code === 1){
          this.$server.holder.getInfo()
          .then(({obj})=>{
            $.hideIndicator()
            this.holderInfo = obj
          })

          this.$server.holder.getQrcode()
          .then(({obj})=>{
            this.qrcode = obj.img
          })

        }else{
          $.hideIndicator()
        }
      }) 
    }, 600)
  }
}
</script>
<style scoped lang="less">
.l-holder-qrcode{
  width: 9.5rem;
  height: 9.5rem;
  margin: 1.5rem auto;
  text-align: center;
  img{
    width: 100%;
    height: 100%;
    background-color: #fff;
    line-height: 9.5rem;
  }
}
.l-agent-hd{
  background: linear-gradient(45deg, #3d93f5, #49aef5);
  min-height: 8.5rem;
  color: #fff;
  ._notyet{
    img{width: 2.5rem;}
    text-align: center;
    font-size: 0.9rem;
    padding: 1.7rem 0;
  }
}
.l-holder-menu{
  background-color: #fff;
  text-align: center;
  padding: 0.75rem 0;
  font-size: 0.75rem;
}
.l-holder-menu img{
  width: 3.0rem;
  height: 2.25rem;
}
</style>