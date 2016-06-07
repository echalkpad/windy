/**
*  description: 金程网校首页
*  author: windy随风缘
*  date: 2015-12-1
**************************************************/
$(function(){
	function autoPlay(){
		var w=$(window).width();


	if(w>768){
		$('.tg_video').css({
		'height':$(window).height(),
		'width':$(window).width()-300,
		})
		$('.tg_content').css({
			'width':$(window).width()-460,
			'height':$(window).height()-160,
		})
		$('.video_pic li').css({
			'height':$(window).height()-160,
			'background':'#000',
		})
	}



		/*弹窗滚动*/
		var tH=0;
		if(w<400){
			$('#XWrap').mousewheel(function(event,delta){
				if (delta<0) {
					tH=tH-10;
					if (tH<=-1260) {
						tH=-1260;
					}else{
					tH=tH-10;
					}
				}else{
					if (tH>=0) {
						tH=0;
					}else{
						tH=tH+10;
					}
				}
				console.log(tH);
				$('#popupInfo').css('top',tH);
			});
		}else if(w<600){
			$('#XWrap').mousewheel(function(event,delta){
				if (delta<0) {
					tH=tH-10;
					if (tH<=-1100) {
						tH=-1100;
					}else{
					tH=tH-10;
					}
				}else{
					if (tH>=0) {
						tH=0;
					}else{
						tH=tH+10;
					}
				}
				console.log(tH);
				$('#popupInfo').css('top',tH);
			});
		}else{
			$('#XWrap').mousewheel(function(event,delta){
				if (delta<0) {
					if (tH<=-1000) {
						tH=-1000;
					}else{
					tH=tH-10;
					}
				}else{
					if (tH>=0) {
						tH=0;
					}else{
						tH=tH+10;
					}
				}
				$('#popupInfo').css('top',tH);
			});
		}

		$('.tg_content').css('height','auto');
		function menuHeight1(){
			$('.menu').css('height',$(window).height());
			$('.tg_video').css('height',$(window).height());
			$('.tg_content').css({'width':100+'%'});
		}
		if(w<=768){
			menuHeight1();
		}
		function menuHeight2(){
			var prH=$('.tg_content').height();
			if (prH>$(window).height()-160) {
				$('.tg_content').css({
					'top':0,
					'margin-top':80,
				});
				$('.tg_video,.menu').css('height',prH+160);
			}else{
				$('.menu').css('height',$(window).height());
				$('.tg_content').css({
					'top':50+'%',
					'margin-top':-$('.tg_content').height()/2,
				});
			}
		}
		if (w<=768) {
			if ($('.tg_exercises').is(':hidden')) {
			console.log('yes');
			}else{
				menuHeight2();
			}
			if ($('.tg_checking').is(':hidden')) {
				console.log('no');
			}else{
				menuHeight2();
			}
		}


		if(w>768){
			$('.tg_content').css({
	       		'height':$(window).height()-160,
	       });
			$('.tg_exercises,.tg_checking').css({
	       		'height':$(window).height()-160,
	       });
       }

       if (w>768){
       		$('.video_pic img').css({
				'width':$('.tg_content').height()*16/9,
			});
       };

       var topH=$('.tg_content').height();
		if(w<=768){
			if($('.video_pic').is(':hidden')){
				console.log('1');
			}else{
				$('.tg_content').css({
					'margin-top':-topH/2,
					'top':50+'%',
					'position':'absolute',
				})
			}
		}else{
			if($('.video_pic').is(':hidden')){
				$('.tg_content').css({'position':'relative'})
			}
		}

		/*if(w<=768){
			if($('.video_pic').is(':hidden')){
				$('.prevT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":h2},500,function(){
						$(".tg_content").css({"top":-50*4+"%"});
						$(".tg_content").stop().animate({"top":0},500);
					});
				});
				$('.nextT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":-h2},500,function(){
						$(".tg_content").css({"top":50*4+"%"});
						$(".tg_content").stop().animate({"top":0},500);
					});
				});
			}else{
				$('.prevT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":50*4+"%"},500,function(){
						$(".tg_content").css({"top":-50+"%"});
						$(".tg_content").stop().animate({"top":50+"%"},500);
					});
				});
				$('.nextT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":-50+"%"},500,function(){
						$(".tg_content").css({"top":50*4+"%"});
						$(".tg_content").stop().animate({"top":50+"%"},500);
					});
				});
			}
		}else{
			if($('.video_pic').is(':hidden')){
				$('.prevT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":h2},500,function(){
						$(".tg_content").css({"top":-50+"%"});
						$(".tg_content").stop().animate({"top":0},500);
					});
				});
				$('.nextT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":-h2},500,function(){
						$(".tg_content").css({"top":50*4+"%"});
						$(".tg_content").stop().animate({"top":0},500);
					});
				});
			}else{
				$('.prevT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":h2},500,function(){
						$(".tg_content").css({"top":-50+"%"});
						$(".tg_content").stop().animate({"top":0},500);
					});
				});
				$('.nextT').click(function(event) {
					var h2=$(".tg_content").height();
					$(".tg_content").stop().animate({"top":-h2},500,function(){
						$(".tg_content").css({"top":50*4+"%"});
						$(".tg_content").stop().animate({"top":0},500);
					});
				});
			}
		}*/


		var h2=$('.tg_exercises .grade').height();
		var w2=$('.tg_exercises .grade').width();
		if(w<=768){
			$('.tg_exercises .grade').css({
				'margin-top':-h2/2,
				'margin-left':-w2/2,
				'position':'absolute',
				'left':50+'%',
				'top':45+'%'
			});
		}else{
			$('.tg_exercises .grade').css({
				'margin-top':-h2/2,
				'margin-left':-w2/2,
				'position':'absolute',
				'left':50+'%',
				'top':50+'%'
			});
		}
		if (w<=768) {
			$('.feedback').css({
				'margin-top':-h2/2,
				'margin-left':-w2/2,
				'position':'absolute',
				'left':50+'%',
				'top':33+'%'
			})
		}else{
			$('.feedback').css({
				'margin-top':-h2/2,
				'margin-left':-w2/2,
				'position':'absolute',
				'left':50+'%',
				'top':40+'%'
			})
		}



		// 模态框
		if (w>768) {
			$('.screen').css('height',$('tg_content').height());
		};
		$('#XWrap').css('height',$(document).height()-140);
		if (w<=768) {
			$('#popupInfoWrap').css('overflow-y','scroll')
		}else{
			$('#popupInfoWrap').css('overflow-y','hidden')
		}
	}
	autoPlay();
	$(window).resize(function(event) {
		autoPlay();
	});




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

	$('.achieve').click(function(event) {
		$(this).parent().parent().parent().stop().hide();
		$('.tg_exercises .title').stop().hide();
		$('.practice_grade').stop().show();
		autoPlay();
	});

	$('.enter_hcheck').click(function(event) {
		$('.tg_exercises').stop().hide();
		$('.tg_checking').stop().show();
		$('.grid li').removeClass('selector');
		$('.grid .search').addClass('selector');
	});





/*单选答题*/
$('.single_choice .options li,.dx .options li').click(function(){
	$(this).addClass('current').siblings().removeClass('current');

	//temp
	/*var allindex=$('.tg_exercises .options li').index($(this).parent());
	$('.sheet li').eq(allindex).addClass('grade_green');*/
})

/*多选答题*/
$('.Multiple_choice .options li,.sx .options li').click(function(){
	$(this).toggleClass('current');
})



$('.analyze .options .sf article i').click(function(event) {
	var allindex=$('.tg_exercises .options li').index($(this).parent().parent());
	$('.sheet li').eq(allindex).addClass('grade_green');
});



/*是非答题*/

$('.yes').click(function(){
	$(this).html('&#xea00;')
	$(this).siblings().html('&#xe958;')
})
$('.no').click(function(){
	$(this).html('&#xe9f5;')
	$(this).siblings().html('&#xe954;')
})








// 关闭弹出的小窗口
$('.tg_exercises .look,.tc_title i').click(function(){
	$('.tg_exercises .screen,.sheet,.finish,.stop,.next_time,.feedback').stop().hide();
})
// 纠错
$('.jiucuo').click(function(){
	$('.tg_exercises .screen,.feedback').stop().show();
})

$("#TextArea").keyup(function () {
    var maxLength = 100;//最大字符数
    var curLength = $("#TextArea").val().length;
    if (curLength > maxLength) {
        $("#TextArea").val($("#TextArea").val().substr(0, maxLength));//字符过多截取
    }
    else {
        $("#textCount").text(maxLength - curLength);//显示可输入字符数
    }
})


// 答题卡
$('.on_sheet').click(function(){
	$('.tg_exercises .screen,.sheet').stop().show();
})
// 下次再做
$('.on_next_time').click(function(){
	$('.tg_exercises .screen,.next_time').stop().show();
})
// 暂停再做
$('.tiTime').click(function(){
	$('.tg_exercises .screen,#stop').stop().show();
})
// 我要交卷
$('.on_finish').click(function(){
	$('.tg_exercises .screen,.finish').stop().show();
})
// 收藏
$('.shoucan').on('click',function(){
	$(this).toggleClass('signs');
	if ($(this).hasClass("signs")){
		$(this).html("<label class='icon-xing'>&#xe944;</label>收藏")
	}else{
		$(this).html("<label class='icon-xing'>&#xe945;</label>收藏");
	}
})


	if($(window).width()<=768){
		$('.qiehuan .next,.qiehuan .prev').click(function(){
			$('.parsing,.qiehuan span,.qiehuan q,.options .duigou').stop().hide();
			$('.options .duigou').parent().removeClass('current');
			$('.qiehuan section,.qiehuan div').stop().show();
			autoPlay();
		})
	}else{
		$('.qiehuan .next,.qiehuan .prev').click(function(){
			$('.parsing,.qiehuan span,.qiehuan q,.options .duigou').stop().hide();
			$('.options .duigou').parent().removeClass('current');
			$('.qiehuan section,.qiehuan div').stop().show();
		})
	}
	// 点击切换提交
	$('.qiehuan .last').click(function(){
		$(this).parent().parent().parent().find('.parsing,.qiehuan span,.qiehuan q').stop().show();
		$(this).parent().stop().hide();
		$('.qiehuan section,.qiehuan div').stop().hide();
		/*$(this).parent().parent().parent().find('.options .duigou').parent().addClass('current');*/
		if ($(window).width()<769){
			autoPlay();
		};
	})














// 知识检测_提交
$('.tg_checking .sub').click(function(event) {
	$('.tg_checking .screen,.practice_score').stop().show();
	autoPlay();
});
// 选择已掌握的知识
$('.iknow li').click(function(event) {
	$(this).toggleClass('current');
});

// 点击右侧菜单拉出
var off=0;
if ($(window).width()<=768){
		$('.close').click(function(){
		if(off==0){
			$(this).html("<i>&#xea01;</i>");
			$('.menu').stop().animate({
				right:-286,
			},600);
			off=1;
		}else{
			$(this).html("<i>&#xea02;</i>");
			$('.menu').stop().animate({
				right:0,
			},600);
			off=0;
		}
	})
}else{
	$('.close').click(function(){
		if(off==0){
			$(this).html("<i>&#xea01;</i>");
			$('.menu').stop().animate({
				right:-300,
			},600);
			$('.tg_video').stop().animate({
				'width':100+'%',
			},600);
			$('.tg_content').stop().animate({
				'width':$(window).width()-160,
			},600)
			off=1;
		}else{
			$(this).html("<i>&#xea02;</i>");
			$('.menu').stop().animate({
				right:0,
			},600);
			$('.tg_video').stop().animate({
				'width':$(window).width()-300,
			},600);
			$('.tg_content').stop().animate({
				'width':$(window).width()-460,
			},600);
			off=0;
		}
	})
}




/*菜单切换页面*/
$('.menu_head li').click(function(event) {
	$(this).addClass('selector').siblings('.menu_head li').removeClass('selector');
	var index1=$(this).index();
	$('#all_content>div').eq(index1).addClass('current').siblings('#all_content>div').removeClass('current');
});
/*菜单列表*/

if ($(window).width()<=768) {
	$('.grid li').click(function(event) {
		$(this).addClass('selector').siblings('.grid li').removeClass('selector');
		$('.video_pic,.tg_exercises,.tg_checking').stop().hide();
		$('.close').click();
	});
}else{
	$('.grid li').click(function(event) {
		$(this).addClass('selector').siblings('.grid li').removeClass('selector');
		$('.video_pic,.tg_exercises,.tg_checking').stop().hide();
	});
}
$('.video').click(function(event) {
	$('.video_pic').stop().show();
	autoPlay();
});
$('.edit').click(function(event) {
	$('.tg_exercises').stop().show();
	autoPlay();
});
$('.search').click(function(event) {
	$('.tg_checking').stop().show();
	autoPlay();
});
/* 问题模块的切换*/
$('.question_head p').click(function(){
	$('.question_head p').children('span').removeClass('world_blue');
	$(this).children('span').addClass('world_blue');
	var index1=$(this).index();
	$('.comm').eq(index1).css('display','block').siblings('.comm').css('display','none');
})
/*笔记模块的切换*/
$('.note_head p').click(function(){
	$('.note_head p').children('span').removeClass('world_blue');
	$(this).children('span').addClass('world_blue');
	var index1=$(this).index();
	$('.comm1').eq(index1).css('display','block').siblings('.comm1').css('display','none');
})
/*点击输入笔记出现截图*/
$('.myNote .me_write textarea').focus(function(event) {
	$('.myNote .cj').stop().show();
});
/*点击输入提问*/
$('.myQues .me_write textarea').focus(function(event) {
	$('.myQues .cj').stop().show();
});
/*点击弹出评论页面*/
$('.question .msg_n').click(function(){
	$('#XWrap').stop().show();
})
/*点击评论*/
$('.replay_h').click(function(event) {
	$(this).parent().parent().parent().find('.come_answer,.sbt').stop().show();
});

$('#XWrap #X').click(function(){
	$('#XWrap').stop().hide();
})





})


/*$(".continue").live("click", function () {
        InterValObj = window.setInterval(SetRemainTime, 1000);
    })
$(".pause").click(function () {
    window.clearInterval(this.timer);
})*/



//答题计时
function AnswerTime(obj){
	this.obj = obj;
	this.pause = document.getElementById('tiTime');
	this.oContinue = $(".tg_continue")[0];
	this.h = 0;
	this.m = 0;
	this.s = 0;
	this.timer = null;
	this.iBtn = true;
	this.itemTime = '';
}
AnswerTime.prototype.init = function(){
	var _this = this;
	this.obj.onclick = function(){
		if(_this.iBtn){
			_this.begin();
		}
		_this.iBtn = false;
	};
	this.pause.onclick = function(){
		_this.pauseTime();
	}
	this.oContinue.onclick = function(){
		_this._continue();
	}
}
AnswerTime.prototype.begin = function(){
	var _this = this;
	this.timer = setInterval(function(){
		if(_this.s == 59){
			_this.s = 0;
			_this.m += 1;
			if(_this.m == 59){
				_this.m = 0
				_this.h += 1;
			}
		}else{
			_this.s++;
		}
		$(".AnswerTime").html(_this.toTwo(_this.h) + ':' + _this.toTwo(_this.m) + ':' + _this.toTwo(_this.s));
	},1000)
}
AnswerTime.prototype.toTwo = function(n){
	return n = n < 10 ? '0' + n : n;
}
AnswerTime.prototype.pauseTime = function(){
	clearInterval(this.timer);
	this.itemTime = $(".AnswerTime").text();
}
AnswerTime.prototype._continue = function(){
	this.begin();
	$(".AnswerTime").text(this.itemTime);
}
AnswerTime.prototype.stopTime = function(){
	clearInterval(this.timer);
	_this.iBtn = true;
}

var AT = new AnswerTime($("#con_1 li:eq(1)")[0]);
AT.init();
