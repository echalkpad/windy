$(function(){
    //提交手机号码正确
    function haveYZM(o1){
        var num = 60;
        var str = '秒后再次发送';
        var tiemr = setInterval(function(){
            num--;
            if(num == 0){
                clearInterval(tiemr);
                o1.val("再次发送验证码").attr("disabled",false).css("background","#33b0c4");
            }else{
                if(num <= 9){
                    o1.val("0" + num + str);
                }else{
                    o1.val(num + str)
                }
            }           
        },1000)   
    }


    $("#Field_UserNamePCPass").blur(function(){
        checkNewPass('Field_UserNamePCPass');
    })
    $("#Field_UserNamePCPass2").blur(function(){
        checkPassRepeat('Field_UserNamePCPass','Field_UserNamePCPass2');
    })

    $("#Field_UserNameMobile").blur(function(){
        checkNewPass('Field_UserNameMobile');
    })
    $("#Field_PassWordMobile").blur(function(){
        checkPassRepeat('Field_UserNameMobile','Field_PassWordMobile');
    })


    //点击获取验证码
    $("#btnM").on("click",function(){          
        $("#btnM").val("60秒后再次发送").attr("disabled",true).css("background","#c1c1c1");
        haveYZM($("#btnM"));
    })

    $("#mbbtnM").on("click",function(){
        $("#mbbtnM").val("60秒后再次发送").attr("disabled",true).css("background","#c1c1c1");
        haveYZM($("#mbbtnM"));
    })

    $("#next").on("click",function(){
        /*if($("#verifyCodeM").val() == ?){
            step2();
        }else{
            $(".yzm_tip").text("验证码输入有误");
        }*/
        if(__changeRealPhone('Field_UserNamePC')){
            $("#step1").hide();
            $("#step2").show();
        }
    })

    $("#mbnext").on("click",function(){
        $("#mbstep1").hide();
        $("#mbstep2").show();
    })
})