mui('.mui-scroll-wrapper').scroll();
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var html = self.html;
	//获取定位
	selectMap.locationPosition();
	mui('.medicationSearch').on('tap', '.search', function() {
		var html = document.getElementById("search-city").value;
		selectMap.addProvinceOne(html);
	})
	document.addEventListener('keyup', function(event) {
		//键盘回车事件
		if (event.keyCode == 13) {
			document.getElementById('search-city').blur();
			var html = document.getElementById("search-city").value;
			selectMap.addProvinceOne(html);
			return false;
		}
	});
	mui('.mui-scroll').on('tap', '.mui-table-view-cell', function() {
		var pid = this.getAttribute('city-id');
		if(pid == ""){
			plus.nativeUI.alert('定位中，请您耐心等待...','','健医宝','确认');
			return false;
		}
		var positionHtml = this.innerText;
		if(this.getElementsByTagName('span')[0]){
			positionHtml = this.getElementsByTagName('span')[0].innerHTML;
		}
		var _positionCity = document.getElementById('selectMap-dw');
		var positionCity = _positionCity.getElementsByTagName('span')[0].innerText;
		plus.storage.setItem("positionCity",positionHtml);
		plus.storage.setItem("positionCityID", pid+"");
		var config = {
			id : "healthNetworkMain",
			url: "healthNetworkMain.html",
			method : "switchCity",
			extras : {
				positionHtml: positionCity
			}
		}
		jyapp.backWebView(config);
	});
	selectMap.addProvince();
});
var selectMap = {
	addProvince: function() {
		var _ul = document.getElementById("selectMap-ul");
		for (var i = 0, len = city.city.length; i < len; i++) {
			var _li = document.createElement("li");
			_li.setAttribute('class', 'mui-table-view-cell');
			_li.setAttribute('city-id', city.city[i].ID);
			_li.innerText = city.city[i].Name;
			_ul.appendChild(_li);
		}
	},
	addProvinceOne: function(html) {
		var selet = document.getElementById("search-add");
		var seletHtml = '<h2>搜索城市结果如下：</h2><ul></ul>';
		selet.innerHTML = seletHtml;
		var _ul = document.getElementsByTagName('ul')[0];
		var seletHtmlNum = 0;
		if (!!html) {
			for (var i = 0, len = city.city.length; i < len; i++) {
//							console.log(city.city[i].Name+"<-->"+city.city[i].Name.indexOf(html));
				if (city.city[i].Name.indexOf(html) != -1) {
					selet.style.visibility = 'visible';
					var _li = document.createElement("li");
					_li.setAttribute('class', 'mui-table-view-cell');
					_li.setAttribute('city-id', city.city[i].ID);
					_li.innerText = city.city[i].Name;
					_ul.appendChild(_li);
				}else{
					seletHtmlNum ++;
				}
			}
		}
		if(seletHtmlNum == city.city.length){
			selet.style.visibility = 'visible';
			selet.innerHTML = '<h2>未搜索到相关城市...</h2><ul></ul>';
		}
		selet.appendChild(_ul);
	},
	locationPosition: function() {
		var PositionOptions = {};
		var isIOS = true;
		if(mui.os.ios){
			PositionOptions = {
				enableHighAccuracy : false,
				timeout : 30000,
				maximumAge : 10*60*1000,
				provider : 'system',
				coordsType :'wgs84'
			};
		}else{
			PositionOptions = {
				enableHighAccuracy : false,
				timeout : 30000,
				maximumAge : 10*60*1000,
				provider : 'baidu',
				coordsType :'bd09ll'
			};
			isIOS = false;
		}
		var title = document.getElementById("selectMap-title");
		var title2 = document.getElementById("selectMap-dw");
		if (plus.geolocation) {
			plus.geolocation.getCurrentPosition(function(p) {
				title.innerHTML = p.address.city;
				title2.innerHTML = '<span>'+p.address.city+'</span>(GPS定位)';
				for (var i = 0; i < city.city.length; i++) {
					if (city.city[i].Name == p.address.city) {
						title2.setAttribute('city-id', city.city[i].ID);
					}
				}
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
			}, function(e) {
				switch (e.code) {
					case e.PERMISSION_DENIED:
						plus.nativeUI.alert("位置服务被拒绝", "", "健医宝", "确认");
						break;
					case e.POSITION_UNAVAILABLE:
						plus.nativeUI.alert("暂时获取不到位置信息", "", "健医宝", "确认");
						break;
					case e.TIMEOUT:
						plus.nativeUI.alert("获取信息超时", "", "健医宝", "确认");
						break;
					case e.UNKNOWN_ERROR:
						plus.nativeUI.alert("未知错误", "", "健医宝", "确认");
						break;
				}
				title.innerHTML = "上海市";
				title2.innerHTML = '<span>上海市</span>(GPS定位)';
				for (var i = 0; i < city.city.length; i++) {
					if (city.city[i].Name == "上海市") {
						title2.setAttribute('city-id', city.city[i].ID);
					}
				}
			}, PositionOptions);
		} else {
			title.innerHTML = "上海市";
			title2.innerHTML = '<span>上海市</span>(GPS定位)';
			for (var i = 0; i < city.city.length; i++) {
				if (city.city[i].Name == "上海市") {
					title2.setAttribute('city-id', city.city[i].ID);
				}
			}
			plus.nativeUI.alert("浏览器不兼容", "", "健医宝", "确认");
		}
	}
}