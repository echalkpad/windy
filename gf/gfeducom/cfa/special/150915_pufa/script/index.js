$(function(){
	//考试推荐

	// $(".recommend").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:5,trigger:"click"});
	
	//考试推荐
	$(window).load(function(){
		$.mCustomScrollbar.defaults.theme="light-2";
		
		$("#kwod").mCustomScrollbar({
			axis:"x",
			setLeft: "0",
			advanced:{autoExpandHorizontalScroll:true}
		});

	});


})


var currentDate = new Date();
var strEndTime = "2015-12-05";
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