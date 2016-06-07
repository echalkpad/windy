$(function(){
	var h=$(window).height();
	var w=$(window).width();

	// 导航
	$('.navbadge').click(function() {
		$('.dropdown-menu').stop().slideToggle();
		$(".dropdown-info").stop().slideUp();
	});
	$('.navuser').click(function() {
		$('.dropdown-info').stop().slideToggle();
		$(".dropdown-menu").stop().slideUp();
	});

	$(document).bind("click",function(e){
		var target = $(e.target);
		if(target.closest(".navbadge,.navuser").length == 0){
			$(".dropdown-menu,.dropdown-info").stop().slideUp();
		}
	})

	// 宣传视频弹出
	$('.ss-banner li:eq(0)').click(function(event) {
		$("#video_modal1").stop().show();
	});
	$('.ss-banner li:eq(1)').click(function(event) {
		$("#video_modal2").stop().show();
	});

	// 首页进度条的拖动
	$('.ss-pop .progress_bar input').change(function(){
		var num=$(this).val();
		$(this).parent().find('em').html($(this).val());
		num=parseInt(num);
		$(this).parent().find('em,i').css({
			'left': num*9.91666,
		});
		$(this).parent().parent().find('.progress_bar_bg').css({
			'width': num*9.91666+16,
		});
	})

	// 首页进度条圆饼图
	 $('.col-1 .circle,.col-3 .circle').each(function(index, el) {
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



	/*下面是题库练习右侧筛选菜单 start*/
	// 菜单高度
	$('.screen_menu').css('height',h-50);

	// 右侧菜单切换推出
	$('.ss_practice .head_nav div').click(function(){
		$('.screen_menu').addClass('open');
	})
	$('.screen_menu .hd q,.pra_main').click(function(){
		$('.screen_menu').removeClass('open');
	})
	// 筛选
	$('.directory section').click(function(event) {
		$('.directory ul').stop().hide();
		$(this).addClass('selector');
		$(this).parent().find('ul').stop().show();
	});
	$('.directory ul li').click(function(event) {
		$(this).parent().parent().find('button').html($(this).children('a').html());
		$(this).parent().parent().find('section').removeClass('selector');
		$(this).parent().stop().hide();
	});
	// 发现群组
	$('.finder_list .fd_hd a').click(function(event) {
		if ($(this).parent().parent().hasClass('an')){
			$(this).html("<i>&#xe623;</i>");
			$(this).parent().parent().removeClass('an');
		}else{
			$(this).html("<i>&#xe644;</i>");
			$(this).parent().parent().addClass('an');
		}
	});


	/*下面是题库练习右侧筛选菜单 end*/

	/*下面是题库练习答题 start*/
	// 收藏
	$('.right_number a,.demo_top a').click(function(event) {
		var tag1=$('<li><h3>已取消收藏</h3></li>');
		var tag2=$('<li><h3>收藏成功</h3></li>');
		if ($(this).hasClass('selector')){
			$(this).html("<i>&#xe90c;</i>")
			$(this).removeClass('selector');
			$('.create').prepend(tag1);
		}else{
			$(this).html("<i>&#xe90b;</i>")
			$(this).addClass('selector');
			$('.create').prepend(tag2);
		}
		$('.create h3').delay(4000).addClass('hide_show');
	});
	$('.choice li').click(function(event) {
		$(this).addClass('selector').siblings().removeClass('selector');
		$('.submit').addClass('selector');
		$('.result ._right').html("<p>您选择&nbsp;"+$(this).children('span').html()+", 对了!</p>");
		$('.result ._wrong').html("<p>您选择&nbsp;"+$(this).children('span').html()+", 错了!</p>");
	});
	// 提交
	$('.submit').click(function(event) {
		if($(this).hasClass('selector')){
			$('.result div,.result h4').addClass('hide');
			$('.result ._right,.parsing').removeClass('hide');
			$(this).parent().html("<button class='continue btn'>继续</button>")
			$('.option_list').addClass('hide');
		}
	});
	/*下面是题库练习答题 end*/

	/*下面是题库练习答题卡 start*/
	// 答题卡弹出
	$('.ss_practice .number small').click(function(event) {
		$('.ss_practice .sheet').addClass('sheet_up');
	});
	// 答题卡关闭
	$('.ss_practice .s_head .close').click(function(event) {
		$('.ss_practice .sheet').removeClass('sheet_up');
	});
	// 答题卡tabel切换
	$('.s_head section span').click(function(event) {
		$(this).addClass('selector').siblings().removeClass('selector');
	});
	/*下面是题库练习答题卡 end*/


	/* start*/
	$('.head_title button').click(function(event) {
		$('.video_pop').removeClass('hide');
	});
	// 关闭弹出层
	$('.pop_head article a').click(function(event) {
		$('.video_pop').addClass('hide');
	});

	/*视频播放答题弹出 end*/


	/*视频播放右侧菜单 start*/
	$('.video_btn span').click(function(event) {
		if($('.ss_menu').hasClass('launch_right')){
			if($(this).hasClass('selector')){
				$('.ss_menu').removeClass('launch_right');
				$('.video_main').removeClass('launch_left');
			}
		}else{
			$('.ss_menu').addClass('launch_right');
			$('.video_main').addClass('launch_left');
		}

		$(this).toggleClass('selector').siblings().removeClass('selector');
		var index=$(this).index();
		$('.ss_menu>div').eq(index).addClass('current').siblings('.ss_menu>div').removeClass('current');
	});

	// 笔记
	$('.text_body textarea').keyup(function(event) {
		var curLength = $(this).val().length;
		if (curLength>0){
			$('.note_foot button').addClass('selector');
		}else{
			$('.note_foot button').removeClass('selector');
		};
	});

	/*视频播放右侧菜单 end*/

})



 $(document).ready(function(){

 	/*学习计划 start*/

    // 学习区域的宽度


    $('.learningcon li').hover(function() {
    	var index=$(this).index();
    	$(this).parent().parent().parent().parent().parent().find('.learninglist dd').eq(index).css({'background':'#ddd'});
    }, function() {
    	$('.learninglist dd').css({'background':'none'})
    });

	$('.bankcon li').hover(function() {
    	var index=$(this).index();
    	$(this).parent().parent().parent().parent().parent().find('.banklist dd').eq(index).css({'background':'#ddd'})
    }, function() {
    	$('.banklist dd').css({'background':'none'})
    });

	// 修改学习计划
	$('.spttl button').click(function(event) {
		$(this).parent().parent().find('.sprow,.spttl').addClass('hide');
		$(this).parent().parent().find('.ss-pop').removeClass('hide');
	});
	 // 取消修改
	 $('.ss_date .default').click(function(event) {
	 	$(this).parent().parent().parent().addClass('hide');
	 	$(this).parent().parent().parent().parent().find('.sprow,.spttl').removeClass('hide');
	 });
	// 学习时长弹窗弹出
	$('.ss_date .next').click(function(event) {
		$(this).parent().parent().addClass('hide');
		$(this).parent().parent().parent().find('.ss_duration').removeClass('hide');
	});
	// 上一步
	$('.ss_duration .default').click(function(event) {
		$(this).parent().parent().addClass('hide');
		$(this).parent().parent().parent().find('.ss_date').removeClass('hide');
	});

	// 日期限制
	$('.ss_duration .next').click(function(event) {
		var tag3=$('<div class="date_limit"><h3 class="hide_show">如果你设置开始日期为2016-02-29，你需要每天学习3.5小时</h3></div>')
		$("body").append(tag3);
	});


    $('.shbar').click(function(){
        $('#modal_knowledge').stop().show();
    })
    $('.close').click(function(){
        $('.modal').stop().hide();
    })

	// 课程与学习计划的切换
	$('.container .course_s').click(function(event) {
		$(this).parent().parent().parent().parent().find('.ss-studyplan').addClass('hide');
		$(this).parent().parent().parent().parent().find('.ss-contain').removeClass('hide');
	});
	$('.container .study_p').click(function(event) {
		$(this).parent().parent().parent().parent().find('.ss-contain').addClass('hide');
		$(this).parent().parent().parent().parent().find('.ss-studyplan').removeClass('hide');
		var sprowh=$(this).parent().parent().parent().parent().find('.sprow').height();
	    var ddtotal = $(this).parent().parent().parent().parent().find('.shdate').find('dd').length;
	    var h1=$(this).parent().parent().parent().parent().find('.sprowtree').outerHeight();//左侧区高度


	    var shcontenth=$(this).parent().parent().parent().parent().find('.shcontent').height();
	    $(this).parent().parent().parent().parent().find('.shreview').css('height',shcontenth);//复习区高度

	    $(this).parent().parent().parent().parent().find('.shbox').css('width',ddtotal*30);//右侧内容区长度

	    var video_w=200;//视频学习总时间
	    var time_d=3;//每天学习时长
	    var video_d=Math.ceil(video_w/time_d);//学习天数

	    // 学习区域的宽度

	    $(this).parent().parent().parent().parent().find('.shcontent').css({
	    	width: video_d*30,
	    });


	});
	/*学习计划 end*/

	// 我的课程与体验课的切换
	$('.myttl li').click(function(event) {
		$(this).addClass('active').siblings().removeClass('active');
		var index=$(this).index();
		$('.ss_ctn').eq(index).addClass('show').siblings().removeClass('show');
	});

})

