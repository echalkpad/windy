//呼叫医生
var checkId = 1;
document.addEventListener('plusready', function() {
	//判断是否有未支付的订单，如果有未支付的订单不能再次呼叫医生
	indexFamilyDoctor.checkFamilyDoctor();
});
var indexFamilyDoctor = {
	//判断是否有未支付的订单，如果有未支付的订单不能再次呼叫医生
	checkFamilyDoctor : function(type){
		if(checkId == 1){
			checkId ++;
			jyapp.getApi({
				method: 'DoctorOnline/OrderListRe',
				data:'orderType=3&pageIndex=1&pageSize=10',
				timeout : 10000,
				onsuccess: function(data) {
					checkId = 1;
//					console.log(JSON.stringify(data));
					var dataValue = data.data.list;
					if(dataValue.length != 0){
						plus.nativeUI.confirm('您有未支付的呼叫医生订单，是否进入支付页面！',function(e){
//							console.log(e.index);
							var index = e.index;
							if(index == 0){
								indexFamilyDoctor.onclickConsultingRecords();
							}
						},"提示", ["确认进入","取消"]);
					}else{
						if(type){
							if(commomUtil.reloadWebviewById("callDoctor")){
								mui.openWindow({
									id: 'callDoctor',
									url: "callDoctor.html"
								});
							}
						}
					}
				},
				onerror: function(e) {
					checkId = 1;
	   				console.log("checkFamilyDoctor------>:"+e);
				}
			});
		}
	},
	indexFamilyDoctorBack : function(){
		var mianPage = plus.webview.getLaunchWebview();
		var config = {id:mianPage.id};
		jyapp.backWebView(config);
//		
//		mianPage.show();
//		mui.openWindow({
//			id : mianPage.id,
//			url : mianPage.uri,
//			extras : {
//				index:1
//			}
//		});
	},
	onclickConsultingRecords : function(){
		mui.openWindow({
			id: 'consultingRecords',
			url: "consultingRecords.html",
			extras : {
				index:0
			}
		});
	}
}
//呼叫医生
mui(".mui-content").on('tap', '#callDoctor', function() {
	//判断是否有未支付的订单，如果有未支付的订单不能再次呼叫医生
	indexFamilyDoctor.checkFamilyDoctor("callDoctor");
})
	//服务流程
mui(".mui-content").on('tap', '#serviceFlow', function() {
		mui.openWindow({
			id: 'Service_process',
			url: "Service_process.html"
		});
	})
	//医生团队
mui(".mui-content").on('tap', '#doctorTeam', function() {
	commomUtil.closeWebviewById("doctorTeam");
	mui.openWindow({
		id: 'doctorTeam',
		url: "doctorTeam.html",
		createNew: true
	});
})
	//咨询记录
document.getElementById("consultingRecords").addEventListener("click",indexFamilyDoctor.onclickConsultingRecords);


//绑定回退事件
document.getElementById("indexFamilyDoctorBackId").addEventListener("tap",indexFamilyDoctor.indexFamilyDoctorBack);
//mui.back = function(e){
//	indexFamilyDoctor.indexFamilyDoctorBack();
//}