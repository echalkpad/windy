var packageId = 0;
var items = "";
var queuesitems = "";
var lspjItems = "";
var Pageckage = "";
//检测项目
mui(".mui-content").on('tap', '#testItems', function() {
	mui.openWindow({
		id: 'testItems',
		url: "testItems.html",
		extras: {
			"items": items
		}
	});
})

//常见问题
mui(".mui-content").on('tap', '#commonProblems', function() {
	mui.openWindow({
		id: 'commonProblems',
		url: "commonProblems.html",
		extras: {
			"queuesitems": queuesitems
		}
	});
})

//历史评价
mui(".mui-content").on('tap', '#historicalEvaluation', function() {
	mui.openWindow({
		id: 'historicalEvaluation',
		url: "historicalEvaluation.html",
		extras: {
			"lspjItems": lspjItems
		}
	});
})

//立即预约
mui(".mui-content").on('tap', '#package-about', function() {
	if(commomUtil.reloadWebviewById('package-about')){
		mui.openWindow({
			id: 'package-about',
			url: "package-about.html",
			extras: {
				"Pageckage": Pageckage
			}
		});
	}
})

//收藏
mui('.mui-bar').on('tap','.btn-add',function(){
	this.getAttribute('class')=='btn-add mui-pull-right collect'?this.setAttribute('class','btn-add mui-pull-right'):this.setAttribute('class','btn-add mui-pull-right collect');
})

document.addEventListener("plusready",function(){
	var self = plus.webview.currentWebview();
	packageId = self.packageId;
	//初始化数据
	testingPlan.initData();
	//初始化图片数据
	testingPlan.initTestingPic();
	//初始化常见问题数目
	testingPlan.initTestingqueue();
	//初始化历史评价
	testingPlan.initTestinglspj();
});
var testingPlan = {
	initData : function(){
		jyapp.getApi({
   			method: 'GeneDetection/PackageDetails',
   			data:'packageId='+packageId,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var choosePackageqblxHtml = "";
				if(data.code == 1 && data.data && data.data.Pageckage){
					Pageckage = data.data.Pageckage;
					document.getElementById("testingPlanh2id").innerHTML = Pageckage.PackageName;
					document.getElementById("testingPlanSmallId").innerHTML = Pageckage.StoreName;
					document.getElementById("testingarticleId").innerHTML = Pageckage.Summary;
					document.getElementById("testingdelId").innerHTML = "¥"+Pageckage.OriginalPrice;
					document.getElementById("testingstrongId").innerHTML = "¥"+Pageckage.PresentPrice;
					items = data.data.Items;
					if(items && items != ""){
						document.getElementById("testingPlanjcxmSumId").innerHTML = "("+items.length+")";
					}
					
				}
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	initTestingPic : function(){
		jyapp.getApi({
   			method: 'GeneDetection/PackageBanner',
   			data:'packageId='+packageId,
   			timeout : 10000,
   			onsuccess: function(data) {
   				console.log(JSON.stringify(data));
				var htmlBannerSlder = '';
				var htmlBannerSlderPoint = '';
				if(data.code != 1){
					intervalValue = 0;
					document.getElementById('testingPlanBannerPid').style.display = 'block';
				}else{
					if(data.data && data.data.length > 0){
						document.getElementById('testingPlanBannerPid').style.display = 'none';
						intervalValue = 3000;
						var dataValues = data.data;
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
							if(i == 0){
								htmlBannerSlderPoint += '<div class="mui-indicator mui-active"></div>';
							}
							if(i == (dataValues.length-1)){
								htmlBannerSlderPoint += '<div class="mui-indicator"></div>';
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
						intervalValue = 0;
						document.getElementById('testingPlanBannerPid').style.display = 'block';
					}
				}
				document.getElementById('testingPlanBannerSlderID').innerHTML = htmlBannerSlder;
				document.getElementById('testingPlanBannerSlderPointID').innerHTML = htmlBannerSlderPoint;
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	initTestingqueue : function(){
		var commonProblemsNum = 0;
		jyapp.getApi({
   			method: 'GeneDetection/PackageQuestion',
   			data:'packageId='+packageId,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var choosePackageqblxHtml = "";
				if(data.code == 1 && data.data && data.data && data.data.length > 0){
					queuesitems = data.data;
					commonProblemsNum = queuesitems.length;
				}
				document.getElementById("cjwtNumId").innerHTML = "("+commonProblemsNum+")";
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	initTestinglspj : function(){
		var lspjNum = 0;
		console.log('packageId='+packageId);
		jyapp.getApi({
   			method: 'GeneDetection/PackageComments',
   			data:'packageId='+packageId,
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				if(data && data.code == 1 && data.data){
   					var choosePackageqblxHtml = "";
					if(data.code == 1 && data.data && data.data && data.data.length > 0){
						lspjItems = data.data;
						lspjNum = lspjItems.length;
					}
					document.getElementById("lspjNumId").innerHTML = "("+lspjNum+")";
   				}else{
   					document.getElementById("lspjNumId").innerHTML = "(0)";
   				}
   			},
   			onerror: function(e) {
   				document.getElementById("lspjNumId").innerHTML = "(0)";
   				console.log(e);
   			}
   		});
	}
};
