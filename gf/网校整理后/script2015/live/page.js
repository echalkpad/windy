$(function(){

	$("#finance dd").each(function(i){
		$(this).click(function(){
			$("#finance dd").removeClass("active");
			$(this).addClass("active");
			$("#finance .finance_list_wrap").removeClass("active");
			$("#finance .finance_list_wrap").eq(i).addClass("active");
		})
	})

	$("#accounting dd").each(function(i){
		$(this).click(function(){
			$("#accounting dd").removeClass("active");
			$(this).addClass("active");
			$("#accounting .finance_list_wrap").removeClass("active");
			$("#accounting .finance_list_wrap").eq(i).addClass("active");
		})
	})

	$("#ractitioners dd").each(function(i){
		$(this).click(function(){
			$("#ractitioners dd").removeClass("active")
			$(this).addClass("active");
			$("#ractitioners .finance_list_wrap").removeClass("active");
			$("#ractitioners .finance_list_wrap").eq(i).addClass("active");
		})
	})

	$('#menu').mmenu();

	//倒计时
	function countdown(o,r){
		var m = Math.floor(r%86400%3600/60);
		var h = Math.floor(r%86400/3600);
		var d = Math.floor(r/86400);
		var s = r%60;

		$("." + o + " .d").text(d);
		$("." + o + " .h").text(h);
		$("." + o + " .m").text(m);	
		$("." + o + " .s").text(s);	
		var t = r;
		var timer = setInterval(function(){
			t--;
			if(t == 0){
				clearInterval(timer);
				$("."+o).html( randomNumber() + "人正在上课");
				$("."+o).prev("span").addClass("active");
				$("."+o).next().next().html("马上进入");
			}
			var m = Math.floor(t%86400%3600/60);
			var h = Math.floor(t%86400/3600);
			var d = Math.floor(t/86400);
			var s = t%60;

			/*m = s == 59 && m > 0 ? m - 1 : m;
			h = m == 59 && h > 0 ? h - 1 : h;
			d = h == 23 && d > 0 ? d - 1 : d;*/

			$("." + o + " .d").text(d);
			$("." + o + " .h").text(h);
			$("." + o + " .m").text(m);	
			$("." + o + " .s").text(s);	

		},1000);	
	}


	//获取时间变量，执行倒计时
	function startCountdown(){
		var timesArr = document.getElementById('HidLiveSecond').value;
		timesArr = eval(timesArr);
	    for (var i = 0; i < $(".people_num").length; i++) {

	        if ($(".people_num").eq(i).hasClass("people_num_down" + i)) {

	            countdown('people_num_down' + i, toSeconds(timesArr[i]));

	        }
	    }
	};

	startCountdown();

	//获取系统时间转换成秒数
	function toSeconds(s){
		var newTime = s.replace(/\//g,' ');
		newTime = new Date(newTime);
		var nowTime = new Date();
		return Math.floor((newTime - nowTime)/1000);
	}

	//随机一个100-200之间的数字
	function randomNumber(){
		return Math.floor(Math.random() * 100 + 100);
	}

})
