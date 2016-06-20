var payinfo = "";
document.addEventListener('plusready', function() {
	checkId = 1;
	var self = plus.webview.currentWebview();
	payinfo = self.payinfo;
	//初始化订单详情页面数据
	payOrderSucceed.initpayOrderSucceed(payinfo);
});

var payOrderSucceed = {
	initpayOrderSucceed : function(payinfo){
		document.getElementById("PayOrderSucceedPriceId").innerHTML = payinfo.totalfee+"元";
	},
	jumpOrderList : function(){
		//肿瘤专家
		if(payinfo && payinfo.type =="cancerOrder"){
			var config = {
				id: 'cancerOrderList',
				url: "../cancerExperts/cancerOrderList.html",
				method : "newIdsCancerOrderList",
				extras : {
					backurl: payinfo.backurl,
					backid : payinfo.backid,
					index: 2
				}
			}
			jyapp.backWebView(config);
			//家庭医生
		}else if(payinfo && payinfo.type == "familyDoctor"){
			var config = {
				id : "consultingRecords",
				url: "../familyDoctor/consultingRecords.html",
				method : "newIdsConsultingRecord",
				extras : {
					backurl: payinfo.backurl,
					backid : payinfo.backid,
					index: 1
				}
			}
			jyapp.backWebView(config);
			//慢病专家
		}else if(payinfo && payinfo.type == "slowOrder"){
			var config = {
				id: 'SlowOrderList',
				url: "../SlowExperts/slowOrderList.html",
				method : "newIdsSlowOrderList",
				extras : {
					backurl: payinfo.backurl,
					backid : payinfo.backid,
					index: 1
				}
			}
			jyapp.backWebView(config);
			//体检
		}else if(payinfo && payinfo.type == "healthExamination"){
			var config = {
				id : "healthExaminationOrder",
				url: "../healthy/healthExamination/healthExaminationOrder.html",
				method : "newIdsHealthExaminationList",
				extras : {
					backurl: payinfo.backurl,
					backid : payinfo.backid,
					index: 2
				}
			}
			jyapp.backWebView(config);
			//基因检测
		}else if(payinfo && payinfo.type == "geneticOrderDetai"){
			var config = {
				id : "geneticOrder",
				url : "../healthy/geneticDiagnosis/geneticOrder.html",
				method : "newidsGeneticOrder",
				extras : {
					backurl: payinfo.backurl,
					backid : payinfo.backid,
					index: 1
				}
			}
			jyapp.backWebView(config);
		}else if(payinfo && payinfo.type=="spaOrderDetail"){
			//疗养
			var config = {
				id : "spaOrder",
				url : "../healthy/spa/spaOrder.html",
				method : "newSpaOrdersRecord",
				extras : {
					backurl: payinfo.backurl,
					backid : payinfo.backid,
					index: 1
				}
			}
			jyapp.backWebView(config);
		}
	}
}
//绑定返回相应的订单列表页->>查看订单
document.getElementById('payOrderSucceedRebackID').addEventListener('click', payOrderSucceed.jumpOrderList);
//肿瘤专家支付成功->>查看订单
mui(".mui-content").on('tap', '#payOrderDetailsSee', payOrderSucceed.jumpOrderList);