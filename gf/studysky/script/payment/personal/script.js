$(function(){


	//加载页面内容
	function getOrder(){

		var str = '';

		for(var i=0; i<order.length; i++){
			str += '<div class="list cf"><div class="top_title"><span class="or_num">订单编号：<i>' + order[i].or_num + '</i></span><span class="or_date">下单：<i>' + order[i].or_date + '</i></span></div><div class="or_info cf"><div class="or_name"><h4>' + order[i].or_name + '</h4><span class="or_is_deliver_wrap"><i>' + order[i].or_is_deliver + '</i></span></div><div class="or_cont cf"><div class="or_cont_list or_cont_list0"><span class="pay_state">' + order[i].or_paystate + '</span><span class="open_state">' + order[i].or_openstate + '<em>?<div class="tri_box"><span class="out"></span><span class="iner"></span><p>您的课程暂未开通，请联系客服开通课程。</p></div></em></span></div><div class="or_cont_list or_cont_list1"><span class="or_price">￥' + order[i].or_price + '</span><span class="or_total"><span class="goods_num_wrap">￥' + order[i].or_price + ' X ' + order[i].or_amount + '= </span>￥' + order[i].or_price*order[i].or_amount + '</span></div><div class="or_cont_list or_cont_list2 border_right_none"><a href="' + order[i].or_cont_list2[0] + '">' + order[i].or_cont_list2[1] + '</a></div></div></div></div>';
		}

		$("#content").append(str);
		
		for(var i=0; i<order.length; i++){
			if(order[i].or_cont_list2[1] == '立即支付'){
				$(".or_cont_list2 a").eq(0).addClass("now_pay");
			}
            if(order[i].or_amount <= 1){
                $(".goods_num_wrap").eq(i).css("display","none");
            }
            if(order[i].or_openstate == '未开通'){
                $(".or_cont").eq(i).find(".open_state").find("em").css("display","inline-block");
            }
            if(order[i].or_is_deliver == '未发货'){
                $(".or_is_deliver_wrap").eq(i).children().css({"color":"#eb9529"});
            }
            if(order[i].or_is_deliver == '已发货'){
                var deliver_introduction = '<span>（' + $.parseJSON(order[i].or_deliver)[0] + '运单号：' + $.parseJSON(order[i].or_deliver)[1] + '）<em>?<div class="tri_box"><span class="out"></span><span class="iner"></span><div class="tri_box_cont"><h4>快捷快递 运单号：536022873053 </h4><ul><li class="express_newInfo"><p>快件离开上海分拨中心，已发往上海虹口公司</p><p>2015-07-07 04:43:04</p></li><li><p>快件离开上海分拨中心，已发往上海虹口公司</p><p>2015-07-07 04:43:04</p></li><li><p>快件离开上海分拨中心，已发往上海虹口公司</p><p>2015-07-07 04:43:04</p></li></ul></div></div></em></span>';
                $(".or_is_deliver_wrap").eq(i).children().css({"color":"#87a949"}).after(deliver_introduction);
                $(".or_is_deliver_wrap").eq(i).find("em").css("display","inline-block");
            }
		}

	};

	getOrder();

	//手机端导航切换
	$(".navList_check").on("click",function(){
		if ($(".navList").css("display") == "block"){
			$(".navList").css("display","none");
		}else{
			$(".navList").css("display","block");
		}
	});

	$(".navList li").each(function(){
		$(this).on("click",function(){
			$(".navList_check .text").text($(this).text().substring(0,$(this).text().length-1));
			$(".navList").css("display","none");
		})
	});

	//鼠标移入列表，显示X号
	/*$(".list").each(function(){
		$(this).live("mouseover",function(){
			$(this).find(".colse_list").css("display","block");
		});
		$(this).live("mouseout",function(){
			$(this).find(".colse_list").css("display","none");
		});
	});*/

	//点击X号删除这列
	/*$(".colse_list").each(function(){
		$(this).live("click",function(){
			$(this).parent().parent().remove();
		});
	});*/

    //未开通课程鼠标移入，显示联系客服
    $(".open_state em,.or_is_deliver_wrap em").each(function(){
        $(this).hover(function(){
            $(this).children().css("display","block");
        },function(){
            $(this).children().css("display","none");
        });
    })
});