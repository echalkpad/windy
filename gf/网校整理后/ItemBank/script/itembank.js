// JavaScript Document

$(function(){

	//内页导航
	$('.ibnav h2').click(function() {
		$('.ibnav_list').stop().toggle();
	});

	//secTabs切换
	$(".J_secTabs").each(function(){
		var timeout = 300;
		var delay = 0;
		var a = $(this).find("li"), b = $(this).next().children(), c = $(this).find("em");

		//a.hover(function(){ var	obj = $(this); item_show(obj); },function(){ item_hide(); });
		a.click(function(){ var	obj = $(this); item_show(obj); },function(){ item_hide(); });
		a.click(function(){ var obj = $(this); item_action(obj); });

		function item_action(obj){
			a.removeClass("selected");
			c.css("cursor","")
			obj.addClass("selected");
			obj.children("em").css("cursor","default");
			var i = a.index(obj);
			b.hide();
			$(b.get(i)).show();
		}
		function item_show(obj){
			clearTimeout(delay);
			delay = setTimeout(function(){
				item_action(obj);
				clearTimeout(delay);
			},timeout);
		}
		function item_hide(){
			clearTimeout(delay);
		}
	});

function autoPlay(){
	//弹出窗口
	var w=document.body.clientWidth;
	var bdh=document.body.offsetHeight;
	var h=$(window).height();
	if(h>bdh){
		var boxh=bdh-120;
	}else{
		var boxh=h-120;
	}


	$(".ibtop01pop,.ibtop02pop").css('height',bdh);

	if (w<=768){
		$(".popboxcon").css('height',h-10);
	}else{
		$(".popboxcon").css('height',boxh);
	}


	//解析详情购买弹出窗口
	$(".ibanalyzebuy").css('height',bdh);
	$(".popbuylink").click(function(){
		$(".ibanalyzebuy,.ibanalyzebuy .popboxcon2").stop().show();
	})
	$(".ibanalyzebuy h5").click(function(){
		$(".ibanalyzebuy,.ibanalyzebuy .popboxcon2").stop().hide();
	})

	// 模态窗口
	$('.modal').css({
		'height':$(document).height(),
		'width':$(window).width(),
		'z-index':9999,
	})


	// 能力评估环形图
	var w2=$(window).width();
	var h1=$('.echart').height();
	if(w2<768){
		$('.ibev_score,.qnum').css({
			'height':h1*4/5,
		})
	}else{
		$('.ibev_score,.qnum').css({
			'height':h1,
		})
	}

	 $('.ibev_score .circle,.qnum .circle').each(function(index, el) {
        // var num = $(this).find('span').text() * 3.6;
        var num = 0;
        num=80 * 3.6;
        if (num<=180) {
            $(this).find('.right').css({
            	'transform':"rotate(" + num + "deg)",
            	'-webkit-transform':"rotate(" + num + "deg)",
            	'-moz-transform':"rotate(" + num + "deg)",
            	'-ms-transform':"rotate(" + num + "deg)",
            	'-o-transform':"rotate(" + num + "deg)",
            });
        } else {
            $(this).find('.right').css({
            	'transform': "rotate(180deg)",
            	'-webkit-transform': "rotate(180deg)",
            	'-moz-transform': "rotate(180deg)",
            	'-ms-transform': "rotate(180deg)",
            	'-o-transform': "rotate(180deg)",
            });
            $(this).find('.left').css({
            	'transform': "rotate(" + (num - 180) + "deg)",
            	'-webkit-transform': "rotate(" + (num - 180) + "deg)",
            	'-moz-transform': "rotate(" + (num - 180) + "deg)",
            	'-ms-transform': "rotate(" + (num - 180) + "deg)",
            	'-o-transform': "rotate(" + (num - 180) + "deg)",
            });
        };
    });

// 金程3每&我的练习
	var tag1='<li><h2>CFA一级每日一题测试一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li><li><h2>CFA一级每日一题测试一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li><li><h2>CFA一级每日一题测试一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li>';
	var tag2='<li><h2>CFA一级每周一讲测试一级每周一讲测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每周一讲测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li><li><h2>CFA一级每周一讲测试一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每周一讲测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li><li><h2>CFA一级每日一题测试一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li>'
	var tag3='<li><h2>CFA一级每月一测测试一级每月一测测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每月一测测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li><li><h2>CFA一级每月一测测试一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每月一测测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li><li><h2>CFA一级每月一测测试一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>2015-10-20<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd22">&#xe910;</i>开始测试</a></span></li>'
	var tag4='<li><h2>CFA一级每日一题测试一级每日一题测试<i class="icon-gf-right32">&#xea37;</i></h2><p>每日一题<em><strong>1345</strong>人参于</em>2015-10-20</p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试<i class="icon-gf-wrong32">&#xea3c;</i></h2><p>每日一题<em><strong>1345</strong>人参于</em>2015-10-20</p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>每日一题<em><strong>1345</strong>人参于</em>2015-10-20<q>未完成</q></p><span><a href="#"><i class="icon-lookd52">&#xe913;</i>继续答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>每日一题<em><strong>1345</strong>人参于</em>平均正确率<code>95%</code></p><span><a href="#"><i class="icon-lookd42">&#xe912;</i>查看解析</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li><li><h2>CFA一级每日一题测试</h2><p>每日一题<em><strong>1345</strong>人参于</em>已做<big>2/5</big>题</p><span><a href="#"><i class="icon-detial">&#xe9f4;</i>查看详情</a><a href="#"><i class="icon-lookd62">&#xe914;</i>重新答题</a></span></li>'
		$('.ibmy_more').click(function(event) {
			$('.ibmy_day').append(tag1);
			$('.ibmy_week').append(tag2);
			$('.ibmy_month').append(tag3);
			$('.ibmy_history').append(tag4);
		});
		$(window).scroll(function() {
            if ($(this).scrollTop() + $(window).height() >= $(document).height()-10){
               $('.ibmy_more').click();
            }
        });

		// 选择日期
		$('.icon-ib-acard2').click(function(event) {
			if($(window).width()<768){
				$(this).css('font-size',12);
				$('#laydate_box').css({
			    'left': '50%',
			    'margin-left':-120,
			});
			}
		});

}

autoPlay();

$(window).resize(function(event) {
	autoPlay();
});



/*选题中心*/
$(".popboxcon h5").click(function(){
	$(this).parent().parent().stop().hide(400);
})

// 专项练习弹出
$('.ib_top01 a').click(function(event) {
	$('.ibtop01pop').stop().show(400);
});
$('.ibtop01pop .popchoice a').click(function(event) {
	$('.ibtop01buy').stop().show(400);
});
// 智能选题弹出
$('.ib_top02 dt a').click(function(event) {
	$('.ibtop02pop').stop().show(400);
});

$('.ib_top02 dd a').click(function(event) {
	$('.ibtop02buy').stop().show(400);
});
$('.ibtop02pop .popchoice a').click(function(event) {
	$('.ibtop02buy').stop().show(400);
});
// 第一层级

$('.popchoice>li>section label').click(function(event){
	$(this).parent().parent().parent().find('.radio-btn').addClass('checkedRadio');
});
// 第二层级
$('.popchoice>li>ul>li>section label').click(function(event) {
	$(this).parent().parent().parent().find('.radio-btn').addClass('checkedRadio');
});

$('.popchoice>li>ul>li>section>q').on('click',function(){
	$(this).parent().parent().toggleClass('open');
	if ($(this).parent().parent().hasClass("open")){
		$(this).html("<i class='icon-gfbottom2'>&#xe931;</i>这是第二层级")
	}else{
		$(this).html("<i class='icon-gfbottom2'>&#xe932;</i>这是第二层级")
	}
})
// 第三层级
$('.popchoice>li>ul>li>ul>li>section>q').on('click',function(){
	$(this).parent().parent().toggleClass('open');
	if ($(this).parent().parent().hasClass("open")){
		$(this).html("<i class='icon-gfbottom2'>&#xe931;</i>这是第三层级")
	}else{
		$(this).html("<i class='icon-gfbottom2'>&#xe932;</i>这是第三层级")
	}
})
$('.popchoice>li>ul>li>ul>li>section label').click(function(event) {
	$(this).parent().parent().parent().find('.radio-btn').addClass('checkedRadio');
});


$('.ibmy_collection>ul>li>ul>li>section q,.ibmy_error>ul>li>ul>li>section q').on('click',function(){
	$(this).parent().parent().toggleClass('open');
	if ($(this).parent().parent().hasClass("open")){
		$(this).html("<i class='icon-gfbottom2'>&#xe931;</i>这是第二层级")
	}else{
		$(this).html("<i class='icon-gfbottom2'>&#xe932;</i>这是第二层级")
	}
})
$('.ibmy_collection>ul>li>ul>li>ul>li>section q,.ibmy_error>ul>li>ul>li>ul>li>section q').on('click',function(){
	$(this).parent().parent().toggleClass('open');
	if ($(this).parent().parent().hasClass("open")){
		$(this).html("<i class='icon-gfbottom2'>&#xe931;</i>这是第三层级")
	}else{
		$(this).html("<i class='icon-gfbottom2'>&#xe932;</i>这是第三层级")
	}
})



$('.ibev_recommendation dt').click(function(event) {
	if($(this).attr("isclick")=='1'){
		$(this).attr("isclick","0");
		$(this).parent().find('.radio-btn').removeClass('checkedRadio');
	}else{
		$(this).attr("isclick","1");
		$(this).parent().find('.radio-btn').addClass('checkedRadio');
	}
});

	$('.modal,.popboxcon2').stop().hide();
	// 关闭窗口
	 $('.modal i').click(function(event) {
	 	 $('.modal,.popboxcon2').stop().hide();
	 });
	// 暂停
	$('.stop1').click(function(event) {
		$('.ib_exercise .modal,.ib_exercise #stop').stop().show();
	});
	// 继续
	$(".tg_continue").click(function (event) {
	    $('.ib_exercise .modal,.ib_exercise #stop').stop().hide();
	});
	// 答题卡
	$('.sheet1').click(function(event) {
		$('.modal,#sheet').stop().show();
	});
	// 下次再做
	$('.next1').click(function(event) {
		$('.ib_exercise .modal,.ib_exercise #next_time').stop().show();
	});
	// 交卷
	$('.finish1').click(function(event) {
		$('.ib_exercise .modal,.ib_exercise #finish').stop().show();
	});
	// 纠错
	$('.feedback1').click(function(event) {
		$('.modal,#feedback').stop().show();
	});
	// 标记
	$('.mark1').on('click',function(){
		$(this).toggleClass('signs');
		if ($(this).hasClass("signs")){
			$(this).html("<label><i class='icon-turned_in_not22'>&#xe985;</i>已标记</label>")
		}else{
			$(this).html("<label><i class='icon-turned_in_not22'>&#xe985;</i>标记</label>");
		}
	})
	// 收藏
	$('.collect1').on('click',function(){
		$(this).toggleClass('signs');
		if ($(this).hasClass("signs")){
			$(this).html("<label><i class='icon-gf-collection2'>&#xe928;</i>已收藏</label>")
		}else{
			$(this).html("<label><i class='icon-gf-collection2'>&#xe929;</i>收藏</label>");
		}
	})

	// 单选题
	$('.ib_exercise .single_choice .options li,.dx .options li').click(function(event) {
		$(this).addClass('current').siblings().removeClass('current');
	});
	// 多选题
	$('.ib_exercise .Multiple_choice .options li,.sx .options li').click(function(event) {
		$(this).toggleClass('current');
	});
	// 是非
	$('.yes').click(function(){
		$(this).html('&#xe93f;')
		$(this).siblings().html('&#xe96d;')
	})
	$('.no').click(function(){
		$(this).html('&#xe964;')
		$(this).siblings().html('&#xe940;')
	})


	/*单选切换*/
	$('.single_choice .qiehuan .next').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().next().stop().show();
	})
	$('.single_choice .qiehuan .prev').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().prev().stop().show();
	})
	/*多选切换*/
	$('.Multiple_choice .qiehuan .next').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().next().stop().show();
	})
	$('.Multiple_choice .qiehuan .prev').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().prev().stop().show();
	})
	/*是非题切换*/
	$('.true-false .qiehuan .next').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().next().stop().show();
	})
	$('.true-false .qiehuan .prev').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().prev().stop().show();
	})
	/*填空切换*/
	$('.gap_filling .qiehuan .next').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().next().stop().show();
	})
	$('.gap_filling .qiehuan .prev').click(function(){
		$(this).parent().parent().parent().stop().hide();
		$(this).parent().parent().parent().prev().stop().show();
	})
	/*分析题切换*/
	var num1=0;
	var len1=$('.analyze_item>section').length;
	$('.analyze .qiehuan .next').click(function(event) {
		num1++;
		if (num1>=len1-1) {
			num1=len1-1;
		}
		console.log(num1)
		$('.analyze_item>section').stop().hide();
		$('.analyze_item>section').eq(num1).stop().show();
	});
	$('.analyze .qiehuan.prev').click(function(event) {
		num1--;
		if (num1<=0) {
			num1=0;
		}
		$('.analyze_item>section').stop().hide();
		$('.analyze_item>section').eq(num1).stop().show();
	});
	setInterval(function() {
		if ($('.analyze_item>section').eq(4).is(':hidden')) {

		}else{
			$('.analyze .qiehuan .next').click(function(event){
				$('.analyze').stop().hide();
				$('.analyze').next().stop().show();
			})
		}
	}, 10);
	setInterval(function() {
		if ($('.analyze_item>section').eq(0).is(':hidden')) {

		}else{
			$('.analyze .qiehuan .prev').click(function(event){
				$('.analyze').stop().hide();
				$('.analyze').prev().stop().show();
			})
		}
	}, 10);
	/*简答题切换*/
	var num2=0;
	var len2=$('#Short_answer .options li').length;
	$('#Short_answer .next').click(function(event) {
		num2++;
		if (num2>=len2-1) {
			num2=len2-1;
		}
		$('#Short_answer .options li').eq(num2).addClass('current').siblings('#Short_answer .options li').removeClass('current');
		$('#Short_answer .parsing li').eq(num2).addClass('current').siblings('#Short_answer .parsing li').removeClass('current');
	});
	$('#Short_answer .prev').click(function(event) {
		num2--;
		if (num2<=0) {
			num2=0;
		}
		$('#Short_answer .options li').eq(num2).addClass('current').siblings('#Short_answer .options li').removeClass('current');
		$('#Short_answer .parsing li').eq(num2).addClass('current').siblings('.analyze .parsing li').removeClass('current');
	});
	/*填空题切换*/
	var num3=0;
	var len3=$('#gap_filling .options li').length;
	$('#gap_filling .next').click(function(event) {
		num3++;
		if (num3>=len3-1) {
			num3=len3-1;
		}
		$('#gap_filling .options li').eq(num3).addClass('current').siblings('#gap_filling .options li').removeClass('current');
		$('#gap_filling .parsing li').eq(num3).addClass('current').siblings('#gap_filling .parsing li').removeClass('current');
	});
	$('#gap_filling .prev').click(function(event) {
		num3--;
		if (num3<=0) {
			num3=0;
		}
		$('#gap_filling .options li').eq(num3).addClass('current').siblings('#gap_filling .options li').removeClass('current');
		$('#gap_filling .parsing li').eq(num3).addClass('current').siblings('#gap_filling .parsing li').removeClass('current');
	});

	setInterval(function() {
		var len4=$('.tg_topic>div').length;
		if ($('.tg_topic>div').eq(0).is(':hidden')) {
		}else{
			$('.tg_topic>div').eq(0).find('.prev').stop().hide();
		}
		if ($('.tg_topic>div').eq(len4-1).is(':hidden')) {
		}else{
			$('.tg_topic>div').eq(len4-1).find('.next').stop().hide();
			$('.tg_topic>div').eq(len4-1).find('.achieve').stop().show();
		}
	}, 10);

	$('.popboxcon input,.ibev_recommendation input').wrap('<div class="radio-btn"><i>&#xe93f;</i></div>');
	$('.popboxcon2 input').wrap('<div class="radio-btn"><i>&#xe93e;</i></div>');
	$(".radio-btn").on('click', function () {
	    var _this = $(this),
	        block = _this.parent().parent();
	    block.find('input:radio').attr('checked', false);
	    block.find(".radio-btn").removeClass('checkedRadio');
	    _this.addClass('checkedRadio');
	    _this.find('input:radio').attr('checked', true);
	});

	var AT = new AnswerTime($(".wrap .ibttl h2"));
	AT.init();
	$(".wrap .ibttl h2").click();



	// 点击评论

	$(document).on('click','.stucmtbtn',function(event){
			if ($(this).parent().parent().parent().find('.comentmsg').length==0){
				$(this).parent().parent().after($('<div class="comentmsg"><article><i class="topsj"></i><textarea class="input saytext" name="saytext"></textarea><p class="comtxtbtn"><i class="icon-smile emotion">&#xe9e5;</i><em>表情</em><i class="icon-pic">&#xe989;</i><em>图片</em><span>您还可以输入140字<a class="commentlz" href="javascript:;">评论</a></span><span class="daline"></span></p></article></div>'));
			}else{
				$(this).parent().parent().parent().find('.comentmsg').remove();
			}
		})

	// 学员评论
	$(document).on('click','.stucoment_btn',function(event){
		if ($(this).parent().parent().parent().find('textarea').val() =='') {
			return false;
		}else{
			$(this).parent().parent().parent().after($('<div class="comment"><p class="nowtime"></p><div class="stucommt"><div class="stuct"><dl><dt><img src="images/sone.png"></dt><dd>学员<a class="name" href="javascript:;">alextang</a>对<a class="name" hrel="javascript:;">无有取证班</a>评论</dd><dd>'+replace_em($(this).parent().parent().parent().find("textarea").val())+'</dd><dd class="operating_area"><time>6小时前</time><em class="stucmtbtn">评论<span>12</span></em><em><i class="icon-zan">&#xe953;</i><span>5</span></em></dd></dl></div></div></div>'));
		}
	});


	// 发表评论
	$(document).on('click','.commentlz',function(event) {
		if ($(this).parent().parent().prev().val() =='') {
			return false;
		}else{
			$(this).parent().parent().after($('<div class="reply"><dl><dt><img src="images/sone.png"></dt><dd>神神叨叨<a href="javascript:;">@alextang</a><span>'+replace_em($(this).parent().parent().prev().val())+'</span></dd><dd><span class="dtime">2015/8/4 10:30</span><em class="ntreply">回复<span>12</span></em><em><i class="icon-zan"></i><span>5</span></em></dd></dl></div>'));
				$(this).parent().parent().prev().val("");
		}
	});


	// 回复
	$(document).on('click','.ntreply',function(event){
		if ($(this).hasClass('mark')){
			$(this).parent().parent().parent().next().remove();
			$(this).parent().parent().parent().next().remove();
			$(this).parent().parent().parent().next().remove();
			$(this).removeClass('mark');
		}else{
			$(this).parent().parent().parent().after($('<i class="topsj"></i><textarea class="input saytext" name="saytext"></textarea><p class="comtxtbtn"><i class="icon-smile emotion">&#xe9e5;</i><em>表情</em><i class="icon-pic">&#xe989;</i><em>图片</em><span>您还可以输入140字<a class="commentlz" href="javascript:;">评论</a></span><span class="daline"></span></p>'));
				$(this).addClass('mark');
		}

	})

	//QQ表情
	$('.emotion').qqFace({
		id : 'facebox', //表情盒子的ID
		assign:'saytext', //给那个控件赋值
		path:'images/face/'	//表情存放的路径
	});

	//QQ表情查看结果
	function replace_em(str){
		str = str.replace(/\</g,'&lt;');
		str = str.replace(/\>/g,'&gt;');
		str = str.replace(/\n/g,'<br/>');
		str = str.replace(/\[em_([0-9]*)\]/g,'<img src="images/face/$1.gif" border="0" />');
		return str;
	}

	$(document).on('click','.icon-pic',function(){
		$(this).parent().after($("<section class='pic_road pic_roadload'><i></i><em class='closepic'>X</em><h5><input type='text' /><input type='button' value='图片路径' /></h5><p>紧支持JPG、PNG图片文件,且文件小于5M</p></section>"));
	})
	$(document).on('click','.closepic',function(event) {
		$(this).parent().hide();
	});


	// 点赞
	$('.stucmtbtn').next().toggle(function() {
		var int=parseInt($(this).find("span").html())+1;
		$(this).html('<i class="icon-zan">&#xe956;</i><span>'+int+'</span>')
	}, function() {
		var int=parseInt($(this).find("span").html())-1;
		$(this).html('<i class="icon-zan">&#xe953;</i><span>'+int+'</span>')
	});







})



//答题计时
function AnswerTime(obj) {
    this.obj = obj;
    this.pause = $("#tiTime");
    this.oContinue = $(".tg_continue");
    this.h = 0;
    this.m = 0;
    this.s = 0;
    this.timer = null;
    this.iBtn = true;
    this.itemTime = '';
}
AnswerTime.prototype.init = function () {
    var _this = this;
    
    this.obj.click(function () {
        console.log("click");
        if (_this.iBtn) {
            _this.begin();
        }
        _this.iBtn = false;
    });
    //this.obj.onclick = function () {
    //    if (_this.iBtn) {
    //        _this.begin();
    //    }
    //    _this.iBtn = false;
    //};
    this.pause.click(function () {
        console.log("pause");
        _this.pauseTime();
    });
    this.oContinue.click(function () {
        console.log("continue");
        _this._continue();
    });
}
AnswerTime.prototype.begin = function () {
    var _this = this;
    this.timer = setInterval(function () {
        if (_this.s == 59) {
            _this.s = 0;
            _this.m += 1;
            if (_this.m == 59) {
                _this.m = 0
                _this.h += 1;
            }
        } else {
            _this.s++;
        }
        $(".AnswerTime").html(_this.toTwo(_this.h) + ':' + _this.toTwo(_this.m) + ':' + _this.toTwo(_this.s));
    }, 1000)
}
AnswerTime.prototype.toTwo = function (n) {
    return n = n < 10 ? '0' + n : n;
}
AnswerTime.prototype.pauseTime = function () {
    clearInterval(this.timer);
    this.itemTime = $(".AnswerTime").text();
}
AnswerTime.prototype._continue = function () {
    this.begin();
    $(".AnswerTime").text(this.itemTime);
}
AnswerTime.prototype.stopTime = function () {
    clearInterval(this.timer);
    _this.iBtn = true;
}