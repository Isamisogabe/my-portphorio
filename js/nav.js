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
      
      if ($('#nav_mdOverlay').attr('display') == 'block'){
        $('#modalInclude').css({opacity: '0', display: 'none'});
        $('.fa-bars').fadeIn(fadeTime);
      } else {
        $('#modalInclude').css({opacity: '0', display: 'none'});
        $('.fa-bars').fadeIn(fadeTime);
      }
      
      
    } else {
      $('#modalInclude').css({opacity: '1', display: 'block'});
      $('.fa-bars').fadeOut(fadeTime);
    }
    $('#nav_mdOverlay').css({height: h, width: w});
  });
  // ----------- w,h の記録 -----------//
  
  mdBtnOn.on('click', function(e) {
    var wdHeight = $(window).height(),
        setHref = mdBtnOn.attr('href');
    e.preventDefault();
    $('body').append('<div id="nav_mdOverlay"></div>');
    // modalボタンのフェードアウト
    
    $('#nav_mdOverlay').css({display: 'block', height: wdHeight, width: w, opacity: '0'})
    .stop().animate({display: 'block', opacity: overlayOpacity , background: '#e4ecee'}, fadeTime, function() {
      
    });
    $('#modalInclude').css({opacity: '0', display: 'block'}).stop().animate({ opacity: overlayOpacity}, fadeTime);
    $('.fa-bars').fadeOut(fadeTime, function() {
      $('.fa-times').fadeIn(fadeTime);
    });
  });
  
  
  mdBtnOff.on('click',function () {
    $('#modalInclude').css({opacity: '1'}).stop().animate({ opacity: '0'}, fadeTime, function() {
      $('#modalInclude').css({display: 'none'});
    });
    $('#nav_mdOverlay').stop().animate({opacity: '0'}, fadeTime, function() {
      $('#nav_mdOverlay').remove();
      
      $('nav .fa-times').fadeOut(fadeTime, function() {
        $('.fa-bars').fadeIn(fadeTime);
      });
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