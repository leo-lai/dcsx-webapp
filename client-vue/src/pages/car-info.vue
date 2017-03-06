<template>
  <div class="l-app">
    <div id="app-page" class="page page-current">
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
                    <input readonly type="text" placeholder="请选择" v-model="formData.model_name">
                  </div>
                </div>
              </div>
            </li>
            <!-- <li>
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
            </li> -->
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label">车牌号码</div>
                  <div class="l-car-prefix" v-text="carNumPrefix" @click="$router.push('/car/city')">粤A</div>
                  <div class="item-input">
                    <input class="l-text-upper" type="url" placeholder="请填写" maxlength="6" v-model="carNum">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content l-allow-null">
                <div class="item-inner">
                  <div class="item-title label">行驶里程</div>
                  <div class="item-input">
                    <input type="tel" placeholder="请填写" maxlength="8" v-model="formData.mileage">
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
                    <input id="date-on-road" type="text" placeholder="请选择" readonly :value="formData.license_date">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content l-allow-null">
                <div class="item-inner">
                  <div class="item-title label">发动机号</div>
                  <div class="item-input">
                    <input type="tel" maxlength="6" placeholder="请填写" v-model="formData.engine_sn">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content l-allow-null">
                <div class="item-inner">
                  <div class="item-title label">车架号</div>
                  <div class="item-input">
                    <input type="tel" maxlength="6" placeholder="请填写" v-model="formData.frame_sn">
                  </div>
                </div>
              </div>
            </li>
            <li v-if="isEdit">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label">默认车辆</div>
                  <div class="item-input l-text-right">
                    <label class="label-switch">
                      <input ref="defaultBtn" type="checkbox"  v-model="isDefault">
                      <div class="checkbox"></div>
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p class="l-margin l-fs-s l-text-gray">注：如您需要查询并办理违章，则必须填写发动机号及车架号，懂车师兄将保障您的信息安全。</p>
        <div class="l-margin">
          <div class="button l-btn-bg1" @click="submit">保存车辆信息</div>
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
      carNum: '',
      carNumPrefix: '粤A',
      isEdit: false,
      isDefault: false,
      formData: {
        carid: '',
        model_name: '',
        car_license: '',
        mileage: '',
        frame_sn: '',
        engine_sn: '',
        license_date: '',
        insurance_date: '',
        examination_date: '',
        is_default: 0
      },
      submiting: false
    }
  },
  methods: {
    initData() {
      const self = this
      const id = self.$route.params.id

      let sltedModel = this.$storage.session.get('sltedModel')
      if(sltedModel){
        self.formData.carid = sltedModel.carid
        self.formData.model_name = sltedModel.name
      }

      let sltCarCity = this.$storage.session.get('sltCarCity')
      if(sltCarCity){
        self.carNumPrefix = sltCarCity.oldName
      }

      if(id){
        $.showIndicator()
        self.isEdit = true
        self.$server.car.getInfo(id).then(({ obj })=>{
          self.carInfo = obj
          self.formData.car_license = obj.car_license
          self.formData.mileage = obj.mileage
          self.formData.license_date = obj.license_date
          self.formData.engine_sn = obj.engine_sn
          self.formData.frame_sn = obj.frame_sn
          self.formData.is_default = obj.is_default
          
          self.isDefault = obj.is_default == 1

          if(!sltedModel){
            self.formData.carid = obj.carid
            self.formData.model_name = obj.model_name  
          }
          

          if(obj.car_license){
            !sltCarCity && (self.carNumPrefix = obj.car_license.substring(0, 2))
            self.carNum = obj.car_license.substring(2)
          }
        }).finally(()=>{
          $.hideIndicator()
        })
      }
    },
    submit() {
      const self = this
      if(self.submiting) return
      
      if(!self.formData.carid){
        $.toptip('请选择车型')
        return
      }

      if(!self.carNum){
        $.toptip('车牌号码不能为空')
        return
      }

      self.formData.car_license = (self.carNumPrefix + self.carNum).toLocaleUpperCase()
      
      self.submiting = true
      $.showIndicator()
    
      let promise = null
      if(self.isEdit){
        self.formData.is_default = self.$refs.defaultBtn.checked ? 1 : 0
        promise = this.$server.car.edit(this.carInfo.id, this.formData)
        .then(()=>{
          $.toast('保存成功', 1500, 'l-toast')
        })
      }else{
        promise = this.$server.car.add(this.formData)
        .then(()=>{
          $.toast('添加成功', 1500, 'l-toast')
        })
      }

      promise.then(()=>{
        $.hideIndicator()
        setTimeout(()=>{
          this.$router.back()  
        }, 2000)

        this.$storage.session.remove('sltedModel')
        this.$storage.session.remove('sltCarCity')
      }).catch(()=>{
        $.hideIndicator()
        this.submiting = false
      })
    }
  },
  created() {
    setTimeout(()=>{
      this.initData()
    }, 600)
  },
  mounted() {
    const self = this
    self.$nextTick(()=>{
      // 日期
      $('#date-on-road').calendar({
        // value: ['2017-02-23' || self.formData.license_date],
        onChange(p, values, displayValues) {
          self.formData.license_date = displayValues[0]
        },
        onOpen() {
          $('.picker-calendar').find('.toolbar-inner a').removeAttr('href')
        }
      })  
    })
  }
}
</script>
<style>
.l-car-prefix{min-width: 3.0rem; margin-left: 0.25rem; }
.l-car-prefix:after{content: '\e609'; font-family: 'l-iconfont'; margin-left: 0.25rem; color: #ccc; }
</style>