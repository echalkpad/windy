$(function(){


	//加载页面内容
	function getOrder(){

		var sOrders = '';
        var sOrderList = '';

		for(var i=0; i< $.parseJSON(order[0][0].ord_type).length; i++){

            switch ($.parseJSON(order[0][0].ord_type)[i]){

                case 1 :
                    for(var j=0; j<order[1][i].order_list.length; j++){
                        sOrderList += '<div class="list_cont cf"><div class="list_pic cf"><input class="checkbox_2" type="checkbox"><img src="' + order[1][i].order_list[j].pic + '" /></div><div class="list_cont_inner cf"><div class="list_cont_info"><h3><a href="' + order[1][i].order_list[j].list_cont_info_href + '" target="_blank">' + order[1][i].order_list[j].list_cont_info_title + '</a></h3><p class="col_1 lesson_times"><span class="col_1_tit">' + order[1][i].order_list[j].lesson_times + '</span></p><p class="col_1 courseType"><span class="col_1_tit">课程类型：</span><span class="col_1_text">' + order[1][i].order_list[j].courseType + '</span></p><p class="col_1 teachingPlace"><span class="col_1_tit">授课地点：</span><span class="col_1_text">' + order[1][i].order_list[j].teachingPlace + '</span></p></div><div class="col_1 unitPrice"><span class="col_1_tit">单价</span><span class="col_1_text old_price">￥' + order[1][i].order_list[j].old_price + '</span><span class="col_1_text new_price">￥' + order[1][i].order_list[j].new_price + '</span></div><div class="col_1 real_pay"><span class="col_1_tit">实付款：</span><span class="real_pay_text real_pay_num">￥' + order[1][i].order_list[j].real_pay + '</span></div></div><a class="remove"><span class="iconfont lajitong">&#xe62c;</span><span class="remove_text">移除</span></a></div>';
                    }
                    break;
                case 2 :
                    var send_list_str = '';
                    //console.log(typeof order[1][i].order_list[0].send_list);
                    for(var j=0; j<order[1][i].order_list.length; j++){
                        for(var k=0; k< order[1][i].order_list[j].send_list.length; k++){
                            send_list_str += '<p>' + order[1][i].order_list[j].send_list[k] + '</p>';
                        }
                        sOrderList += '<div class="list_cont cf"><div class="list_pic cf"><input class="checkbox_2" type="checkbox"><img src="' + order[1][i].order_list[j].pic + '" /></div><div class="list_cont_inner cf"><div class="list_cont_info"><h3><a href="' + order[1][i].order_list[j].list_cont_info_href + '" target="_blank">' + order[1][i].order_list[j].list_cont_info_title + '</a></h3><p class="col_1 lesson_times"><span class="col_1_tit">' + order[1][i].order_list[j].lesson_times + '</span></p><p class="col_1 courseType"><span class="col_1_tit">课程类型：</span><span class="col_1_text">' + order[1][i].order_list[j].courseType + '</span></p><div class="send cf"><span class="send_text">送</span><div class="send_list cf">' + send_list_str + '</div></div></div><div class="col_1 unitPrice"><span class="col_1_tit">单价</span><span class="col_1_text old_price">￥' + order[1][i].order_list[j].old_price + '</span><span class="col_1_text new_price">￥' + order[1][i].order_list[j].new_price + '</span></div><div class="col_1 real_pay"><span class="col_1_tit">实付款：</span><span class="real_pay_text real_pay_num">￥' + order[1][i].order_list[j].real_pay + '</span></div></div><a class="remove"><span class="iconfont lajitong">&#xe62c;</span><span class="remove_text">移除</span></a></div>';
                    }
                    break;
                case 3 :
                    for(var j=0; j<order[1][i].order_list.length; j++){
                        sOrderList += '<div class="list_cont cf"><div class="list_pic cf"><input class="checkbox_2" type="checkbox"><img src="' + order[1][i].order_list[j].pic + '" /></div><div class="list_cont_inner cf"><div class="list_cont_info"><h3><a href="' + order[1][i].order_list[j].list_cont_info_href + '" target="_blank">' + order[1][i].order_list[j].list_cont_info_title + '</a></h3><p class="col_1 courseType"><span class="col_1_tit">作者：</span><span class="col_1_text">' + order[1][i].order_list[j].Author + '</span></p><p class="col_1 courseType"><span class="col_1_tit">出版时间：</span><span class="col_1_text">' + order[1][i].order_list[j].publishing_time + '</span></p></div><div class="col_1 unitPrice"><span class="col_1_tit">单价</span><span class="col_1_text old_price">￥' + order[1][i].order_list[j].old_price + '</span><span class="col_1_text new_price">￥' + order[1][i].order_list[j].new_price + '</span></div><div class="col_1 real_pay"><span class="col_1_tit">实付款：</span><span class="goods_num_wrap">￥' + order[1][i].order_list[j].new_price + ' X <input class="goods_num" type="text" value="' + order[1][i].order_list[j].num + '"/> = </span><span class="real_pay_text real_pay_num">￥' + order[1][i].order_list[j].real_pay + '</span></div></div><a class="remove"><span class="iconfont lajitong">&#xe62c;</span><span class="remove_text">移除</span></a></div>';
                    }
                    break;
                case 4 :
                    for(var j=0; j<order[1][i].order_list.length; j++){
                        sOrderList += '<div class="list_cont cf"><div class="list_pic cf"><input class="checkbox_2" type="checkbox"><img src="' + order[1][i].order_list[j].pic + '" /></div><div class="list_cont_inner cf"><div class="list_cont_info"><h3><a href="' + order[1][i].order_list[j].list_cont_info_href + '" target="_blank">' + order[1][i].order_list[j].list_cont_info_title + '</a></h3><p class="col_1 courseType"><span class="col_1_tit">试卷作者：</span><span class="col_1_text">' + order[1][i].order_list[j].Author + '</span></p><p class="col_1 teachingPlace"><span class="col_1_tit">出版时间：</span><span class="col_1_text">' + order[1][i].order_list[j].publishing_time + '</span></p></div><div class="col_1 unitPrice"><span class="col_1_tit">单价</span><span class="col_1_text old_price">￥' + order[1][i].order_list[j].old_price + '</span><span class="col_1_text new_price">￥' + order[1][i].order_list[j].new_price + '</span></div><div class="col_1 real_pay"><span class="col_1_tit">实付款：</span><span class="goods_num_wrap">￥' + order[1][i].order_list[j].new_price + ' X <input class="goods_num" type="text" value="' + order[1][i].order_list[j].num + '"/> = </span><span class="real_pay_text real_pay_num">￥' + order[1][i].order_list[j].real_pay + '</span></div></div><a class="remove"><span class="iconfont lajitong">&#xe62c;</span><span class="remove_text">移除</span></a></div>';
                    }
                    break;
            }

            sOrders += '<div class="list cf"><p class="list_title"><input class="checkbox_1" type="checkbox">' + order[1][i].title + '</p>' + sOrderList + '</div>';
            sOrderList = '';
            $(".orders").append(sOrders);
            sOrders = '';
        }

        setborderColor();

	};

	getOrder();

    //设置视屏课程赠送课程列表border颜色
    function setborderColor(){
        colorArr = ['d6c970','94cb71','72b2d5'];

        $(".send_list p").each(function(i){

            $(this).css("borderColor",'#' + colorArr[i % colorArr.length]);
        });
    }

    var checkbox_1_num = 0;

    $(".checkbox_1").each(function () {
        $(this).attr("sum",0);
    })

    function check_all(o){
        if(o.prop("checked")){
            $(".checkbox_all").prop("checked",true);
            checkbox_1_num = $(".checkbox_1").length;
            $(".remove_all").prop("disabled",false);
        }else{
            $(".checkbox_all").prop("checked",false);
            checkbox_1_num = 0;
        }
    }

    function check_one(o){
        if(o.prop("checked")){
            checkbox_1_num++;
            o.parent().parent().find(".checkbox_2").prop("checked",true);
            o.attr("sum",o.parent().parent().find(".checkbox_2").length);
        }else{
            checkbox_1_num--;
            o.parent().parent().find(".checkbox_2").prop("checked",false);
            o.attr("sum",0);
        }
        if(checkbox_1_num == $(".checkbox_1").length){
            $(".checkbox_all").prop("checked",true);
        }else{
            $(".checkbox_all").prop("checked",false);
        }
    }



    $(".checkbox_all").each(function(){
        $(this).live("click", function () {
            var _this = $(this);
            check_all(_this);
            if($(".checkbox_all").eq(0).prop("checked") && $(".checkbox_all").eq(1).prop("checked")){
                $(".checkbox_1").prop("checked",true);
                $(".checkbox_2").prop("checked",true);
                checkbox_1_num == $(".checkbox_1").length;
                _this.parent().parent().parent().find(".checkbox_1").each(function(){
                    $(this).attr("sum",$(this).parent().parent().find(".checkbox_2").length);
                })
            }else{
                $(".checkbox_1").prop("checked",false);
                $(".checkbox_2").prop("checked",false);
                checkbox_1_num == 0;
                _this.parent().parent().parent().find(".checkbox_1").each(function(){
                    $(this).attr("sum",0);
                })
            }
            $(".checked_count").text(checked_count());
            $(".sum_price_noFreight_num").text(checked_count_money());
            $(".sum_price_num").text(checked_count_money_freight());
        })
    })

    function check_two(o,t){
        var iNum = checkbox_1_num;
        if(o.prop("checked")){
            var item = t.attr("sum");
            t.attr("sum", ++item);
            checkbox_1_num++;
        }else{
            var item = t.attr("sum");
            t.attr("sum", --item);
            checkbox_1_num--;
        }
        if(t.attr("sum") == t.parent().parent().find(".checkbox_2").length){
            t.prop("checked",true);
        }else{
            t.prop("checked",false);
        }
        if(checkbox_1_num == $(".checkbox_1").length){
            $(".checkbox_all").prop("checked",true);
        }else{
            $(".checkbox_all").prop("checked",false);
        }
    }

    $(".checkbox_1").each(function () {

        var _this = $(this);
        _this.live("click", function () {
            check_one(_this);
            $(".checked_count").text(checked_count());
            $(".sum_price_noFreight_num").text(checked_count_money());
            $(".sum_price_num").text(checked_count_money_freight());
        })
        _this.parent().parent().find(".checkbox_2").each(function(){
            var That = $(this);
            That.live("click",function(){
                check_two(That,_this);
                $(".checked_count").text(checked_count());
                $(".sum_price_noFreight_num").text(checked_count_money());
                $(".sum_price_num").text(checked_count_money_freight());
            })
        })

    })

    //合计数量
    function checked_count(){
        var iNum = 0;
        $(".checkbox_1").each(function(){
           iNum += parseInt($(this).attr("sum"));
        })
        return iNum;
    }

    //合计价钱
    function checked_count_money(){
        var iNum = 0;
        $(".checkbox_2").each(function(){
            if($(this).prop("checked")){
                iNum += parseInt($(this).parent().parent().find(".real_pay_num").text().substring(1,$(this).parent().parent().find(".real_pay_num").text().length));
            }
        })
        return iNum;
    }

    //合计价钱加运费
    function checked_count_money_freight(){
        return checked_count_money() == 0 ? 0 : checked_count_money() + 10;
    }

    //点击移除
    $(".remove").each(function(){
        $(this).live("click",function(){
            if($(this).parent().parent().find(".list_cont").length != 1){
                $(this).parent().remove();
            }else{
                $(this).parent().parent().remove();
            }

            $(".checkbox_all").prop("checked",false);
            $(".checked_count").text(checked_count());
            $(".sum_price_noFreight_num").text(checked_count_money());
            $(".sum_price_num").text(checked_count_money_freight());
        })
    })

    //点击删除全部
    $(".remove_all").live("click",function(){
        $(".orders").remove();
        $(".checkbox_all").prop("checked",false);
        $(".checked_count").text(checked_count());
        $(".sum_price_noFreight_num").text(checked_count_money());
        $(".sum_price_num").text(checked_count_money_freight());
    })
    
});