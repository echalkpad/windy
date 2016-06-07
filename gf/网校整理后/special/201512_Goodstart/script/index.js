$(function(){
	function autoPlay(){
        console.log($(window).width());
		var winW = $(window).width();
        $('.good_start_banner').css({
            'height':1/2*winW,
            'max-height':$(window).height()-40,
        });
		$('.good_start_banner img').css('height',3/7*winW);

        setInterval(function(){
            if($(window).width()<640){
                var h1= $('.double_card .good_start_msg img').height();
                $('.double_card .good_start_msg i').css({
                    'top':h1/2,
                })
            }
        },300);
        setInterval(function(){
            if($(window).width()>=992){
                var h1= $('.double_card .good_start_msg img').height();
                $('.double_card .enter_item a').css({
                    'line-height':(h1-30)/2+'px',
                })
                console.log($('.double_card .enter_item a').height());
            }
        },300);

        var h2=$('.secTabs').offset().top;
        var w=$(window).width();
        $(window).scroll(function(event) {
            var h1=$(window).scrollTop();
            var w2=$('.secTabs').width();
            if(h1 >= h2){
                $('.secTabs').css({ position:'fixed',top:0,left:(w-w2)/2,opacity:0.8,zIndex:555, });
            }else{
                $('.secTabs').css({ position:'static',opacity:1 ,zIndex:555,});
            }
        })

	}
	autoPlay();

	$(window).resize(function(event) {
		autoPlay();
	});
})
