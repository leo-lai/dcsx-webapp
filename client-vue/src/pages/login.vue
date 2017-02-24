<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-login">
          <div class="l-avatar"></div>
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
            <p class="l-margin-0 l-fs-s">
              没有收到验证码？
              <span style="text-decoration: underline;">使用语音验证码</span>
            </p>
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
  data() {
    return{
      submiting: false,
      formData: {
        username: '13922214744',
        code: ''
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

      // this.$router.replace(this.$route.query.to || '/user')

      $.showIndicator()
      this.submiting = true
      this.$server.login(this.formData).then((response)=>{
        $.toast('登录成功', 2000, 'l-toast')
        this.$storage.local.set('token', response.obj.token)
        this.$router.replace(this.$route.query.to || '/user')
      }).catch(()=>{
        $.hideIndicator()
        this.submiting = false
      })
    }
  }
}
</script>
<style>
/* 登录 */
.l-login{
  height: 100%;text-align: center;
  background:#fff url('../assets/login-bg.jpg') no-repeat 0 bottom;
  background-size: contain;
}
.l-login .l-avatar{
  width: 4.0rem; height: 4.0rem; margin:3rem auto 2rem;
  border-color: rgba(255,255,255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  background-image: url('../assets/temp-002.jpg')
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