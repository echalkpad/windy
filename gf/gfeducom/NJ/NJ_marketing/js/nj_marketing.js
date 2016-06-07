/*点击消失*/
function show(sand){
		$('#'+sand).stop().toggle();
}

//倒计时
var currentDate = new Date().getTime();
var strEndTime = "2015/12/19";
var EndTime=new Date(strEndTime).getTime();

var days= EndTime - currentDate;
EndTimeMsg = parseInt(days / 1000);

function show() {
d = parseInt(EndTimeMsg / 60 / 60 / 24);  
h = parseInt(EndTimeMsg /60/60 - (24*d));
m = parseInt(EndTimeMsg/60 - (24*60*d) - (60*h));
s = parseInt(EndTimeMsg - (24*60*60*d) - (60*60*h) - (60*m));   
EndTimeMsg--;

if(/^\d{3}$/.test(parseInt(EndTimeMsg/60/60/24))){
	$('#dh').attr('src',"images/"+parseInt(d/100%10)+".png");
	$('#ds').attr('src',"images/"+parseInt(d%100/10)+".png");
	$('#df').attr('src',"images/"+parseInt(d%100%10)+".png");
}else{
	$('#dh').attr('src',"images/"+parseInt(0)+".png");
	$('#ds').attr('src',"images/"+parseInt(d/10)+".png");
	$('#df').attr('src',"images/"+parseInt(d%10)+".png");
}

$('#hs').attr('src',"images/"+parseInt(h/10)+".png");
$('#hf').attr('src',"images/"+parseInt(h%10)+".png");
$('#ms').attr('src',"images/"+parseInt(m/10)+".png");
$('#mf').attr('src',"images/"+parseInt(m%10)+".png");
$('#ss').attr('src',"images/"+parseInt(s/10)+".png");
$('#sf').attr('src',"images/"+parseInt(s%10)+".png");
if (EndTimeMsg < 0){
    $('#dh').attr('src',"images/"+0+".png");
    $('#ds').attr('src',"images/"+0+".png");
    $('#df').attr('src',"images/"+0+".png");
    $('#hs').attr('src',"images/"+0+".png");
    $('#hf').attr('src',"images/"+0+".png");
    $('#ms').attr('src',"images/"+0+".png");
    $('#mf').attr('src',"images/"+0+".png");
    $('#ss').attr('src',"images/"+0+".png");
    $('#sf').attr('src',"images/"+0+".png");
}
}
setInterval("show()", 1000);


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

/*滚动轮播*/
$(function() {
	var tag = $('.mk_scroll li:first').clone();
	$('.mk_scroll ul').append(tag);
	var w = $('.mk_scroll ul li').outerWidth(true);
	var len = $('.mk_scroll ul li').length;
	$('.mk_scroll ul').width(w*len);

	var num=0;
	var timer=null;
	function autoPlay(){
		num++;
		if(num > len-1){
			num=1;
			$('.mk_scroll ul').css({left:0});
		}
		$('.mk_scroll ul').stop().animate({left:-num*w}, 500);
	}
	function prevPlay(){
		num--;
		if(num < 0){
			$('.mk_scroll ul').css({left:-(len-1)*w});
			num=len-2;
		}
		$('.mk_scroll ul').stop().animate({left:-num*w}, 500);
	}
	timer=setInterval(autoPlay, 3000);
	$('.mk_scroll .next').click(function(event) {
		autoPlay();
	});
	$('.mk_scroll .prev').click(function(event) {
		prevPlay();
	});
	$('.mk_scroll article').hover(function() {
		clearInterval(timer);
	}, function() {
		timer=setInterval(autoPlay, 3000);
	});

/*点击消失2*/
	$('.mk_share h4').click(function(event) {
		if($(this).next('section').is(":hidden")){
			$(this).parent('li').addClass('current');
		}else{
			$(this).parent('li').removeClass('current');
		}
	});

/*点击屏幕滚动*/
	$('.mk_banner span').click(function(){
		
	})

});