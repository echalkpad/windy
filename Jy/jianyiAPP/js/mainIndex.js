//热门服务数量
var popularServceTotal = 4;
document.addEventListener('plusready', function() {
	//获取App定位
	mainIndex.locationPosition();
	//初始化热门服务
	mainIndex.initIndexPopularServce();
	//初始化首页轮播图片
	mainIndex.initSliderBanner();
	//初始化主页健康咨询
	mainIndex.initMainConsultationList(1, 10);
	//网络监控
	document.addEventListener("netchange", function() {
		var nt = plus.networkinfo.getCurrentType();
		switch (nt) {
			case plus.networkinfo.CONNECTION_ETHERNET:
			case plus.networkinfo.CONNECTION_WIFI:
				document.getElementById("noNetwork").style.display = 'none';
				break;
			case plus.networkinfo.CONNECTION_CELL2G:
			case plus.networkinfo.CONNECTION_CELL3G:
			case plus.networkinfo.CONNECTION_CELL4G:
				document.getElementById("noNetwork").style.display = 'none';
				break;
			default:
				document.getElementById("noNetwork").style.display = 'block';
				break;
		}
	}, false);
});

//自定义刷新热门服务事件
window.addEventListener('rebackRefresh',function(){
	//初始化热门服务
	mainIndex.initIndexPopularServce();
})

var mainIndex = {
	initSliderBanner: function() {
		var requestPictures = "flag=nindex";
		jyapp.getApi({
			method: 'Comment/Pictures',
			data: requestPictures,
			timeout: 10000,
			showWaiting:true,
			onsuccess: function(response) {
				if (response.data && response.data.list && response.data.list.length > 0) {
					var dataValues = response.data.list;
					var html = '';
					var html2 = '';
					if (dataValues) {
						html += '<div class="mui-slider-item mui-slider-item-duplicate" url="' + dataValues[dataValues.length - 1].URL + '" description="' + dataValues[dataValues.length - 1].Description + '">';
						html += '<a href="#">';
						html += '<img src="' + dataValues[dataValues.length - 1].Pic + '"}>';
						html += '</a>'
						html += '</div>';
						for (var i in dataValues) {
							html += '<div class="mui-slider-item mui-slider-item-duplicate" url="' + dataValues[i].URL + '" description="' + dataValues[i].Description + '">';
							html += '<a href="#">';
							html += '<img src="' + dataValues[i].Pic + '"}>';
							html += '</a>'
							html += '</div>';
							if (i == 0) {
								html2 += '<div class="mui-indicator mui-active"></div>';
							} else {
								html2 += '<div class="mui-indicator"></div>';
							}
						}

						html += '<div class="mui-slider-item mui-slider-item-duplicate" url="' + dataValues[0].URL + '" description="' + dataValues[0].Description + '">';
						html += '<a href="#">';
						html += '<img src="' + dataValues[0].Pic + '"}>';
						html += '</a>'
						html += '</div>';
					}

					document.getElementById('mainIndexBannerDivID').innerHTML = html;
					document.getElementById('mainIndexBannerDiv2ID').innerHTML = html2;

					//获得slider插件对象
					mui('.mui-slider').slider({
						interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
					});
				} else {
					document.getElementById('sliderDivShowID').style.display = 'none';
				}
			},
			onerror: function(e) {
				console.log("initSliderBanner:" + e);
			}
		});
	},
	initMainConsultationList: function(pageIndex, pageSize) {
		var requestConsultation = "pageIndex=" + pageIndex + "&pageSize=" + pageSize;
		jyapp.getApi({
			method: 'HealthConsultation/HealthConsultationList',
			data: requestConsultation,
			timeout: 10000,
			onsuccess: function(response) {
//				console.log(JSON.stringify(response));
				if (response && response.data && response.data.list && response.data.list.length > 0) {
					var dataValues = response.data.list;
					var html = '';
					if (dataValues) {
						for (var i in dataValues) {
							var endLen = dataValues[i].CreateTime.length - 2;
							var time = dataValues[i].CreateTime.substring(6, endLen);
							html += '<li class="mui-table-view-cell mui-media ">';
							html += '<a href="">';
							html += '<input type="hidden" value="' + dataValues[i].ID + '" />';
							html += '<img class="mui-media-object mui-pull-left meta-img" src="' + dataValues[i].Pic2 + '" }>';
							html += '<div class="mui-media-body">';
							html += '<h3 class="f15 ellipsis">' + dataValues[i].Title + '</h3>';
							html += '<time>' + commomUtil.formatStringToDate(time) + '</time>';
							html += '<span class="rq f12">人气 ' + dataValues[i].Popularity + '</span>';
							html += '</div>';
							html += '</a>';
							html += '</li>';
						}
					}
					document.getElementById('jkzx').innerHTML = html;
				}

			},
			onerror: function(e) {
				console.log("initMainConsultationList:" + e);
			}
		});
	},
	isGoMeFamily: function() {
		var url = 'profile/family';
		jyapp.getApi({
			method: url,
			onsuccess: function(data) {
				//				console.log(JSON.stringify(data))
				if (data.data == null) {
					mui.openWindow({
						id: 'meFamilyNone',
						url: "../html/me/meFamilyNone.html",
						createNew: true,
					});
				} else {
					mui.openWindow({
						id: 'meFamily',
						url: "../html/me/meFamily.html",
						createNew: true,
					});
				}
			},
			onerror: function(e) {
				console.log(JSON.stringify(e))
				mui.toast(e);
			}
		});
	},
	initIndexPopularServce : function(){
		jyapp.getApi({
			method: 'CustomeApplication/ApplicationList',
			onsuccess: function(response) {
//				response.code = 0;
//				console.log("initIndexPopularServce---->:"+JSON.stringify(response));
				var htmlPopular = '';
				if(response.code != 1){
					document.getElementById('defaultPopularDivID').style.display = 'block';
					document.getElementById('initPopularDivID').style.display = 'none';
				}else{
					var dataValues = response.data;
					if(dataValues != null &&  dataValues.length > 0){
						popularServceTotal = dataValues.length;
						for(var i = 0; i < dataValues.length; i++){
//							TODO 目前是前端手动控制显示4条
							if(i == 4){
								break;
							}
							var popular = dataValues[i];
							var Description = popular.Description ? popular.Description : "";
							var Target = popular.Target ? popular.Target : " ";
							htmlPopular += '<li class="mui-table-view-cell mui-media">';
							htmlPopular += '	<input type="hidden" value="'+popular.OpenType+'" />';
							htmlPopular += '	<input type="hidden" value=\''+Target+'\' />';
							htmlPopular += '	<a href="javascript:;" class="mui-navigate-right" id="initPopularAID'+i+'">';
							htmlPopular += '		<img class="mui-media-object mui-pull-left" src="'+popular.Icon+'">';
							htmlPopular += '		<div class="mui-media-body f16">'+popular.Name;
							htmlPopular += '			<p class="mui-ellipsis f13">'+Description+'</p>';
							htmlPopular += '		</div>';
							htmlPopular += '	</a>';
							htmlPopular += '</li>';
						}
						document.getElementById('defaultPopularDivID').style.display = 'none';
						document.getElementById('initPopularDivID').style.display = 'block';
					}else{
						document.getElementById('defaultPopularDivID').style.display = 'block';
						document.getElementById('initPopularDivID').style.display = 'none';
					}
				}
				document.getElementById('initPopularUlID').innerHTML = htmlPopular;
			},
			onerror: function(e) {
				document.getElementById('defaultPopularDivID').style.display = 'block';
				document.getElementById('initPopularDivID').style.display = 'none';
				console.log("initIndexPopularServceError---->:"+e);
			}
		});
	},
	initIndexPopularServceJumpEvent : function(inputs){
		var openType = inputs[0].value;//打开方式 
		var popularService = inputs[1].value;
//		console.log("openType:"+openType+" popularService: "+popularService);
		if(!popularService || popularService == 'undefined' || typeof(popularService) == 'undefined' || popularService == " "){
			plus.nativeUI.alert('服务维护中，请联系客服!','','健医宝','确认');
			return false;
		}else{
			popularService = JSON.parse(inputs[1].value);//热门服务参数
			var extrasValue = popularService.extras;
			if(!extrasValue || extrasValue == 'undefined' || typeof(extrasValue) == 'undefined' || extrasValue == ""){
//				console.log("popularService.id---->:"+popularService.id);
				if(popularService.id == "isGoMeFamily"){
					mainIndex.isGoMeFamily();
				}else{
					commomUtil.closeWebviewById(popularService.id);
					mui.openWindow({
						id : popularService.id,
						url : popularService.url
					});
				} 
			}else{
//				console.log("extrasValue---->:"+JSON.stringify(extrasValue));
				if(openType == 1){
					commomUtil.closeWebviewById(popularService.id);
					mui.openWindow({
						id : popularService.id,
						url : popularService.url,
						extras : extrasValue
					});
				}
			}
		}
	},
	locationPosition: function() {
//		if((new Date().getTime())-parseInt(plus.storage.getItem('positionTime')) < 1){
//			return false;
//		}
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
//		plus.storage.setItem("positionCity","");
		if (plus.geolocation) {
			plus.geolocation.getCurrentPosition(function(p) {
				plus.storage.setItem('positionTime', new Date().getTime()+"");
				var cityName = p.address.city;
				if(cityName != plus.storage.getItem("positionCity")){
					plus.nativeUI.confirm('您所在的城市为“'+cityName+'”，是否切换',function(e){
						if(e.index == 0){
							//切换成当前城市
							plus.storage.setItem("positionCity",p.address.city);
							plus.storage.setItem("locationCity",p.address.city);
							for (var i = 0; i < city.city.length; i++) {
								if (city.city[i].Name == p.address.city) {
									plus.storage.setItem("positionCityID", city.city[i].ID+"");
								}
							}
							if(isIOS){
								//经度
								plus.storage.setItem("positionLng",p.coords.longitude+""); 
								//纬度
								plus.storage.setItem("positionLat",p.coords.latitude+""); 
							}else{
//								console.log(p.coords.latitude+"<=coords=>"+p.coords.longitude)
								var wgs = {};
								wgs = GPS.bd_decrypt(p.coords.latitude,p.coords.longitude);
								wgs = GPS.gcj_decrypt_exact(wgs.lat,wgs.lon);
//								console.log(wgs.lon+"<-wgs->"+wgs.lat)
								//经度
								plus.storage.setItem("positionLng",wgs.lon+""); 
								//纬度
								plus.storage.setItem("positionLat",wgs.lat+""); 
//								setTimeout(function(){
//									console.log(plus.storage.getItem("positionLng")+"<-getItem->"+plus.storage.getItem("positionLat"))
//								},5000);
							}
						}
					},'切换城市',["切换","不切换"]);
				}
			}, function(error) {
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
				plus.storage.setItem("positionCity","上海市");
				for (var i = 0; i < city.city.length; i++) {
					if (city.city[i].Name == "上海市") {
						plus.storage.setItem("positionCityID", city.city[i].ID+"");
					}
				}
				//经度
				plus.storage.setItem("positionLng",0); 
				//纬度
				plus.storage.setItem("positionLat",0); 
			}, PositionOptions);
		} else {
			plus.storage.setItem("positionCity","上海市");
			for (var i = 0; i < city.city.length; i++) {
				if (city.city[i].Name == "上海市") {
					plus.storage.setItem("positionCityID", city.city[i].ID+"");
				}
			}
			//经度
			plus.storage.setItem("positionLng",0.0); 
			//纬度
			plus.storage.setItem("positionLat",0.0); 
			plus.nativeUI.alert("浏览器不兼容", "", "健医宝", "确认");
		}
	}
}

mui('#initPopularDivID').on('tap','li',function(){
	var inputs = this.querySelectorAll('input');
	mainIndex.initIndexPopularServceJumpEvent(inputs);
});
mui('#defaultPopularDivID').on('tap','li',function(){
	var inputs = this.querySelectorAll('input');
	mainIndex.initIndexPopularServceJumpEvent(inputs);
});
