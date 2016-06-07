
//乐于侧边栏
$(function(){

	//点击向上滚动
	$('#topNav').on('click',function(){
		var scroll_offset = $("body").offset(); 
		$("body,html").animate({ 
			scrollTop:scroll_offset.top
		},1000); 
		
	})
	

	var _winW = $(window).width();
	if(_winW>=640 && _winW<768){
		
		$('#hotline').toggle(function(){
			$(this).children('p').stop().animate({
				bottom:'0'	
			},600);
		},function(){
			$(this).children('p').stop().animate({
				bottom:'-180px'	
			},600);
		})
	}else if(_winW>=768){
			
			$('.fnav').css('width','60px');
			$('.floatNav ul li:nth-child(2)').css({'background':'#3699cc'});
			$('.floatNav ul li:last-child').css({'marginBottom':'0'});
			$('.floatNav ul li:last-child i').css({'lineHeight':'12px','fontSize':'28px'});
		
			$(window).scroll(function(){
			var _scrollTop=$(window).scrollTop();
			if(_scrollTop>0){
				$("#floatNav").fadeIn();
			}else{
				$("#floatNav").fadeOut();
			}
		});
		
			//侧边栏hotline
			$('#hotline').hover(function(){
				$('.fnav').css('width','300px');
				$(this).children('p').stop().animate({
					opacity:'1',
					right:'0'
				},600);
			},function(){
				$('.fnav').stop().animate({
					width:'60px'
				},600);
				$(this).children('p').stop().animate({
					opacity:'0',
					right:'-300px'
				},600);
			})
	}
	
	$(window).resize(function() {
	var _winW = $(window).width();
	if(_winW>640 && _winW<768){
		$('#hotline').toggle(function(){
			$(this).children('p').stop().animate({
				bottom:'0'	
			},600);
		},function(){
			$(this).children('p').stop().animate({
				bottom:'-180px'	
			},600);
		})
	}else if(_winW>=768){
			$('.fnav').css('width','60px');
			$('.floatNav ul li:nth-child(2)').css({'background':'#3699cc'});
			$('.floatNav ul li:last-child').css({'marginBottom':'0'});
			$('.floatNav ul li:last-child i').css({'lineHeight':'12px','fontSize':'28px'});
		
			$(window).scroll(function(){
			var _scrollTop=$(window).scrollTop();
			if(_scrollTop>0){
				$("#floatNav").fadeIn();
			}else{
				$("#floatNav").fadeOut();
			}
		});
		
			//侧边栏hotline
			$('#hotline').hover(function(){
				$('.fnav').css('width','300px');
				$(this).children('p').stop().animate({
					opacity:'1',
					right:'0'
					
				},600);
				
			},function(){
				$('.fnav').stop().animate({
					width:'60px'
				},600);
				$(this).children('p').stop().animate({
					opacity:'0',
					right:'-300px'
					
				},600);
			})
	}		
	})
})



