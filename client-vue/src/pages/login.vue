<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-login">
          <div class="l-avatar" :style="{'background-image': 'url(' +headimgurl+ ')'}"></div>
          <div class="l-login-form">
            <div class="l-login-ipt l-flex-hc">
              <input class="l-rest" type="tel" maxlength="11" placeholder="请输入您手机号码" v-model="formData.username">
            </div>
            <div class="l-login-ipt l-flex-hc">
              <input class="l-rest" type="tel" maxlength="6" placeholder="请输入手机验证码" v-model="formData.code">
              <button ref="sendBtn" class="l-btn-link"  @click="sendAuthCode">获取验证码</button>
            </div>
            <div class="l-margin" style="margin-top: 1.25rem;">
              <button class="button l-btn-bg1" style="width:100%;" :disabled="submiting" @click="submit">登录</button>
            </div>
            <!-- <p class="l-margin-0 l-fs-s">
              没有收到验证码？
              <span style="text-decoration: underline;">使用语音验证码</span>
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import lHeader from 'components/l-header'
const avatar = require('assets/avatar.jpg')

export default {
  components: {
    lHeader
  },
  data() {
    return{
      submiting: false,
      nickname: '',
      headimgurl: avatar,
      formData: {
        username: '',
        code: '',
        openid: ''
      }
    }
  },
  methods: {
    sendAuthCode: function(){ 
        this.$server.sendMobiCode(this.formData.username, this.$refs.sendBtn)
        .then((response)=>{
          this.formData.code = response.obj.code
        })
    },
    submit: function(){
      if(!this.formData.username){
        $.toptip('请输入您的手机号码')
        return
      }

      if(!this.formData.code){
        $.toptip('请输入手机验证码')
        return
      }

      $.showIndicator()
      this.submiting = true
      this.$server.login(this.formData).then(({obj})=>{
        $.toast('登录成功', 2000, 'l-toast')
        this.$storage.local.set('token', obj.token)
        this.$router.replace(this.$route.query.to || '/index')
      }).catch(()=>{
        $.hideIndicator()
        this.submiting = false
      })
    }
  },
  created() {

    let code = this.$route.query.code
    if(code){
      $.showPreloader('微信授权中')
      this.$server.getWxByCode(code).then(({obj})=>{
        $.hidePreloader()
        this.formData.openid = obj.openid
        this.headimgurl = wxHead(obj.headimgurl)
        this.nickname = obj.nickname
      })
    }else{
      this.$device.isWechat && $.alert('微信授权失败，请重新进入本页面')
    }
  }
}

function wxHead(src) {
  if(!src) {
    return avatar
  }
  if(src.indexOf('wx.qlogo.cn') === -1){
    return src
  }
  return src.replace(/\/0$/, '/64')
}
</script>
<style>
/* 登录 */
.l-login{
  height: 100%;text-align: center; overflow: hidden;
  background:#fff url('~assets/login-bg.jpg') no-repeat 50% bottom;
  background-size: contain;
  background-attachment: fixed;
}
.l-login .l-avatar{
  display:block;width: 4.0rem; height: 4.0rem; margin:3rem auto 2rem;
  border-color: rgba(255,255,255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  /*background-image: url('../assets/temp-002.jpg');*/
}
.l-login-form{width: 18.5rem;margin:auto;}
.l-login-ipt{
  margin: 0.75rem; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.5)
}
.l-login-ipt input{
  border:none;background:none;width: 100%;
  height: 1.5rem; line-height: 1.5rem;
}
.l-login-ipt .button{margin:-0.75rem -0.25rem -0.75rem 0;width: 5.25rem;}
.l-login-ipt .l-icon{color: #0894ec; font-size: 1rem;width: 1.5rem; }
</style>