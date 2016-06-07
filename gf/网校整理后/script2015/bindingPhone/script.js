$(function(){

	$('#menu').mmenu();
	
	$(".binding").on("click",function(){
		if($(".rel_name input").val() == ""){
			$(".rel_name_tip").text("用户名为空");
		}
		if(!isMobilePhone($(".phone input").val())){
			$(".phone_tip").text("手机号码格式错误");
		}
		if($(".yzm input").val() == ''){
			$(".yzm_tip").text("验证码错误");
		}
		if($(".createPass input").val() == ""){
			$(".psw_tip").text("密码为空");
		}else{
			var passwordRegex = new RegExp(/^[a-zA-Z0-9]{6,15}$/);
			if(passwordRegex.test($(".createPass input").val()) == false){
				$(".psw_tip").text("请输入6-15位密码");
			}
		}
		return false;
	})

	$(".rel_name input").focus(function(){
		$(".rel_name_tip").text("");
	})
	$(".phone input").focus(function(){
		$(".phone_tip").text("");
	})
	$(".yzm input").focus(function(){
		$(".yzm_tip").text("");
	})
	$(".createPass input").focus(function(){
		$(".psw_tip").text("");
	})

	function isMobilePhone(value) {
	    if (value.search(/^1[3|4|5|8|7][0-9]\d{8}$/) == -1){
	        return false;
	    }else{
	        return true;
	    }
	}
	//提交手机号码正确
    function haveYZM(o1){
        var num = 60;
        var str = '秒后再次发送';
        var tiemr = setInterval(function(){
            num--;
            if(num == 0){
                clearInterval(tiemr);
                o1.text("再次发送验证码").attr("disabled",false).css("background","#c9c7c7");
            }else{
                if(num <= 9){
                    o1.text("0" + num + str);
                }else{
                    o1.text(num + str)
                }
            }           
        },1000)   
    }

    function checkPwd(pwd) {
        var pwdval = $('#' + pwd).val();
        var passwordRegex = new RegExp(/^[a-zA-Z0-9]{6,15}$/);
        if (passwordRegex.test(pwdval) == false) {
            document.getElementById('noticeLR_' + pwd1).innerHTML = '请正确填写密码';
        }
    }

    //点击获取验证码
    $(".yzm button").on("click",function(){     
	    if(!isMobilePhone($(".phone input").val())){
			$(".phone_tip").text("手机号码格式错误");
			return false;
		}
        $(".yzm button").text("60秒后再次发送").attr("disabled",true).css("background","#c1c1c1");
        haveYZM($(".yzm button"));
    })

})