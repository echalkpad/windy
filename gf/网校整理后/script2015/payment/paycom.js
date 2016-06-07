$(function(){

   /* 首页头部  start */
	$(".gtopttl").children('section').hide();
	$("#school").children('i').hide();
	
	$("#school").hover(function(){
		$(this).children('i').css('display','inline-block');
		$(".gtopttl").children('section').show();
	},function(){
		$(this).children('i').hide();
		$(".gtopttl").children('section').hide();
	})

	$(".gtopttl").children('section').hover(function(){
		$("#school").children('i').css('display','inline-block');
		$(this).show();
	},function(){
		$("#school").children('i').hide();
		$(this).hide();
	});	
	/* 首页头部  end */

})