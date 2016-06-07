/*
 * Description: 微信页面js
 * Date: 2015-08-12
 * Author: Dolores
 * 
 *************************************/

$(function(){
	
	//微信图片大小控制
	var _height = $('.wxcontent dl dd p span').innerHeight();
	var img = $('.wxcontent dt img');
	var _w = img.width();
	var _h = _w;
	$('.wxcontent dt img').height(_w);
	console.log(_w+"  "+_h);

	$(window).resize(function(){
		var _height = $('.wxcontent dl dd p span').innerHeight();
		var img = $('.wxcontent dt img');	
		var _w = img.width();
		var _h = _w;
		$('.wxcontent dt img').height(_w);
		console.log(_w+"  "+_h);
	})	
	
	//hover动画

	var spanw,spanh;
	$('.wxcontent section dl').hover(function(){
		var em = $(this).children('dd').children('p');
		var _hem = em.height();
		var _mtop = -_hem/2;
		//em.fadeIn(200);	
		$(this).children('dd').children('p').css('margin-top',_mtop);
	},function(){
		em.fadeOut(20);	
	})
	
	
	$('.wxcontent section dl:nth-child(1) dd em').css('backgroundColor','#df6f6c');
	$('.wxcontent section dl:nth-child(2) dd em').css('backgroundColor','#026697');
	$('.wxcontent section dl:nth-child(3) dd em').css('backgroundColor','#9ab7cd');
	$('.wxcontent section dl:nth-child(4) dd em').css('backgroundColor','#416464');
	$('.wxcontent section dl:nth-child(5) dd em').css('backgroundColor','#e74b53');
	$('.wxcontent section dl:nth-child(6) dd em').css('backgroundColor','#724694');
	$('.wxcontent section dl:nth-child(7) dd em').css('backgroundColor','#e59d83');
	$('.wxcontent section dl:nth-child(8) dd em').css('backgroundColor','#ae0d15');
	$('.wxcontent section dl:nth-child(9) dd em').css('backgroundColor','#0d4265');
	$('.wxcontent section dl:nth-child(10) dd em').css('backgroundColor','#b70202');
	$('.wxcontent section dl:nth-child(11) dd em').css('backgroundColor','#cea09c');
	$('.wxcontent section dl:nth-child(12) dd em').css('backgroundColor','#383838');
	
//	$('.wxcontent section dl:nth-child(1) dd p span').height() = spanw/4;
	
})

