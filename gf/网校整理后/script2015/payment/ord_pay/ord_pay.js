$(function(){

    //点击添加地址显示地址输入框
    $(".icon_add").parent().on("click",function(){
        $(".paymessage form").css("display","block");
        $("#keep").val("添加");
    });

    //地址列表点击出选中状态
    $(".paymessage").on("click", ".mess_list", function () {
        $(".duigou em").css("display", "none");
        document.getElementById('perName').value = $(this).find("li").eq(0).find("span").eq(1).text();
        document.getElementById('phone').value = $(this).find("li").eq(1).find("span").eq(1).text();
        document.getElementById('emailId').value = $(this).find("li").eq(2).find("span").eq(1).text();
        document.getElementById('adr').value = $(this).find("li").eq(3).find("span").eq(1).text();
        $(this).find(".duigou").find("em").css("display", "block");
    })

    //点击笔型按钮修改地址信息
    var icon_pen_index = 0;
    $(".paymessage").on("click",'.icon_pen',function(e){
        icon_pen_index = $(this).parents("ul").index();
        $(".paymessage form").css("display","block");
        $(".paymessage form ul li:eq(0)").find("input").val($(this).parent().parent().find("span").eq(1).text());
        $(".paymessage form ul li:eq(1)").find("input").val($(this).parents(".mess_list").find("li").eq(1).find("span").eq(1).text());
        $(".paymessage form ul li:eq(2)").find("input").val($(this).parents(".mess_list").find("li").eq(2).find("span").eq(1).text());
        $(".paymessage form ul li:eq(3)").find("textarea").val($(this).parents(".mess_list").find("li").eq(3).find("span").eq(1).text());
        document.getElementById('SetAddPKID').value = $(this).parents(".mess_list").find("li").eq(3).find("span").eq(2).text();
        $("#keep").val("修改");
        e.stopPropagation();
    })


    //点击差号删除地址列表
    $(".paymessage").on("click",".icon_cha",function(e){
        document.getElementById('SetAddPKID').value = $(this).parents(".mess_list").find("li").eq(3).find("span").eq(2).text();
        DelUserAddInfo();
        //icon_pen_index = $(this).parents("ul").index();
        //$(this).parents(".mess_list").remove();
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

        if ($(this).val() == "添加") {
            document.getElementById('SetAddPKID').value = '0';
            AddUserAddInfo();
            
        } else if ($(this).val() == "修改") {
            AddUserAddInfo();
            //$(".paymessage ul").eq(icon_pen_index).find("li").eq(0).find("span").eq(1).text($(".paymessage form ul li:eq(0)").find("input").val());
            //$(".paymessage ul").eq(icon_pen_index).find("li").eq(1).find("span").eq(1).text($(".paymessage form ul li:eq(1)").find("input").val());
            //$(".paymessage ul").eq(icon_pen_index).find("li").eq(2).find("span").eq(1).text($(".paymessage form ul li:eq(2)").find("input").val());
            //$(".paymessage ul").eq(icon_pen_index).find("li").eq(3).find("span").eq(1).text($(".paymessage form ul li:eq(3)").find("textarea").val());
        
            //if($(".paymessage form ul li input[type='checkbox']").prop("checked")){
            //    $(".paymessage ul").find(".duigou").find("em").css("display","none");
            //    $(".paymessage ul").eq(icon_pen_index).find(".duigou").find("em").css("display","block");
            //}
        }
        

        $(".paymessage form ul li input:not(#keep)").val("");
        $(".paymessage form ul li textarea").val("");
        $(".paymessage form").css("display","none");

        
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