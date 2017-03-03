<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="l-flex-hc l-bg l-padding l-link-arrow l-margin-b">
          <img class="l-thumb-circle l-margin-r" src="http://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=Logo&w=64&h=64" alt="">
          <div class="l-rest">
            <h3>胡杨树<span class="l-text-gray">·</span>高级检测技师</h3>
            <p class="l-text-gray">2017-01-01</p>
          </div>
        </div>
        
        <!-- 检测结果 -->
        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">检测结果</span></div>
          <div class="l-check-result">
            <ul>
              <li class="l-border-t">
                <h3><span class="pull-right l-text-error">异常</span>仪表信息</h3>
                <p class="l-text-gray l-fs-s">故障灯亮，仪表盘没有显示</p>
                <div class="l-img-list l-flex-wrap">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                  <img src="https://placeholdit.imgix.net/~text?txtsize=16&bg=0894ec&txtclr=fff&txt=180x140&w=180&h=140">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 检测结果 end-->

        <!-- 技师建议 -->
        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">技师建议</span></div>
          <div class="l-panel-content l-padding"> 胎压是影响轮胎寿命的重要因素，不要过高或者过低，要 按照车辆标示的胎压进行充气。夏天尽量让胎压低一些冬 季寒冷，尽量保证汽车的轮胎气比夏天足一些。 
          </div>
        </div>
        <!-- 技师建议 end-->

        <!-- 建议项目 -->
        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">建议项目</span></div>
          <div class="l-technician-suggest">
            <ul>
              <li class="l-border-t"><p>更换机油滤清器</p></li>
            </ul>
          </div>
        </div>
        <!-- 建议项目 end-->

        <div class="l-panel l-margin-tb l-technician-work">
          <div class="l-panel-title l-border-b"><span class="l-text-gray">预估报价</span></div>
          <div class="l-panel-content l-padding"><span class="l-text-warn"><i class="l-icon">&#xe6cb;</i>0.00</span></div>
        </div>

        <div class="l-margin">
          <router-link class="button l-btn-bg1" to="/message/info/all">查看全部检测项目</router-link>
          <a class="button l-btn-bg2 l-margin-t">查看上次检测报告</a>
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
     
    }
  }
}
</script>