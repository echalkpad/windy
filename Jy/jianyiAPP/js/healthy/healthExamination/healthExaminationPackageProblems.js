//初始化
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var packageId = self.packageId;
	//初始化常见问题详情页面
	healthExaminationPackageProblems.initHEPCommonQuestions(packageId);
});

var healthExaminationPackageProblems = {
	initHEPCommonQuestions : function(packageId){
		var requestHEPCommonQuestions = 'packageId='+packageId;
		jyapp.getApi({
			method: 'HealthExamination/CommonQuestions',
			data:requestHEPCommonQuestions,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("initHEPCommonQuestions---->:"+JSON.stringify(response));
				if(response.code != 1){
					document.getElementById('healthExaminationPackageProblemsOrderNoneID').style.display = 'block';
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(response.data && response.data.length > 0){
						document.getElementById('healthExaminationPackageProblemsOrderNoneID').style.display = 'none';
						var dataValues = response.data;
						var htmlHealthExaminationPackageProblems = '';
						for(var i = 0; i < dataValues.length; i++){
							htmlHealthExaminationPackageProblems += '<li class="mui-table-view-cell">';
							htmlHealthExaminationPackageProblems += '	<p class="question"><i>Q：</i><strong>'+dataValues[i].Q+'</strong></p>';
							htmlHealthExaminationPackageProblems += '	<p class="answer"><i>A：</i><strong>'+dataValues[i].A+'</strong></p>';
							htmlHealthExaminationPackageProblems += '</li>';
						}
						document.getElementById('healthExaminationPackageProblemsID').innerHTML = htmlHealthExaminationPackageProblems;
					}else{
						document.getElementById('healthExaminationPackageProblemsOrderNoneID').style.display = 'block';
					}
				}
			},
			onerror: function(e) {
				console.log("initHEPCommonQuestions:" + e);
			}
		});
	},
	rebackHealthExamPackage: function() {
		var healthExaminationPackageHtml = plus.webview.getWebviewById('healthExaminationPackage');
		var extras = {
			pageId : "healthExaminationPackageProblems"
		}
		mui.fire(healthExaminationPackageHtml,'closeBeforePage',extras);
//		自定义事件
		mui.openWindow({
			id: 'healthExaminationPackage'
		})
	}
}
//绑定回退按钮事件
document.getElementById('heppBackAID').addEventListener('click',healthExaminationPackageProblems.rebackHealthExamPackage);