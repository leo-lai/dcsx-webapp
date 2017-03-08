import login from './pages/login'
import index from './pages/index'
import report from './pages/report'
import reportInfo from './pages/report-info'
import shopcar from './pages/shopcar'
import coupons from './pages/coupons'
import user from './pages/user'
import userCoupons from './pages/user-coupons'
import userCombos from './pages/user-combos'
import userRecharge from './pages/user-recharge'
import userOrder from './pages/user-order'
import userOrderInfo from './pages/user-order-info'
import combos from './pages/combos'
import combosInfo from './pages/combos-info'
import shop from './pages/shop'
import goods from './pages/goods'
import goodsInfo from './pages/goods-info'
import carList from './pages/car-list'
import carInfo from './pages/car-info'
import stores from './pages/stores'
import storesInfo from './pages/stores-info'

const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  {
    path: '/login',
    meta: { title: '登录', auth: false },
    component: login
  },
  {
    path: '/index',
    meta: { title: '首页', cache: true, mainPage: true },
    component: index
  },
  {
    path: '/report',
    meta: { title: '检测报告', cache: true,  mainPage: true },
    component: report
  },
  {
    path: '/report/info/:id',
    meta: { title: '检查明细'},
    component: reportInfo
  },
  {
    path: '/shopcar',
    meta: { title: '购物车', cache: true,  mainPage: true },
    component: shopcar
  },
  {
    path: '/user',
    meta: { title: '我的', cache: true,  mainPage: true },
    component: user
  },
  {
    path: '/user/recharge',
    meta: { title: '账户充值' },
    component: userRecharge
  },
  {
    path: '/combos',
    meta: { title: '套餐年卡' },
    component: combos
  },
  {
    path: '/shop',
    meta: { title: '特惠商城' },
    component: shop
  },
  {
    path: '/coupons',
    meta: { title: '优惠券中心' },
    component: coupons
  },
  {
    path: '/shop/goods/:id',
    meta: { title: '商品列表' },
    component: goods
  },
  {
    path: '/shop/goods/info/:id',
    meta: { title: '商品详情' },
    component: goodsInfo
  },
  {
    path: '/combos/info/:id',
    meta: { title: '套餐详情' },
    component: combosInfo
  },
  {
    path: '/combos/info/slt/:id',
    meta: { title: '选择套餐' , lazy: true},
    component: (resolve) => require(['./pages/combos-service'], resolve)
  },
  {
    path: '/alicar',
    meta: { title: '阿里车码头' , lazy: true},
    component: (resolve) => require(['./pages/alicar'], resolve)
  },
  {
    path: '/user/coupons',
    meta: { title: '我的优惠券' },
    component: userCoupons
  },
  {
    path: '/user/combos',
    meta: { title: '我的套餐' },
    component: userCombos
  },
  {
    path: '/user/order',
    meta: { title: '我的商品' },
    component: userOrder
  },
  {
    path: '/user/order/info/:id',
    meta: { title: '订单详情' },
    component: userOrderInfo
  },
  {
    path: '/user/order/history',
    meta: { title: '消费记录' , lazy: true},
    component: (resolve) => require(['./pages/user-order-history'], resolve)
  },
  {
    path: '/car/list',
    meta: { title: '我的车辆' },
    component: carList
  },
  {
    path: '/car/edit/:id',
    meta: { title: '编辑车辆信息' },
    component: carInfo
  },
  {
    path: '/car/add',
    meta: { title: '新增车辆' },
    component: carInfo
  },
  {
    path: '/car/brands',
    meta: { title: '选择品牌系列' , lazy: true},
    component: (resolve) => require(['./pages/car-brands'], resolve)
  },
  {
    path: '/car/group/:id',
    meta: { title: '选择车组排量' , lazy: true},
    component: (resolve) => require(['./pages/car-group'], resolve)
  },
  {
    path: '/car/family/:id',
    meta: { title: '选择系列' , lazy: true},
    component: (resolve) => require(['./pages/car-family'], resolve)
  },
  {
    path: '/car/pailiang/:id',
    meta: { title: '选择车排量' , lazy: true},
    component: (resolve) => require(['./pages/car-pailiang'], resolve)
  },
  {
    path: '/car/model/:id',
    meta: { title: '选择车型' , lazy: true},
    component: (resolve) => require(['./pages/car-model'], resolve)
  },
  {
    path: '/car/city',
    meta: { title: '车牌城市' , lazy: true},
    component: (resolve) => require(['./pages/car-city'], resolve)
  },
  {
    path: '/order/confirm/:id',
    meta: { title: '订单确认' , lazy: true},
    component: (resolve) => require(['./pages/order-confirm'], resolve)
  },
  {
    path: '/order/confirm2',
    meta: { title: '订单确认' , lazy: true},
    component: (resolve) => require(['./pages/order-confirm2'], resolve)
  },
  {
    path: '/order/pay',
    meta: { title: '订单支付' , lazy: true},
    component: (resolve) => require(['./pages/order-pay'], resolve)
  },
  {
    path: '/user/stores',
    meta: { title: '附近门店' },
    component: stores
  },
  {
    path: '/user/stores/info/:id',
    meta: { title: '附近门店' },
    component: storesInfo
  },
  {
    path: '/user/agent',
    meta: { title: '分销记录' , lazy: true},
    component: (resolve) => require(['./pages/user-agent'], resolve)
  },
  {
    path: '/user/agent/apply',
    meta: { title: '申请分销商' , lazy: true},
    component: (resolve) => require(['./pages/user-agent-apply'], resolve)
  },
  {
    path: '/user/holder',
    meta: { title: '分红记录' , lazy: true},
    component: (resolve) => require(['./pages/user-holder'], resolve)
  },
  {
    path: '/user/holder/member',
    meta: { title: '我的人脉' , lazy: true},
    component: (resolve) => require(['./pages/user-holder-member'], resolve)
  },
  {
    path: '/user/holder/drawal',
    meta: { title: '提现记录' , lazy: true},
    component: (resolve) => require(['./pages/user-holder-drawal'], resolve)
  },
  {
    path: '/user/holder/rebate',
    meta: { title: '累计分红' , lazy: true},
    component: (resolve) => require(['./pages/user-holder-rebate'], resolve)
  }
]


export default routes