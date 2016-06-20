var initcancerOrderListdqrpageIndex = 1;
var pageSize = 10;
var initcancerOrderListdzfpageIndex = 1;
var initcancerOrderListdjzpageIndex =1;
var initcancerOrderListdpjpageIndex = 1;
var initcancerOrderListywcpageIndex = 1;
var dqrtotal = 0;
var dzftotal = 0;
var djztotal = 0;
var dpjtotal = 0;
var ywctotal = 0;
var initcancerOrderListdqrhtml = "";
var initcancerOrderListdzfhtml = "";
var initcancerOrderListdjzhtml = "";
var initcancerOrderListdpjhtml = "";
var initcancerOrderListywchtml = "";

var backid = "";
var backUrl = "";
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var index = self.index;
	backid = self.backid;
	backUrl = self.backurl;
	//初始化数据
	cancerOrderList.initData(index);
	
});

var cancerOrderList = {
	initData : function(index){
		document.getElementById("backcancerOrderListWebviewId").value = backid;
		document.getElementById("backcancerOrderListWebviewUrl").value = backUrl;
		//加载待确认数据
		cancerOrderList.initcancerOrderListdqr();
		//加载待支付数据
		cancerOrderList.initcancerOrderListdzf();
		//加载待就诊数据
		cancerOrderList.initcancerOrderListdjz();
		//加载待评论数据
		cancerOrderList.initcancerOrderListdpj();
		//加载已完成数据
		cancerOrderList.initcancerOrderListywc();
		//设置显示页面
		var divs = document.getElementById("segmentedControl");
		var consultingas = divs.getElementsByTagName("a");
		if(index){
			for(var i=0;i<consultingas.length;i++){
				consultingas[i].setAttribute('class','mui-control-item');
				document.getElementById("item"+(i+1)).setAttribute("class","mui-control-content");
				if(i == index){
					consultingas[i].setAttribute('class','mui-control-item mui-active');
					document.getElementById("item"+(i+1)).setAttribute("class","mui-control-content mui-active");
				}
			}
		}
		//加载下拉刷新事件
		document.addEventListener( "plusscrollbottom", function(){
			var divid = 0;
			for(var i=0;i<consultingas.length;i++){
				if(consultingas[i].className == "mui-control-item mui-active"){
					divid = i+1;
					break;
				}
			}
			if(divid == 1){
				if(dqrtotal == pageSize){
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',0);
					initcancerOrderListdqrpageIndex ++;
					cancerOrderList.initcancerOrderListdqr();
				}else{
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',1);
					return false;
				}
			}else if(divid == 2){
				if(dzftotal == pageSize){
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',0);
					initcancerOrderListdzfpageIndex++;
					cancerOrderList.initcancerOrderListdzf();
				}else{
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',1);
					return false;
				}
			}else if(divid == 3){
				if(djztotal == pageSize){
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',0);
					initcancerOrderListdjzpageIndex++;
					cancerOrderList.initcancerOrderListdjz();
				}else{
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',1);
					return false;
				}
			}else if(divid == 4){
				if(dpjtotal == pageSize){
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',0);
					initcancerOrderListdpjpageIndex++;
					cancerOrderList.initcancerOrderListdpj();
				}else{
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',1);
					return false;
				}
			}else if(divid == 5){
				if(ywctotal == pageSize){
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',0);
					initcancerOrderListywcpageIndex++;
					cancerOrderList.initcancerOrderListywc();
				}else{
					cancerOrderList.setTs('cancerOrderListContent','cancerOrderListTips',1);
					return false;
				}
			}
		});
	},
	checkDataFlag : function(id,type){
		if(type == 1){
			document.getElementById(id).style.display = "";		
		}else{
			document.getElementById(id).style.display = "none";
		}
	},
	initcancerOrderListdqr : function(){
		jyapp.getApi({
 			method: 'Tumour/OrderList',
 			data:'orderStaus=1&pageIndex='+initcancerOrderListdqrpageIndex+'&pageSize='+pageSize,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
					cancerOrderList.checkDataFlag("cancerOrderListzwddfirmedId",0);
					var dataValue = data.data.list;
					dqrtotal = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var hospitalName = dataValue[i].hospitalName?dataValue[i].hospitalName:"--";
						var departmentName = dataValue[i].departmentName?dataValue[i].hospitalName:"--";
						var endLen = dataValue[i].OrderTime.length - 2;
						var time = dataValue[i].OrderTime.substring(6, endLen);
						initcancerOrderListdqrhtml += "<li class=\"mui-table-view-cell mui-media\">";
						initcancerOrderListdqrhtml += "<a href=\"javascript:;\">";
						initcancerOrderListdqrhtml += "<input type='hidden' value="+dataValue[i].ID+" />"
						initcancerOrderListdqrhtml += "<img class=\"mui-media-object mui-pull-left\" src="+dataValue[i].Pic+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" >";
						initcancerOrderListdqrhtml += "<div class=\"mui-media-body\">";
						initcancerOrderListdqrhtml += "<h2><span>"+dataValue[i].doctorName+"</span><span>"+dataValue[i].Title+"</span><span>"+commomUtil.formatStringToDate(time,3)+"</span></h2>";
						initcancerOrderListdqrhtml += "<p class=\"mui-ellipsis\">"+hospitalName+"<span>"+departmentName+"</span></p>";
						initcancerOrderListdqrhtml += "</div>";
						initcancerOrderListdqrhtml += "<small>实付金额：<strong>¥"+dataValue[i].TotalFee+"</strong><em>等待客服确认</em></small>";
						initcancerOrderListdqrhtml += "</a>";
						initcancerOrderListdqrhtml += "</li>";
						
					}
				}else{
					dqrtotal=0;
					if(initcancerOrderListdqrhtml == ""){
						cancerOrderList.checkDataFlag("cancerOrderListzwddfirmedId",1);
					}
				}
				
//				if(dataValue.length == 0){
//					initcancerOrderListdqrhtml += "<li class=\"mui-table-view-cell mui-media\">";
//					initcancerOrderListdqrhtml += "<a href=\"javascript:;\">";
//					initcancerOrderListdqrhtml += "<input type='hidden' value='575' />"
//					initcancerOrderListdqrhtml += "<img class=\"mui-media-object mui-pull-left\" src=\"../../img/pic_people.png\">";
//					initcancerOrderListdqrhtml += "<div class=\"mui-media-body\">";
//					initcancerOrderListdqrhtml += "<h2><span>张三</span><span>主治医生</span><span>12-12 15:00</span></h2>";
//					initcancerOrderListdqrhtml += "<p class=\"mui-ellipsis\">北京协和医院 <span>血液内科</span></p>";
//					initcancerOrderListdqrhtml += "</div>";
//					initcancerOrderListdqrhtml += "<small>实付金额：<strong>¥300</strong><em>等待客服确认</em></small>";
//					initcancerOrderListdqrhtml += "</a>";
//					initcancerOrderListdqrhtml += "</li>";
//				}
				
				document.getElementById("canccerConfirmed").innerHTML = initcancerOrderListdqrhtml;
 			},
 			onerror: function(e) {
 				cancerOrderList.checkDataFlag("cancerOrderListzwddfirmedId",1);
 				console.log("initcancerOrderListdqr---->:"+e);
 			}
 		});
	},
	initcancerOrderListdzf : function(){
		jyapp.getApi({
 			method: 'Tumour/OrderList',
 			data:'orderStaus=2&pageIndex='+initcancerOrderListdzfpageIndex+'&pageSize='+pageSize,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
					cancerOrderList.checkDataFlag("cancerOrderListzwddpayId",0);
					var dataValue = data.data.list;
					dzftotal = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var hospitalName = dataValue[i].hospitalName?dataValue[i].hospitalName:"--";
						var departmentName = dataValue[i].departmentName?dataValue[i].hospitalName:"--";
						var endLen = dataValue[i].OrderTime.length - 2;
						var time = dataValue[i].OrderTime.substring(6, endLen);
						initcancerOrderListdzfhtml += "<li class=\"mui-table-view-cell mui-media\">";
						initcancerOrderListdzfhtml += "<a href=\"javascript:;\">";
						initcancerOrderListdzfhtml += "<input type='hidden' value="+dataValue[i].ID+" />"
						initcancerOrderListdzfhtml += "<img class=\"mui-media-object mui-pull-left\" src="+dataValue[i].Pic+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" >";
						initcancerOrderListdzfhtml += "<div class=\"mui-media-body\">";
						initcancerOrderListdzfhtml += "<h2><span>"+dataValue[i].doctorName+"</span><span>"+dataValue[i].Title+"</span><span>"+commomUtil.formatStringToDate(time,3)+"</span></h2>";
						initcancerOrderListdzfhtml += "<p class=\"mui-ellipsis\">"+hospitalName+"<span>"+departmentName+"</span></p>";
						initcancerOrderListdzfhtml += "</div>";
						initcancerOrderListdzfhtml += "<small>实付金额：<strong>¥"+dataValue[i].TotalFee+"</strong><span class=\"pay\">支付</span></small>";
						initcancerOrderListdzfhtml += "</a>";
						initcancerOrderListdzfhtml += "</li>";
					}
				}else{
					dzftotal=0;
					if(initcancerOrderListdzfhtml == ""){
						cancerOrderList.checkDataFlag("cancerOrderListzwddpayId",1);
					}
				}
//				if(dataValue.length == 0){
//					initcancerOrderListdzfhtml += "<li class=\"mui-table-view-cell mui-media\">";
//					initcancerOrderListdzfhtml += "<a href=\"javascript:;\">";
//					initcancerOrderListdzfhtml += "<input type='hidden' value='575' />"
//					initcancerOrderListdzfhtml += "<img class=\"mui-media-object mui-pull-left\" src=\"../../img/pic_people.png\">";
//					initcancerOrderListdzfhtml += "<div class=\"mui-media-body\">";
//					initcancerOrderListdzfhtml += "<h2><span>张三</span><span>主治医生</span><span>12-12 15:00</span></h2>";
//					initcancerOrderListdzfhtml += "<p class=\"mui-ellipsis\">北京协和医院<span>血液内科</span></p>";
//					initcancerOrderListdzfhtml += "</div>";
//					initcancerOrderListdzfhtml += "<small>实付金额：<strong>¥300</strong><span class=\"pay\">支付</span></small>";
//					initcancerOrderListdzfhtml += "</a>";
//					initcancerOrderListdzfhtml += "</li>";
//				}
				document.getElementById("non-payment").innerHTML = initcancerOrderListdzfhtml;
 			},
 			onerror: function(e) {
 				console.log("initcancerOrderListdqr---->:"+e);
 			}
 		});
	},
	initcancerOrderListdjz : function(){
		jyapp.getApi({
 			method: 'Tumour/OrderList',
 			data:'orderStaus=3&pageIndex='+initcancerOrderListdjzpageIndex+'&pageSize='+pageSize,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
					cancerOrderList.checkDataFlag("cancerOrderListzwddseeId",0);
					var dataValue = data.data.list;
					djztotal = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var hospitalName = dataValue[i].hospitalName?dataValue[i].hospitalName:"--";
						var departmentName = dataValue[i].departmentName?dataValue[i].hospitalName:"--";
						var endLen = dataValue[i].OrderTime.length - 2;
						var time = dataValue[i].OrderTime.substring(6, endLen);
						initcancerOrderListdjzhtml += "<li class=\"mui-table-view-cell mui-media\">";
						initcancerOrderListdjzhtml += "<a href=\"javascript:;\">";
						initcancerOrderListdjzhtml += "<input type='hidden' value="+dataValue[i].ID+" />"
						initcancerOrderListdjzhtml += "<img class=\"mui-media-object mui-pull-left\" src="+dataValue[i].Pic+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" >";
						initcancerOrderListdjzhtml += "<div class=\"mui-media-body\">";
						initcancerOrderListdjzhtml += "<h2><span>"+dataValue[i].doctorName+"</span><span>"+dataValue[i].Title+"</span><span>"+commomUtil.formatStringToDate(time,3)+"</span></h2>";
						initcancerOrderListdjzhtml += "<p class=\"mui-ellipsis\">"+hospitalName+"<span>"+departmentName+"</span></p>";
						initcancerOrderListdjzhtml += "</div>";
						initcancerOrderListdjzhtml += "<small>实付金额：<strong>¥"+dataValue[i].TotalFee+"</strong><em>待就诊</em></small>";
						initcancerOrderListdjzhtml += "</a>";
						initcancerOrderListdjzhtml += "</li>";
					}
				}else{
					djztotal=0;
					if(initcancerOrderListdjzhtml == ""){
						cancerOrderList.checkDataFlag("cancerOrderListzwddseeId",1);
					}
				}
//				if(dataValue.length == 0){
//					initcancerOrderListdjzhtml += "<li class=\"mui-table-view-cell mui-media\">";
//					initcancerOrderListdjzhtml += "<a href=\"javascript:;\">";
//					initcancerOrderListdjzhtml += "<input type='hidden' value='575' />"
//					initcancerOrderListdjzhtml += "<img class=\"mui-media-object mui-pull-left\" src=\"../../img/pic_people.png\">";
//					initcancerOrderListdjzhtml += "<div class=\"mui-media-body\">";
//					initcancerOrderListdjzhtml += "<h2><span>张三</span><span>主治医生</span><span>12-12 15:00</span></h2>";
//					initcancerOrderListdjzhtml += "<p class=\"mui-ellipsis\">北京协和医院 <span>血液内科</span></p>";
//					initcancerOrderListdjzhtml += "</div>";
//					initcancerOrderListdjzhtml += "<small>实付金额：<strong>¥300</strong><em>待就诊</em></small>";
//					initcancerOrderListdjzhtml += "</a>";
//					initcancerOrderListdjzhtml += "</li>";
//				}
				document.getElementById("orderSee").innerHTML = initcancerOrderListdjzhtml;
 			},
 			onerror: function(e) {
 				console.log(e);
 			}
 		});
	},
	initcancerOrderListdpj : function(){
		jyapp.getApi({
 			method: 'Tumour/OrderList',
 			data:'orderStaus=4&pageIndex='+initcancerOrderListdpjpageIndex+'&pageSize='+pageSize,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
					cancerOrderList.checkDataFlag("cancerOrderListzwddspjId",0);
					var dataValue = data.data.list;
					dpjtotal = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var hospitalName = dataValue[i].hospitalName?dataValue[i].hospitalName:"--";
						var departmentName = dataValue[i].departmentName?dataValue[i].hospitalName:"--";
						var endLen = dataValue[i].OrderTime.length - 2;
						var time = dataValue[i].OrderTime.substring(6, endLen);
						initcancerOrderListdpjhtml += "<li class=\"mui-table-view-cell mui-media\">";
						initcancerOrderListdpjhtml += "<a href=\"javascript:;\">";
						initcancerOrderListdpjhtml += "<input type='hidden' value="+dataValue[i].ID+"  />"
						initcancerOrderListdpjhtml += "<img class=\"mui-media-object mui-pull-left\" src="+dataValue[i].Pic+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" >";
						initcancerOrderListdpjhtml += "<div class=\"mui-media-body\">";
						initcancerOrderListdpjhtml += "<h2><span>"+dataValue[i].doctorName+"</span><span>"+dataValue[i].Title+"</span><span>"+commomUtil.formatStringToDate(time,3)+"</span></h2>";
						initcancerOrderListdpjhtml += "<p class=\"mui-ellipsis\">"+hospitalName+"<span>"+departmentName+"</span></p>";
						initcancerOrderListdpjhtml += "</div>";
						initcancerOrderListdpjhtml += "<small>实付金额：<strong>¥"+dataValue[i].TotalFee+"</strong><span class=\"pay\">评价</span></small>";
						initcancerOrderListdpjhtml += "</a>";
						initcancerOrderListdpjhtml += "</li>";
					}
				}else{
					dpjtotal=0;
					if(initcancerOrderListdpjhtml == ""){
						cancerOrderList.checkDataFlag("cancerOrderListzwddspjId",1);
					}
				}
//				if(dataValue.length == 0){
//					initcancerOrderListdpjhtml += "<li class=\"mui-table-view-cell mui-media\">";
//					initcancerOrderListdpjhtml += "<a href=\"javascript:;\">";
//					initcancerOrderListdpjhtml += "<input type='hidden' value='637' />"
//					initcancerOrderListdpjhtml += "<img class=\"mui-media-object mui-pull-left\" src=\"../../img/pic_people.png\">";
//					initcancerOrderListdpjhtml += "<div class=\"mui-media-body\">";
//					initcancerOrderListdpjhtml += "<h2><span>张三</span><span>主治医生</span><span>12-12 15:00</span></h2>";
//					initcancerOrderListdpjhtml += "<p class=\"mui-ellipsis\">北京协和医院<span>血液内科</span></p>";
//					initcancerOrderListdpjhtml += "</div>";
//					initcancerOrderListdpjhtml += "<small>实付金额：<strong>¥300</strong><span class=\"pay\">评价</span></small>";
//					initcancerOrderListdpjhtml += "</a>";
//					initcancerOrderListdpjhtml += "</li>";
//				}
				document.getElementById("orderEvaluation").innerHTML = initcancerOrderListdpjhtml;
 			},
 			onerror: function(e) {
 				console.log("initcancerOrderListdpj---->:"+e);
 			}
 		});
	},
	initcancerOrderListywc : function(){
		jyapp.getApi({
 			method: 'Tumour/OrderList',
 			data:'orderStaus=5&pageIndex='+initcancerOrderListywcpageIndex+'&pageSize='+pageSize,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
					cancerOrderList.checkDataFlag("cancerOrderListzwddywcId",0);
					var dataValue = data.data.list;
					ywctotal = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var hospitalName = dataValue[i].hospitalName?dataValue[i].hospitalName:"--";
						var departmentName = dataValue[i].departmentName?dataValue[i].hospitalName:"--";
						var endLen = dataValue[i].OrderTime.length - 2;
						var time = dataValue[i].OrderTime.substring(6, endLen);
						initcancerOrderListywchtml += "<li class=\"mui-table-view-cell mui-media\">";
						initcancerOrderListywchtml += "<a href=\"javascript:;\">";
						initcancerOrderListywchtml += "<input type='hidden' value="+dataValue[i].ID+" />"
						initcancerOrderListywchtml += "<img class=\"mui-media-object mui-pull-left\" src="+dataValue[i].Pic+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" >";
						initcancerOrderListywchtml += "<div class=\"mui-media-body\">";
						initcancerOrderListywchtml += "<h2><span>"+dataValue[i].doctorName+"</span><span>"+dataValue[i].Title+"</span><span>"+commomUtil.formatStringToDate(time,3)+"</span></h2>";
						initcancerOrderListywchtml += "<p class=\"mui-ellipsis\">"+hospitalName+"<span>"+departmentName+"</span></p>";
						initcancerOrderListywchtml += "</div>";
						initcancerOrderListywchtml += "<small>实付金额：<strong>¥"+dataValue[i].TotalFee+"</strong><span class=\"pay-end\"><img src=\"../../img/familyDoctor/bg_wancheng.png\"></span></small>";
						initcancerOrderListywchtml += "</a>";
						initcancerOrderListywchtml += "</li>";
					}
				}else{
					ywctotal=0;
					if(initcancerOrderListywchtml == ""){
						cancerOrderList.checkDataFlag("cancerOrderListzwddywcId",1);
					}
				}
//				if(dataValue.length == 0){
//					initcancerOrderListywchtml += "<li class=\"mui-table-view-cell mui-media\">";
//					initcancerOrderListywchtml += "<a href=\"javascript:;\">";
//					initcancerOrderListywchtml += "<input type='hidden' value='575' />"
//					initcancerOrderListywchtml += "<img class=\"mui-media-object mui-pull-left\" src=\"../../img/pic_people.png\">";
//					initcancerOrderListywchtml += "<div class=\"mui-media-body\">";
//					initcancerOrderListywchtml += "<h2><span>张三</span><span>主治医生</span><span>12-12 15:00</span></h2>";
//					initcancerOrderListywchtml += "<p class=\"mui-ellipsis\">北京协和医院<span>血液内科</span></p>";
//					initcancerOrderListywchtml += "</div>";
//					initcancerOrderListywchtml += "<small>实付金额：<strong>¥300</strong><span class=\"pay-end\"><img src=\"../../img/familyDoctor/bg_wancheng.png\"></span></small>";
//					initcancerOrderListywchtml += "</a>";
//					initcancerOrderListywchtml += "</li>";
//				}
				document.getElementById("orderFinish").innerHTML = initcancerOrderListywchtml;
 			},
 			onerror: function(e) {
 				console.log("initcancerOrderListywc---->:"+e);
 			}
 		});
	},
	cancerOrderListBackCell : function(){
//		console.log(backUrl);
		var config = null;
		if(backid != "" && backid != "undefined" && backUrl && backUrl != "0"){
			backUrl = backUrl == "myOrder" ? "../me/myOrder.html" : backUrl;
			config = {
				id : backid,
				url : backUrl,
				method : "newidsMyOrder"
			}
		}else{
			config = {
				id : "cancerExperts",
				url : "cancerExperts.html"
			}
		}
//		console.log(JSON.stringify(config));
		jyapp.backWebView(config);
	},
	setTs : function(parentId,spanId,type){
		document.getElementById(parentId).setAttribute("class","mui-content nomore");
		if(type == 1){
			document.getElementById(spanId).innerHTML = "没有更多数据了";
		}
		setTimeout(function(){
			document.getElementById(parentId).setAttribute("class","mui-content");
		},1500);
	}
};

window.addEventListener("newIdsCancerOrderList",function(event){
	initcancerOrderListdqrpageIndex = 1;
	pageSize = 10;
	initcancerOrderListdzfpageIndex = 1;
	initcancerOrderListdjzpageIndex =1;
	initcancerOrderListdpjpageIndex = 1;
	initcancerOrderListywcpageIndex = 1;
	dqrtotal = 0;
	dzftotal = 0;
	djztotal = 0;
	dpjtotal = 0;
	ywctotal = 0;
	initcancerOrderListdqrhtml = "";
	initcancerOrderListdzfhtml = "";
	initcancerOrderListdjzhtml = "";
	initcancerOrderListdpjhtml = "";
	initcancerOrderListywchtml = "";
	index = event.detail.index;
	backid = event.detail.backid ? event.detail.backid : "0";
	backUrl = event.detail.backurl ? event.detail.backurl : "0";
	//调用初始化数据方法
	cancerOrderList.initData(index);
});

//绑定回退
document.getElementById("cancerOrderListBackCellId").addEventListener("tap",cancerOrderList.cancerOrderListBackCell);
//绑定手机回退键
//mui.back = function(e){
//	cancerOrderList.cancerOrderListBackCell();
//}