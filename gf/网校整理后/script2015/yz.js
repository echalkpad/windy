var wait=60;
document.getElementById("btn").disabled = false;   
function time(o) {
        if (wait == 0) {
            o.removeAttribute("disabled");           
            o.value="获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value="重新发送(" + wait + ")";
            wait--;
            setTimeout(function() {
                time(o)
            },
            1000)
        }
    }
document.getElementById("btn").onclick = function () { time(this); SendRegCheckVal(document.getElementById("tel").value) }


function f_timeout(){
 
 $('#timeb1').html('<span id="timeb2">60</span>秒后重新获取');
 $('#timeb1').click(function(){});
 timer = self.setInterval(addsec,1000);
}
function addsec(){
 
 var t = $('#timeb2').html();
 //alert(t);
 if(t > 0){
  
  $('#timeb2').html(t-1);
  //alert(t);
 }else{
  
  window.clearInterval(timer);
  $('#timeb1').html('<span id="timeb2"></span>重新获取验证码');
  $('#timeb1').click(function(){getVerify();});
 }
 
}