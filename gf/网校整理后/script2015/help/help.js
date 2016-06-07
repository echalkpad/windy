
$(function(){
	var window_w = $(window).width();
	if(window_w<768){
		$('#helplef dl').click(function(){
		/*	$('#helplef dl').each(function(){
				$(this).children('dd').hide();
		}) */
			$(this).children('dd').toggle();
		})
	}
	
	
	
})


