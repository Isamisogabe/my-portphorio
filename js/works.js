/* global $ */
function circleBtn(id) {
  $('.fadePanel > ul > li').not(':nth-child(' + id + ')')
  .stop().animate({opacity: '0'}, 500, function() {
    $(this).css({display: 'none'});
    $('.fadePanel > ul > li:nth-child(' + id + ')')
    .css({display: 'block', opacity: '0'})
    .stop().animate({opacity: '1'}, 500);
  });
  $(this).css({background: '#feb535'});
  $('.circle').not(':nth-child(' + id + ')').css({background: '#C4D6DA'});
}
$(document).ready(function() {
  //----------------- making modalWindow ------//
  let fadeTime = 500,
      w        = $(window).width(),
      h        = $(window).height();
  $('.item').on('click', function() {
    var self         = $(this),
        selfIdname   = self.attr('id'),
        idString = selfIdname.substr(-1),
        id           = parseInt(idString, 10) ;
    w        = $(window).width(),
    h        = $(window).height();
    // リサイズ関係の処理
    $(window).resize(function() {
      w = $(window).width();
      h = $(window).height();
      $('#mdOverlay').css({height: h,width: w});
      
    });
    $('#mdOverlay').css({height: h,width: w, opacity: '0', display: 'block'}).stop().animate({opacity: '1'}, fadeTime );
    // ----------- w,h の記録 -----------//
    
    // 表すコンテンツエリア表示
    $('div > .mdContent:nth-child(' + id + ')').css({display: 'block'});
    console.log(' div > .mdContent:nth-child(' + id + ')');
    
    var lenLi = $('div > .mdContent:nth-child(' + id + ') .fadePanel ul li').length;
    
    console.log(lenLi);
    
    // 初期設定
    $('.fadePanel > ul > li:first-child').css({display: 'block', opacity: '1'});
    
    // 円ボタンの数の指定
    for(var i=0;i<lenLi;i++) {
      $('.fadePanel > div').append('<div class="circle"></div>');
    }
    $('.circle:nth-child(1)').css({background: '#feb535'});
    
    // 円ボタンのクリック処理
    $(document).on('click','.circle', function() {
      var self = $(this),
          id   = self.index() + 1; // CSS対応のため+1
      $('.fadePanel > ul > li').not(':nth-child(' + id + ')')
      .stop().animate({opacity: '0'}, 500, function() {
        $(this).css({display: 'none'});
        $('.fadePanel > ul > li:nth-child(' + id + ')')
        .css({display: 'block', opacity: '0'})
        .stop().animate({opacity: '1'}, 500);
      });
      self.css({background: '#feb535'});
      $('.circle').not(':nth-child(' + id + ')').css({background: '#C4D6DA'});
    });
    
    // Autoplayの処理5秒後に自動で入れ替え
    var count = 0;
    var countId    = 1;
    var countUp = function() {
      console.log(count++);
      
      var stopWatch  = setTimeout(countUp, 1000);
      // ボタンクリックが存在した時にidの値変更
      $(document).on('click','.circle', function() {
        countId = $(this).index() + 1;
        count = 0;
      });
      
      // count > 5 のとき変更
      if(count > 5) {
        count = 0;
        // 自動的に入れ替える
        countId = countId % 3 + 1; 
        $('.fadePanel > ul > li').not(':nth-child(' + countId + ')')
        .stop().animate({opacity: '0'}, 500, function() {
          $(this).css({display: 'none'});
          $('.fadePanel > ul > li:nth-child(' + countId + ')')
          .css({display: 'block', opacity: '0'})
          .stop().animate({opacity: '1'});
        });
        $('.circle:nth-child(' + countId + ')').css({background: '#feb535'});
        $('.circle').not(':nth-child(' + countId + ')').css({background: '#C4D6DA'});
      }
      // #mdCancel時タイマーを止める
      $(document).on('click','#mdCancel',  function() {
        clearTimeout(stopWatch);
      });
    };
    countUp();
  });
  
  // ------------- キャンセルして設定変更したものをすべて初期値に戻す -----------//
  $(document).on('click','#mdCancel',  function() {
    console.log(true);
    $('#mdOverlay').stop().animate({opacity: '0'}, fadeTime, function() {
      // オーバーレイを見えなくする
      $(this).css({display: 'none'});
      // モーダルで表す内容も見えなくする
      $('.mdContent').css({display: 'none'});
      // 円ボタンは消す
      $('.fadePanel > div > .circle').remove();
      // リストで表示する画像のdisplayも見えなくする
      $('.fadePanel > ul > li').css({display: 'none'});
    });
  });
  
  // --------------- fadePanelの実装 --------------- //
  
  
});