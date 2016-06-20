var orderInfo = {};
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	orderInfo = self.orderInfo;
	//初始化我和我的家人
	patientJs.initFamilyAndMyself();
});

var patientJs = {
	initFamilyAndMyself: function() {
		jyapp.getApi({
			method: 'Profile/FamilyAndMyself',
			data: '',
			timeout: 10000,
			onsuccess: function(response) {
				if (response.code != 1) {
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					var patientHtml = '';
					var dataValue = response.data;
					if (dataValue != null && dataValue.length > 0) {
						for (var i = 0; i < dataValue.length; i++) {
							patientHtml += '<li class="mui-table-view-cell">';
							patientHtml += '	<div class="mui-input-row mui-radio">';
							patientHtml += '		<label>' + dataValue[i].name + '</label>';
							patientHtml += '		<input name="radio1" type="radio" >';
							patientHtml += '	</div>';
							patientHtml += '	<input value="' + dataValue[i].id + '" type="hidden" >';
							patientHtml += '	<input value="' + dataValue[i].relation + '" type="hidden" >';
							patientHtml += '</li>';
						}
					}
					document.getElementById('patientFamilyAndMyID').innerHTML = patientHtml;
				}
			},
			onerror: function(e) {
				console.log("initFamilyAndMyself:" + e);
			}
		});
	}
}

var detailPage = null;

//绑定选择就诊人后返回提交预约信息页面
mui('#patientFamilyAndMyID').on('tap', 'li', function() {
	var radios = this.querySelectorAll('input')[0];
	var patientId = this.querySelectorAll('input')[1].value;
	var relation = this.querySelectorAll('input')[2].value;
		//获得详情页面
	if (!detailPage) {
		detailPage = plus.webview.getWebviewById('reserveInformation');
	}
	//触发详情页面的newsId事件
	mui.fire(detailPage, 'choosePatient', {
		patientId : patientId,
		relationType : relation,
		orderInfo : orderInfo
	});
	commomUtil.closeWebviewById('patient');
});