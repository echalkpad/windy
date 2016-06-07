//提交登陆
function CheckUserLogin(TypeVal) {
    if (document.getElementById('Field_UserName' + TypeVal).value != '' && document.getElementById('Field_PassWord' + TypeVal).value != '') {
        $("#LoginForm" + TypeVal).ajaxSubmit({
            success: function (data) {
                if (data.substr(0, 1) == "1") {
                    if (TypeVal == '') {
                        //$("#TitleLoginDiv").html("<a class=\"newLogin\" data-toggle=\"modal\" href=\"#login-modal\">您好 " + data.replace("1,", "") + "</a>");
                        //$("#TitleRegDiv").html("<a class=\"newReg\"  data-toggle=\"modal\" href=\"#signup-modal\">退出</a>");
                        document.getElementById("loginDialog").innerHTML = '';
                        document.getElementById("regDialog").innerHTML = '';
                        if (document.getElementById('TopLoginSpan')) {
                            GetTop('TopLoginSpan', '');
                        } else {
                            GetTop('HomeTopLoginSpan', '');
                        }
                    }
                    else {
                        window.location.href = '/';
                    }
                } else {
                    //window.alert("用户名，密码错误，请确认后再试");
                    $(".login_msg_wrap").css('display','block');
                }
            },
            resetForm: false,
            clearForm: false
        });
    }
    else {
        //window.alert("请正确填写后登陆");
	$(".login_msg_wrap").css('display','block');
    }
}