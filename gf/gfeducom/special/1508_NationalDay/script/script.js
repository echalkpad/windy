$(function(){

    var times = 360000;

    countdown('times',times);

    //倒计时
    function countdown(o, r ) {

        var m = Math.floor(r % 86400 % 3600 / 60);
        var h = Math.floor(r % 86400 / 3600);
        var d = Math.floor(r / 86400);
        var s = r % 60;

        $("." + o + " .seconds-wrap i").each(function(){
            console.log(s);
            $(this).text(s);
        });

    }

});