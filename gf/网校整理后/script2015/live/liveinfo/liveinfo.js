$(function() {
	
	$('#menu').mmenu();

	$(".collect").toggle(function(){
		$(this).find(".text").text("已收藏");
		$(this).css("backgroundImage","url(images2015/liveinfo/collect_check.png)");
	},function(){
		$(this).find(".text").text("收藏");
		$(this).css("backgroundImage","url(images2015/liveinfo/collect.png)");
	})
});