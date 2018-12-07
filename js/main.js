/* global $ */

$(document).ready(function() {
  
  // nav-barのハンバーガーボタンのシステム
  var nav = $('nav'),
      navUl = nav.find('ul'),
      navLi = navUl.find('li'),
      navA = navLi.find('a'),
      mdBtnOn = $('.modalBtnOn'),
      mdBtnOff = $('.modalBtnOff'),
      overlayOpacity = 1.0,
      fadeTime       = 500,
      w = $(window).width(),
      h = $(window).height();
      
  // リサイズ関係の処理
  $(window).resize(function() {
    w = $(window).width();
    h = $(window).height();
    console.log(w, h);
    // 551px未満の場合
    if ( w < 551 ) {
      $('#modalInclude').css({opacity: '0', display: 'none'});
    
    } else {
      $('#modalInclude').css({opacity: '1', display: 'block'});
    }
    $('#mdOverlay').css({height: h});
  });
  // ----------- w,h の記録 -----------//
  
  mdBtnOn.on('click', function(e) {
    var wdHeight = $(window).height(),
        setHref = mdBtnOn.attr('href');
    e.preventDefault();
    $('body').append('<div id="mdOverlay"></div>');
    // modalボタンのフェードアウト
    mdBtnOn.fadeOut(fadeTime);
    mdBtnOff.fadeIn(fadeTime);
    $('#modalInclude').css({opacity: '0', display: 'block'}).stop().animate({ opacity: overlayOpacity}, fadeTime);
    $('.fa-times').css({display: 'block', opacity: '0'}).animate({opacity: '1', transform: 'rotate(360deg)'}, fadeTime);
    $('#mdOverlay').css({display: 'block', height: wdHeight})
    .stop().animate({display: 'block', opacity: overlayOpacity });
  });
  
  
  mdBtnOff.on('click',function () {
    $('#modalInclude').css({opacity: '1'}).stop().animate({ opacity: '0'}, fadeTime, function() {
      $('#modalInclude').css({display: 'none'});
    });
    $('#mdOverlay').stop().animate({opacity: '0'}, fadeTime, function() {
      $('#mdOverlay').remove();
      mdBtnOn.fadeIn(fadeTime);
      mdBtnOff.fadeOut(fadeTime);
    });
  });
  
  
  navA.on('click', function() {
    // modaiInclude の内容をフェードアウト
    if ( w < 551) {
      $('#modalInclude').css({opacity: '1'}).stop().animate({ opacity: '0'}, fadeTime, function() {
        $('#modalInclude').css({display: 'none'});
      });
      $('#mdOverlay').fadeOut(fadeTime, function() {
        $('#mdOverlay').remove();
        mdBtnOn.fadeIn(fadeTime);
        mdBtnOff.fadeOut(fadeTime);
      });
    }
    
  });
  
  $('#mdOverlay').on('click', function() {
      var self = $(this);
      self.css({opacity: '1'}).stop().animate({opacity: '0'}, fadeTime, function() {
        self.remove();
      });
  });
  
  
  
  
  // ----------- ハンバーガーボタンシステム終わり ------------- //
  
  
  // ------------スライドパネルの実装
  var setElm = $('.slidePanel'),
      slideSpeed = 500;
  
  setElm.each(function () {
    var self = $(this),
        selfWidth = self.innerWidth(),
        selfUl = self.find('ul'),
        selfLi = selfUl.find('li'),
        listWidth = selfLi.outerWidth(),
        listLength = selfLi.length,
        slideWidth = listLength * listWidth;
    selfUl.css({ width: slideWidth });
    $(window).on('resize',function() {
      var h = $(window).height(),
          w = $(window).width();
      console.log(w);
      listWidth = selfLi.outerWidth(),
      slideWidth = listLength * listWidth;
  
      if( w < 550 ) {
        selfUl.stop().animate({left: '0'}, slideSpeed, function() {
          btnSet();
          selfUl.css({width: slideWidth});
        });
      } else {
        selfUl.stop().animate({left: '0', slideSpeed, function() {
          btnSet();
          selfUl.css({width: slideWidth});
        }});
      }
      
      return false;
    });
    
    if( selfWidth <= slideWidth) {
      self.append('<a href="javascript:void(0)" class="btn-prev fas fa-10x fa-angle-left"></a><a href="javascript:void(0)" class="btn-next fas fa-10x fa-angle-right"></a>')
          .find('ul').wrapAll('<div class="slideWrap" />');
          
      var prevBtn = self.find('.btn-prev'),
          nextBtn = self.find('.btn-next');
      
      prevBtn.on('click', function(e) {
        
        selfUl.not(':animated').animate({left: '+=' + (listWidth)}, slideSpeed, function() {
          btnSet();
        });
      });
      nextBtn.on('click', function(e) {
        selfUl.not(':animated').animate({left: '-=' + (listWidth)}, slideSpeed, function() {
          btnSet();
        });
      });
      btnSet();
    }
    
    function btnSet() {
      var ulLeft = parseInt(selfUl.css('left'), 10),
          maskWidth = selfWidth - slideWidth; //隠された部分の長さ
      
      if(ulLeft >= 0) {
        nextBtn.css({display: 'block'});
        prevBtn.css({display: 'none'});
      }
      else if(ulLeft <= maskWidth ){
        nextBtn.css({display: 'none'});
        prevBtn.css({display: 'block'});
      }
      else {
        nextBtn.css({display: 'block'});
        prevBtn.css({display: 'block'});
      }
    }
  });
  
  
  // トップページスクロール移動
  $('body').append('<a href="javascript:void(0);" class="fas fa-10x fa-angle-double-up" id="fixedTop"></a>');
  $('#fixedTop').on('click', function() {
    $('html,body').animate({scrollTop: '0'}, 500);
  });
  
  $(window).on('load scroll resize', function() {
    var showTop = 3000;
    if (w < 551) {
      showTop = 3200;
    }
    
    
    if($(window).scrollTop() > showTop) {
      $('#fixedTop').fadeIn('normal');
    } else {
      $('#fixedTop').fadeOut('normal');
    }
  });

});
