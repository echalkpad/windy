$(function(){
	var w=$(window).width();
	var h=$(window).height();

	function autoPlay(){
		var w=$(window).width();
		if(w>=975){
			var h1=$('.video img').height();
			$('.video section').css('height',h1);
		}else{
			$('.video section').css('height','auto');
		}
		if(w>=751){
			$('.power section ul').css('width',w+10);
		}

		if(w>=975){
			var w1=$('.method .accountant_main').width();
			$('.Schedule').css('width',w1+10);
		}else{
			$('.Schedule').css('width','auto');
		}

		$('.Schedule li').mouseover(function(event) {
			$(this).addClass('selector').siblings('.Schedule li').removeClass('selector');
			var index=$(this).index();
			$('.introduction').eq(index).addClass('current').siblings('.introduction').removeClass('current');
		});


		jQuery.fn.center = function() {
	        this.css("position", "absolute");
	        this.css("top", ($(window).height() - this.height()) / 2 -35 +  $(window).scrollTop() + "px");
	        this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
	        return this;
	    }

	    $(window).resize(function(event) {
	    	$('.buy').center();
	    });
	    $('.introduction em').click(function(event) {
	    	$('.pop').css('display','block');
	    	$('.buy').stop().show();
	    	 $('.buy').center();
	    });
	    $('.pop h2 i').click(function(event) {
	    	$('.buy').css('display','none');
	    	$('.pop').stop().hide();
	    });



		$('.pop').css('height',$(document).height());


		// 超出截断
		$('.Schedule li p span').each(function(i){
	            var $span = $(this);
	            $span.text($span.attr("data-text"));
	            while ($span.outerHeight() >50) {
	            	/*console.log("【replace前】"+$span.outerHeight()+$span.text());*/
	                $span.text($span.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	                /*console.log("【replace后】"+$span.outerHeight()+$span.text());*/
	            };
	     });

	}
	autoPlay();


	$(window).resize(function(event) {
		autoPlay();
	});

})