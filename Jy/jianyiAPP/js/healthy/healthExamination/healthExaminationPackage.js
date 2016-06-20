var packageId = '';
var itemList = {};
var packageInfo = {};
var PriceList = {};
//是否从网点击进入
var isFromStore = false;
var itemTotal = 0;
var problemTotal = 0;
var problems = {};
var evaluationTotal = 0;
var evaluations = {};
var isCheckType = false;
var backid = "";
var backurl = "";
//初始化
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	packageId = self.packageId;
	var StoreId = self.StoreId;
	backid = self.backid ? self.backid : "0";
	backurl = self.backurl ? self.backurl : "0";
	if(StoreId && typeof(StoreId) != "undefined" && StoreId != "" && StoreId != "undefined"){
		isFromStore = true;
		packageInfo.StoreId = self.StoreId;
		packageInfo.ShortName = self.ShortName;
		packageInfo.Address = self.Address;
		packageInfo.Lng = self.Lng;
		packageInfo.Lat = self.Lat;
		document.getElementById('healthExaminationPackageNetChooseID').innerText = self.ShortName;
	}
	if(self.isCheckType && typeof(self.isCheckType) != "undefined" && self.isCheckType != "" && self.isCheckType != 'undefined'){
		isCheckType = self.isCheckType;
	}
	if(self.netName && typeof(self.netName) != "undefined" && self.netName != "" && self.netName != 'undefined'){
		document.getElementById('fixbottomDivID').style.display = 'none';
		document.getElementById('healthExaminationPackageNetChooseID').innerText = self.netName;
	}else{
		document.getElementById('fixbottomDivID').style.display = 'block';
	}
	if(self.buyChoose && typeof(self.buyChoose) != "undefined" && self.buyChoose != "" && self.buyChoose != 'undefined'){
		document.getElementById('healthExaminationPackageBuyResult').innerText = self.buyChoose != "不分男女" ? self.buyChoose : "无";
	}
	//初始化套餐详情页面
	healthExaminationPackage.initHealthExaminationPackage();
});

window.addEventListener('chooseNetRefresh',function(event){
//	测试使用网点ID：782  ShortName：瑞慈体检-国定路店      Address：国定路323号创业大厦13楼    "Lng":121.50913 "Lat":31.296307
	packageInfo.StoreId = event.detail.StoreId;
	packageInfo.ShortName = event.detail.ShortName;
	packageInfo.Address = event.detail.Address;
	packageInfo.Lng = event.detail.Lng;
	packageInfo.Lat = event.detail.Lat;
	document.getElementById('healthExaminationPackageNetChooseID').innerText = event.detail.ShortName;
	//关闭网点选择页面
	commomUtil.closeWebviewById('healthExaminationNet');
});

window.addEventListener('closeBeforePage',function(event){
	var pageId = event.detail.pageId;
	//关闭上一次打开无需刷新当前的页面
	commomUtil.closeWebviewById(pageId);
});

var healthExaminationPackage = {
	initHealthExaminationPackage : function(){
		//初始化套餐详情banner
		healthExaminationPackage.initPackageBanner();
		//初始化套餐详情数据
		healthExaminationPackage.initPackageDetails();
	},
	selectInit : function() {
		//购买选择
		var chooseBuy = new mui.PopPicker();
		var chooseBuyData = new Array();
		var isChooseBuy = true;
		/*PriceList[i].PriceCode的使用建立在后台数据库这个值不变的情况，应该是一个类型value值（与大小类的配置一致），保持不变*/
		for(var i = 0;i < PriceList.length; i++){
			var chooseBuyDatas = {};
			chooseBuyDatas.value = PriceList[i].PriceCode;
			if(PriceList[i].PriceCode == 'notAtAll'){
				isChooseBuy = false;
				chooseBuyDatas.text = "无";
			}else{
				chooseBuyDatas.text = PriceList[i].PriceType;
			}
			chooseBuyData[i] = chooseBuyDatas;
		}
		chooseBuy.setData(chooseBuyData);
		var ohealthExaminationPackageBuy = document.getElementById('healthExaminationPackageBuy');
		var ohealthExaminationPackageBuyResult = document.getElementById('healthExaminationPackageBuyResult');
		if(isChooseBuy && !isCheckType){
			ohealthExaminationPackageBuy.addEventListener('tap', function(event) {
				chooseBuy.show(function(items) {
					var s = JSON.stringify(items[0].text);
					s = s.replace("\"", "").replace("\"", "");
					var priceCode = JSON.stringify(items[0].value);
					priceCode = priceCode.replace("\"", "").replace("\"", "");
					ohealthExaminationPackageBuyResult.innerText = s;
					document.getElementById('healthExaminationPackageBuyResult').innerText = s;
					ohealthExaminationPackageBuyResult.setAttribute('chooseBuyId', priceCode);
					if(PriceList.length > 0){
						for(var k = 0;k < PriceList.length; k++){
							if(PriceList[k].PriceCode == priceCode){
								document.getElementById('healthExaminationPackageBuyPriceID').value = PriceList[k].ID;
							}
						}
					}
				});
			}, false);
		}
	},
	initPackageBanner : function(){
		var requestPackageBanner = "packageId="+packageId;
		jyapp.getApi({
			method: 'HealthExamination/PackageBanner',
			data:requestPackageBanner,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("initPackageBanner---->:"+JSON.stringify(response));
				var htmlBannerSlder = '';
				var htmlBannerSlderPoint = '';
				if(response.code != 1){
					document.getElementById('detailPackageBannerPid').style.display = 'block';
				}else{
					if(response.data && response.data.length > 0){
						document.getElementById('detailPackageBannerPid').style.display = 'none';
						var dataValues = response.data;
						htmlBannerSlder += '<div class="mui-slider-item">';
						htmlBannerSlder += '	<input type="hidden" value="'+dataValues[dataValues.length-1].URL+'" />';
						htmlBannerSlder += '	<input type="hidden" value="'+dataValues[dataValues.length-1].Description+'" />';
						htmlBannerSlder += '	<a href="#">';
						htmlBannerSlder += '		<img src="'+dataValues[dataValues.length-1].Pic+'">';
						htmlBannerSlder += '	</a>';
						htmlBannerSlder += '</div>';
						for(var i = 0; i < dataValues.length; i++){
							htmlBannerSlder += '<div class="mui-slider-item">';
							htmlBannerSlder += '	<input type="hidden" value="'+dataValues[i].URL+'" />';
							htmlBannerSlder += '	<input type="hidden" value="'+dataValues[i].Description+'" />';
							htmlBannerSlder += '	<a href="#">';
							htmlBannerSlder += '		<img src="'+dataValues[i].Pic+'">';
							htmlBannerSlder += '	</a>';
							htmlBannerSlder += '</div>';
							if(dataValues.length == 1){
								htmlBannerSlderPoint += '<div class="mui-indicator mui-active"></div>';
							}else{
								if(i == 0){
									htmlBannerSlderPoint += '<div class="mui-indicator mui-active"></div>';
								}else{
									htmlBannerSlderPoint += '<div class="mui-indicator"></div>';
								}
							}
						}
						htmlBannerSlder += '<div class="mui-slider-item mui-slider-item-duplicate">';
						htmlBannerSlder += '	<input type="hidden" value="'+dataValues[0].URL+'" />';
						htmlBannerSlder += '	<input type="hidden" value="'+dataValues[0].Description+'" />';
						htmlBannerSlder += '	<a href="#">';
						htmlBannerSlder += '		<img src="'+dataValues[0].Pic+'">';
						htmlBannerSlder += '	</a>';
						htmlBannerSlder += '</div>';
					}else{
						document.getElementById('detailPackageBannerPid').style.display = 'block';
					}
				}
				document.getElementById('detailPackageBannerSlderID').innerHTML = htmlBannerSlder;
				document.getElementById('detailPackageBannerSlderPointID').innerHTML = htmlBannerSlderPoint;
				//获得slider插件对象
				mui('.mui-slider').slider({
					interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
				});
			},
			onerror: function(e) {
				var htmlBannerSlder = '';
				var htmlBannerSlderPoint = '';
				document.getElementById('detailPackageBannerPid').style.display = 'block';
				document.getElementById('detailPackageBannerSlderID').innerHTML = htmlBannerSlder;
				document.getElementById('detailPackageBannerSlderPointID').innerHTML = htmlBannerSlderPoint;
				console.log("healthExamination:" + e);
			}
		});
	},
	initPackageDetails : function(){
		var requestPackageDetails = "packageId="+packageId;
		jyapp.getApi({
			method: 'HealthExamination/PackageDetails',
			data:requestPackageDetails,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("initPackageDetails---->:"+JSON.stringify(response));
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data){
						var dataValues = response.data;
						if(response.data.Entity){
							var Entity = response.data.Entity;
							packageInfo.PackageId = Entity.ID;
							packageInfo.PackageName = Entity.PackageName;
							document.getElementById('healthExaminationPackageNetStoreID').value = Entity.OrganizationId;
							document.getElementById('detailPackageNameHID').innerHTML = Entity.PackageName;
							document.getElementById('detailStoreNameSID').innerHTML = Entity.OrganizationShortName;
							document.getElementById('detailPackageSummaryArtID').innerHTML = Entity.Summary;
						}
						if(dataValues.PriceList && dataValues.PriceList.length > 0){
							PriceList = dataValues.PriceList;
							var htmlOriginalPrice = '';
							var htmlPresentPrice = '';
							for(var i = 0;i < PriceList.length; i++){
								if(PriceList[i].PriceCode == 'notAtAll'){
									var ohepBuyResult = document.getElementById('healthExaminationPackageBuyResult');
									ohepBuyResult.innerText = "无";
									ohepBuyResult.setAttribute('chooseBuyId', PriceList[i].PriceCode);
									document.getElementById('healthExaminationPackageBuyPriceID').value = PriceList[i].ID;
									htmlOriginalPrice += '<p><del></del><del>¥'+PriceList[i].OriginalPrice+'</del></p>';
									htmlPresentPrice += '<p><span class="red">¥'+PriceList[i].PresentPrice+'</span></p>';
								}else{
									htmlOriginalPrice += '<p><del>'+PriceList[i].PriceType+'</del><del>¥'+PriceList[i].OriginalPrice+'</del></p>';
									htmlPresentPrice += '<p>'+PriceList[i].PriceType+'<span class="red">¥'+PriceList[i].PresentPrice+'</span></p>';
								}
							}
							document.getElementById('detailPackageOriginalPriceID').innerHTML = htmlOriginalPrice;
							document.getElementById('detailPackagePresentPriceID').innerHTML = htmlPresentPrice;
							//初始化选择框
							healthExaminationPackage.selectInit();
						}
						if(dataValues.ItemList && dataValues.ItemList.length > 0){
							itemTotal = dataValues.ItemList.length
							itemList = dataValues.ItemList;
						}
						document.getElementById('healthExaminationPackageTestItemsAID').innerHTML = "<img src=\"../../../img/healthy/icon_jiancexiangmu.png\" alt=\"\" />体检项目("+itemTotal+")";
					}
					//初始化常见问题
					healthExaminationPackage.initProblems();
					//初始化历史评论
					healthExaminationPackage.initEvaluations();
				}
			},
			onerror: function(e) {
				console.log("healthExamination:" + e);
			}
		});
	},
	initProblems : function(){
		var requestHEPCommonQuestions = 'packageId='+packageId;
		jyapp.getApi({
			method: 'HealthExamination/CommonQuestions',
			data:requestHEPCommonQuestions,
			timeout: 10000,
			onsuccess: function(response) {
//				console.log("initProblems---->:"+JSON.stringify(response));
				problems = response.data;
				if(response.data && response.data.length > 0){
					problemTotal = response.data.length;
				}
				document.getElementById('healthExaminationPackageProblemsAID').innerHTML = "<img src=\"../../../img/healthy/icon_changjianwenti.png\" alt=\"\" />常见问题("+problemTotal+")";
			},
			onerror: function(e) {
				console.log("initHEPCommonQuestions:" + e);
			}
		});
	},
	initEvaluations : function(){
		var requestHEPCommentList = 'packageId='+packageId;
		jyapp.getApi({
			method: 'HealthExamination/CommentList',
			data:requestHEPCommentList,
			timeout: 10000,
			onsuccess: function(response) {
//				console.log("initEvaluations---->:"+JSON.stringify(response));
				evaluations = response.data;
				if(response.data && response.data.length > 0){
					evaluationTotal = response.data.length;
				}
				document.getElementById('healthExaminationPackageEvaluationAID').innerHTML = "<img src=\"../../../img/healthy/icon_jiancexiangmu.png\" alt=\"\" />历史评价("+evaluationTotal+")";
			},
			onerror: function(e) {
				console.log("initHEPCommentList:" + e);
			}
		});
	},
	rebackHealthExamination: function() {
		var config = {};
		if(backid && typeof(backid) != 'undefined' && backurl && backurl != "0"){
			config = {
				id : backid,
				url : backurl,
			}
		}else{
			config = {
				id : "healthExamination",
				url : "healthExamination.html"
			}
		}
		jyapp.backWebView(config);
	}
}

//检测项目
mui('.mui-table-view').on('click', '#healthExaminationPackageTestItems', function() {
	if(itemList.length > 0){
		commomUtil.closeWebviewById('healthExaminationPackageTestItems');
		mui.openWindow({
			id: 'healthExaminationPackageTestItems',
			url: "healthExaminationPackageTestItems.html",
			extras:{
				itemList : itemList
			}
		});
	}
});
//常见问题
mui('.mui-table-view').on('click', '#healthExaminationPackageProblems', function() {
	if(problemTotal > 0){
		commomUtil.closeWebviewById('healthExaminationPackageProblems');
		mui.openWindow({
			id: 'healthExaminationPackageProblems',
			url: "healthExaminationPackageProblems.html",
			extras:{
				packageId : packageId
			}
		});
	}
});
//历史评价
mui('.mui-table-view').on('click', '#healthExaminationPackageEvaluation', function() {
	if(evaluations && evaluations.length > 0){
		commomUtil.closeWebviewById('healthExaminationPackageEvaluation');
		mui.openWindow({
			id: 'healthExaminationPackageEvaluation',
			url: "healthExaminationPackageEvaluation.html",
			extras:{
				packageId : packageId
			}
		});
	}
});
//网点选择
mui('.mui-table-view').on('click', '#healthExaminationPackageNet', function() {
	if(!isFromStore && !isCheckType){
		commomUtil.closeWebviewById('healthExaminationNet');
		var organizationId = document.getElementById('healthExaminationPackageNetStoreID').value;
		mui.openWindow({
			id: 'healthExaminationNet',
			url: "healthExaminationNet.html",
			extras: {
				organizationId : organizationId
			}
		});
	}
});
//立即预约
mui('body').on('click', '#healthExaminationInformation', function() {
	commomUtil.closeWebviewById('healthExaminationInformation');
	var packagePriceID = document.getElementById('healthExaminationPackageBuyPriceID').value;
	if(!packagePriceID || typeof(packagePriceID) == 'undefined' || packagePriceID == ""){
		plus.nativeUI.alert('请选择购买选择','','健医宝','确认');
		return false;
	}
	packageInfo.packagePriceID = packagePriceID;
	if(!packageInfo.StoreId || typeof(packageInfo.StoreId) == 'undefined' || packageInfo.StoreId == ""){
		plus.nativeUI.alert('请选择网点选择','','健医宝','确认');
		return false;
	}
	mui.openWindow({
		id: 'healthExaminationInformation',
		url: "healthExaminationInformation.html",
		extras: {
			packageInfo : packageInfo
		}
	});
});

//绑定回退按钮事件
document.getElementById('hepkgBackAID').addEventListener('click',healthExaminationPackage.rebackHealthExamination);

////轮播图点击链接跳转事件
//mui('#detailPackageBannerSlderID').on('click', '.mui-slider-item', function() {
//	var inputId = this.querySelectorAll('input');
//	var jumpUrl = inputId[0].value;
//	if (!jumpUrl || jumpUrl == "undefined" || jumpUrl.length == 0) {
//		return false;
//	}
//	var description = inputId[1].value;
//	mui.openWindow({
//		id: 'sliper',
//		url: '../../sliper.html',
//		extras: {
//			description: description,
//			url: jumpUrl
//		}
//	});
//});