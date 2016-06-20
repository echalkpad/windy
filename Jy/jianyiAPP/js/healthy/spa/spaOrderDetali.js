var orderId = "";
var type = "";
var xingIndex = 0;

var payOrder = "";
var backid = "";
var backurl = "";
/*var spaOrderDetali = {};
var orderDetali1 = document.getElementById("spaOrderDetali1"),
	orderDetali2 = document.getElementById("spaOrderDetali2"),
	orderDetali3 = document.getElementById("spaOrderDetali3"),
	orderDetali4 = document.getElementById("spaOrderDetali4"),
	orderDetali5 = document.getElementById("spaOrderDetali5"),
	orderDetali6 = document.getElementById("spaOrderDetali6"),
	oRemark = document.getElementById("spaOrderDetali-remark"),
	oCoupons = document.getElementById("spaOrderDetali-coupons"),
	oPay = document.getElementById("spaOrderDetali-pay"),
	oAppraise = document.getElementById("spaOrderDetali-appraise");*/

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	//当前页面要进行的操作：dpj待评价--进行评价操作 dzf待支付--进行支付操作
	type = self.type;
	//当前页面要操作的对象id
	orderId = self.orderId;
	backid = self.backid ? self.backid : "0";
	backurl = self.backurl ? self.backurl : "0";
	spaOrderDetail.initData();
	//spaOrderDetali.type(type);
})


var spaOrderDetail={
	initData:function(){
		//console.log("当前类型："+type);
		switch(type){
			case 'dzf':
				spaOrderDetail.displaySpaOrderDetail(1);
				spaOrderDetail.dzfSpaOrderDetail();
				break;
			case 'dpj':
				spaOrderDetail.dpjSpaOrderDetail();
				spaOrderDetail.displaySpaOrderDetail(2);
				break;
			//其他类型操作暂未涉及	
			case 'yycg':
				spaOrderDetail.displaySpaOrderDetail(4);
				spaOrderDetail.yycgSpaOrderDetail();
				break;
			case 'ywc':
				spaOrderDetail.displaySpaOrderDetail(3);
				spaOrderDetail.ywcSpaOrderDetail();
				break;
			case 'yqx':
				spaOrderDetail.displaySpaOrderDetail(5);
				spaOrderDetail.yqxSpaOrderDetail();
				break;
			case 'ytk':
				spaOrderDetail.displaySpaOrderDetail(6);
				spaOrderDetail.ytkSpaOrderDetail();	
				break;
		}
	},
	/**
	 * 已退款对象明细
	 */
	ytkSpaOrderDetail:function(){
		//每次进入清除页面缓存数据
		document.getElementById('spaOrderDetali6').innerHTML='';
		//请求数据
		jyapp.getApi({
			method:'Convalesce/OrderDetails',
			data:'orderId='+orderId,
			timeout : 10000,
   			showWaiting: true,
   			onsuccess:function(data){
   				if(data.code==1&&data.data!=null){
   					//console.log(JSON.stringify(data));
   					var order = data.data;
   					var html='<li class="mui-table-view-cell spaOrderDetali-t">';
   					html+='<article>订单编号：'+order.OrderNo+' <span class="">已退款</span></article></li>';
   					html+='<li class="mui-table-view-cell spaOrderDetali-c1"><a class="">';
					html+='<p><span>疗养套餐</span>'+order.PackageName+'</p>';
					html+='<p><span>疗养人</span>'+order.Name+'</p>';
					html+='<p><span>疗养金额</span><i>￥'+order.TotalFee+'</i></p>';
					var beginTime=order.Begin.substring(6,order.Begin.length-2);
					beginTime = commomUtil.formatStringToDate(beginTime,1);
					var endTime = order.End.substring(6,order.End.length-2);
					endTime = commomUtil.formatStringToDate(endTime,1);
					html+='<p><span>疗养时间</span>'+beginTime+' ~ '+endTime+'</p>';	
					html+='<p><span>疗养机构</span>'+order.OrganizationShortName+'</p>';
					html+='<p class="ellipsis"><span>疗养地址</span>'+order.Address+'</p></a></li>';	
					html+='<li class="mui-table-view-cell spaOrderDetali-c1 border-t"><a class="">';
					var payNo = order.PayNo==null ? '--' : order.PayNo;
					html+='<p><span>交易号码</span>'+payNo+'</p>';
					var createTime='--';
					if(order.CreateTime!=null){
						createTime=order.CreateTime.substring(6,order.CreateTime.length-2);
						createTime = commomUtil.formatStringToDate(createTime,2);
					}
					html+='<p><span>创建时间</span>'+createTime+'</p>';
					var orderTime='--';
					if(order.OrderTime!=null){
						orderTime=order.OrderTime.substring(6,order.OrderTime.length-2);
						orderTime = commomUtil.formatStringToDate(orderTime,2);
					}
					html+='<p><span>确认时间</span>'+orderTime+'</p>';
					var payTime = '--';
					if(order.PrderTime!=null){
						payTime=order.PayTime.substring(6,order.PayTime.length-2);
						payTime = commomUtil.formatStringToDate(payTime,2);
					}
					html+='<p><span>付款时间</span>'+payTime+'</p>';
					var completeTime = '--';
					if(order.CompleteTime!=null){
						completeTime=order.CompleteTime.substring(6,order.CompleteTime.length-2);
						completeTime = commomUtil.formatStringToDate(completeTime,2);
					}
					html+='<p><span>完成时间</span>'+completeTime+'</p></a></li>';
					/*html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t"><a class="">';
					html+='评价 ';
					for(var j=0;j<5;j++){
						if(j < order.Score){
							html += '<span class="xing xing-active"></span>';
						}else{
							html += '<span class="xing"></span>';
						}
					}
					html += '</a></li>';
					html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t">';
					html+='<textarea disabled="disabled" name="" rows="" cols="">'+order.Comment+'</textarea></li>';*/
   					document.getElementById('spaOrderDetali6').innerHTML=html;
   					
   				}
   			},
   			onerror:function(e){
   				console.log(e);
   				var html = '<div class="zanwu_none" id=""><i></i>数据加载失败</div>';
   				document.getElementById('spaOrderDetali6').innerHTML=html;
   			}
		});
	},
	
	/**
	 * 已取消对象明细
	 */
	yqxSpaOrderDetail:function(){
		//每次进入清空缓存数据
		document.getElementById('spaOrderDetali5').innerHTML='';
		//请求数据
		jyapp.getApi({
			method:'Convalesce/OrderDetails',
			data:'orderId='+orderId,
			timeout : 10000,
   			showWaiting: true,
   			onsuccess:function(data){
   				if(data.code==1&&data.data!=null){
   					var order = data.data;
   					var html='<li class="mui-table-view-cell spaOrderDetali-t">';
   					html+='<article>订单编号：'+order.OrderNo+' <span class="">已取消</span></article></li>';
   					html+='<li class="mui-table-view-cell spaOrderDetali-c1"><a class="">';
					html+='<p><span>疗养套餐</span>'+order.PackageName+'</p>';
					html+='<p><span>疗养人</span>'+order.Name+'</p>';
					html+='<p><span>疗养金额</span><i>￥'+order.TotalFee+'</i></p>';
					var beginTime=order.Begin.substring(6,order.Begin.length-2);
					beginTime = commomUtil.formatStringToDate(beginTime,1);
					var endTime = order.End.substring(6,order.End.length-2);
					endTime = commomUtil.formatStringToDate(endTime,1);
					html+='<p><span>疗养时间</span>'+beginTime+' ~ '+endTime+'</p>';	
					html+='<p><span>疗养机构</span>'+order.OrganizationShortName+'</p>';
					html+='<p class="ellipsis"><span>疗养地址</span>'+order.Address+'</p></a></li>';	
					html+='<li class="mui-table-view-cell spaOrderDetali-c1 border-t"><a class="">';
					var payNo = order.PayNo==null ? '--' : order.PayNo;
					html+='<p><span>交易号码</span>'+payNo+'</p>';
					var createTime="--";
					if(order.CreateTime!=null){
						createTime=order.CreateTime.substring(6,order.CreateTime.length-2);
						createTime = commomUtil.formatStringToDate(createTime,2);
					}
					html+='<p><span>创建时间</span>'+createTime+'</p>';
					var orderTime='--';
					if(order.OrderTime!=null){
						orderTime=order.OrderTime.substring(6,order.OrderTime.length-2);
						orderTime = commomUtil.formatStringToDate(orderTime,2);
					}
					html+='<p><span>确认时间</span>'+orderTime+'</p>';
					var payTime = '--';
					if(order.PrderTime!=null){
						payTime=order.PayTime.substring(6,order.PayTime.length-2);
						payTime = commomUtil.formatStringToDate(payTime,2);
					}
					html+='<p><span>付款时间</span>'+payTime+'</p>';
					var completeTime = '--';
					if(order.CompleteTime!=null){
						completeTime=order.CompleteTime.substring(6,order.CompleteTime.length-2);
						completeTime = commomUtil.formatStringToDate(completeTime,2);
					}
					html+='<p><span>完成时间</span>'+completeTime+'</p></a></li>';
					/*html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t"><a class="">';
					html+='评价 ';
					for(var j=0;j<5;j++){
						if(j < order.Score){
							html += '<span class="xing xing-active"></span>';
						}else{
							html += '<span class="xing"></span>';
						}
					}
					html += '</a></li>';
					html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t">';
					html+='<textarea disabled="disabled" name="" rows="" cols="">'+order.Comment+'</textarea></li>';*/
   					document.getElementById('spaOrderDetali5').innerHTML=html;
   					
   				}
   			},
   			onerror:function(e){
   				console.log(e);
   				var html = '<div class="zanwu_none" id=""><i></i>数据加载失败</div>';
   				document.getElementById('spaOrderDetali5').innerHTML=html;
   			}
		});
	},
	
	/**
	 * 已完成对象明细
	 */
	ywcSpaOrderDetail:function(){
		//每次进入清空缓存数据
		document.getElementById('spaOrderDetali3').innerHTML='';
		//请求数据
		jyapp.getApi({
			method:'Convalesce/OrderDetails',
			data:'orderId='+orderId,
			timeout : 10000,
   			showWaiting: true,
   			onsuccess:function(data){
   				if(data.code==1&&data.data!=null){
// 					console.log(JSON.stringify(data));
   					var order = data.data;
   					var html='<li class="mui-table-view-cell spaOrderDetali-t">';
   					html+='<article>订单编号：'+order.OrderNo+' <span class="">已完成</span></article></li>';
   					html+='<li class="mui-table-view-cell spaOrderDetali-c1"><a class="">';
					html+='<p><span>疗养套餐</span>'+order.PackageName+'</p>';
					html+='<p><span>疗养人</span>'+order.Name+'</p>';
					html+='<p><span>疗养金额</span><i>￥'+order.TotalFee+'</i></p>';
					var beginTime=order.Begin.substring(6,order.Begin.length-2);
					beginTime = commomUtil.formatStringToDate(beginTime,1);
					var endTime = order.End.substring(6,order.End.length-2);
					endTime = commomUtil.formatStringToDate(endTime,1);
					html+='<p><span>疗养时间</span>'+beginTime+' ~ '+endTime+'</p>';	
					html+='<p><span>疗养机构</span>'+order.OrganizationShortName+'</p>';
					html+='<p class="ellipsis"><span>疗养地址</span>'+order.Address+'</p></a></li>';	
					html+='<li class="mui-table-view-cell spaOrderDetali-c1 border-t"><a class="">';
					var payNo = order.PayNo==null ? '--' : order.PayNo;
					//console.log("交易号码："+order.PayNo);
					//console.log("改后："+payNo);
					html+='<p><span>交易号码</span>'+payNo+'</p>';
					var createTime='--';
					if(order.CreateTime!=null){
						createTime=order.CreateTime.substring(6,order.CreateTime.length-2);
						createTime = commomUtil.formatStringToDate(createTime,2);
					}
					html+='<p><span>创建时间</span>'+createTime+'</p>';
					var orderTime='--';
					if(order.OrderTime!=null){
						orderTime=order.OrderTime.substring(6,order.OrderTime.length-2);
						orderTime = commomUtil.formatStringToDate(orderTime,2);
					}
					html+='<p><span>确认时间</span>'+orderTime+'</p>';
					var payTime = '--';
					if(order.PrderTime!=null){
						payTime=order.PayTime.substring(6,order.PayTime.length-2);
						payTime = commomUtil.formatStringToDate(payTime,2);
					}
					html+='<p><span>付款时间</span>'+payTime+'</p>';
					var completeTime = '--';
					if(order.CompleteTime!=null){
						completeTime=order.CompleteTime.substring(6,order.CompleteTime.length-2);
						completeTime = commomUtil.formatStringToDate(completeTime,2);
					}
					html+='<p><span>完成时间</span>'+completeTime+'</p></a></li>';
					html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t"><a class="">';
					html+='评价 ';
					for(var j=0;j<5;j++){
						if(j < order.Score){
							html += '<span class="xing xing-active"></span>';
						}else{
							html += '<span class="xing"></span>';
						}
					}
					html += '</a></li>';
					html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t">';
					html+='<textarea readonly="readonly" name="" rows="" cols="">'+order.Comment+'</textarea></li>';
   					document.getElementById('spaOrderDetali3').innerHTML=html;
   				}
   			},
   			onerror:function(e){
   				console.log(e);
   				var html = '<div class="zanwu_none" id=""><i></i>数据加载失败</div>';
   				document.getElementById('spaOrderDetali3').innerHTML=html;
   			}
   		});
	},
	/**
	 * 预约成功对象明细
	 */
	yycgSpaOrderDetail:function(){
		//每次进入清空缓存数据
		document.getElementById('spaOrderDetali4').innerHTML='';
		//请求数据
		jyapp.getApi({
			method:'Convalesce/OrderDetails',
			data:'orderId='+orderId,
			timeout : 10000,
   			showWaiting: true,
   			onsuccess:function(data){
   				if(data.code==1&&data.data!=null){
   					var order = data.data;
   					var html='<li class="mui-table-view-cell spaOrderDetali-t">';
   					html+='<article>订单编号：'+order.OrderNo+' <span class="red">预约成功</span></article></li>';
   					html+='<li class="mui-table-view-cell spaOrderDetali-c1"><a class="">';
   					html+='<p><span>疗养套餐</span>'+order.PackageName+'</p>';
					html+='<p><span>疗养金额</span><i>￥'+order.TotalFee+'</i></p>';
					var beginTime=order.Begin.substring(6,order.Begin.length-2);
					beginTime = commomUtil.formatStringToDate(beginTime,1);
					var endTime = order.End.substring(6,order.End.length-2);
					endTime = commomUtil.formatStringToDate(endTime,1);
					html+='<p><span>疗养时间</span>'+beginTime+' ~ '+endTime+'</p>';	
					html+='<p><span>疗养机构</span>'+order.OrganizationShortName+'</p>';
   					html+='<p class="ellipsis"><span>疗养地址</span>'+order.Address+'</p></a></li>';	
					html+='<li class="mui-table-view-cell spaOrderDetali-c1 border-t"><a class="">';
					var payNo = order.PayNo==null ? '--' : order.PayNo;
					html+='<p><span>交易号码</span>'+payNo+'</p>';
					var createTime='--';
					if(order.CreateTime!=null){
						createTime=order.CreateTime.substring(6,order.CreateTime.length-2);
						createTime = commomUtil.formatStringToDate(createTime,2);
					}
					html+='<p><span>创建时间</span>'+createTime+'</p>';
					var orderTime='--';
					if(order.OrderTime!=null){
						orderTime=order.OrderTime.substring(6,order.OrderTime.length-2);
						orderTime = commomUtil.formatStringToDate(orderTime,2);
					}
					html+='<p><span>确认时间</span>'+orderTime+'</p>';
					var payTime = '--';
					if(order.PrderTime!=null){
						payTime=order.PayTime.substring(6,order.PayTime.length-2);
						payTime = commomUtil.formatStringToDate(payTime,2);
					}
					html+='<p><span>付款时间</span>'+payTime+'</p>';
					var completeTime = '--';
					if(order.CompleteTime!=null){
						completeTime=order.CompleteTime.substring(6,order.CompleteTime.length-2);
						completeTime = commomUtil.formatStringToDate(completeTime,2);
					}
					html+='<p><span>完成时间</span>'+completeTime+'</p></a></li>';
					document.getElementById('spaOrderDetali4').innerHTML=html;
   				}
   			},
   			onerror:function(e){
   				console.log(e);
   				var html = '<div class="zanwu_none" id=""><i></i>数据加载失败</div>';
   				document.getElementById('spaOrderDetali4').innerHTML=html;
   			}
		});
		
	},
	/**
	 * 待支付对象明细
	 */
	dzfSpaOrderDetail:function(){
		//console.log("待支付明细对象ID："+orderId);
		//每次进入清空缓存数据
		document.getElementById('spaOrderDetali1').innerHTML='';
		document.getElementById('spaOrderDetali-coupons').innerHTML='';
		//请求数据
		jyapp.getApi({
			method:'Convalesce/OrderDetails',
			data:'orderId='+orderId,
			timeout : 10000,
   			showWaiting: true,
   			onsuccess:function(data){
   				//console.log('待支付明细对象：'+JSON.stringify(data));
   				if(data.code==1&&data.data!=null){
   					payOrder = data.data;
   					var order = data.data;
   					//拼装HTML
	   				var html = '<li class="mui-table-view-cell spaOrderDetali-t">';
	   				html+='<article>订单编号：'+order.OrderNo+' <span class="red">待支付</span></article></li>';
	   				html+='<li class="mui-table-view-cell spaOrderDetali-c1"><a class="mui-navigate-right">';
	   				html+='<p><span>疗养套餐</span>'+order.PackageName+'</p>';
	   				html+='<p><span>套餐价格</span><i>￥'+order.TotalFee+'</i></p>';
	   				html+='<p><span>疗养机构</span>'+order.OrganizationShortName+'</p>';
	   				html+='<p class="ellipsis"><span>疗养地址</span>'+order.Address+'</p></a></li>';
	   				var beginTime=order.Begin.substring(6,order.Begin.length-2);
					beginTime = commomUtil.formatStringToDate(beginTime,1);
					var endTime = order.End.substring(6,order.End.length-2);
					endTime = commomUtil.formatStringToDate(endTime,1);
					
					html+='<li class="mui-table-view-cell spaOrderDetali-c1"><a class=""><p><span>疗养时间</span>'+beginTime+' ~ '+endTime+'</p></a></li>';
					var sex = order.Sex;
					if(sex==0){
						sex='女';
					}else if(sex==1){
						sex='男';
					}else if(sex==2){
						sex='保密';
					}else if(sex==3){
						sex='未知';
					}
					var marry = order.IsMarry;
					if(marry==0){
						marry='未婚';
					}else if(marry==1){
						marry='已婚';
					}else if(marry==2){
						marry='离异';
					}
					
					html+='<li class="mui-table-view-cell spaOrderDetali-b"><p><span>疗养人</span>'+order.Name+'( '+sex+' | '+marry+')<br>'+order.Mobile+'<br>'+order.CardID+'</p></li>';
					/*<li class="mui-table-view-cell spaOrderDetali-b">
						<p><span>疗养人</span>李云青 ( 女 | 未婚 )<br>13112341234<br>342425199112311231</p>
					</li>*/
					document.getElementById('spaOrderDetali1').innerHTML=html;
					var coupons = '';
					coupons+='<ul class="mui-table-view coupons"><li class="mui-table-view-cell"><a class="mui-navigate-right">优惠劵</a></li>';
					coupons+='<li class="mui-table-view-cell"><a class="">实付金额<span class="red">￥'+order.TotalFee+'</span></a></li></ul>';
					document.getElementById('spaOrderDetali-coupons').innerHTML=coupons;
   				}
   				
   			},
   			onerror:function(e){
   				console.log(e);
   				var html = '<div class="zanwu_none" id=""><i></i>数据加载失败</div>';
   				document.getElementById('spaOrderDetali1').innerHTML=html;
   				document.getElementById('spaOrderDetali-coupons').innerHTML='';
   			}
		});
	},
	/**
	 * 待评价对象明细
	 */
	dpjSpaOrderDetail:function(){
		//console.log("待评价明细对象ID："+orderId);
		//每次进入清空缓存数据
		document.getElementById('spaOrderDetali2').innerHTML='';
		//请求数据
		jyapp.getApi({
			method:'Convalesce/OrderDetails',
			data:'orderId='+orderId,
			timeout : 10000,
   			showWaiting: true,
   			onsuccess:function(data){
   				//console.log('待评价明细对象：'+JSON.stringify(data));
   				if(data.code==1&&data.data!=null){
   					var order = data.data;
   					var html = '<li class="mui-table-view-cell spaOrderDetali-t">';
   					html+='<article>订单编号：'+order.OrderNo+' <span class="red">待评价</span></article></li>';
   					html+='<li class="mui-table-view-cell spaOrderDetali-c1"><a class="">';
   					html+='<p><span>疗养套餐</span>'+order.PackageName+'</p>';
   					html+='<p><span>疗养人</span>'+order.Name+'</p>';
   					html+='<p><span>疗养金额</span><i>￥'+order.TotalFee+'</i></p>';
   					var beginTime=order.Begin.substring(6,order.Begin.length-2);
					beginTime = commomUtil.formatStringToDate(beginTime,1);
					var endTime = order.End.substring(6,order.End.length-2);
					endTime = commomUtil.formatStringToDate(endTime,1);
   					html+='<p><span>疗养时间</span>'+beginTime+' ~ '+endTime+'</p>';
   					html+='<p><span>疗养机构</span>'+order.OrganizationShortName+'</p>';
   					html+='<p class="ellipsis"><span>疗养地址</span>'+order.Address+'</p></a></li>';
					html+='<li class="mui-table-view-cell spaOrderDetali-c1 border-t"><a class="">';
					var payNo = order.PayNo==null ? '--' : order.PayNo;
					html+='<p><span>交易号码</span>'+payNo+'</p>';
					var createTime='--';
					if(order.CreateTime!=null){
						createTime=order.CreateTime.substring(6,order.CreateTime.length-2);
						createTime = commomUtil.formatStringToDate(createTime,2);
					}
					html+='<p><span>创建时间</span>'+createTime+'</p>';
					var orderTime='--';
					if(order.OrderTime!=null){
						orderTime=order.OrderTime.substring(6,order.OrderTime.length-2);
						orderTime = commomUtil.formatStringToDate(orderTime,2);
					}
					html+='<p><span>确认时间</span>'+orderTime+'</p>';
					var payTime = '--';
					if(order.PrderTime!=null){
						payTime=order.PayTime.substring(6,order.PayTime.length-2);
						payTime = commomUtil.formatStringToDate(payTime,2);
					}
					html+='<p><span>付款时间</span>'+payTime+'</p>';
					var completeTime = '--';
					if(order.CompleteTime!=null){
						completeTime=order.CompleteTime.substring(6,order.CompleteTime.length-2);
						completeTime = commomUtil.formatStringToDate(completeTime,2);
					}
					html+='<p><span>完成时间</span>'+completeTime+'</p></a></li>';
					html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t"><a class="xingxing" id="spaOrderXingxingId">';
					html+='评价 <span class="xing"></span><span class="xing"></span><span class="xing"></span><span class="xing"></span><span class="xing"></span></a></li>';
					html+='<li class="mui-table-view-cell spaOrderDetali-b1 border-t"><textarea id="spaOrderDetailpjtext" name="" rows="" cols="" placeholder="亲，您对本次体检还满意吗？留下您的评论吧～"></textarea></li>';
					document.getElementById('spaOrderDetali2').innerHTML=html;
					//页面信息获取加载完成后，添加星星点击事件
					spaOrderDetail.operatorXing();
   				}
			},
			onerror:function(e){
				console.log(e);
				var html = '<div class="zanwu_none" id=""><i></i>数据加载失败</div>';
   				document.getElementById('spaOrderDetali1').innerHTML=html;
			}
		});
		
		
	},
	/**
	 * 显示当前的界面
	 */
	displaySpaOrderDetail:function(index){
		//console.log('index'+index);
		//备注信息
		var oRemark = document.getElementById("spaOrderDetali-remark");
		//优惠信息
		var oCoupons = document.getElementById("spaOrderDetali-coupons");
		//支付按钮
		oPay = document.getElementById("spaOrderDetali-pay");
		//评价按钮
		oAppraise = document.getElementById("spaOrderDetali-appraise");
		//根据不同操作显示不同的信息和按钮
		if(index==1){
			//待支付
			oRemark.style.display='block';
			oCoupons.style.display='block';
			oPay.style.display='block';
		}else if(index==2){
			oAppraise.style.display='block';
		}
		//当前处理的界面显示，其他隐藏
		for(var i=1;i<=6;i++){
			var spaOrderDetail = document.getElementById('spaOrderDetali'+i);
			if(index==i){
				spaOrderDetail.style.display='block';
			}else{
				spaOrderDetail.style.display='none';
			}
		}
	},
	/**
	 * 评价，星星点击事件
	 */
	operatorXing : function(){
		var ul = document.querySelector(".xingxing");
		var ul_lis = ul.getElementsByTagName('span');
		//console.log(JSON.stringify(ul_lis));
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
	/**
	 * 评价
	 */
	pjSpaOrderDetail:function(){
		//评分
		if(xingIndex<=0){
			plus.nativeUI.alert('请先进行评分','','健医宝','确认');
			return;
		}
		//评价内容
		var comment = document.getElementById("spaOrderDetailpjtext").value;
		if(!commomUtil.validateCommon(comment)){
			plus.nativeUI.alert('评论内容不能有非法字符，允许的字符为字母数字下划线和汉字','','健医宝','确认');
			return;
		}
		if(comment&&comment.length<10){
			plus.nativeUI.alert('评论内容不能少于5个汉字','','健医宝','确认');
			return;
		}else if(comment&&comment.length>500){
			plus.nativeUI.alert('评论内容不能超过250个汉字','','健医宝','确认');
			return;
		}
		//console.log(xingIndex+"--->"+comment+"-->"+orderId);
		
		//console.log('orderId='+orderId+'&comment='+comment+'&score='+xingIndex);
		comment = comment ? comment : "";
		jyapp.getApi({
   			method: 'Convalesce/OrderComment',
   			data:'orderId='+orderId+'&comment='+comment+'&score='+xingIndex,
   			timeout : 10000,
   			showWaiting: true,
   			onsuccess: function(data) {
   				//console.log(JSON.stringify(data));
				if(data.code == 1){
					var config = {
						id : "spaOrder",
						url : "../../healthy/spa/spaOrder.html",
						method : 'newSpaOrdersRecord',
						extras : {
							index : 3
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
	/**
	 * 支付
	 */
	paySpaOrderDetail:function(){
		var payinfo = {
			subject:'疗养预约订单',
			body:"疗养预约订单，订单号： "+payOrder.OrderNo+",订单时间:"+commomUtil.stringToDate(payOrder.CreateTime),
			orderno:payOrder.OrderNo,
			totalfee:payOrder.TotalFee,
			orderId:payOrder.ID,
			type:"spaOrderDetail",
			method : "newSpaOrdersRecord",
			backurl:backurl,
			backid : backid,
			successpage:{
				id:'payOrderSucceed',
				url:'../pay/payOrderSucceed.html'
			},
			backCell:{
				id: 'spaOrder',
				url: "../healthy/spa/spaOrder.html",
				index : 0
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
	//返回
	spaOreretaliBack:function(){
		var index = 0;
		switch(type){
			case 'dzf':
				index=0;
				break;
			case 'yycg':
				index=1;
				break;
			case 'dpj':
				index=2;
				break;
			case 'ywc':
				index=3;
				break;
		}
		var config = {
			id : "spaOrder",
			url : "spaOrder.html",
			method : "newSpaOrdersRecord",
			extras : {
				backurl: backurl,
				backid : backid,
				index: index
			}
		}
		jyapp.backWebView(config);
	}
	
	
}

//绑定评价按钮事件
document.getElementById("spaOrderDetali-appraise").addEventListener("click",spaOrderDetail.pjSpaOrderDetail);
//绑定支付按钮事件
document.getElementById("spaOrderDetali-pay").addEventListener("click",spaOrderDetail.paySpaOrderDetail);
//绑定返回按钮事件
document.getElementById('spaOreretaliBackId').addEventListener('click',spaOrderDetail.spaOreretaliBack);

/*spaOrderDetali.type = function(type) {
	switch (type) {
		case 'spaOrderList1':
			orderDetali1.style.display = 'block';
			oRemark.style.display = 'block';
			oCoupons.style.display = 'block';
			oPay.style.display = 'block';
			break;
		case 'spaOrderList2':
			orderDetali2.style.display = 'block';
			oAppraise.style.display = 'block';
			break;
		case 'spaOrderList3':
			orderDetali3.style.display = 'block';
			break;
		case 'cancal':
			orderDetali5.style.display = 'block';
			break;
		case 'back':
			orderDetali6.style.display = 'block';
			break;
		default:
			orderDetali4.style.display = 'block';
	}
}*/

//评价
/*var ul_lis = document.querySelector('.xingxing').querySelectorAll('span');
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
}*/
/*//选择支付方式
mui(document).on('tap', '#spaOrderDetali-pay', function() {
	commomUtil.closeWebviewById('choosePayment');
	mui.openWindow({
		id: 'choosePayment',
		url: "choosePayment.html"
	});
})*/