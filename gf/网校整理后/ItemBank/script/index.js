/**
 * javascript
 * @authors li tingting
 * @date    2015-11-09 13:49:29
 */
$(function(){

	$('.ibindex_title article h2').stop().animate({'bottom':50+'%','opacity':1},1000);
	$('.ibindex_project .popup').css('height',$(document).height()+$(window).height());
	$('.ibindex_project .popup>div').css('height',$(window).height());



	var w=$(window).outerWidth(true);
		$('.ibindex_project li').click(function(){
			$('.popup').stop().show(500);
			$ (window).scrollTop (0);
		})
		$('.popup i').click(function(event) {
			$('.popup').stop().hide(500);
		});
	if(w<640){
		$('.ibindex_project>ul').css({
			'height':475,
			'overflow':'hidden',
		})
		$(window).scroll(function(){
			console.log($(this).scrollTop());
			if($(this).scrollTop()>740){
				$('.ibindex_project>ul').stop().animate({
					'height':'960',
					'overflow':'hidden',
				},500)
				$('.drop-down').stop().hide();
			}
		})
	}else if(w<769){
		$('.ibindex_project>ul').css({
			'height':630,
			'overflow':'hidden',
		})
		$(window).scroll(function(){
			console.log($(this).scrollTop());
			if($(this).scrollTop()>900){
				$('.ibindex_project>ul').stop().animate({
					'height':'1280',
					'overflow':'hidden',
				},500)
				$('.drop-down').stop().hide();
			}
		})
	}else if(w<992){
		$('.ibindex_project>ul').css({
			'height':680,
			'overflow':'hidden',
		})
		$(window).scroll(function(){
			console.log($(this).scrollTop());
			if($(this).scrollTop()>750){
				$('.ibindex_project>ul').stop().animate({
					'height':'1350',
					'overflow':'hidden',
				},500)
				$('.drop-down').stop().hide();
			}
		})
	}else if(w<1200){
		$('.ibindex_project>ul').css({
			'height':790,
			'overflow':'hidden',
		})
		$(window).scroll(function(){
			console.log($(this).scrollTop());
			if($(this).scrollTop()>850){
				$('.ibindex_project>ul').stop().animate({
					'height':'1350',
					'overflow':'hidden',
				},500)
				$('.drop-down').stop().hide();
			}
		})
	}else if(w<1400){
		$('.ibindex_project>ul').css({
			'height':780,
			'overflow':'hidden',
		})
		$(window).scroll(function(){
			console.log($(this).scrollTop());
			if($(this).scrollTop()>900){
				$('.ibindex_project>ul').stop().animate({
					'height':'1070',
					'overflow':'hidden',
				},500)
				$('.drop-down').stop().hide();
			}
		})
	}else{
		$('.ibindex_project>ul').css({
			'height':800,
			'overflow':'hidden',
		})
		$(window).scroll(function(){
			console.log($(this).scrollTop());
			if($(this).scrollTop()>1200){
				$('.ibindex_project>ul').stop().animate({
					'height':'1070',
					'overflow':'hidden',
				},500)
				$('.drop-down').stop().hide();
			}
		})
	}

	if (w<769){
		setTimeout(function(){
			$('.ibindex_title article').stop().hide(400);
			$('.ibindex_title div').stop().animate({'left':50+'%','opacity':1},1000);
		},2500)
	}else if(w<950){
		$('.ibindex_title div').stop().animate({'left':5+'%','opacity':1},1000);
	}else{
		$('.ibindex_title div').stop().animate({'left':8+'%','opacity':1},1000);
	}
	var w1=$(window).innerWidth();
	if(w1<768){
		$('.ibindex_title').css({
			'height':$(window).height()-100,
		});
	}else if(w1<769){
		$('.ibindex_title').css({
			'height':$(window).height()-50,
		});
	}else if(w1<992){
		$('.ibindex_title').css('height',$(window).width()*4/7);
	}else{
		$('.ibindex_title,.ibindex_title>section').css({
			'height':$(window).width()*1/2,
			'max-height':$(window).height()-50,
		});
	}
	$(window).resize(function(){
		var w=$(window).width();
		var w1=$(window).innerWidth();
		$('.ibindex_project li').click(function(){
			if(w<=992){
			$('.popup').stop().show(500);
			}else{
				$('.ibindex_project article h3').click(function(){
					$('.popup').stop().show(500);
					var obj=$('.ibindex_project div ul');
				    var offset=obj.offset();
				    // alert(offset.top);
				})
			}
		})
		if(w1<769){
			$('.ibindex_title').css({
				'height':$(window).height()-100,
			});
		}else if(w1<769){
			$('.ibindex_title').css({
				'height':$(window).height()-50,
			});
		}else if(w1<992){
			$('.ibindex_title').css('height',$(window).width()*4/7);
		}else{
			$('.ibindex_title,.ibindex_title>section').css({
				'height':$(window).width()*1/2,
				'max-height':$(window).height()-50,
			});
		}
	})

	/*$('.ibindex_project li').hover(function(){
		$(this).children('section').stop().fadeOut(500);
		$('.ibindex_project li').children('article').stop().fadeIn(500);
	},function(){
		$(this).children('article').stop().fadeOut(500);
		$('.ibindex_project li').children('section').stop().fadeIn(500);
	})*/


})