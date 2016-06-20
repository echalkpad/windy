//绑定待确认列表点击事件跳转到详情页
mui("#dqrGeneticOrderdataId").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	var pName = this.querySelectorAll('span')[0].innerText;
//	console.log(oId +"-->"+pName);
	mui.openWindow({
		id: 'geneticOrderDetail',
		url: "geneticOrderDetail.html",
		extras: {
			"orderId" : oId,
			"type" : "dqr",
			backid : backid,
			backurl : backurl
		}
	});
});
//绑定待支付列表点击事件跳转到详情页
mui("#dzfGeneticOrderdataId").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	var pName = this.querySelectorAll('span')[0].innerText;
//	console.log(oId +"-->"+pName);
	mui.openWindow({
		id: 'geneticOrderDetail',
		url: "geneticOrderDetail.html",
		extras: {
			"orderId" : oId,
			"type" : "dzf",
			backid : backid,
			backurl : backurl
		}
	});
});
//绑定预约成功列表点击事件跳转到详情页
mui("#yycGeneticOrderdataId").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	var pName = this.querySelectorAll('span')[0].innerText;
//	console.log(oId +"-->"+pName);
	mui.openWindow({
		id: 'geneticOrderDetail',
		url: "geneticOrderDetail.html",
		extras: {
			"orderId" : oId,
			"type" : "yycg",
			backid : backid,
			backurl : backurl
		}
	});
});

//绑定待评价列表点击事件跳转到详情页
mui("#dpjGeneticOrderdataId").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	var pName = this.querySelectorAll('span')[0].innerText;
//	console.log(oId +"-->"+pName);
	mui.openWindow({
		id: 'geneticOrderDetail',
		url: "geneticOrderDetail.html",
		extras: {
			"orderId" : oId,
			"type" : "dpj",
			backid : backid,
			backurl : backurl
		}
	});
});
//绑定已完成列表点击事件跳转到详情页
mui("#ywcGeneticOrderdataId").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	var status = this.querySelectorAll('input')[1].value;
//	console.log(oId +"-->"+status);
	var otType = "";
	if(status == 6){
		otType = "ywc";
	}else if(status == 0){
		otType = "yqx";
	}else if(status == 8){
		otType = "ytk";
	}
	mui.openWindow({
		id: 'geneticOrderDetail',
		url: "geneticOrderDetail.html",
		extras: {
			"orderId" : oId,
			"type" : otType,
			backid : backid,
			backurl : backurl
		}
	});
});

var index = 0;
var pageSize = 10;
var dqrpageIndex = 1;
var dqrpagetatel = 0;
var dqrgeneticOrderHtml = "";

var dzfpageIndex = 1;
var dzfpagetatel = 0;
var dzfgeneticOrderHtml = "";

var yycgpageIndex = 1;
var yycgpagetatel = 0;
var yycgeneticOrderHtml = "";

var dpjpageIndex = 1;
var dpjpagetatel = 0;
var dpjgeneticOrderHtml = "";

var ywcpageIndex = 1;
var ywcpagetatel = 0;
var ywcgeneticOrderHtml = "";

var orderId = "";
var content = "";
var backid = "";
var backurl = "";
document.addEventListener("plusready",function(e){
	//设置显示页面
	var self = plus.webview.currentWebview();
	index = self.index;
	backid = self.backid ? self.backid : "0";
	backurl = self.backurl ? self.backurl : "0";
	//初始化数据
	geneticOrder.initData();
	//加载下拉刷新事件
	document.addEventListener( "plusscrollbottom", function(){
		var divs = document.getElementById("geneticOrderId");
		var consultingas = divs.getElementsByTagName("a");
		var divid = 0;
		for(var i=0;i<consultingas.length;i++){
			if(consultingas[i].className == "mui-control-item mui-active"){
				divid = i+1;
				break;
			}
		}
		if(divid == 1){
			if(dqrpagetatel == pageSize){
				geneticOrder.setTs("geneticOrderParentDiv","dqrGeneticOrderdataspanId",0);
				dqrpageIndex ++;
				geneticOrder.initGeneticOrderdqr();
			}else{
				geneticOrder.setTs("geneticOrderParentDiv","dqrGeneticOrderdataspanId",1);
			}
		}else if(divid == 2){
			if(dzfpagetatel == pageSize){
				geneticOrder.setTs("geneticOrderParentDiv","dzfGeneticOrderdataspanId",0);
				dzfpageIndex++;
				geneticOrder.initGeneticOrderdzf();
			}else{
				geneticOrder.setTs("geneticOrderParentDiv","dzfGeneticOrderdataspanId",1);
			}
		}else if(divid == 3){
			if(yycgpagetatel == pageSize){
				geneticOrder.setTs("geneticOrderParentDiv","yycGeneticOrderdataspanId",0);
				yycgpageIndex++;
				geneticOrder.initGeneticOrderyyc();
			}else{
				geneticOrder.setTs("geneticOrderParentDiv","yycGeneticOrderdataspanId",1);
			}
		}else if(divid == 4){
			if(dpjpagetatel == pageSize){
				geneticOrder.setTs("geneticOrderParentDiv","dpjGeneticOrderdataspanId",0);
				dpjpageIndex++;
				geneticOrder.initGeneticOrderdpj();
			}else{
				geneticOrder.setTs("geneticOrderParentDiv","dpjGeneticOrderdataspanId",1);
			}
		}else if(divid == 5){
			if(ywcpagetatel == pageSize){
				geneticOrder.setTs("geneticOrderParentDiv","ywcGeneticOrderdataspanId",0);
				ywcpageIndex++;
				geneticOrder.initGeneticOrderywc();
			}else{
				geneticOrder.setTs("geneticOrderParentDiv","ywcGeneticOrderdataspanId",1);
			}
		}
	});
},false);

var geneticOrder = {
	initData : function(){
		//加载待确认数据
		geneticOrder.initGeneticOrderdqr();
		//加载待支付数据
		geneticOrder.initGeneticOrderdzf();
		//加载预约成功数据
		geneticOrder.initGeneticOrderyyc();
		//加载待评价数据
		geneticOrder.initGeneticOrderdpj();
		//加载已完成数据
		geneticOrder.initGeneticOrderywc();
		var divs = document.getElementById("geneticOrderId");
		var consultingas = divs.getElementsByTagName("a");
		if(index){
			for(var i=0;i<consultingas.length;i++){
				consultingas[i].setAttribute('class','mui-control-item');
//				console.log(i);
				document.getElementById("geneticOrderList"+(i+1)).setAttribute("class","mui-control-content");
				if(i == index){
					consultingas[i].setAttribute('class','mui-control-item mui-active');
					document.getElementById("geneticOrderList"+(i+1)).setAttribute("class","mui-control-content mui-active");
				}
			}
		}
	},
	initGeneticOrderdqr : function(){
//		console.log('orderType=1&pageIndex='+dqrpageIndex+'&pageSize='+pageSize);
		jyapp.getApi({
   			method: 'GeneDetection/OrderList',
   			data:'orderType=1&pageIndex='+dqrpageIndex+'&pageSize='+pageSize,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.orders && data.data.orders.length > 0){
					document.getElementById("dqrGeneticOrderzwddId").style.display = "none";
					var dataValue = data.data.orders;
					dqrpagetatel = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var PackageName = dataValue[i].PackageName != "--"? dataValue[i].PackageName : "尚未确认";
						dqrgeneticOrderHtml += "<li class=\"border-b\">";
						dqrgeneticOrderHtml += "<section class=\"spaOrderList-t\">";
						dqrgeneticOrderHtml += "<article>订单编号："+dataValue[i].OrderNo+" <span class=\"red\">待确认</span></article>";
						dqrgeneticOrderHtml += "</section>";
						dqrgeneticOrderHtml += "<section class=\"spaOrderList-c\">";
						dqrgeneticOrderHtml += "<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/>";
						dqrgeneticOrderHtml += "<p><strong>选择套餐</strong><span>"+PackageName+" </span></p>";
						dqrgeneticOrderHtml += "<p class=\"lettersapcing3\"><strong>被检人</strong><span class=\"active\">"+dataValue[i].Name+" </span></p>";
						dqrgeneticOrderHtml += "</section>";
						dqrgeneticOrderHtml += "<section class=\"spaOrderList-b\">";
						if(PackageName != "尚未确认"){
							dqrgeneticOrderHtml += "<p><span>套餐价格<i>¥"+dataValue[i].TotalFee+"</i></span><a href=\"\" class=\"black cancle\">取消预约<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/></a><a href=\"tel:400-111-5289\">电话催办</a></p>";
						}else{
							//取消预约单更换为取消预约  同时结构有所增加（2016/5/23 明星东）
							dqrgeneticOrderHtml += "<p><a href=\"\" class=\"black cancle\">取消预约<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/></a><a href=\"tel:400-111-5289\">电话催办</a></p>";
						}
						dqrgeneticOrderHtml += "</section>";
						dqrgeneticOrderHtml += "</li>";
					}
				}else{
					dqrpagetatel = 0;
					if(dqrgeneticOrderHtml == ""){
						document.getElementById("dqrGeneticOrderzwddId").style.display = "";
					}
				}
				document.getElementById("dqrGeneticOrderdataId").innerHTML = dqrgeneticOrderHtml;
   			},
   			onerror: function(e) {
   				dqrpagetatel = 0;
   				document.getElementById("dqrGeneticOrderzwddId").style.display = "";
   				console.log(e);
   			}
   		});
	},
	initGeneticOrderdzf : function(){
		jyapp.getApi({
   			method: 'GeneDetection/OrderList',
   			data:'orderType=2&pageIndex='+dzfpageIndex+'&pageSize='+pageSize,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.orders && data.data.orders.length > 0){
					document.getElementById("dzfGeneticOrderzwddId").style.display = "none";
					var dataValue = data.data.orders;
					dzfpagetatel = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var PackageName = dataValue[i].PackageName ? dataValue[i].PackageName : "尚未确认";
						dzfgeneticOrderHtml += "<li class=\"border-b\">";
						dzfgeneticOrderHtml += "<section class=\"spaOrderList-t\">";
						dzfgeneticOrderHtml += "<article>订单编号："+dataValue[i].OrderNo+" <span class=\"red\">待支付</span></article>";
						dzfgeneticOrderHtml += "</section>";
						dzfgeneticOrderHtml += "<section class=\"spaOrderList-c\">";
						dzfgeneticOrderHtml += "<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/>";
						dzfgeneticOrderHtml += "<p><strong>选择套餐</strong><span>"+PackageName+" </span></p>";
						dzfgeneticOrderHtml += "<p class=\"lettersapcing3\"><strong>被检人</strong><span class=\"active\">"+dataValue[i].Name+" </span></p>";
						dzfgeneticOrderHtml += "</section>";
						dzfgeneticOrderHtml += "<section class=\"spaOrderList-b\">";
						dzfgeneticOrderHtml += "<p><span>套餐价格<i>¥"+dataValue[i].TotalFee+"</i></span><a href=\"\" class=\"black cancle\">取消预约<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/></a><a href=\"\" class=\"red cancles\">支付<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/></a></p>";
						dzfgeneticOrderHtml += "</section>";
						dzfgeneticOrderHtml += "</li>";
					}
				}else{
					dzfpagetatel = 0;
					if(dzfgeneticOrderHtml == ""){
						document.getElementById("dzfGeneticOrderzwddId").style.display = "";
					}
				}
				document.getElementById("dzfGeneticOrderdataId").innerHTML = dzfgeneticOrderHtml;
   			},
   			onerror: function(e) {
   				dzfpagetatel = 0;
   				document.getElementById("dzfGeneticOrderzwddId").style.display = "";
   				console.log(e);
   			}
   		});
	},
	initGeneticOrderyyc : function(){
		jyapp.getApi({
   			method: 'GeneDetection/OrderList',
   			data:'orderType=3&pageIndex='+yycgpageIndex+'&pageSize='+pageSize,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.orders && data.data.orders.length > 0){
					document.getElementById("yycGeneticOrderzwddId").style.display = "none";
					var dataValue = data.data.orders;
					yycgpagetatel = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var PackageName = dataValue[i].PackageName ? dataValue[i].PackageName : "尚未确认";
						yycgeneticOrderHtml += "<li class=\"border-b\">";
						yycgeneticOrderHtml += "<section class=\"spaOrderList-t\">";
						yycgeneticOrderHtml += "<article>订单编号："+dataValue[i].OrderNo+" <span class=\"red\">预约成功</span></article>";
						yycgeneticOrderHtml += "</section>";
						yycgeneticOrderHtml += "<section class=\"spaOrderList-c\">";
						yycgeneticOrderHtml += "<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/>";
						yycgeneticOrderHtml += "<p><strong>选择套餐</strong><span>"+PackageName+" </span></p>";
						yycgeneticOrderHtml += "<p class=\"lettersapcing3\"><strong>被检人</strong><span class=\"active\">"+dataValue[i].Name+" </span></p>";
						yycgeneticOrderHtml += "</section>";
						yycgeneticOrderHtml += "<section class=\"spaOrderList-b\">";
						yycgeneticOrderHtml += "<p><a href=\"tel:400-111-5289\">申请退款</a></p>";
						yycgeneticOrderHtml += "</section>";
						yycgeneticOrderHtml += "</li>";
					}
				}else{
					yycgpagetatel = 0;
					if(yycgeneticOrderHtml == ""){
						document.getElementById("yycGeneticOrderzwddId").style.display = "";
					}
				}
				document.getElementById("yycGeneticOrderdataId").innerHTML = yycgeneticOrderHtml;
   			},
   			onerror: function(e) {
   				yycgpagetatel = 0;
   				document.getElementById("yycGeneticOrderzwddId").style.display = "";
   				console.log(e);
   			}
   		});
	},
	initGeneticOrderdpj : function(){
		jyapp.getApi({
   			method: 'GeneDetection/OrderList',
   			data:'orderType=4&pageIndex='+dpjpageIndex+'&pageSize='+pageSize,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.orders && data.data.orders.length > 0){
					document.getElementById("dpjGeneticOrderzwddId").style.display = "none";
					var dataValue = data.data.orders;
					dpjpagetatel = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var PackageName = dataValue[i].PackageName ? dataValue[i].PackageName : "尚未确认";
						dpjgeneticOrderHtml += "<li class=\"border-b\">";
						dpjgeneticOrderHtml += "<section class=\"spaOrderList-t\">";
						dpjgeneticOrderHtml += "<article>订单编号："+dataValue[i].OrderNo+" <span class=\"red\">待评价</span></article>";
						dpjgeneticOrderHtml += "</section>";
						dpjgeneticOrderHtml += "<section class=\"spaOrderList-c\">";
						dpjgeneticOrderHtml += "<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/>";
						dpjgeneticOrderHtml += "<p><strong>选择套餐</strong><span>"+PackageName+" </span></p>";
						dpjgeneticOrderHtml += "<p class=\"lettersapcing3\"><strong>被检人</strong><span class=\"active\">"+dataValue[i].Name+" </span></p>";
						dpjgeneticOrderHtml += "</section>";
						dpjgeneticOrderHtml += "<section class=\"spaOrderList-b\">";
						dpjgeneticOrderHtml += "<p><a href=\"\" class=\"red cancledpj\">评价<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/></a></p>";
						dpjgeneticOrderHtml += "</section>";
						dpjgeneticOrderHtml += "</li>";
					}
				}else{
					dpjpagetatel = 0;
					if(dpjgeneticOrderHtml == ""){
						document.getElementById("dpjGeneticOrderzwddId").style.display = "";
					}
				}
				document.getElementById("dpjGeneticOrderdataId").innerHTML = dpjgeneticOrderHtml;
   			},
   			onerror: function(e) {
   				dpjpagetatel = 0;
   				document.getElementById("dpjGeneticOrderzwddId").style.display = "";
   				console.log(e);
   			}
   		});
	},
	initGeneticOrderywc : function(){
		jyapp.getApi({
   			method: 'GeneDetection/OrderList',
   			data:'orderType=5&pageIndex='+ywcpageIndex+'&pageSize='+pageSize,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.orders && data.data.orders.length > 0){
					document.getElementById("ywcGeneticOrderzwddId").style.display = "none";
					var dataValue = data.data.orders;
					ywcpagetatel = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var PackageName = dataValue[i].PackageName ? dataValue[i].PackageName : "尚未确认";
						var status = dataValue[i].Status;
						var title = "";
						switch(status){
							case 6 :
								title = "已完成";
								break;
							case 0 :
								title = "已取消";
								break;
							case 8 :
								title = "已退款";
								break;
						};
						ywcgeneticOrderHtml += "<li class=\"border-b\">";
						ywcgeneticOrderHtml += "<section class=\"spaOrderList-t\">";
						ywcgeneticOrderHtml += "<article>订单编号："+dataValue[i].OrderNo+" <span class=\"red\">"+title+"</span></article>";
						ywcgeneticOrderHtml += "</section>";
						ywcgeneticOrderHtml += "<section class=\"spaOrderList-c\">";
						ywcgeneticOrderHtml += "<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/>";
						ywcgeneticOrderHtml += "<input type=\"hidden\" value=\""+dataValue[i].Status+"\"/>";
						ywcgeneticOrderHtml += "<p><strong>选择套餐</strong><span>"+PackageName+" </span></p>";
						ywcgeneticOrderHtml += "<p class=\"lettersapcing3\"><strong>被检人</strong><span class=\"active\">"+dataValue[i].Name+" </span></p>";
						ywcgeneticOrderHtml += "</section>";
						ywcgeneticOrderHtml += "<section class=\"spaOrderList-b\">";
						ywcgeneticOrderHtml += "<p>";
						if(status == 6){
							var Score = dataValue[i].Score?dataValue[i].Score:0;
							for(var j=0;j<5;j++){
								if(j<Score){
									ywcgeneticOrderHtml += "<span class=\"xing xing-active\"></span>";
								}else{
									ywcgeneticOrderHtml += "<span class=\"xing\"></span>";
								}
							}
						}
						ywcgeneticOrderHtml += "<a href=\"\" class=\"red cancledel\">删除订单<input type=\"hidden\" value=\""+dataValue[i].ID+"\"/></a></p>";
						ywcgeneticOrderHtml += "</section>";
						ywcgeneticOrderHtml += "</li>";
					}
				}else{
					dpjpagetatel = 0;
					if(ywcgeneticOrderHtml == ""){
						document.getElementById("ywcGeneticOrderzwddId").style.display = "";
					}
				}
				document.getElementById("ywcGeneticOrderdataId").innerHTML = ywcgeneticOrderHtml;
   			},
   			onerror: function(e) {
   				dpjpagetatel = 0;
   				document.getElementById("ywcGeneticOrderzwddId").style.display = "";
   				console.log(e);
   			}
   		});
	},
	orderOperateGenetic : function(operateType){
//		console.log('orderId='+orderId+'&operateType='+operateType+'&content='+content);
		jyapp.getApi({
   			method: 'GeneDetection/OrderOperate',
   			data:'orderId='+orderId+'&operateType='+operateType+'&content='+content,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				if(data.code == 1){
   					dqrpageIndex = 1;
					dqrpagetatel = 0;
					dqrgeneticOrderHtml = "";
					
					dzfpageIndex = 1;
					dzfpagetatel = 0;
					dzfgeneticOrderHtml = "";
					
					yycgpageIndex = 1;
					yycgpagetatel = 0;
					yycgeneticOrderHtml = "";
					
					dpjpageIndex = 1;
					dpjpagetatel = 0;
					dpjgeneticOrderHtml = "";
					
					ywcpageIndex = 1;
					ywcpagetatel = 0;
					ywcgeneticOrderHtml = "";
					index = 0;
					geneticOrder.initData();
   				}
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	delGeneticOrderDetail : function(operateType){
//		console.log('orderId='+orderId+'&operateType='+operateType+'&content=');
		jyapp.getApi({
   			method: 'GeneDetection/OrderOperate',
   			data:'orderId='+orderId+'&operateType='+operateType+'&content=',
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				if(data.code == 1){
   					dqrpageIndex = 1;
					dqrpagetatel = 0;
					dqrgeneticOrderHtml = "";
					
					dzfpageIndex = 1;
					dzfpagetatel = 0;
					dzfgeneticOrderHtml = "";
					
					yycgpageIndex = 1;
					yycgpagetatel = 0;
					yycgeneticOrderHtml = "";
					
					dpjpageIndex = 1;
					dpjpagetatel = 0;
					dpjgeneticOrderHtml = "";
					
					ywcpageIndex = 1;
					ywcpagetatel = 0;
					ywcgeneticOrderHtml = "";
					index = 0;
					geneticOrder.initData();
   				}
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	geneticOrderBackCell : function(){
		var config = null;
		if(backid != "" && backid != "undefined" && backurl && backurl != "0"){
			backurl = backurl == "myOrder" ? "../../me/myOrder.html" : backurl;
			config = {
				id : backid,
				url : backurl,
				method : "newidsMyOrder"
			}
		}else{
			config = {
				id : "geneticDiagnosis",
				url : "geneticDiagnosis.html"
			}
		}
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

//取消预约原因详细----明星东2016-5-23 17:43更新
mui('.mui-content').on('tap','.cancle',function(){
	var userCancle = new mui.PopPicker();
		userCancle.setData([{
			value: 'nobuy',
			text: '我不想买了'
		}, {
			value: 'noappropriate',
			text: '时间/套餐/网点不理想'
		}, {
			value: 'error',
			text: '信息填写错误,重新下单'
		}, {
			value: 'nohere',
			text: '不在这里预约'
		}]);
		var cancleButton = this;
		var cancleResult = this.children[0];
//		console.log(this.querySelectorAll('input')[0].value);
		orderId = this.querySelectorAll('input')[0].value;
		userCancle.show(function(items) {
			var s = JSON.stringify(items[0].text);
			s = s.replace("\"", "").replace("\"", "");
			cancleResult.value = s;
//			console.log(cancleResult.value);
			content = cancleResult.value;
			geneticOrder.orderOperateGenetic(1);
		});
});
//支付按钮事件
mui('.mui-content').on('tap','.cancles',function(){
//	console.log(this.querySelectorAll('input')[0].value);
	var oId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'geneticOrderDetail',
		url: "geneticOrderDetail.html",
		extras: {
			"orderId" : oId,
			"type" : "dzf",
			backid : backid,
			backurl : backurl
		}
	});
});

//待评价按钮事件
mui('.mui-content').on('tap','.cancledpj',function(){
	var oId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'geneticOrderDetail',
		url: "geneticOrderDetail.html",
		extras: {
			"orderId" : oId,
			"type" : "dpj",
			backid : backid,
			backurl : backurl
		}
	});
});

//删除订单按钮事件
mui('.mui-content').on('tap','.cancledel',function(){
//	console.log(this.querySelectorAll('input')[0].value);
	orderId = this.querySelectorAll('input')[0].value;
	geneticOrder.delGeneticOrderDetail(2);
});
//自定义事件
window.addEventListener("newidsGeneticOrder",function(event){
	dqrpageIndex = 1;
	dqrpagetatel = 0;
	dqrgeneticOrderHtml = "";
	
	dzfpageIndex = 1;
	dzfpagetatel = 0;
	dzfgeneticOrderHtml = "";
	
	yycgpageIndex = 1;
	yycgpagetatel = 0;
	yycgeneticOrderHtml = "";
	
	dpjpageIndex = 1;
	dpjpagetatel = 0;
	dpjgeneticOrderHtml = "";
	
	ywcpageIndex = 1;
	ywcpagetatel = 0;
	ywcgeneticOrderHtml = "";
	index = event.detail.index;
//	console.log(JSON.stringify(event.detail));
	backid = event.detail.backid ? event.detail.backid : "0";
	backurl = event.detail.backurl ? event.detail.backurl : "0";
	geneticOrder.initData();
});

//绑定回退按钮事件
document.getElementById("geneticOrderBackCellId").addEventListener("click",geneticOrder.geneticOrderBackCell);

