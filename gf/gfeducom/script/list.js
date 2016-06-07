$(function(){
	function autoPlay(){
		var w=$(window).width();
		if(w>=975){
			$('.procontent').css('width',w-315);
		}else{
			$('.procontent').css('width','auto');
		}

		 $('.list_content ul li').each(function(i){
            var $p = $("p", $(this)).eq(0);
            $p.text($p.attr("data-text"));
            while ($p.outerHeight() >72) {
                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            };
        });


		 $('.test_info ul li').each(function(i){
	            var $p = $("p", $(this)).eq(0);
	            $p.text($p.attr("data-text"));
	            while ($p.outerHeight() >72) {
	                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	            };
	     });

		 $(window).scroll(function(){
		     var h = $(".proaside .sideproblem").offset().top+293;
		     if($(this).scrollTop()>=h){
		        $(".proaside .picshow").css({'position':'fixed','top':'20px'});
		     } else {
		        $(".proaside .picshow").css({'position':'static','top':'auto'});
		     }
		});

	}
	autoPlay();
	$(window).resize(function(event) {
		autoPlay();
	});












	//右侧轮翻
	var timer = null;
	var thisIndex = 0;
	var lilength = $('.listenpic li').length-1;
		console.log(lilength)
	function changeImg(){
		$('.listenpic ul li').eq(thisIndex).hide().stop().fadeIn().siblings().hide();
	}
	function fnTimer(){
		thisIndex++;
		if(thisIndex > lilength){
			thisIndex = 0;
		}
		changeImg();
	};
	timer = setInterval(fnTimer,3000);//自动轮播
	/*$('.listenpic').hover(function(){
		$('#sideleft,#sideright').show();
		clearInterval(timer);
	},function(){
		$('#sideleft,#sideright').hide();
		clearInterval(timer);
		timer = setInterval(fnTimer,3000);
	})*/
	$('#sideright').click(function(e) {
		thisIndex++;
		if(thisIndex > lilength){
			thisIndex = 0;
		}
		changeImg();
	});
	$('#sideleft').click(function(e) {
		thisIndex--;
		if(thisIndex < 0){
			thisIndex = lilength;
		}
		changeImg();
	});

})

$(window).load(function(){
	var h2=$('.prorecommend li img').width();
	$('.prorecommend li h3').css('width',h2);

	/*$('.prorecommend li h3').each(function(index, el) {
		var curLength1 = $(this).text().length;
		if (curLength1 > 12) {
		    $(this).text($(this).text().substr(0, 12));
		}
	});*/
	//左侧考试推荐
	$(".prorecommend").slide({mainCell:".bd ul",autoPlay:true,effect:"leftMarquee",vis:3,interTime:50,trigger:"click"});

	$('.prorecommend .tempWrap').css('width',100+'%');

})