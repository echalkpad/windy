var areaSearchId = "";
var keySearchWords = "";
var pageIndex = 1;
var pageSize = 10;
var total = 0;
var hospitalListHtml = "";
var areaName = "全国";
var districtList = new Array();
var cityList = new Array();
document.addEventListener('plusready', function() {
	//	//初始化市区信息列表
	slowExpertsList.areaLists();

	//加载下拉刷新事件
	document.addEventListener("plusscrollbottom", function() {
		if (total == pageSize) {
			pageIndex++;
			//初始化慢病专家医院列表
			slowExpertsList.hospitalList(areaSearchId, keySearchWords, pageIndex, pageSize);
		} else {
			return false;
		}
	});
});

document.addEventListener('keydown', function(event) {
	//键盘回车事件
	if (event.keyCode == 13) {
		slowExpertsList.searchHospitalList(areaSearchId);
	}
});

var areaListArray = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
var slowExpertsList = {
	areaLists: function() {
		jyapp.getApi({
			method: 'Treat/AreaLists',
			data: '',
			timeout: 10000,
			onsuccess: function(response) {
				//				console.log("AreaLists---->:"+JSON.stringify(response));
				if (response.code != 1) {
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return;
				} else {
					var areas = areaListArray.split(",");
					if (response && response.data && response.data.list && response.data.list.length > 0) {
						//初始化一级市的分类
						var areaList = new Array();
						for (var objs in response.data.list) {
							if (response.data.list[objs].FatherID == 0 && !areaList[response.data.list[objs].spell]) {
								areaList.push(response.data.list[objs].spell);
							}
						}
						//拿到所有一级市的集合
						var cityIdList = new Array();
						//初始化一级市
						var cityHtml = "";
						for (var i = 0; i < areaList.length; i++) {
							cityHtml += "<li class=\"mui-table-view-divider mui-indexed-list-group\">" + areaList[i] + "</li>";
							for (var objs in response.data.list) {
								if (response.data.list[objs].spell == areaList[i] && response.data.list[objs].FatherID == 0) {
									cityHtml += "<li class=\"mui-table-view-cell\"><a href=\"\">" + response.data.list[objs].Name;
									cityHtml += "<input type='hidden' value=" + response.data.list[objs].ID + " /></a></li>";
									cityIdList.push(response.data.list[objs].ID);
									cityList.push(response.data.list[objs]);
								}
							}
						}
						document.getElementById("areaSlowExpertsListId").innerHTML = cityHtml;
						//初始化区
						var districtHtml = '';
						for (var k in response.data.list) {
							if (cityIdList[0] == response.data.list[k].FatherID) {
								districtHtml += '<li><a href="">' + response.data.list[k].Name;
								districtHtml += '<input type="hidden" value="' + response.data.list[k].ID + '" /></a></li>';
							}
							districtList.push(response.data.list[k]);
						}
						document.getElementById('Doc-district').innerHTML = districtHtml;
					}
				}
				//初始化医院列表信息数据---->默认加载全国数据
				slowExpertsList.hospitalList("", "", 1, 10);
			},
			onerror: function(e) {
				console.log("areaLists:" + e);
			}
		});
	},
	hospitalList: function(areaId, keyWords, pageIndex, pageSize) {
		document.getElementById('slowExpertsListSearchID').blur();
		var requestHospital = "areaId=" + areaId + "&keyWords=" + keyWords + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
//		console.log("requestHospital---->:"+requestHospital);
		jyapp.getApi({
			method: 'Treat/Hospitals',
			data: requestHospital,
			timeout: 10000,
	   		showWaiting : true,
			onsuccess: function(response) {
//				 console.log("requestHospital---->:"+JSON.stringify(response));
				if (response.code != 1) {
					plus.nativeUI.alert(response.mag, '','健医宝', '确认');
					return false;
				} else {
					if (response.data != null && response.data.list != null && response.data.list.length > 0) {
						document.getElementById('slowExpertsListZanwuID').style.display = 'none';
						var dataValue = response.data.list;
						var agreeTime = commomUtil.getDateStr(30);
						total = dataValue.length;
						for (var i = 0; i < dataValue.length; i++) {
							hospitalListHtml += "<li class=\"mui-table-view-cell\" onclick=\"slowExpertsList.slowExpertsDoctorList('" + dataValue[i].Name + "','" + dataValue[i].ThirdID + "')\">";
							hospitalListHtml += "	<a class=\"mui-navigate-right\">";
							hospitalListHtml += "		<img src=\"" + dataValue[i].Pic + "\" onerror=\"this.src='../../img/default/pic_moren.png';this.onerror=null\"/>";
							hospitalListHtml += "		<section>";
							hospitalListHtml += "			<h3>" + dataValue[i].Name + "</h3>";
							hospitalListHtml += "			<p>" + dataValue[i].Address + "</p>";
							hospitalListHtml += "		</section>";
							hospitalListHtml += "	</a>";
							hospitalListHtml += "</li>";
						}
						document.getElementById("slowExpertsListID").innerHTML = hospitalListHtml;
					}else{
						document.getElementById("slowExpertsListID").innerHTML = '';
						document.getElementById('slowExpertsListZanwuID').style.display = 'block';
					}
				}
			},
			onerror: function(e) {
				document.getElementById("slowExpertsListID").innerHTML = '';
				document.getElementById('slowExpertsListZanwuID').style.display = 'block';
				console.log("hospitalList:" + e);
			}
		});
	},
	slowExpertsDoctorList: function(hospitalName, hospitalId) {
		mui.openWindow({
			id: 'SlowExpertsDoctorList',
			url: "SlowExpertsDoctorList.html",
			extras: {
				"hospitalId": hospitalId,
				"titleName": hospitalName,
				"areaName": areaName
			}
		});
	},
	areaListSelectedEvent: function(areaSearchId) {
		hospitalListHtml = '';
		if (!areaSearchId || typeof(areaSearchId) == "undefined" || areaSearchId == "-1") {
			areaSearchId = "";
		}
		var keyWords = document.getElementById("slowExpertsListSearchID").value;
		if (!keyWords || typeof(keyWords) == "undefined" || keyWords == "") {
			keyWords = "";
		}
		areaSearchId = areaSearchId;
		keySearchWords = keyWords;
		slowExpertsList.hospitalList(areaSearchId, keyWords, 1, 10);
	},
	searchHospitalList: function(areaSearchId) {
		hospitalListHtml = '';
		if (!areaSearchId || typeof(areaSearchId) == "undefined" || areaSearchId == "-1") {
			areaSearchId = "";
		}
		var keyWords = document.getElementById("slowExpertsListSearchID").value;
		if (!keyWords || typeof(keyWords) == "undefined" || keyWords == "") {
			keyWords = "";
		}
		areaSearchId = areaSearchId;
		keySearchWords = keyWords;
		slowExpertsList.hospitalList(areaSearchId, keyWords, 1, 10);
	}
}

mui("#areaSlowExpertsListId").on('click', 'li', function() {
	document.getElementById('Doc-district').innerHTML = '';
	var cityId = this.querySelectorAll('input')[0].value;
	areaName = this.querySelectorAll('a')[0].innerText;
	//初始化区
	var districtHtml = '';
//	console.log("districtList---->:"+JSON.stringify(districtList));
	for (var i = 0, len = districtList.length; i < len; i++) {
		if (districtList[i].FatherID == cityId) {
			districtHtml += '<li><a href="">' + districtList[i].Name;
			districtHtml += '<input type="hidden" value="' + districtList[i].ID + '" /></a></li>';
		}
	}
	document.getElementById('Doc-district').innerHTML = districtHtml;
});

mui("#Doc-district").on('click', 'li', function() {
	var districtId = this.querySelectorAll('input')[0].value;
	var districtName = this.querySelectorAll('a')[0].innerText;
	document.getElementById("slowExpertsListShowCityPicker").innerHTML = "<span id=\"slowExpertsListDistrictNameID\">" + districtName + "</span><label class='mui-icon-arrowdown'></label>";
	document.getElementById("slowExpertsListAreaCodeID").value = districtId;
	areaSearchId = districtId;
//	console.log("areaSearchId---->:"+areaSearchId);
	slowExpertsList.areaListSelectedEvent(districtId);
	mui('.search').popover('toggle');
	var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
	mask.show(); //显示遮罩
	mask.close(); //关闭遮罩
	if(areaName == "全国"){
		for(var s = 0;s < districtList.length;s++){
			if(districtId = districtList[s]){
				areaName = cityList[0].Name;
				break;
			}
		}
	}
});