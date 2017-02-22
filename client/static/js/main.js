require.config({
  paths: {
    'zepto':  'http://g.alicdn.com/sj/lib/zepto/zepto.min',
    // 'sui':    'http://g.alicdn.com/msui/sm/0.6.2/js/??sm.min.js,sm-extend.min.js',
    // 'vue':    'https://unpkg.com/vue@1.0.28/dist/vue',
    'sui':    '../plugs/sui',
    'vue':    '../plugs/vue1.x',
    'utils':  '../js/utils'
  },
  shim : {
    'zepto':  { 'exports' : '$' },
    'sui':  { 'exports' : '$', 'deps' : ['zepto'] }
  },
  // urlArgs: "v=1.0.1",
  waitSeconds: 60
});

require(['zepto'], function($){
  // 自定义工具方法
  var toptipTimeid = null;
  $.toptip = function(text, ms){
    if(!text) return;
    ms = ms || 3000;

    var $toptip = $('#l-toptip');
    if($toptip.length === 0){
      $toptip = $('<div id="l-toptip" class="l-toptip">').appendTo(document.body);
    }
    clearTimeout(toptipTimeid)
    $toptip.text(text).addClass('l-show');
    toptipTimeid = setTimeout(function(){
      $toptip.text('').removeClass('l-show')
    }, ms);
  }
 
  // 路由配置
  $.config = {
    // router: false,
    // 路由功能开关过滤器，返回 false 表示当前点击链接不使用路由
    routerFilter: function($link) {
      // 某个区域的 a 链接不想使用路由功能
      if ($link.is('.disable-router a')) {
        return false;
      }
      return true;
    }
  };
  
  // 页面框架加载
  require(['sui', 'vue', 'utils'], function($, Vue, utils) {
    // 主页面禁用切换动画
    var isDisableAnimation = false;
    var noAnimationPages = ['pageIndex', 'pageMessage', 'pageShopcar', 'pageUser'];
    $(document).on('beforePageSwitch', function(e, pageId, $page) {
      if(noAnimationPages.indexOf(pageId) !== -1){
        isDisableAnimation = true;
      }else{
        isDisableAnimation = false;
      }
    });
    $(document).on('pageAnimationStart', function(e, pageId, $page) {
      _cb.vms[pageId] && _cb.vms[pageId].$destroy(false, true);
      console.log($page[0].innerHTML);
      if(isDisableAnimation && noAnimationPages.indexOf(pageId) !== -1){
        $page.closest('.page-group').addClass('no-animation');
      }
    });
    $(document).on('pageAnimationEnd', function(e, pageId, $page) {
      $page.closest('.page-group.no-animation').removeClass('no-animation');
    });

    // 监听页面初始化
    $(document).on('pageInit', function(e, pageId, $page) {
      setTimeout(function(){
        $.isFunction(_cb[pageId]) && _cb[pageId]($, Vue, utils);
      }, 50);
    });

    // $(window).on('beforePageRemove', function(e) {
    //   _cb.vms['pageCarInfo'] && _cb.vms['pageCarInfo'].$destroy();
    //   _cb.vms['pageCarBrands'] && _cb.vms['pageCarBrands'].$destroy();
    // });

    // 返回上一页
    $('body').on('click' ,'header.bar-nav>.icon-left', function(){
      // window.history.back();
      $.router.back();
    });

    // 页面刷新
    $(document.body).on('click' ,'header.bar-nav>.icon-refresh', function(){
      window.location.reload();
    });

    // sui 初始化
    $.init();

  }); 
});
/*==============页面回调函数===============*/
var _cb = (function(){
  var cb = {};
  cb.vms = {};
  // 首页
  cb.pageIndex = function($, Vue, utils){
    $('.swiper-container').swiper();
  };

  // 添加、编辑车辆信息
  cb.pageCarInfo = function($, Vue, utils){
    $('#date-on-road').calendar();
    cb.vms['pageCarInfo'] = new Vue({
      el: document.body,
      data: {
        carModel: '11',
        carNumPrefix: '粤A',
        formData: {}
      },
      created: function(){
        var self = this;
        var sltedBrand = utils.storage.local.get('sltedBrand') || {};
        var sltedSeries = utils.storage.local.get('sltedSeries') || {};
        var sltedCarcc = utils.storage.local.get('sltedCarcc') || {};
        self.carModel = utils.storage.local.get('carModel') || 22;
      },
      methods: {
        submit() {

        }
      }
    });

    // console.log(cb.vms['pageCarInfo'])
  };

  // 选择车辆型号
  cb.pageCarBrands = function($, Vue, utils){
    // 车品牌按字母排序
    var groupByLetter = function(arr){ 
      var retObject = {};
      for (var i = 0, letter = null; i < arr.length;  i++) {
        letter = arr[i].value.substr(0,1).toLowerCase();
        retObject[letter] = retObject[letter] || [];
        retObject[letter].name = letter;
        arr[i].index = i;
        retObject[letter].push(arr[i]);
      };
      return retObject;
    };

    cb.vms['pageCarBrands'] = new Vue({
      el: document.body,
      data: function(){
        return {
          carList: {
            brands: {},   // 品牌
            series: [],   // 车系
            carccs: [],   // 排量
            sltedBrand: {},
            sltedSeries: {},
            sltedCarcc: {}
          }
        }
      },
      ready: function(){
        var self = this;
        // 获取车品牌数据
        $.getJSON('../static/data/car-brands.json', function(response){
          if(response.success){
            self.carList.brands = groupByLetter(response.data); 
          }else{
            $.alert(response.message);
          }
        });

        // 测试数据
        var n = 50;
        while(--n>0){
          this.carList.series.push({id: n, name: '车系数据'+n});
          this.carList.carccs.push({id: n, name: '排量数据'+n});
        }
      },
      methods: {
        sltBrand: function(brand){
          this.carList.sltedBrand = brand;
          this.carModel = brand.name;
          utils.storage.local.set('sltedBrand', brand);
          $.router.load('#pageCarSeries');
        },
        sltSeries: function(series){
          this.carList.sltedSeries = series;
          this.carModel = this.carList.sltedBrand.name + ' ' + series.name;
          utils.storage.local.set('sltedSeries', series);
          $.router.load('#pageCarccs');
        },
        sltCarccs: function(carcc){
          utils.storage.local.set('sltedCarcc', carcc);
          this.carList.sltedCarcc = carcc;
          this.carModel = this.carList.sltedBrand.name + ' ' + this.carList.sltedSeries.name + ' ' + carcc.name;
          utils.storage.local.set('sltedCarcc', carcc);
          utils.storage.local.set('carModel', this.carModel);
          window.history.go(-Math.min(window.history.length-1, 3));
        }
      }
    });
  };

  // 选择车牌城市
  cb.pageCarPrefix = function(){
    var vm = new Vue({
      el: document.body,
      data: function(){
        return {
          carNumPrefixList: [],
          sltedCarNumPrefix: {}
        }
      },
      ready: function(){
        var self = this;
        // 车牌地区数据
        $.getJSON('../static/data/car-num-prefix.json', function(list){
          self.carNumPrefixList = list; 
        });
      },
      methods: {
        sltCarNumProvince: function(province){
          this.sltedCarNumPrefix = province;
          $.openPanel('#panelCarCity');
        },
        sltCarNumCity: function(city){
          this.carNumPrefix = city.oldName;
          $.router.back();
          $.closePanel();
        }
      }
    });
  };

  // 检测详情
  cb.pageMessageDetailsAll = function($, Vue, utils){
    $('#check-all').on('click', '.l-check-item', function(){
      $(this).toggleClass('l-check-expand');
    });
  };

  // 动态
  cb.pageMessage = function($, Vue, utils){
    console.log('动态')
  };

  return cb;
})();

