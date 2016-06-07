
// JavaScript Document
(function($){
	$.fn.dropdown = function(settings){
		var defaults = {
			dropdownEl: '.dropdown-menu',
			openedClass: 'dropdown-open',
			delayTime: 100
		}
		var opts = $.extend(defaults, settings);
		return this.each(function(){
			var curObj = null;
			var preObj = null;
			var openedTimer = null;
			var closedTimer = null;
			$(this).hover(function(){
				if(openedTimer)
				clearTimeout(openedTimer);
				curObj = $(this);
				openedTimer = setTimeout(function(){
					curObj.addClass(opts.openedClass).find(opts.dropdownEl).show();
				},opts.delayTime);
				preObj = curObj;
			},function(){
				if(openedTimer)
				clearTimeout(openedTimer);
				openedTimer = setTimeout(function(){
					preObj.removeClass(opts.openedClass).find(opts.dropdownEl).hide();
				},opts.delayTime);
			});
			//点击事件关闭菜单
			$(this).bind('click', function(){
				if(openedTimer)
				clearTimeout(openedTimer);
				openedTimer = setTimeout(function(){
					preObj.removeClass(opts.openedClass).find(opts.dropdownEl).hide();
				},opts.delayTime);
			});
		});
	};
})(jQuery);

//下拉菜单
$(document).ready(function(){
	$('#nav .nav-item').dropdown({
		dropdownEl:'.nav-dropdown',
		openedClass:'hover'
	});
});


//考研课程
function setContentTab(name, curr, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var cont = document.getElementById("con_" + name + "_" + i);
        menu.className = i == curr ? "up" : "";
        if (i == curr) {
            cont.style.display = "block";
        } else {
            cont.style.display = "none";
        }
    }
}