$(function(){
	
	/* 首页头部  start */
	$(".topheader article").children('section').hide();
	$("#school").children('i').hide();
	
	$("#school").hover(function(){
		$(this).children('i').css('display','inline-block');
		$(".topheader article").children('section').show();
	},function(){
		$(this).children('i').hide();
		$(".topheader article").children('section').hide();
	})

	$(".topheader article").children('section').hover(function(){
		$("#school").children('i').css('display','inline-block');
		$(this).show();
	},function(){
		$("#school").children('i').hide();
		$(this).hide();
	});	
	/* 首页头部  end */

})