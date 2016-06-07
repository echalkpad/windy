function getQueryString(name) {
    var reg =new RegExp("(^|&)"+ name +"=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !=null) return unescape(r[2]); return null;
  }

  var currentDate = new Date();
  //var strEndTime = "2015/4/30 10:20:30";
  var EndTime=new Date(strEndTime);
  
  var days= EndTime - currentDate; 
  EndTimeMsg = parseInt(days / 1000);

  function show() {
	d = Math.floor(EndTimeMsg / 60 / 60 / 24);  
    h = Math.floor(EndTimeMsg /60/60 - (24*d));
    m = Math.floor(EndTimeMsg/60 - (24*60*d) - (60*h));
    s = Math.floor(EndTimeMsg - (24*60*60*d) - (60*60*h) - (60*m));   
    document.getElementById("DD").innerHTML = d; //parseInt(h/24);
    document.getElementById("HH").innerHTML = h;
    document.getElementById("MM").innerHTML = m;
    document.getElementById("SS").innerHTML = s;
    EndTimeMsg--;
    if (EndTimeMsg < 0)
    {
        document.getElementById('ULLiveTime').outerHTML = '';
        document.getElementById('PLiveFinish').style.display = 'block';
        //document.getElementById("DD").innerHTML = "0";
        //document.getElementById("HH").innerHTML = "00";
        //document.getElementById("MM").innerHTML = "00";
        //document.getElementById("SS").innerHTML = "00";;
    }
  }
  setInterval("show()", 1000)