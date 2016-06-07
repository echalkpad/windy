function __changeUserName(of) {
    var username = $('#' + of).val();
    if (of == 'email') {
        if (username.search(/^[\w\.+-]+@[\w\.+-]+$/) == -1) {
            showTooltips('email_input', '请输入正确的Email地址');
            return;
        }
    } else {
        if (username == '' || !isMobilePhone(username)) {
            showTooltips('tel_input', '请输入正确的手机号码');
            return;
        }
    }
}

function __changeRealName(of) {
    var realname = $('#' + of).val();
    if (realname == '') {
        showTooltips('realname_input', '请填写真实姓名');
    } else {
        hideTooltips('realname_input');
    }
}


function checkPwd1(pwd1) {
    var passwordRegex = /^[a-zA-Z0-9]{6,15}$/;
    if (passwordRegex.test(pwd1) == false) {
        showTooltips('password1_input', '密码位数太少或格式不正确');
    } else {
        var msg = checkPassword(pwd1);
        if (msg == "red") {
            showTooltips('password1_input', '您的密码风险极大，请重新设置。');
        }
        else if (msg == "orange") {
            showTooltips('password1_input', '您的密码过短。请使用8-15位数字加字母的组合方式。');
        }
        else if (msg == "yellow") {
            showTooltips('password1_input', '您的密码过于简单，请使用数字加字母的组合方式。');
        } else {
            hideTooltips('password1_input');
        }
    }
}

function checkEmail(email) {
    if (email.search(/^.+@.+$/) == -1) {
        showTooltips('email_input', '邮箱格式不正确');
    } else {
        hideTooltips('email_input');
    }
}

function checkAuthCode(authcode) {
    if (authcode == '' || authcode.length != 6) {
        showTooltips('code_input', '验证码不正确');
    } else {
        hideTooltips('code_input');
    }
}

function checkReg() {
    hideAllTooltips();
    if ($('#realname').val() == '') {
        showTooltips('realname_input', '真实姓名不能为空');
        return false;
    }
    if ($('#tel').val() == '' || !isMobilePhone($('#tel').val())) {
        showTooltips('mobile_input', '手机号码不正确');
        return false;
    }
    if ($('#verifyCode').val() == '' || $('#verifyCode').val().length != 6 || $('#verifyCode').val().search(/^[0-9]{6,6}$/) == -1 || $('#verifyCode').val() != $('#furl').val()) {
        showTooltips('code_input', '验证码不正确');
        return false;
    }
    var passwordRegex = /^[a-zA-Z0-9]{6,15}$/;
    if ($('#passwd').val() == '' || passwordRegex.test($('#passwd').val()) == false) {
        showTooltips('password1_input', '请正确填写密码');
        return false;
    } else {
        var msg = checkPassword($('#passwd').val());
        if (msg == "red") {
            showTooltips('password1_input', '您的密码风险极大，请重新设置。');
            return false;
        }
        else if (msg == "orange") {
            showTooltips('password1_input', '您的密码过短。请使用8-15位数字加字母的组合方式。');
            return false;
        }
        else if (msg == "yellow") {
            showTooltips('password1_input', '您的密码过于简单，请使用数字加字母的组合方式。');
            return false;
        } else {
            hideTooltips('password1_input');
        }
    }
    if ($('#verify').attr('checked') == false) {
        showTooltips('code_input', '对不起，您不同意Webluker的《使用协议》无法注册');
        return false;
    }
    else {
        return true;
    }
}

function checkMobilePhone(telphone) {
    if (telphone == '' || !isMobilePhone(telphone)) {
        showTooltips('mobile_input', '请输入正确的手机号码');
    } else {
        hideTooltips('mobile_input');
    }
}

function isMobilePhone(value) {
    if (value.search(/^1[3|4|5|8|7][0-9]\d{8}$/) == -1)
        return false;
    else
        return true;
}

function reg() {
    document.getElementById("loginDialog").style.display = "none";
    document.getElementById("regDialog").style.display = "block";
}
function closereg() {
    document.getElementById("regDialog").style.display = "none";
}
function login() {
    document.getElementById("regDialog").style.display = "none";
    document.getElementById("loginDialog").style.display = "block";
}
function closelogin() {

    document.getElementById("loginDialog").style.display = "none";
}