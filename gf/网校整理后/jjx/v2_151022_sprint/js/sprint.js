 $(function() {

        /*个人信息轮播*/
        var tag = $('.sp_video ul li:first').clone(); 
        $('.sp_video ul').append(tag);
        var w = $('.sp_video ul li').outerWidth(true);
        var len = $('.sp_video ul li').length; 
        $('.sp_video ul').width(w*len);
        var num=0;
        var timer=null;
        function autoPlay(){
                num++;
                if(num > len-1){
                        num=1;
                        $('.sp_video ul').css({left:0});
                }
                $('.sp_video ul').stop().animate({left:-num*w}, 500);
        }
        //播放下一张
        function prevPlay(){
                num--;
                if(num < 0){
                        $('.sp_video ul').css({left:-(len-1)*w});
                        num=len-2;
                }
                $('.sp_video ul').stop().animate({left:-num*w}, 500);
        }
        timer=setInterval(autoPlay, 3000);
        //点击下一张（向右）
        $('.sp_video .next').click(function(event) {
                autoPlay();
        });
        //点击上一张
        $('.sp_video .prev').click(function(event) {
                prevPlay();
        });
        //鼠标经过离开
        $('.sp_video section').hover(function() {
                clearInterval(timer);
        }, function() {
                timer=setInterval(autoPlay, 3000);
        });

        /*技巧解析*/
        $('.ps_advantage li').mouseover(function() {
                $(this).addClass('current').siblings('.ps_advantage li').removeClass('current')
                var index=$(this).index();
                $('.ps_parsing li').eq(index).addClass('selected').siblings('.ps_parsing li').removeClass('selected');
        });

        /*课程组合*/
        $('.sp_course span').hover(function(){
            $(this).addClass('current');
        },function(){
             $('.sp_course span').removeClass('current');
        })

 });


var currentDate = new Date();
var strEndTime = "2015-12-26";
var EndTime = new Date(strEndTime);
var strArr = new Array(); //定义一数组 
strArr = strEndTime.split("-");
var strDate = strArr[0] + "年" + strArr[1] + "月" + strArr[2] + "日";
var days = EndTime - currentDate;
EndTimeMsg = parseInt(days / 1000);

function show() {
    d = Math.floor(EndTimeMsg / 60 / 60 / 24);
    h = Math.floor(EndTimeMsg / 60 / 60 - (24 * d));
    m = Math.floor(EndTimeMsg / 60 - (24 * 60 * d) - (60 * h));
    s = Math.floor(EndTimeMsg - (24 * 60 * 60 * d) - (60 * 60 * h) - (60 * m));
    $(".fromDay").text(d);
    $(".fromDate").text(strDate);
    EndTimeMsg--;
    if (EndTimeMsg < 0) {
        $(".fromDay").text(0);
    }
}
setInterval("show()", 1000);