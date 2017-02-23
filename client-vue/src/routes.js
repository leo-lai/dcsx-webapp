const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  {
    path: '/login',
    meta: { title: '登录' },
    component: (resolve) => require(['./pages/login'], resolve)
  },
  {
    path: '/index',
    meta: { mainPage: true, title: '首页' },
    component: (resolve) => require(['./pages/index'], resolve)
  },
  {
    path: '/message',
    meta: { mainPage: true, title: '动态' },
    component: (resolve) => require(['./pages/message'], resolve)
  },
  // {
  //   path: '/message/details',
  //   meta: { mainPage: true, title: '检测明细' },
  //   component: (resolve) => require(['./pages/message-details'], resolve)
  // },
  {
    path: '/shopcar',
    meta: { mainPage: true, title: '购物车' },
    component: (resolve) => require(['./pages/shopcar'], resolve)
  },
  {
    path: '/user',
    meta: { mainPage: true, title: '我的' },
    component: (resolve) => require(['./pages/user'], resolve)
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
    meta: { title: '车辆品牌' },
    component: (resolve) => require(['./pages/car-brands'], resolve)
  },
  {
    path: '/car/family/:id',
    meta: { title: '品牌系列' },
    component: (resolve) => require(['./pages/car-family'], resolve)
  },
  {
    path: '/car/pailiang/:id',
    meta: { title: '品牌系列' },
    component: (resolve) => require(['./pages/car-pailiang'], resolve)
  },
  {
    path: '/car/city',
    meta: { title: '车牌城市' },
    component: (resolve) => require(['./pages/car-city'], resolve)
  },
]


export default routes