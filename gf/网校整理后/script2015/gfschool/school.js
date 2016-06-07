
//移动菜单栏
$('#menu_ctrl').click(function(){
	$('#mbhead, #main').toggleClass('active');
})

//content_top-----height
var content_topH;

var fm=document.getElementById("floatNav");  
$(document).ready(function(){
	
	$(".body_main").css({
		'position':'fixed',
		'z-index':'9999'	
	});

	var mainH = $('#main').height();
	$('#mbhead').css('height',mainH);

	window_width = $(window).width();
	window_height = $(window).height() + 'px';
	if (window_width < 758 ) {
		$('.content_top').css('height',300+'px');
	} else{
		$('.content_top').css('height',window_height);
	}
	content_topH = $('.content_top').height();
	
	$(window).resize(function() {
		window_width = $(window).width();
		window_height = $(window).height() + 'px';
		if (window_width < 758 ) {
			$('.content_top').css('height',300+'px');
		} else{
			$('.content_top').css('height',window_height);
		}
	})

	$('#scrollNext').on('click',function(){
		var scroll_offset = $("#second").offset(); //得到second这个div层的offset，包含两个值，top和left 
		$("body,html").animate({ 
			scrollTop:scroll_offset.top //让body的scrollTop等于pos的top动 
		},1000); 
	})
	
	//提交侧边栏跟随页面滚动
	function Tijiao(obj){
		this.obj = document.getElementById(obj);
		this.cTop = null;
		this.iTop = null;
	}
	Tijiao.prototype.init = function(){
		var _this = this;
		this.cTop = content_topH + 120;
		this.obj.style.top = this.cTop + 'px';
		$(window).bind("scroll",function(){
			_this.scroll();
		})
	}
	Tijiao.prototype.scroll = function(){
		var _this = this;
		if($(document).scrollTop() > this.cTop){
			_this.iTop = $(document).scrollTop() + 100;
			$(_this.obj).stop();
			$(_this.obj).animate({"top":_this.iTop},"fast");
		}else{
			this.obj.style.top = this.cTop + 'px';
		}
	}
	var TJ = new Tijiao('floatNav');
//	TJ.init();
	$('#mbhead').scroll(function(){
		var mbhead = $(window).scrollTop();
		if(mbhead > 500){
			$('#mbhead').scrollTop(0);
		}
	});
	
	
	//登录后点击显示
	$('.login_pic').on('click',function(){
		$('.click_after').toggle();
	})

	//logined email know
	$('#emailul li').on('click',function(){
		$('#emailul li').each(function() {
			$(this).removeClass('active_Login')
		});
		$(this).addClass('active_Login');
		
	})

	$('#stuKnow1').click(function() {
		$('#coursegxin').hide();
		$('#xtKonw').hide();
		$('#stuKnow').show();
	});
	$('#coursegxin1').click(function() {
		$('#coursegxin').show();
		$('#xtKonw').hide();
		$('#stuKnow').hide();
	});
	$('#xtKonw1').click(function() {
		$('#xtKonw').show();
		$('#coursegxin').hide();
		$('#stuKnow').hide();
	});
})

var xtKonw = $("#xtKonw")[0];
var active_else_in = $(".active_else_in")[0];

Scroll(xtKonw,active_else_in);

function Scroll(w,i){
	w.onmousewheel = callback;
	if(w.addEventListener){
		w.addEventListener('DOMMouseScroll',callback,false);
	}
	function callback(ev){
		var ev = ev || event;
		var iBtn = true;
		if(ev.wheelDelta){
			iBtn = ev.wheelDelta > 0 ? true : false; 
		}else{
			iBtn = ev.detail < 0 ? true : false;
		}
		if(iBtn){
			if(i.offsetTop >= 0){
				i.style.top = 0;
			}else{
				i.style.top = i.offsetTop + 10 + 'px';
			}
		}else{
			if(i.offsetTop <= w.offsetHeight - i.offsetHeight){
				i.style.top = w.offsetHeight - i.offsetHeight;
			}else{
				i.style.top = i.offsetTop - 10 + 'px';
			}		
		}
		if(ev.preventDefault){
			ev.preventDefault();
		}
		return false;
	}
}

function show(v){
	$('.active_else').each(function() {
		$(this).addClass('hide');
	});
	$('#'+v).removeClass('hide');
}

//Login && Register
$('#loginM').on('click',function(){
	$('.body_login').show();
})
function closelogin(){
	$('.body_login').hide();
}
$('#registerM').on('click',function(){
	$('#regDialog').show();
})
function closereg(){
	$('#regDialog').hide();
}

$('#nowReg').on('click',function(){
	$('.body_login').hide();	
	$('#regDialog').show();	
})
$('#nowLogin').on('click',function(){
	$('#regDialog').hide();	
	$('.body_login').show();
})




