// JavaScript Document
$(function(){
	
	//secTabs切换
	$(".J_secTabs").each(function(){
		var timeout = 300;
		var delay = 0;
		var a = $(this).find("li"), b = $(this).next().children(), c = $(this).find("em"); 
		
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
	
	
	/** 学员评论   **/
	/*点击回复按钮出输入框*/
	$('.replybtn').live("click",function(){
		
		if($(".stucommt").children().hasClass("stureplay")){
            $(".stureplay").remove();
            return false;
        }
		$(this).parent().parent().parent().find(".sturep_msg").after($("<div class='stureplay'><textarea></textarea><p class='stusbt'><i class='icon-smile emotion'>&#xe62f;</i><em>表情</em><i class='icon-pic'>&#xe62e;</i><em>图片</em><span>您还可以输入140字<a class='stu_rep' href='javascript:;'>回复</a></span></p></div>"));

	//	$(".stucomment").find(".sturep_msg").after($("<div class='stureplay'><form><input type='text' /></form><p class='stusbt'><i></i>表情<i></i>图片<span>您还可以输入140字<a class='stu_rep' href='javascript:;'>回复</a></span></p></div>"));
	})
	
	//评论楼主
	/* 修改 start start */
	$(".stucoment_btn").live("click",function(){
		if($(".stucheck textarea").val() == ''){
            return false;
        }
		
		/* 评论成功 start */
		$('.commentok').show();
		setTimeout(function(){
			$('.commentok,.forward').fadeOut(200);
		},1000);
		/* 评论成功 end */
		
		$(".stucheck").after($("<div class='stucommt'><div class='stuct'><dl><dt><img src='pic/sone.png' /></dt><dd>学员<a class='name' href='javascript:;'>alextang</a>对<a class='name' hrel='javascript:;'>无有取证班</a>评论</dd><dd>"+replace_em($(this).parent().parent().prev().val())+"</dd><dd><span class='dtime'>2015/8/4 10:30</span><em class='stucmtbtn'>回复<span>12</span></em><em><i class='icon-zan'>&#xe600;</i><span>5</span></em></dd></dl></div></div>"));
	})
	
	
	
	$('.stucmtbtn').live('click',function(){
      	$(this).parent().parent().after($("<div class='stuinput'><textarea class='input saytext' name='saytext'></textarea><p class='stusbt'><i class='icon-smile emotion'>&#xe62f;</i><em>表情</em><i class='icon-pic'>&#xe62e;</i><em>图片</em><span>您还可以输入140字<a class='sturepbtn' href='javascript:;'>回复</a></span></p></div>"))	
    })
	
	$('.sturepbtn').live('click',function(){
		$(this).parent().parent().after($("<div class='sturemsg'><dl><dt><img src='pic/sone.png' /></dt><dd>学员<a class='name' href='javascript:;'>alextang</a>对<a class='name' hrel='javascript:;'>无有取证班</a>评论</dd><dd>"+replace_em($(this).parent().parent().prev().val())+"</dd><dd><span class='dtime'>2015/8/4 10:30</span><em class='stucmtbtn'>回复<span>12</span></em><em><i class='icon-zan'>&#xe600;</i><span>5</span></em></dd></dl></div>"));
		$(this).parent().parent().prev().remove();
		$(this).parent().parent().remove();
	})
	
   /* 修改  end */	


/*	$(".stucoment_btn").live("click",function(){
		if($(".stucheck textarea").val() == ''){
            return false;
        }
		
		
		$('.commentok').show();
		setTimeout(function(){
			$('.commentok,.forward').fadeOut(200);
		},2000);
	
		
		$(".stucheck").after($("<div class='stucommt'><a href='javascript:;'><img src='pic/sone.png' alt='学员one' /></a><div class='stutext'><p>学员<a href='javascript:;'>alextang</a>对<a href='javascript:;'>无忧取证班</a>的评价<span>6小时前</span></p><h3>" + replace_em($(".stucheck textarea").val()) + "</h3><p><a class='replybtn' href='javascript:;'>回复</a></p></div><div class='sturep_msg'></div></div>"));
	})
	*/
	//回复框提交
	$(".stu_rep").live("click",function(){

		if($(".stureplay textarea").val() == ''){
			return false;
		}
		
		/* 回复成功 start */
		$('.replayok').show();
		setTimeout(function(){
			$('.replayok,.forward').fadeOut(200);
		},1000);
		/* 回复成功 end */
		
		$(".stureplay").after($("<div class='sturetext'><a href='javascript:;'><img src='pic/sone.png' alt='学员one' /></a><div class='stutext'><p>学员<a href='javascript:;'>alextang</a>对<a href='javascript:;'>无忧取证班</a>的评价</p><h3>" + replace_em($(".stureplay textarea").val()) +"</h3><p><a class='replybtnagain' href='javascript:;'>回复</a></p></div></div>"));
		$(".stureplay").remove();
	})
	
   $(".replybtnagain").live("click",function(){
        if($(".stucommt").children().hasClass("stureplay")){
            $(".stureplay").remove();
            return false;
        }
        $(this).parent().parent().parent().after($("<div class='stureplay'><textarea></textarea><p class='stusbt'><i class='icon-smile emotion'>&#xe62f;</i><em>表情</em><i class='icon-pic'>&#xe62e;</i><em>图片</em><span>您还可以输入140字<a class='stu_rep' href='javascript:;'>回复</a></span></p></div>"));
    })


	/**  新鲜事   **/
	//显示评论
     $(".else_comments").on('click',function(){
    //	$(this).parent().parent().next('.inputtext').show()
        $(this).parent().parent().parent().css('border-bottom-color','#fff');
 		$(this).parent().parent().after($("<div class='inputtext'><i class='arror'></i><p>共20条 <i class='closecomt icon-close'>&#xe667;</i></p><textarea class='input saytext' name='saytext'></textarea><p class='comtxtbtn'><i class='icon-smile emotion'>&#xe62f;</i><em>表情</em><i class='icon-pic'>&#xe62e;</i><em>图片</em><span>您还可以输入140字<a class='nt_replaynext' href='javascript:;'>回复</a></span></p><dl class='comet'><dt><img src='pic/sone.png' /></dt><dd><a href='javascript:;'>alextang</a></dd><dd>【公开直播】上海新年卡上线，惊喜不间断~韬哥小帆联合直播再次来袭！针对新六年级的孩子们，想要知道如何在预初继续保持领先么？那就不要错过5月12日晚7点30分的直播呦~直播链接：<a href='javascript:;'>//t.xueersi.com/0KqRcJP9</a></dd><dd><span class='dtime'>2015/8/4 10:30</span><em class='repbtn'>回复<span>12</span></em><em><i class='icon-zan'>&#xe600;</i><span>5</span></em></dd></dl></div>"));
    })

	//关闭评论
	$('.closecomt').live('click',function(){
		$(".onenthing").css('border-bottom-color','#ccc');
		$(this).parent().parent().hide();
	})
	
	//进行评论
/*	$(".commentlz").each(function(){
		$(this).live("click",function(){

			if($(this).parent().parent().prev("textarea").val() == ''){
				return false;
			}
			// 评论成功 start 
			$('.commentok').show();
			setTimeout(function(){
				$('.commentok,.forward').fadeOut(200);
			},2000);
			
			
			$(this).parent().parent().after($("<div class='reply'><img src='pic/sone.png' /><div class='remsg'><p class='show'><span class='name'>alextang</span><span class='elsename'>@金程的粉丝</span><span class='elsePic cf'>"+$(this).parent().parent().prev("textarea").val()+"</span></p><p class='comentnum'><span class='zftime'>3小时前</span><em class='nt_btnagain'>回复</em><em><i class='icon-zan'>&#xe600;</i><span>5</span></p></div></div>"));
			$(this).parent().parent().next().find(".elsePic").html(replace_em($(this).parent().parent().prev("textarea").val()));
		})
	})
*/	

	//对评论者的回复
	$('.nt_btnagain').live("click",function(){

		if($('.reply textarea').val() == ''){
			$(".inputtext").remove();
			return false;
		}
		$(this).parent().after($("<div class='inputtext'><i class='arror'></i><textarea></textarea><p class='comtxtbtn'><i class='icon-smile emotion'>&#xe62f;</i><em>表情</em><i class='icon-pic'>&#xe62e;</i><em>图片</em><span>您还可以输入140字<a class='nt_replaynext' href='javascript:;'>回复</a></span></p></div>"));
	})
	
	$('.nt_replaynext').live('click',function(){
		
		if($(this).parent().parent().prev().val() == ''){
			return false;
		}
		$(this).parent().parent().after($("<dl class='comet'><dt><img src='pic/sone.png' /></dt><dd><a href='javascript;:'>alextang</a></dd><dd>"+replace_em($(this).parent().parent().prev('textarea').val())+"</dd><dd><span class='dtime'>2015/8/4 10:30</span><em class='repbtn'>回复<span>12</span></em><em><i class='icon-zan'>&#xe600;</i><span>5</span></em></dd></dl>"));
		//$(this).parent().parent().parent().next().find(".elsePic").html('<img src="images/teacher/face/1.gif" border="0" />');
		if($('.write_box textarea').val() == '' ){
			return false;
		}
		$(".write_box").children('textarea,.comtxtbtn').remove();
		
		$('.replayok').show();
		setTimeout(function(){
			$('.replayok,.forward').fadeOut(200);
		},1000);
	});

    /*$('.nt_replaynext').live('click',function(){
        $('.nt_btnagain').text("回复");

        if($('.reply textarea').val() == ''){
            return false;
        }
        $(this).parent().parent().parent().after($("<div class='replyagain'><img src='pic/sone.png' /><p class='show'><span class='name'>alextang</span><span class='elsename'>@金程的粉丝</span><span class='elsePic cf'>"+$(this).parent().parent().prev("textarea").val()+"</span></p><p class='comentnum'><span>3小时前</span><em class='nt_btnagain'>回复</em></p></div>"));
        $(this).parent().parent().parent().next().find(".elsePic").html(replace_em($(this).parent().parent().prev("textarea").val()));

        $(".inputtext").remove();
    })*/
	
	/* 新鲜事个人页 */
	$('.nt_ntrenext').live('click',function(){
		
		if($('.inputtext textarea').val() == ''){
			return false;
		}
		$(this).parent().parent().parent().after($("<dl class='comet'><dt><img src='pic/sone.png' /></dt><dd><a href='javascript;:'>alextang</a>"+replace_em($(this).parent().parent().prev('textarea').val())+"</dd><dd><span class='dtime'>2015/8/4 10:30</span><em class='ntreply'>回复<span>12</span></em><em><i class='icon-zan'>&#xe600;</i><span>5</span></em></dd></dl>"));
		//$(this).parent().parent().parent().next().find(".elsePic").html(replace_em($(this).parent().parent().prev("textarea").val()));
		if($('.write_box textarea').val() == '' ){
			return false;
		}
		$(".inputtext").remove();
		$('.replayok').show();
		setTimeout(function(){
			$('.replayok,.forward').fadeOut(200);
		},1000);
	})
	
	
	//点击回复
	$('.repbtn').live('click',function(){
        if($(this).parent().parent().next(".write_box").find("textarea").val() == ''){
            return false;
        }
		$(this).parent().parent().after($("<div class='write_box'><textarea></textarea><p class='comtxtbtn'><i class='icon-smile emotion'>&#xe62f;</i><em>表情</em><i class='icon-pic'>&#xe62e;</i><em>图片</em><span>您还可以输入140字<a class='nt_renext' href='javascript:;'>回复</a></span></p></div>"));	
	})
	$('.nt_renext').live('click',function(){
		
		if($('.write_box textarea').val() == ''){
			return false;
		}
		
		$(this).parent().parent().after($("<dl class='comet'><dt><img src='pic/sone.png' /></dt><dd><a href='javascript;:'>alextang</a></dd><dd>"+replace_em($(this).parent().parent().prev('textarea').val())+"</dd><dd><span class='dtime'>2015/8/4 10:30</span><em class='repbtn'>回复<span>12</span></em><em><i class='icon-zan'>&#xe600;</i><span>5</span></em></dd></dl>"));
		$('.write_box .comtxtbtn,.write_box textarea').remove();
		
		$('.replayok').show();
		setTimeout(function(){
			$('.replayok,.forward').fadeOut(200);
		},1000);
	})
	
	
//新鲜事个人页回复
$('.ntreply').live('click',function(){
    if($(this).parent().parent().next(".inputtext").find("textarea").val() == ''){
        return false;
    }
	$(this).parent().parent().after($("<div class='inputtext'><i class='arror'></i><textarea class='input saytext' name='saytext'></textarea><p class='comtxtbtn'><i class='icon-smile emotion'>&#xe62f;</i><em>表情</em><i class='icon-pic'>&#xe62e;</i><em>图片</em><span>您还可以输入140字<a class='nt_ntrenext' href='javascript:;'>回复</a></span></p></div>"));
})
	/* 针对 nthingpage */
$(".commentlz").each(function(){
	$(this).live("click",function(){

		if($(this).parent().parent().prev("textarea").val() == ''){
			return false;
		}
		// 评论成功 start 
		$('.commentok').show();
		setTimeout(function(){
			$('.commentok,.forward').fadeOut(200);
		},1000);

		$(this).parent().parent().after($("<div class='reply'><dl><dt><img src='pic/sone.png' /></dt><dd>神神叨叨<a href='javascript:;'>@alextang</a><span>"+replace_em($(this).parent().parent().prev('textarea').val())+"</span></dd><dd><span class='dtime'>2015/8/4 10:30</span><em class='ntreply'>回复<span>12</span></em><em><i class='icon-zan'>&#xe600;</i><span>5</span></em></dd></dl></div>"));
		$(this).parent().parent().next().find(".elsePic").html(replace_em($(this).parent().parent().prev("textarea").val()));
	})
})
	
	
	
	//QQ表情
	$('.emotion').qqFace({
		id : 'facebox', //表情盒子的ID
		assign:'saytext', //给那个控件赋值
		path:'images/teacher/face/'	//表情存放的路径
	});
	$(".commentlz").click(function(){
		//var str = $("#saytext").val();
		//$("#show").html(replace_em(str));
	});
	
	/* 首页头部  start */
	$(".topheader article").children('section').hide();
	$("#school").children('i').hide();
	
	$("#school").hover(function(){
		$(this).children('i').css('display','inline-block');
		$(".topheader article").children('section').show();
	},function(){
		$(this).children('i').hide();
		$(".topheader article").children('section').hide();
	})

	$(".topheader article").children('section').hover(function(){
		$("#school").children('i').css('display','inline-block');
		$(this).show();
	},function(){
		$("#school").children('i').hide();
		$(this).hide();
	});	
	/* 首页头部  end */
	
	/* 图片上传弹框  */
	//点击上传图片
	$('.icon-pic').live('click',function(){
		$(this).parent().after($("<section class='pic_road pic_roadload'><i></i><em class='closepic'>X</em><h5><input type='text' /><input type='button' value='图片路径' /></h5><p>紧支持JPG、PNG图片文件,且文件小于5M</p></section>"));
	//	$('.pic_roadload').show();
	})
	
	//上传图片关闭
	$('.closepic').live('click',function(){
		$(this).parent().hide();
	})
	
	/* 转发关闭  */
	$('.closeford').on('click',function(){0
		$(this).parent().parent().hide();
	})
	
	/* 点击转发 */
	$('.comforward').on('click',function(){
		$('.forward1').show();
		$(".forward1 .forwardName").text('@'+$(this).parents(".onenthing").find(".name").text());
		$(".forward1 .forwardCont").text($(this).parents(".onenthing").find(".cmttext").text());
	})
	$('.comforwardagain').on('click',function(){
		$('.forward2').show();
		$(".forward2 .forwardName").text($(this).parents(".forward_cont_list").find(".name").text());
		$(".forward2 .forwardCont").text($(this).parents(".forward_cont_list").find(".cont").text());
	})
	
	//转发提交
	/*$('.forwardbtn').on('click',function(){
		$('.forwardok').show();
		var $_this = $(this);
		setTimeout(function(){
			$('.forwardok').fadeOut(200);
			$('.forward').fadeOut(200);
			var str = '<div class="forward_cont_list"><h2><span class="name">' + $_this.parents("") + '</span><p class="cont">3【公开直播】上海新年卡上线，惊喜不间断~韬哥小帆联合直播再次来袭！针对新六年级的孩子们，想要知道如何在预初继续保持领先么？那就不要错过5月12日晚7点30分的直播呦~直播链接：http://t.xueersi.com/0KqRcJP9</p></h2><p><em class="comforwardagain">转发<span>12</span></em><em class="else_comments_again">评论<span>12</span></em><em><i class="icon-smile emotion"></i><span>5</span></em></p></div>';
			$(".meforward article h6").after()
		},2000);
	})*/

    //转发提交
    $('.forwardbtn').on('click',function(){
        $('.forwardok').show();
        var $_this = $(this);
        var mySayText = replace_em($_this.parents(".forwardcont").find(".saytext").val());
        if(mySayText == ''){
            mySayText = '转发';
        }
        setTimeout(function(){
            $('.forwardok').fadeOut(200);
            $('.forward').fadeOut(200);
            //var str = '<div class="meforward"><h4>' + mySayText + '</h4><article><h6></h6><div class="forward_cont_list"><h2><span class="name">' + $_this.parents(".forwardcont").find(".forwardName").text() + '</span><p class="cont">' + $_this.parents(".forwardcont").find(".forwardCont").text() + '</p></h2><p><em class="time">2015/7/19 07:20 </em> <em class="comforwardagain">转发<span>12</span></em><em class="else_comments_again">评论<span>12</span></em><em><i class="icon-zan">&#xe600;</i><span>5</span></em></p></div></article><p class="nowtime">2015/7/19 07:20</p><!-- 回复 start --><div class="comments"><i class="topsj"></i><p>共20条<i class="closecomt">X</i></p><textarea class="input saytext" name="saytext"></textarea><p class="comtxtbtn"><i class="icon-smile emotion"></i><em>表情</em><i class="icon-pic"></i><em>图片</em><span>您还可以输入140字<a class="commentlz" href="javascript:;">评论</a></span></p><section class="pic_road pic_roadload"><i></i><em class="closepic">X</em>	<h5><input type="text"><input type="button" value="图片路径"></h5><p>紧支持JPG、PNG图片文件,且文件小于5M</p></section><section class="pic_road pic_roadok"><i></i><em class="closepic">X</em><p>我在学习.jpg<span>删除</span></p><img src="cfa/images/cfaexam/application/appli1.png" alt=""><h5><input type="text" placeholder="图片描述文字"><input type="button" value="确定发布"></h5></section><p></p><p class="morecomt"><a href="javascript:;">更多评论</a></p></div><!-- 回复 end --></div>';
            var str = '<div class="meforward"><div class="wardtext"><dl><dt><img class="picname" src="pic/sone.png"></dt><dd class="name">' + $_this.parents(".forwardcont").find(".forwardName").text() + '</dd><dd>' + mySayText + '</dd><dd><article><i></i><a class="name" href="javascript:;">' + '@' + $_this.parents(".forwardcont").find(".forwardName").text().substring(1) + '</a>' + $_this.parents(".forwardcont").find(".forwardCont").html() + '<p><em class="time">2015/7/19 07:20 </em> <em class="comforwardagain">转发<span>12</span></em><em><a href="newthings.html">评论<span>12</span></a></em><em><i class="icon-zan"></i><span>5</span></em></p></article></dd><dd class="nowtime"><span class="ntime">2015/7/19 07:20</span><em class="comforwardagain">转发<span>12</span></em><em class="else_comments_again">评论<span>12</span></em><em><i class="icon-zan"></i><span>5</span></em></dd></dl></div></div>'
            $(".newthings").prepend(str);
        },2000);
    })
	
	//转发内容的评论
	$(".else_comments_again").on('click',function(){
		$(this).parent().parent().parent().find('.comments').show();
	})

	//转发内容框
	function showForwardcont1(){
		//var str = '<div class="forwardcont"><em class="closeford">X</em><h2>转发到新鲜事</h2><p><span>' + $(this).parents(".forward_cont_list").find(".name") + '</span><p>' + $(this).parents(".forward_cont_list").find(".name") + '</p><textarea class="input saytext" placeholder="//@alext" name="saytext"></textarea><h5><i class="icon-smile emotion"></i><input type="checkbox">同时评论给转发人alert</h5><h5 class="fordauth"><input type="checkbox">同时评论给原作者alert</h5><a href="javacript:;" class="forwardbtn">转发</a><h6>当前已转发<span>34400</span>次</h6></div>'
		
	}
	function showForwardcont2(){
		//var str = '<div class="forwardcont"><em class="closeford">X</em><h2>转发到新鲜事</h2><p><span>' + $(this).parents(".forward_cont_list").find(".name") + '</span><p>' + $(this).parents(".forward_cont_list").find(".name") + '</p><textarea class="input saytext" placeholder="//@alext" name="saytext"></textarea><h5><i class="icon-smile emotion"></i><input type="checkbox">同时评论给转发人alert</h5><h5 class="fordauth"><input type="checkbox">同时评论给原作者alert</h5><a href="javacript:;" class="forwardbtn">转发</a><h6>当前已转发<span>34400</span>次</h6></div>'
		
	}
	
	/* 赞效果 */
	var clicknum = 0 ;
	$('.icon-zan').live('click',function(){
		$(this).toggleClass('zscale');
		var num = parseInt($(this).next().html());
		
		clicknum++;
		if(clicknum%2 > 0) {
			num++;
		} else {
			num--;
		}
		$(this).next().html(num);
	})
	
	/* 第二次转发输入框内容 */
	$('.forward2').children().find('textarea').html("//@叽叽歪歪: 转发微博");
	
});



//QQ表情查看结果
function replace_em(str){
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="images/teacher/face/$1.gif" border="0" />');
	return str;
}



