//倒计时
var num = 60;
var otime = document.getElementById("time");
var status = 0;
document.addEventListener('plusready', function() {
	minusOne();
	checkCallDoctor.sendCallDoctor();
});

function minusOne() {
	var m = num / 60;
	var s = num % 60;
	num--;
	if (num < -1) {
		if(status == 0){
			clearInterval(time);
			mui.openWindow({
				id: 'checkFailure',
				url: "checkFailure.html"
			});
			return false;
		}else{
			plus.webview.close(plus.webview.currentWebview());
		}
	}
	if (!(s.toString().length != 1)) {
		s = '0' + s.toString();
	}
	otime.innerHTML = Math.floor(m) + ':' + s;

}
var time = setInterval(function() {
	minusOne()
}, 1000);
var checkCallDoctor = {
	sendCallDoctor : function(){
		var self = plus.webview.currentWebview();
		var requestData = self.data;
		var twouploadfiles = self.files;
//		console.log(JSON.stringify(requestData));
		jyapp.upLoad({
			method: 'DoctorOnline/DoctorCall',
			data:requestData,
			files:twouploadfiles,
			timeout : 10000,
			onsuccess: function(data) {
//				console.log(JSON.stringify(data));
				status = data.code;
				var orderId = data.data.data;
				if(status == 1){
					mui.openWindow({
						id: 'callDocIng',
						url: "callDocIng.html",
						extras : {
							orderId : orderId
						}
					});
//					plus.webview.close(plus.webview.getWebviewById("check"));
				}
			},
			onerror: function(e) {
				console.log("onClickhealthyCod"+e);
	   			mui.openWindow({
					id: 'checkFailure',
					url: "checkFailure.html"
				});
			}
		});
	}
}
//document.getElementById("checkcleartime").addEventListener('tap', function() {
//	clearInterval(time);
//	mui.openWindow({
//		id: 'callDocIng',
//		url: "callDocIng.html"
//	});
//})