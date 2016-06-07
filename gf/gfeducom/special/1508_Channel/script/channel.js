
$(function(){

  $('.cha_case li').each(function(){
  	var case_liw = $('.cha_case li').width();
    $('.cha_case li').height(4.5*case_liw/3);
  })	 	
  $(window).resize(function() {
   $('.cha_case li').each(function(){
  	var case_liw = $('.cha_case li').width();
    $('.cha_case li').height(4.5*case_liw/3);
   })	 	
  })
  
  $('.cha_bar li').on('click',function(){
  	$(this).parent().children('li').removeClass('cha_select');
  	$(this).addClass('cha_select');
  })
  
  //金程介绍
  var introH = $('.cha_intro section dl').height();
  $('.cha_intro section img').height(introH);
  $(window).resize(function() {
  	var introH = $('.cha_intro section dl').height();
    $('.cha_intro section img').height(introH);
  })
  
  
   //导航锚
    $('#coop').on('click',function(){
		var scroll_offset = $("#cha_coop").offset(); 
		$("body,html").animate({ 
			scrollTop:scroll_offset.top,
		},1000); 
	});
    $('#case').on('click',function(){
		var scroll_offset = $("#cha_case").offset(); 
		$("body,html").animate({ 
			scrollTop:scroll_offset.top,
		},1000); 
	});
    $('#intro').on('click',function(){
		var scroll_offset = $("#cha_intro").offset(); 
		$("body,html").animate({ 
			scrollTop:scroll_offset.top,
		},1000); 
	});
    $('#strength').on('click',function(){
		var scroll_offset = $("#cha_strength").offset(); 
		$("body,html").animate({ 
			scrollTop:scroll_offset.top,
		},1000); 
	});
    $('#partner').on('click',function(){
		var scroll_offset = $("#cha_partner").offset(); 
		$("body,html").animate({ 
			scrollTop:scroll_offset.top,
		},1000); 
	});        
  
  //导航
  	$(window).scroll(function(){
		var p=$(window).scrollTop();
		if(p>70){
			$(".cha_bar").stop().animate({top:'0'},400);
		}else{
			$(".cha_bar").stop().animate({top:'70px'},400);
		}
	});
  
  
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



window.onload = function(){
	var div1 = document.getElementById('div1');
	var oul = div1.getElementsByTagName('ul')[0];
	var oli = oul.getElementsByTagName('li');
	var speed = 2; 

	oul.innerHTML += oul.innerHTML; 
	oul.style.width = oli[0].offsetWidth*oli.length+'px';

	//移动
	function move(){
		if(oul.offsetLeft < -oul.offsetWidth/2){
			oul.style.left = '0';  //
		}
		if(oul.offsetLeft>0){
			oul.style.left = -oul.offsetWidth/2+'px';  
		}
		oul.style.left = oul.offsetLeft+speed+'px';
	}


	//鼠标放上去图片停止
    var timer = setInterval(function(){
		move();
	}, 30);

    div1.onmouseover = function(){
    	clearInterval(timer);
    }
    div1.onmouseout = function(){
    	timer = setInterval(function(){ move(); }, 30);
    }
    
    
    //合作伙伴
    var div2 = document.getElementById('div2');
	var oul2 = div2.getElementsByTagName('ul')[0];
	var oli2 = oul2.getElementsByTagName('li');
	var speed2 = -1; 

	oul2.innerHTML += oul2.innerHTML; 
	oul2.style.width = oli2[0].offsetWidth*oli2.length+'px';

	//移动
	function move2(){
		if(oul2.offsetLeft < -oul2.offsetWidth/2){
			oul2.style.left = '0';  //
		}
		if(oul2.offsetLeft>0){
			oul2.style.left = -oul2.offsetWidth/2+'px';  
		}
		oul2.style.left = oul2.offsetLeft+speed2+'px';
	}


	//鼠标放上去图片停止
    var timer2 = setInterval(function(){
		move2();
	}, 30);

    div2.onmouseover = function(){
    	clearInterval(timer2);
    }
    div2.onmouseout = function(){
    	timer2 = setInterval(function(){ move2(); }, 30);
    }
    
    

}


