
(function($){
	
	//考试推荐
	$(window).load(function(){
		
		$.mCustomScrollbar.defaults.theme="light-2";
		
		$("#kwod").mCustomScrollbar({
			axis:"x",
			setLeft: "0",
			advanced:{autoExpandHorizontalScroll:true}
		});

	});
	
	
	
	
})(jQuery);