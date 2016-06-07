$(function(){
	
	var winW = $(window).width();
	if(winW<768){
		var sH = $('.wmsg').width();
		$('.secli').height(sH*3);
		$(window).resize(function(){
			var sH = $('.wmsg').width();
			$('.secli').height(sH*3);		
		})		
	}else{

		var sH = $('.wmsg').width();

		$('.secli').height($('.wmsg li:first-child').width());
		$(window).resize(function(){
			var sH = $('.wmsg').width();
			$('.secli').height($('.wmsg li:first-child').width());
		})
	}


	$(window).resize(function(){
		var winW = $(window).width();
		if(winW<768){
			var sH = $('.wmsg').width();
			$('.secli').height(sH*3);
			$(window).resize(function(){
				var sH = $('.wmsg').width();
				$('.secli').height(sH*3);		
			})		
		}else{

			var sH = $('.wmsg').width();

			$('.secli').height($('.wmsg li:first-child').width());
			$(window).resize(function(){
				var sH = $('.wmsg').width();
				$('.secli').height($('.wmsg li:first-child').width());
			})
		}
	})

})





//倒计时
  var currentDate = new Date();
  var strEndTime = "2015/11/11";
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
  setInterval("show()", 1000)