$(function(){
	/* 切换  */
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
	
	
	window_width = $(window).width();
	if(window_width>768){
		$(window).scroll(function(){
			var p=$(window).scrollTop();
			if(p>0){
				$("#cdsidenav").fadeIn();
			}else{
				$("#cdsidenav").fadeOut();
			}
		});		
	}
	
	//备考规划 == mb
	$('.mbplan dl:nth-child(3)').css({'background':'#e87877'});
	$('.mbplan dl:nth-child(3) dt').css({'padding-top':'22px'});
	$('.mbplan dl:nth-child(3) dd i').css({'border-color':'transparent transparent transparent #e87877'});
	$('.mbplan dl:last-child').css({'background':'#90546e'})
	$('.mbplan dl:last-child dt').css({'padding-top':'22px'});
	$('.mbplan dl:last-child dd i').css({'border-color':'transparent transparent transparent #90546e'})

	//考试时间与地点
	$('#timeplace li:first-child').css({'right':'19.2%','top':'15%'});
	$('#timeplace li:nth-child(2)').css({'right':'10%','top':'15%'});
	$('#timeplace li:nth-child(3)').css({'right':'16%','top':'24%'});
	$('#timeplace li:nth-child(4)').css({'right':'6%','top':'27%'});
	$('#timeplace li:nth-child(5)').css({'right':'3%','top':'36%'});
	$('#timeplace li:nth-child(6)').css({'right':'9%','top':'43%'});
	$('#timeplace li:nth-child(7)').css({'right':'18%','top':'50%'});
	$('#timeplace li:nth-child(8)').css({'right':'6%','top':'50%'});
	$('#timeplace li:nth-child(9)').css({'right':'-1%','top':'48%'});
	$('#timeplace li:nth-child(10)').css({'right':'26%','top':'55%'});
	$('#timeplace li:nth-child(11)').css({'right':'10%','top':'57%'});
	$('#timeplace li:nth-child(12)').css({'right':'35%','top':'34%'});
	$('#timeplace li:nth-child(13)').css({'right':'50%','top':'38%'});
})

	

