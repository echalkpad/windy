$(function(){

	 //首屏满屏
	$(".jcbfirst").height() == document.body.clientHeight; //网页 可见区域的高度
	
	//首屏金程杯居中
	jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
        this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
        return this;
    }
	$(".jcbfirst section").eq(0).center();
	
	//进度条效果
	$('.jdt em').click(function(){
		$(this).parent('li').addClass('current').siblings().removeClass('current');
		var i=$(this).parent('li').index();
		$('.jdt li:lt('+i+')').children('em').css({'background':'#c00f34'});
		$('.jdt li:gt('+i+')').children('em').css({'background':'#af9fa1'});
		$('.jdt li:eq('+i+')').children('em').css({'background':'#49b6bd'});
		$('.jdt div p').animate({width:212*i+'px'},500);
	})
	/*function auto(){
		var mydate=new Date();
		var month=mydate.getMonth()+1;
		var day=mydate.getDate();
		var time=month+'月'+day+'日'*/
		/*switch(time){
        			case '9月30日':
        			$(this).parent('li').addClass('current').siblings().removeClass('current');
        			break;
        			case '9月27日':
        			$(this).parent('li').addClass('current').siblings().removeClass('current');
        			break;
        			case '9月28日':
        			$(this).parent('li').addClass('current').siblings().removeClass('current');
        			break;
        			//如果前边的情况都不满足，需要一个默认行为
        			default:
        			alert('不ok');
        }*/
        //alert(content);
        	/*	if(time=='9月28日'){

        		}else if( content == '9月27日'){
        			alert('');
        		}else if( content == '9月30日' ){
        			alert('');
        		}else{
        			alert('');
        		}
	}
	auto();*/
	$('.jcbfour ul li').mouseover(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
	})

	//鼠标移上出现边框效果
		$('.jcbfive ul li').mouseover(function(){
			$(this).addClass('selected').siblings().removeClass('selected');
		})



// 左侧悬浮广告之我要报名
	var h2=$(window).height();
	$(window).scroll(function(){
		var h1=$(document).scrollTop();
		$('.jcbsidebar').stop().animate({top:h1+h2/2},500);
	})


	// 进度条效果2
	$('.jcbsix ul li').mouseover(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var index=$(this).index();
		$('.jcbsix ol li').eq(index).addClass('current').siblings().removeClass('current');
	})
	//走进高校轮播图
	var totalWidth=$('.jcbsix ul li').width()*$('.jcbsix ul li').length; //（宽度+margin-right）*4
	// alert($('.jcbsix ul li').width());
        	var timer=null;
        	var num=0;
        	//将指令单独放到一个自定义函数中
        	function autoPlay(){
        		//num--;
        		num=num-2;
        		if(num < -totalWidth/2){  //4个盒子 加  4个margin-right    	
        			num=0;
        		}
        		$('.jcbsix ul,.jcbsix ol').css({left:num});
        	}
        	timer = setInterval(autoPlay,30);
})