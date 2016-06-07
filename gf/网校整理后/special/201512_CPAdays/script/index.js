$(function(){
	 function autoPlay(){
	    var upH=$('.ep_up').outerHeight(true);
	    $('.elements .ep_down').css('height',$(window).height()-upH-40);
	    var upH2=$('.detial .ep_up').outerHeight(true);
	    $('.detial article').css('height',$(window).height()-upH-40);
	  }

	  autoPlay();
	  $(window).resize(function(event) {
	    autoPlay();
	  });
})