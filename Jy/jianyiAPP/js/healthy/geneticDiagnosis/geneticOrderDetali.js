var orderId = "";
var type = "";
var xingIndex = 0;
var order = "";
var backid = "";
var backurl = "";
document.addEventListener("plusready",function(){
	var self = plus.webview.currentWebview();
	orderId = self.orderId;
	type = self.type;
	backid = self.backid ? self.backid : "0";
	backurl = self.backurl ? self.backurl : "0";
	geneticOrderDetail.initData();
	geneticOrderDetail.operatorXing();
});
var geneticOrderDetail = {
	initData : function(){
//		console.log(type);
		switch(type){
			case "dqr" : 
				geneticOrderDetail.dqrGeneticOrderDetail();
				break;
			case "dzf" :
				geneticOrderDetail.dzfGeneticOrderDetail();
				break;
			case "yycg" :
				geneticOrderDetail.yycgGeneticOrderDetail();
				break;
			case "dpj" :
				geneticOrderDetail.dpjGeneticOrderDetail();
				break;
			case "ywc" :
				geneticOrderDetail.ywcGeneticOrderDetail();
				break;
			case "yqx" :
				geneticOrderDetail.yqxGeneticOrderDetail();
				break;
			case "ytk" :
				geneticOrderDetail.ytkGeneticOrderDetail();
				break;
		}
		
	},
	dqrGeneticOrderDetail : function(){
//		console.log(orderId);
		geneticOrderDetail.openterUl(1);
		//设置页面数据
		jyapp.getApi({
   			method: 'GeneDetection/OrderDetails',
   			data:'orderId='+orderId,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data && data.data){
					//设置订单编号数据信息
	   				var dqrOrderNoHtml = '';
	   				dqrOrderNoHtml += '<article>订单编号：'+data.data.OrderNo+' <span class="red">待确认</span></article>';
	   				document.getElementById("dqrOrderNoId").innerHTML = dqrOrderNoHtml;
	   				//设置套餐数据
	   				var dqrPackageNameHtml = '';
	   				var PackageName = data.data.PackageName == "--" ? "尚未确认" : data.data.PackageName;
	   				var TotalFee = data.data.TotalFee && data.data.TotalFee > 0 ? '￥'+data.data.TotalFee : "尚未确定";
	   				dqrPackageNameHtml += '<a class="mui-navigate-right"><p><span>选择套餐</span>'+PackageName+'</p><p><span>套餐价格</span><i>'+TotalFee+'</i></p></a>';
	   				document.getElementById("dqrPackageNameid").innerHTML = dqrPackageNameHtml;
	   				//设置被检人数据信息
	   				var dqrPackageNameHtml = '';
	   				var sex = data.data.Sex == 1 ? "男" : "女"
	   				dqrPackageNameHtml += '<p><span>被检人</span><small>'+data.data.Name+'</small> ( '+sex+' | '+data.data.Age+'岁 )<br>'+data.data.Mobile+'</p>';
	   				document.getElementById("dqrryInfoId").innerHTML = dqrPackageNameHtml;
	   				//设置收货人地址数据信息
	   				var dqrPackageNameHtml = '';
	   				var addr = "";
	   				if(data.data.Addr){
	   					addr = data.data.Addr.split("|")[0];
	   				}
	   				dqrPackageNameHtml += '<h2>收件人：<span>'+data.data.ConsigneeName+'</span><strong>'+data.data.AddresMobile+'</strong></h2>';
	   				dqrPackageNameHtml += '<p>'+addr+'</p>';
	   				document.getElementById("dqrgeneticAddressId").innerHTML = dqrPackageNameHtml;
	   				//设置备注数据信息
					var Remark = data.data.Remark ? data.data.Remark : "";
	   				document.getElementById("geneticCommonInfoId").value = Remark;
	   				document.getElementById("geneticCommonInfoId").setAttribute("readonly",'readonly');
				}else{
					geneticOrderDetail.setErrorDiv();
				}
   			},
   			onerror: function(e) {
   				geneticOrderDetail.setErrorDiv();
   				console.log(e);
   			}
   		});
		
	},
	dzfGeneticOrderDetail : function(){
//		console.log(orderId);
		geneticOrderDetail.openterUl(2);
		//设置页面数据
		jyapp.getApi({
   			method: 'GeneDetection/OrderDetails',
   			data:'orderId='+orderId,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
   				if(data && data.data){
	   				order = data.data;
	// 				console.log(JSON.stringify(data));
	   				//设置订单编号数据信息
	   				var dzfOrderNoHtml = '';
	   				dzfOrderNoHtml += '<article>订单编号：'+data.data.OrderNo+' <span class="red">待支付</span></article>';
	   				document.getElementById("dzfGeneticOrderDetailId").innerHTML = dzfOrderNoHtml;
	   				//设置套餐数据
	   				var dzfPackageNameHtml = '';
	   				var PackageName = data.data.PackageName == "--" ? "尚未确定" : data.data.PackageName;
	   				var TotalFee = data.data.TotalFee && data.data.TotalFee > 0 ? data.data.TotalFee : 0;
	   				dzfPackageNameHtml += '<a class="mui-navigate-right"><p><span>选择套餐</span>'+PackageName+'</p><p><span>套餐价格</span><i>￥'+TotalFee+'</i></p></a>';
	   				document.getElementById("dzfGeneticOrderDetailPackageid").innerHTML = dzfPackageNameHtml;
	   				//设置被检人数据信息
	   				var dzfPackageNameHtml = '';
	   				var sex = data.data.Sex == 1 ? "男" : "女"
	   				dzfPackageNameHtml += '<p><span>被检人</span><small>'+data.data.Name+'</small> ( '+sex+' | '+data.data.Age+'岁 )<br>'+data.data.Mobile+'</p>';
	   				document.getElementById("dzfGeneticOrderDetailrenInfo").innerHTML = dzfPackageNameHtml;
	   				//设置收货人地址数据信息
	   				var dzfPackageNameHtml = '';
	   				var addr = "";
	   				if(data.data.Addr){
	   					addr = data.data.Addr.split("|")[0];
	   				}
	   				dzfPackageNameHtml += '<h2>收件人：<span>'+data.data.ConsigneeName+'</span><strong>'+data.data.AddresMobile+'</strong></h2>';
	   				dzfPackageNameHtml += '<p>'+addr+'</p>';
	   				document.getElementById("dzfGeneticOrderDetailAddressId").innerHTML = dzfPackageNameHtml;
	   				//设置备注数据信息
					var Remark = data.data.Remark ? Remark : "--";
	   				document.getElementById("geneticCommonInfoId").value = Remark;
	   				document.getElementById("geneticCommonInfoId").setAttribute("readonly",'readonly');
	   				//设置实付金额
	   				document.getElementById("dzfGeneticOrderDetailPayId").innerHTML = '￥'+data.data.TotalFee;
	   			}else{
					geneticOrderDetail.setErrorDiv();
				}
   			},
   			onerror: function(e) {
   				geneticOrderDetail.setErrorDiv();
   				console.log(e);
   			}
   		});
	},
	yycgGeneticOrderDetail : function(){
//		console.log(orderId);
		geneticOrderDetail.openterUl(3);
		//设置页面数据
		jyapp.getApi({
   			method: 'GeneDetection/OrderDetails',
   			data:'orderId='+orderId,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
   				
// 				console.log(JSON.stringify(data));
   				//设置订单编号数据信息
   				if(data && data.data){
	   				var yycgOrderNoHtml = '';
	   				yycgOrderNoHtml += '<article>订单编号：'+data.data.OrderNo+' <span class="red">预约成功</span></article>';
	   				document.getElementById("yycgGeneticOrderDetailId").innerHTML = yycgOrderNoHtml;
	   				//设置套餐数据
	   				var yycgPackageNameHtml = '';
	   				var PackageName = data.data.PackageName == "--" ? "尚未确认" : data.data.PackageName;
	   				
	   				yycgPackageNameHtml += '<a class="">';
					yycgPackageNameHtml += '<p><span>选择套餐</span>'+PackageName+'</p>';
					yycgPackageNameHtml += '<p><span>被检人</span><small>'+data.data.Name+'</small></p>';
					yycgPackageNameHtml += '<p><span>实付金额</span><i>￥'+data.data.TotalFee+'</i></p>';
					var isDetection = data.data.isDetection ? "已完成" : "未完成";
					var isReport = data.data.isReport ? "已送达" : "未送达";
					yycgPackageNameHtml += '<p><span>体检取样</span>'+isDetection+'</p>';
					yycgPackageNameHtml += '<p><span>体检报告</span>'+isReport+'</p>';
					yycgPackageNameHtml += '</a>';
	   				document.getElementById("yycgGeneticOrderDetailPackageId").innerHTML = yycgPackageNameHtml;
	   				
	   				var yycgGeneticOrderDetailTimeHtml = '';
	   				yycgGeneticOrderDetailTimeHtml +='<a class="">';
	   				var PayNo = data.data.PayNo ? data.data.PayNo : "--";
	   				var payName = geneticOrderDetail.patyTayInfo(data.data.PayTpye);
					yycgGeneticOrderDetailTimeHtml +='<p><span>'+payName+'</span>'+PayNo+'</p>';
					if(data.data.CreateTime){
						var CreateTimeendLen = data.data.CreateTime.length - 2;
						var CreateTimetime = data.data.CreateTime.substring(6, CreateTimeendLen);
						yycgGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>'+commomUtil.formatStringToDate(CreateTimetime,2)+'</p>';
					}else{
						yycgGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>--</p>';
					}
					if(data.data.OrderTime){
						var OrderTimeendLen = data.data.OrderTime.length - 2;
						var OrderTimetime = data.data.OrderTime.substring(6, OrderTimeendLen);
						yycgGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>'+commomUtil.formatStringToDate(OrderTimetime,2)+'</p>';
					}else{
						yycgGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>--</p>';
					}
					
					if(data.data.PayTime){
						var PayTimeendLen = data.data.PayTime.length - 2;
						var PayTimetime = data.data.PayTime.substring(6, PayTimeendLen);
						yycgGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>'+commomUtil.formatStringToDate(PayTimetime,2)+'</p>';
					}else{
						yycgGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>--</p>';
					}
					if(data.data.CompleteTime){
						var CompleteTimeendLen = data.data.CompleteTime.length - 2;
						var CompleteTimetime = data.data.CompleteTime.substring(6, CompleteTimeendLen);
						yycgGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>'+commomUtil.formatStringToDate(CompleteTimetime,2)+'</p>';
					}else{
						yycgGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>--</p>';
					}
					yycgGeneticOrderDetailTimeHtml +='</a>';
	   				document.getElementById("yycgGeneticOrderDetailTimeHtml").innerHTML = yycgGeneticOrderDetailTimeHtml;
	   				//设置实付金额
	// 				document.getElementById("dzfGeneticOrderDetailPayId").innerHTML = '￥'+data.data.TotalFee;
	   			}else{
					geneticOrderDetail.setErrorDiv();
				}
   			},
   			onerror: function(e) {
   				geneticOrderDetail.setErrorDiv();
   				console.log(e);
   			}
   		});
	},
	dpjGeneticOrderDetail : function(){
//		console.log(orderId);
		geneticOrderDetail.openterUl(4);
		//设置页面数据
		jyapp.getApi({
   			method: 'GeneDetection/OrderDetails',
   			data:'orderId='+orderId,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				//设置订单编号数据信息
   				if(data && data.data){
	   				var dpjOrderNoHtml = '';
	   				dpjOrderNoHtml += '<article>订单编号：'+data.data.OrderNo+' <span class="red">待评价</span></article>';
	   				document.getElementById("dpjGeneticOrderDetailId").innerHTML = dpjOrderNoHtml;
	   				//设置套餐数据
	   				var dpjPackageNameHtml = '';
	   				var PackageName = data.data.PackageName == "--" ? "尚未确认" : data.data.PackageName;
	   				
	   				dpjPackageNameHtml += '<a class="">';
					dpjPackageNameHtml += '<p><span>选择套餐</span>'+PackageName+'</p>';
					dpjPackageNameHtml += '<p><span>被检人</span><small>'+data.data.Name+'</small></p>';
					dpjPackageNameHtml += '<p><span>实付金额</span><i>￥'+data.data.TotalFee+'</i></p>';
					var isDetection = data.data.isDetection ? "已完成" : "未完成";
					var isReport = data.data.isReport ? "已送达" : "未送达";
					dpjPackageNameHtml += '<p><span>体检取样</span>'+isDetection+'</p>';
					dpjPackageNameHtml += '<p><span>体检报告</span>'+isReport+'</p>';
					dpjPackageNameHtml += '</a>';
	   				document.getElementById("dpjGeneticOrderDetailPackageId").innerHTML = dpjPackageNameHtml;
	   				
	   				var dpjGeneticOrderDetailTimeHtml = '';
	   				dpjGeneticOrderDetailTimeHtml +='<a class="">';
	   				var PayNo = data.data.PayNo ? data.data.PayNo : "--";
	   				var payName = geneticOrderDetail.patyTayInfo(data.data.PayTpye);
					dpjGeneticOrderDetailTimeHtml +='<p><span>'+payName+'</span>'+PayNo+'</p>';
					if(data.data.CreateTime){
						var CreateTimeendLen = data.data.CreateTime.length - 2;
						var CreateTimetime = data.data.CreateTime.substring(6, CreateTimeendLen);
						dpjGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>'+commomUtil.formatStringToDate(CreateTimetime,2)+'</p>';
					}else{
						dpjGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>--</p>';
					}
					if(data.data.OrderTime){
						var OrderTimeendLen = data.data.OrderTime.length - 2;
						var OrderTimetime = data.data.OrderTime.substring(6, OrderTimeendLen);
						dpjGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>'+commomUtil.formatStringToDate(OrderTimetime,2)+'</p>';
					}else{
						dpjGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>--</p>';
					}
					
					if(data.data.PayTime){
						var PayTimeendLen = data.data.PayTime.length - 2;
						var PayTimetime = data.data.PayTime.substring(6, PayTimeendLen);
						dpjGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>'+commomUtil.formatStringToDate(PayTimetime,2)+'</p>';
					}else{
						dpjGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>--</p>';
					}
					if(data.data.CompleteTime){
						var CompleteTimeendLen = data.data.CompleteTime.length - 2;
						var CompleteTimetime = data.data.CompleteTime.substring(6, CompleteTimeendLen);
						dpjGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>'+commomUtil.formatStringToDate(CompleteTimetime,2)+'</p>';
					}else{
						dpjGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>--</p>';
					}
					dpjGeneticOrderDetailTimeHtml +='</a>';
	   				document.getElementById("dpjGeneticOrderDetailTimeHtml").innerHTML = dpjGeneticOrderDetailTimeHtml;
	   			}else{
					geneticOrderDetail.setErrorDiv();
				}
   			},
   			onerror: function(e) {
   				geneticOrderDetail.setErrorDiv();
   				console.log(e);
   			}
   		});
	},
	ywcGeneticOrderDetail : function(){
		console.log('orderId='+orderId);
		geneticOrderDetail.openterUl(5);
		//设置页面数据
		jyapp.getApi({
   			method: 'GeneDetection/OrderDetails',
   			data:'orderId='+orderId,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
   				console.log(JSON.stringify(data));
   				//设置订单编号数据信息
   				if(data && data.data){
	   				var ywcOrderNoHtml = '';
	   				ywcOrderNoHtml += '<article>订单编号：'+data.data.OrderNo+' <span class="red">已完成</span></article>';
	   				document.getElementById("ywcGeneticOrderDetailId").innerHTML = ywcOrderNoHtml;
	   				//设置套餐数据
	   				var ywcPackageNameHtml = '';
	   				var PackageName = data.data.PackageName == "--" ? "尚未确认" : data.data.PackageName;
	   				
	   				ywcPackageNameHtml += '<a class="">';
					ywcPackageNameHtml += '<p><span>选择套餐</span>'+PackageName+'</p>';
					ywcPackageNameHtml += '<p><span>被检人</span><small>'+data.data.Name+'</small></p>';
					ywcPackageNameHtml += '<p><span>实付金额</span><i>￥'+data.data.TotalFee+'</i></p>';
					var isDetection = data.data.isDetection ? "已完成" : "未完成";
					var isReport = data.data.isReport ? "已送达" : "未送达";
					ywcPackageNameHtml += '<p><span>体检取样</span>'+isDetection+'</p>';
					ywcPackageNameHtml += '<p><span>体检报告</span>'+isReport+'</p>';
					ywcPackageNameHtml += '</a>';
	   				document.getElementById("ywcGeneticOrderDetailPackageId").innerHTML = ywcPackageNameHtml;
	   				
	   				var ywcGeneticOrderDetailTimeHtml = '';
	   				ywcGeneticOrderDetailTimeHtml +='<a class="">';
	   				var PayNo = data.data.PayNo ? data.data.PayNo : "--";
	   				var payName = geneticOrderDetail.patyTayInfo(data.data.PayTpye);
					ywcGeneticOrderDetailTimeHtml +='<p><span>'+payName+'</span>'+PayNo+'</p>';
					if(data.data.CreateTime){
						var CreateTimeendLen = data.data.CreateTime.length - 2;
						var CreateTimetime = data.data.CreateTime.substring(6, CreateTimeendLen);
						ywcGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>'+commomUtil.formatStringToDate(CreateTimetime,2)+'</p>';
					}else{
						ywcGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>--</p>';
					}
					if(data.data.OrderTime){
						var OrderTimeendLen = data.data.OrderTime.length - 2;
						var OrderTimetime = data.data.OrderTime.substring(6, OrderTimeendLen);
						ywcGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>'+commomUtil.formatStringToDate(OrderTimetime,2)+'</p>';
					}else{
						ywcGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>--</p>';
					}
					
					if(data.data.PayTime){
						var PayTimeendLen = data.data.PayTime.length - 2;
						var PayTimetime = data.data.PayTime.substring(6, PayTimeendLen);
						ywcGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>'+commomUtil.formatStringToDate(PayTimetime,2)+'</p>';
					}else{
						ywcGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>--</p>';
					}
					if(data.data.CompleteTime){
						var CompleteTimeendLen = data.data.CompleteTime.length - 2;
						var CompleteTimetime = data.data.CompleteTime.substring(6, CompleteTimeendLen);
						ywcGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>'+commomUtil.formatStringToDate(CompleteTimetime,2)+'</p>';
					}else{
						ywcGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>--</p>';
					}
					ywcGeneticOrderDetailTimeHtml +='</a>';
	   				document.getElementById("ywcGeneticOrderDetailTimeHtml").innerHTML = ywcGeneticOrderDetailTimeHtml;
	   				//设置星星数据
	   				var ywcGeneticOrderDetailXingHtml = "评价 ";
	   				var Score = data.data.Score;
	   				for(var i=0;i<5;i++){
	   					if(i < Score){
	   						ywcGeneticOrderDetailXingHtml += '<span class="xing xing-active"></span>';
	   					}else{
	   						ywcGeneticOrderDetailXingHtml += '<span class="xing"></span>';
	   					}
	   					
	   				}
	   				document.getElementById("ywcGeneticOrderDetailXingId").innerHTML = ywcGeneticOrderDetailXingHtml;
	   				//设置评价内容
					var Comment = data.data.Comment != "--" ? data.data.Comment : "";
	   				document.getElementById("ywcGeneticOrderDetailCommons").value = Comment;
	   				document.getElementById("ywcGeneticOrderDetailCommons").setAttribute("readonly",'readonly');
	   			}else{
					geneticOrderDetail.setErrorDiv();
				}
   			},
   			onerror: function(e) {
   				geneticOrderDetail.setErrorDiv();
   				console.log(e);
   			}
   		});
	},
	yqxGeneticOrderDetail : function(){
//		console.log(orderId);
		geneticOrderDetail.openterUl(6);
		//设置页面数据
		jyapp.getApi({
   			method: 'GeneDetection/OrderDetails',
   			data:'orderId='+orderId,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				//设置订单编号数据信息
   				if(data && data.data){
	   				var yqxOrderNoHtml = '';
	   				yqxOrderNoHtml += '<article>订单编号：'+data.data.OrderNo+' <span class="red">已取消</span></article>';
	   				document.getElementById("yqxOrderNoId").innerHTML = yqxOrderNoHtml;
	   				//设置套餐数据
	   				var yqxPackageNameHtml = '';
	   				var PackageName = data.data.PackageName == "--" ? "尚未确认" : data.data.PackageName;
	   				var TotalFee = data.data.TotalFee && data.data.TotalFee > 0 ? data.data.TotalFee : "尚未确定";
	   				yqxPackageNameHtml += '<a class="mui-navigate-right"><p><span>选择套餐</span>'+PackageName+'</p><p><span>套餐价格</span><i>￥'+TotalFee+'</i></p></a>';
	   				document.getElementById("yqxPackageNameid").innerHTML = yqxPackageNameHtml;
	   				//设置被检人数据信息
	   				var yqxPackageNameHtml = '';
	   				var sex = data.data.Sex == 1 ? "男" : "女"
	   				yqxPackageNameHtml += '<p><span>被检人</span><small>'+data.data.Name+'</small> ( '+sex+' | '+data.data.Age+'岁 )<br>'+data.data.Mobile+'</p>';
	   				document.getElementById("yqxryInfoId").innerHTML = yqxPackageNameHtml;
	   				//设置收货人地址数据信息
	   				var yqxPackageNameHtml = '';
	   				var addr = "";
	   				if(data.data.Addr){
	   					addr = data.data.Addr.split("|")[0];
	   				}
	   				yqxPackageNameHtml += '<h2>收件人：<span>'+data.data.ConsigneeName+'</span><strong>'+data.data.AddresMobile+'</strong></h2>';
	   				yqxPackageNameHtml += '<p>'+addr+'</p>';
	   				document.getElementById("yqxgeneticAddressId").innerHTML = yqxPackageNameHtml;
	   				//设置备注数据信息
					var Remark = data.data.Remark != "--" ? data.data.Remark : "";
	   				document.getElementById("geneticCommonInfoId").value = Remark;
	   				document.getElementById("geneticCommonInfoId").setAttribute("readonly",'readonly');
	   			}else{
					geneticOrderDetail.setErrorDiv();
				}
   			},
   			onerror: function(e) {
   				geneticOrderDetail.setErrorDiv();
   				console.log(e);
   			}
   		});
	},
	ytkGeneticOrderDetail : function(){
//		console.log(orderId);
		geneticOrderDetail.openterUl(7);
		//设置页面数据
		jyapp.getApi({
   			method: 'GeneDetection/OrderDetails',
   			data:'orderId='+orderId,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				//设置订单编号数据信息
   				if(data && data.data){
	   				var ytkOrderNoHtml = '';
	   				ytkOrderNoHtml += '<article>订单编号：'+data.data.OrderNo+' <span class="red">已退款</span></article>';
	   				document.getElementById("ytkGeneticOrderDetailId").innerHTML = ytkOrderNoHtml;
	   				//设置套餐数据
	   				var ytkPackageNameHtml = '';
	   				var PackageName = data.data.PackageName == "--" ? "尚未确认" : data.data.PackageName;
	   				
	   				ytkPackageNameHtml += '<a class="">';
					ytkPackageNameHtml += '<p><span>选择套餐</span>'+PackageName+'</p>';
					ytkPackageNameHtml += '<p><span>被检人</span><small>'+data.data.Name+'</small></p>';
					ytkPackageNameHtml += '<p><span>实付金额</span><i>￥'+data.data.TotalFee+'</i></p>';
					var isDetection = data.data.isDetection ? "已完成" : "未完成";
					var isReport = data.data.isReport ? "已送达" : "未送达";
					ytkPackageNameHtml += '<p><span>体检取样</span>'+isDetection+'</p>';
					ytkPackageNameHtml += '<p><span>体检报告</span>'+isReport+'</p>';
					ytkPackageNameHtml += '</a>';
	   				document.getElementById("ytkGeneticOrderDetailPackageId").innerHTML = ytkPackageNameHtml;
	   				
	   				var ytkGeneticOrderDetailTimeHtml = '';
	   				ytkGeneticOrderDetailTimeHtml +='<a class="">';
	   				var PayNo = data.data.PayNo ? data.data.PayNo : "--";
	   				var payName = geneticOrderDetail.patyTayInfo(data.data.PayTpye);
					ytkGeneticOrderDetailTimeHtml +='<p><span>'+payName+'</span>'+PayNo+'</p>';
					if(data.data.CreateTime){
						var CreateTimeendLen = data.data.CreateTime.length - 2;
						var CreateTimetime = data.data.CreateTime.substring(6, CreateTimeendLen);
						ytkGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>'+commomUtil.formatStringToDate(CreateTimetime,2)+'</p>';
					}else{
						ytkGeneticOrderDetailTimeHtml +='<p><span>创建时间</span>--</p>';
					}
					if(data.data.OrderTime){
						var OrderTimeendLen = data.data.OrderTime.length - 2;
						var OrderTimetime = data.data.OrderTime.substring(6, OrderTimeendLen);
						ytkGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>'+commomUtil.formatStringToDate(OrderTimetime,2)+'</p>';
					}else{
						ytkGeneticOrderDetailTimeHtml +='<p><span>确认时间</span>--</p>';
					}
					
					if(data.data.PayTime){
						var PayTimeendLen = data.data.PayTime.length - 2;
						var PayTimetime = data.data.PayTime.substring(6, PayTimeendLen);
						ytkGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>'+commomUtil.formatStringToDate(PayTimetime,2)+'</p>';
					}else{
						ytkGeneticOrderDetailTimeHtml +='<p><span>付款时间</span>--</p>';
					}
					if(data.data.CompleteTime){
						var CompleteTimeendLen = data.data.CompleteTime.length - 2;
						var CompleteTimetime = data.data.CompleteTime.substring(6, CompleteTimeendLen);
						ytkGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>'+commomUtil.formatStringToDate(CompleteTimetime,2)+'</p>';
					}else{
						ytkGeneticOrderDetailTimeHtml +='<p><span>完成时间</span>--</p>';
					}
					ytkGeneticOrderDetailTimeHtml +='</a>';
	   				document.getElementById("ytkGeneticOrderDetailTimeHtml").innerHTML = ytkGeneticOrderDetailTimeHtml;
	   				//设置退款数据信息
	   				var ytkGeneticOrderDetailtuikHtml = '';
	   				
	   				ytkGeneticOrderDetailtuikHtml +='<a class="">';
					ytkGeneticOrderDetailtuikHtml +='<p><span>已退金额</span><i>￥'+data.data.TotalFee+'</i></p>';
					ytkGeneticOrderDetailtuikHtml +='<p><span>退款转入</span>支付宝</p>';
					ytkGeneticOrderDetailtuikHtml +='<p><span>流水号</span>232311244</p>';
					ytkGeneticOrderDetailtuikHtml +='<p><span>操作时间</span>2016-07-01</p>';
					ytkGeneticOrderDetailtuikHtml +='</a>';
	   				
	   				
	   				document.getElementById("ytkGeneticOrderDetailtuikHtml").innerHTML = ytkGeneticOrderDetailtuikHtml;
	   			}else{
					geneticOrderDetail.setErrorDiv();
				}
   			},
   			onerror: function(e) {
   				geneticOrderDetail.setErrorDiv();
   				console.log(e);
   			}
   		});
	},
	openterUl : function(index){
		var oRemark = document.getElementById("geneticOrderDetail-remark"),
		oCoupons = document.getElementById("geneticOrderDetail-coupons"),
		oPay = document.getElementById("geneticOrderDetail-pay"),
		oAppraise = document.getElementById("geneticOrderDetail-appraise");
		switch(index){
			case 1 :
				oRemark.style.display = 'block';
				break;
			case 2 :
				oRemark.style.display = 'block';
				oCoupons.style.display = 'block';
				oPay.style.display = 'block';
				break;
			case 3 :
				oCoupons.style.display = 'none';
				break;
			case 4 :
				oAppraise.style.display = 'block';
				break;
			case 6 :
				oRemark.style.display = 'block';
				break;
		}
		for(var i=1;i<8;i++){
			var orderDetail = document.getElementById("geneticOrderDetail" + i);
			if(index == i){
				orderDetail.style.display = "";
			}else{
				orderDetail.style.display = "none";
			}
		}
	},
	operatorXing : function(){
		var ul = document.querySelector('.xingxing');
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
				xingIndex =  this.index + 1;
				for (var i = 0; i < j; i++) {
					ul_lis[i].className = 'xing xing-active';
				}
			}
		}
	},
	pjGeneticOrderDetail : function(){
		var geneticCommonInfoId = document.getElementById("pjGeneticcOrderDetailCommonsId").value;
		if(!commomUtil.validateCommon(geneticCommonInfoId)){
			plus.nativeUI.alert('评价内容不合法,评价内容只能由中文 数字 字母 下划线组成！','','健医宝','确认');
			return false;
		}
		if(geneticCommonInfoId && (geneticCommonInfoId.length > 250 || geneticCommonInfoId.length < 5)){
			plus.nativeUI.alert('评价内容字符超出输入限制,最多输入250个汉字！','','健医宝','确认');
			return false;
		}
		console.log('orderId='+orderId+'&comment='+geneticCommonInfoId+'&score='+xingIndex);
		jyapp.getApi({
   			method: 'GeneDetection/OrderComment',
   			data:'orderId='+orderId+'&comment='+geneticCommonInfoId+'&score='+xingIndex,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
   				console.log(JSON.stringify(data));
				if(data.code == 1){
					var config = {
						id : "geneticOrder",
						url : "geneticOrder.html",
						method : "newidsGeneticOrder",
						extras : {
							index : 4
						}
					}
					jyapp.backWebView(config);
				}else{
					plus.nativeUI.alert(data.msg,'','健医宝','确认');
				}
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	payGeneticOrderDetail : function(){
		var payinfo = {
			subject:'基因检测预约订单',
			body:"基因检测预约订单，订单号： "+order.OrderNo+",订单时间:"+commomUtil.stringToDate(order.CreateTime),
			orderno:order.OrderNo,
			totalfee:order.TotalFee,
			orderId:order.ID,
			type:"geneticOrderDetai",
			method : "newidsGeneticOrder",
			backurl:backurl,
			backid : backid,
			successpage:{
				id:'payOrderSucceed',
				url:'../pay/payOrderSucceed.html'
			},
			backCell:{
				id: 'geneticOrder',
				url: "../healthy/geneticDiagnosis/geneticOrder.html",
				index : 1
			}
		};
		mui.openWindow({
			id: 'payment',
			url: "../../core/payment.html",
			extras : {
				payinfo : payinfo
			}
		});
	},
	geneticOrderDetailBackCell : function(){
		var index = 0;
		switch(type){
			case "dqr" : 
				index = 0;
				break;
			case "dzf" :
				index = 1;
				break;
			case "yycg" :
				index = 2;
				break;
			case "dpj" :
				index = 3;
				break;
			case "ywc" :
				index = 4;
				break;
			case "yqx" :
				index = 4;
				break;
			case "ytk" :
				index = 4;
				break;
		}
		var config = {
			id : "geneticOrder",
			url : "geneticOrder.html",
			method : "newidsGeneticOrder",
			extras : {
				backurl: backurl,
				backid : backid,
				index: index
			}
		}
		jyapp.backWebView(config);
	},
	patyTayInfo : function(payTpye){
		var payName = "";
		switch(payTpye){
			case 1 :
				payName = "健医卡交易号";
				break;
			case 2 : 
				payName = "微信交易号";
				break;
			case 3 : 
				payName = "支付宝交易号";
				break;
			case 4 : 
				payName = "银联交易号";
				break;
			default :
				payName = "交易号";
				break;
		}
		return payName;
	},
	setErrorDiv : function(){
		document.getElementById("geneticOrderDetail1").style.display = "none";
		document.getElementById("geneticOrderDetail2").style.display = "none";
		document.getElementById("geneticOrderDetail3").style.display = "none";
		document.getElementById("geneticOrderDetail4").style.display = "none";
		document.getElementById("geneticOrderDetail5").style.display = "none";
		document.getElementById("geneticOrderDetail6").style.display = "none";
		document.getElementById("geneticOrderDetail7").style.display = "none";
		document.getElementById("geneticOrderDetail-remark").style.display = "none";
		document.getElementById("geneticOrderDetail-coupons").style.display = "none";
		document.getElementById("geneticOrderDetail-pay").style.display = "none";
		document.getElementById("geneticOrderDetail-appraise").style.display = "none";
		document.getElementById("geneticOrderDetailErrorId").style.display = "";
	}
}

//绑定评价按钮事件
document.getElementById("geneticOrderDetail-appraise").addEventListener("click",geneticOrderDetail.pjGeneticOrderDetail);
//绑定支付按钮事件
document.getElementById("geneticOrderDetail-pay").addEventListener("click",geneticOrderDetail.payGeneticOrderDetail);
//绑定回退按钮事件
document.getElementById("geneticOrderDetailBackCellId").addEventListener("click",geneticOrderDetail.geneticOrderDetailBackCell);