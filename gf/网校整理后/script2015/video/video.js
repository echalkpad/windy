
$(function(){
	
	/* 点击输入框出现提交截图的内容  Start */
	$('.cj').hide();
	$('.myQues .write_note').focus(function(){
		$('.myQues .cj').show();
	})
	$('.myNote .write_note').focus(function(){
		$('.myNote .cj').show();
	})
	/* 点击输入框出现提交截图的内容  End */
	
	/* 点击收藏 */
	$('.shoucan').on('click',function(){
		$(this).toggleClass('shoucan_click');
		if ($(this).hasClass("shoucan_click")){
			$(this).html("<label class='icon-xing'>&#xe605;</label>已收藏")
		}else{
			$(this).html("<label class='icon-xing'>&#xe605;</label>收藏");
		}
	})
	$('#zan,.icon-qianbi,.icon-trash').on('click',function(){
		$(this).toggleClass('shoucan_click');
	})

	/* 点击标记 */
	$('.biaoji').on('click',function(){
		$(this).toggleClass('biaoji_click');
	})
	//papers下暂停
	$('#stop').on('click',function(){
		$('.stop').show();	
	})
	//
	$('.continue,.stop_close ').on('click',function(){
		$('.stop').hide();
	})
	/** iknow start **/
	$('.iknow ul li').on('click',function(){
		$(this).toggleClass('blue');
	})

	//是非题
	$('.content .video_play .yesNo .yn span').on('click',function(){
		$('.content .video_play .yesNo .yn span').each(function(){
			$(this).removeClass('yesno');	
		})
		$(this).toggleClass('yesno');	
	})

	//单选题
	$('.checkBox dl dd button').click(function(){
		$('.checkBoxCont').each(function(i){
			if($(this).css("display") == 'block'){
				$(this).find("dd").removeClass('ww');
			}
			
		})
		$(this).parent().toggleClass('ww');

	})
	$('.cBoxA input').on('click',function(){
		$(".checkBoxCont").each(function(j){
			if($(".checkBoxCont").eq(j).css("display") == "block"){
				$(this).find("dd").each(function(ii){
					
					if($(this).attr("class") == "ww"){
						$(this).find("i").show();
						$(this).addClass("correct_answer");
						$(".cBoxB .yourAnswer").text($(this).find("label").text());
					}
					
					if($(this).find("label").text() == $(".cBoxB .correct").text()){
						$(this).addClass("correct_collect")
						$(this).find("i").show();
					}
				})
				
				$('.cBoxA .ans_col').hide();
				$('.cBoxB').show();		
				$('.ques_but').hide();
				$(this).find("button").attr("disabled","false");
			}
		});
		
	})
	function checkBoxContCheck(){
		var iNum = 0;
		$(".checkBox .next_t").on("click",function(){
			
			if(iNum >= $(".checkBoxCont").length - 1){
				iNum = $(".checkBoxCont").length - 1;
				return false;
			}
			iNum++;
			if($(".checkBoxCont").eq(iNum).find("dd").hasClass("ww")){
				$(".cBoxB").show();
			}else{
				$(".cBoxB").hide();
				$(".ans_col").show();
				$(".ques_but").show();
			}			
			$(".checkBoxCont").hide();
			//$(".checkBoxCont dd").removeClass("correct_collect correct_answer");
			//$(".checkBoxCont dd i").hide();
			$(".checkBoxCont").eq(iNum).show();
			
		})

		$(".checkBox .prev_t").on("click",function(){
			if(iNum <= 0){				
				return false;
				iNum = $(".checkBoxsCont").length - 1;
			}
			iNum--;
			$(".checkBoxCont").hide();
			//$(".checkBoxCont dd").removeClass("correct_collect correct_answer");
			$(".checkBoxCont").eq(iNum).show();
			//$(".checkBoxCont dd i").hide();
			$(".ansTu").show();
		})
	}

	checkBoxContCheck();

	//多选题
	var oYourAnswerArr = [];
	
	$('.checkBoxs dl dd button').click(function(){		
		$(this).parent().toggleClass('ww');
		if($(this).parent().hasClass("ww")){
			oYourAnswerArr.push($(this).text());
		}else{
			for(var i=0; i<oYourAnswerArr.length; i++){
				if($(this).text() == oYourAnswerArr[i]){
					oYourAnswerArr.splice(i,1);
				}
			}
		}
	})
	$('.quesBut').on('click',function(){
		var checkBoxsStr = '';
		$(".checkBoxsCont").each(function(i){
			if($(".checkBoxsCont").eq(i).css("display") == 'block'){
				$(".checkBoxsCont").eq(i).find("dl dd button").attr("disabled","false");
				
				checkBoxsStr = $('.checkBoxsCont').eq(i).find("dl label").text();
				$(".yourAnswer").text(oYourAnswerArr);
				var oCorrectArr = $(".ansTu .correct").text();
				oCorrectArr = oCorrectArr.split('、');
				$(".checkBoxsCont").eq(i).find('dd i').addClass("icon-cha cha");
				$('.quesBut').hide();
				$('.ansTu').show();

				var checkBoxsArr = [];
				for(var p=0; p<checkBoxsStr.length; p++){
					checkBoxsArr.push(checkBoxsStr.charAt(p));
				}

				for(var s in oYourAnswerArr){
					for(var x in checkBoxsArr){
						if(oYourAnswerArr[s] == checkBoxsArr[x]){
							$(".checkBoxsCont").eq(i).find('dd').eq(x).addClass("correct_answer").show();
							$(".checkBoxsCont").eq(i).find('dd i').eq(x).show();
						}
					}
				}

				for(var s in oCorrectArr){
					for(var x in checkBoxsArr){
						if(oCorrectArr[s] == checkBoxsArr[x]){				
							$(".checkBoxsCont").eq(i).find("dl i").eq(x).removeClass("icon-cha cha").addClass("icon-duigou duigou").show();					
							//$(".checkBoxsCont").eq(i).find("dl dd").eq(x).addClass("correct_collect");
						}
					}
				}
				$(".checkBoxsCont").eq(i).find("dl i").each(function(j){
					if($(this).hasClass("duigou")){
						$(this).parent().removeClass().addClass("correct_collect");
					}
				})
			
				/*$('.checkBoxs dl dd button').parent().eq(0).addClass('correct_answer');
				$('.checkBoxs dl dd button').parent().eq(3).addClass('correct_answer');*/
				//$('.checkBoxs dl dd button').off();
				$('.ques_but').hide();
				/*$('.checkBoxs').css('overflow-y','scroll');*/
			}
		});		
		
		
		
	})
	function checkBoxsContCheck(){
		var iNum = 0;
		$(".checkBoxs .next_t").on("click",function(){
			oYourAnswerArr = [];
			
			if(iNum >= $(".checkBoxsCont").length - 1){
				iNum = $(".checkBoxsCont").length - 1;
				return false;
			}
			iNum++;
			if($(".checkBoxsCont").eq(iNum).find("dd").hasClass("ww")){
				$(".ansTu").show();
			}else{
				$(".ansTu").hide();
				$(".ques_but").show();
				$(".quesBut").show();
			}			
			$(".checkBoxsCont").hide();
			//$(".checkBoxsCont dd").removeClass("correct_collect correct_answer");
			//$(".checkBoxsCont dd i").removeClass().hide();
			$(".checkBoxsCont").eq(iNum).show();
			$(".quest").css("top",0);
		})

		$(".checkBoxs .prev_t").on("click",function(){
			oYourAnswerArr = [];
			if(iNum <= 0){				
				return false;
				iNum = $(".checkBoxsCont").length - 1;
			}
			iNum--;
			$(".checkBoxsCont").hide();
			//$(".checkBoxsCont dd").removeClass("correct_collect correct_answer");
			$(".checkBoxsCont").eq(iNum).show();
			//$(".checkBoxsCont dd i").removeClass().hide();
			$(".ansTu").show();
			$(".quest").css("top",0);
		})
	}

	checkBoxsContCheck();
	/** 我要交卷 Start **/
	$('.papers dl dd button').on('click',function(){
		$('.papers dl dd ').each(function(){
			$(this).removeClass('ww');
		})
		$(this).parent().toggleClass('ww');
	})


	function papersContCheck(){
		var iNum = 0;

		$(".papers .next_t").on("click",function(){
			if(iNum >= $(".papersCont").length - 1){
				iNum = $(".papersCont").length - 1;
				return false;
			}
			iNum++;
			$(".papersCont").hide();
			$(".nu").removeClass("nu2");
			$(".papersCont").eq(iNum).show();
			$(".nu").eq(iNum).removeClass("papers_one").addClass("nu2").html($(".nu").eq(iNum).html()+'<i class="triangle"></i>');
			$(".nu").eq(iNum - 1).addClass("papers_one");
			
		})

		$(".papers .prev_t").on("click",function(){
			if(iNum <= 0){				
				return false;
				iNum = $(".papersCont").length - 1;
			}
			iNum--;
			$(".papersCont").hide();
			$(".nu").removeClass("nu2");
			$(".papersCont").eq(iNum).show();
			$(".nu").eq(iNum).removeClass("papers_one").addClass("nu2").html($(".nu").eq(iNum).html()+'<i class="triangle"></i>');
			$(".nu").eq(iNum+1).addClass("papers_one");
		})

		$(".nu").each(function(i){
			$(this).on("click",function(){
				$(".papersCont").hide();
				$(".papersCont").eq(i).show();	
			})
			
		})
	}
	
	papersContCheck();
	/** 4-11== **/
	var widthH;
	var heightH;
	$(window).resize(function() {
		
        widthH = $(this).width();
        heightH = $(this).height();
        if(parseInt($('.menu').css('right'))=='0'){
	       $('.content .video_play').css({
	       		'width':widthH,
	       		'height':heightH,
	       		'margin-left': -widthH/2-150,
	       		'margin-top': -heightH/2 
	       });
       }
        else{
        	$('.content .video_play').css({
	       		'width':widthH,
	       		'height':heightH,
	       		'margin-left': -widthH/2,
	       		'margin-top': -heightH/2 
	       });
        }
		
		/* 4-11 Start */   	
		if(widthH < 1300)
		{
			$('.com').css({
	       		'width':(widthH-300)*0.8,
	       		'height':heightH*0.7,
	       		'margin-left':-(widthH-300)*0.8/2,
	       		'margin-top':-heightH*0.7/2
	       }); 
       } else if(widthH <= 900){
       		//	window.width() = 900;
       		//window.resizeTo(900, 900);
       } else{
       		$('.com').css({
	       		'width':900,
	       		'height':500,
	       		'margin-left':-450,
	       		'margin-top':-270
	       }); 
       }
	    /* 4-11 End */  
	});

	var num = 1;
		$(".close").click(function(){
		num++;
		switch( num%2 ){
			case 1:
				$(".video_play").animate({
					width: '-=300',
					right: '+=150'
					},600);
				$(".menu").animate({
					right: '+=300'
					},600);
				break;
			case 0:
					$(".video_play").animate({
						width: '+=300',
						right: '+=150'
					},600);
					$(".menu").animate({
					right: '-=300'
					},600);
				break;
		}
	})

/*** 右侧导航栏显示隐藏 ***/
$('.grid ul li .video').click(function(){
	$('.com').each(function(){
		$(this).addClass('hide');
	})
	$('.video_pic').removeClass('hide');
})
$('.grid ul li .edit').click(function(){
	$('.com').each(function(){
		$(this).addClass('hide');
	})
 	$('.checkBox').removeClass('hide');
})
$('.grid ul li .search').click(function(){
	$('.com').each(function(){
		$(this).addClass('hide');
	})
	$('.iknow').removeClass('hide');
})


/*
$('.menu_head li').click(function(){
	$('.menu_head li').each(function(){
		$(this).removeClass('active');
	})
	$(this).addClass('active');
})
*/
/** 大家回答我的问题显示 **/
	$('.everyAnswer_me').hide();
	$('.myQues ul li:last').click(function(){
		$('.myQues ul li:last').css("border-left","");
		$(this).css("border-left","20px solid #fff");
		$(this).children('.everyAnswer_me').show();
		
		$("#X").click(function(){
			$('.everyAnswer_me').hide();
			$('.myQues ul li').css("border-left","0px");
			return false;
		})
	
	})	
	
	/** 大家回答的显示 **/
	$('.everyAnswer').hide();
	$('.everyoneQues ul li').click(function(){
		$('.everyoneQues ul li').css("border-left","");
		$(this).css("border-left","20px solid #fff");
		$(this).children('.everyAnswer').show();
		
		$("#X").click(function(){
			$('.everyAnswer').hide();
			$('.everyoneQues ul li').css("border-left","0px");
			return false;
		})
	
	})	
	
	/** 大家评论的显示 **/
	$('.everyoneSpeak_me').hide();
	$('.myNote ul .cont_note').click(function(){
	//	console.log(21)
		$('.myNote ul li').css("border-left","");
		$(this).parent().css("border-left","20px solid #fff");
		$(this).children('.everyoneSpeak_me').show();

		$("#X").click(function(){
			$('.everyoneSpeak_me').hide();
			$('.myNote ul li').css("border-left","0px");
			return false;
		})
	})	
})
	
	/** 大家评论的显示 **/
	$('.everyoneSpeak').hide();
	$('.everyoneNote ul .cont_note').click(function(){
		$('.everyoneNote ul li').css("border-left","");
		$(this).parent().css("border-left","20px solid #fff");
		$(this).children('.everyoneSpeak').show();
		
		$("#X").click(function(){
			$('.everyoneSpeak').hide();
			$('.everyoneNote ul li').css("border-left","0px");
			return false;
		})	
	})	

/*** 右导航栏主菜单切换 ***/
function display(s,v){
	
	$(".menu_head ul li").each(function(){
      $("li").css("background","#fff");
      $("li").children('i').css("color","#666");
      $("#XWrap").css("display","none");
    });
    
    $(".con").each(function(){
      $(this).css("display","none");
    });
    
	 $("#"+s).css("display","block");
	 $("#"+v).css("background","#34c6ea");
	 $("#"+v).children('i').css("color","#fff");
 }

/*** 我与大家的问题切换 ***/
function meAever(s,v){
	$(".questxt span").each(function(){
	  $(".questxt span").css('color','#777');
	  $(".questxt span").removeClass("world_blue");
      $(".comm").hide();
    });
   
	$('.'+s).css('color','#34c6ea');
	$('.'+s).addClass("world_blue");
	$('.'+v).show();
}

/***  ****/
function meAever1(s,v){
	$(".questxt1 span").each(function(){
	  $(".questxt1 span").css('color','#777');
	  $(".questxt1 span").removeClass("world_blue");
      $(".comm1").hide();
    });
   
	$('.'+s).css('color','#34c6ea');
	$('.'+s).addClass("world_blue");
	$('.'+v).show();
}

$(".prevB").on("click",function(){
	//changeVideo(50,'prev');
	$(".video_pic").stop().animate({"top":-50+"%"},500,function(){
		$(".video_pic").css({"top":50*4+"%"});
		$(".video_pic").stop().animate({"top":50+"%"},500);
	});
})

$(".nextT").on("click",function(){
	//changeVideo(50,'next');
	$(".video_pic").stop().animate({"top":50*4+"%"},500,function(){
		$(".video_pic").css({"top":-50+"%"});
		$(".video_pic").stop().animate({"top":50+"%"},500);
	});
})

var oPopupInfoWrap = document.getElementById('popupInfoWrap');

function wheel(ev){
	var ev = ev || event;
	var iBtn = true;
	
	if(ev.wheelDelta){
		iBtn = ev.wheelDelta > 0 ? true : false;
	}else{
		iBtn = ev.detail < 0 ? true : false;
	}
}

/*弹窗滚动*/
var oWrap = $('#popupInfoWrap')[0];
var oCont = $('#popupInfo')[0];
var oXWrap = $('#XWrap')[0];
var oX = $("#X")[0];

Scroll(oWrap,oCont);

var oCheckBoxs = $(".checkBoxs")[0];
var oQuest = $(".quest")[0];

Scroll(oCheckBoxs,oQuest);

var oCheckBox = $(".checkBox")[0];
var oCBoxA = $(".cBoxA")[0];

Scroll(oCheckBox,oCBoxA);

/*oWrap.onmousewheel = fn1;
if(oWrap.addEventListener){
	oWrap.addEventListener('DOMMouseScroll',fn1,false);
}

function fn1(ev){
	var ev = ev || event;
	var iBtn = true;
	if(ev.wheelDelta){
		iBtn = ev.wheelDelta > 0 ? true : false;
	}else{
		iBtn = ev.detail < 0 ? true : false;
	}
	if(iBtn){
		if(oCont.offsetTop >= 0){
			oCont.style.top = 0;
		}else{
			oCont.style.top = oCont.offsetTop + 40 + 'px';
		}		
	}else{
		if(oCont.offsetTop <= oWrap.offsetHeight - oCont.offsetHeight){
			oCont.style.top = oWrap.offsetHeight - oCont.offsetHeight;
		}else{
			oCont.style.top = oCont.offsetTop - 40 + 'px';
		}		
	}
	if(ev.preventDefault){
		ev.preventDefault();
	}
	return false;
}*/

function Scroll(w,i){
	w.onmousewheel = callback;
	if(w.addEventListener){
		w.addEventListener('DOMMouseScroll',callback,false);
	}
	function callback(ev){
		var ev = ev || event;
		var iBtn = true;
		if(ev.wheelDelta){
			iBtn = ev.wheelDelta > 0 ? true : false; 
		}else{
			iBtn = ev.detail < 0 ? true : false;
		}
		if(iBtn){
			if(i.offsetTop >= 0){
				i.style.top = 0;
			}else{
				i.style.top = i.offsetTop + 40 + 'px';
			}
		}else{
			if(i.offsetTop <= w.offsetHeight - i.offsetHeight){
				i.style.top = w.offsetHeight - i.offsetHeight;
			}else{
				i.style.top = i.offsetTop - 40 + 'px';
			}		
		}
		if(ev.preventDefault){
			ev.preventDefault();
		}
		return false;
	}
}

oX.onclick = function(){
	oXWrap.style.display = 'none';
}

$(".everyoneNote ul .cont_note,.everyoneQues li,.myNote ul .cont_note,.myQues li:last").each(function(){
	$(this).click(function(){
		$("#XWrap,#popupInfoWrap").css("height",$(window).height()-100);
		oCont.style.top = 0 + 'px';
		$("#XWrap").css("display","block");
	})
})

/*点击回复按钮出输入框*/
$(".replay_h").each(function(){
	$(this).on("click",function(){
		$(this).parent().parent().parent().find(".come_answer,.sbt").css("display","block");
	})
})

$(".offReply").each(function(){
	$(this).on("click",function(){
		$(this).parent().parent().find(".come_answer,.sbt").css("display","none");
	})
})

//回复框提交
 $(".tt").each(function(i){
	$(this).on("click",function(){
		if($(".come_answer input").val() == ''){
			return false;
		}
		$(this).parent().after($("<div class='answer_cont'><p class='first_col'><img src='images2015/tongguan/pic-1.png'/><span>oksite</span></p><p class='second_col'>"+ $(".come_answer input").eq(i).val() +"<br/><span>16:09</span></p></div>"))
		$(".come_answer input").eq(i).val("");
		$(".come_answer,.sbt").css("display","none");
	})
});

//问题和评论部分导航切换关闭弹窗
$(".questxt,.questxt1").on("click",function(){
	resetXWrap();
})

function resetXWrap(){
	oXWrap.style.display = 'none';
	$('.myQues ul li,.everyoneQues ul li,.myNote ul li,.everyoneNote ul li').css("border-left","");
}

//答题计时
function AnswerTime(obj){
	this.obj = obj;
	this.pause = document.getElementById('stop');
	this.oContinue = $(".continue")[0]; 
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
	//this.itemTime = $(".AnswerTime").text();
}
AnswerTime.prototype._continue = function(){
	this.begin();
	//$(".AnswerTime").text(this.itemTime);
}
AnswerTime.prototype.stopTime = function(){
	clearInterval(this.timer);
	_this.iBtn = true;
}

var AT = new AnswerTime($("#con_1 li:eq(1)")[0]);
AT.init();


