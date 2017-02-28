import Vue from 'vue'
import { storage, utils } from 'src/scripts/utils'

const baseUrl = 'http://twww.dongcheshixiong.com'
const _http = {
  ajax(url = '', data = {}, type  = 'GET', contentType = 'form') {
    url = baseUrl + url
    let headers = {
      'Token': storage.local.get('token') || '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    if(contentType === 'json' || type === 'PUT'){
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
        timeout: 60000,
        success(response, status, xhr) {
          // 登录失效 800001 800002 800003
          if(response.status_code === 800001 || response.status_code === 800002 || 
            response.status_code === 800003) { 
            $.hideIndicator()
            reject(response.status_msg)
            $.alert(response.status_msg, ()=>{
              _server.logout()
            })
          }else if(response.status_code !== 0){
            $.hideIndicator()
            reject(response.status_msg)
            $.alert(response.status_msg)
          }else{
            // 修正接口数据规范
            !response.list && (response.list = [])
            !response.obj && (response.obj = {})
            resolve(response)
          }
        },
        error(xhr, errorType, error){
          $.hideIndicator()
          // $.alert('服务器响应失败')
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
  post(url, data, contentType = 'form') {
    return this.ajax(url, data, 'POST', contentType)
  },
  put(url, data, contentType = 'json') {
    return this.ajax(url, data, 'PUT', contentType)
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
    this.rowList = [10, 20, 50]    // 每页条数
    this.total = 1                  // 总条数
    this.totalPage = 1              // 总页数

    this.row = 10                  // 条数
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
    }
    this.params.page = this.page
    this.params.rows = this.row
    this.isLoading = true
    this.beforeAjax(this.isLoading)
    _http.get(url, {
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
    url = window.location.origin + utils.url.setArgs(url, params)
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8069d2775c2f68ab&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=dcsx#wechat_redirect`
  },
  // 获取微信信息
  getWxByCode(code = '') {
    return _http.get('/Member/login', code)
  },
  // 获取jssdk授权配置 promise返回一个对象(wx or {})
  getWxConfig(url) { 
    url = url || storage.session.get('wx_url') || window.location.href
    const self = this
    let config = {
      debug: false,
      appId: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu']
    }

    let promise = new Promise((resolve, reject) => {
      if(!window.wx){
        reject('找不到wx对象')
      }else{
        if(!utils.device.isWechat || window.wx._ready){
          resolve(window.wx)
        }

        _http.get('/getWxSignature', url).then(({ obj })=>{
          config.appId = obj.appId
          config.timestamp = obj.timestamp
          config.nonceStr = obj.noncestr
          config.signature = obj.signature

          window.wx.config(config)

          window.wx.error((error)=>{
            if(!window.wx._tried){        // 第一次权限验证失败再利用当前地址尝试一下
              window.wx._tried = true     // 标识已经尝试验证过，不再尝试
              if(url === window.location.href){
                resolve(window.wx) 
              }else{
                window.wx._ready = false
                resolve(self.getWxConfig(window.location.href))
              }
            }else{
              resolve(window.wx) 
            }
          })

          window.wx.ready(()=>{
            window.wx._ready = true
            resolve(window.wx)
          })
        }).catch(()=>{
          resolve(window.wx)
        })
      }
    })
    return promise
  },
  // 获取当前经纬度 成功失败都返回一个对象
  getPosition() {
    let position = storage.local.get('position')
    const _defualt = { // 获取位置失败返回默认坐标
      error: '获取地理位置失败',
      longitude: 113.531406,
      latitude: 22.808019
    }

    let promise = new Promise((resolve)=>{
      if(position){ // 先取缓存
        resolve(position)
      }else{
        if(utils.device.isWechat){ // 调取微信地址位置接口
          this.getWxConfig().then((wx)=>{
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success(res) {
                position = res
                storage.local.set('position', position, 1000 * 1800)
                resolve(position)
              },
              fail(err) {
                resolve(_defualt)
              }
            })
          }).catch(()=>{
            resolve(_defualt)
          })
        }else{ // h5获取位置
          navigator.geolocation.getCurrentPosition((response)=>{
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
            _defualt.error = errHtml
            resolve(_defualt)
          })
        }
      }
    })
    return promise
  },
  // 获取当前地址 使用腾讯地图WebService API
  getAddress() {
    const self = this
    let ret = ''
    let promise = new Promise((resolve) => {
      let address = storage.local.get('address')
      if(address){
        resolve(address)
      }else{
        self.getPosition().then((position)=>{
          $.ajaxJSONP('http://apis.map.qq.com/ws/geocoder/v1/', {
            params: {
              location: position.latitude + ',' + position.longitude,
              key: 'GPIBZ-V7YH3-CD735-3HDQM-CNM3F-4PFQP',
              output: 'jsonp'
            }
          }, function({body}){
            if(body.status == 0){
              storage.local.set('address', body.result, 1000 * 1800);
              resolve(body.result)
            }else{
              resolve(ret)
            }
          })
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
  // 注销
  logout(isRemote) {
    storage.local.remove('token')
    if(utils.device.isWechat){
      window.location.replace(_server.getGrantUrl('/login'))  
    }else{
      Vue._router.push('/login')
    }
  },
  // 登录
  login(formData) {
    return _http.post('/Member/login', formData)
  },
  // 车主资料
  user: {
    // 我的资料
    getInfo() {
      return _http.get('/Member/User/get_info')  
    },
    // 我的优惠券
    getCoupons(page = 1, row = 10, type = 1) {
      return _http.get('/Member/coupon/my', page, row, type)
    },
    // 我的套餐
    getCombos(page = 1, row = 10) {
      return _http.get('/Member/combo/my', page, row)
    }
  },
  // 分销商
  agent: {
    isTrue() { // 是否为分销商
      return _http.get('/Member/user/judge')
    },
    apply(formData) { // 申请为分销商
      return _http.post('/Member/user/apply', formData)
    },
    getRecord(page = 1, row = 10) {
      return _http.get('/Member/user/rebate_info', page, row)
    }
  },
  // 股东
  holder: {
    isTrue() { // 是否为股东
      return _http.get('/Member/holder/judge_holder')
    },
    // 股东信息
    getInfo() {
      return _http.get('/Member/holder/info')
    },
    // 提现记录
    getDrawal(page = 1, row = 10) {
      return _http.get('/Member/holder/drawal_list', page, row)
    },
    // 我的人脉
    getMember(page = 1, row = 10) {
      return _http.get('/Member/holder/member_list', page, row)
    },
    // 分红记录
    getRebate(page = 1, row = 10) {
      return _http.get('/Member/holder/rebate_list', page, row)
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
      return _http.post('/Member/Car/add', formData)
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
    getGroup(id) {
      return _http.get('/Member/car/group', id)
    },
    getPailiang(id) {
      return _http.get('/Member/car/pailiang', id)
    },
    getModel(id) {
      return _http.get('/Member/car/model', id)
    }
  },
  // 优惠券
  coupon: {
    getList(page = 1, row = 10) {
      return _http.get('/Member/coupon/list', page, row)
    },
    pick(coupon_id) {
      return _http.get('/Member/coupon/pick', coupon_id)
    }
  },
  // 套餐年卡
  combo: {
    getList(page = 1, row = 10) {
      return _http.get('/Member/combo/list', page, row)
    },
    getInfo(suit_id) {
      return _http.get('/Member/combo/info', suit_id)
    },
    getService(suit_id, carid) {
      return _http.get('/Member/combo/detail', suit_id, carid)
    },
    getParts(service_id, carid) {
      return _http.get('/Member/combo/change_parts', service_id, carid)
    },
    // 购买套餐
    order(jsonData) {
      jsonData = JSON.stringify(jsonData)
      return _http.post('/Member/order/combo_order', {jsonstr: jsonData} )
    }
  },
  // 商城
  shop: {
    // 一级分类
    getCategory1(page = 1, row = 10) { 
      return _http.get('/Member/shopping/fist_category_list', page, row)
    },
    // 二级分类
    getCategory2(category1_id) {
      return _http.get('/Member/shopping/second_category_list', category1_id)
    },
    // 商品列表
    getGoodsList(page = 1, row = 10, category1_id = 0, category2_id = 0, desc = 'DESC') {
      return _http.get('/Member/shopping/goods_list', page, row, desc, category1_id, category2_id)
    },
    // 商品详情
    getGoodsInfo(id){
      return _http.get('/Member/shopping/goods_detail', id)
    },
    // 获取立即购买信息
    getBuyInfo(id, longitude, latitude) {
      return _http.get('/Member/Shopping/order_info', id, longitude, latitude)
    }
  },
  // 购物车
  shopcar: {
    getList() {
      return _http.get('/Member/cart/list')
    },
    // 修改购物车数量
    editNum(id, goods_number = 1) {
      return _http.post('/Member/cart/add_num_info', {
        id, goods_number
      })
    },
    // 添加商品到购物车
    add(id, goods_number = 1) {
      return _http.post('/Member/cart/add', {
        id, goods_number
      })
    },
    // 删除一个或多个购物车商品
    del(id) { // id = '1,2,3'
      return _http.post('/Member/cart/delete', {
        id
      })
    },
    // 获取购物车结算信息
    getBuyInfo(jsonData) {
      jsonData = JSON.stringify(jsonData)
      return _http.post('/Member/cart/settle', {jsonstr: jsonData} )
    }
  },
  // 订单
  order: {
    getList(page = 1, row = 10, type = 1) {
      return _http.get('/Member/order/list', page, row, type)
    },
    add(formData) {
      return _http.post('/Member/order/goods', formData)
    },
    add2(jsonData) {
      jsonData = JSON.stringify(jsonData)
      return _http.post('/Member/order/cart_goods', {jsonstr: jsonData} )
    },
    getHistory(page = 1, row = 10) {
      return _http.get('/Member/order/his_order', page, row)
    }
  },
  // 门店
  store: {
    getList(page = 1, row = 10, longitude = 0, latitude = 0) {
      return _http.get('/Member/store/lbs_list', page, row, longitude, latitude)
    },
    getInfo(id) {
      return _http.get('/Member/store/info', id)
    }
  }
}

Vue.mixin({
  created() {
    // 异步通信
    // this.$http = _http

    // 判断设备
    this.$device = utils.device

    // 接口
    this.$server = _server

    // 本地缓存
    this.$storage = storage
  }
})


export default _server
