/* global $ */

function responsive_nav() {
  // nav-barのハンバーガーボタンのシステム
  var nav = $('nav'),
      navUl = nav.find('ul'),
      navLi = navUl.find('li'),
      navLink = navLi.find('a'),
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
    $('#nav_mdOverlay').css({height: h});
  });
  // ----------- w,h の記録 -----------//
  
  mdBtnOn.on('click', function(e) {
    var wdHeight = $(window).height(),
        setHref = mdBtnOn.attr('href');
    e.preventDefault();
    $('body').append('<div id="nav_mdOverlay"></div>');
    // modalボタンのフェードアウト
    
    mdBtnOff.fadeIn(fadeTime);
    $('#nav_mdOverlay').css({display: 'block', height: wdHeight, width: w})
    .stop().animate({display: 'block', opacity: overlayOpacity , background: '#e4ecee'}, function() {
      mdBtnOn.stop().animate({opacity: '0'}, fadeTime,  function() {
        mdBtnOn.css({display: 'none'});
      });
    });
    $('#modalInclude').css({opacity: '0', display: 'block'}).stop().animate({ opacity: overlayOpacity}, fadeTime);
    $('nav .fa-times').css({display: 'block', opacity: '0'}).animate({opacity: '1', transform: 'rotate(360deg)'}, fadeTime);
    
  });
  
  
  mdBtnOff.on('click',function () {
    $('#modalInclude').css({opacity: '1'}).stop().animate({ opacity: '0'}, fadeTime, function() {
      $('#modalInclude').css({display: 'none'});
    });
    $('#nav_mdOverlay').stop().animate({opacity: '0'}, fadeTime, function() {
      $('#nav_mdOverlay').remove();
      mdBtnOn.css({opacity: '1'});
      mdBtnOn.fadeIn(fadeTime);
      mdBtnOff.fadeOut(fadeTime);
      
    });
    
  });
  
  
  navLink.on('click', function() {
    // modaiInclude の内容をフェードアウト
    if ( w < 551) {
      $('#modalInclude').css({opacity: '1'}).stop().animate({ opacity: '0'}, fadeTime, function() {
        $('#modalInclude').css({display: 'none'});
      });
      $('#nav_mdOverlay').fadeOut(fadeTime, function() {
        $('#nav_mdOverlay').remove();
        mdBtnOn.fadeIn(fadeTime);
        mdBtnOff.fadeOut(fadeTime);
      });
    }
    
  });
  
  $('#nav_mdOverlay').on('click', function() {
      var self = $(this);
      self.css({opacity: '1'}).stop().animate({opacity: '0'}, fadeTime, function() {
        self.remove();
      });
  });
  
  
  
  
  // ----------- ハンバーガーボタンシステム終わり ------------- //
}

$(document).ready(function() {
  responsive_nav();
})