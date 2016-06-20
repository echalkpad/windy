var backid = "";
var backurl = "";
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var orderId = self.orderId;
	var status = self.status;
	backid = self.backid;
	backurl = self.backurl;
	//初始化订单详情页面数据
	slowOrderDetailsSee.initSlowDetailsSee(orderId, status);
});

var slowOrderDetailsSee = {
	initSlowDetailsSee: function(orderId, status) {
		jyapp.getApi({
			method: 'Treat/OrderDetails',
			data: 'orderId=' + orderId,
			timeout: 10000,
			onsuccess: function(response) {
				var dataValue = response.data;
				if (dataValue != null) {
					orders = dataValue;
					var strTime = dataValue.VisitDate;
					var endLen = strTime.length - 2;
					var time = strTime.substring(6, endLen);
					var visit = commomUtil.formatStringToDate(time, 2);
					var VisitDate = (visit.substring(0, visit.length - 3));
					var week = commomUtil.formatDateToWeek(time);
					document.getElementById("slowDetailsSeeStrongid").innerHTML = status;
					document.getElementById("slowDetailsSeeSpanNameID").innerHTML = dataValue.doctorName;
					document.getElementById("slowDetailsSeeSpanTimeID").innerHTML = VisitDate + '(' + week + ')';
					document.getElementById("slowDetailsSeeAddressID").innerHTML = dataValue.VisitPlace;
					document.getElementById("slowDetailsSeePatientID").innerHTML = dataValue.patientName;
					document.getElementById("slowDetailsSeeIdNumberID").innerHTML = dataValue.IDCard;
					document.getElementById("slowDetailsSeePhoneID").innerHTML = dataValue.Phone;
					document.getElementById("slowDetailsSeeConsultingPriceID").innerHTML = "¥" + dataValue.Fee;
					document.getElementById("slowDetailsSeeEnsureID").innerHTML = "¥" + dataValue.Deposit;
					var cashCoupon = dataValue.TotalFee - (dataValue.Deposit + dataValue.Fee);
					document.getElementById("slowDetailsSeeCashCouponID").innerHTML = "¥" + cashCoupon;
					document.getElementById("slowDetailsSeeTotalPriceID").innerHTML = "¥" + dataValue.TotalFee;
					document.getElementById("slowDetailsSeeOrderNoID").value = dataValue.OrderNo;
				}
			},
			onerror: function(e) {
				console.log("initSlowDetailsSee:" + e);
//				plus.nativeUI.alert(e, '','健医宝', '确认');
				return false;
			}
		});
	},
	orderDetailsSeeBackCell : function(){
		var config = {
			id : "slowOrderList",
			url : "slowOrderList.html",
			method : "newIdsSlowOrderList",
			extras : {
				backurl: backurl,
				backid : backid,
				index : 1
			}
		}
		jyapp.backWebView(config);
	}
}

//绑定回退事件
document.getElementById("orderDetailsSeeBackCellId").addEventListener("tap",slowOrderDetailsSee.orderDetailsSeeBackCell);