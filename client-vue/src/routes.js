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
    path: '/combos',
    meta: { title: '套餐年卡' },
    component: (resolve) => require(['./pages/combos'], resolve)
  },
  {
    path: '/combos/info/:id',
    meta: { title: '套餐详情' },
    component: (resolve) => require(['./pages/combos-info'], resolve)
  },
  {
    path: '/combos/info/slt/:id',
    meta: { title: '选择套餐' },
    component: (resolve) => require(['./pages/combos-service'], resolve)
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
    path: '/user/combos',
    meta: { title: '我的套餐' },
    component: (resolve) => require(['./pages/user-combos'], resolve)
  },
  {
    path: '/user/order',
    meta: { title: '我的商品' },
    component: (resolve) => require(['./pages/user-order'], resolve)
  },
  {
    path: '/user/order/info/:id',
    meta: { title: '订单详情' },
    component: (resolve) => require(['./pages/user-order-info'], resolve)
  },
  {
    path: '/user/order/history',
    meta: { title: '消费记录' },
    component: (resolve) => require(['./pages/user-order-history'], resolve)
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
    path: '/order/confirm2',
    meta: { title: '订单确认' },
    component: (resolve) => require(['./pages/order-confirm2'], resolve)
  },
  {
    path: '/order/pay',
    meta: { title: '订单支付' },
    component: (resolve) => require(['./pages/order-pay'], resolve)
  },
  {
    path: '/user/stores',
    meta: { title: '附近门店' },
    component: (resolve) => require(['./pages/stores'], resolve)
  },
  {
    path: '/user/stores/info/:id',
    meta: { title: '附近门店' },
    component: (resolve) => require(['./pages/stores-info'], resolve)
  },
  {
    path: '/user/agent',
    meta: { title: '分销记录' },
    component: (resolve) => require(['./pages/user-agent'], resolve)
  },
  {
    path: '/user/agent/apply',
    meta: { title: '申请分销商' },
    component: (resolve) => require(['./pages/user-agent-apply'], resolve)
  },
  {
    path: '/user/holder',
    meta: { title: '分红记录' },
    component: (resolve) => require(['./pages/user-holder'], resolve)
  },
  {
    path: '/user/holder/member',
    meta: { title: '我的人脉' },
    component: (resolve) => require(['./pages/user-holder-member'], resolve)
  },
  {
    path: '/user/holder/drawal',
    meta: { title: '提现记录' },
    component: (resolve) => require(['./pages/user-holder-drawal'], resolve)
  },
  {
    path: '/user/holder/rebate',
    meta: { title: '累计分红' },
    component: (resolve) => require(['./pages/user-holder-rebate'], resolve)
  }
]


export default routes