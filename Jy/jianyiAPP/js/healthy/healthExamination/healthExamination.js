//我的预约
document.getElementById('healthExaminationOrder').addEventListener('click',function(){
	commomUtil.closeWebviewById('healthExaminationOrder');
	mui.openWindow({
		id: 'healthExaminationOrder',
		url: "healthExaminationOrder.html"
	});
})
//服务介绍
mui('.gene-nav').on('tap', '#healthExaminationService', function() {
	plus.nativeUI.alert('敬请期待','','健医宝','确认');
	return false;
//	mui.openWindow({
//		id: '',
//		url: ".html"
//	});
});
//体检机构
mui('.gene-nav').on('tap', '#healthExaminationNet', function() {
	commomUtil.closeWebviewById('healthNetworkMain');
	mui.openWindow({
		id: 'healthNetworkMain',
		url: "../../healthNetwork/healthNetworkMain.html",
		extras: {
			"mainMedication": 43,
			"backid": "healthExamination",
			"backurl":"../healthy/healthExamination/healthExamination.html"
		}
	});
});
//客服代约
mui('.gene-nav').on('tap', '#healthExaminationCustomer', function() {
	commomUtil.closeWebviewById('healthExaminationCustomer');
	mui.openWindow({
		id: 'healthExaminationCustomer',
		url: "healthExaminationCustomer.html"
	});
});
//热门套餐
mui('.mui-content').on('tap', '.spaContent', function() {
	var packageId = this.querySelectorAll('input')[0].value;
	commomUtil.closeWebviewById('healthExaminationPackage');
	mui.openWindow({
		id: 'healthExaminationPackage',
		url: "healthExaminationPackage.html",
		extras: {
			"backid" : 'healthExamination',
			"backurl" : 'healthExamination.html',
			"packageId" : packageId
		}
	});
});

//初始化体检热门套餐
document.addEventListener('plusready', function() {
	//初始化首页banner图
	healthExamination.initHotPackageBannerList();
	//初始化体检主页热门套餐列表
	healthExamination.initHotPackageList();
}); 

var healthExamination = {
	initHotPackageList : function(){
		jyapp.getApi({
			method: 'HealthExamination/IndexHotPackageList',
			data:'',
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("initHotPackageList---->:"+JSON.stringify(response));
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data && response.data.length > 0){
						var dataValues = response.data;
						healthExamDQRhtml = '';
						for(var i = 0;i < dataValues.length; i++){
							healthExamDQRhtml += '<article>';
							healthExamDQRhtml += '	<div class="spaContent">';
							healthExamDQRhtml += '		<input type="hidden" value="'+dataValues[i].ID+'" />';
							healthExamDQRhtml += '		<h2>'+dataValues[i].PackageName+' <span></span></h2>';
							healthExamDQRhtml += '	</div>';
							healthExamDQRhtml += '</article>';
							healthExamDQRhtml += '<p>门市价：<del>¥'+dataValues[i].OriginalPrice+'起</del>健e价：<strong>¥'+dataValues[i].PresentPrice+'起</strong></p>';
						}
						var divs = document.getElementById('HotPackageListID');
						divs.innerHTML = healthExamDQRhtml;
						var acts = divs.getElementsByTagName('article');
						for(var j = 0;j < acts.length; j++){
							acts[j].setAttribute('style','background-image:url('+dataValues[j].Pic1+')');
						}
					}
				}
			},
			onerror: function(e) {
				console.log("healthExamination:" + e);
			}
		});
	},
	initHotPackageBannerList : function(){
		var requestPictures = "flag=nstjc";
		var intervalValue = 0;
		jyapp.getApi({
			method: 'Comment/Pictures',
			data: requestPictures,
			timeout: 10000,
			onsuccess: function(response) {
//				console.log("initHotPackageBannerList---->:"+JSON.stringify(response));
				var htmlBannerSlder = '';
				var htmlBannerSlderPoint = '';
				if (response.code != 1) {
					intervalValue = 0;
					htmlBannerSlder += '<div class="mui-slider-item">';
					htmlBannerSlder += '<input type="hidden" value="" />';
					htmlBannerSlder += '<input type="hidden" value="" />';
					htmlBannerSlder += '	<a href="#">';
					htmlBannerSlder += '		<img src="../../../img/healthy/tijian_1.png">';
					htmlBannerSlder += '	</a>';
					htmlBannerSlder += '</div>';
					htmlBannerSlderPoint += '<div class="mui-indicator mui-active"></div>';
				} else {
					if (response.data && response.data.list && response.data.list.length > 0) {
						intervalValue = 3000;
						var dataValues = response.data.list;
						htmlBannerSlder += '<div class="mui-slider-item">';
						htmlBannerSlder += '<input type="hidden" value="'+dataValues[dataValues.length-1].URL+'" />';
						htmlBannerSlder += '<input type="hidden" value="'+dataValues[dataValues.length-1].Description+'" />';
						htmlBannerSlder += '	<a href="#">';
						htmlBannerSlder += '		<img src="'+dataValues[dataValues.length-1].Pic+'">';
						htmlBannerSlder += '	</a>';
						htmlBannerSlder += '</div>';
						for(var i = 0; i < dataValues.length; i++){
							htmlBannerSlder += '<div class="mui-slider-item">';
							htmlBannerSlder += '<input type="hidden" value="'+dataValues[i].URL+'" />';
							htmlBannerSlder += '<input type="hidden" value="'+dataValues[i].Description+'" />';
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
						htmlBannerSlder += '<input type="hidden" value="'+dataValues[0].URL+'" />';
						htmlBannerSlder += '<input type="hidden" value="'+dataValues[0].Description+'" />';
						htmlBannerSlder += '	<a href="#">';
						htmlBannerSlder += '		<img src="'+dataValues[0].Pic+'">';
						htmlBannerSlder += '	</a>';
						htmlBannerSlder += '</div>';
					}else{
						intervalValue = 0;
						htmlBannerSlder += '<div class="mui-slider-item">';
						htmlBannerSlder += '<input type="hidden" value="" />';
						htmlBannerSlder += '<input type="hidden" value="" />';
						htmlBannerSlder += '	<a href="#">';
						htmlBannerSlder += '		<img src="../../../img/healthy/tijian_1.png">';
						htmlBannerSlder += '	</a>';
						htmlBannerSlder += '</div>';
						htmlBannerSlderPoint += '<div class="mui-indicator mui-active"></div>';
					}
				}
				document.getElementById('healthExaminationBannerSlderID').innerHTML = htmlBannerSlder;
				document.getElementById('healthExaminationBannerSlderPointID').innerHTML = htmlBannerSlderPoint;
				if(intervalValue != 0){
					//获得slider插件对象
					mui('.mui-slider').slider({
						interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
					});
				}
			},
			onerror: function(e) {
				var htmlBannerSlder = '';
				var htmlBannerSlderPoint = '';
				htmlBannerSlder += '<div class="mui-slider-item">';
				htmlBannerSlder += '<input type="hidden" value="" />';
				htmlBannerSlder += '<input type="hidden" value="" />';
				htmlBannerSlder += '	<a href="#">';
				htmlBannerSlder += '		<img src="../../../img/healthy/tijian_1.png">';
				htmlBannerSlder += '	</a>';
				htmlBannerSlder += '</div>';
				htmlBannerSlderPoint += '<div class="mui-indicator mui-active"></div>';
				document.getElementById('healthExaminationBannerSlderID').innerHTML = htmlBannerSlder;
				document.getElementById('healthExaminationBannerSlderPointID').innerHTML = htmlBannerSlderPoint;
				console.log("initHotPackageBannerList:" + e);
			}
		});
	}
}

//轮播图点击链接跳转事件
mui('#healthExaminationBannerSlderID').on('click', '.mui-slider-item', function() {
	var jumpUrl = this.querySelectorAll('input')[0].value;
	var description = this.querySelectorAll('input')[1].value;
	if (!jumpUrl || typeof(jumpUrl) == "undefined" || jumpUrl == "") {
		return false;
	}
	mui.openWindow({
		id: 'sliper',
		url: '../../sliper.html',
		extras: {
			description: description,
			url: jumpUrl
		}
	});
});