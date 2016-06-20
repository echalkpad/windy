var pageIndex = 1;
var pageSize = 10;
var storeID = "";
var desStoreName = "";
//经度
var lng = "";
//纬度
var lat = "";
var storeInfo = {};
var targetLng = 0;
var targetLat = 0;
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	storeID = self.storeID;
	//经度
	lng = self.lng;
	//纬度
	lat = self.lat;
	/*查询网点详情上部分*/
	StoreInformationTop(storeID, lat, lng);
	/*查询网点详情 中部预定*/
	StoreProductList(storeID);
	/*优惠提示查询*/
	StoreDiscount(storeID);
	/*查询网点详情 下部*/
	StoreCoupons(storeID);
	/*指定门店的评论*/
	GetStoreComment(storeID, 1, 10);
});

function StoreInformationTop(storeID, lat, lng) {
	var requestStoreInformationTop = "storeId=" + storeID + "&lat=" + lat + "&lng=" + lng;
	jyapp.getApi({
		method: 'store/storeinformationtop',
		data: requestStoreInformationTop,
		timeout: 10000,
		onsuccess: function(response) {
			//			console.log("StoreInformationTop---->:"+JSON.stringify(response));
			storeInfo = response.data;
			var score = "";
			if (response.data.Score == 1) {
				score = "★";
			} else if (response.data.Score == 2) {
				score = "★★";
			} else if (response.data.Score == 3) {
				score = "★★★";
			} else if (response.data.Score == 4) {
				score = "★★★★";
			} else {
				score = "★★★★★";
			}
			var html = "";
			html += "<ul class=\"jkwd-ul\" id=\"hndutId\">";
			html += "	<li>";
			//TODO 网点-详情-机构介绍StoreInformationTop /store/storeinformationtop
			//					html += "	<li  onclick=\"healthNetworkDetailIndroduce("+storeID+")\">";
			html += "		<div class=\"li-l\">";
			html += "			<img src=\"" + response.data.Src + "\" onerror=\"this.src='../../img/default/pic_moren.png';this.onerror=null\"/>";
			html += "		</div>";
			html += "		<div class=\"li-r\">";
			desStoreName = response.data.ShortName;
			html += "			<h2>" + desStoreName + "<!--<span>团</span>--></h2>";
			html += "			<h3>	<span class=\"sp1 xingxing\">" + score + "</span><!--￥<span>712</span>/人--></h3>";
			html += "			<p><!--<span>人命广场</span><span class=\"sp1\">response.data.StoreType</span>--><span class=\"sp2\">" + response.data.Distance + "km</span></p>";
			html += "		</div>";
			html += "	</li>";
			html += "</ul>";
			html += "<p id=\"openSysMapID\" class=\"jy-li jy-navigate-right Hauto\"><img src=\"../../img/familyDoctor/icon_address.png\" width=\"10px\" />";
			html += "<a class=\"phone-btn\"><input type=\"hidden\" value=\"" + response.data.Lng + "\" /><input type=\"hidden\" value=\"" + response.data.Lat + "\" />";
			html += response.data.Address + "</a></p>";
			var phone = response.data.Phone;
			if (!phone) {
				phone = "";
			}
			html += "<p class=\"jy-li jy-navigate-right\"><img src=\"../../img/familyDoctor/icon_phone.png\" width=\"12px\" />" + "<a href=\"tel:" + phone + "\" class=\"phone-btn\" >" + phone + "</a></p>";
			document.getElementById('healthNetworkDetailTopId').innerHTML = html;
			//			初始化地图加载事件
			openAddressMap();
		},
		onerror: function(e) {
			console.log("StoreInformationTop:" + e);
		}
	});
}

function healthNetworkDetailIndroduce(storeID) {
	mui.openWindow({
		id: 'healthNetworkDetailIndroduce',
		url: "healthNetworkDetailIndroduce.html",
		extras: {
			"storeID": storeID
		}
	})
}
var productTotal = 0;
function StoreProductList(storeID) {
	var requestProduct = "storeId=" + storeID;
	jyapp.getApi({
		method: 'HealthExamination/HotPackageList',
		data: requestProduct,
		timeout: 10000,
		onsuccess: function(response) {
			//			console.log("StoreProductList---->:"+JSON.stringify(response));
			var htmlProduct = "";
//			增加了热门套餐 2016/6/3 明星东
			htmlProduct += "<p class=\"jy-li jy-navigate-right f12 weak\" id=\"netPlan\"><span style=\"background: rgb(232,80,63);\">热</span>热门套餐<small id=\"smallMoreID\">更多</small></p>";
			htmlProduct += "<ul class=\"mui-table-view rmtc\" id=\"healthNetworkDetailProductULId\">";
			if (response.code == 1 && response.data && response.data.length > 0) {
				productTotal = response.data.length;
				for (var i = 0; i < response.data.length; i++) {
					if(i==3){
						break;
					}
					var product = response.data[i];
					htmlProduct += "	<li class=\"mui-table-view-cell\">";
					htmlProduct += "		<input type=\"hidden\" value=\"" + product.ID + "\" />";
					htmlProduct += "		<a class=\"mui-navigate-right\">";
					htmlProduct += "			<h3>" + product.PackageName + "</h3>";
					htmlProduct += "			<p>门市价：<del>￥" + product.OriginalPrice + "起</del><span>健e价：</span><span>￥" + product.PresentPrice + "起</span></p>";
					htmlProduct += "		</a>";
					htmlProduct += "	</li>";
				}
			}
			htmlProduct += "</ul>";
			document.getElementById('healthNetworkDetailProductId').innerHTML = htmlProduct;
			if(productTotal < 4){
				document.getElementById("smallMoreID").innerText = "";
			}
			document.getElementById('healthNetworkDetailProductId').display = "none";
			//初始化选择套餐事件
			choosePackage();
		},
		onerror: function(e) {
			console.log("StoreProductList:" + e);
		}
	});
}

function StoreDiscount(storeID) {
	var requestStorediscount = "storeId=" + storeID;
	jyapp.getApi({
		method: 'store/storediscount',
		data: requestStorediscount,
		timeout: 10000,
		onsuccess: function(response) {
			var htmlStorediscount = "";
			htmlStorediscount += "<p class=\"jy-li f12 weak\"><span style=\"background: rgb(233,87,70);\">惠</span>暂无商户优惠</p>";
			if (response.data != null) {
				htmlStorediscount += "<div>";
				htmlStorediscount += "	<p style=\"color: #000;\">" + response.Context + "</p>";
				htmlStorediscount += "	<p class=\"f13\">每天9:00——22:00</p>";
				htmlStorediscount += "</div>";
			}
			document.getElementById('healthNetworkDetailDiscountId').innerHTML = htmlStorediscount;
			document.getElementById('healthNetworkDetailDiscountId').display = "none";
		},
		onerror: function(e) {
			console.log("StoreDiscount:" + e);
		}
	});
}

function StoreCoupons(storeID) {
	var requestCoupon = "storeId=" + storeID;
	jyapp.getApi({
		method: 'store/storecoupons',
		data: requestCoupon,
		timeout: 10000,
		onsuccess: function(response) {
			var htmlCoupons = "";
			//			htmlCoupons += "<p class=\"jy-li f12 weak\"><span style=\"background: rgb(57,164,223);\">卡</span>用卡劵，更超值</p>";
			htmlCoupons += "<p class=\"jy-li f12 weak\"><span style=\"background: rgb(57,164,223);\">卡</span>暂无可用卡劵</p>";
			//			for(var i = 0; i < response.data.list.length; i++){
			//			var coupons = response.data.list[i];
			//				// TODO 优惠券ID未取值，现在是默认值
			//				htmlCoupons += "<p class=\"jy-li\">"+coupons.UseRange+"<a href='' onclick=\"" + this.GetCoupon(coupons.ID) + "\">领取</a></p>";
			//			}
			document.getElementById('healthNetworkDetailCouponsId').innerHTML = htmlCoupons;
			document.getElementById('healthNetworkDetailCouponsId').display = "none";
		},
		onerror: function(e) {
			console.log("StoreCoupons:" + e);
		}
	});
}

var storeCommentTotal = 0;

function GetStoreComment(storeID, pageIndex, pageSize) {
	var requestComment = "storeId=" + storeID + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
//	console.log("requestComment---->:"+requestComment);
	var _hcommentdivs = document.getElementById('healthNetworkDetailCommentId');
	var _hcommentps = document.createElement('p');
	jyapp.getApi({
		method: 'store/getstorecomment',
		data: requestComment,
		timeout: 10000,
		onsuccess: function(response) {
//			console.log("GetStoreComment---->:"+JSON.stringify(response));
			_hcommentps.setAttribute('class','jy-li f12 standard jy-navigate-right');
			if(response.code != 1){
				_hcommentps.innerHTML = "<img src=\"../../img/familyDoctor/icon_comments.png\" width=\"13px\" style=\"margin-bottom:-2px;\" /><a>用户点评(0)</a>";
			}else{
				if(response.data != null && response.data.lists != null && response.data.lists.length > 0){
					storeCommentTotal = response.data.lists.length;
					_hcommentps.innerHTML = "<img src=\"../../img/familyDoctor/icon_comments.png\" width=\"13px\" style=\"margin-bottom:-2px;\" /><a>用户点评("+response.data.lists.length+")</a>";
				}else{
					_hcommentps.innerHTML = "<img src=\"../../img/familyDoctor/icon_comments.png\" width=\"13px\" style=\"margin-bottom:-2px;\" /><a>用户点评(0)</a>";
				}
			}
			_hcommentdivs.appendChild(_hcommentps);
		},
		onerror: function(e) {
			_hcommentps.innerHTML = "<img src=\"../../img/familyDoctor/icon_comments.png\" width=\"13px\" style=\"margin-bottom:-2px;\" /><a>用户点评(0)</a>";
			_hcommentdivs.appendChild(_hcommentps);
			console.log("GetStoreComment:" + e);
		}
	});
}

function GetCoupon(couponId) {
	var requestGetCoupon = "couponId=" + couponId + "&wxId=";
	jyapp.getApi({
		method: 'store/getcoupon',
		data: requestGetCoupon,
		timeout: 10000,
		onsuccess: function(response) {
//			console.log("优惠券已经存储到您的个人账户" + JSON.stringify(response));
		},
		onerror: function(e) {
			console.log("GetCoupon:" + e);
		}
	});
}

function choosePackage() {
	mui('#healthNetworkDetailProductId').on('click', 'li', function() {
		commomUtil.closeWebviewById('healthExaminationPackage');
		var packageId = this.querySelectorAll('input')[0].value;
		mui.openWindow({
			id: 'healthExaminationPackage',
			url: "../healthy/healthExamination/healthExaminationPackage.html",
			extras: {
				"backid" : 'healthNetworkDetail',
				"backurl" : '../../healthNetwork/healthNetworkDetail.html',
				"packageId": packageId,
				"StoreId": storeInfo.ID,
				"ShortName": storeInfo.ShortName,
				"Address": storeInfo.Address,
				"Lng": storeInfo.Lng,
				"Lat": storeInfo.Lat
			}
		});
	});
}

function openAddressMap() {
	//绑定打开地图事件
	mui('#healthNetworkDetailTopId').on('click', '#openSysMapID', function() {
		targetLng = this.querySelectorAll('input')[0].value;
		targetLat = this.querySelectorAll('input')[1].value;
		if (targetLng == 0 || targetLat == 0 || targetLng == NaN || targetLat == NaN) {
			plus.nativeUI.alert('未开启系统定位功能，不能打开地图定位', '','健医宝', '确认');
			return false;
		} 
		if (mui.os.ios) {
			mui('#showAddressMap').popover('toggle');
		} else {
			//des: ( DOMString ) 必选 导航目的地描述
			var des = desStoreName;
			// 设置目标位置坐标点和其实位置坐标点 Point(lng,lat): 创建Point对象
			//dst: ( Point ) 必选 导航目的地坐标
			var dst = new plus.maps.Point(targetLng, targetLat);
			//src: ( Point ) 必选 导航起始地坐标 
			var src = new plus.maps.Point(lng, lat);
			// 调用系统地图显示
			plus.maps.openSysMap(dst, des, src);
		}
	});
}

mui('#showAddressMap').on('click', 'li', function() {
	mui('#showAddressMap').popover('hide');
	if (this.children[0].value == 1) {
		//des: ( DOMString ) 必选 导航目的地描述
		var des = desStoreName;
		var wgstarget = {};
		//转换坐标系 bd-09 --->gcj02
		wgstarget = GPS.bd_decrypt(targetLat,targetLng);
		//转换坐标系 gcj02 --->wgs84
		wgstarget = GPS.gcj_decrypt_exact(wgstarget.lat,wgstarget.lon);
		//dst: ( Point ) 必选 导航目的地坐标
		var dst = new plus.maps.Point(wgstarget.lon, wgstarget.lat);
		//src: ( Point ) 必选 导航起始地坐标 
		var src = new plus.maps.Point(lng,lat);
		// 调用系统地图显示 
		plus.maps.openSysMap( dst, des, src );
	} else if (this.children[0].value == 2) {
		//反向地址解析（地址查询）:调用该接口可调起iOS百度地图，经过逆地理编码后，以标注形式显示位置和地址信息。(baidumap://map/geocoder // iOS服务地址)
		var baiduURL = "baidumap://map/geocoder?location="+targetLat+","+targetLng+"&coord_type=wgs84&src=健医股份|健医宝";
		baiduURL = encodeURI(baiduURL);
		plus.runtime.openURL(baiduURL,function(e){
			if(e.code == -3){
				plus.nativeUI.alert('未检测到百度地图，请至APP Store下载','','健医宝','确认');
				return false;
			}else{
				plus.nativeUI.alert('地图打开失败','','健医宝','确认');
				return false;
			}
		});
	} else if (this.children[0].value == 3) {
		var wgs = {};
		wgs = GPS.gcj_encrypt(targetLat,targetLng);
		var gdLng = wgs.lon; 
		var gdLat = wgs.lat; 
		var gaodeURL = "iosamap://viewMap?sourceApplication=健医宝&poiname="+desStoreName+"&lat="+gdLat+"&lon="+gdLng+"&dev=1";
		gaodeURL = encodeURI(gaodeURL);
		plus.runtime.openURL(gaodeURL,function(e){
			if(e.code == -3){
				plus.nativeUI.alert('未检测到高德地图，请至APP Store下载','','健医宝','确认');
				return false;
			}else{
				plus.nativeUI.alert('地图打开失败','','健医宝','确认');
				return false;
			}
		});
	} else if (this.children[0].value == 4){
		var wgs = {};
		wgs = GPS.gcj_encrypt(targetLat,targetLng);
		var qqLng = wgs.lon; 
		var qqLat = wgs.lat; 
		var qqURL = "qqmap://map/routeplan?type=drive&fromcoord="+lat+","+lng+"&tocoord="+qqLat+","+qqLng+"&coord_type=1&policy=0";
		plus.runtime.openURL(qqURL,function(e){
			if(e.code == -3){
				plus.nativeUI.alert('未检测到腾讯地图，请至APP Store下载','','健医宝','确认');
				return false;
			}else{
				plus.nativeUI.alert('地图打开失败','','健医宝','确认');
				return false;
			}
		});
	}
});



//2016/6/3增加更多热门套餐
//获取更多热门套餐
mui('.jkwd-yd').on('tap','#netPlan',function(){
	if(productTotal > 3){
		commomUtil.closeWebviewById('healthNetworkPlan');
		mui.openWindow({
			id:'healthNetworkPlan',
			url:'healthNetworkPlan.html',
			extras : {
				storeID : storeID,
				storeInfo : storeInfo
			}
		});
	}
});

//2016/6/12增加用户点评 明星东
mui('body').on('tap','#healthNetworkDetailCommentId',function(){
	if(storeCommentTotal > 0){
		commomUtil.closeWebviewById('userReviews');
		mui.openWindow({
			id:'userReviews',
			url:'userReviews.html',
			extras : {
				storeID : storeID
			}
		});
	}
});
