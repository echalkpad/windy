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


	function autoPlay(){
		var w=$(window).width();
		if(w>=768){
			$('.Ber_entrance li').mouseover(function(event) {
				$(this).addClass('selector').siblings().removeClass('selector');
			});
		}
	}
	autoPlay();
	$(window).resize(function(event) {
		autoPlay();
	});

})


      jQuery(document).ready(function($) {
  $('#full-width-slider').royalSlider({
    arrowsNav: true,
    loop: true,
	autoPlay: {
				// autoplay options go gere
				enabled: true,
				stopAtAction: false,
				pauseOnHover: false,
				delay: 3000
			},
    keyboardNavEnabled: true,
    controlsInside: false,
    imageScaleMode: 'fill',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 350,
    controlNavigation: 'bullets',
    thumbsFitInViewport: false,
    navigateByClick: true,
	slidesSpacing:0,
    startSlideId: 0,
    
    transitionType:'move',
    globalCaption: true,
    deeplinking: {
      enabled: true,
      change: false
    },
    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
    imgWidth: 1400,
    imgHeight: 680
  });
});

 