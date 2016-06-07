var listData = null;
$(function() {

    getMore();
    
	$("<span class='down'>").appendTo($(".mbttl h2"));

	//移动端头部点击显示隐藏导航
	$(".mbttl h2").toggle(function() {
		$(this).find(".down").css("-webkit-transform", "rotate(180deg)");
		$("#tab_wrap").show();
	}, function() {
		$(this).find(".down").css("-webkit-transform", "rotate(0deg)");
		$("#tab_wrap").hide();
	});

	//导航点击换背景
	$("#tab_wrap li a").on("click", function() {
		$(this).css({
			"backgroundColor": "#20bfcf",
			"color": "#fff"
		});
	});

	//列表按钮鼠标移入效果
    var item_str =  null;
	$(".playing").live("mouseenter", function() {
        item_str =  $(this).text();
		$(this).text("立即进入");
	}).live("mouseleave", function() {
		$(this).text(item_str);
	});

	/*$(".cont_info .playend_to").hover(function() {
		$(this).text("查看回放");
	}, function() {
		$(this).text("已结束");
	});*/

	//倒计时
	function countdown(o,r){
		var m = Math.floor(r%86400%3600/60);
		var h = Math.floor(r%86400/3600);
		var d = Math.floor(r/86400);
		var s = r%60;
		if (r < 86400) {
            $("." + o).find(".d_wrap").hide();
            $("." + o).find(".s_wrap").show();
		}
		if(r <= 0){
		    $("." + o).hide();
		    if ($("." + o).next(".buttons").find("button").removeClass().addClass("playing").text() == "参加直播") {
		        $("." + o).next(".buttons").find("button").removeClass().addClass("playing").text("正在直播");
		    }
		}
        if(toSeconds(listData[i].cont_inner.cont_info.endtimes) <= 0){
            $("." + o).hide();
            if ($("." + o).next(".buttons").find("button").removeClass().addClass("playing").text() == "参加直播") {
                $("." + o).next(".buttons").find("button").removeClass().addClass("playing").text("已结束");
            }
        }

		$("." + o + " .d").text(d);
		$("." + o + " .h").text(h);
		$("." + o + " .m").text(m);	
		$("." + o + " .s").text(s);	
		var t = r;
		var timer = setInterval(function(){
			t--;
			if(t <= 0){
				clearInterval(timer);
				$("." + o).hide();
				if ($("." + o).next(".buttons").find("button").removeClass().addClass("playing").text() == "参加直播") {
				    $("." + o).next(".buttons").find("button").removeClass().addClass("playing").text("正在直播");
				}
			}
            if(toSeconds(listData[i].cont_inner.cont_info.endtimes) <= 0){
                clearInterval(timer);
                $("." + o).hide();
                if ($("." + o).next(".buttons").find("button").removeClass().addClass("playing").text() == "参加直播") {
                    $("." + o).next(".buttons").find("button").removeClass().addClass("playing").text("已结束");
                }
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

	    for (var i = 0; i < $(".countdown").length; i++) {

	        if ($(".countdown").eq(i).hasClass("countdown" + i)) {

	            countdown('countdown' + i, toSeconds(listData[i].cont_inner.cont_info.countdown));

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

	function createobjlist() {
	    if (window.ActiveXObject) {
	        return new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    else if (window.XMLHttpRequest) {
	        return new XMLHttpRequest();
	    }
	}
	function newfunction() {
	    window.alert('b');
	}
	//加载更多
	function getMore() {
	    if (document.getElementById('LiveProID') && document.getElementById('CurrentPage')) {
	        if(!isNaN(document.getElementById('LiveProID').value) && !isNaN(document.getElementById('CurrentPage').value))
	        {
	            var Curpageval = document.getElementById('CurrentPage').value * 1 + 1;
	            window.alert(Curpageval);
	            window.alert(document.getElementById('allpages').value * 1);
	            if (Curpageval <= document.getElementById('allpages').value * 1) {
	                var oBao = createobjlist();
	                var my_url = '../../../function/getliveinfo.aspx?type=3&proid=' + document.getElementById('LiveProID').value + '&curpage=' + Curpageval + '&numr=' + Math.random();
	                oBao.open('get', my_url, false);
	                oBao.onreadystatechange = function () {
	                    if (oBao.readyState == 4) {
	                        if (oBao.status == 200) {
	                            window.alert(oBao.responseText);
	                            listData = eval("(" + oBao.responseText + ")");
	                            window.alert(listData);
	                        } else {
	                            listData = null;
	                            window.alert(my_url);
	                        }
	                    }
	                    else {
	                        window.alert('b');
	                    }
	                }
	                oBao.send(null);
	                if (!listData) {
	                    alert('到底了');
	                    return;
	                }
	                var str = '';
	                for (var i = 0; i < listData.length; i++) {
	                    if (i == 0) {
	                        document.getElementById('CurrentPage').value = listData[i].page.curent;
	                        //window.alert(document.getElementById('CurrentPage').value);
	                        document.getElementById('allpages').value = listData[i].page.allpage;
	                        //window.alert(document.getElementById('allpages').value);
	                    }
	                    str += '<div class="cont_list cf"><div class="date"><p class="item_mask_none"></p><div class="md"><span class="month">' + listData[i].date.md[0] + '</span><span class="day">' + listData[i].date.md[1] + '</span></div><p class="times">' + listData[i].date.times + '</p></div><div class="cont_inner"><div class="images"><a href="' + listData[i].cont_inner.images.url + '"><img src="' + listData[i].cont_inner.images.imgSrc + '"></a><p class="img_mask_wrap"></p><p class="img_mask"></p><p class="img_mask_text">' + listData[i].cont_inner.images.img_mask_text + '</p></div><div class="cont_info"><h3><a href="' + listData[i].cont_inner.images.url + '"><strong>' + listData[i].cont_inner.cont_info.title[0] + '</strong>' + listData[i].cont_inner.cont_info.title[1] + '</a></h3><p class="money"><span class="new_money">￥' + listData[i].cont_inner.cont_info.money[0] + '</span><span class="old_money">原价：￥' + listData[i].cont_inner.cont_info.money[1] + '</span></p><p class="introduction">' + listData[i].cont_inner.cont_info.introduction + '</p><div class="countdown countdown' + (i + 5 * listData[i].page.curent) + '"><span class="d_wrap"><i class="d">29</i>天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><i class="h">07</i>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="m">51</i>分<span class="s_wrap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="s">51</i>秒</span></div><div class="buttons"><button class="playing">' + listData[i].cont_inner.cont_info.buttons[0] + '</button> <a href="">' + listData[i].cont_inner.cont_info.buttons[1] + '</a></div><div class="teacher cf"><p class="name">讲师：' + listData[i].cont_inner.cont_info.teacher[0] + '</p><p class="nums">已预约：' + randomNumber() + '人</p></div></div></div></div>';
	                }
	                $("#content_wrap .cont").append(str);
	                for (var i = 0; i < listData.length; i++) {
	                    countdown('countdown' + (i + 5 * listData[i].page.curent), toSeconds(listData[i].cont_inner.cont_info.countdown));
	                }
	                listData = null;
	            }
	            else {
	                alert('到底了');
	                return;
	            }
	        }
	    }
	}

	$(".more").on("click", function() {
		getMore();
	})

	$(window).scroll(function() {
		if ($(this).scrollTop() + $(window).height() >= $(document).height()) {
			getMore();
		}
	});

	var aLiA = $(".tab li a");
	for (var i = 0; i < aLiA.length; i++) {
		if(typeof document.addEventListener != "undefined"){		
			aLiA[i].addEventListener('touchstart', function() {
				$(this).css({
					"backgroundColor": "#20bfcf",
					"color": "#ffffff"
				});
			}, false);
			aLiA[i].addEventListener('touchend', function() {
				$(this).css({
					"backgroundColor": "#f8f8f8",
					"color": "#666666"
				});
			}, false);
		}
	}

})
