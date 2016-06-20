var ul = document.getElementById('xingxing');
var ul_lis = ul.getElementsByTagName('span');
clearAll = function() {
	for (var i = 0; i < ul_lis.length; i++) {
		ul_lis[i].className = 'xing';
	}
}

document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var orderId = self.orderId;
	//初始化订单详情页面数据
	orderDetailsFinish.initOrderDetailsFinish(orderId);
});
var orderDetailsFinish = {
	initOrderDetailsFinish : function(orderId){
		jyapp.getApi({
 			method: 'Tumour/OrderDetailsRe',
 			data:'orderId='+orderId,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				document.getElementById("orderDetailsFinishSpanNameId").innerHTML = data.data.doctorName;
				document.getElementById("orderDetailsFinishSpansyNameId").innerHTML = data.data.diseaseName;
				document.getElementById("orderDetailsFinishPhoneId").innerHTML = data.data.Phone;
				document.getElementById("orderDetailsFinishTypeId").innerHTML = "电话咨询(15分钟)";
				document.getElementById("orderDetailsFinishMonery").innerHTML = data.data.TotalFee;
				var score = data.data.Score ? data.data.Score : 0;
				clearAll();
				for (var i = 0; i < score; i++) {
					ul_lis[i].className = 'xing xing-active';
				}
				var comm = data.data.Comment?data.data.Comment : "";
				document.getElementById("orderDetailsFinishdivConId").innerText = comm;
 			},
 			onerror: function(e) {
	 				console.log("initOrderDetailsFinish---->:"+e);
//	 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	}
};
