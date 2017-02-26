const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  {
    path: '/login',
    meta: { title: '登录', auth: false },
    component: (resolve) => require(['./pages/login'], resolve)
  },
  {
    path: '/index',
    meta: { title: '首页', mainPage: true },
    component: (resolve) => require(['./pages/index'], resolve)
  },
  {
    path: '/message',
    meta: { title: '动态', mainPage: true },
    component: (resolve) => require(['./pages/message'], resolve)
  },
  {
    path: '/shopcar',
    meta: { title: '购物车', mainPage: true },
    component: (resolve) => require(['./pages/shopcar'], resolve)
  },
  {
    path: '/user',
    meta: { title: '我的', mainPage: true },
    component: (resolve) => require(['./pages/user'], resolve)
  },
  {
    path: '/combo',
    meta: { title: '套餐年卡' },
    component: (resolve) => require(['./pages/combo'], resolve)
  },
  {
    path: '/combo/info/:id',
    meta: { title: '套餐年卡' },
    component: (resolve) => require(['./pages/combo-info'], resolve)
  },
  {
    path: '/shop',
    meta: { title: '特惠商城' },
    component: (resolve) => require(['./pages/shop'], resolve)
  },
  {
    path: '/shop/goods/:id',
    meta: { title: '商品列表' },
    component: (resolve) => require(['./pages/goods'], resolve)
  },
  {
    path: '/shop/goods/info/:id',
    meta: { title: '商品详情' },
    component: (resolve) => require(['./pages/goods-info'], resolve)
  },
  {
    path: '/alicar',
    meta: { title: '阿里车码头' },
    component: (resolve) => require(['./pages/alicar'], resolve)
  },
  {
    path: '/coupons',
    meta: { title: '优惠券中心' },
    component: (resolve) => require(['./pages/coupons'], resolve)
  },
  {
    path: '/user/coupons',
    meta: { title: '我的优惠券' },
    component: (resolve) => require(['./pages/user-coupons'], resolve)
  },
  {
    path: '/car/list',
    meta: { title: '我的车辆' },
    component: (resolve) => require(['./pages/car-list'], resolve)
  },
  {
    path: '/car/edit/:id',
    meta: { title: '编辑车辆信息' },
    component: (resolve) => require(['./pages/car-info'], resolve)
  },
  {
    path: '/car/add',
    meta: { title: '新增车辆' },
    component: (resolve) => require(['./pages/car-info'], resolve)
  },
  {
    path: '/car/brands',
    meta: { title: '选择品牌系列' },
    component: (resolve) => require(['./pages/car-brands'], resolve)
  },
  {
    path: '/car/group/:id',
    meta: { title: '选择车组排量' },
    component: (resolve) => require(['./pages/car-group'], resolve)
  },
  {
    path: '/car/family/:id',
    meta: { title: '选择系列' },
    component: (resolve) => require(['./pages/car-family'], resolve)
  },
  {
    path: '/car/pailiang/:id',
    meta: { title: '选择车排量' },
    component: (resolve) => require(['./pages/car-pailiang'], resolve)
  },
  {
    path: '/car/model/:id',
    meta: { title: '选择车型' },
    component: (resolve) => require(['./pages/car-model'], resolve)
  },
  {
    path: '/car/city',
    meta: { title: '车牌城市' },
    component: (resolve) => require(['./pages/car-city'], resolve)
  },
  {
    path: '/order/confirm/:id',
    meta: { title: '订单确认' },
    component: (resolve) => require(['./pages/order-confirm'], resolve)
  },
  {
    path: '/order/pay',
    meta: { title: '订单支付' },
    component: (resolve) => require(['./pages/order-pay'], resolve)
  }
]


export default routes