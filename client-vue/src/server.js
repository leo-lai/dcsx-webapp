import Vue from 'vue'
import { storage, utils } from 'src/scripts/utils'

const baseUrl = 'http://twww.dongcheshixiong.com'
const _http = {
  ajax(url = '', data = {}, type  = 'GET') {
    url = baseUrl + url
    let headers = {
      'Token': storage.local.get('token') || '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if(type === 'PUT'){
      headers['Content-Type'] = 'text/plain'
      data = JSON.stringify(data)
    }
    return new Promise((resolve, reject)=>{
      $.ajax({
        url,
        data,
        type,
        headers,
        dataType: 'json',
        timeout: 30000,
        success(response, status, xhr) {
          if(response.status_code !== 0){
            $.alert(response.status_msg)
            reject(response.status_msg)
          }else{
            resolve(response)
          }
        },
        error(xhr, errorType, error){
          $.alert('服务器响应失败')
        }
      })
    })
  },
  get(url = '', ...data) {
    url = url + '/' + data.join('/')
    return this.ajax(url)
  },
  delete(url = '', ...data){
    url = url + '/' + data.join('/')
    return this.ajax(url, undefined, 'DELETE')
  },
  post(url, data) {
    return this.ajax(url, data, 'POST')
  },
  put(url, data) {
    return this.ajax(url, data, 'PUT')
  }
}

// 分页数据类
class List {
  constructor(type){
    this._type = type
    this.isLoading = false          // 正在请求数据
    this.isNull = false             // 表示后台已无数据返回，无需再发送请求
    this.isAjax = false             // 是否已请求过数据
    this.alldata = []               // 累计分页已返回数据
    this.data = []                  // 当前分页数据
    this.page = 0                   // 当前页数
    this.gotoPage = 1               // 跳转到第几页
    this.pageList = [1]             // 分页数组
    this.rowsList = [10, 20, 50]    // 每页条数
    this.total = 1                  // 总条数
    this.totalPage = 1              // 总页数

    this.rows = 10                  // 条数
    this.isPage = true              // 是否分页
    this.params = {}                // 异步发送数据
    this.beforeAjax = utils.noop
    this.callback = utils.noop

  }
  init() {
    this.isAjax = false
    this.isNull = false
    this.data = []
    this.alldata = []
    this.goto(1)
  }
  next() {
    if(!this.isLoading && this.page < this.totalPage){
      this.page = Math.min(++this.page, this.totalPage)
      this.ajax()  
    }
    return this
  }
  prev() {
    if(!this.isLoading && this.page > 1){
      this.page = Math.min(--this.page, 1)
      this.ajax()  
    }
    return this
  }
  goto(index = 1) {
    if(utils.isNumber(index) && !this.isLoading){
      index = Math.min(Math.max(index, 1), this.totalPage)  
      this.page = index
      this.ajax()
    }
    return this
  }
  ajax() {
    if(this.isLoading){ return this }
    let url = ''
    switch (this._type) {
      case 'news':              // 新闻列表
        url = 'owner/visitor/getPublishList'
        break
      case 'activity':          // 活动列表
        url = 'owner/visitor/getCouponActivity'
        break
      case 'appointment':       // 预约列表
        url = 'owner/visitor/getAppointList'
        break
      case 'order':             // 订单列表
        url = 'owner/visitor/getOrderList'
        break
      case 'faq':               // 常见问题列表
        url = 'owner/visitor/getHelpList'
        break
      case 'feedback':          // 反馈问题列表
        url = 'owner/getMyFeedBackList'
        break
      case 'feedbackReply':     // 反馈详情回复列表
        url = 'owner/getMyFeedBackReply'
        break
      case 'store':             // 门店列表
        url = 'owner/visitor/getStoreList'
        break
    }
    this.params.page = this.page
    this.params.rows = this.rows
    this.isLoading = true
    this.beforeAjax(this.isLoading)
    Vue.http.get(url, {
      params: this.params
    }).then(function({ body }){
      this.isAjax = true
      this.isLoading = false
      if(body.success && body.data){
        this.gotoPage = this.page
        
        this.total = body.data.total
        this.totalPage = body.data.totalPage

        // 分页数组 [1,2,3,'...',10,11,12]
        let pageList = []
        for (let i = Math.max(this.page - 3, 1); i <= Math.min(this.page + 3, this.totalPage); i++) {
          pageList.push(i)
        }
        if(this.totalPage > 10 && (this.totalPage - this.page) > 3){
          pageList.push('...')
          pageList.push(this.totalPage)
        }

        let data = body.data.rowsObject ? body.data.rowsObject : []
        this.data = data
        this.alldata = this.alldata.concat(this.data)
        if(body.data.page >= body.data.totalPage){
          this.isNull = true
        }
        
      }
      this.callback(this.alldata)
    }.bind(this), function(error){
      this.isAjax = true
      this.isLoading = false
      this.callback(this.alldata)
    }.bind(this))
  }
}

const _server = {
  // 获取微信授权路径 url为绝对路径
  getGrantUrl(url, params) {
    if(!url) return ''

    let appid = config.getAppid()
    url = utils.url.setArgs(url, params)
    utils.device.isWechat && (url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
    return url
  },
  // 获取微信信息
  getWxByCode(code) {
    let ret = {}
    let promise = new Promise( (resolve) => {
      if(!code){
        resolve(ret)
      }else{
        Vue.http.get('owner/getByCode', {
          params: { code }
        }).then(({ body })=>{
          if(body.success && body.data){
            resolve(body.data)
          }else{
            resolve(ret)
            utils.alert.call(Vue, body.message)
          }
        }, (error)=>{
          resolve(ret)
          utils.alert.call(Vue, ERROR_MSG.api)
        })
      }
    })
    return promise
  },
  // 获取jssdk授权配置
  getWxConfig(url) {
    url = url || storage.session.get('wx_url')
    let self = this
    let config = {
      debug: false,
      appId: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu']
    }

    let promise = new Promise((resolve) => {
      if(!window.wx){
        utils.alert.call(Vue, '没有引入jweixin')
        resolve({})
      }else{
        window.wx._ready = false
        Vue.http.get('wx/frame/getWxSignature', {
          params: { url, t: new Date().getTime() }
        }).then(({ body })=>{
          if(body.success){
            config.appId = body.data.appId
            config.timestamp = body.data.timestamp
            config.nonceStr = body.data.noncestr
            config.signature = body.data.signature

            window.wx.config(config)

            window.wx.ready(()=>{
              wx.checkJsApi({
                jsApiList: config.jsApiList,
                success(res) {
                  utils.debug(res)
                  config.jsApiList.forEach((item)=>{
                    if(window.wx._try){
                      resolve(window.wx)
                    }

                    if(res.checkResult[item]){
                      window.wx._ready = true
                      window.wx._try = false
                      resolve(window.wx)
                      return true
                    }
                  })
                }
              })
            })

            window.wx.error((error)=>{
              window.wx._ready = false
              utils.debug(error)
              if(!window.wx._try){
                window.wx._try = true
                self.getWxConfig(window.location.href)
              }else{
                resolve(window.wx) 
              }
            })

            if(!utils.device.isWechat){
              resolve(window.wx)
            }
          }else{
            resolve(window.wx)
          }
        }, (error)=>{
          resolve(window.wx)
        })
      }
    })
    return promise
  },
  // 获取临时二维码
  getWxTempQrCode(inviterWxOpenId, inviterWxUnionId, channel = 'NewWelfare') {
    let ret = ''
    let promise = new Promise((resolve) => {
      if(!inviterWxOpenId || !inviterWxUnionId){
        resolve(ret)
      }else{
        Vue.http.get('wx/frame/getActivityQrCodeUrl', { 
          params: {
            channel,
            inviterWxOpenId,
            inviterWxUnionId  
          }
        }).then(({ body })=>{
          if(body.success && body.data){
            resolve(body.data)
          }else{
            resolve(ret)
            utils.alert.call(Vue, body.message)
          }
        }, (error)=>{
          resolve(ret)
          utils.alert.call(Vue, ERROR_MSG.api)
        })
      }
    })
    return promise
  },
  // 发送手机验证码
  sendMobiCode(phone, btn) {
    if(!phone) {
      $.alert('请输入正确手机号码')
      return
    }

    let time = 30
    let oldtext = ''
    let timeid = 0
    if(btn){
      btn.setAttribute('disabled', true)
      oldtext = btn.textContent
      timeid = setInterval(()=>{
        if(--time >= 0){
          btn.textContent = `${time}s后重新获取`
        }else{
          clearInterval(timeid)
          btn.removeAttribute('disabled')
          btn.textContent = oldtext
        }
      }, 1000)
    }

    let promise = _http.get(`/Member/verify/sms/${phone}`)
    promise.then((response)=>{
      $.toast('验证码已发送到您的手机上', 2000, 'l-toast')
    }).catch(()=>{
      clearInterval(timeid)
      btn.removeAttribute('disabled')
      btn.textContent = oldtext
    })

    return promise
  },
  // 获取当前经纬度
  getPosition() {
    // let position = storage.local.get('position') || {}
    let position = {}
    // 方圆E时光
    // position = { 
    //   latitude: 23.1292,
    //   longitude: 113.3671,
    //   speed: -1,
    //   accuracy: 105.7295
    // }
    storage.local.set('position', position, 1000 * 1800)

    let promise = new Promise((resolve)=>{
      if(position.latitude){
        resolve(position)
      }else{
        if(utils.device.isWechat){
          this.getWxConfig().then((wx)=>{
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success(res) {
                position = res
                storage.local.set('position', position, 1000 * 1800)
                resolve(position)
              }
            })
            if(wx._try && !wx._ready){
              resolve(position)
            }
          })
        }else{
          navigator.geolocation.getCurrentPosition( (response) => {
            position.latitude = response.coords.latitude
            position.longitude = response.coords.longitude
            storage.local.set('position', position, 1000 * 1800)
            resolve(position)
          }, error => {
            let errHtml = ''
            switch(error.code){ 
              case error.PERMISSION_DENIED: 
                errHtml = "用户拒绝对获取地理位置的请求。" 
                break
              case error.POSITION_UNAVAILABLE: 
                errHtml = "位置信息是不可用的。" 
                break
              case error.TIMEOUT: 
                errHtml = "请求用户地理位置超时。" 
                break
              case error.UNKNOWN_ERROR: 
                errHtml = "未知错误。" 
                break
            } 
            console.log('获取当前地理位置失败:'+ errHtml)
            position.error = errHtml
            resolve(position)
          })
        }
      }
    })

    return promise
  },
  // 获取当前地址 使用腾讯地图WebService API
  getAddress() {
    const self = this
    let ret = {}
    let promise = new Promise((resolve) => {
      let address = storage.local.get('address')
      if(address){
        resolve(address)
      }else{
        self.getPosition().then( position => {
          Vue.http.jsonp('http://apis.map.qq.com/ws/geocoder/v1/', {
            params: {
              location: position.latitude + ',' + position.longitude,
              key: 'GPIBZ-V7YH3-CD735-3HDQM-CNM3F-4PFQP',
              output: 'jsonp'
            }
          }).then(({ body })=>{
            if(body.status == 0){
              storage.local.set('address', body.result, 1000 * 1800);
              resolve(body.result)
            }else{
              resolve(ret)
            }
          }, (error) => {
            console.log('获取当前地址失败', error)
            resolve(ret)
          })
        })
      }
    })
    return promise
  },
  // 登录
  login(formData) {
    return _http.post('/Member/login', formData)
  },
  // 车主资料
  user: {
    getInfo() {
      return _http.get('/Member/User/get_info')  
    }
  },
  // 活动信息
  activity: {
    getList() {
      return _http.get('/Member/Activity/list')
    }
  },
  // 有关车辆接口
  car: {
    getList() {
      return _http.get('/Member/Car/list')
    },
    getInfo(id) {
      return _http.get('/Member/Car/info', id)
    },
    edit(id, formData) {
      return _http.put(`/Member/Car/set/${id}`, formData)
    },
    add(formData) {
      return _http.post('Member/Car/add', formData)
    },
    del(id){
      return _http.delete(`/Member/Car/delete/${id}`)
    },
    getBrands() {
      return _http.get('/Member/Car/brand')
    },
    getFamily(id) {
      return _http.get('/Member/car/family', id)
    },
    getPailiang(id) {
      return _http.get('/Member/car/pailiang', id)
    }
  }

}

Vue.mixin({
  created() {
    // 异步通信
    // this.$http = _http

    // 接口
    this.$server = _server

    // 本地缓存
    this.$storage = storage
  }
})


export default _server
