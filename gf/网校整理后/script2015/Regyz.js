var wait=60;
document.getElementById("btnP").disabled = false;
document.getElementById("btnM").disabled = false;

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
document.getElementById("btnP").onclick = function () { time(this); SendRegCheckVal(document.getElementById("telP").value); document.getElementById('notice_verifyCodeP').innerHTML = document.getElementById('MsgReaDiv').innerHTML; }
document.getElementById("btnM").onclick = function () { time(this); SendRegCheckVal(document.getElementById("telM").value); document.getElementById('notice_verifyCodeM').innerHTML = document.getElementById('MsgReaDiv').innerHTML }
