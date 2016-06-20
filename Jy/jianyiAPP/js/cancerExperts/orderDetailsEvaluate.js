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
var a= document.getElementById('orderEvaluationTextarea');
mui('.mui-content').on('tap','#orderEvaluationTextarea',function(){
	this.focus();
	a.innerHTML='';
})
var checkId = 1;
var orderId = "";
var backid = "";
var backurl = "";
//判断字符长度
function getnum(e) {
	if (e.srcElement.textLength > 100) {
		return false;
	}
}
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	orderId = self.orderId;
	backid = self.backid;
	backurl = self.backurl;
	//初始化订单详情页面数据
	orderDetailsEvalueate.initOrderDetailsEvalueate(orderId);
//	console.log(orderId);
});
var orderDetailsEvalueate = {
	initOrderDetailsEvalueate : function(orderId){
//		console.log(orderId);
		jyapp.getApi({
 			method: 'Tumour/OrderDetails',
 			data:'orderId='+orderId,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				document.getElementById("orderEvalusteSpanNameId").innerHTML = data.data.doctorName;
				document.getElementById("orderEvalusteSpansyNameId").innerHTML = data.data.diseaseName;
				document.getElementById("orderEvalustePhoneId").innerHTML = data.data.Phone;
				document.getElementById("orderEvalusteTypeId").innerHTML = "电话咨询(15分钟)";
				document.getElementById("orderEvalusteMonery").innerHTML = data.data.TotalFee;
 			},
 			onerror: function(e) {
 				console.log("initOrderDetailsEvalueate---->:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	},
	initpjorderDetailsEvalueate : function(){
		if(checkId == 1){
			checkId ++;
			//获取评价评分
			var score = 0;
			for (var i = 0; i < ul_lis.length; i++) {
				if(ul_lis[i].className == "xing xing-active"){
					score = i + 1;
				}
			}
			if(score == 0){
				checkId = 1;
				plus.nativeUI.alert('评分最低为1分！','','健医宝','确认');
				return false;
			}
			//获取评论内容
			var comments = document.getElementById("orderDetailsEvaluateTextarea").value;
			if(!commomUtil.validateCommon(comments)){
				plus.nativeUI.alert('评论内容不能有特殊字符，允许的字符为字母、数字、下划线和中文','','健医宝','确认');
				return false;
			}
			
			comments = comments ? comments : "";
			if(comments&&(comments.length<5||comments.length>250)){
				plus.nativeUI.alert('评论内容必须在5~250个字之间','','健医宝','确认');
				return false;
			}
			var requestData = "orderId="+orderId+"&score="+score+"&comment="+comments;
//			console.log(requestData);
			jyapp.getApi({
	   			method: 'Tumour/OrderComment',
	   			data:requestData,
	   			timeout : 10000,
	   			showWaiting: true,
	   			onsuccess: function(data) {
	   				checkId = 1;
//	   				console.log(JSON.stringify(data));
	   				var code = data.code;
	   				order = data;
	   				if(code == 1){
	   					
	   					var config = {
							id : "cancerOrderList",
							url: "cancerOrderList.html",
							method : "newIdsCancerOrderList",
							extras : {
								backurl: backurl,
								backid : backid,
								index : 4
							}
						}
						jyapp.backWebView(config);
	   				}else{
	   					plus.nativeUI.alert(data.msg,'','健医宝','确认');
	   				}
	   			},
	   			onerror: function(e) {
	   				checkId = 1;
	 				console.log("initpjorderDetailsEvalueate---->:"+e);
//	 				plus.nativeUI.alert(e,'','健医宝','确认');
	   			}
	   		});
	   	}
	},
	canccerOrderDetailsEvaluateBack : function(e){
		var config = {
			id : "cancerOrderList",
			url: "cancerOrderList.html",
			method : "newIdsCancerOrderList",
			extras : {
				backurl: backurl,
				backid : backid,
				index : status == '待确认' ? 0 : 3
			}
		}
		jyapp.backWebView(config);
	}
};
//绑定评价按钮事件
document.getElementById("orderDetailsEvaluateId").addEventListener('click',orderDetailsEvalueate.initpjorderDetailsEvalueate);
//绑定回退事件
document.getElementById("orderDetailsEvaluteBackId").addEventListener("tap",orderDetailsEvalueate.canccerOrderDetailsEvaluateBack);
//mui.back = function(e){
//	orderDetailsEvalueate.canccerOrderDetailsEvaluateBack();
//}
