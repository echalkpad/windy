$(function(){

    //点击添加地址显示地址输入框
    $(".icon_add").parent().on("click",function(){
        $(".paymessage form").css("display","block");
    });

    //地址列表点击出选中状态
    $(".paymessage").on("click",".mess_list",function(){
        $(".duigou em").css("display","none");
        $(this).find(".duigou").find("em").css("display","block");
    })

    //点击笔型按钮修改地址信息
    $(".paymessage").on("click",'.icon_pen',function(e){
            $(".paymessage form").css("display","block");
            $(".paymessage form ul li:eq(0)").find("input").val($(this).parent().parent().find("span").eq(1).text());
            $(".paymessage form ul li:eq(1)").find("input").val($(this).parents(".mess_list").find("li").eq(1).find("span").eq(1).text());
            $(".paymessage form ul li:eq(2)").find("input").val($(this).parents(".mess_list").find("li").eq(2).find("span").eq(1).text());
            $(".paymessage form ul li:eq(3)").find("textarea").val($(this).parents(".mess_list").find("li").eq(3).find("span").eq(1).text());
            e.stopPropagation();
    })

    //点击差号删除地址列表
    $(".paymessage").on("click",".icon_cha",function(e){
        $(this).parents(".mess_list").remove();
        e.stopPropagation();
    })

    //点击地址输入框保存按钮
    $(".paymessage").on("click",'#keep',function(e){
        if($(".inputName").val() == ''){
            $(".inputName").next("p").text("用户名不能为空");
            return false;
        }
        if($(".inputPhone").val() == ''){
            $(".inputPhone").next("p").text("手机号码不能为空");
            return false;
        }else if(!isMobilePhone($(".inputPhone").val())){
            $(".inputPhone").next("p").text("手机号码格式不正确");
            return false;
        }
        if($(".inputEmail").val() == ''){
            $(".inputEmail").next("p").text("电子邮箱不能为空");
            return false;
        }else if(!isEmail($(".inputEmail").val())){
            $(".inputEmail").next("p").text("电子邮箱格式不正确");
            return false;
        }
        if($(".mess").val() == ''){
            $(".mess").next("p").text("详细地址不能为空");
            return false;
        }

        var str = '<ul class="mess_list"><li><span>姓  名：</span><span class="name">' + $(".paymessage form ul li:eq(0)").find("input").val() + '</span><span class="write_rep"><i class="iconfont icon_pen">&#xe604;</i><i class="iconfont icon_cha">&#xe600;</i></span></li><li><span>手   机：</span><span>' + $(".paymessage form ul li:eq(1)").find("input").val() + '</span></li><li><span>邮   箱：</span><span>' + $(".paymessage form ul li:eq(2)").find("input").val() + '</span></li><li><span>地   址：</span><span>' + $(".paymessage form ul li:eq(3)").find("textarea").val() + '</span></li><li class="duigou"><em><i class="iconfont">&#xe602;</i></em></li></ul>';
        $(".paymessage").prepend(str);

        $(".paymessage form ul li input:not(#keep)").val("");
        $(".paymessage form ul li textarea").val("");
        $(".paymessage form").css("display","none");

        if($(".paymessage form ul li input[type='checkbox']").prop("checked")){
            console.log($(".paymessage ul").eq(0).find(".duigou"));
            $(".paymessage ul").eq(0).find(".duigou").find("em").css("display","block");
        }
    })

    //地址输入框获取光标
    $(".paymessage form").on("focus",'.focusing',function(e){
        $(e.target).next("p").text("");
    })



    $(".paymessage").on("blur",'.inputName',function(e){
        if($(e.target).val() == ''){
            $(e.target).next("p").css("display","block");
        }
    })

    $(".phone input").focus(function(){
        $(".reg .phone_tip p").css("display","none");
    })

    $(".email input").focus(function(){
        $(".reg .email_tip p").css("display","none");
    })

    /*$("#sub input").on("click",function(){
        if($(".name input").val() == ''){
            $(".reg .name_tip p").css("display","block");
            return false;
        }
        if(!isMobilePhone($(".phone input").val())){
            $(".reg .phone_tip p").css("display","block");
            return false;
        }
        if(!isEmail($(".email input").val())){
            $(".reg .email_tip p").css("display","block");
            return false;
        }

        $(".popbox").css("display","block");
    })*/

    function isMobilePhone(value) {
        if (value.search(/^1[3|4|5|8|7][0-9]\d{8}$/) == -1){
            return false;
        }else{
            return true;
        }
    }
    function isEmail(value) {
        if(value.search(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) == -1)
            return false;
        else
            return true;
    }

})