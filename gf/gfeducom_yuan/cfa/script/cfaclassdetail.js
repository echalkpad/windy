// JavaScript Document
$(function(){
	
	/*//快捷菜单
	var navTop = $('.cdsidenav').offset().top;
	var sT;
	$(document).scroll(function(){
		sT = $(document).scrollTop();
		if(sT > navTop){
			$('.cdsidenav').css({'position':'fixed','top':'0'});
		}else{
			$('.cdsidenav').css('position','static');
		}
	})*/
	
	//二级目录显示
	$('#navBar li').hover(function() {
		if($(this).children('nav').length > 0){
			$(this).children('nav').show();
			$(".nav_bg").show();
		}
	}, function() {
		if($(this).children('nav').length > 0){
			$(this).children('nav').hide()
			$(".nav_bg").hide();
		}
	});

	
	//报名赠送

	$(".cdgive").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:4,trigger:"click"});
	
	
	//secTabs切换
	$(".J_secTabs").each(function(){
		var timeout = 300;
		var delay = 0;
		var a = $(this).find("li"), b = $(this).next().children(), c = $(this).find("em"); 
		
		//a.hover(function(){ var	obj = $(this); item_show(obj); },function(){ item_hide(); });
		a.click(function(){ var	obj = $(this); item_show(obj); },function(){ item_hide(); });
		a.click(function(){ var obj = $(this); item_action(obj); });
		
		function item_action(obj){
			a.removeClass("selected");
			c.css("cursor","")
			obj.addClass("selected");
			obj.children("em").css("cursor","default");
			var i = a.index(obj); 
			b.hide();  
			$(b.get(i)).show();  
		}
		function item_show(obj){
			clearTimeout(delay);
			delay = setTimeout(function(){
				item_action(obj);
				clearTimeout(delay);
			},timeout);
		}
		function item_hide(){
			clearTimeout(delay);
		}
	}); 
	
	

	


	
	
	//左侧考试推荐
	$(".prorecommend").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:4,trigger:"click"});
	
	
	
	//右侧资料索取
	$("#sidebtn").on("click",function(){
		$(".sidetest input").each(function(index) {
            if($(this).prop("checked") == false){
         	  $('#testd').show();
			} 
        });
	})

//报班赠送点击箭头按钮
	var iNum = 0;
	$("#mCSB_1_container").css("left","0px");
	$(".next").on("click",function(){
		if(parseInt($("#mCSB_1_container").css("left")) <= $("#kwod").width() - $("#mCSB_1_container").width()){
			$("#mCSB_1_container").css("left",$("#kwod").width() - $("#mCSB_1_container").width());
			return false;
		}else{
			$("#mCSB_1_container").stop(true,true).animate({"left":parseInt($("#mCSB_1_container").css("left"))-260});
		}
	});
	$(".prev").on("click",function(){
		if(parseInt($("#mCSB_1_container").css("left")) >= 0){
			$("#mCSB_1_container").css("left","0px");
			return false;
		}else{
			$("#mCSB_1_container").stop(true,true).animate({"left":parseInt($("#mCSB_1_container").css("left"))+260});
		}
	});


});


	
	