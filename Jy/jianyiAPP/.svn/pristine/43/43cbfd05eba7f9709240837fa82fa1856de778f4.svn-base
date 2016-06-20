document.addEventListener('plusready', function() {
//	commomUtil.closeWebviewById('SlowExpertsDetails');
	//初始化慢病专家热门活动
	slowExperts.initSlowExperts();
	//初始化Banner
	slowExperts.initSliderBanner();
	if (!plus.webview.getWebviewById('SlowExpertsDetails')) {
		//初始化预加载详情页面
		mui.preload({
			url: 'SlowExpertsDetails.html',
			id: 'SlowExpertsDetails'
		});
	}
});

var slowExperts = {
	initSlowExperts: function() {
		var agreeTime = commomUtil.getDateStr(30);
		var requestData = "hospitalId=&diseaseId=&areaId=&areaType=1&agreeTimeType=2&agreeTime='" + agreeTime + "'&sortType=0&searchKey=&pageIndex=1&pageSize=4";
		jyapp.getApi({
			method: 'Treat/Doctors',
			data: requestData,
			timeout: 10000,
			onsuccess: function(response) {
//				console.log('-' + JSON.stringify(response))
				var html = "<h2>热门活动</h2>";
				var htmlRec = "<h2>推荐医师</h2>";
				if (response.code != 1) {
					document.getElementById('slowExpertsHavZanwuID').style.display = 'block';
					document.getElementById('slowExpertsRecZanwuID').style.display = 'block';
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					var dataValue = response.data;
					if (dataValue != null && dataValue.length > 0) {
						document.getElementById('slowExpertsHavZanwuID').style.display = 'none';
						document.getElementById('slowExpertsRecZanwuID').style.display = 'none';
						for (var i = 0; i < dataValue.length; i++) {
							var name = dataValue[i].name ? dataValue[i].name : "--";
							var title = dataValue[i].title ? dataValue[i].title : "--";
							var hospitaltName = dataValue[i].hospitaltName ? dataValue[i].hospitaltName : "--";
							var departmentName = dataValue[i].departmentName ? dataValue[i].departmentName : "--";
							var appointmentNumber = dataValue[i].appointmentNumber ? dataValue[i].appointmentNumber : "0";
							var price = dataValue[i].price ? dataValue[i].price : "0";
							if (i == 0) {
								htmlRec += "<li class=\"mui-table-view-cell\">";
								htmlRec += "	<a href=\"\">";
								htmlRec += "	<input id=\"slowExpertsHavInputId\" type=\"hidden\" value=" + dataValue[i].id + " />";
								htmlRec += "		<img src=" + dataValue[i].logoUrl + " onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\"/>";
								htmlRec += "		<section>";
								htmlRec += "			<h3>" + name + "&nbsp;" + title + "</h3>";
								htmlRec += "			<p>" + hospitaltName + "&nbsp;" + departmentName + "<span>预约量：<small>" + appointmentNumber + "</small></span></p>";
								htmlRec += "			<strong>" + price + "<em>元</em></strong>";
								htmlRec += "		</section>";
								htmlRec += "	</a>";
								htmlRec += "</li>";
							}
							html += "<li class=\"mui-table-view-cell\">";
							html += "	<a href=\"\">";
							html += "	<input id=\"slowExpertsHavInputId\" type=\"hidden\" value=" + dataValue[i].id + " />";
							html += "		<img src=" + dataValue[i].logoUrl + " onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\"/>";
							html += "		<section>";
							html += "			<h3>" + name + "&nbsp;" + title + "</h3>";
							html += "			<p>" + hospitaltName + "&nbsp;" + departmentName + "<span>预约量：<small>" + appointmentNumber + "</small></span></p>";
							html += "			<strong>" + price + "<em>元</em></strong>";
							html += "		</section>";
							html += "	</a>";
							html += "</li>";
						}
						//热门活动
						document.getElementById("slowExpertsHavId").innerHTML = html;
						//推荐医生
						document.getElementById("slowExpertsRecId").innerHTML = htmlRec;
					} else {
						document.getElementById('slowExpertsHavZanwuID').style.display = '';
						document.getElementById('slowExpertsRecZanwuID').style.display = '';
					}
				}

				//滑动
				mui('.mui-scroll-wrapper').scroll({
					deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				});

			},
			onerror: function(e) {
				console.log("initSlowExperts:" + e);
				//热门活动
				document.getElementById("slowExpertsHavId").innerHTML = '';
				document.getElementById('slowExpertsHavZanwuID').style.display = 'block';
				//推荐医生
				document.getElementById("slowExpertsRecId").innerHTML = '';
				document.getElementById('slowExpertsRecZanwuID').style.display = 'block';
			}
		});
	},
	initSliderBanner: function() {
		var requestPictures = "flag=nzjmz";
		jyapp.getApi({
			method: 'Comment/Pictures',
			data: requestPictures,
			timeout: 10000,
			onsuccess: function(response) {
				//				console.log("initSliderBanner---->:"+JSON.stringify(response));
				if (response.code != 1) {
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return;
				} else {
					if (response.data != null && response.data.list != null && response.data.list.length > 0) {
						var _dataValues = response.data;
						//						console.log("_dataValues---->:"+JSON.stringify(_dataValues));
						if (_dataValues.list[_dataValues.list.length - 1].URL == '' || _dataValues.list[0].URL == '') {
							_dataValues.list[_dataValues.list.length - 1].URL = null;
							_dataValues.list[0].URL = null;
						}
						_dataValues.list[0].lastDescription = _dataValues.list[_dataValues.list.length - 1].Description;
						_dataValues.list[0].lastPic = _dataValues.list[_dataValues.list.length - 1].Pic;
						_dataValues.list[0].lastURL = _dataValues.list[_dataValues.list.length - 1].URL;
						_dataValues.list[_dataValues.list.length - 1].firstDescription = _dataValues.list[0].Description;
						_dataValues.list[_dataValues.list.length - 1].firstPic = _dataValues.list[0].Pic;
						_dataValues.list[_dataValues.list.length - 1].firstURL = _dataValues.list[0].URL;
						var _tpl = document.getElementById('_tpl').innerHTML;

						document.getElementById('slowBannerDivID').innerHTML = juicer(_tpl, _dataValues);
						var _tpl2 = document.getElementById('_tpl2').innerHTML;
						document.getElementById('slowBannerDiv2ID').innerHTML = juicer(_tpl2, _dataValues);
						//获得slider插件对象
						mui('.mui-slider').slider({
							interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
						});
					}
				}
			},
			onerror: function(e) {
				console.log("initSliderBanner:" + e);
			}
		});
	},
	rebackMainInterrogation: function() {
		var mianPage = plus.webview.getLaunchWebview();
		mui.openWindow({
			id: mianPage.id,
			url: mianPage.uri,
			extras: {
				index: 1
			}
		});
	}
}

var detailPage = null;
//添加列表项的点击事件
mui('#SlowExpertsDetails').on('tap', 'li', function(e) {
	var slowExpertsId = this.querySelectorAll('input')[0].value;
	//获得详情页面
	if (!detailPage) {
		detailPage = plus.webview.getWebviewById('SlowExpertsDetails');
	}
	//触发详情页面的newsId事件
	mui.fire(detailPage, 'loadSlowExpertsList', {
		slowExpertsIdList: slowExpertsId
	});
	//打开详情页面          
	mui.openWindow({
		id: 'SlowExpertsDetails',
		url: "SlowExpertsDetails.html"
	});
});

//慢病专家-订单详情
document.getElementById("goSlowOrderList").addEventListener("click", function() {
	mui.openWindow({
		id: 'slowOrderList',
		url: "slowOrderList.html",
	});
});

//绑定回退事件
document.getElementById("rebackMainInterrogationID").addEventListener("click", slowExperts.rebackMainInterrogation);
//绑定手机虚拟回退键
//mui.back = function(e){
//	slowExperts.rebackMainInterrogation();
//}