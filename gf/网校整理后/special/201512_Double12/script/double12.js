
$(function(){
  

    
$("#elevator ul li a").click(function(){
    $("#elevator ul li .current").removeClass("current");
$(this).addClass("current");
    var num=$("#elevator ul li").index($(this));
    
    
    })
var top=$("body").scrollTop();
if(top>=240){
    $("#elevator").show();
}
    
    })


window.onload=init;
    function init(){
      
        var btn=document.getElementById("top");
        window.onscroll=function(){
            var  bh=window.innerHeight||document.documentElement.clientHeight;
            if(document.body.scrollTop>bh){
                btn.style.display="block";
                }else{
                btn.style.display="none";
                    }
            
            }
            
            btn.onclick=function(){
            var t=document.body.scrollTop; 
                for(var i=1;i<100;i++){
                        (function(){
                            var po=i;
                            setTimeout(function(){
                            document.body.scrollTop=t-(t/100*po);
                                },10*po);//time out ed
                        })(i);
                    }//for ed
                }//click ed
                
        
        
        
        }