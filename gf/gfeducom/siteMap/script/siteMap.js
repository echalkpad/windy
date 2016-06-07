/**
 * javascript
 * @authors songlingxi
 * @date    2016-02-25 10:12:10
 */
//secTabs切换
$(function(){
	$(".J_secTabs").each(function(){
		var timeout = 300;
		var delay = 0;
		var a = $(this).find("li"), b = $(this).next().children(), c = $(this).find("em");
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


	 //这里是移动端轮翻图的JS

    var tag3=$('.banner-h li').clone(true);
	$('.banner-h ul').append(tag3);
	var w3=$('.banner-h li').outerWidth(true);
	var len3=$('.banner-h li').length;
	$('.banner-h ul').width(len3*w3);
	var num2=0;
	timer3=null;
	function nextPlay(){
		num2++;
		if (num2>len3-1){
			num2=0;
			$('.banner-h ul').css({left:0});
		}
		$('.banner-h ul').stop().animate({left:-num2*w3}, 1500);
		
	}
	function prevPlay(){
		num2--;
		if (num2<0){
			num2=len3-2;
			$('.banner-h ul').css({left:-(len3-1)*w3});
		}
		$('.banner-h ul').stop().animate({left:-num2*w3}, 1500);
	}
	$('.contronal #next').click(function(event) {
        		nextPlay();

     });
	$('.contronal #prev').click(function(event) {
				prevPlay();
	});

	});