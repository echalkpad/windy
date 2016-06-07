// JavaScript Document
$(function(){

	//右侧轮翻
	var timer = null;
	var thisIndex = 0;
	var lilength = $('.listenpic ul li').length-1;
	function changeImg(){
		$('.listenpic ul li').eq(thisIndex).hide().stop().fadeIn().siblings().hide();
	}
	function fnTimer(){
		thisIndex++;
		if(thisIndex > lilength){
			thisIndex = 0;
		}
		changeImg();
	};
	timer = setInterval(fnTimer,3000);//自动轮播
	$('.listenpic').hover(function(){
		$('#sideleft,#sideright').show();
		clearInterval(timer);
	},function(){
		$('#sideleft,#sideright').hide();
		clearInterval(timer);
		timer = setInterval(fnTimer,3000);
	})
	$('#sideright').click(function(e) {
		thisIndex++;
		if(thisIndex > lilength){
			thisIndex = 0;
		}
		changeImg();
	});
	$('#sideleft').click(function(e) {
		thisIndex--;
		if(thisIndex < 0){
			thisIndex = lilength;
		}
		changeImg();
	});
	

});

