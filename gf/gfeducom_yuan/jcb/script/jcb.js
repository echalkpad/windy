// JavaScript Document
$(function(){
	

    //首屏满屏
	var jcbf = $(".jcb-whome").height();
	jcbf== document.body.clientHeight; //网页 可见区域的高度
	$(".jcb-second").css("padding-top",jcbf+"px");
	
	// 手机端首屏居中
var jcbmb = $(".jcb-mbfirst").height();
	jcbmb== document.body.clientHeight; //网页 可见区域的高度
	$(".jmb-p2intro").css("padding-top",jcbmb+"px");



	//首屏金程杯居中
	jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", ($(window).height() - this.height()) / 2 -35 + "px");
        this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
        return this;
    }
    $('.jcb-mbsite section').center();
    $('.jcb-home section').center();

    $(window).resize(function(event) {
    	$('.jcb-mbsite section').center();
    	$('.jcb-home section').center();
    });


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
	
	// 左侧悬浮广告之我要报名
	var h2=$(window).height();
	$(window).scroll(function(){
		var h1=$(document).scrollTop();
		$('.jcbsidebar').stop().animate({top:h1+h2/2},500);
	})
	
	
	// 进度条效果2
	$('.jcbh-school ul li').mouseover(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var index=$(this).index();
		$('.jcbh-school ol li').eq(index).addClass('current').siblings().removeClass('current');
	})
	//走进高校轮播图
	var w1=$('.jcbh-school ul li').width();
	var totalWidth=w1*$('.jcbh-school ul li').length; //（宽度+margin-right）*4
	var w=$('.jcbh-school ol li').outerWidth(true)*('.jcbh-school ul li').length;;
	$('.jcbh-school ol').width(totalWidth);
        	var timer=null;
        	var num=0;
        	//将指令单独放到一个自定义函数中
        	function autoPlay(){
        		//num--;
        		num=num-2;
        		if(num < -(totalWidth/2+w1)){  //4个盒子 加  4个margin-right    	
        			num=0;
        		}
        		$('.jcbh-school ul,.jcbh-school ol').css({left:num});
        	}
        	timer = setInterval(autoPlay,30);
	$('.jcbh-school ul').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(autoPlay,30);
	})
	/*点击参加的弹出窗口*/
	var h3=$(document).height();
	$('.screen').height(h3);
	$('.pgs_preliminary .jcbpbox button').click(function(){
		jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop()-220 + "px");
        this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
        return this;
    }
	$('.screen form').center();
		$('.screen').css('display','block');
	})
	$('.screen form i').click(function(){
		$('.screen').css('display','none');
	})
})