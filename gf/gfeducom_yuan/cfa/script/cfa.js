// JavaScript Document
$(function(){
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
	
	
	//考试推荐

	// $(".recommend").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:5,trigger:"click"});
	
	//考试推荐
	$(window).load(function(){
		
		$.mCustomScrollbar.defaults.theme="light-2";
		
		$("#kwod").mCustomScrollbar({
			axis:"x",
			setLeft: "0",
			advanced:{autoExpandHorizontalScroll:true}
		});

	});
	
	//弹出页面
	
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

	//导航栏li长度获取
	var li_width = $(".navbar ul li").width();
	$(".navbar ul li ul li").css('width',li_width+'px'); 
	$(window).resize(function() {
		li_width = $(".navbar ul li").width();
		$(".navbar ul li ul li").css('width',li_width+'px'); 
	})

	/*课程内容弹窗*/
	$('#closec').on('click',function(){
		$('.coursebox').hide()
	})
	$('.coursecenter ul li').on('click',function(){
		$('.coursebox').show();
	})
	//授课地区选择
	$("#city").change(function(){
		var num = $(this).find("option:selected").val();
		$(".adress").css("display","none");
		$(".adress").eq(num).css("display","block");
	})
	
	
		//这里是轮翻图的JS
	TouchSlide({ 
		delayTime:1500,
		interTime:5000,
		slideCell:"#slideBoxIndex",
		titCell:".hdIndex ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bdIndex ul", 
		effect:"leftLoop", 
		autoPage:true,//自动分页
		autoPlay:true //自动播放
	});	
	

});

(function($){
	window_width = $(window).width();
	//考试推荐 index+page
	$(window).load(function(){
	//	$.mCustomScrollbar.defaults.theme="light-2";
		if (window_width < 768 ) {
			$("#kwod").mCustomScrollbar({
				axis:"x",
				setLeft: "0px",
				advanced:{autoExpandHorizontalScroll:true}
			});	
		}else{
				advanced:{autoExpandHorizontalScroll:false}
		}
		$(window).resize(function() {
			
			if (window_width < 768 ) {
				$("#kwod").mCustomScrollbar({
					axis:"x",
					setLeft: "0px",
					advanced:{autoExpandHorizontalScroll:true}
				});	
			} else{
				advanced:{autoExpandHorizontalScroll:false}
			}
		})	
		
	});
})(jQuery);


var currentDate = new Date();
var strEndTime = "2015-12-05";
var EndTime = new Date(strEndTime);
var strArr = new Array(); //定义一数组 
strArr = strEndTime.split("-");
var strDate = strArr[0] + "年" + strArr[1] + "月" + strArr[2] + "日";
var days = EndTime - currentDate;
EndTimeMsg = parseInt(days / 1000);

function show() {
    d = Math.floor(EndTimeMsg / 60 / 60 / 24);
    h = Math.floor(EndTimeMsg / 60 / 60 - (24 * d));
    m = Math.floor(EndTimeMsg / 60 - (24 * 60 * d) - (60 * h));
    s = Math.floor(EndTimeMsg - (24 * 60 * 60 * d) - (60 * 60 * h) - (60 * m));
    $(".fromDay").text(d);
    $(".fromDate").text(strDate);
    EndTimeMsg--;
    if (EndTimeMsg < 0) {
        $(".fromDay").text(0);
    }
}
setInterval("show()", 1000)

