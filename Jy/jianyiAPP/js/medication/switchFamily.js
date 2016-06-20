var detailPage = null;
mui('.mui-content').on('tap', 'li', function() {
	var familyId = this.querySelectorAll('input')[0].value;
	var relation = this.querySelectorAll('input')[1].value;
	var oradio = this.parentElement.getElementsByTagName('input')[0];
	var accountType = 0;
	var html = '';
	if (!oradio.checked) {
		if (relation == 0) {
			html = "我";
		} else {
			accountType = 1;
			html = this.getElementsByTagName('label')[0].innerText;
		}
	}
	//获得详情页面
	if (!detailPage) {
		detailPage = plus.webview.getLaunchWebview();
	}
	//触发详情页面的switchFamily事件
	mui.fire(detailPage, 'switchFamily', {
		html: html,
		accountType: accountType,
		familyId: familyId
	});
	switchFamily.beforebackFromFamily(accountType, familyId);
});

document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var accountType = self.accountType;
	var familyId = self.familyId;
//	console.log(accountType+" : "+familyId);
	//初始化我的家人
	switchFamily.initSwitchFamily(accountType, familyId);
});

var switchFamily = {
	initSwitchFamily: function(accountType, familyId) {
		document.getElementById('accountTypeSwitchReback').value = accountType;
		document.getElementById('familyIdSwitchReback').value = familyId;
		jyapp.getApi({
			method: 'profile/FamilyAndMyself',
			data: '',
			timeout: 10000,
			onsuccess: function(response) {
// 				console.log("initSwitchFamily:"+JSON.stringify(response));
				var switchFamilyHtml = '';
				if (response.code != 1) {
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					if (response.data != null && response.data.length > 0) {
						var dataValues = response.data;
						for (var i = 0; i < dataValues.length; i++) {
							switchFamilyHtml += '<li class="mui-table-view-cell">';
							switchFamilyHtml += '	<input type="hidden" value="' + dataValues[i].id + '" />';
							switchFamilyHtml += '	<input type="hidden" value="' + dataValues[i].relation + '" />';
							switchFamilyHtml += '	<div class="mui-input-row mui-radio">';
							switchFamilyHtml += '		<label>' + dataValues[i].name + '</label>';
							switchFamilyHtml += '		<input name="radio1" type="radio" >';
							switchFamilyHtml += '		<input type="hidden" value="' + dataValues[i].id + '" />';
							switchFamilyHtml += '	</div>';
							switchFamilyHtml += '</li>';
						}
						document.getElementById('switchFamilyValueID').innerHTML = switchFamilyHtml;
					}
				}
			},
			onerror: function(e) {
				console.log("initSwitchFamily:" + e);
			}
		});
	},
	beforebackFromFamily: function(accountType, familyId) {
//		var rebackRefreshPage = plus.webview.getWebviewById('mainMedication');
//		//触发详情页面的rebackRefresh事件
//		mui.fire(rebackRefreshPage, 'rebackRefresh', {
//			accountType: accountType,
//			familyId: familyId
//		});
//		var mainPage = plus.webview.getLaunchWebview();
//		mainPage.append(rebackRefreshPage);
//		mainPage.show();
		var config = {
			id : "mainMedication",
			method : "rebackRefresh",
			index : 2,
			extras : {
				accountType: accountType,
				familyId: familyId
			}
		}
		jyapp.backWebView(config);
	}
}

document.getElementById('switchFamilyRebackID').addEventListener('click', function() {
	var uls = document.getElementById('switchFamilyValueID');
	var lis = uls.getElementsByTagName('li');
	var accountType = 0;
	var familyId = 0;
	var html = '';
	for(var i = 0;i < lis.length; i++){
		var rideos = lis[i].getElementsByTagName('input')[2];
		var relation = lis[i].getElementsByTagName('input')[1].value;
//		console.log(i+"  "+lis[i].getElementsByTagName('input')[1].value);
		if (rideos.checked) {
			if (relation == 0) {
				html = "我";
			} else {
				accountType = 1;
				html = lis[i].getElementsByTagName('label')[0].innerText;
			}
			familyId = lis[i].getElementsByTagName('input')[0].value;
		}
	}
	if(html == ""){
		html = "我";
	}
	//获得详情页面
	if (!detailPage) {
		detailPage = plus.webview.getLaunchWebview();
	}
	//触发详情页面的newsId事件
	mui.fire(detailPage, 'switchFamily', {
		html: html,
		accountType: accountType,
		familyId: familyId
	});
	switchFamily.beforebackFromFamily(accountType, familyId);
});