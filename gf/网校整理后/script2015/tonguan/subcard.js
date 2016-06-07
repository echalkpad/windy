
	function display(s){
		 $("#"+s).css("display","block");
	 }
	 function disappear(s){
		 $("#"+s).css("display","none");
	  }
	  
	/** 科目关卡 start **/  
	function display1(){
		//清除显示框
		/*$('.subject_Stu ul li .color').on('click',function(){
			$('.open_window').children('div').each(function(){
				$(this).removeClass('dis');
			})  
		})
	
		$("#"+v+"_window").addClass('dis');
		$("#"+v).css("background","#f8f8f8");*/
	 	
	}
	$('.window_content .one').hover(function() {
		$(this).find('.right').html("<a href='#'><span class='to_recruit'><span class='enter_text'>重新挑战</span></span></a>")
	}, function() {
		$(this).find('.right').html("<span class='grade'>98</span>分")
	});
	$('.window_content .two,.window_content .three,.window_content .four').hover(function() {
		$(this).find('.right').html("<a href='#'><span class='enter'><span class='enter_text'>进入关卡</span></span></a>")
	}, function() {
		$(this).find('.right').html("<span class='pic'><img src='images2015/tongguan/video_gray.png'/></span><span class='time'>25:00</span>");
	});
	$('.subject_Stu ul li .color').each(function(i){
		$(this).on("click",function(){
			$(".subject_Stu ul li").css("background","#fff");
			$(this).parent().css("background","#e6e6e6");
			$('.open_window').children('div').removeClass('dis');
			$('.open_window').children('div').eq(i).addClass('dis').css({"margin-left":0,"top":($(".subject_Stu").height()-$(".open_window .dis").height())/2+$(".kem_msg").height(),"left":($(".webmain").width()-$(".open_window .dis").width())/2});
		})
	})
	  function disappear1(s){
		$("#"+s).removeClass('dis');
		$("#"+s+"_window").removeClass('dis');
		$(".subject_Stu ul li").css("background","#fff");
	  }
	 /** 科目关卡 end **/   
	  
	 /*webfoot end*/
	$(function(){
		$("#ziliao_msg").hide();
		$("#msg").click(function(){
			$("#ziliao_msg").toggle();
		})	
	})
