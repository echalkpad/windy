//初始化
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var itemList = self.itemList;
	//初始化体检项目详情页面
	healthExaminationPackageTestItems.initHealthExaminationPackageTestItems(itemList);
});

var healthExaminationPackageTestItems = {
	initHealthExaminationPackageTestItems : function(itemList){
		if(itemList && itemList.length > 0){
			var heptiHtml = '';
			for(var i = 0;i < itemList.length; i++){
				heptiHtml += '<li class="mui-table-view-cell">';
				heptiHtml += '	<a class="mui-navigate-right">'+itemList[i].ProductName+'</a>';
				heptiHtml += '	<div class="">'+itemList[i].Description+'</div>';
				heptiHtml += '</li>';
			}
			document.getElementById('healthExaminationPackageTestItemsID').innerHTML = heptiHtml;
		}
	},
	rebackHealthExamPackage: function() {
		var healthExaminationPackageHtml = plus.webview.getWebviewById('healthExaminationPackage');
		var extras = {
			pageId : "healthExaminationPackageTestItems"
		}
		mui.fire(healthExaminationPackageHtml,'closeBeforePage',extras);
//		自定义事件
		mui.openWindow({
			id: 'healthExaminationPackage'
		})
	}
}
//绑定回退按钮事件
document.getElementById('heptiBackAID').addEventListener('click',healthExaminationPackageTestItems.rebackHealthExamPackage);
