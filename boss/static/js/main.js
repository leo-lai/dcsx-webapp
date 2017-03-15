require.config({
  paths: {
    'zepto':  'http://g.alicdn.com/sj/lib/zepto/zepto.min',
    'sui':    'http://g.alicdn.com/msui/sm/0.6.2/js/??sm.min.js,sm-extend.min.js',
    'utils':  '../js/utils'
  },
  shim : {
    'zepto':  { 'exports' : '$' },
    'sui':  { 'exports' : '$', 'deps' : ['zepto'] }
  },
  urlArgs: "v=1.0.1",
  waitSeconds: 60
});

require(['zepto'], function($){
  var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  // 自定义工具
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
  };

  $.load = function(url, callback){
    if(!url) return false;
    var parts = url.split(/\s/), ajaxUrl, selector;

    ajaxUrl = parts[0];
    selector = parts[1];

    $.showIndicator();
    $.get(ajaxUrl, function(response){
      $.hideIndicator();
      var responseHtml = selector ? $('<div>').html(response.replace(rscript, '')).find(selector).html() : response;
      $.popup(responseHtml, true);
      $.isFunction(callback) && callback();
    });
  };

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
  require(['sui', 'utils'], function($, utils) {
    // 返回
    $(document).on('click' ,'.nav-back:not(.back)', function(){
      window.history.back();
    });

    // 刷新
    $(document).on('click' ,'header.bar-nav>.icon-refresh', function(){
      window.location.reload();
    });

    // 防止重复点击
    $(document).on('click', '.l-check>input', function(e){
      e.stopPropagation();
    });

    // 弹窗页面
    $(document).on('click', 'a[popup-page]', function(e){
      var url = $(this).attr('popup-page');
      $.load(url);
      return false;
    });

    // 监听页面初始化
    $(document).on('pageInit', function(e, pageId, $page) {
      // 页面初始化回调
      $.isFunction(window[pageId + '-init']) && window[pageId + '-init']($, utils);
      $.isFunction(window['pageInit']) && window['pageInit']($, utils);
    });

    // 框架加载完毕回调
    $.isFunction(window.requireCallback) && window.requireCallback($, utils);

    // 触发初始化
    $.init();
  }); 
});

