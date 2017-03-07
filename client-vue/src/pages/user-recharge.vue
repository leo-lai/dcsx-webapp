<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="content-block-title" style="margin-top: 0.75rem;">账户信息</div>
        <div class="list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">当前账户</div>
                <div class="item-after"></div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">当前余额</div>
                <div class="item-after">0.00元</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-block-title">选择充值金额</div>
        <div class="l-recharge-list">
          <div class="row">
            <div class="col-33 _item l-triangle-slt" :class="{'active': index === 1}" @click="sltMoney(1)">100元</div>
            <div class="col-33 _item l-triangle-slt" :class="{'active': index === 2}" @click="sltMoney(2)">500元</div>
            <div class="col-33 _item l-triangle-slt" :class="{'active': index === 9}" @click="sltMoney(9)">
              <input type="tel" placeholder="其他金额" v-model="otherVal">
            </div>
          </div>
        </div>
        <div class="l-margin l-flex-h" style="margin-top: 1.5rem;">
          <button class="button l-btn-bg1 l-rest" :disabled="submiting" @click="submit">充值</button>
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
      index: 1,
      sltedVal: 100,
      otherVal: ''
    }
  },
  methods: {
    sltMoney(index) {
      this.index = index
      switch(index){
        case 1:
          this.sltedVal = 100
          break
        case 2:
          this.sltedVal = 500
          break
        default:
          this.sltedVal = 0
      }
    },
    submit() {
      if(this.submiting) return

      if(this.index === 9){
        this.sltedVal = this.otherVal
      }

      if(!this.sltedVal){
        $.alert('请选择充值金额')
        return
      }

      this.submiting = true
      $.showIndicator()
      
      this.$server.user.recharge(this.sltedVal).then(({obj})=>{
        obj.type = 3
        this.$storage.session.set('temp_pay_info', obj)
        window.location.href = '/order/pay'
      }).finally(()=>{
        $.hideIndicator()
        this.submiting = false
      })
    }
  }
}
</script>
<style scoped lang="less">
.l-recharge-list{
  margin: 0.75rem;
  text-align: center;
  ._item{
    border:1px solid #f3f3f3;
    padding: 0.375rem;
    background-color: #fff;
    input{
      width: 100%;
      border: none;
      text-align: center;
      font-size: 0.75rem;
    }
  }
  .active{
    border-color: #3d93f5;
  }
}

</style>