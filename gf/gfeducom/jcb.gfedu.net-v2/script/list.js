$(function(){
//进度条效果
	$('.jdt em').click(function(){
		$(this).parent('li').addClass('current').siblings().removeClass('current');
		var i=$(this).parent('li').index();
		$('.jdt li:lt('+i+')').children('em').css({'background':'#c00f34'});
		$('.jdt li:gt('+i+')').children('em').css({'background':'#af9fa1'});
		$('.jdt li:eq('+i+')').children('em').css({'background':'#49b6bd'});
		$('.jdt div p').animate({width:212*i+'px'},500);
	})
	alert('ok')
// 左侧悬浮广告之我要报名
	var h2=$(window).height();
	$(window).scroll(function(){
		var h1=$(document).scrollTop();
		$('.sign_up').stop().animate({top:h1+h2/2},500);
	})

})