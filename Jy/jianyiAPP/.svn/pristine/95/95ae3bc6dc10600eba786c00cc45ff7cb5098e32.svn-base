var pageIndex = 1;
var pageSize = 10;
var total = 0;
var storeName = "";
var areaNo = 1;
var areaType = 1;
//默认级别是1、省级（定位拿到），2、市级（切换城市拿到），3、区县（选择区域拿到）
var areaLevel = 2;
var distance = "";
var filter = "";
var storeType = "-1";
var sortType = "znpx";
var healthNetworkUlHtml = '';
//判断是否为体检、疗养、药店、、、等特殊入参
var storeTypeDisable = false;
//判断是否能切换城市，现阶段均能切换
var cityDisable = false;
//是否切换城市
var isSwitchCity = false;
//经度
var lng = 0.0;
//纬度
var lat = 0.0;
var areaNoSeach = "";
var backid = "";
var backurl = "";
var positionCity = "上海市";
var positionCityID = 858;
var firstliText = "附近";
var isTopPull  = false;
document.addEventListener('plusready', function() {
	positionCity = plus.storage.getItem("positionCity");
	positionCityID = parseInt(plus.storage.getItem("positionCityID"));
	areaNo = positionCityID;
	lng = parseFloat(plus.storage.getItem("positionLng")); 
	lat = parseFloat(plus.storage.getItem("positionLat")); 
	var self = plus.webview.currentWebview();
	storeType = self.mainMedication;
	backid = self.backid ? self.backid : "0"; 
	backurl = self.backurl ? self.backurl : "0";
	if (!storeType || typeof(storeType) == "undefined" || storeType == "") {
		storeType = -1;
	}else{
		storeTypeDisable = true;
	}
	document.getElementById("healthNetworkTypeValueID").value = storeType;
	//获取定位
	healthNetworkMain.initHealthNetworkMain(storeType);
	//初始化页面下拉选择显示
	healthNetworkMain.loadScreenSelect(storeType);
	//初始化上拉刷新事件
	healthNetworkMain.initPlusscrollbottom();
});
//手动切换城市自定义事件
window.addEventListener('switchCity', function(event) {
	positionCity = plus.storage.getItem("positionCity");
	if(positionCity.length>6){
		positionCity = positionCity.slice(0,6)+'...';
	}
	positionCityID = parseInt(plus.storage.getItem("positionCityID"));
	areaNo = positionCityID;
	lng = parseFloat(plus.storage.getItem("positionLng")); 
	lat = parseFloat(plus.storage.getItem("positionLat")); 
	//获得事件参数
	var positionHtml = event.detail.positionHtml;
	document.getElementById("jkzx-city").innerHTML = positionCity + '<span class="mui-icon mui-icon-arrowdown"></span>';
	if(positionHtml == positionCity){
		firstliText = "附近";
		isSwitchCity = false;
		areaType=1;
		mui('.search-area')[0].innerHTML = '<input type="hidden" value="area" />附近<img src="../../img/common/btn_down.png"/>';
	}else{
		firstliText = "全部";
		isSwitchCity = true;
		areaType=2;
		mui('.search-area')[0].innerHTML = '<input type="hidden" value="area" />全部<img src="../../img/common/btn_down.png"/>';
	}
	healthNetworkMain.addCity(positionCityID);
	//清空页面缓存
	healthNetworkUlHtml = '';
	document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
	//刷新查询数据
	areaNo = positionCityID;
	areaNoSeach = positionCityID;
	areaLevel=2;
	distance=3;
	healthNetworkMain.queryNetWork(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, pageIndex, pageSize, lng, lat);
	//初始化上拉刷新事件
	healthNetworkMain.initPlusscrollbottom();
});

var healthNetworkMain = {
	setTs : function(parentId,spanId,type){
		document.getElementById(parentId).setAttribute("class","mui-content nomore");
		if(type == 1){
			document.getElementById(spanId).innerHTML = "没有更多数据了";
		}
		setTimeout(function(){
			document.getElementById(parentId).setAttribute("class","mui-content");
		},1500);
	},
	initPlusscrollbottom : function(){
		//加载上拉刷新事件
		document.addEventListener("plusscrollbottom", function() {
			if(total == pageSize){
				isTopPull = true;
				healthNetworkMain.setTs('PullToRefreshID','healthNetworkMainListTips',0);
				pageIndex++;
				healthNetworkMain.queryNetWork(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, pageIndex, pageSize, lng, lat);
			}else{
				healthNetworkMain.setTs('PullToRefreshID','healthNetworkMainListTips',1);
				return false;
			}
		});
	},
	initHealthNetworkMain : function(){
		areaNoSeach = positionCityID;
		document.getElementById("jkzx-city").innerHTML = positionCity + '<span class="mui-icon mui-icon-arrowdown"></span>';
		healthNetworkMain.addCityF(positionCity);
		if (storeType != -1) {
			//调用定位筛选
			healthNetworkMain.searchByScreen();
		} else {
			healthNetworkMain.queryNetWork("", 1, "znpx", "", 1, 1, storeType, 3, 1, 10, lng, lat);
		}
	},
	addCity : function(pid) {
		var _ul = document.getElementById("searchConditionUlID");
		_ul.innerHTML = '';
		if (firstliText == '附近') {
			var _liinit = document.createElement("li");
			_liinit.setAttribute('class', 'mui-table-view-cell');
			_liinit.setAttribute('district-id', 0);
			_liinit.setAttribute('item', "0,5");
			_liinit.innerText = "全部";
			firstliText = _liinit.innerText;
			_ul.appendChild(_liinit);
		}else if(firstliText == '全部' ){
			var _liinit = document.createElement("li");
			_liinit.setAttribute('class', 'mui-table-view-cell');
			if(isSwitchCity){
				_liinit.setAttribute('district-id', 0);
				_liinit.setAttribute('item', "0,5");
				_liinit.innerText = "全部";
			}else{
				_liinit.setAttribute('district-id', 3);
				_liinit.setAttribute('item', "3,5");
				_liinit.innerText = "附近";
			}
			firstliText = _liinit.innerText;
			_ul.appendChild(_liinit);
		}
		for (var i = 0, len = city.district.length; i < len; i++) {
			if (city.district[i].PID == pid) {
				var _li = document.createElement("li");
				_li.setAttribute('class', 'mui-table-view-cell');
				_li.setAttribute('district-id', city.district[i].ID);
				_li.setAttribute('item', city.district[i].ID+",5");
				_li.innerText = city.district[i].Name;
				if (_li.innerText.length > 5) {
					_li.innerText = _li.innerText.slice(0, 5)
				}
				_ul.appendChild(_li);
			}
		}
	},
	addCityF : function(ohtml) {
		for (var i = 0, len = city.city.length; i < len; i++) {
			if (ohtml == city.city[i].Name) {
				healthNetworkMain.addCity(city.city[i].ID);
			}
		}
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
						if(isTopPull){
							setTimeout(healthNetworkMain.setTs('PullToRefreshID','healthNetworkMainListTips',0),
							1500);
						}else{
							healthNetworkUlHtml = '';
							document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
							document.getElementById('healthNetworkZanwuID').style.display = 'block';
						}
					}
				}
				document.getElementById('healthNetworkStoreNameValueID').blur();
				document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
				healthNetworkMain.loadEventHealth();
			}, 
			onerror: function(e) {
				healthNetworkUlHtml = '';
				document.getElementById('healthNetworkUlId').innerHTML = healthNetworkUlHtml;
				document.getElementById('healthNetworkZanwuID').innerHTML = '<i></i> 数据加载失败';
				document.getElementById('healthNetworkZanwuID').style.display = 'block';
				console.log("queryNetWorkError:" + e);
			}
		});
	},
	loadEventHealth: function() {
		mui('#healthNetworkUlId').on('tap', 'li', function() {
			var storeID = this.querySelectorAll('input')[0].value;
			healthNetworkMain.queruHealthNetworkDetail(storeID);
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
	},
	loadScreenSelect : function(storeType){
		var search_storeType = document.getElementById('search-storeTypeID');
		var oimg = '<input type="hidden" value="storeType" /><img src="../../img/common/btn_down.png"/>';
		var storeName = '全部类型';
		if(storeType == 41){
			storeName = '药房';
		}else if(storeType == 43){
			storeName = '体检机构';
		}
		search_storeType.innerHTML = storeName + oimg;
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
		distance = 3;
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
		healthNetworkMain.queryNetWork(storeName, areaNo, sortType, filter, areaType, areaLevel, storeType, distance, 1, 10, lng, lat);
	}
}

var jsonOhtm1 = [{id: "3",name: "智能排序"}, {id: "0.5",name: "500米"}, {id: "1",name: "1000米"}, {id: "2",name: "2000米"}];
var jsonOhtm2 = [{id: "-1",name: "全部类型"}, {id: "41",name: "药房"}, {id: "42",
	name: "医院"}, {id: "43",name: "体检机构"}, {id: "44",name: "齿科"}, {id: "45",
	name: "眼科"}, {id: "46",name: "妇幼保健"}, {id: "47",name: "综合"}, {id: "60",
	name: "网上药店"}, {id: "61",name: "中医"}, {id: "62",name: "骨科"}, {id: "0",
	name: "专科医院"}, {id: "0",name: "综合医院"}, {id: "0",name: "社区医院"}, {id: "0",
	name: "诊所"}, {id: "0",name: "疗养院"}];
var jsonOhtm3 = [{id: "znpx",name: "智能排序"}, {id: "lwzj",name: "离我最近"}, {id: "rqzg",name: "人气最高"}, {id: "pjzh",name: "评价最好"}];
var jsonOhtm4 = [{id: "0",name: "全部类型"}, {id: "discount",name: "优惠商户"}, {id: "coupon",name: "卡券商户"}];
var _searcha;
var osearch = document.getElementById("householdDevices").querySelector('#searchConditionUlID');
var isPopoverShowNum = 0;
var isPopoverShowType = "";
mui('.jkwd-nav').on('tap', 'a', function() {
	_searcha = this;
	var _searchType = _searcha.querySelectorAll('input')[0].value;
	var searchckDisable = false;
	var search_qt = document.getElementById('search-qt');
//	console.log(isPopoverShowNum+"  -->: "+_searchType+"  -->: "+isPopoverShowType);
	if(isPopoverShowNum != 0 && _searchType == isPopoverShowType){
		mui('#householdDevices').popover('hide');
		isPopoverShowNum = 0;
		isPopoverShowType = "";
		return false;
	}
	if (_searchType == 'area') {
		isPopoverShowType = "area";
		isPopoverShowNum = 1;
		healthNetworkMain.addCity(positionCityID);
		search_qt.style.display = 'block';
	}else if (_searchType == 'storeType') {
		if(!storeTypeDisable){
			isPopoverShowType = "storeType";
			isPopoverShowNum = 2;
			search_qt.style.display = 'block';
			var ohtm2 = '';
			for (var i = 0; i < jsonOhtm2.length; i++) {
				var jsonValue2 = jsonOhtm2[i];
				ohtm2 += '<li item=' + jsonValue2.id + ',2>' + jsonValue2.name + '</li>';
			}
			document.getElementById("searchConditionUlID").innerHTML = ohtm2;
		}else{
			searchckDisable = true;
		}
	}else if (_searchType == 'sortType') {
		isPopoverShowType = "sortType";
		isPopoverShowNum = 3;
		search_qt.style.display = 'block';
		var ohtm3 = '';
		for (var i = 0; i < jsonOhtm3.length; i++) {
			var jsonValue3 = jsonOhtm3[i];
			ohtm3 += '<li item=' + jsonValue3.id + ',3>' + jsonValue3.name + '</li>';
		}
		document.getElementById("searchConditionUlID").innerHTML = ohtm3;
	}else if (_searchType == 'filter') {
		isPopoverShowType = "filter";
		isPopoverShowNum = 4;
		search_qt.style.display = 'block';
		var ohtm4 = '';
		for (var i = 0; i < jsonOhtm4.length; i++) {
			var jsonValue4 = jsonOhtm4[i];
			ohtm4 += '<li item=' + jsonValue4.id + ',4>' + jsonValue4.name + '</li>';
		}
		document.getElementById("searchConditionUlID").innerHTML = ohtm4;
	}
	if(!searchckDisable){
		mui('#householdDevices').popover('show');
	}
	mui('.mui-scroll-wrapper3').scroll({
		startY: 0,
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
});
//绑定选择条件后的事件
mui('#householdDevices').on('tap', 'li', function(e) {
	mui('#householdDevices').popover('hide');
	isPopoverShowNum = 0;
	isPopoverShowType = "";
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
				if (type == 2) {
					var oimg = '<input type="hidden" value="storeType" /><img src="../../img/common/btn_down.png" alt="" width="15px"/>';
					_searcha.innerHTML = this.innerText + oimg;
					document.getElementById("healthNetworkTypeValueID").value = "";
					if (dataValue == "0") {
						dataValue = "";
					}
					document.getElementById("healthNetworkTypeValueID").value = dataValue;
					if(document.getElementById("healthNetworkAreaValueID").value != 1){
						areaType = 2;
						areaLevel = 2;
					}
				} else if (type == 3) {
					var oimg = '<input type="hidden" value="sortType" /><img src="../../img/common/btn_down.png" alt="" width="15px"/>';
					_searcha.innerHTML = this.innerText + oimg;
					document.getElementById("healthNetworkSortValueID").value = "";
					document.getElementById("healthNetworkSortValueID").value = dataValue;
					if(document.getElementById("healthNetworkAreaValueID").value != 1){
						areaType = 2;
						areaLevel = 2;
					}
				} else if (type == 4) {
					var oimg = '<input type="hidden" value="filter" /><img src="../../img/common/btn_down.png" alt="" width="15px"/>';
					_searcha.innerHTML = this.innerText + oimg;
					document.getElementById("healthNetworkScreenValueID").value = "";
					if (dataValue == "0") {
						dataValue = "";
					}
					document.getElementById("healthNetworkScreenValueID").value = dataValue;
					if(document.getElementById("healthNetworkAreaValueID").value != 1){
						areaType = 2;
						areaLevel = 2;
					}
				} else if (type == 5) {
					var oimg = '<input type="hidden" value="area" /><img src="../../img/common/btn_down.png" alt="" width="15px"/>';
					_searcha.innerHTML = this.innerText + oimg;
					/*替换区域选择全部/附近*/
					healthNetworkMain.addCity(positionCityID);
					/*替换区域选择全部0/附近3*/
					if(dataValue == "0"){
						areaNo = areaNoSeach;
						areaType = 2;
						areaLevel = 2;
					}else if(dataValue == "3"){
						areaType = 1;
						areaLevel = 2;
						distance = 3;
					}else{
						areaType = 2;
						areaLevel = 3;
						areaNo = dataValue;
					}
					document.getElementById("healthNetworkAreaValueID").value = 1;
					document.getElementById("healthNetworkAreaValueID").value = areaNo;
				}
			}
		}
	}
	healthNetworkMain.searchByScreen();
})

//绑定搜索框键盘回车事件
document.addEventListener('keyup', function(event) {
	//键盘回车事件
	if (event.keyCode == 13) {
		healthNetworkMain.searchByScreen();
	}
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
document.getElementById('rebackBeforePageAID').addEventListener('click',healthNetworkMain.rebackBeforePage);