<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content" v-show="isShow">
        <!-- 分销记录 -->
        <div class="l-agnet-record" v-if="agentCode === 1">
          <div class="l-agent-hd l-margin-b">
            <div class="_notyet">
              <h3 style="font-size: 1.6rem;">{{agentInfo.amount}}</h3>
              <p class="l-margin-t-s l-fs-m">
                <span>返利总额</span>
                <span class="l-fs-xs" style="opacity:0.2; vertical-align: text-bottom;">
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                </span>
                <span>下级人数：{{agentInfo.total}} 人</span>
              </p>
            </div>
          </div>
          <div class="l-text-table l-margin-b" v-for="item in recordList">
            <div class="_tr l-border-b">
              <div class="_tit">消费单号</div>
              <div class="_rest" v-text="item.order_sn"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">消费人员</div>
              <div class="_rest" v-text="item.nickname"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">消费时间</div>
              <div class="_rest" v-text="item.posttime"></div>
            </div>
            <div class="_tr l-border-b">
              <div class="_tit">消费金额</div>
              <div class="_rest"><span class="l-text-hot" v-text="item.charge"></span> 元</div>
            </div>
            <div class="_tr">
              <div class="_tit">返利金额</div>
              <div class="_rest"><span class="l-text-ok" v-text="item.invite_rate"></span> 元</div>
            </div>
          </div>
        </div>
        <!-- 分销记录 end-->
        <!-- 还不是分销商 -->
        <div class="l-agent-not" v-else>
          <div class="l-agent-hd l-margin-b">
            <div class="_notyet">
              <img src="~assets/kulian.png" alt="">
              <p class="l-margin-t-s">{{agentCodeMsg[agentCode]}}</p>
            </div>
          </div>
          <div class="l-panel-title l-border-b">
            <span class="l-text-gray">成为分销商的好处</span>
          </div>
          <div class="l-padding l-bg l-fs-m">
            我们知道随着商品经济的高速发展使工商企业的经济协作和专业化分工水平不断提高，面对众多消费者群体，生产厂商既要生产或提供满足市场需要的产品和服务，又要以适当的成本快速地将产品和服务送到目标消费者，实现销售，这对于商品生产厂商来说，即使有可能做到，也没有必要去做，因为这样未必能达到企业收益最大化的目的。这样，通过其他中间商贸企业丰富而发达的市场体系来分销产品就成为市场经济的常态。
          </div>
          <div class="l-margin">
            <button style="width: 100%" class="button l-btn-bg1" :disabled="agentCode < 2" @click="gotoApply">一键申请</button>
          </div>
        </div>
        <!-- 还不是分销商 end-->
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
      agentCode: 3,  // 0审核中1审核通过2审核拒绝3
      agentCodeMsg: ['您的申请正在审核中', '审核通过', '审核拒绝', '您还不是分销商'],
      agentInfo: {},
      recordList: [],
    }
  },
  methods: {
    gotoApply() {
      this.$router.push('/user/agent/apply')
    }
  },
  created() {
    $.showIndicator()
    this.$server.agent.isTrue().then(({obj})=>{
      this.isShow = true
      this.agentCode = obj.code
      if(obj.code === 1){
        this.$server.agent.getRecord(1, 10)
        .then(({obj, list})=>{
          $.hideIndicator()
          this.agentInfo = obj
          this.recordList = list
        })
      }else{
        $.hideIndicator()
      }
    })
  }
}
</script>
<style scoped lang="less">
.l-agent-hd{
  background: linear-gradient(45deg, #3d93f5, #49aef5);
  min-height: 8.5rem;
  color: #fff;
  ._notyet{
    img{width: 2.5rem;}
    text-align: center;
    font-size: 0.9rem;
    padding: 2rem 0;
  }
}
</style>