/**
 * 待支付列表点击事件
 */
mui("#spaOrderList1").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'spaOrderDetali',
		url: "spaOrderDetali.html",
		extras: {
			"orderId" : oId,
			"type" : "dzf",
			backid : backid,
			backurl : backurl
		}
	});
});
/**
 * 待评价列表点击事件
 */
mui("#spaOrderList3").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	console.log(oId);
	mui.openWindow({
		id: 'spaOrderDetali',
		url: "spaOrderDetali.html",
		extras: {
			"orderId" : oId,
			"type" : "dpj",
			backid : backid,
			backurl : backurl
		}
	});
});
/**
 * 已完成列表点击事件
 */
mui("#spaOrderList4").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	var status = this.querySelectorAll('input')[1].value;
	var type = "";
	//0已取消 6已完成 8已退款
	if(status==0){
		type="yqx";
	}else if(status==6){
		type="ywc";
	}else if(status==8){
		type="ytk";
	}
	mui.openWindow({
		id: 'spaOrderDetali',
		url: "spaOrderDetali.html",
		extras: {
			"orderId" : oId,
			"type" : type,
			backid : backid,
			backurl : backurl
		}
	});
});
/**
 * 预约成功列表点击事件
 */
mui("#spaOrderList2").on("tap",".spaOrderList-c",function(){
	var oId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'spaOrderDetali',
		url: "spaOrderDetali.html",
		extras: {
			"orderId" : oId,
			"type" : "yycg",
			backid : backid,
			backurl : backurl
		}
	});
});

var pageIndexDZF=1;
var pageIndexSUC=1;
var pageIndexDPJ = 1;
var pageIndexYWC = 1;
var totalDZF = 0;
var totalSUC = 0;
var totalDPJ = 0;
var totalYWC = 0;
var pageSize=10;

var content='';
var orderId = '';
var index = 0;
var backid = "";
var backurl = "";

/*mui('.mui-content').on('tap', '.spaOrderList-c', function() {
	var oid = this.parentNode.parentNode.parentNode.id;
	if (this.parentNode.parentNode.className == 'spa-cancel') {
		oid = 'cancal';
	}
	if (this.parentNode.parentNode.className == 'spa-back') {
		oid = 'back';
	}
	mui.openWindow({
		id: 'spaOrderDetali',
		url: "spaOrderDetali.html",
		extras: {
			"type": oid
		}
	})
})*/

/*原因*/
//取消预约原因详细----明星东2016-5-23 17:43更新
mui('.mui-content').on('tap','.spacancle',function(){
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
		orderId = this.querySelectorAll('input')[0].value;
		userCancle.show(function(items) {
			var s = JSON.stringify(items[0].text);
			s = s.replace("\"", "").replace("\"", "");
			cancleResult.value = s;
			//console.log(cancleResult.value);
			content = cancleResult.value;
			spaOrder.cancleOrder(1);
		});
});
	
//支付按钮事件
mui('.mui-content').on('tap','.spapay',function(){
	//console.log(this.querySelectorAll('input')[0].value);
	var oId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'spaOrderDetali',
		url: "spaOrderDetali.html",
		extras: {
			"orderId" : oId,
			"type" : "dzf",
			backid : backid,
			backurl : backurl
		}
	});
});

//待评价按钮事件
mui('.mui-content').on('tap','.spadpj',function(){
	var oId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'spaOrderDetali',
		url: "spaOrderDetali.html",
		extras: {
			"orderId" : oId,
			"type" : "dpj",
			backid : backid,
			backurl : backurl
		}
	});
});

//删除订单按钮事件
mui('.mui-content').on('tap','.spadelorder',function(){
	//console.log(this.querySelectorAll('input')[0].value);
	orderId = this.querySelectorAll('input')[0].value;
	spaOrder.delSpaOrderDetail(2);
});	
/*mui.init();
mui.ready(function() {
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
	var cancleButton = document.querySelector(".cancle");
	var cancleResult = document.querySelector('.cancleResult');
	cancleButton.addEventListener('tap', function(event) {
		userCancle.show(function(items) {
			var s = JSON.stringify(items[0].text);
			s = s.replace("\"", "").replace("\"", "");
			cancleResult.value = s;
//			console.log(cancleResult.value);
		});

	}, false);
	
});*/


document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	index = self.index;
	backid = self.backid ? self.backid : "0";
	backurl = self.backurl ? self.backurl : "0";
	//alert(backurl);
	spaOrder.loadunpay(pageIndexDZF,pageSize);
	spaOrder.loadapointsuc(pageIndexSUC,pageSize);
	spaOrder.loaduncomment(pageIndexDPJ,pageSize);
	spaOrder.loadcomplete(pageIndexYWC,pageSize);
	//设置样式
	spaOrder.initStyle();
});
document.addEventListener("plusscrollbottom", function() {
	//获取当前选择的tab
	var selector = mui('.mui-active')[1].id;
	if(selector=='spaOrderList1'){
		if(totalDZF == pageSize){
			spaOrder.setTs('spaOrderContent','spaOrderTips',0);
			pageIndexDZF ++;
			spaOrder.loadunpay(pageIndexDZF,pageSize);
		}else{
			spaOrder.setTs('spaOrderContent','spaOrderTips',1);
		}
	}else if(selector=='spaOrderList2'){
		if(totalSUC == pageSize){
			spaOrder.setTs('spaOrderContent','spaOrderTips',0);
			pageIndexSUC ++;
			spaOrder.loadapointsuc(pageIndexSUC,pageSize);
		}else{
			spaOrder.setTs('spaOrderContent','spaOrderTips',1);
		}
	}else if(selector=='spaOrderList3'){
		if(totalDPJ == pageSize){
			spaOrder.setTs('spaOrderContent','spaOrderTips',0);
			pageIndexDPJ ++;
			spaOrder.loaduncomment(pageIndexDPJ,pageSize);
		}else{
			spaOrder.setTs('spaOrderContent','spaOrderTips',1);
		}
	}else if(selector=='spaOrderList4'){
		if(totalYWC == pageSize){
			spaOrder.setTs('spaOrderContent','spaOrderTips',0);
			pageIndexYWC ++;
			spaOrder.loadcomplete(pageIndexYWC,pageSize);
		}else{
			spaOrder.setTs('spaOrderContent','spaOrderTips',1);
		}
	}
	
});
var spaOrder = {
	initStyle:function(){
		var divs = document.getElementById("spaOrderId");
		var consultingas = divs.getElementsByTagName("a");
		if(index){
			for(var i=0;i<consultingas.length;i++){
				consultingas[i].setAttribute('class','mui-control-item');
				document.getElementById("spaOrderList"+(i+1)).setAttribute("class","mui-control-content");
				if(i == index){
					consultingas[i].setAttribute('class','mui-control-item mui-active');
					document.getElementById("spaOrderList"+(i+1)).setAttribute("class","mui-control-content mui-active");
				}
			}
		}
	},
	
	/**
	 * 获取待支付列表
	 */
	loadunpay:function (pageIndexDZF,pageSize){
		if(pageIndexDZF==1){
			document.getElementById('spaOrderList1').innerHTML='';
		}
		jyapp.getApi({ 
			method: 'Convalesce/OrderList',
				data: 'orderType=2&pageIndex='+pageIndexDZF+'&pageSize='+pageSize,
				timeout: 10000,
				onsuccess: function(response) {
					var dataValues = response.data;
					//console.log("loadunpay:"+JSON.stringify(response));
					if(response.code=1&&dataValues!=null && dataValues.orders!=null&&dataValues.orders.length>0){
						totalDZF = dataValues.orders.length;
						//遍历带支付列表
					//	document.getElementById('spaOrderList1').innerHTML="";
						for(var i = 0;i<dataValues.orders.length;i++){
							var order = dataValues.orders[i];
							var html = "<ul><li class='border-b'><section class='spaOrderList-t'><article>订单编号："+order.OrderNo+"<span class='red'>待支付</span></article></section>";
							html+="<section class='spaOrderList-c'><input type='hidden' value='"+order.ID+"' />";
							html+="<p>疗养套餐 <span>"+order.PackageName+" </span></p>";
							html+="<p>疗养人 <span class='active'>"+order.Name+"</span></p>";
							
							var beginTime=order.Begin.substring(6,order.Begin.length-2);
							beginTime = commomUtil.formatStringToDate(beginTime,1);
							
							var endTime = order.End.substring(6,order.End.length-2);
							endTime = commomUtil.formatStringToDate(endTime,1);
							html+="<p>疗养时间 <span>"+beginTime+" ~ "+endTime+"</span></p>";
							html+="<p>疗养地址 <span>"+order.Address+"</span></p></section>";
							html+="<section class='spaOrderList-b'>";
							html+="<p><span>实付金额<i>￥"+order.TotalFee+"</i></span><a class='black spacancle'>取消预约<input type='hidden' value='"+order.ID+"'/></a><a href='' class='red spapay'>支付<input type='hidden' value='"+order.ID+"' /></a></p>";
							html+="</section></li></ul>";
							document.getElementById('spaOrderList1').innerHTML+=html;
						}
					}else{
						totalDZF = 0;
						if(pageIndexDZF==1){
							var html = "<div class='order_none' style='display:block;'><i></i>暂无数据</div>";
							document.getElementById('spaOrderList1').innerHTML=html;
						}
						
					}
				},
				onerror:function(e){
					var html = "<div class='order_none' style='display:block;'><i></i>暂无数据</div>";
					document.getElementById('spaOrderList1').innerHTML=html;
					console.log("loadunpay"+e)
				}
		});
	},
	/**
	 * 加载预约成功列表
	 */
	loadapointsuc:function (pageIndexSUC,pageSize){
		if(pageIndexSUC==1){
			document.getElementById('spaOrderList2').innerHTML='';
		}
		jyapp.getApi({
			method: 'Convalesce/OrderList',
			data: 'orderType=3&pageIndex='+pageIndexSUC+'&pageSize='+pageSize,
			timeout: 10000,
			onsuccess:function(data){
				var dataValues = data.data;
				//console.log("loadapointsuc:"+JSON.stringify(data));	
				if(data.code=1&&dataValues!=null && dataValues.orders!=null&&dataValues.orders.length>0){
					totalSUC=dataValues.orders.length;
					var html = '';
					for(var i = 0;i<dataValues.orders.length;i++){
						var order = dataValues.orders[i];
						html+='<ul><li class="border-b">';
						html+='<section class="spaOrderList-t"><article>订单编号：'+order.OrderNo+' <span class="red">预约成功</span></article></section>';
						html+='<section class="spaOrderList-c"><input type="hidden" value="'+order.ID+'" /><p>疗养套餐 <span>'+order.PackageName+'</span></p><p>疗养人 <span class="active">'+order.Name+'</span></p>';
						var beginTime=order.Begin.substring(6,order.Begin.length-2);
						beginTime = commomUtil.formatStringToDate(beginTime,1);
							
						var endTime = order.End.substring(6,order.End.length-2);
						endTime = commomUtil.formatStringToDate(endTime,1);
						html+='<p>疗养时间 <span>'+beginTime+' ~ '+endTime+'</span></p><p>疗养地址 <span>'+order.Address+'</span></p></section>';
						html+='<section class="spaOrderList-b"><p><a href="tel:400-111-5289">申请退款</a></p></section></li></ul>'
					}
					document.getElementById('spaOrderList2').innerHTML+=html;
				}else{
					totalSUC=0;
					if(pageIndexSUC==1){
						document.getElementById('spaOrderList2').innerHTML='<div class="order_none" id="" style="display: block;"><i></i>暂无数据</div>';
					}
					
				}
			},
			onerror:function(e){
				document.getElementById('spaOrderList2').innerHTML='<div class="order_none" id="" style="display: block;"><i></i>暂无数据</div>';
				console.log('loadapointsuc'+e);
			}
		});
	},
	/**
	 * 加载待评价列表
	 */
	loaduncomment:function (pageIndexDPJ,pageSize){
		if(pageIndexDPJ==1){
			document.getElementById('spaOrderList3').innerHTML='';
		}
	
		jyapp.getApi({
			method: 'Convalesce/OrderList',
			data: 'orderType=4&pageIndex='+pageIndexDPJ+'&pageSize='+pageSize,
			timeout: 10000,
			onsuccess:function(data){
				var dataValues = data.data;
				//console.log("loaduncomment"+JSON.stringify(data));	
				if(data.code=1&&dataValues!=null && dataValues.orders!=null&&dataValues.orders.length>0){
					totalDPJ = dataValues.orders.length;
					var html = '';
					for(var i = 0;i<dataValues.orders.length;i++){
					
						var order = dataValues.orders[i];
						html+='<ul><li class="border-b">';
						html+='<section class="spaOrderList-t"><article>订单编号：'+order.OrderNo+' <span class="red">待评价</span></article></section>';
						html+='<section class="spaOrderList-c"><input type="hidden" value="'+order.ID+'" /><p>疗养套餐 <span>'+order.PackageName+'</span></p><p>疗养人 <span class="active">'+order.Name+'</span></p>';
						var beginTime=order.Begin.substring(6,order.Begin.length-2);
						beginTime = commomUtil.formatStringToDate(beginTime,1);
							
						var endTime = order.End.substring(6,order.End.length-2);
						endTime = commomUtil.formatStringToDate(endTime,1);
						html+='<p>疗养时间 <span>'+beginTime+' ~ '+endTime+'</span></p><p>疗养地址 <span>'+order.Address+'</span></p></section>';
						html+='<section class="spaOrderList-b"><p><span>实付金额<i>￥'+order.TotalFee+'</i></span><a href="" class="red spadpj">评价<input type="hidden" value="'+order.ID+'" /></a></p></section></li></ul>'
					}
					document.getElementById('spaOrderList3').innerHTML+=html;
				}else{
					totalDPJ = 0;
					if(pageIndexDPJ==1){
						document.getElementById('spaOrderList3').innerHTML='<div class="order_none" id="" style="display: block;"><i></i>暂无数据</div>';
					}
				}
			},
			onerror:function(e){
				document.getElementById('spaOrderList3').innerHTML='<div class="order_none" id="" style="display: block;"><i></i>暂无数据</div>';
				console.log('loaduncomment'+e);
			}
		});
	},
	/**
	 * 加载已完成列表
	 */
	loadcomplete:function (pageIndexYWC,pageSize){
		if(pageIndexYWC==1){
			document.getElementById('spaOrderList4').innerHTML='';
		}
		jyapp.getApi({
			method: 'Convalesce/OrderList',
			data: 'orderType=5&pageIndex='+pageIndexYWC+'&pageSize='+pageSize,
			timeout: 10000,
			onsuccess:function(data){
				var dataValues = data.data;
//				console.log('loadcomplete:'+JSON.stringify(data));	
				if(data.code=1&&dataValues!=null && dataValues.orders!=null&&dataValues.orders.length>0){
					totalYWC = dataValues.orders.length;
					var html = '';
					for(var i = 0;i<dataValues.orders.length;i++){
						
						var order = dataValues.orders[i];
						var header = '';
						var footer = '<p><a href="" class="red spadelorder">删除订单<input type="hidden" value="'+order.ID+'" /></a></p>';
						//Status 0、已取消；6、已完成；8、已退款
						if(order.Status==6){
							header+='<ul><li class="border-b"><section class="spaOrderList-t"><article>订单编号：'+order.OrderNo+' <span class="red">已完成</span></article></section>';
							footer='<p>';
							for(var j=0;j<5;j++){
								if(j < order.Score){
									footer += '<span class="xing xing-active"></span>';
								}else{
									footer += '<span class="xing"></span>';
								}
							}
							footer +='<a href="" class="red spadelorder">删除订单<input type="hidden" value="'+order.ID+'" /></a></p>';
//							footer='<p><span class="xing xing-active"></span><span class="xing xing-active"></span><span class="xing xing-active"></span><span class="xing xing-active"></span><span class="xing xing-active"></span>';
						}else if(order.Status==0){
							header+='<ul class="spa-cancel"><li class="border-b"><section class="spaOrderList-t"><article>订单编号：'+order.OrderNo+' <span class="red">已取消</span></article></section>';
						}else if(order.Status==8){
							header+='<ul class="spa-back"><li class="border-b"><section class="spaOrderList-t"><article>订单编号：'+order.OrderNo+' <span class="red">已退款</span></article></section>';
						}
						html+=header;
						html+='<section class="spaOrderList-c"><input type="hidden" value="'+order.ID+'" /><input type="hidden" value="'+order.Status+'" /><p>疗养套餐 <span>'+order.PackageName+'</span></p><p>疗养人 <span class="active">'+order.Name+'</span></p>';
						var beginTime=order.Begin.substring(6,order.Begin.length-2);
						beginTime = commomUtil.formatStringToDate(beginTime,1);
							
						var endTime = order.End.substring(6,order.End.length-2);
						endTime = commomUtil.formatStringToDate(endTime,1);
						html+='<p>疗养时间 <span>'+beginTime+' ~ '+endTime+'</span></p><p>疗养地址 <span>'+order.Address+'</span></p></section>';
						html+='<section class="spaOrderList-b">'+footer;
						html+='</section></li></ul>';
					}
					document.getElementById('spaOrderList4').innerHTML+=html;
				}else{
					totalYWC=0;
					if(pageIndexYWC==1){
						document.getElementById('spaOrderList4').innerHTML='<div class="order_none" id="" style="display: block;"><i></i>暂无数据</div>';
					}
				}
			},
			onerror:function(e){
				document.getElementById('spaOrderList4').innerHTML='<div class="order_none" id="" style="display: block;"><i></i>暂无数据</div>';
				console.log('loadcomplete:'+e);
			}
		});
	},
	/**
	 * 取消预约
	 * @param {Object} operation
	 */
	cancleOrder:function(operation){
		//console.log('orderId='+orderId+'&operateType='+operation+'&content='+content);
		jyapp.getApi({
   			method: 'Convalesce/OrderOperate',
   			data:'orderId='+orderId+'&operateType='+operation+'&content='+content,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
   				//console.log(JSON.stringify(data));
   				if(data.code == 1){
   					var pageIndexDZF=1;
					var pageIndexSUC=1;
					var pageIndexDPJ = 1;
					var pageIndexYWC = 1;
					var totalDZF = 0;
					var totalSUC = 0;
					var totalDPJ = 0;
					var totalYWC = 0;
					
					spaOrder.loadunpay(pageIndexDZF,pageSize);
					spaOrder.loadapointsuc(pageIndexSUC,pageSize);
					spaOrder.loaduncomment(pageIndexDPJ,pageSize);
					spaOrder.loadcomplete(pageIndexYWC,pageSize);
   				}
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	/**
	 * 删除订单
	 * @param {Object} operateType
	 */
	delSpaOrderDetail : function(operateType){
		//console.log('orderId='+orderId+'&operateType='+operateType+'&content=');
		jyapp.getApi({
   			method: 'Convalesce/OrderOperate',
   			data:'orderId='+orderId+'&operateType='+operateType+'&content=',
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
   			//	console.log(JSON.stringify(data));
   				if(data.code == 1){
   					var pageIndexDZF=1;
					var pageIndexSUC=1;
					var pageIndexDPJ = 1;
					var pageIndexYWC = 1;
					var totalDZF = 0;
					var totalSUC = 0;
					var totalDPJ = 0;
					var totalYWC = 0;
					
					spaOrder.loadunpay(pageIndexDZF,pageSize);
					spaOrder.loadapointsuc(pageIndexSUC,pageSize);
					spaOrder.loaduncomment(pageIndexDPJ,pageSize);
					spaOrder.loadcomplete(pageIndexYWC,pageSize);
   				}
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	/**
	 * 添加返回函数
	 */
	spaOrderBack:function(){
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
				id : "spa",
				url : "spa.html"
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
	
	
	
}
//自定义事件
window.addEventListener("newSpaOrdersRecord",function(event){
	var pageIndexDZF=1;
	var pageIndexSUC=1;
	var pageIndexDPJ = 1;
	var pageIndexYWC = 1;
	var totalDZF = 0;
	var totalSUC = 0;
	var totalDPJ = 0;
	var totalYWC = 0;
	index = event.detail.index;
	backid = event.detail.backid ? event.detail.backid : "0";
	backurl = event.detail.backurl ? event.detail.backurl : "0";
	spaOrder.loadunpay(pageIndexDZF,pageSize);
	spaOrder.loadapointsuc(pageIndexSUC,pageSize);
	spaOrder.loaduncomment(pageIndexDPJ,pageSize);
	spaOrder.loadcomplete(pageIndexYWC,pageSize);
	//设置样式
	spaOrder.initStyle();
});
//返回图标事件
document.getElementById('spaOrderBack').addEventListener('click',spaOrder.spaOrderBack);
//手机返回按键事件处理
//mui.back=function(){
//	spaOrder.spaOrderBack();
//}
