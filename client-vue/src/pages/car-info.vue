<template>
  <div class="l-app">
    <div class="page page-current">
      <l-header></l-header>
      <div class="content">
        <div class="list-block" style="margin:0;">
          <ul>
            <!-- Text inputs -->
            <li>
              <div class="item-content item-link" @click="$router.push('/car/brands')">
                <div class="item-inner">
                  <div class="item-title label">车型</div>
                  <div class="item-input">
                    <input readonly type="text" placeholder="请选择" :value="carModel">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title label">车辆性质</div>
                  <div class="item-input">
                    <select>
                      <option>私家车</option>
                      <option>公司车</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label">车牌号码</div>
                  <div class="l-car-prefix" v-text="carNumPrefix" @click="$router.push('/car/city')">粤A</div>
                  <div class="item-input">
                    <input type="tel" placeholder="请填写">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content l-allow-null">
                <div class="item-inner">
                  <div class="item-title label">行驶里程</div>
                  <div class="item-input">
                    <input type="tel" placeholder="请填写">
                  </div>
                  <div class="item-after">km</div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content l-allow-null">
                <div class="item-inner">
                  <div class="item-title label">上路时间</div>
                  <div class="item-input">
                    <input id="date-on-road" type="text" placeholder="请选择" readonly>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content l-allow-null">
                <div class="item-inner">
                  <div class="item-title label">发动机号</div>
                  <div class="item-input">
                    <input type="url" placeholder="请填写">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content l-allow-null">
                <div class="item-inner">
                  <div class="item-title label">车架号</div>
                  <div class="item-input">
                    <input type="url" placeholder="请填写">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p class="l-margin l-fs-s l-text-gray">注：如您需要查询并办理违章，则必须填写发动机号及车架号，懂车师兄将保障您的信息安全。</p>
        <div class="l-margin">
          <a class="button l-btn-bg1">保存车辆信息</a>
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
      formData: {}
    }
  },
  computed: {
    carModel() {
      let sltedBrand = this.$storage.local.get('sltedBrand') || {}
      let sltedFamily = this.$storage.local.get('sltedFamily') || {}
      let sltedPailiang = this.$storage.local.get('sltedPailiang') || {}
      return (sltedBrand.name || '') + ' ' + (sltedFamily.name || '') + ' ' + (sltedPailiang.name || '')
    },
    carNumPrefix() {
      let sltCarCity = this.$storage.local.get('sltCarCity') || {}
      return sltCarCity.oldName || '粤A'
    }
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
.l-car-prefix{min-width: 5.0rem; margin-left: 0.25rem; }
.l-car-prefix:after{content: '\e609'; font-family: 'l-iconfont'; margin-left: 0.25rem; color: #ccc; vertical-align: -0.1rem;}
</style>