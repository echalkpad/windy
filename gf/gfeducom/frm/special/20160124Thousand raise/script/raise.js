$(window).load(function(){
	var w=$(window).width();
	var h=$(window).height();

	function autoPlay(){
		var w=$(window).width();
		if(w<769){
			$('.first_screen').css({
	            'height':$(window).height()-50,
	        });
		}else if(w<1383){
			$('.first_screen').css({
	            'height':'auto',
	            'max-height':$(window).height()-50,
	        });
		}else{
			$('.first_screen').css({
	            'height':1/2*w,
	            'max-height':$(window).height()-50,
	        });
		}


		if(w>=975){
			var h3=$(".feedback section .bd img").height();
			$(".feedback section .bd").css({'height':h3});

			var h1=$('.feedback .raise_pc section').outerHeight();
			console.log(h1);
			$('.feedback article img').css({
				'height':h1,
				'width':h1*9/16,
			});

			var h2=$('.raise_more article ol').height();
			$('.raise_more section li div').css('height',h2-172);

		}else{
			$('.raise_more section li div').css('height','auto');
			$('.feedback article img').css({
				'height':'auto',
				'width':'auto',
			});
		}

		if(w>=751){

		}

		$(".feedback article").slide({mainCell:".bd ul",autoPlay:true});



		// 超出截断
		/*if(w<992){
			$('.raise_more section li p').each(function(i){
	            var $p = $(this);
	            $p.text($p.attr("data-text"));
	            while ($p.outerHeight() >42) {
	            	// console.log("【replace前】"+$p.outerHeight()+$p.text());
	                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	                // console.log("【replace后】"+$p.outerHeight()+$p.text());
	            };
	     });
		}else if(w<1200){
			$('.raise_more section li p').each(function(i){
	            var $p = $(this);
	            $p.text($p.attr("data-text"));
	            // console.log("【replace前】"+$p.outerHeight()+$p.text());
	            while ($p.outerHeight() >48) {
	                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	            };
	            // console.log("【replace后】"+$p.outerHeight()+$p.text());
	     	});
		}else{
			$('.raise_more section li p').each(function(i){
	            var $p = $(this);
	            $p.text($p.attr("data-text"));
	            // console.log("【replace前】"+$p.outerHeight()+$p.text());
	            while ($p.outerHeight() >56) {
	                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	            };
	            // console.log("【replace后】"+$p.outerHeight()+$p.text());
	     	});
		}
*/
	}
	autoPlay();


	$(window).resize(function(event) {
		autoPlay();
	});

	$('.features li').mouseover(function(event) {
		$(this).addClass('selector').siblings('.features li').removeClass('selector');
	});


	var timer=null;
	var mytop=1;
	$('.feedback section ol li').click(function(event) {
		mytop++;
		$(this).addClass('current').siblings('.feedback section ol li').removeClass('current')
			var index=$(this).index();
		$('.feedback section ul li').eq(index).css({zIndex:mytop});
	});




	$('.Data_for ul li').click(function(event) {
		console.log($(this).attr("isclick"));
		if($(this).attr("isclick")=='1'){
			$(this).find('.radio-btn').removeClass('checkedRadio');
			$(this).attr("isclick","0");
		}
		else{
			$(this).find('.radio-btn').addClass('checkedRadio');
			$(this).attr("isclick","1");
		}
	});


	$('.Data_for ul input').wrap('<div class="radio-btn"><i>&#xe94e;</i></div>');
	$(".radio-btn").on('click', function () {
	    var _this = $(this),
	        block = _this.parent().parent();
	    block.find('input').attr('checked', false);
	    block.find(".radio-btn").removeClass('checkedRadio');
	    _this.addClass('checkedRadio');
	    _this.find('input').attr('checked', true);
	});

})

	//倒计时
  var currentDate = new Date();
  var strEndTime = "2016/02/30";
  var EndTime=new Date(strEndTime);

  var days= EndTime - currentDate;
  EndTimeMsg = parseInt(days / 1000);

  function show() {
	d = Math.floor(EndTimeMsg / 60 / 60 / 24);
    h = Math.floor(EndTimeMsg /60/60 - (24*d));
    m = Math.floor(EndTimeMsg/60 - (24*60*d) - (60*h));
    s = Math.floor(EndTimeMsg - (24*60*60*d) - (60*60*h) - (60*m));
    EndTimeMsg--;

    $('#ds').attr('src',"images/"+parseInt(d/10)+".png")
    $('#df').attr('src',"images/"+parseInt(d%10)+".png")
    $('#hs').attr('src',"images/"+parseInt(h/10)+".png")
    $('#hf').attr('src',"images/"+parseInt(h%10)+".png")
    $('#ms').attr('src',"images/"+parseInt(m/10)+".png")
    $('#mf').attr('src',"images/"+parseInt(m%10)+".png")
    $('#ss').attr('src',"images/"+parseInt(s/10)+".png")
    $('#sf').attr('src',"images/"+parseInt(s%10)+".png")

    if (EndTimeMsg < 0)
    {
    $('#ds').attr('src',"images/"+0+".png")
    $('#df').attr('src',"images/"+0+".png")
    $('#hs').attr('src',"images/"+0+".png")
    $('#hf').attr('src',"images/"+0+".png")
    $('#ms').attr('src',"images/"+0+".png")
    $('#mf').attr('src',"images/"+0+".png")
    $('#ss').attr('src',"images/"+0+".png")
    $('#sf').attr('src',"images/"+0+".png")
    }
  }
  setInterval("show()", 1000);