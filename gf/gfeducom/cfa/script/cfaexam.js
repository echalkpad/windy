function getQueryString(name) {
    var reg =new RegExp("(^|&)"+ name +"=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !=null) return unescape(r[2]); return null;
  }

  var currentDate = new Date();
  var strEndTime = "2015/12/30 10:20:30";
  var EndTime=new Date(strEndTime);
  
  var days= EndTime - currentDate; 
  EndTimeMsg = parseInt(days / 1000);

  function show() {
	d = Math.floor(EndTimeMsg / 60 / 60 / 24);  
    h = Math.floor(EndTimeMsg /60/60 - (24*d));
    m = Math.floor(EndTimeMsg/60 - (24*60*d) - (60*h));
    s = Math.floor(EndTimeMsg - (24*60*60*d) - (60*60*h) - (60*m));   
    document.getElementById("day").innerHTML = d; //parseInt(h/24);
  
    EndTimeMsg--;
    if (EndTimeMsg < 0)
    {
        document.getElementById("day").innerHTML = '0';
    }
  }
  setInterval("show()", 1000)
  

$(function(){
	
	window_width = $(window).width();
//	alert(window_width);
	if(window_width>768){
		$(window).scroll(function(){
			var p=$(window).scrollTop();
			if(p>0){
				$("#cdsidenav").fadeIn();
			}else{
				$("#cdsidenav").fadeOut();
			}
		});
		
	}
	
	$(window).scroll(function(){
		var p=$(window).scrollTop();
		if(p>0){
			$("#gotop").fadeIn();
		}else{
			$("#gotop").fadeOut();
		}
	});
	
	
	
	
})






