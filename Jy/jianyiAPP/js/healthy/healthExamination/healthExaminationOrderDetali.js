var orderDetail1 = document.getElementById("healthExaminationOrderDetail1"),
	orderDetail2 = document.getElementById("healthExaminationOrderDetail2"),
	orderDetail3 = document.getElementById("healthExaminationOrderDetail3"),
	orderDetail4 = document.getElementById("healthExaminationOrderDetail4"),
	orderDetail5 = document.getElementById("healthExaminationOrderDetail5"),
	orderDetail6 = document.getElementById("healthExaminationOrderDetail6"),
	orderDetail7 = document.getElementById("healthExaminationOrderDetail7"),
	oRemark = document.getElementById("healthExaminationOrderDetail-remark"),
	oCoupons = document.getElementById("healthExaminationOrderDetail-coupons"),
	oPay = document.getElementById("healthExaminationOrderDetail-pay"),
	oAppraise = document.getElementById("healthExaminationOrderDetail-appraise");
	
var orderId = '';
var type = '';
var orders = {};
var backid = "";
var backurl = "";
var checkId = 0;
var packageId = "";
var netName = "";
var buyChoose = "";
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	type = self.type;
	orderId = self.orderId;
	backid = self.backid ? self.backid : "0";
	backurl = self.backurl ? self.backurl : "0";
//	console.log(type+"----"+orderId);
	healthExaminationOrderDetail.initHEOrderDetailShow(type);
});

var healthExaminationOrderDetail = {
	initHEOrderDetailShow : function() {
		//异步初始化数据
		healthExaminationOrderDetail.initHEOrderDetailsData();
		switch (type) {
			case 'healthExamOrderList1':
				orderDetail1.style.display = 'block';
				oRemark.style.display = 'block';
				break;
			case 'healthExamOrderList2':
				orderDetail2.style.display = 'block';
				oRemark.style.display = 'block';
				oCoupons.style.display = 'block';
				oPay.style.display = 'block';
				break;
			case 'healthExamOrderList3':
				orderDetail3.style.display = 'block';
				break;
			case 'healthExamOrderList4':
				orderDetail4.style.display = 'block';
				oAppraise.style.display = 'block';
				break;
			case 'healthExamOrderList5':
				orderDetail5.style.display = 'block';
				break;
			case 'cancal':
				orderDetail6.style.display = 'block';
				break;
			case 'back':
				orderDetail7.style.display = 'block';
				break;
		}
	},
	initHEOrderDetailsData : function(){
		var requestOrderDetails = 'orderId='+orderId;
		jyapp.getApi({
			method: 'HealthExamination/OrderDetails',
			data:requestOrderDetails,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("initHEOrderDetailsData---->:"+JSON.stringify(response));
				if(response.code != 1){
					document.getElementById('heodzanwu_noneID').style.display = 'block';
					document.getElementById('healthExaminationOrderDetail1').innerHTML = '';
					document.getElementById('healthExaminationOrderDetail2').innerHTML = '';
					document.getElementById('healthExaminationOrderDetail3').innerHTML = '';
					document.getElementById('healthExaminationOrderDetail4').innerHTML = '';
					document.getElementById('healthExaminationOrderDetail5').innerHTML = '';
					document.getElementById('healthExaminationOrderDetail6').innerHTML = '';
					document.getElementById('healthExaminationOrderDetail7').innerHTML = '';
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data){
						document.getElementById('heodzanwu_noneID').style.display = 'none';
						switch (type) {
							case 'healthExamOrderList1':
								//初始化待确认订单详情
								healthExaminationOrderDetail.initHEOrderDetailsDQR(response);
								break;
							case 'healthExamOrderList2':
								//初始化待支付订单详情
								healthExaminationOrderDetail.initHEOrderDetailsDZF(response);
								break;
							case 'healthExamOrderList3':
								//初始化预约成功订单详情
								healthExaminationOrderDetail.initHEOrderDetailsYYCG(response);
								break;
							case 'healthExamOrderList4':
								//初始化待评价订单详情
								healthExaminationOrderDetail.initHEOrderDetailsDPJ(response);
								break;
							case 'healthExamOrderList5':
								//初始化已完成订单详情
								healthExaminationOrderDetail.initHEOrderDetailsYWC(response);
								break;
							case 'cancal':
								//初始化已取消订单详情
								healthExaminationOrderDetail.initHEOrderDetailsYQX(response);
								break;
							case 'back':
								//初始化已退款订单详情
								healthExaminationOrderDetail.initHEOrderDetailsYTK(response);
								break;
						}
					}else{
						plus.nativeUI.alert('体检订单详情查询失败','','健医宝','确认');
						return false;
					}
				}
			},
			onerror: function(e) {
				console.log("initHEOrderDetails:" + e);
			}
		});
	},
	initHEOrderDetailsDQR : function(response){
		var dataValue = response.data;
		var htmlHEOrderDetailsDQR = '';
		var PackageName = dataValue.PackageName ? (dataValue.PackageName != "--" ? dataValue.PackageName : "尚未确认") : "尚未确认";
		var TotalFee = dataValue.TotalFee ? dataValue.TotalFee : "";
		var ShortName = dataValue.ShortName ? dataValue.ShortName : "尚未确认";
		var VisitPlace = dataValue.VisitPlace ? dataValue.VisitPlace : "尚未确认";
		var VisitDate = dataValue.VisitDate ? dataValue.VisitDate : "尚未确认";
		var VisitDate = dataValue.VisitDate != null ? dataValue.VisitDate : "尚未确认";
		if(dataValue.VisitDate != null){
			var endLen = VisitDate.length - 2;
			var time = VisitDate.substring(6, endLen);
			time = commomUtil.formatStringToDate(time,1)+'&nbsp;上午';
		}else{
			time = VisitDate;
		}
		packageId = dataValue.PackageID ? dataValue.PackageID : "";
		netName = dataValue.ShortName ? dataValue.ShortName : "尚未确认";
		buyChoose = dataValue.PriceType ? dataValue.PriceType : "尚未确认";
		htmlHEOrderDetailsDQR += '<li class="mui-table-view-cell healthExaminationOrderDetail-t">';
		htmlHEOrderDetailsDQR += '	<article>订单编号：'+dataValue.OrderNo+' <span class="red">待客服确认</span></article>';
		htmlHEOrderDetailsDQR += '</li>';
		htmlHEOrderDetailsDQR += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsDQR += '	<a class="mui-navigate-right" id="dqrCheckPackageDetailsID">';
		htmlHEOrderDetailsDQR += '		<p><span>选择套餐</span>'+PackageName+'</p>';
		htmlHEOrderDetailsDQR += '		<p><span>套餐价格</span><i>￥'+TotalFee+'</i></p>';
		htmlHEOrderDetailsDQR += '		<p><span>体检网点</span>'+ShortName+'</p>';
		htmlHEOrderDetailsDQR += '		<p class="ellipsis"><span>体检地址</span>'+VisitPlace+'</p>';
		htmlHEOrderDetailsDQR += '	</a>';
		htmlHEOrderDetailsDQR += '</li>';
		htmlHEOrderDetailsDQR += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsDQR += '	<a class="">';
		htmlHEOrderDetailsDQR += '	</a>';
		htmlHEOrderDetailsDQR += '		<p><span>体检时间</span>&nbsp;&nbsp;'+time+'</p>';
		htmlHEOrderDetailsDQR += '</li>';
		htmlHEOrderDetailsDQR += '<li class="mui-table-view-cell healthExaminationOrderDetail-b">';
		var sexName = '';
		if(dataValue.Sex == 1){
			sexName = '女';
		}else if(dataValue.Sex == 2){
			sexName = '男';
		}
		var IsMarryName = '';
		if(dataValue.IsMarry == 1){
			IsMarryName = '未婚';
		}else if(dataValue.IsMarry == 2){
			IsMarryName = '已婚';
		}else{
			IsMarryName = '离异';
		}
		htmlHEOrderDetailsDQR += '	<p><span>&nbsp;被&nbsp;检&nbsp;人</span>'+dataValue.Name+' ( '+sexName+' | '+IsMarryName+' )<br>'+dataValue.Mobile+'<br>'+dataValue.CardID+'</p>';
		htmlHEOrderDetailsDQR += '</li>';
		var Remark = dataValue.Remark ? dataValue.Remark : "";
		document.getElementById('healthExaminationOrderDetaiRemarkID').value = Remark;
		document.getElementById('healthExaminationOrderDetail1').innerHTML = htmlHEOrderDetailsDQR;
		//初始化跳转套餐详情页面事件
		healthExaminationOrderDetail.initcheckPackageDetailsEvent("dqr");
	},
	initHEOrderDetailsDZF : function(response){
		var dataValue = response.data;
		orders = response.data;
		var dzfVisitDate = dataValue.VisitDate ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.VisitDate),1) : "--";
		packageId = dataValue.PackageID ? dataValue.PackageID : "";
		ShortName = dataValue.ShortName ? dataValue.ShortName : "尚未确认";
		netName = dataValue.ShortName ? dataValue.ShortName : "尚未确认";
		buyChoose = dataValue.PriceType ? dataValue.PriceType : "尚未确认";
		var htmlHEOrderDetailsDZF = '';
		htmlHEOrderDetailsDZF += '<li class="mui-table-view-cell healthExaminationOrderDetail-t">';
		htmlHEOrderDetailsDZF += '	<article>订单编号：'+dataValue.OrderNo+' <span class="red">待支付</span></article>';
		htmlHEOrderDetailsDZF += '</li>';
		htmlHEOrderDetailsDZF += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsDZF += '	<a class="mui-navigate-right" id="dzfCheckPackageDetailsID">';
		htmlHEOrderDetailsDZF += '		<p><span>选择套餐</span>'+dataValue.PackageName+'</p>';
		htmlHEOrderDetailsDZF += '		<p><span>套餐价格</span><i>￥'+dataValue.TotalFee+'</i></p>';
		htmlHEOrderDetailsDZF += '		<p><span>体检网点</span>'+ShortName+'</p>';
		htmlHEOrderDetailsDZF += '		<p class="ellipsis"><span>体检地址</span>'+dataValue.VisitPlace+'</p>';
		htmlHEOrderDetailsDZF += '	</a>';
		htmlHEOrderDetailsDZF += '</li>';
		htmlHEOrderDetailsDZF += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsDZF += '	<a class="">';
		htmlHEOrderDetailsDZF += '		<p><span>体检时间</span>&nbsp;&nbsp;'+dzfVisitDate+'&nbsp;上午</p>';
		htmlHEOrderDetailsDZF += '	</a>';
		htmlHEOrderDetailsDZF += '</li>';
		htmlHEOrderDetailsDZF += '<li class="mui-table-view-cell healthExaminationOrderDetail-b">';
		var sexName = '';
		if(dataValue.Sex == 1){
			sexName = '女';
		}else if(dataValue.Sex == 2){
			sexName = '男';
		}
		var IsMarryName = '';
		if(dataValue.IsMarry == 1){
			IsMarryName = '未婚';
		}else if(dataValue.IsMarry == 2){
			IsMarryName = '已婚';
		}else{
			IsMarryName = '离异';
		}
		htmlHEOrderDetailsDZF += '	<p><span>&nbsp;被&nbsp;检&nbsp;人</span>'+dataValue.Name+' ( '+sexName+' | '+IsMarryName+' )<br>'+dataValue.Mobile+'<br>'+dataValue.CardID+'</p>';
		htmlHEOrderDetailsDZF += '</li>';
		var Remark = dataValue.Remark ? dataValue.Remark : "";
		document.getElementById('healthExaminationOrderDetaiRemarkID').value = Remark;
		document.getElementById('actualPaymentAmountID').innerText = "￥"+dataValue.TotalFee;
		document.getElementById('healthExaminationOrderDetail2').innerHTML = htmlHEOrderDetailsDZF;
		//初始化跳转套餐详情页面事件
		healthExaminationOrderDetail.initcheckPackageDetailsEvent("dzf");
	},
	initHEOrderDetailsYYCG : function(response){
		var dataValue = response.data;
		var yycgVisitDate = dataValue.VisitDate ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.VisitDate),1) : "--";
		var yycgCreateTime = dataValue.CreateTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CreateTime),2) : "--";
		var yycgOrderTime = dataValue.OrderTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.OrderTime),2) : "--";
		var yycgPayTime = dataValue.PayTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.PayTime),2) : "--";
		var yycgCompleteTime = dataValue.CompleteTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CompleteTime),2) : "--";
		var htmlHEOrderDetailsYYCG = '';
		htmlHEOrderDetailsYYCG += '<li class="mui-table-view-cell healthExaminationOrderDetail-t">';
		htmlHEOrderDetailsYYCG += '	<article>订单编号：'+dataValue.OrderNo+' <span class="red">预约成功</span></article>';
		htmlHEOrderDetailsYYCG += '</li>';
		htmlHEOrderDetailsYYCG += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1 border-t">';
		htmlHEOrderDetailsYYCG += '	<a class="">';
		htmlHEOrderDetailsYYCG += '		<p><span>选择套餐</span>'+dataValue.PackageName+'</p>';
		htmlHEOrderDetailsYYCG += '		<p><span>&nbsp;体&nbsp;检&nbsp;人</span>'+dataValue.Name+'</p>';
		htmlHEOrderDetailsYYCG += '		<p><span>实付金额</span><i>￥'+dataValue.TotalFee+'</i></p>';
		htmlHEOrderDetailsYYCG += '		<p><span>体检时间</span>'+yycgVisitDate+'&nbsp;上午</p>';
		htmlHEOrderDetailsYYCG += '		<p><span>体检网点</span>'+dataValue.ShortName+'</p>';
		htmlHEOrderDetailsYYCG += '		<p class="ellipsis"><span>体检地址</span>'+dataValue.VisitPlace+'</p>';
		var isExaminationReport = dataValue.isExaminationReport ? dataValue.isExaminationReport : false;
		if(isExaminationReport){
			htmlHEOrderDetailsYYCG += '		<p><span>体检报告</span>已送达</p>';
		}else{
			htmlHEOrderDetailsYYCG += '		<p><span>体检报告</span>未完成</p>';
		}
		htmlHEOrderDetailsYYCG += '	</a>';
		htmlHEOrderDetailsYYCG += '</li>';
		htmlHEOrderDetailsYYCG += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1 border-t">';
		htmlHEOrderDetailsYYCG += '	<a class="">';
		if(dataValue.PayTpye == 1){
			htmlHEOrderDetailsYYCG += '<p class="jyh5"><span>健医交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 2){
			htmlHEOrderDetailsYYCG += '<p class="jyh5"><span>微信交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 3){
			htmlHEOrderDetailsYYCG += '<p class="jyh6"><span>支付宝交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 4){
			htmlHEOrderDetailsYYCG += '<p class="jyh5"><span>银联交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 5){
			htmlHEOrderDetailsYYCG += '<p><span>无需支付</span></p>';
		}
		htmlHEOrderDetailsYYCG += '		<p><span>创建时间</span>'+yycgCreateTime+'</p>';
		htmlHEOrderDetailsYYCG += '		<p><span>确认时间</span>'+yycgOrderTime+'</p>';
		htmlHEOrderDetailsYYCG += '		<p><span>付款时间</span>'+yycgPayTime+'</p>';
		htmlHEOrderDetailsYYCG += '		<p><span>完成时间</span>'+yycgCompleteTime+'</p>';
		htmlHEOrderDetailsYYCG += '	</a>';
		htmlHEOrderDetailsYYCG += '</li>';
		document.getElementById('healthExaminationOrderDetail3').innerHTML = htmlHEOrderDetailsYYCG;
	},
	initHEOrderDetailsDPJ : function(response){
		var dataValue = response.data;
		var dpjVisitDate = dataValue.VisitDate ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.VisitDate),1) : "--";
		var dpjCreateTime = dataValue.CreateTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CreateTime),2) : "--";
		var dpjOrderTime = dataValue.OrderTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.OrderTime),2) : "--";
		var dpjPayTime = dataValue.PayTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.PayTime),2) : "--";
		var dpjCompleteTime = dataValue.CompleteTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CompleteTime),2) : "--";
		var htmlHEOrderDetailsDPJ = '';
		htmlHEOrderDetailsDPJ += '<li class="mui-table-view-cell healthExaminationOrderDetail-t">';
		htmlHEOrderDetailsDPJ += '	<article>订单编号：'+dataValue.OrderNo+' <span class="red">待评价</span></article>';
		htmlHEOrderDetailsDPJ += '</li>';
		htmlHEOrderDetailsDPJ += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsDPJ += '	<a class="">';
		htmlHEOrderDetailsDPJ += '		<p><span>选择套餐</span>'+dataValue.PackageName+'</p>';
		htmlHEOrderDetailsDPJ += '		<p><span>&nbsp;体&nbsp;检&nbsp;人</span>'+dataValue.Name+'</p>';
		htmlHEOrderDetailsDPJ += '		<p><span>实付金额</span><i>￥'+dataValue.TotalFee+'</i></p>';
		htmlHEOrderDetailsDPJ += '		<p><span>体检时间</span>'+dpjVisitDate+'&nbsp;上午</p>';
		htmlHEOrderDetailsDPJ += '		<p><span>体检网点</span>'+dataValue.ShortName+'</p>';
		htmlHEOrderDetailsDPJ += '		<p class="ellipsis"><span>体检地址</span>'+dataValue.VisitPlace+'</p>';
		var isExaminationReport = dataValue.isExaminationReport ? dataValue.isExaminationReport : false;
		if(isExaminationReport){
			htmlHEOrderDetailsDPJ += '		<p><span>体检报告</span>已送达</p>';
		}else{
			htmlHEOrderDetailsDPJ += '		<p><span>体检报告</span>未完成</p>';
		}
		htmlHEOrderDetailsDPJ += '	</a>';
		htmlHEOrderDetailsDPJ += '</li>';
		htmlHEOrderDetailsDPJ += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1 border-t">';
		htmlHEOrderDetailsDPJ += '	<a class="">';
		if(dataValue.PayTpye == 1){
			htmlHEOrderDetailsDPJ += '<p class="jyh5"><span>健医交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 2){
			htmlHEOrderDetailsDPJ += '<p class="jyh5"><span>微信交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 3){
			htmlHEOrderDetailsDPJ += '<p class="jyh6"><span>支付宝交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 4){
			htmlHEOrderDetailsDPJ += '<p class="jyh5"><span>银联交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 5){
			htmlHEOrderDetailsDPJ += '<p><span>无需支付</span></p>';
		}
		htmlHEOrderDetailsDPJ += '		<p><span>创建时间</span>'+dpjCreateTime+'</p>';
		htmlHEOrderDetailsDPJ += '		<p><span>确认时间</span>'+dpjOrderTime+'</p>';
		htmlHEOrderDetailsDPJ += '		<p><span>付款时间</span>'+dpjPayTime+'</p>';
		htmlHEOrderDetailsDPJ += '		<p><span>完成时间</span>'+dpjCompleteTime+'</p>';
		htmlHEOrderDetailsDPJ += '	</a>';
		htmlHEOrderDetailsDPJ += '</li>';
		htmlHEOrderDetailsDPJ += '<li class="mui-table-view-cell healthExaminationOrderDetail-b1 border-t">';
		htmlHEOrderDetailsDPJ += '	<a class="xingxing" id="healthExamOrderDetailsDPJXingXingID">';
		htmlHEOrderDetailsDPJ += '		评价<span class="xing"></span><span class="xing"></span><span class="xing"></span><span class="xing"></span><span class="xing"></span>';
		htmlHEOrderDetailsDPJ += '	</a>';
		htmlHEOrderDetailsDPJ += '</li>';
		htmlHEOrderDetailsDPJ += '<li class="mui-table-view-cell healthExaminationOrderDetail-b1 border-t">';
		htmlHEOrderDetailsDPJ += '	<textarea name="" rows="" cols="" placeholder="亲，您对本次体检还满意吗？留下您的评论吧～" id="healthExaminationOrderDetailAppraiseID"></textarea>';
		htmlHEOrderDetailsDPJ += '</li>';
		document.getElementById('healthExaminationOrderDetail4').innerHTML = htmlHEOrderDetailsDPJ;
		//初始化评论控件
		healthExaminationOrderDetail.initAppraiseCommont();
	},
	initHEOrderDetailsYWC : function(response){
		var dataValue = response.data;
		var ywcVisitDate = dataValue.VisitDate ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.VisitDate),1) : "--";
		var ywcCreateTime = dataValue.CreateTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CreateTime),2) : "--";
		var ywcOrderTime = dataValue.OrderTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.OrderTime),2) : "--";
		var ywcPayTime = dataValue.PayTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.PayTime),2) : "--";
		var ywcCompleteTime = dataValue.CompleteTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CompleteTime),2) : "--";
		var htmlHEOrderDetailsYWC = '';
		htmlHEOrderDetailsYWC += '<li class="mui-table-view-cell healthExaminationOrderDetail-t">';
		htmlHEOrderDetailsYWC += '	<article>订单编号：'+dataValue.OrderNo+' <span class="red">已完成</span></article>';
		htmlHEOrderDetailsYWC += '</li>';
		htmlHEOrderDetailsYWC += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsYWC += '	<a class="">';
		htmlHEOrderDetailsYWC += '		<p><span>选择套餐</span>'+dataValue.PackageName+'</p>';
		htmlHEOrderDetailsYWC += '		<p><span>&nbsp;体&nbsp;检&nbsp;人</span>'+dataValue.Name+'</p>';
		htmlHEOrderDetailsYWC += '		<p><span>实付金额</span><i>￥'+dataValue.TotalFee+'</i></p>';
		htmlHEOrderDetailsYWC += '		<p><span>体检时间</span>'+ywcVisitDate+'&nbsp;上午</p>';
		var tjwd = dataValue.ShortName ? dataValue.ShortName : '--';
		htmlHEOrderDetailsYWC += '		<p><span>体检网点</span>'+tjwd+'</p>';
		var tjaddr = dataValue.VisitPlace ? dataValue.VisitPlace : '--';
		htmlHEOrderDetailsYWC += '		<p class="ellipsis"><span>体检地址</span>'+tjaddr+'</p>';
		var isExaminationReport = dataValue.isExaminationReport ? dataValue.isExaminationReport : false;
		if(isExaminationReport){
			htmlHEOrderDetailsYWC += '		<p><span>体检报告</span>已送达</p>';
		}else{
			htmlHEOrderDetailsYWC += '		<p><span>体检报告</span>未完成</p>';
		}
		htmlHEOrderDetailsYWC += '	</a>';
		htmlHEOrderDetailsYWC += '</li>';
		htmlHEOrderDetailsYWC += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1 border-t">';
		htmlHEOrderDetailsYWC += '	<a class="">';
		if(dataValue.PayTpye == 1){
			htmlHEOrderDetailsYWC += '<p class="jyh5"><span>健医交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 2){
			htmlHEOrderDetailsYWC += '<p class="jyh5"><span>微信交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 3){
			htmlHEOrderDetailsYWC += '<p class="jyh6"><span>支付宝交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 4){
			htmlHEOrderDetailsYWC += '<p class="jyh5"><span>银联交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 5){
			htmlHEOrderDetailsYWC += '<p><span>无需支付</span></p>';
		}
		htmlHEOrderDetailsYWC += '		<p><span>创建时间</span>'+ywcCreateTime+'</p>';
		htmlHEOrderDetailsYWC += '		<p><span>确认时间</span>'+ywcOrderTime+'</p>';
		htmlHEOrderDetailsYWC += '		<p><span>付款时间</span>'+ywcPayTime+'</p>';
		htmlHEOrderDetailsYWC += '		<p><span>完成时间</span>'+ywcCompleteTime+'</p>';
		htmlHEOrderDetailsYWC += '	</a>';
		htmlHEOrderDetailsYWC += '</li>';
		htmlHEOrderDetailsYWC += '<li class="mui-table-view-cell healthExaminationOrderDetail-b1 border-t">';
		htmlHEOrderDetailsYWC += '	<a class="xingxing" id="healthExamOrderDetailsYWCXingXingID">';
		htmlHEOrderDetailsYWC += '		评价';
		for(var s = 0; s < 5; s++){
			if(s > [5 - parseInt(dataValue.Score)] || s == [5 - parseInt(dataValue.Score)]){
				htmlHEOrderDetailsYWC += '<span class="xing xing-active"></span>';
			}else{
				htmlHEOrderDetailsYWC += '<span class="xing"></span>';
			}
		}
		htmlHEOrderDetailsYWC += '	</a>';
		htmlHEOrderDetailsYWC += '</li>';
		htmlHEOrderDetailsYWC += '<li class="mui-table-view-cell healthExaminationOrderDetail-b1 border-t">';
		htmlHEOrderDetailsYWC += '	<textarea name="" rows="" cols="" id="ywcCommentID"></textarea>';
		htmlHEOrderDetailsYWC += '</li>';
		document.getElementById('healthExaminationOrderDetail5').innerHTML = htmlHEOrderDetailsYWC;
		var Comment = dataValue.Comment != '--' ? dataValue.Comment : "";
		document.getElementById('ywcCommentID').value = Comment;
	},
	initHEOrderDetailsYQX : function(response){
		var dataValue = response.data;
		var htmlHEOrderDetailsYQX = '';
		var PackageName = dataValue.PackageName ? (dataValue.PackageName != "--" ? dataValue.PackageName : "尚未确认") : "尚未确认";
		var TotalFee = dataValue.TotalFee ? dataValue.TotalFee : "";
		var ShortName = dataValue.ShortName ? dataValue.ShortName : "尚未确认";
		var VisitPlace = dataValue.VisitPlace ? dataValue.VisitPlace : "尚未确认";
		var VisitDate = dataValue.VisitDate != null ? dataValue.VisitDate : "尚未确认";
		if(dataValue.VisitDate != null){
			var endLen = VisitDate.length - 2;
			var time = VisitDate.substring(6, endLen);
			time = commomUtil.formatStringToDate(time,1)+'&nbsp;上午';
		}else{
			time = VisitDate;
		}
		packageId = dataValue.PackageID ? dataValue.PackageID : "";
		netName = dataValue.ShortName ? dataValue.ShortName : "尚未确认";
		buyChoose = dataValue.PriceType ? dataValue.PriceType : "尚未确认";
		htmlHEOrderDetailsYQX += '<li class="mui-table-view-cell healthExaminationOrderDetail-t">';
		htmlHEOrderDetailsYQX += '	<article>订单编号：'+dataValue.OrderNo+' <span class="red">已取消</span></article>';
		htmlHEOrderDetailsYQX += '</li>';
		htmlHEOrderDetailsYQX += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsYQX += '	<a class="mui-navigate-right" id="yqxCheckPackageDetailsID">';
		htmlHEOrderDetailsYQX += '		<p><span>选择套餐</span>'+PackageName+'</p>';
		htmlHEOrderDetailsYQX += '		<p><span>套餐价格</span><i>￥'+TotalFee+'</i></p>';
		htmlHEOrderDetailsYQX += '		<p><span>体检网点</span>'+ShortName+'</p>';
		htmlHEOrderDetailsYQX += '		<p class="ellipsis"><span>体检地址</span>'+VisitPlace+'</p>';
		htmlHEOrderDetailsYQX += '	</a>';
		htmlHEOrderDetailsYQX += '</li>';
		htmlHEOrderDetailsYQX += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsYQX += '	<a class="">';
		htmlHEOrderDetailsYQX += '	</a>';
		htmlHEOrderDetailsYQX += '		<p><span>体检时间</span>&nbsp;&nbsp;'+time+'</p>';
		htmlHEOrderDetailsYQX += '</li>';
		htmlHEOrderDetailsYQX += '<li class="mui-table-view-cell healthExaminationOrderDetail-b">';
		var sexName = '';
		if(dataValue.Sex == 1){
			sexName = '女';
		}else if(dataValue.Sex == 2){
			sexName = '男';
		}
		var IsMarryName = '';
		if(dataValue.IsMarry == 1){
			IsMarryName = '未婚';
		}else if(dataValue.IsMarry == 2){
			IsMarryName = '已婚';
		}else{
			IsMarryName = '离异';
		}
		htmlHEOrderDetailsYQX += '	<p><span>&nbsp;被&nbsp;检&nbsp;人</span>'+dataValue.Name+' ( '+sexName+' | '+IsMarryName+' )<br>'+dataValue.Mobile+'<br>'+dataValue.CardID+'</p>';
		htmlHEOrderDetailsYQX += '</li>';
		var Remark = dataValue.Remark ? dataValue.Remark : "";
		document.getElementById('healthExaminationOrderDetaiRemarkID').value = Remark;
		document.getElementById('healthExaminationOrderDetail6').innerHTML = htmlHEOrderDetailsYQX;
		//初始化跳转套餐详情页面事件
		healthExaminationOrderDetail.initcheckPackageDetailsEvent("yqx");
	},
	initHEOrderDetailsYTK : function(response){
		var dataValue = response.data;
		var ytkVisitDate = dataValue.VisitDate ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.VisitDate),1) : "--";
		var ytkCreateTime = dataValue.CreateTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CreateTime),2) : "--";
		var ytkOrderTime = dataValue.OrderTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.OrderTime),2) : "--";
		var ytkPayTime = dataValue.PayTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.PayTime),2) : "--";
		var ytkCompleteTime = dataValue.CompleteTime ? commomUtil.formatStringToDate(commomUtil.stringSplit(dataValue.CompleteTime),2) : "--";
		var htmlHEOrderDetailsYTK = '';
		htmlHEOrderDetailsYTK += '<li class="mui-table-view-cell healthExaminationOrderDetail-t">';
		htmlHEOrderDetailsYTK += '	<article>订单编号：'+dataValue.OrderNo+' <span class="red">已退款</span></article>';
		htmlHEOrderDetailsYTK += '</li>';
		htmlHEOrderDetailsYTK += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1">';
		htmlHEOrderDetailsYTK += '	<a class="">';
		htmlHEOrderDetailsYTK += '		<p><span>选择套餐</span>'+dataValue.PackageName+'</p>';
		htmlHEOrderDetailsYTK += '		<p><span>&nbsp;体&nbsp;检&nbsp;人</span>'+dataValue.Name+'</p>';
		htmlHEOrderDetailsYTK += '		<p><span>实付金额</span><i>￥'+dataValue.TotalFee+'</i></p>';
		htmlHEOrderDetailsYTK += '		<p><span>体检时间</span>'+ytkVisitDate+'&nbsp;上午</p>';
		var tjwd = dataValue.ShortName ? dataValue.ShortName : '--';
		htmlHEOrderDetailsYTK += '		<p><span>体检网点</span>'+tjwd+'</p>';
		var tjaddr = dataValue.VisitPlace ? dataValue.VisitPlace : '--';
		htmlHEOrderDetailsYTK += '		<p class="ellipsis"><span>体检地址</span>'+tjaddr+'</p>';
		var isExaminationReport = dataValue.isExaminationReport ? dataValue.isExaminationReport : false;
		if(isExaminationReport){
			htmlHEOrderDetailsYTK += '		<p><span>体检报告</span>已送达</p>';
		}else{
			htmlHEOrderDetailsYTK += '		<p><span>体检报告</span>未完成</p>';
		}
		htmlHEOrderDetailsYTK += '	</a>';
		htmlHEOrderDetailsYTK += '</li>';
		htmlHEOrderDetailsYTK += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1 border-t">';
		htmlHEOrderDetailsYTK += '	<a class="">';
		if(dataValue.PayTpye == 1){
			htmlHEOrderDetailsYTK += '<p class="jyh5"><span>健医交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 2){
			htmlHEOrderDetailsYTK += '<p class="jyh5"><span>微信交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 3){
			htmlHEOrderDetailsYTK += '<p class="jyh6"><span>支付宝交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 4){
			htmlHEOrderDetailsYTK += '<p class="jyh5"><span>银联交易号</span>'+dataValue.PayNo+'</p>';
		}else if(dataValue.PayTpye == 5){
			htmlHEOrderDetailsYTK += '<p class="jyh5"><span>无需支付</span></p>';
		}
		htmlHEOrderDetailsYTK += '		<p><span>创建时间</span>'+ytkCreateTime+'</p>';
		htmlHEOrderDetailsYTK += '		<p><span>确认时间</span>'+ytkOrderTime+'</p>';
		htmlHEOrderDetailsYTK += '		<p><span>付款时间</span>'+ytkPayTime+'</p>';
		htmlHEOrderDetailsYTK += '		<p><span>完成时间</span>'+ytkCompleteTime+'</p>';
		htmlHEOrderDetailsYTK += '	</a>';
		htmlHEOrderDetailsYTK += '</li>';
		htmlHEOrderDetailsYTK += '<li class="mui-table-view-cell healthExaminationOrderDetail-c1 border-t">';
		htmlHEOrderDetailsYTK += '	<a class="">';
		htmlHEOrderDetailsYTK += '		<p><span>已退金额</span><i>￥'+dataValue.TotalFee+'</i></p>';
		if(dataValue.PayTpye == 1){
			htmlHEOrderDetailsYTK += '		<p><span>退款转入</span>健医卡</p>';
		}else if(dataValue.PayTpye == 2){
			htmlHEOrderDetailsYTK += '		<p><span>退款转入</span>微信</p>';
		}else if(dataValue.PayTpye == 3){
			htmlHEOrderDetailsYTK += '		<p><span>退款转入</span>支付宝</p>';
		}else if(dataValue.PayTpye == 4){
			htmlHEOrderDetailsYTK += '		<p><span>退款转入</span>银联卡</p>';
		}else if(dataValue.PayTpye == 5){
			htmlHEOrderDetailsYTK += '		<p><span>退款转入</span>无需支付</p>';
		}
		/*htmlHEOrderDetailsYTK += '		<p><span>流 水 号</span></p>';*/
		/*htmlHEOrderDetailsYTK += '		<p><span>操作时间</span>'+ywcCompleteTime+'</p>';*/
		htmlHEOrderDetailsYTK += '	</a>';
		htmlHEOrderDetailsYTK += '</li>';
		document.getElementById('healthExaminationOrderDetail7').innerHTML = htmlHEOrderDetailsYTK;
	},
	submitOrderDetailsPay: function() {
		var payinfo = {
			subject: '体检预约订单',
			body: "您预约的体检: '" + orders.PackageName + "',体检时间:" + commomUtil.formatStringToDate(commomUtil.stringSplit(orders.CreateTime),1) + "&nbsp;上午",
			orderno: orders.OrderNo,
			totalfee: orders.TotalFee,
			orderId: orders.ID,
			type: "healthExamination",
			backurl: backurl,
			backid : backid,
			method : "newIdsHealthExaminationList",
			successpage: {
				id: 'payOrderSucceed',
				url: '../pay/payOrderSucceed.html'
			},
			backCell: {
				id: "healthExaminationOrder",
				url: "../../healthy/healthExamination/healthExaminationOrder.html",
				index: 1
			}
		}
		mui.openWindow({
			id: 'payment',
			url: "../../core/payment.html",
			extras: {
				payinfo: payinfo
			}
		});
	},
	appraiseCommont : function(){
		//获取评价评分
		var score = 0;
		var ul_ps = document.getElementById('healthExamOrderDetailsDPJXingXingID');
		var ul_sps = ul_ps.querySelectorAll('span');
		for (var i = 0; i < ul_sps.length; i++) {
			if (ul_sps[i].className == "xing xing-active") {
				score = i + 1;
			}
		}
		if (score == 0) {
			plus.nativeUI.alert('请选择评分', '','健医宝', '确认');
			return false;
		}
		//获取评论内容
		var comments = document.getElementById("healthExaminationOrderDetailAppraiseID").value;
		
		if(!commomUtil.validateCommon(comments)){
			plus.nativeUI.alert('评论内容不能含有特殊字符，允许的字符包括字母、数字、下划线和汉字','','健医宝','确认');
			return false;
		}
		var commentsLen = commomUtil.GetLength(comments);
		/*start--待定*/
		if (commentsLen > 0 && commentsLen < 10) {
			plus.nativeUI.alert("评论内容不能少于5个汉字", "", "健医宝", "确认");
			return false;
		}
		/*end--待定*/
		if (commentsLen > 500) {
			plus.nativeUI.alert("评论内容不能超过250个汉字", "", "健医宝", "确认");
			return false;
		}
		comments = comments ? comments : "";
		var requestCommont = "orderId=" + orderId + "&score=" + score + "&comment=" + comments + "&isAno=1";
//		console.log("requestCommont---->:"+requestCommont);
		if (checkId == 0) {
			checkId++;
			jyapp.getApi({
				method: 'HealthExamination/OrderComment',
				data: requestCommont,
				timeout: 10000,
				showWaiting: true,
				onsuccess: function(data) {
//					console.log("OrderComment---->:"+JSON.stringify(data));
					checkId = 1;
					var code = data.code;
					order = data;
					if (code == 1) {
						var config = {
							id : "healthExaminationOrder",
							url: "healthExaminationOrder.html",
							method : "newIdsHealthExaminationList",
							extras : {
								backurl: backurl,
								backid : backid,
								index : 4
							}
						}
						jyapp.backWebView(config);
					} else {
						plus.nativeUI.alert(data.msg, '','健医宝', '确认');
						return false;
					}
				},
				onerror: function(e) {
					checkId = 1;
					console.log("appraiseCommont---->:" + e);
				}
			});
		}
	},
	initAppraiseCommont : function(){
		var ul = document.getElementById('healthExamOrderDetailsDPJXingXingID');
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
	},
	initcheckPackageDetailsEvent : function(type){
		if(type == "dqr"){
			//待确认需要查看套餐详情
			document.getElementById('dqrCheckPackageDetailsID').addEventListener('click',healthExaminationOrderDetail.checkPackageDetails);
		}else if(type == "dzf"){
			//待支付需要查看套餐详情
			document.getElementById('dzfCheckPackageDetailsID').addEventListener('click',healthExaminationOrderDetail.checkPackageDetails);
		}else if(type == "yqx"){
			//已取消需要查看套餐详情
			document.getElementById('yqxCheckPackageDetailsID').addEventListener('click',healthExaminationOrderDetail.checkPackageDetails);
		}
	},
	checkPackageDetails : function(){
		if(packageId == ""){
			return false;
		}
		commomUtil.closeWebviewById('healthExaminationPackage');
		mui.openWindow({
			id: 'healthExaminationPackage',
			url: "healthExaminationPackage.html",
			extras: {
				"backid" : 'healthExaminationOrderDetali',
				"backurl" : 'healthExaminationOrderDetali.html',
				"packageId" : packageId,
				"isCheckType" : true,
				"netName" : netName,
				"buyChoose" : buyChoose
			}
		});
	}
}

//绑定选择支付方式
document.getElementById('healthExaminationOrderDetail-pay').addEventListener('click',healthExaminationOrderDetail.submitOrderDetailsPay);

//绑定评论按钮事件
document.getElementById('healthExaminationOrderDetail-appraise').addEventListener('click',healthExaminationOrderDetail.appraiseCommont);