<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="content-block-title">填写申请信息</div>
        <div class="list-block">
          <ul>
            <!-- Text inputs -->
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label">真实姓名</div>
                  <div class="item-input">
                    <input type="text" maxlength="50" v-model="formData.realname" placeholder="请输入您的姓名">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label">手机号码</div>
                  <div class="item-input">
                    <input type="tel" maxlength="11" v-model="formData.mobile" placeholder="请输入您的手机号码">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="l-margin">
            <button style="width: 100%" class="button l-btn-bg1" :disabled="submiting" @click="submit">提交申请</button>
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
  data () {
    return {
      submiting: false,
      formData: {
        realname: '',
        mobile: ''
      }
    }
  },
  methods: {
    submit() {
      if(!this.formData.realname){
        $.toptip('请输入您的真实姓名')
        return
      }

      if(!/^\s*1\d{10}\s*$/.test(this.formData.mobile)){
        $.toptip('请正确输入您的手机号码')
        return
      }

      $.showIndicator()
      this.submiting = true
      this.$server.agent.apply(this.formData)
      .then(({status_msg})=>{
        $.hideIndicator()
        $.alert(status_msg, ()=>{
          this.$router.back()
        })
      }).finally(()=>{
        $.hideIndicator()
        this.submiting = false
      })
    }
  }
}
</script>
<style scoped>
.content-block-title{margin-top: 0.75rem;color: #999;}
</style>