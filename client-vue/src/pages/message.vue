<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <l-tabbar></l-tabbar>
      <div class="content">
        <div class="l-panel-carinfo l-bg-full">
          <div class="l-flex-hc l-margin">
            <img class="l-thumb-circle l-margin-r" src="http://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=Logo&w=64&h=64">
            <h3 class="l-text-wrap2">梅赛德斯奔驰 2017款 S500L 4MATIC豪华至尊五座版 4.0L双涡轮增压</h3>
          </div>
          <div class="l-flex-h _info">
            <div class="_item l-rest l-flex-hc l-margin-r">
              <img src="~assets/img-024.png">
              <div class="l-rest">
                <p class="l-fs-s" style="color: #bbb;">行驶里程(KM)</p>
                <p style="color: #4295f2;">50000</p>
              </div>
            </div>
            <div class="_item l-rest l-flex-hc">
              <img src="~assets/img-025.png">
              <div class="l-rest">
                <p class="l-fs-s" style="color: #bbb;">上路时间</p>
                <p style="color: #4295f2;">2015-01-23</p>
              </div>
            </div>
          </div>
        </div>

        <div class="l-panel l-margin-tb">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">检测报告</span></div>
          <div class="l-panel-content l-padding">
            <span class="l-text-error">3项</span>异常
            <a class="button button-fill pull-right l-btn-s" style="margin-top: -0.1rem;">查看明细</a>
          </div>
        </div>
        <div class="l-panel l-margin-tb">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">维修进程</span></div>
          <div class="l-panel-content l-padding">已完工</div>
        </div>
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
    
  }
}
</script>
<style>
.l-panel-carinfo{min-height: 5.65rem; color: #fff; overflow: hidden;background-image: url('../assets/img-023.jpg');}
.l-panel-carinfo ._info{padding:0.375rem 0.75rem; background: rgba(0,0,0,0.2);}
.l-panel-carinfo ._item{padding: 0 0.4rem; }
.l-panel-carinfo ._item img{margin-right: 0.75rem; width: 1.5rem; height: 1.5rem;}
</style>