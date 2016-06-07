$(function(){
	
	//picture show
	var _pic = new Array();              //图片
	var _picdata = new Array();			 //图片data属性
	var _data;							 //a data属性
	function mapic(){
		$('.mapright p').each(function(index){
			 _pic = $(this).find('span');
			_picdata = _pic.attr('data-place');
			console.debug(_picdata);
		})
	}
	
	
	
	/* cfatime.html 城市图片内容切换  */
	$('.place_name a').hover(
		function(index){
			
	    var _data = $(this).attr('data-place');
	    
	    //地点名称
	    var _placespan = $(this).parent().next().find('span');
	  	var _placedata = _placespan.attr('data-place');
	    
	    
		$('.mapright p').find('em').css('display','inline-block');
		$('.mapright p').find('span').css({
			'display':'none',
			'marginRight':'0',
			'marginTop':'0'
		});
		
		
		_placespan.each(function(index){
			var _oplace = $(this).attr('data-place');
			
			if(_data == _oplace){
				$(this).parent().find('span').hide();
				$(this).css('display','inline-block');
			}
		})

			
	    $('.mapright p').each(function(index){
			 _pic = $(this).find('span');
			_picdata = _pic.attr('data-place');
		
			if(_data == _picdata){
				$(this).children('em').css('display','none');
				$(this).children('span').css({
					'display':'block',
					'marginRight':'-70px',
					'marginTop':'-150px'
				});
			}
		})

	},function(){
		$('.mapright p').find('em').css('display','block');
		$('.mapright p').find('span').css('display','none');
	})
	

	//鼠标hover图片的效果
	$('.mapright p').hover(function(){
		$(this).children('em').hide();

		$(this).children('span').css('display','block');
	},function(){
		$(this).children('em').show();
		$(this).children('span').css('display','none');
	}
	)
	
})
