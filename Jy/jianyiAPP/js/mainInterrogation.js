var detailPageMain = null;
document.addEventListener('plusready', function() {
//	commomUtil.closeWebviewById('SlowExpertsDetails');
	//初始化肿瘤专家推荐数据列表
	mainInterrogation.initInterrogationRecommend();
	//初始化慢病专家推荐数据列表
	mainInterrogation.initMainSlowRecommend();
	if(!plus.webview.getWebviewById('SlowExpertsDetails')){
		//初始化预加载详情页面
		mui.preload({
			url: '../html/SlowExperts/SlowExpertsDetails.html',
			id: 'SlowExpertsDetails'
		});
	}
});

var mainInterrogation = {
	initInterrogationRecommend: function() {
		jyapp.getApi({
			method: 'Tumour/RecommendDoctor',
			timeout: 10000,
			onsuccess: function(response) {
				var htmlInterrogationRecommend = "";
				if(response.data && response.data.list && response.data.list.length > 0){
					for (var i = 0; i < response.data.list.length; i++) {
						document.getElementById("maincancerImgzwsj").style.display = "none";
						var data = response.data.list[i];
						var name = data.Name ? data.Name : "";
						var title = data.Title ? data.Title : "";
						var hospitalName = data.HospitalName ? data.HospitalName : "";
						var departmentName = data.departmentName ? data.departmentName : "";
						htmlInterrogationRecommend += "	<li>";
						htmlInterrogationRecommend += "		<a href=\"\">";
						htmlInterrogationRecommend += "<input type='hidden' value=" + data.ID + " />";
						htmlInterrogationRecommend += "			<p><img src=\"" + data.Pic + "\" alt=\"\"  onerror=\"this.src='../img/default/yisheng_touxiang.png';this.onerror=null\" /></p>";
						htmlInterrogationRecommend += "			<h2>" + name + "</h2>";
						htmlInterrogationRecommend += "			<h3>" + title + "</h3>";
						htmlInterrogationRecommend += "			<h3 class=\"mui-ellipsis\">" + hospitalName + "</h3>"; /*Skilled*/
						htmlInterrogationRecommend += "			<h3>" + departmentName + "</h3>";
						htmlInterrogationRecommend += "		</a>";
						htmlInterrogationRecommend += "	</li>";
					}
				}else{
					document.getElementById("maincancerImgzwsj").style.display = 'block';
				}
				document.getElementById("mainInterrogationFeatureId").innerHTML = htmlInterrogationRecommend;
			},
			onerror: function(e) {
				console.log("initInterrogationRecommend:" + e);
				//				var htmlInterrogationRecommend = "";
				//				htmlInterrogationRecommend += "<div class=\"title\">";
				//				htmlInterrogationRecommend += "肿瘤专家推荐";
				//				htmlInterrogationRecommend += "</div>";
				//				htmlInterrogationRecommend += "<ul>";
				//				htmlInterrogationRecommend += "</ul>";
				//				document.getElementById("initInterrogationRecommendID").innerHTML = htmlInterrogationRecommend;
			}
		});
	},
	initMainSlowRecommend: function() {
		var agreeTime = commomUtil.getDateStr(30);
		var requestMainSlowExperts = 'hospitalId=&diseaseId=&areaId=&areaType=0&agreeTimeType=2&agreeTime="' + agreeTime + '"&sortType=&searchKey=&pageIndex=1&pageSize=4';
//		console.log("initMainSlowRecommend---->:"+requestMainSlowExperts);
		jyapp.getApi({
			method: 'Treat/Doctors',
			data: requestMainSlowExperts,
			timeout: 10000,
			showWaiting:true,
			onsuccess: function(response) {
//				console.log("initMainSlowRecommend---->:"+JSON.stringify(response));
				var html = '';
				if(response.code != 1){
					document.getElementById("mainShowImgzwsj").style.display = 'block';
				}else{
					var dataValues = response.data;
					if (dataValues != null) {
						document.getElementById("mainShowImgzwsj").style.display = "none";
						for (var i = 0; i < dataValues.length; i++) {
							html += '<li><a href="">';
							html += '<input type="hidden" value="' + dataValues[i].id + '" />';
							html += '<p><img src=' + dataValues[i].logoUrl + ' alt="" onerror="this.src=\'../img/default/yisheng_touxiang.png\';this.onerror=null"/></p>';
							html += '<h2>' + dataValues[i].name + '</h2>';
							html += '<h3>' + dataValues[i].title + '</h3>';
							html += '<h3 class="mui-ellipsis">' + dataValues[i].hospitaltName + '</h3>';
							html += '<h3>' + dataValues[i].departmentName + '</h3>';
							html += '</a></li>';
						}
					} else {
						document.getElementById("mainShowImgzwsj").style.display = 'block';
					}
				}
				document.getElementById("mainSlowRecommendDoctorID").innerHTML = html;
			},
			onerror: function(e) {
				console.log("initMainSlowRecommend:" + e);
				document.getElementById("mainSlowRecommendDoctorID").innerHTML = '';
				document.getElementById("mainShowImgzwsj").style.display = 'block';
			}
		});
	},
	openCancerExperts : function(){
		mui.openWindow({
			id: 'cancerExperts',
			url: "../html/cancerExperts/cancerExperts.html",
		});
	},
	openfamilyDoctor : function(){
//		plus.webview.close(plus.webview.getWebviewById("indexFamilyDoctor"));
		mui.openWindow({
			id: 'indexFamilyDoctor',
			url: "../html/familyDoctor/indexFamilyDoctor.html",
//			createNew: true
		});
	}
}

//添加肿瘤专家推荐点击事件到详情页面
mui("#mainInterrogationFeatureId").on("tap", "li", function(e) {
	var cancerOrderId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'cancerExpertsDetails',
		url: "../html/cancerExperts/cancerExpertsDetails.html",
		createNew: true,
		extras: {
			doctorId: cancerOrderId
		}
	});
});
//添加列表项的点击事件
mui('#mainSlowRecommendDoctorID').on('tap', 'li', function(e) {
	var slowExpertsId = this.querySelectorAll('input')[0].value;
	//获得详情页面
	if (!detailPageMain) {
		detailPageMain = plus.webview.getWebviewById('SlowExpertsDetails');
	}
	//触发详情页面的newsId事件
	mui.fire(detailPageMain, 'mainInterrLoadSlowExpertsList', {
		slowExpertsIdMainInterr: slowExpertsId
	});
	//打开详情页面          
	mui.openWindow({
		id: 'SlowExpertsDetails',
		url: '../html/SlowExperts/SlowExpertsDetails.html'
	});
});
//绑定肿瘤功能事件
document.getElementById("cancerExperts").addEventListener("tap",mainInterrogation.openCancerExperts);
//绑定家庭医生事件
document.getElementById("mainInterrogationfamilyDoctor").addEventListener("tap",mainInterrogation.openfamilyDoctor);
