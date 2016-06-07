/**
 * javascript
 * @authors songlingxi
 * @date    2015-12-11 11:08:37
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