//初始化
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var packageId = self.packageId;
	//初始化历史评价详情页面
	healthExaminationPackageEvaluation.initHEPCommentList(packageId);
});

var healthExaminationPackageEvaluation = {
	initHEPCommentList : function(packageId){
		var requestHEPCommentList = 'packageId='+packageId;
		jyapp.getApi({
			method: 'HealthExamination/CommentList',
			data:requestHEPCommentList,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("initHEPCommentList---->:"+JSON.stringify(response));
				if(response.code != 1){
					document.getElementById('healthExaminationPackageEvaluationOrderNoneID').style.display = 'block';
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data && response.data.length > 0){
						document.getElementById('healthExaminationPackageEvaluationOrderNoneID').style.display = 'none';
						var dataValues = response.data;
						var htmlHealthExaminationPackageEvaluation = '';
						for(var i = 0; i < dataValues.length; i++){
							htmlHealthExaminationPackageEvaluation += '<li class="mui-table-view-cell">';
							htmlHealthExaminationPackageEvaluation += '	<section>';
							htmlHealthExaminationPackageEvaluation += '		<img src="'+dataValues[i].Head+'" alt="" />';
							htmlHealthExaminationPackageEvaluation += '		<h2>'+dataValues[i].NickName+'</h2>';
							htmlHealthExaminationPackageEvaluation += '		<p id="healthExaminationPackageEvaluationXingXingID">';
							for(var s = 0; s < 5; s++){
								if(s > [5 - parseInt(dataValues[i].Score)] || s == [5 - parseInt(dataValues[i].Score)]){
									htmlHealthExaminationPackageEvaluation += '<span class="xing xing-active"></span>';
								}else{
									htmlHealthExaminationPackageEvaluation += '<span class="xing"></span>';
								}
							}
							htmlHealthExaminationPackageEvaluation += '</p>';
							htmlHealthExaminationPackageEvaluation += '		<em>'+commomUtil.formatStringToDate(commomUtil.stringSplit(dataValues[i].CreateTime),1)+'</em>';
							htmlHealthExaminationPackageEvaluation += '	</section>';
							var comment = dataValues[i].Comment ? dataValues[i].Comment : "";
							htmlHealthExaminationPackageEvaluation += '	<p class="ellipsis" id="healthExaminationPackageEvaluationpID">'+comment+'</p>';
							htmlHealthExaminationPackageEvaluation += '</li>';
						}
						document.getElementById('healthExaminationPackageEvaluationID').innerHTML = htmlHealthExaminationPackageEvaluation;
					}else{
						document.getElementById('healthExaminationPackageEvaluationOrderNoneID').style.display = 'block';
					}
				}
			},
			onerror: function(e) {
				console.log("initHEPCommentList:" + e);
			}
		});
	},
	rebackHealthExamPackage: function() {
		var healthExaminationPackageHtml = plus.webview.getWebviewById('healthExaminationPackage');
		var extras = {
			pageId : "healthExaminationPackageEvaluation"
		}
		mui.fire(healthExaminationPackageHtml,'closeBeforePage',extras);
//		自定义事件
		mui.openWindow({
			id: 'healthExaminationPackage'
		})
	}
}

//绑定回退按钮事件
document.getElementById('hepeBackAID').addEventListener('click',healthExaminationPackageEvaluation.rebackHealthExamPackage);