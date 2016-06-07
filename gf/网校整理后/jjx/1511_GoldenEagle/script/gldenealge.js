$(function(){
//小图轮播
	$('.years li').mouseover(function(){
        $(this).addClass('current').siblings('.years li').removeClass('current');
        var index=$(this).index();
        $('.play li').eq(index).slideDown().siblings('.play li').stop().slideUp();
    });

    $('.play_box li').click(function(){
        $(this).addClass('selected').siblings('.play_box li').removeClass('selected');
        var index=$(this).index();
        $('.Share li').eq(index).show().siblings('.Share li').hide();
    });
});




$(function(){
// var tag2=$('.play_box li').clone(true);
	// $('.play_box ul').append(tag2);
	var w2=$('.play_box li').outerWidth(true);
	var len2=$('.play_box li').length;
	$('.play_box ul').width(len2*w2);
	var num1=0;
	timer2=null;
	function nextPlay(){
		num1++;
		if (num1>len2-4){
			num1=0;
			$('.play_box ul').css({left:0});
		}
		$('.play_box ul').stop().animate({left:-num1*w2}, 1500);

	}
	function prevPlay(){
		num1--;
		if (num1<0){
			num1=len2-4;
			$('.play_box ul').css({left:-(len2-4)*w2});
		}
		$('.play_box ul').stop().animate({left:-num1*w2}, 1500);
	}
	$('.play_box #right').click(function(event) {
        		nextPlay();

     });
	$('.play_box #left').click(function(event) {
				prevPlay();
				console.log(num1)
	});
	timer2=setInterval(nextPlay, 4000);
	$('.play_box').hover(function() {
		clearInterval(timer2);
	}, function() {
		timer2=setInterval(nextPlay, 4000);
	});

});


$(function(){
var tag3=$('.Stu-share li').clone(true);
	$('.Stu-share ul').append(tag3);
	var w3=$('.Stu-share li').outerWidth(true);
	var len3=$('.Stu-share li').length;
	$('.Stu-share ul').width(len3*w3);
	var num2=0;
	timer3=null;
	function nextPlay(){
		num2++;
		if (num2>len3-4){
			num2=1;
			$('.Stu-share ul').css({left:0});
		}
		$('.Stu-share ul').stop().animate({left:-num2*w3}, 1500);
		
	}
	function prevPlay(){
		num2--;
		if (num2<0){
			num2=len3-4;
			$('.Stu-share ul').css({left:-(len3-4)*w3});
		}
		$('.Stu-share ul').stop().animate({left:-num2*w3}, 1500);
	}
	$('.Stu-share #next').click(function(event) {
        		nextPlay();

     });
	$('.Stu-share #prev').click(function(event) {
				prevPlay();
	});




});


$(document).ready(function () {
	/*旋转木马*/
    $(".waterwheelCarousel").waterwheelCarousel("horizontal",{
        // include options like this:
        // (use quotes only for string values, and no trailing comma after last option)
        // option: value,
        // option: value
        startingItem: 6
    });
});

	
