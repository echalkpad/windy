var order = "";
var checkId = 1;
var backid = "";
var backurl = "";

document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var orderId = self.orderId;
	backid = self.backid?self.backid:"0";
	backurl = self.backurl?self.backurl:"0";
//	console.log(self.backid);
	//初始化订单详情页面数据
	orderDetailsPay.initorderDetailsPay(orderId);
});

var orderDetailsPay = {
	initorderDetailsPay : function(orderId){
		if(checkId == 1){
			checkId ++;
			jyapp.getApi({
	 			method: 'Tumour/OrderDetails',
	 			data:'orderId='+orderId,
	 			timeout : 10000,
	 			onsuccess: function(data) {
	 				checkId = 1;
	 				order = data;
//	 				console.log(JSON.stringify(data));
					document.getElementById("orderDetailsPaySpanNameId").innerHTML = data.data.doctorName;
					document.getElementById("orderDetailsPaySpansyNameId").innerHTML = data.data.diseaseName;
					document.getElementById("orderDetailsPayPhoneId").innerHTML = data.data.Phone;
					document.getElementById("orderDetailsPayTypeId").innerHTML = "电话咨询(15分钟)";
					document.getElementById("orderDetailsPayMonery").innerHTML = data.data.TotalFee;
	 			},
	 			onerror: function(e) {
	 				checkId = 1;
	 				console.log("initorderDetailsPay---->:"+e);
//	 				plus.nativeUI.alert(e,'','健医宝','确认');
	 			}
	 		});
		}
		
	},
	initOrderDetailsPayOnclick : function(){
//		console.log(JSON.stringify(order));
		var payinfo = {
			subject:'肿瘤专家预约咨询订单',
			body:"肿瘤专家预约咨询订单，接诊医生为 "+order.data.Name+",订单时间:"+commomUtil.stringToDate(order.data.OrderTime),
			orderno:order.data.OrderNo,
			totalfee:order.data.TotalFee,
			orderId:order.data.ID,
			type:"cancerOrder",
			backurl : backurl,
			backid : backid,
			method : "newIdsCancerOrderList",
			successpage:{
				id:'payOrderSucceed',
				url:'../pay/payOrderSucceed.html'
			},
			backCell:{
				id: 'cancerOrderList',
				url: "../cancerExperts/cancerOrderList.html",
				index : 1
			}

		};
		mui.openWindow({
			id: 'payment',
			url: "../core/payment.html",
			extras : {
				payinfo : payinfo
			}
		});
	},
	orderDetailsPayBackCell : function(){
		var config = {
			id : "cancerOrderList",
			url: "cancerOrderList.html",
			method : "newIdsCancerOrderList",
			extras : {
				backurl: backurl,
				backid : backid,
				index : 1
			}
		}
		jyapp.backWebView(config);
	}
};
//绑定支付页面跳转
document.getElementById("orderDetailsPaySumbitId").addEventListener('click',orderDetailsPay.initOrderDetailsPayOnclick);
//绑定回退按钮事件
document.getElementById("orderDetailsPayBackCellId").addEventListener("tap",orderDetailsPay.orderDetailsPayBackCell);
//绑定取消按钮事件
document.getElementById("cancerCancel").addEventListener("tap",orderDetailsPay.orderDetailsPayBackCell);
//mui.back = function(e){
//	orderDetailsPay.orderDetailsPayBackCell();
//};
