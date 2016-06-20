var pageIndex = 1;
var pageSize = 10;
var total = 0;
var storeName = "";
var areaNo = 1;
var areaType = 1;
//默认级别是1、省级（定位拿到），2、市级（切换城市拿到），3、区县（选择区域拿到）
var areaLevel = 1;
var distance = "";
var filter = "";
var storeType = "-1";
var sortType = "znpx";
var healthNetworkUlHtml = '';
//判断是否为体检、疗养、药店、、、等特殊入参
var storeTypeDisable = false;
//判断是否能切换城市，现阶段均能切换
var cityDisable = false;
//判断时候切换过城市
var islevel = false;
//经度
var lng = 0;
//纬度
var lat = 0;
var areaNoSeach = "";
var backid = "";
var backurl = "";
var positionCity = "上海市";
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var storeType = self.mainMedication;
	backid = self.backid ? self.backid : "0";
	backurl = self.backurl ? self.backurl : "0";
	if (!storeType || typeof(storeType) == "undefined" || storeType == "") {
		storeType = -1;
	}else{
		storeTypeDisable = true;
	}
	document.getElementById("healthNetworkTypeValueID").value = storeType;
	//获取定位
	healthNetwork.locationPosition(storeType);
	//初始化页面下拉选择显示
	healthNetwork.loadScreenSelect(storeType);
	//加载下拉刷新事件
	var ws=plus.webview.currentWebview();
	ws.setPullToRefresh({
		support:true,
		height:"50px",
		range:"200px",
		contentdown:{
			caption:"下拉可以刷新"
		},
		contentover:{
			caption:"释放立即刷新"
		},
		contentrefresh:{
			caption:"正在刷新..."
		}
	},healthNetwork.onRefresh);
	//加载上拉刷新事件
	document.addEventListener("plusscrollbottom", function() {
		if(total == pageSize){
//			healthNetwork.setTs('healthExaminationOrderContent','healthExaminationOrderTips',0);
			pageIndex++;
			healthNetwork.queryNetWork(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, pageIndex, pageSize, lng, lat);
		}else{
//			healthNetwork.setTs('healthExaminationOrderContent','healthExaminationOrderTips',1);
			return false;
		}
	});
});

var healthNetwork = {
	setTs : function(parentId,spanId,type){
		document.getElementById(parentId).setAttribute("class","mui-content nomore");
		if(type == 1){
			document.getElementById(spanId).innerHTML = "没有更多数据了";
		}
		setTimeout(function(){
			document.getElementById(parentId).setAttribute("class","mui-content");
		},1500);
	},
	onRefresh : function(){
		setTimeout(function(){
			var ws=plus.webview.currentWebview();
			healthNetwork.locationPosition(storeType);
			ws.endPullToRefresh();
		},2000);
	},
	queryNetWork: function(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, pageIndex, pageSize, lng, lat) {
		var requestNetWorkData = "storeName=" + storeName + "&lat=" + lat + "&lng=" + lng + "&areaNo=" + areaNo + "&sortType=" + sortType + "&filter=" + filter + "&areaType=" + areaType +
			"&areaLevel=" + areaLevel + "&storeType=" + storeType + "&distance=" + distance + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
//		console.log("requestNetWorkData---->:" + requestNetWorkData);
		jyapp.getApi({
			method: 'store/storelist',
			data: requestNetWorkData,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("response---->:" + JSON.stringify(response));
				if(response.code != 1){
					healthNetworkUlHtml = '';
					document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
					document.getElementById('healthNetworkZanwuID').style.display = 'block';
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data != null && response.data.list != null && response.data.list.length > 0){
						document.getElementById('healthNetworkZanwuID').style.display = 'none';
						total = response.data.list.length;
						for (var i = 0; i < response.data.list.length; i++) {
							var store = response.data.list[i];
							var score = "";
							if (store.Score == 1) {
								score = "★";
							} else if (store.Score == 2) {
								score = "★★";
							} else if (store.Score == 3) {
								score = "★★★";
							} else if (store.Score == 4) {
								score = "★★★★";
							} else {
								score = "★★★★★";
							}
							healthNetworkUlHtml += '<li>';
							healthNetworkUlHtml += '   <input type="hidden" value="' + store.ID + '" />';
							healthNetworkUlHtml += '	<div class="li-l">';
							if (!store.Src) {
								store.Src = "";
							}
							healthNetworkUlHtml += '		<img src="' + store.Src + '" id="hndImg" onerror="this.src=\'../../img/default/pic_moren.png\';this.onerror=null"/>';
							healthNetworkUlHtml += '	</div>';
							healthNetworkUlHtml += '	<div class="li-r">';
							healthNetworkUlHtml += '		<h2>' + store.ShortName + '<!--<span>团</span>--></h2>';
							healthNetworkUlHtml += '		<h3>	<span class="sp1 xingxing">' + score + '</span><!--￥<span>712</span>/人--></h3>';
							healthNetworkUlHtml += '		<p>';
							healthNetworkUlHtml += '			<!--<span>人命广场</span>--><span class="sp1">' + store.StoreType + '</span><span class="sp2">' + store.Distance + 'km</span></p>';
							healthNetworkUlHtml += '	</div>';
							healthNetworkUlHtml += '</li>';
						}
					}else{
						document.getElementById('healthNetworkZanwuID').style.display = 'block';
					}
				}
				document.getElementById('healthNetworkStoreNameValueID').blur();
				document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
				healthNetwork.loadEventHealth();
			},
			onerror: function(e) {
				healthNetworkUlHtml = '';
				document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
				document.getElementById('healthNetworkZanwuID').style.display = 'block';
				console.log("queryNetWorkError:" + e);
			}
		});
	},
	queruHealthNetworkDetail: function(storeID) {
		mui.openWindow({
			id: 'healthNetworkDetail',
			url: "healthNetworkDetail.html",
			extras: {
				"storeID": storeID,
				"lng": lng,
				"lat": lat
			}
		})
	},
	searchByScreen: function() {
		healthNetworkUlHtml = '';
		document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
		storeName = document.getElementById("healthNetworkStoreNameValueID").value;
		if (!storeName || typeof(storeName) == "undefined") {
			storeName = "";
		}else{
			areaType = 2;
			if(document.getElementById("healthNetworkAreaValueID").value == "1"){
				areaNo = areaNoSeach;
			}else{
				areaNo = document.getElementById("healthNetworkAreaValueID").value;
			}
		}
		/*距离,单位km,默认3*/
		distance = document.getElementById("healthNetworkRangeValueID").value;
		if (!distance || typeof(distance) == "undefined" || distance == "") {
			distance = "";
		} 
		/*筛选标志,默认空, 可选值--coupon,discount*/
		filter = document.getElementById("healthNetworkScreenValueID").value;
		if (!filter || typeof(filter) == "undefined" || filter == "") {
			filter = "";
		}
		/*网点类型,默认-1, 若值为60是网上药店,43是体检机构*/
		storeType = document.getElementById("healthNetworkTypeValueID").value;
		if (!storeType || typeof(storeType) == "undefined" || storeType == "") {
			storeType = "-1";
		}
		if (storeType == "43" || storeType == "41") {
			if(document.getElementById("healthNetworkAreaValueID").value == "1"){
				areaNo = areaNoSeach;
			}else{
				areaNo = document.getElementById("healthNetworkAreaValueID").value;
			}
		}
		/*网点类型,默认空, 可选值--rqzg,pjzh,znpx,lwzj*/
		sortType = document.getElementById("healthNetworkSortValueID").value;
		if (!sortType || typeof(sortType) == "undefined" || sortType == "") {
			sortType = "znpx";
		}
		healthNetwork.queryNetWork(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, 1, 10, lng, lat);
	},
	loadEventHealth: function() {
		mui('#healthNetworkUlId').on('tap', 'li', function() {
			var storeID = this.querySelectorAll('input')[0].value;
			healthNetwork.queruHealthNetworkDetail(storeID);
		});
	},
	locationPosition: function(storeType) {
		var PositionOptions = {};
		var isIOS = true;
		if(mui.os.ios){
			PositionOptions = {
				enableHighAccuracy : true,
				provider : 'system',
				coordsType :'wgs84'
			};
		}else{
			PositionOptions = {
				enableHighAccuracy : true,
				provider : 'baidu',
				coordsType :'bd09ll'
			};
			isIOS = false;
		}
		if (plus.geolocation) {
			plus.geolocation.getCurrentPosition(function(p) {
				var province = city.province;
				for (var i = 0; i < province.length; i++) {
					if (province[i].Name == p.address.city) {
//						console.log("province[i].Name:"+province[i].Name+"--p.address.city"+p.address.city+"--"+province[i].ID);
						areaNoSeach = province[i].ID;
//						document.getElementById("healthNetworkAreaValueID").value = province[i].ID;
					}
				}
				positionCity = p.address.city;
				document.getElementById("jkzx-city").innerHTML = p.address.city + '<span class="mui-icon mui-icon-arrowdown"></span>';
				healthNetwork.addCityF(p.address.city);
				if(isIOS){
					//经度
					lng = p.coords.longitude; 
					//纬度
					lat = p.coords.latitude;
				}else{
					var wgs = {};
					wgs = GPS.bd_decrypt(p.coords.latitude,p.coords.longitude);
					wgs = GPS.gcj_decrypt_exact(wgs.lat,wgs.lon);
					//经度
					lng = wgs.lon; 
					//纬度
					lat = wgs.lat;
				}
				if (storeType != -1) {
					//调用定位筛选
					healthNetwork.searchByScreen();
				} else {
					healthNetwork.queryNetWork("", 1, "znpx", "", 1, 1, storeType, 3, 1, 10, lng, lat);
				}
			}, function(error) {
				//位置服务异常，默认查询上海 
				document.getElementById("healthNetworkAreaValueID").value = 858;
				document.getElementById("jkzx-city").innerHTML = '上海市<span class="mui-icon mui-icon-arrowdown"></span>';
				healthNetwork.addCityF("上海市");
				areaNo=858;
				areaNoSeach = 858;
				areaType=2;
				areaLevel=1;
				distance="";
				lng=0;
				lat=0;
				healthNetwork.queryNetWork(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, pageIndex, pageSize, lng, lat);
				switch (error.code) {
					case error.PERMISSION_DENIED:
						plus.nativeUI.alert("位置服务被拒绝", "", "健医宝", "确认");
						break;
					case error.POSITION_UNAVAILABLE:
						plus.nativeUI.alert("暂时获取不到位置信息", "", "健医宝", "确认");
						break;
					case error.TIMEOUT:
						plus.nativeUI.alert("获取信息超时", "", "健医宝", "确认");
						break;
					case error.UNKNOWN_ERROR:
						plus.nativeUI.alert("未知错误", "", "健医宝", "确认");
						break;
				}
			}, PositionOptions);
		} else {
			//位置服务异常，默认查询上海 
			document.getElementById("healthNetworkAreaValueID").value = 858;
			document.getElementById("jkzx-city").innerHTML = '上海市<span class="mui-icon mui-icon-arrowdown"></span>';
			healthNetwork.addCityF("上海市");
			areaNo=858;
			areaType=2;
			areaLevel=1;
			distance="";
			lng=0;
			lat=0;
			healthNetwork.queryNetWork(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, pageIndex, pageSize, lng, lat);
			plus.nativeUI.alert("浏览器不兼容", "", "健医宝", "确认");
		}
	},
	loadScreenSelect : function(storeType){
		var search_ck = document.getElementById('search-ck-TypeID');
		var oimg = '	<img src="../../img/common/btn_down.png" alt="" width="15px"/>';
		var storeName = '全部类型';
		if(storeType == 41){
			storeName = '药房';
		}else if(storeType == 43){
			storeName = '体检机构';
		}
		search_ck.innerHTML = storeName + oimg;
	},
	rebackBeforePage: function() {
		var webviewId = "";
		var webviewurl = "";
		if(backid && backid != 'undefined' && backid != "" && backurl && backurl != "0" && typeof(backurl) != 'undefined'){
			webviewId = backid;
			webviewurl = backurl;
		}else{
			webviewId = "mainIndex";
			webviewurl = "mainIndex.html";
		}
		jyapp.backWebView({id:webviewId,url:webviewurl});
	}
}

//搜索条件
var search_type;
var search_text;
var osearch = document.getElementById("householdDevices").querySelector('.search-ul');
var search_qbsq = document.getElementById("search-qbsq");
var search_qt = document.getElementById("search-qt");
mui('.jkwd-nav').on('tap', 'a', function() {
	search_type = this;
	var jsonOhtm1 = [{id: "3",name: "智能排序"}, {id: "0.5",name: "500米"}, {id: "1",name: "1000米"}, {id: "2",name: "2000米"}];
	var jsonOhtm2 = [{id: "-1",name: "全部类型"}, {id: "41",name: "药房"}, {id: "42",
		name: "医院"}, {id: "43",name: "体检机构"}, {id: "44",name: "齿科"}, {id: "45",
		name: "眼科"}, {id: "46",name: "妇幼保健"}, {id: "47",name: "综合"}, {id: "60",
		name: "网上药店"}, {id: "61",name: "中医"}, {id: "62",name: "骨科"}, {id: "0",
		name: "专科医院"}, {id: "0",name: "综合医院"}, {id: "0",name: "社区医院"}, {id: "0",
		name: "诊所"}, {id: "0",name: "疗养院"}];
	var jsonOhtm3 = [{id: "znpx",name: "智能排序"}, {id: "lwzj",name: "离我最近"}, {id: "rqzg",name: "人气最高"}, {id: "pjzh",name: "评价最好"}];
	var jsonOhtm4 = [{id: "0",name: "全部类型"}, {id: "discount",name: "优惠商户"}, {id: "coupon",name: "卡券商户"}];
	if (this.className == 'search-qbsq') {
		search_qbsq.style.display = 'block';
		search_qt.style.display = 'none';
//		document.getElementById("healthNetworkRangeID").style.display = 'block';
		document.getElementById("healthNetworkScreenID").style.display = 'none';
		document.getElementById("healthNetworkTypeID").style.display = 'none';
		document.getElementById("healthNetworkSortID").style.display = 'none';
		
//		var ohtm1 = '';
//		for (var i = 0; i < jsonOhtm1.length; i++) {
//			var jsonValue1 = jsonOhtm1[i];
//			ohtm1 += '<li item=' + jsonValue1.id + ',1>' + jsonValue1.name + '</li>';
//		}
//		document.getElementById("healthNetworkRangeID").innerHTML = ohtm1;
	}
	var searchckDisable = false;
	if (this.className == 'search-ck') {
		if(!storeTypeDisable){
			search_qbsq.style.display = 'none';
			search_qt.style.display = 'block';
			document.getElementById("healthNetworkTypeID").style.display = 'block';
//			document.getElementById("healthNetworkRangeID").style.display = 'none';
			document.getElementById("healthNetworkScreenID").style.display = 'none';
			document.getElementById("healthNetworkSortID").style.display = 'none';
			var ohtm2 = '';
			for (var i = 0; i < jsonOhtm2.length; i++) {
				var jsonValue2 = jsonOhtm2[i];
				ohtm2 += '<li item=' + jsonValue2.id + ',2>' + jsonValue2.name + '</li>';
			}
			document.getElementById("healthNetworkTypeID").innerHTML = ohtm2;
		}else{
			searchckDisable = true;
		}
	}
	if (this.className == 'search-znpx') {
		search_qbsq.style.display = 'none';
		search_qt.style.display = 'block';
		document.getElementById("healthNetworkSortID").style.display = 'block';
//		document.getElementById("healthNetworkRangeID").style.display = 'none';
		document.getElementById("healthNetworkTypeID").style.display = 'none';
		document.getElementById("healthNetworkScreenID").style.display = 'none';
		var ohtm3 = '';
		for (var i = 0; i < jsonOhtm3.length; i++) {
			var jsonValue3 = jsonOhtm3[i];
			ohtm3 += '<li item=' + jsonValue3.id + ',3>' + jsonValue3.name + '</li>';
		}
		document.getElementById("healthNetworkSortID").innerHTML = ohtm3;
	}
	if (this.className == 'search-sx') {
		search_qbsq.style.display = 'none';
		search_qt.style.display = 'block';
		document.getElementById("healthNetworkScreenID").style.display = 'block';
//		document.getElementById("healthNetworkRangeID").style.display = 'none';
		document.getElementById("healthNetworkTypeID").style.display = 'none';
		document.getElementById("healthNetworkSortID").style.display = 'none';
		var ohtm4 = '';
		for (var i = 0; i < jsonOhtm4.length; i++) {
			var jsonValue4 = jsonOhtm4[i];
			ohtm4 += '<li item=' + jsonValue4.id + ',4>' + jsonValue4.name + '</li>';
		}
		document.getElementById("healthNetworkScreenID").innerHTML = ohtm4;
	}
	if(!searchckDisable){
		mui('#householdDevices').popover('show');
	}

	mui('.mui-scroll-wrapper3').scroll({
		startY: 0,
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
})

mui('#householdDevices').on('tap', 'li', function() {
	var oimg = '	<img src="../../img/common/btn_down.png" alt="" width="15px"/>';
	search_type.innerHTML = this.innerText + oimg;
	mui('#householdDevices').popover('hide');
})
document.addEventListener('keyup', function(event) {
	//键盘回车事件
	if (event.keyCode == 13) {
		healthNetwork.searchByScreen();
	}
});
mui('.search').on('tap', 'li', function(e) {
	var searchValues = e.target.attributes;
	var dataValue = "";
	var type = 0;
	areaType = 1;
	for (var i in searchValues) {
		if (searchValues[i].name == "item") {
			var searchValue = searchValues[i].value;
			if (searchValue && typeof(searchValue) != "undefined" && searchValue != "") {
				dataValue = searchValue.substr(0, searchValue.indexOf(",", 1));
				type = searchValue.substr(searchValue.indexOf(",", 1) + 1, 1);
				/*if (type == 1) {
					document.getElementById("healthNetworkAreaValueID").value = 1;
					document.getElementById("healthNetworkRangeValueID").value = "";
					document.getElementById("healthNetworkRangeValueID").value = dataValue;
				} else */if (type == 2) {
					document.getElementById("healthNetworkTypeValueID").value = "";
					if (dataValue == "0") {
						dataValue = "";
					}
					document.getElementById("healthNetworkTypeValueID").value = dataValue;
					if(document.getElementById("healthNetworkAreaValueID").value != 1){
						areaType = 2;
						if(islevel){
							areaLevel = 2;
						}else{
							areaLevel = 3;
						}
					}
				} else if (type == 3) {
					document.getElementById("healthNetworkSortValueID").value = "";
					document.getElementById("healthNetworkSortValueID").value = dataValue;
					if(document.getElementById("healthNetworkAreaValueID").value != 1){
						areaType = 2;
						if(islevel){
							areaLevel = 2;
						}else{
							areaLevel = 3;
						}
					}
				} else if (type == 4) {
					document.getElementById("healthNetworkScreenValueID").value = "";
					if (dataValue == "0") {
						dataValue = "";
					}
					document.getElementById("healthNetworkScreenValueID").value = dataValue;
					if(document.getElementById("healthNetworkAreaValueID").value != 1){
						areaType = 2;
						if(islevel){
							areaLevel = 2;
						}else{
							areaLevel = 3;
						}
					}
				} else if (type == 5) {
					/*替换区域选择全部/附近*/
					var _areali = osearch.getElementsByTagName('li');
					for(var s = 0; s < _areali.length; s++){
						if (_areali[s].innerText.indexOf('附近') != -1) {
							_areali[s].setAttribute('class', 'mui-table-view-cell');
							_areali[s].setAttribute('district-id', 0);
							_areali[s].setAttribute('item', "0,5");
							_areali[s].innerText = "全部";
						}else if(_areali[s].innerText.indexOf('全部') != -1){
							_areali[s].setAttribute('class', 'mui-table-view-cell');
							_areali[s].setAttribute('district-id', 3);
							_areali[s].setAttribute('item', "3,5");
							_areali[s].innerText = "附近";
						}
					}
					/*替换区域选择全部/附近*/
					if(dataValue == "0"){
						areaNo = areaNoSeach;
						areaType = 2;
						if(islevel){
							areaLevel = 2;
						}else{
							areaLevel = 1;
						}
					}else if(dataValue == "3"){
						areaType = 1;
						if(islevel){
							areaLevel = 2;
						}else{
							areaLevel = 1;
						}
						distance = 3;
					}else{
						areaType = 2;
						areaLevel = 3;
						areaNo = dataValue;
					}
					document.getElementById("healthNetworkAreaValueID").value = 1;
					document.getElementById("healthNetworkAreaValueID").value = areaNo;
					document.getElementById("healthNetworkRangeValueID").value = distance;
				}
			}
		}
	}
	healthNetwork.searchByScreen();
});

//绑定切换城市
document.getElementById('jkzx-city').addEventListener('click',function() {
	if(!cityDisable){
		var html = positionCity;
		mui.openWindow({
			url: 'selectMap.html',
			id: 'selectMap',
			extras: {
				html: html
			},
			show: {
				aniShow: 'slide-in-bottom'
			}
		});
	}
});

//绑定回退
document.getElementById('rebackBeforePageAID').addEventListener('click',healthNetwork.rebackBeforePage);