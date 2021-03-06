var ul = document.getElementById('xingxing');
var ul_lis = ul.getElementsByTagName('span');
clearAll = function() {
	for (var i = 0; i < ul_lis.length; i++) {
		ul_lis[i].className = 'xing';
	}
}
for (var i = 0; i < ul_lis.length; i++) {
	ul_lis[i].index = i;
	ul_lis[i].onclick = function() {
		clearAll();
		var j = this.index + 1;
		for (var i = 0; i < j; i++) {
			ul_lis[i].className = 'xing xing-active';
		}
	}
}
var checkId = 0;
var orderId = "";
var backid = "";
var backurl = "";
document.addEventListener("plusready", function() {
	commomUtil.closeAll(plus.webview.currentWebview().id);
	var self = plus.webview.currentWebview();
	orderId = self.orderId;
	backid = self.backid;
	backurl = self.backurl;
	checkId = 1;
	//初始化页面数据
	orderEvaluation.initorderEvaluation(orderId);
});

var orderEvaluation = {
	initorderEvaluation : function(orderId){
//		console.log(orderId);
		if(checkId == 1){
			checkId ++;
			jyapp.getApi({
	   			method: 'DoctorOnline/OrderDetails',
	   			data:'orderId='+orderId,
	   			timeout : 10000,
	   			onsuccess: function(data) {
	   				checkId = 1;
//	   				console.log(JSON.stringify(data));
	   				var code = data.code;
	   				order = data;
	   				if(code == 1){
	   					document.getElementById("doctorNameId").innerHTML = data.data.Name;
	   					document.getElementById("orderTimeId").innerHTML = commomUtil.stringToDate(data.data.OrderTime);
	   					document.getElementById("zixunwentId").innerHTML = data.data.SickDescription;
	   					var isPicture = data.data.isPicture;
						if(isPicture){
							var picPeopleIdHtml = "";
							var pic1 = data.data.Pic1;
							if(pic1){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic1+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							var pic2 = data.data.Pic2;
							if(pic2){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic2+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							var pic3 = data.data.Pic3;
							if(pic3){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic3+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							var pic4 = data.data.Pic4;
							if(pic4){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic4+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							document.getElementById("picPeopleId").innerHTML = picPeopleIdHtml;
						}
	   					document.getElementById("zdzjId").innerHTML = data.data.DoctorSummary;
	   				}
	   			},
	   			onerror: function(e) {
	   				checkId = 1;
	   				console.log("initorderEvaluation------>:"+e);
//	   				plus.nativeUI.alert(e,'','健医宝','确认');
	   			}
	   		});
	   	}
	},
	initpjorderEvaluation : function(){
		if(checkId == 1){
			checkId ++;
			//获取评价评分
			var score = 0;
			for (var i = 0; i < ul_lis.length; i++) {
				if(ul_lis[i].className == "xing xing-active"){
					score = i + 1;
				}
			}
			if(score < 1){
				checkId = 1;
				plus.nativeUI.alert('评分最低为1分！','','健医宝','确认');
				return false;
			}
//			console.log(score);
			//获取评论内容
			var comments = document.getElementById("orderEvaluationTextarea").value;
			if(!commomUtil.validateCommon(comments)){
				plus.nativeUI.alert('评价内容不能有特殊字符，允许的字符为字母、数字、下划线、中文','','健医宝','确认');
				return false;
			}
			if(comments&&(comments.length<5||comments.length>250)){
				plus.nativeUI.alert('评论内容必须在5-250字之间','','健医宝','确认');
				return false;
			}
			var requestData = "orderId="+orderId+"&score="+score+"&comment="+comments;
//			console.log(requestData);
			jyapp.getApi({
	   			method: 'DoctorOnline/OrderComment',
	   			data:requestData,
	   			timeout : 10000,
	   			showWaiting: true,
	   			onsuccess: function(data) {
	   				checkId = 1;
//	   				console.log(JSON.stringify(data));
	   				var code = data.code;
	   				order = data;
	   				if(code == 1){
//	   					plus.webview.getWebviewById("consultingRecords").reload();
	   					mui.openWindow({
							id: 'consultingRecords',
							url: "../familyDoctor/consultingRecords.html",
							createNew: true,
							extras : {
								backurl:backurl,
								backid : backid,
								index:2
							}
						});
	   				}else{
	   					plus.nativeUI.alert(data.msg,'','健医宝','确认');
	   				}
	   			},
	   			onerror: function(e) {
	   				checkId = 1;
	   				console.log("initpjorderEvaluation------>:"+e);
//	   				plus.nativeUI.alert(e,'','健医宝','确认');
	   			}
	   		});
	   	}
	},
	orderEvaluationBackCell : function(){
		var config = {
			id : "consultingRecords",
			url: "../familyDoctor/consultingRecords.html",
			method : "newIdsConsultingRecord",
			extras : {
				backurl: backurl,
				backid : backid,
				index: 1
			}
		}
		jyapp.backWebView(config);
	}
}

//绑定评价按钮事件
document.getElementById("pingjiaOrderEvaluationId").addEventListener('click',orderEvaluation.initpjorderEvaluation);
//绑定回退事件
document.getElementById("orderEvalueationBackCellId").addEventListener("click",orderEvaluation.orderEvaluationBackCell);
//mui.back = function(e){
//	orderEvaluation.orderEvaluationBackCell();
//};
mui('.mui-content').on('tap','#orderEvaluationTextarea',function(){
	this.focus();
	this.innerHTML = '';
})
//点击显示全部
mui('.mui-content').on('tap','.all-question',function(){
	var P1 = document.getElementById("zixunwentId");
	var P2 = document.getElementById("zdzjId");
	P1.classList.remove('ellipsis');
	P2.classList.remove('ellipsis');
})


