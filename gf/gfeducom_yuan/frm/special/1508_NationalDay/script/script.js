$(function(){

    var times = 360000;
    var timer = null;

    countdown('times',times);

    timer = setInterval(function(){

        countdown('times',times);
    
    },1000)
        

    //倒计时
    function countdown(o, r ) {

        times--;

        var m = Math.floor(r % 86400 % 3600 / 60);
        var h = Math.floor(r % 86400 / 3600);
        var d = Math.floor(r / 86400);
        var s = r % 60;


        $("." + o + " .day-wrap i").each(function(i){
            if(d.toString().length == 1){
                var nd = '00'+d;
            }
            $(this).text(nd.charAt($(this).index()));
            
        });
        $("." + o + " .hour-wrap i").each(function(i){
            if(h.toString().length == 1){
                var nh = '0'+ h;
            }else{
                var nh = h.toString();
            }
            $(this).text(nh.charAt($(this).index()));
        });
        $("." + o + " .minutes-wrap i").each(function(i){
            if(m.toString().length == 1){
                var nm = '0'+m;
            }else{
                var nm = m.toString();
            }
            $(this).text(nm.charAt($(this).index()));
        });
        $("." + o + " .seconds-wrap i").each(function(i){
            if(s.toString().length == 1){
                var ns = '0'+s;
            }else{
                var ns = s.toString();
            }
            $(this).text(ns.charAt($(this).index()));
        });

    }

});