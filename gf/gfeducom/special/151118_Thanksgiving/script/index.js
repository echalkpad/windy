$(function(){
	function autoPlay(){
		var winW = $(window).width();
		$('.thanks_banner').css('height',85/192*winW);
		$('.thanks_banner img').css('height',15/96*winW);
	}
	autoPlay();
	$(window).resize(function(event) {
		autoPlay();
	});
	$('.thanks_project li').mouseover(function(){
		$(this).addClass('selected').siblings('.thanks_project li').removeClass('selected');
		var index=$(this).index();
		$('.thanks_pro_con>ul').eq(index).addClass('current').siblings('.thanks_pro_con ul').removeClass('current');
        if($('.thanks_cfa_cont').is(":hidden")){
            $('#cfa-countdown').stop().hide();
        }else{
            $('#cfa-countdown').stop().show();
        }
        if($('.thanks_graduate_cont').is(":hidden")){
            $('#ky-countdown').stop().hide();
        }else{
            $('#ky-countdown').stop().show();
        }
	})



	/*倒计时*/
    var currentDate = new Date();
    var strEndTime = "2015-12-5 8:30:00";
    var strEndTimeKY = "2015-12-26 8:30:00";
    var EndTime=new Date(strEndTime);
    var EndTimeKY=new Date(strEndTimeKY);


    var times = Math.floor((EndTime.getTime() - currentDate.getTime()) / 1000);
    var timesKY = Math.floor((EndTimeKY.getTime() - currentDate.getTime()) / 1000);
    var timer = null;


     countdown('CFA',times);
     countdown('KY',timesKY);

   timer = setInterval(function(){

        countdown('CFA',times);
        countdown('KY',timesKY);

    },1000)

    function countdown(o, r) {

        if(o=='CFA')
        {
            times--;
        }
        else
        {
            timesKY--;
        }

        var m = Math.floor(r % 86400 % 3600 / 60);
        var h = Math.floor(r % 86400 / 3600);
        var d = Math.floor(r / 86400);
        var s = r % 60;


        $("." + o + " .day-wrap i").each(function (i) {
            var nd = null;
            if(d.toString().length == 1){
                nd = '00'+d;
            }
            else if (d.toString().length == 2) {
                nd = '0' + d;
            }
            else {
                nd = d.toString();
            }
            $(this).text(nd.charAt($(this).index()));
            
        });
        $("." + o + " .hour-wrap i").each(function (i) {
            var nh = null;
            if(h.toString().length == 1){
                nh = '0'+ h;
            }else{
                nh = h.toString();
            }
            $(this).text(nh.charAt($(this).index()));
        });
        $("." + o + " .minutes-wrap i").each(function (i) {
            var nm = null;
            if(m.toString().length == 1){
                nm = '0'+m;
            }else{
                nm = m.toString();
            }
            $(this).text(nm.charAt($(this).index()));
        });
        $("." + o + " .seconds-wrap i").each(function (i) {
            var ns = null;
            if(s.toString().length == 1){
                ns = '0'+s;
            }else{
                ns = s.toString();
            }
            $(this).text(ns.charAt($(this).index()));
        });

    }

})
