function GetOnload() {
    getSeverTime();
    if (getQueryString("status") == "sucess") {
        jQuery.fn.center = function () {
            this.css("position", "absolute");
            this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() - 220 + "px");
            this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
            return this;
        }
        $('.screen form').center();
        $('#login').css('display', 'none');
        $('#suceess').css('display', 'block');
        $('.screen').css('display', 'block');

        $('.screen form i').click(function () {
            $('.screen').css('display', 'none');
        })
    }
}


var xmlHttp = false;
//获取服务器时间
try {
    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
    try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e2) {
        xmlHttp = false;
    }
}

if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
    xmlHttp = new XMLHttpRequest();
}

xmlHttp.open("GET", window.location.href.toString(), false);
xmlHttp.setRequestHeader("Range", "bytes=-1");
xmlHttp.send(null);

severtime = new Date(xmlHttp.getResponseHeader("Date"));

//获取服务器日期
var year = severtime.getFullYear();
var month = severtime.getMonth() + 1;
var date = severtime.getDate();
//获取服务器时间
var hour = severtime.getHours();
var minu = severtime.getMinutes();//北京时间修正
var seco = severtime.getSeconds();
var week = ' 星期' + '日一二三四五六'.charAt(severtime.getDay())

var strStartTime = "2015-11-06 11:51:00";
var strEndTime = "2015-11-06 23:50:59";

//格式化输出服务器时间
function getSeverTime() {
    seco++;
    if (seco == 60) {
        minu += 1;
        seco = 0;
    }
    if (minu == 60) {
        hour += 1;
        minu = 0;
    }
    if (hour == 24) {
        date += 1;
        hour = 0;
    }
    //日期处理
    if (month == 1 || month == 3 || month == 5 || month == 7
    || month == 8 || month == 10 || month == 12) {
        if (date == 32) {
            date = 1;
            month += 1;
        }
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (date == 31) {
            date = 1;
            month += 1;
        }
    } else if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0) {//闰年处理
            if (date == 29) {
                date = 1;
                month += 1;
            }
        } else {
            if (date == 28) {
                date = 1;
                month += 1;
            }
        }
    }
    if (month == 13) {
        year += 1;
        month = 1;
    }
    sseco = addZero(seco);
    sminu = addZero(minu);
    shour = addZero(hour);
    sdate = addZero(date);
    smonth = addZero(month);
    syear = year;

    var strServerTime = syear + "-" + smonth + "-" + sdate + " " + shour + ":" + sminu + ":" + sseco;

    $('#ServerTimeDiv').html("");

    var serverTimeNow = new Date(strServerTime.replace("-", "/").replace("-", "/"));
    var startTime = new Date(strStartTime.replace("-", "/").replace("-", "/"));
    var endTime = new Date(strEndTime.replace("-", "/").replace("-", "/"));
    if (startTime <= serverTimeNow) {
        if (serverTimeNow <= endTime) {
            var strTips = "初赛答题";
            if ($("#hidTips").val() != "" && $("#hidTips").val() != null) { strTips = $("#hidTips").val(); }
            $('.pgs_preliminary .jcbpbox button').css("background", "#a5112a").html(strTips);
            $('.screen .login a').css("background", "#a5112a").attr("onclick", "CheckUserLogin()").html("初赛答题");
            $('.pgs_preliminary .jcbpbox button').click(function () {
                jQuery.fn.center = function () {
                    this.css("position", "absolute");
                    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() - 220 + "px");
                    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
                    return this;
                }
                $('.screen form').center();
                $('#login').css('display', 'block');
                $('#suceess').css('display', 'none');
                $('.screen').css('display', 'block');
            })
        } else {
            $('.pgs_preliminary .jcbpbox button').unbind().css("background", "gray").html("初赛已结束");//时间已过
            $('.screen .login a').css("background", "gray").removeAttr("onclick").html("初赛已结束");
        }
    }
    else {
        $('.pgs_preliminary .jcbpbox button').unbind().css("background", "gray");//时间未到
        $('.screen .login a').css("background", "gray").removeAttr("onclick");
    }

    setTimeout("getSeverTime()", 1000);
}

function addZero(num) {
    num = Math.floor(num);
    return ((num <= 9) ? ("0" + num) : num);
}

function CheckUserLogin() {
    if ($("#Field_UserName").val() != "" && $("#Field_PassWord").val() != "") {
        $.ajax({
            type: "post",
            url: "/Function.ashx",
            data: { func: "CheckPaperExist", user: $("#Field_UserName").val(), pwd: $("#Field_PassWord").val(), paperid: "24578" },
            dataType: "text",//"xml", "html", "script", "json", "jsonp", "text"
            success: function (data) {
                var jsonObj = eval("(" + data + ")");
                if (jsonObj.Status == "1") {
                    try {
                        iframe = document.createElement('<iframe name="hidiframe">');// IE6, IE7
                    } catch (e) {
                        iframe = document.createElement('iframe');
                        iframe.name = "hidiframe";
                    }
                    iframe.style.display = 'none';
                    iframe.setAttribute("src", "/LoginToGfeduCn.html?user=" + $("#Field_UserName").val() + "&pwd=" + $("#Field_PassWord").val());
                    document.body.appendChild(iframe);

                    $('#hidTips').val("试卷生成中……");
                    $('.screen .login a').html($('#hidTips').val());

                    setTimeout("location.href='" + jsonObj.Return + "'", 1000);
                }
                else {
                    alert(jsonObj.Return);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("登录失败，请重试");
            }
        });
    } else {
        alert("请正确填写登录信息");
    }
}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}