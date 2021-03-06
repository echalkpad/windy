document.addEventListener('plusready', function() {
//	commomUtil.closeWebviewById('SlowExpertsDetails');
	//初始化推荐医院
	slowExpertsSearch.searchHospitalsRecommend("",1,4);
	//初始化推荐医生
	slowExpertsSearch.searchDoctorsRecommend("");
	if(!plus.webview.getWebviewById('SlowExpertsDetails')){
		//初始化预加载详情页面
		mui.preload({
			url: 'SlowExpertsDetails.html',
			id: 'SlowExpertsDetails'
		});
	}
});

document.addEventListener('keyup', function(event) {
	//键盘回车事件
	if(event.keyCode == 13){
		var searchWord = document.getElementById("searchSlowExpertsID").value;
		if(!searchWord || typeof(searchWord) == "undefined" || searchWord == ""){
			searchWord = "";
		}
		document.getElementById("searchSlowExpertsID").blur();
		//查询推荐医院
		slowExpertsSearch.searchHospitalsRecommend(searchWord,1,4);
		//查询推荐医生
		slowExpertsSearch.searchDoctorsRecommend(searchWord);
		var html = "<input type=\"text\" name=\"\" id=\"searchSlowExpertsID\" placeholder=\"请输入医院名、医生名或特色等\" value="+searchWord+" />";
		document.getElementById("searchSlowExpertsID").innerHTML = html;
	}
});

var slowExpertsSearch = {
	searchHospitalsRecommend : function(keyWords,pageIndex,pageSize){
		var requestSearchHospital = "areaId=&keyWords="+keyWords+"&pageIndex="+pageIndex+"&pageSize="+pageSize;
		jyapp.getApi({
   			method: 'Treat/Hospitals',
   			data:requestSearchHospital,
   			timeout : 10000,
	   		showWaiting : true,
   			onsuccess: function(response) {
				var html = "";
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data != null && response.data.list != null && response.data.list.length > 0){
						document.getElementById('searchSlowExpertsHospitalsDataNoneID').style.display = 'none';
						var dataValue = response.data.list;
						var agreeTime = commomUtil.getDateStr(30);
						for(var i=0;i<dataValue.length;i++){
							html += "<li class=\"mui-table-view-cell\" onclick=\"slowExpertsSearch.slowExpertsSearchDoctorList('"+dataValue[i].ThirdID+"','"+dataValue[i].Name+"')\">";
							html += "	<a href=\"\">";
							html += "		<img src=\""+dataValue[i].Pic+"\" onerror=\"this.src='../../img/default/pic_moren.png';this.onerror=null\"/>";
							html += "		<section>";
							html += "			<h3>"+dataValue[i].Name+"</h3>";
							html += "			<p>"+dataValue[i].Grade+"&nbsp;特色： "+dataValue[i].Grade+"<span>预约量：<small>"+dataValue[i].OrderCount+"</small></span></p>";
							html += "		</section>";
							html += "	</a>";
							html += "</li>";
						}
						document.getElementById("searchSlowExpertsHospitalsID").innerHTML = html;
					}else{
						document.getElementById("searchSlowExpertsHospitalsID").innerHTML = '';
						document.getElementById('searchSlowExpertsHospitalsDataNoneID').style.display = 'block';
						return false;
					}
				}
   			},
   			onerror: function(e) {
				document.getElementById("searchSlowExpertsHospitalsID").innerHTML = '';
				document.getElementById('searchSlowExpertsHospitalsDataNoneID').style.display = 'block';
   				console.log("hospitalsRecommend:"+e);
   			}
   		});
	},
	slowExpertsSearchDoctorList : function(hospitalId,hospitalName){
		mui.openWindow({
			id: 'SlowExpertsDoctorList',
			url: "SlowExpertsDoctorList.html",
			extras: {
				"hospitalId" : hospitalId,
				"titleName" : hospitalName,
				"areaName" : "全国"
			}
		})
	},
	searchDoctorsRecommend : function(searchKey){
		var agreeTime = commomUtil.getDateStr(30);
		var requestDoctorsRecommend = "hospitalId=&diseaseId=&areaId=&areaType=1&agreeTimeType=2&agreeTime="+agreeTime+"&sortType=0&searchKey="+searchKey+"&pageIndex=1&pageSize=4";
		jyapp.getApi({
   			method: 'Treat/Doctors',
   			data:requestDoctorsRecommend,
   			timeout : 10000,
   			onsuccess: function(response) {
// 				console.log("searchDoctorsRecommend---->:"+JSON.stringify(response));
				var html = "";
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					var dataValue = response.data;
					if(dataValue != null && dataValue.length > 0){
						document.getElementById('searchSlowExpertsDoctorsDataNoneID').style.display = 'none';
						for(var i=0;i<dataValue.length;i++){
							var name = dataValue[i].name ? dataValue[i].name : "--";
							var title = dataValue[i].title ? dataValue[i].title : "--";
							var hospitaltName = dataValue[i].hospitaltName ? dataValue[i].hospitaltName : "--";
							var departmentName = dataValue[i].departmentName ? dataValue[i].departmentName : "--";
							var appointmentNumber = dataValue[i].appointmentNumber ? dataValue[i].appointmentNumber : "0";
							var price = dataValue[i].price ? dataValue[i].price : "0";
							html += "<li class=\"mui-table-view-cell\">";
							html += "	<a href=\"\">";
							html += "	<input type=\"hidden\" value="+dataValue[i].id +" />";
							html += "		<img src="+dataValue[i].logoUrl+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\"/>";
							html += "		<section>";
							html += "			<h3>"+name+"&nbsp;"+title+"</h3>";
							html += "			<p>"+hospitaltName+"&nbsp;"+departmentName+"<span>预约量：<small>"+appointmentNumber+"</small></span></p>";
							html += "			<strong>"+price+"<em>元</em></strong>";
							html += "		</section>";
							html += "	</a>";
							html += "</li>";
						}
						//推荐医生
						document.getElementById("searchSlowExpertsDoctorsID").innerHTML = html;
					}else{
						document.getElementById("searchSlowExpertsDoctorsID").innerHTML = '';
						document.getElementById('searchSlowExpertsDoctorsDataNoneID').style.display = 'block';
						return false;
					}
				}
   			},
   			onerror: function(e) {
				document.getElementById("searchSlowExpertsDoctorsID").innerHTML = '';
				document.getElementById('searchSlowExpertsDoctorsDataNoneID').style.display = 'block';
   				console.log("doctorsRecommend:"+e);
   			}
   		});
	}
}
 
var detailPageSearch = null;
//添加列表项的点击事件
mui('#searchSlowExpertsDoctorsID').on('tap', 'li', function(e) {
	var slowExpertsId = this.querySelectorAll('input')[0].value;
	//获得详情页面
	if (!detailPageSearch) {
		detailPageSearch = plus.webview.getWebviewById('SlowExpertsDetails');
	}
	//触发详情页面的newsId事件
	mui.fire(detailPageSearch, 'loadSlowExpertsListSearch', {
		slowExpertsIdSearch: slowExpertsId
	});
	//打开详情页面          
	mui.openWindow({
		id: 'SlowExpertsDetails',
		url: "SlowExpertsDetails.html"
	});
});