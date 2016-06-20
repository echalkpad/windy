var organizationId = '';
var pageIndex = 1;
var pageSize = 10;
var total = 0;
var storeName = "";
var areaNo = 1;
var areaType = 2;
var areaLevel = 2;
var distance = "";
var filter = "";
var storeType = "-1";
var sortType = "znpx";
var lng = 0;
var lat = 0;
var htmlHealthExaminationNet = '';
var requestHealthExaminationNet = '';
var storeInfo = {};
var areaNoSeach = "";
var isTopPull  = false;
//初始化
document.addEventListener('plusready', function() {
	positionCity = plus.storage.getItem("positionCity");
	positionCityID = parseInt(plus.storage.getItem("positionCityID"));
	areaNo = positionCityID;
	lng = parseFloat(plus.storage.getItem("positionLng")); 
	lat = parseFloat(plus.storage.getItem("positionLat")); 
	var self = plus.webview.currentWebview();
	organizationId = self.organizationId;
	//初始化套餐网点选择页面
	healthExaminationNet.locationPosition();
	//初始化选择网点事件
	healthExaminationNet.loadEventHealth();
	//初始化上拉刷新事件
	healthExaminationNet.initPlusscrollbottom();
});

var healthExaminationNet = {
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
				healthExaminationNet.setTs('Jkpullrefresh','healthExaminationNetListTips',0);
				pageIndex++;
				requestHealthExaminationNet = "storeName=&lat=" + lat + "&lng=" + lng + "&orgnazitionId=" + organizationId + "&areaNo=" + areaNo + "&sortType=" + sortType + "&filter=" + filter + "&areaType=" + areaType +
				"&areaLevel=" + areaLevel + "&storeType=43&distance=" + distance + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
				healthExaminationNet.inithealthExaminationNet(requestHealthExaminationNet);
			}else{
				healthExaminationNet.setTs('Jkpullrefresh','healthExaminationNetListTips',1);
				return false;
			}
		});
	},
	inithealthExaminationNet : function(requestHealthExaminationNet){
//		console.log("requestHealthExaminationNet---->:" + requestHealthExaminationNet);
		jyapp.getApi({
			method: 'store/storelist',
			data: requestHealthExaminationNet,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("inithealthExaminationNet---->:" + JSON.stringify(response));
				if(response.code != 1){
					document.getElementById('healthExaminationNetZanwuID').style.display = 'block';
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data != null && response.data.list != null && response.data.list.length > 0){
						document.getElementById('healthExaminationNetZanwuID').style.display = 'none';
						total = response.data.list.length;
						htmlHealthExaminationNet += '';
						for (var i = 0; i < total; i++) {
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
							var storeList = escape(JSON.stringify(store)).replace(/%/g,"\\");
							htmlHealthExaminationNet += '<li class="mui-table-view-cell">';
							htmlHealthExaminationNet += '	<input type="hidden" value="' + storeList + '" />';
							htmlHealthExaminationNet += '	<div class="li-r">';
							htmlHealthExaminationNet += '		<h2>' + store.ShortName + '</h2>';
							htmlHealthExaminationNet += '		<h3><span class="sp1 xingxing">' + score + '</span></h3>';
							htmlHealthExaminationNet += '		<p>';
							htmlHealthExaminationNet += '			<span class="sp1">' + store.Address + '</span><span class="sp2">' + store.Distance + 'km</span></p>';
							htmlHealthExaminationNet += '	</div>';
							htmlHealthExaminationNet += '</li>';
						}
					}else{
						if(isTopPull){
							setTimeout(healthExaminationNet.setTs('Jkpullrefresh','healthExaminationNetListTips',0),
							1500);
						}else{
							healthNetworkUlHtml = '';
							document.getElementById('healthExaminationNetZanwuID').innerHTML = htmlHealthExaminationNet;
							document.getElementById('healthExaminationNetZanwuID').style.display = 'block';
						}
					}
				}
				document.getElementById('healthExaminationNetUlId').innerHTML = htmlHealthExaminationNet;
			},
			onerror: function(e) {
				document.getElementById('healthExaminationNetZanwuID').innerHTML = '<i></i> 数据加载失败';
				document.getElementById('healthExaminationNetZanwuID').style.display = 'block';
				console.log("inithealthExaminationNet:" + e);
			}
		});
	},
	locationPosition: function() {
		if(lat != 0){
			areaNoSeach = areaNo;
			healthExaminationNet.addCityF(positionCity);
			if (storeType != -1) {
				//调用定位筛选
				healthExaminationNet.searchByScreen();
			} else {
				requestHealthExaminationNet = "storeName=&lat=" + lat + "&lng=" + lng + "&orgnazitionId=" + organizationId + "&areaNo=" + areaNo + "&sortType=" + sortType + "&filter=" + filter + "&areaType=" + areaType +
				"&areaLevel=" + areaLevel + "&storeType=43&distance=" + distance + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
				healthExaminationNet.inithealthExaminationNet(requestHealthExaminationNet);
			}
		} else {
			healthExaminationNet.addCityF("上海市");
			lat = 0;
			lng = 0;
			areaNo = 859;
			areaNoSeach = 859;
			areaType = 2;
			areaLevel = 2;
			requestHealthExaminationNet = "storeName=&lat=" + lat + "&lng=" + lng + "&orgnazitionId=" + organizationId 
				+ "&areaNo=" + areaNo + "&sortType=" + sortType + "&filter=" + filter + "&areaType=" + areaType 
				+ "&areaLevel=" + areaLevel + "&storeType=43&distance=" + distance + "&pageIndex=" + pageIndex 
				+ "&pageSize=" + pageSize;
			healthExaminationNet.inithealthExaminationNet(requestHealthExaminationNet);
		}
	},
	loadEventHealth: function() {
		mui('#healthExaminationNetUlId').on('tap', 'li', function() {
			var _li = this;
			_li.setAttribute('class','mui-table-view-cell active');
			var store = this.querySelectorAll('input')[0].value;
			plus.nativeUI.confirm('您确认选择当前体检网点',function(e){
				if(e.index == 0){
					//确认选择当前网点
					healthExaminationNet.rebackHealthExamPackage(store);
				}else{
					_li.setAttribute('class','mui-table-view-cell');
				}
			},'选择体检网点',["确认","取消"]);
		});
	},
	rebackHealthExamPackage: function(store) {
		var healthExaminationPackageHtml = plus.webview.getWebviewById('healthExaminationPackage');
		var unescapeStore = unescape(store.replace(/\\/g, "%"));
		var jsonStore = JSON.parse(unescapeStore);
		var extras = {
			StoreId : jsonStore.ID,
			ShortName : jsonStore.ShortName,
			Address : jsonStore.Address,
			Lng : jsonStore.BaiduLng,
			Lat : jsonStore.BaiduLat
		}
		mui.fire(healthExaminationPackageHtml,'chooseNetRefresh',extras);
//		自定义事件
		mui.openWindow({
			id: 'healthExaminationPackage'
		})
	},
	searchByScreen: function() {
		htmlHealthExaminationNet = '';
		document.getElementById('healthExaminationNetUlId').innerHTML = htmlHealthExaminationNet;
		filter = document.getElementById("healthExaminationNetFilterValueID").value;
		if (!filter || typeof(filter) == "undefined" || filter == "") {
			filter = "";
		}
		/*网点类型,默认空, 可选值--rqzg,pjzh,znpx,lwzj*/
		sortType = document.getElementById("healthExaminationNetSortValueID").value;
		if (!sortType || typeof(sortType) == "undefined" || sortType == "") {
			sortType = "znpx";
		}
		requestHealthExaminationNet = "storeName=&lat=" + lat + "&lng=" + lng + "&orgnazitionId=" + organizationId + "&areaNo=" + areaNo + "&sortType=" + sortType + "&filter=" + filter + "&areaType=" + areaType +
		"&areaLevel=" + areaLevel + "&storeType=43&distance=" + distance + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
		healthExaminationNet.inithealthExaminationNet(requestHealthExaminationNet);
	},
	addCity : function(pid) {
		var _ul = document.getElementById("healthExaminationNetAreaID");
		_ul.innerHTML = '';
		var _liinit = document.createElement("li");
		_liinit.setAttribute('district-id', 0);
		_liinit.setAttribute('item', "0,1");
		_liinit.innerText = "全部";
		_ul.appendChild(_liinit);
		for (var i = 0, len = city.district.length; i < len; i++) {
			if (city.district[i].PID == pid) {
				var _li = document.createElement("li");
				_li.setAttribute('district-id', city.district[i].ID);
				_li.setAttribute('item', city.district[i].ID+",1");
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
				healthExaminationNet.addCity(city.city[i].ID);
			}
		}
	},
	backHealthExamPackage: function() {
		var healthExaminationPackageHtml = plus.webview.getWebviewById('healthExaminationPackage');
		var extras = {
			pageId : "healthExaminationNet"
		}
		mui.fire(healthExaminationPackageHtml,'closeBeforePage',extras);
//		自定义事件
		mui.openWindow({
			id: 'healthExaminationPackage'
		})
	}
}

//绑定回退按钮事件
document.getElementById('heNetBackAID').addEventListener('click',healthExaminationNet.backHealthExamPackage);

//搜索条件
var search_type;
var osearch = document.getElementById("householdDevices").querySelector('.search-ul');
var search_qt = document.getElementById("search-qt");
mui('.jkwd-nav').on('tap', 'a', function() {
	search_type = this;
	var jsonOhtm1 = [{id: "znpx",name: "智能排序"}, {id: "lwzj",name: "离我最近"}, {id: "rqzg",name: "人气最高"}, {id: "pjzh",name: "评价最好"}];
	var jsonOhtm2 = [{id: "0",name: "全部类型"}, {id: "discount",name: "优惠商户"}, {id: "coupon",name: "卡券商户"}];
	var searchckDisable = false;
	if (this.className == 'search-area') {
		search_qt.style.display = 'block';
		document.getElementById("healthExaminationNetAreaID").style.display = 'block';
		document.getElementById("healthExaminationNetFilterID").style.display = 'none';
		document.getElementById("healthExaminationNetSortID").style.display = 'none';
		
		var oimg = '全部区域	<img src="../../../img/common/btn_down.png"/>';
		document.getElementById('search-area-reset').innerHTML = oimg;
	}
	if (this.className == 'search-sort') {
		search_qt.style.display = 'block';
		document.getElementById("healthExaminationNetSortID").style.display = 'block';
		document.getElementById("healthExaminationNetAreaID").style.display = 'none';
		document.getElementById("healthExaminationNetFilterID").style.display = 'none';
		var ohtm1 = '';
		for (var i = 0; i < jsonOhtm1.length; i++) {
			var jsonValue1 = jsonOhtm1[i];
			ohtm1 += '<li item=' + jsonValue1.id + ',2>' + jsonValue1.name + '</li>';
		}
		document.getElementById("healthExaminationNetSortID").innerHTML = ohtm1;
		var oimg = '智能排序	<img src="../../../img/common/btn_down.png"/>';
		document.getElementById('search-sort-TypeID').innerHTML = oimg;
	}
	if (this.className == 'search-filter') {
		search_qt.style.display = 'block';
		document.getElementById("healthExaminationNetFilterID").style.display = 'block';
		document.getElementById("healthExaminationNetAreaID").style.display = 'none';
		document.getElementById("healthExaminationNetSortID").style.display = 'none';
		var ohtm2 = '';
		for (var i = 0; i < jsonOhtm2.length; i++) {
			var jsonValue2 = jsonOhtm2[i];
			ohtm2 += '<li item=' + jsonValue2.id + ',3>' + jsonValue2.name + '</li>';
		}
		document.getElementById("healthExaminationNetFilterID").innerHTML = ohtm2;
	}
	mui('#householdDevices').popover('show');
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
})

mui('#householdDevices').on('tap', 'li', function() {
	var oimg = '	<img src="../../../img/common/btn_down.png"/>';
	search_type.innerHTML = this.innerText + oimg;
	mui('#householdDevices').popover('hide');
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
				if (type == 1) {
					/*替换区域选择全部/附近*/
					var _areali = osearch.getElementsByTagName('li');
					for(var s = 0; s < _areali.length; s++){
						if (_areali[s].innerText.indexOf('附近') != -1) {
							_areali[s].setAttribute('district-id', 0);
							_areali[s].setAttribute('item', "0,1");
							_areali[s].innerText = "全部";
						}else if(_areali[s].innerText.indexOf('全部') != -1){
							if(positionCity == plus.storage.getItem("locationCity")){
								_areali[s].setAttribute('district-id', 3);
								_areali[s].setAttribute('item', "3,1");
								_areali[s].innerText = "附近";
							}else{
								_areali[s].setAttribute('district-id', 0);
								_areali[s].setAttribute('item', "0,1");
								_areali[s].innerText = "全部";
							}
						}
					}
					/*替换区域选择全部/附近*/
					if(dataValue == "0"){
						areaNo = areaNoSeach;
						areaType = 2;
						areaLevel = 1;
					}else if(dataValue == "3"){
						areaType = 1;
						areaLevel = 1;
						distance = 3;
					}else{
						areaType = 2;
						areaLevel = 3;
						areaNo = dataValue;
					}
					document.getElementById("healthExaminationNetAreaValueID").value = 1;
					document.getElementById("healthExaminationNetAreaValueID").value = dataValue;
					document.getElementById("healthExaminationNetFilterValueID").value = distance;
				} else if (type == 2) {
					areaType = 1;
					document.getElementById("healthExaminationNetSortValueID").value = "";
					document.getElementById("healthExaminationNetSortValueID").value = dataValue;
					if(document.getElementById("healthExaminationNetAreaValueID").value != 1){
						areaType = 2;
						if(areaLevel != 1){
							areaLevel = 3;
						}
					}else if(document.getElementById("healthExaminationNetFilterValueID").value != ""){
						areaType = 1;
					}
				} else if (type == 3) {
					document.getElementById("healthExaminationNetFilterValueID").value = "";
					document.getElementById("healthExaminationNetFilterValueID").value = dataValue;
					if(document.getElementById("healthExaminationNetAreaValueID").value != 1){
						areaType = 2;
						if(areaLevel != 1){
							areaLevel = 3;
						}
					}else if(document.getElementById("healthExaminationNetFilterValueID").value != ""){
						areaType = 1;
					}
				} 
			}
		}
	}
	healthExaminationNet.searchByScreen();
})