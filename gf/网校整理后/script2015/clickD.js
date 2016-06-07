$(function(){
	
	$('.courselist dl dd').on('click',function(){
		$('.courselist dl dd').each(function(){
			$(this).removeClass('selected');	
		})
		$(this).addClass('selected');
	})	
	
	$('.paginator a').on('click',function(){
		$('.paginator a').each(function(){
			$(this).removeClass('pageNum');	
		})
		$(this).addClass('pageNum');
	})	
	
	$('.navtarget a').on('click',function(){
		$('.navtarget a').each(function(){
			$(this).removeClass('selected');	
		})
		$(this).addClass('selected');	
	})

	
	//coursedetail
	$('#cselClick a').each(function(i){
        $(this).on('click',function(){
            $('#cselClick a').each(function(){
                $(this).removeClass('cselClick');
                $(".ciinfotarget").css("display","none");
                
            })
            $(this).addClass('cselClick');
            $(".ciinfotarget").eq(i).css("display","block");
        })  
    })
	$('#ciinfotarget a').on('click',function(){
		$('#ciinfotarget a').each(function(){
			$(this).removeClass('cselClick');	
		})
		$(this).addClass('cselClick');
	})

	$('.mbshowA').on('click',function(){
		$('.coursecontent .ccttlmbnavlist').toggle();
	})
	
	//心
	$('.xinZ').click(function(){
		$(this).toggleClass('xin');	
	})	


		//课程介绍、报班赠送图片滚动
	$.fn.imgscroll = function(o){ 
	    var defaults = { speed: 40, amount: 0, width: 1, dir: "left" }; 
	    o = $.extend(defaults, o); 
	    return this.each(function(){ 
	        var _li = $("li", this); 
	        _li.parent().parent().css({overflow: "hidden", position: "relative"});
	        _li.parent().css({margin: "0", padding: "0", overflow: "hidden", position: "relative", "list-style": "none"}); //ul 
	        _li.css({position: "relative", overflow: "hidden"});
	        if(o.dir == "left") _li.css({float: "left"});
	        var _li_size = 0; 
	        for(var i=0; i<_li.size(); i++) 
	        _li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true); //循环所需要的元素 
	        if(o.dir == "left") _li.parent().css({width: (_li_size*2)+"px"}); 
	        //_li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone()); 
	        _li.parent().empty().append(_li.clone()).append(_li.clone());            
	        _li = $("li", this);           
	        //_li.css({width:_li.width()/2})
	        var _li_scroll = 0; 
	        function goto(){ 
	            _li_scroll += o.width; 
	            if(_li_scroll > _li_size) { 
	                _li_scroll = 0; _li.parent().css(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll }); 
	                _li_scroll += o.width; 
	            } 
	            _li.parent().animate(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll }, o.amount); 
	        }
	        var move = setInterval(function(){ goto(); }, o.speed); 
	        _li.parent().hover(
	            function(){clearInterval(move); },
	            function(){ clearInterval(move); 
	            move = setInterval(function(){ 
	                    goto(); 
	                }, o.speed); 
	        }); 
	    }); 
	}; 

})


//内页登录后显示状态js
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

