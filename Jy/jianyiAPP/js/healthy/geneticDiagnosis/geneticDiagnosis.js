//客服代约
mui(".mui-content").on('tap', '#clientsAbout', function() {
	if(commomUtil.reloadWebviewById('clientsAbout')){
		mui.openWindow({
			id: 'clientsAbout',
			url: "clientsAbout.html"
		});
	}
});

//我的预约
document.getElementById('geneticOrder').addEventListener('click', function() {
	commomUtil.closeWebviewById('geneticOrder');
	mui.openWindow({
		id: 'geneticOrder',
		url: "geneticOrder.html"
	});
})

//基因检测套餐详情
mui("#geneticDiagnosisDataId").on('tap', 'a', function() {
	var packageId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'testingPlan',
		url: "testingPlan.html",
		extras: {
			"packageId" : packageId
		}
	});
})

//服务介绍
mui('.gene-nav').on('tap', '#serviceIntroduce', function() {
	plus.nativeUI.alert('敬请期待','','健医宝','确认');
	return false;
});

//套餐选择
mui(".mui-content").on('tap', '#choosePackage', function() {
	mui.openWindow({
		id: 'choosePackage',
		url: "choosePackage.html"
	});
})

document.addEventListener("plusready",function(){
	//初始化数据
	geneticDiagnosis.initData();
});

var geneticDiagnosis = {
	initData : function(){
		//初始化list数据列表
		geneticDiagnosis.initGeneticDiagnosisLists();
		//初始化top图片列表
		geneticDiagnosis.initPackageBanner();
	},
	initGeneticDiagnosisLists : function(){
		jyapp.getApi({
   			method: 'GeneDetection/HotPackageList',
   			data:'pageIndex=1&pageSize=10',
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var geneticDiagnosisHtml = "";
				if(data.code == 1 && data.data && data.data && data.data.length > 0){
					document.getElementById("geneticDiagnosiszwsjId").style.display = "none";
					var dataValue = data.data;
					dzfpagetatel = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						geneticDiagnosisHtml +='<div class="spaAppointment spaAppointment3">';
						geneticDiagnosisHtml +='<a href="">';
						geneticDiagnosisHtml +='<input type="hidden" value='+dataValue[i].ID+' />'; 
						geneticDiagnosisHtml +='<article>';
						geneticDiagnosisHtml +='<img src="'+dataValue[i].Pic1+'" alt="" />';
						geneticDiagnosisHtml +='<div class="spaContent">';
						geneticDiagnosisHtml +='<h2>'+dataValue[i].PackageName+'</h2>';
						geneticDiagnosisHtml +='<span>'+dataValue[i].ProductTypeName+'</span>';
						geneticDiagnosisHtml +='</div>';
						geneticDiagnosisHtml +='</article>';
						geneticDiagnosisHtml +='<p>市场价：<del>¥'+dataValue[i].OriginalPrice+'</del>健e价：<strong>¥'+dataValue[i].PresentPrice+'</strong></p>';
						geneticDiagnosisHtml +='</a>';
						geneticDiagnosisHtml +='</div>';
					}
				}else{
					if(geneticDiagnosisHtml == ""){
						document.getElementById("geneticDiagnosiszwsjId").style.display = "";
					}
				}
				document.getElementById("geneticDiagnosisDataId").innerHTML = geneticDiagnosisHtml;
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	initPackageBanner : function(){
		jyapp.getApi({
   			method: 'Comment/Pictures',
   			data:'flag=njyjc',
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
   					document.getElementById("geneticDiagnosisPid").style.display = "none";
   					var dataValues = data.data;
					if (dataValues.list[dataValues.list.length - 1].URL == '' || dataValues.list[0].URL == '') {
						dataValues.list[dataValues.list.length - 1].URL = null;
						dataValues.list[0].URL = null;
					}
					dataValues.list[0].lastURL = dataValues.list[dataValues.list.length - 1].URL;
					dataValues.list[0].lastPic = dataValues.list[dataValues.list.length - 1].Pic;
					dataValues.list[0].lastDescription = dataValues.list[dataValues.list.length - 1].Description;
					dataValues.list[dataValues.list.length - 1].firstURL = dataValues.list[0].URL;
					dataValues.list[dataValues.list.length - 1].firstPic = dataValues.list[0].Pic;
					dataValues.list[dataValues.list.length - 1].firstDescription = dataValues.list[0].Description;
					var tpl = document.getElementById('geneticDiagnosisSlidertpl1').innerHTML;
					document.getElementById('geneticDiagnosisSliderId').innerHTML = juicer(tpl, dataValues);
					var tpl = document.getElementById('geneticDiagnosisSlidertpl2').innerHTML;
					document.getElementById('geneticDiagnosisSliderId2').innerHTML = juicer(tpl, dataValues);
					//获得slider插件对象
					mui('.mui-slider').slider({
						interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
					});
   				}else{
   					document.getElementById("geneticDiagnosisPid").style.display = "";
   				}
				
   			},
   			onerror: function(e) {
   				document.getElementById("geneticDiagnosisPid").style.display = "";
   				console.log(e);
   			}
   		});
	},
	geneticDiagnosisBackCell : function(){
		jyapp.backWebView({id:"mainHealthy",index:3});
	}
};

//绑定回退按钮事件
document.getElementById("geneticDiagnosisBackCellId").addEventListener("click",geneticDiagnosis.geneticDiagnosisBackCell);
