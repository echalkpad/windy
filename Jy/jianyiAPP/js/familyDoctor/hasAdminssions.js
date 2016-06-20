var obj = "";
var checkId = 0;
var hasAdminssions = {
	initHasAdminssions : function(){
		var self = plus.webview.currentWebview();
		obj = self.msg;
		var hasAdmissionsIdHtml = "<div class=\"admission-t\">";
		hasAdmissionsIdHtml += "<img src='"+obj.DoctorHead+"'/>";
		hasAdmissionsIdHtml += "<h1><span>"+obj.DoctorName+"</span><span>"+obj.DepartmentName+"</span>&nbsp;<span>"+obj.ProfessionTitle+"</span></h1>";
		hasAdmissionsIdHtml += "<h2>"+obj.HospitalName+"</h2>";
		hasAdmissionsIdHtml += "<p>已接诊</p>";
		hasAdmissionsIdHtml += "</div>";
		hasAdmissionsIdHtml += "<div class=\"admission-b\">";
		hasAdmissionsIdHtml += "<p>医生已接诊，电话将在<i>5</i>分钟内接入，请注意接听哦！</p>";//2016/5/24明星东修改
		hasAdmissionsIdHtml += "</div>";
		document.getElementById("hasAdmissionsId").innerHTML = hasAdmissionsIdHtml;
	},
	payhasAdmissions : function(){
		if(checkId == 1){
			checkId++;
			//判断订单是否未支付
			jyapp.getApi({
	 			method: 'DoctorOnline/OrderDetails',
	 			data:'orderId='+obj.OrderId,
	 			timeout : 10000,
	 			onsuccess: function(data) {
	 				checkId = 1;
//	 				console.log(JSON.stringify(data));
	 				var code = data.code;
	 				var status = data.data.Status;
	   				if(code == 1 && status == 3){
//					if(code == 1){
	 					mui.openWindow({
							id: 'payOrderFailure',
							url: "../pay/payOrderFailure.html",
							extras : {
								orderId : data.data.ID
							}
						});
	 				}else{
	 					plus.nativeUI.alert("当前订单不能支付！",'','健医宝','确认');
	 				}
	 			},
	 			onerror: function(e) {
	   				console.log("payhasAdmissions------>:"+e);
//	 				plus.nativeUI.alert(e,'','健医宝','确认');
	 				checkId = 1;
	 			}
	 		});
		}
	},
	hasAdmissionsBackCell : function(){
		var config = {
			id : "consultingRecords",
			url : "consultingRecords.html",
			method : "newIdsConsultingRecord",
			extras : {
				backurl: "",
				backid : "",
				index: 0
			}
		}
		jyapp.backWebView(config);
	}
};

document.addEventListener("plusready", function() {
//	commomUtil.closeAll(plus.webview.currentWebview().id);
	checkId = 1;
	//初始化页面数据
	hasAdminssions.initHasAdminssions();
	commomUtil.closeWebviewById("callDocIng");
});


//绑定支付页面跳转
document.getElementById("payhasAdmissionsId").addEventListener('tap',hasAdminssions.payhasAdmissions);
//绑定回退按钮事件
document.getElementById("hasAdmissionsBackCellId").addEventListener("tap",hasAdminssions.hasAdmissionsBackCell);
//mui.back = function(e){
//	hasAdminssions.hasAdmissionsBackCell();
//}
