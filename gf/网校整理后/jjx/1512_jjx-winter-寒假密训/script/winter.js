/**
 * javascript
 * @authors songlingxi
 * @date    2015-12-21 17:02:40
 */
	window.onload=init;
	function init(){
		var bttn=document.getElementById("bttn");
		window.onscroll=function(){
			var  bh=window.innerHeight||document.documentElement.clientHeight;
			if(document.body.scrollTop>bh){
				bttn.style.display="block";
				}else{
				bttn.style.display="none";
					}
			}
			bttn.onclick=function(){
			var t=document.body.scrollTop;
				for(var i=1;i<100;i++){
						(function(){
							var po=i;
							setTimeout(function(){
							document.body.scrollTop=t-(t/100*po);
								},10*po);
						})(i);
					}
				}
				function getScrollTop(){
   			var scrollTop=0;
   			if(document.documentElement&&document.documentElement.scrollTop){
              scrollTop=document.documentElement.scrollTop;
			 }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop; 
		}
		}


		