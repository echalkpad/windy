$(function() {
    $("#butmag").click(function() {
        var tel = $("#txtphone").val();
        if (!IsCPhone(tel)) {
            alert("请输入正确的手机号码");
            return false;
        }
        var data = {
            type: "1",
            phone: tel
        };
        time(this);
        $.post("/Function/Diacrisis.ashx", data, function(result) {
            $("#HiMsg").val(result);
            $("#HiPhone").val(tel);
        });
    });
    $("#subcyc").click(function() {
        var radclass = $("input[name='radclass']:checked").val();         //获取选中的课程
        var tel = $("#txtphone").val();
        if (radclass == undefined || radclass == "") {
            alert(" 请选择一门您感兴趣的课程");
            return false;
        }
        if ($("#txtmsg").val() != $("#HiMsg").val() || $("#txtmsg").val() == "") {
            alert("验证码不正确");
            return false;
        }
        var data = {
            type: "2",
            phone: tel,
            classval: radclass
        };
        $.post("/Function/Diacrisis.ashx", data, function(result) {
            if (parseInt(result) > 0)         //跳转试卷
            {
                location = "/exam/setdatatest.asp?keyVal=" + result + "&numval=96&Pro=" + radclass;
            }
        });
    });
    $("#butDelUser").click(function() {
        $("#txtEmail").val("");
        $("#txtCation").val("");
        $("#txtCation").val("");
        $("#txtEnglish").val("");
        $("#txtSchool").val("");
        $("#txtPro").val("");
    });

    $("#butAddUser").click(function() {
        var Email = $("#txtEmail").val();
        var Sex = $("input[name='radSex']:checked").val();
        var Cation = $("#txtCation").val();
        var English = $("#txtEnglish").val();
        var School = $("#txtSchool").val();
        var Pro = $("#txtPro").val();
        if (!IsEmail(Email)) {
            alert("请输入正确的邮箱");
            return false;
        }
        if (Sex == undefined || Sex == "") {
            alert("请选择您的性别");
            return false;
        }
        if (Cation == "") {
            alert("请输入您的学历");
            return false;
        }
        if (English == "") {
            alert("请输入您的英语水平");
            return false;
        }
        if (School == "") {
            alert("请输入您的毕业院校");
            return false;
        }
        if (Pro == "") {
            alert("请输入您的专业");
            return false;
        }
        var data = {
            type: "4",
            VEmail: Email,
            VSex: Sex,
            VCation: Cation,
            VEnglish: English,
            VSchool: School,
            VPro: Pro
        };

        $.post("/Function/Diacrisis.ashx", data, function(result) {
            if (result == "1") {
                $("#adduseralert").html("您的信息已提交。<span>我们会尽快为您制定你的专属学习计划！</span>");
                $("#popbox").show();
            }
            else if (result == "-2") {
                $("#adduseralert").html("您已经参与过该活动。<span>我们会尽快为您制定你的专属学习计划！</span>");
                $("#popbox").show();
            }
            else {
                alert("非法参数");
            }
        });
    });
    //跳转相应的题库
    $("#butExam").click(function() {
        window.open($("#ExamUrl").val());
    });
});

function getassess() {
    var datas = {
        type: "3",
        TestPa: GetQueryString("TestPa")
    };
    $.post("/Function/Diacrisis.ashx", datas, function(data) {
        var json = eval('(' + data + ')');
        var regS = new RegExp("\\$", "g");
        if (navigator.platform.indexOf('Win32') != -1) {        //判断电脑访问
            var myChart_zhu_1 = new FusionCharts("Column3D.swf?PBarLoadingText=Loading&XMLLoadingText=Loading&ParsingDataText=Loading", "myChartId_zhu_1", "660", "250", "0", "0");
            myChart_zhu_1.addParam('wmode', 'transparent');
            myChart_zhu_1.setDataXML("<chart baseFontSize='12' baseFontColor='888888' outCnvBaseFontColor='999999' outCnvBaseFontSize='12' numberSuffix='%25' showAboutMenuItem='0' decimals='2' yAxisMaxValue='100' palette='2' enableRotation='1' canvasBgColor='ffffff' canvasBgAlpha='40' canvasBgDepth='3' canvasBaseColor='ffffff' divLineColor='d8d8d8' numDivLines='4' bgAlpha='0' logoURL='' logoPosition='TR' divLineColor='d8d8d8' canvasPadding='8' chartLeftMargin='0' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='0' maxColWidth='70' showValues='1'><styles><definition><style name='myToolTip' type='font' size='12' color='666666' /></definition><application><apply toObject='ToolTip' styles='myToolTip' /></application></styles>" + json.chart.replace(regS, "'") + "</chart>");
            myChart_zhu_1.render("chartdiv_zhu_1");
        }

        $("#pgstr").html(json.proname);
        $("#kmtable").html(json.tabstr);
        $("#ClassUrl").html(json.ExamUrl);
        $("#ExamUrl").val(json.ClassUrl);
    });

}

//url传递参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value = "获取验证码";
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.value = "重新发送(" + wait + ")";
        wait--;
        setTimeout(function() {
            time(o)
        },
        1000)
    }
}
//手机号码验证
function IsCPhone(val) {
    var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    if (reg.test(val) == true) {
        return true;
    }
    else {
        return false;
    }
}

//邮箱验证
function IsEmail(val) {
    var reg = /^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
    if (reg.test(val) == true) {
        return true;
    }
    else {
        return false;
    }
}