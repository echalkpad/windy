var pageIndexDZF = 1;
var pageIndexDJZ = 1;
var pageIndexDPJ = 1;
var pageIndexYWC = 1;
var pageSize = 10;
var htmlDZF = '';
var htmlDJZ = '';
var htmlDPJ = '';
var htmlYWC = '';
var totalDZF = 0;
var totalDJZ = 0;
var totalDPJ = 0;
var totalYWC = 0;
//mui.init({
//	pullRefresh: {
//		container: '#pullrefreshSlowOrderList',
//		down: {
//			callback: slowOrderList.pulldownRefresh
//		}
//	}
//});
var index = 0;

var backid = "";
var backUrl = "";
document.addEventListener('plusready', function() {
	//设置显示页面
	var self = plus.webview.currentWebview();
	index = self.index;
	backid = self.backid;
	backUrl = self.backurl;
	if(!index || typeof(index) == 'undefined' || index == ""){
		index = 0;
	}
	slowOrderList.initPageHtml(index);
})

var slowOrderList = {
	setTs : function(parentId,spanId,type){
		document.getElementById(parentId).setAttribute("class","mui-content nomore");
		if(type == 1){
			document.getElementById(spanId).innerHTML = "没有更多数据了";
		}
		setTimeout(function(){
			document.getElementById(parentId).setAttribute("class","mui-content");
		},1500);
	},
		initPageHtml: function(index) {
			document.getElementById("backslowOrderListWebviewId").value = backid;
			document.getElementById("backslowOrderListWebviewUrl").value = backUrl;
			//初始化订单列表页面--待支付模块
			slowOrderList.initSlowOrderListDZF(pageIndexDZF, pageSize);
			//初始化订单列表页面--待就诊模块
			slowOrderList.initSlowOrderListDJZ(pageIndexDJZ, pageSize);
			//初始化订单列表页面--待评价模块
			slowOrderList.initSlowOrderListDPJ(pageIndexDPJ, pageSize);
			//初始化订单列表页面--已完成模块
			slowOrderList.initSlowOrderListYWC(pageIndexYWC, pageSize);
			var divs = document.getElementById("solwSegmentedControl");
			var consultingas = divs.getElementsByTagName("a");
			if (index) {
				for (var i = 0; i < consultingas.length; i++) {
					consultingas[i].setAttribute('class', 'mui-control-item');
					document.getElementById("itemSlowOrderList" + (i + 1)).setAttribute("class", "mui-control-content");
					if (i == index) {
						consultingas[i].setAttribute('class', 'mui-control-item mui-active');
						document.getElementById("itemSlowOrderList" + (i + 1)).setAttribute("class", "mui-control-content mui-active");
					}
				}
			}
			//加载上拉刷新事件
			document.addEventListener("plusscrollbottom", function() {
				var divid = 0;
				for (var i = 0; i < consultingas.length; i++) {
					if (consultingas[i].className == "mui-control-item mui-active") {
						divid = i + 1;
						break;
					}
				}
				if(divid == 1){
					if(totalDZF == pageSize){
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',0);
						pageIndexDZF ++;
						//初始化订单列表页面--待支付模块
						slowOrderList.initSlowOrderListDZF(pageIndexDZF, pageSize);
					}else{
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',1);
						return false;
					}
				}else if(divid == 2){
					if(totalDJZ == pageSize){
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',0);
						pageIndexDJZ++;
						//初始化订单列表页面--待就诊模块
						slowOrderList.initSlowOrderListDJZ(pageIndexDJZ, pageSize);
					}else{
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',1);
						return false;
					}
				}else if(divid == 3){
					if(totalDPJ == pageSize){
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',0);
						pageIndexDPJ++;
						//初始化订单列表页面--待评价模块
						slowOrderList.initSlowOrderListDPJ(pageIndexDPJ, pageSize);
					}else{
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',1);
						return false;
					}
				}else if(divid == 4){
					if(totalYWC == pageSize){
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',0);
						pageIndexYWC++;
						//初始化订单列表页面--已完成模块
						slowOrderList.initSlowOrderListYWC(pageIndexYWC, pageSize);
					}else{
						slowOrderList.setTs('slowOrderListContent','slowOrderListTips',1);
						return false;
					}
				}
			});
		},
		initSlowOrderListDZF: function(pageIndexDZF, pageSize) {
			var requestSlowOrderListDZF = "orderStaus=1&pageIndex=" + pageIndexDZF + "&pageSize=" + pageSize;
			jyapp.getApi({
				method: 'Treat/OrderList',
				data: requestSlowOrderListDZF,
				timeout: 10000,
				showWaiting : true,
				onsuccess: function(response) {
					var dataValues = response.data;
					if (dataValues != null && dataValues.list != null && dataValues.list.length > 0) {
						slowOrderList.isDivDataFlag('order_none_dzf', 1);
						totalDZF = dataValues.list.length;
						for (var i = 0; i < dataValues.list.length; i++) {
							var dataValue = dataValues.list[i];
							var strTime = dataValue.VisitDate;
							var endLen = strTime.length - 2;
							var time = strTime.substring(6, endLen);
							var visit = commomUtil.formatStringToDate(time, 2);
							var VisitDate = (visit.substring(5, visit.length - 3));
							var week = commomUtil.formatDateToWeek(time);
							htmlDZF += '<li class="mui-table-view-cell mui-media">';
							htmlDZF += '	<a href="javascript:;">';
							htmlDZF += '	<input type="hidden" value="' + dataValue.ID + '" />'
							htmlDZF += '		<img class="mui-media-object mui-pull-left" src="' + dataValue.Pic + '" onerror="this.src=\'../../img/default/yisheng_touxiang.png\';this.onerror=null" >';
							htmlDZF += '		<div class="mui-media-body">';
							htmlDZF += '			<h2><span>' + dataValue.Name + '</span><span>' + VisitDate + ' (' + week + ')' + '</span></h2>';
							htmlDZF += '			<p class="mui-ellipsis">' + dataValue.VisitPlace + '</p>';
							htmlDZF += '		</div>';
							htmlDZF += '		<small>实付金额：<strong>¥' + dataValue.TotalFee + '</strong><span class="pay">支付</span></small>';
							htmlDZF += '	</a>';
							htmlDZF += '</li>';
						}
						document.getElementById("slow-non-payment").innerHTML = htmlDZF;
					} else {
						totalDZF = 0;
						if(htmlDZF == ""){
							document.getElementById("slow-non-payment").innerHTML = htmlDZF;
							slowOrderList.isDivDataFlag('order_none_dzf', 0);
						}
					}
				},
				onerror: function(e) {
					totalDZF = 0;
					if(htmlDZF == ""){
						document.getElementById("slow-non-payment").innerHTML = htmlDZF;
						slowOrderList.isDivDataFlag('order_none_dzf', 0);
					}
					console.log("initSlowOrderListDZF:" + e);
				}
			});
		},
		initSlowOrderListDJZ: function(pageIndexDJZ, pageSize) {
			var requestSlowOrderListDJZ = "orderStaus=2&pageIndex=" + pageIndexDJZ + "&pageSize=" + pageSize;
			jyapp.getApi({
				method: 'Treat/OrderList',
				data: requestSlowOrderListDJZ,
				timeout: 10000,
				onsuccess: function(response) {
					var dataValues = response.data;
					if (dataValues != null && dataValues.list != null && dataValues.list.length > 0) {
						slowOrderList.isDivDataFlag('order_none_djz', 1);
						totalDJZ = dataValues.list.length;
						for (var i = 0; i < dataValues.list.length; i++) {
							var dataValue = dataValues.list[i];
							var strTime = dataValue.VisitDate;
							var endLen = strTime.length - 2;
							var time = strTime.substring(6, endLen);
							var visit = commomUtil.formatStringToDate(time, 2);
							var VisitDate = (visit.substring(5, visit.length - 3));
							var week = commomUtil.formatDateToWeek(time);
							htmlDJZ += '<li class="mui-table-view-cell mui-media">';
							htmlDJZ += '	<a href="javascript:;">';
							htmlDJZ += '	<input type="hidden" value="' + dataValue.ID + '" />'
							htmlDJZ += '		<img class="mui-media-object mui-pull-left" src="' + dataValue.Pic + '" onerror="this.src=\'../../img/default/yisheng_touxiang.png\';this.onerror=null" >';
							htmlDJZ += '		<div class="mui-media-body">';
							htmlDJZ += '			<h2><span>' + dataValue.Name + '</span><span>' + VisitDate + ' (' + week + ')' + '</span></h2>';
							htmlDJZ += '			<p class="mui-ellipsis">' + dataValue.VisitPlace + '</p>';
							htmlDJZ += '		</div>';
							htmlDJZ += '		<small>实付金额：<strong>¥' + dataValue.TotalFee + '</strong><em>待就诊</em></small>';
							htmlDJZ += '	</a>';
							htmlDJZ += '</li>';
						}
						document.getElementById("slow-orderSee").innerHTML = htmlDJZ;
					} else {
						totalDJZ = 0;
						if(htmlDJZ == ""){
							document.getElementById("slow-orderSee").innerHTML = htmlDJZ;
							slowOrderList.isDivDataFlag('order_none_djz', 0);
						}
					}
				},
				onerror: function(e) {
					totalDJZ = 0;
					if(htmlDJZ == ""){
						document.getElementById("slow-orderSee").innerHTML = htmlDJZ;
						slowOrderList.isDivDataFlag('order_none_djz', 0);
					}
					console.log("initSlowOrderListDJZ:" + e);
				}
			});
		},
		initSlowOrderListDPJ: function(pageIndexDPJ, pageSize) {
			var requestSlowOrderListDPJ = "orderStaus=3&pageIndex=" + pageIndexDPJ + "&pageSize=" + pageSize;
			jyapp.getApi({
				method: 'Treat/OrderList',
				data: requestSlowOrderListDPJ,
				timeout: 10000,
				onsuccess: function(response) {
					var dataValues = response.data;
					if (dataValues != null && dataValues.list != null && dataValues.list.length > 0) {
						totalDPJ = dataValues.list.length;
						for (var i = 0; i < dataValues.list.length; i++) {
							slowOrderList.isDivDataFlag('order_none_dpj', 1);
							var dataValue = dataValues.list[i];
							var strTime = dataValue.VisitDate;
							var endLen = strTime.length - 2;
							var time = strTime.substring(6, endLen);
							var visit = commomUtil.formatStringToDate(time, 2);
							var VisitDate = (visit.substring(5, visit.length - 3));
							var week = commomUtil.formatDateToWeek(time);
							htmlDPJ += '<li class="mui-table-view-cell mui-media">';
							htmlDPJ += '	<a href="javascript:;">';
							htmlDPJ += '	<input type="hidden" value="' + dataValue.ID + '" />'
							htmlDPJ += '		<img class="mui-media-object mui-pull-left" src="' + dataValue.Pic + '" onerror="this.src=\'../../img/default/yisheng_touxiang.png\';this.onerror=null" >';
							htmlDPJ += '		<div class="mui-media-body">';
							htmlDPJ += '			<h2><span>' + dataValue.Name + '</span><span>' + VisitDate + ' (' + week + ')' + '</span></h2>';
							htmlDPJ += '			<p class="mui-ellipsis">' + dataValue.VisitPlace + '</p>';
							htmlDPJ += '		</div>';
							htmlDPJ += '		<small>实付金额：<strong>¥' + dataValue.TotalFee + '</strong><span class="pay">评价</span></small>';
							htmlDPJ += '	</a>';
							htmlDPJ += '</li>';
						}
						document.getElementById("slow-orderEvaluation").innerHTML = htmlDPJ;
					} else {
						totalDPJ = 0;
						if(htmlDPJ == ""){
							document.getElementById("slow-orderEvaluation").innerHTML = htmlDPJ;
							slowOrderList.isDivDataFlag('order_none_dpj', 0);
						}
					}
				},
				onerror: function(e) {
					totalDPJ = 0;
					if(htmlDPJ == ""){
						document.getElementById("slow-orderEvaluation").innerHTML = htmlDPJ;
						slowOrderList.isDivDataFlag('order_none_dpj', 0);
					}
					console.log("initSlowOrderListDPJ:" + e);
				}
			});
		},
		initSlowOrderListYWC: function(pageIndexYWC, pageSize) {
			var requestSlowOrderListYWC = "orderStaus=4&pageIndex=" + pageIndexYWC + "&pageSize=" + pageSize;
			jyapp.getApi({
				method: 'Treat/OrderList',
				data: requestSlowOrderListYWC,
				timeout: 10000,
				onsuccess: function(response) {
//					console.log(" initSlowOrderListYWC "+JSON.stringify(response));
					var dataValues = response.data;
					if (dataValues != null && dataValues.list != null && dataValues.list.length > 0) {
						totalYWC = dataValues.list.length;
						for (var i = 0; i < dataValues.list.length; i++) {
							slowOrderList.isDivDataFlag('order_none_ywc', 1);
							var dataValue = dataValues.list[i];
							var strTime = dataValue.VisitDate;
							var endLen = strTime.length - 2;
							var time = strTime.substring(6, endLen);
							var visit = commomUtil.formatStringToDate(time, 2);
							var VisitDate = (visit.substring(5, visit.length - 3));
							var week = commomUtil.formatDateToWeek(time);
							htmlYWC += '<li class="mui-table-view-cell mui-media">';
							htmlYWC += '	<a href="javascript:;">';
							htmlYWC += '	<input type="hidden" value="' + dataValue.ID + '" />'
							htmlYWC += '		<img class="mui-media-object mui-pull-left" src="' + dataValue.Pic + '" onerror="this.src=\'../../img/default/yisheng_touxiang.png\';this.onerror=null" >';
							htmlYWC += '		<div class="mui-media-body">';
							htmlYWC += '			<h2><span>' + dataValue.Name + '</span><span>' + VisitDate + ' (' + week + ')' + '</span></h2>';
							htmlYWC += '			<p class="mui-ellipsis">' + dataValue.VisitPlace + '</p>';
							htmlYWC += '		</div>';
							htmlYWC += '		<small>实付金额：<strong>¥' + dataValue.TotalFee + '</strong><span class="pay-end"><img src="../../img/familyDoctor/bg_wancheng.png"></span></small>';
							htmlYWC += '	</a>';
							htmlYWC += '</li>';
						}
						document.getElementById("slow-orderFinish").innerHTML = htmlYWC;
					} else {
						totalYWC = 0;
						if(htmlYWC == ""){
							document.getElementById("slow-orderFinish").innerHTML = htmlYWC;
							slowOrderList.isDivDataFlag('order_none_ywc', 0);
						}
					}
				},
				onerror: function(e) {
					totalYWC = 0;
					if(htmlYWC == ""){
						document.getElementById("slow-orderFinish").innerHTML = htmlYWC;
						slowOrderList.isDivDataFlag('order_none_ywc', 0);
					}
					console.log("initSlowOrderListYWC:" + e);
				}
			});
		},
		isDivDataFlag : function(id, type) {
			if (type == 1) {
				document.getElementById(id).style.display = "none";
			} else {
				document.getElementById(id).style.display = "";
			}
		},
		pulldownRefresh: function() {
			/**
			 * 下拉刷新具体业务实现
			 */
			setTimeout(function() {
				//初始化订单列表页面--待支付模块
				slowOrderList.initPageHtml(index);
				mui('#pullrefreshSlowOrderList').pullRefresh().endPulldownToRefresh(); //refresh completed
			}, 1500);
		},
		rebackSlowExperts: function() {
			var config = {};
			if(backid && backid != 'undefined' && backid != "" && backUrl && backUrl != "0" && typeof(backUrl) != 'undefined'){
				config = {
					id : backid,
					url : backUrl,
					method : "newidsMyOrder"
				}
			}else{
				config = {
					id : "SlowExperts",
					url : "SlowExperts.html"
				}
			}
			jyapp.backWebView(config);
		}
	};

window.addEventListener("newIdsSlowOrderList",function(event){
	pageIndexDZF = 1;
	pageIndexDJZ = 1;
	pageIndexDPJ = 1;
	pageIndexYWC = 1;
	pageSize = 10;
	htmlDZF = '';
	htmlDJZ = '';
	htmlDPJ = '';
	htmlYWC = '';
	totalDZF = 0;
	totalDJZ = 0;
	totalDPJ = 0;
	totalYWC = 0;
	index = event.detail.index;
	backid = event.detail.backid ? event.detail.backid : "0";
	backUrl = event.detail.backurl ? event.detail.backurl : "0";
	//调用初始化数据方法
	slowOrderList.initPageHtml(index);
});
	//绑定回退
document.getElementById('showOrderListReBackID').addEventListener('click', slowOrderList.rebackSlowExperts);
//绑定手机虚拟回退键
//mui.back = function(w){
//	slowOrderList.rebackSlowExperts();
//}