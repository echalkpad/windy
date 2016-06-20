$(function(){
	
	var h=$(window).height();
	if(h>=568){
		$('.section article').css('margin-top',0);
		$('.section3 p').css('top','78%');
	}else{
		$('.section article').css('margin-top',50);
		$('.section3 p').css('top','50%')
	}
	$('.section1').find('p').delay(800).animate({
		left: '50%',
	}, 1500, 'easeOutExpo');
	
	
//	点击箭头向下滚动
	$('.more').click(function(){
		$('#dowebok').fullpage.moveSectionDown();
	})
	$('#dowebok').fullpage({
//		'continuousVertical':true,
		afterLoad: function(anchorLink, index){
			if(index == 1){
				$('.section1').find('p').delay(800).animate({
					left: '50%',
				}, 1500, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('p:eq(0)').delay(500).animate({
					left: '50%',
				}, 1000, 'easeOutExpo');
				$('.section2').find('p:eq(1)').delay(1200).animate({
					left: '50%',
				}, 1000, 'easeOutExpo');
				$('.section2').find('p:eq(2)').delay(2000).animate({
					left: '50%',
				}, 1500, 'easeOutExpo');
				$('.section2').find('h3').delay(2000).animate({
					left: '50%',
				}, 1500, 'easeOutExpo');
			}
			if(index == 3){
				$('.section3').find('p').fadeIn(2000)
			}
			if(index == 4){
				$('.section4').find('p').fadeIn(2000);
			}
			if(index == 5){
				$('.section5').find('p').fadeIn(2000);
			}
			if(index == 6){
				$('.section6').find('p').fadeIn(2000);
			}
			if(index == 7){
				$('.section7').find('p').fadeIn(2000);
				$('.more').fadeOut(500);
			}
		},
		onLeave: function(index, direction){
			if(index == '1'){
				$('.section1').find('p').delay(800).animate({
					left: '200%'
				}, 1500, 'easeOutExpo');
			}
			if(index == '2'){
				$('.section2').find('p').delay(800).animate({
					left: '200%'
				}, 1500, 'easeOutExpo');
				$('.section2').find('h3').delay(1200).animate({
					left: '-200%'
				}, 1500, 'easeOutExpo');
			}
			if(index == '3'){
				$('.section3').find('p').fadeOut(2000);
			}
			if(index == '4'){
				$('.section4').find('p').fadeOut(2000);
			}
			if(index == '5'){
				$('.section5').find('p').fadeOut(2000);
			}
			if(index == '6'){
				$('.section6').find('p').fadeOut(2000);
			}
			if(index == '7'){
				$('.section7').find('p').fadeOut(2000);
				$('.more').fadeIn(2000);
			}
		}
	});
});