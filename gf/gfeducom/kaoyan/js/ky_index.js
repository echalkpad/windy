$(function(){
	TouchSlide({
		delayTime:1500,
		interTime:5000,
		slideCell:"#slideBoxIndex",
		titCell:".hdIndex ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bdIndex ul",
		effect:"leftLoop",
		autoPage:true,//自动分页
		autoPlay:true //自动播放
	});

	//考试推荐
    $(window).load(function(){

        $("#kwod").mCustomScrollbar({
            axis:"x",
            setLeft: "0",
            advanced:{autoExpandHorizontalScroll:true}
        });
    });

	function autoPlay(){
		var w=$(window).width();
		if(w<992){
			$('.Prepare_pass article').css({
				'width':w-96,
			})
		}else{
            $('.Prepare_pass article').css({
                'width':w-150,
            })
        }
	}
	autoPlay();
	$(window).resize(function(event) {
		autoPlay();
	});

	$('.listside a').click(function(event) {
	 	$('.protitle div').stop().toggle();
	});

})
