mui.plusReady(function() {
		var self = plus.webview.getWebviewById('signature');
		var ohtml = self.sign;
		var num = document.getElementById("textarea-num");
		if (ohtml.length > 30) {
			ohtml = ohtml.slice(0, 30);
		}
		num.innerHTML = ohtml.length;
		document.getElementById("signaturetext").value = ohtml;
	})
	//初始化预加载详情页面
mui.init({
	preloadPages: [{
		id: 'personalData',
		url: 'personalData.html'
	}]
});

var detailPage = null;
document.getElementById("submitSignature").addEventListener('tap', function() {
		var otextarea = document.getElementById("signaturetext").value;
		//获得详情页面
		if (!detailPage) {
			detailPage = plus.webview.getWebviewById('personalData');
		}
		//触发详情页面的newsId事件
		mui.fire(detailPage, 'Signature', {
			otextarea: otextarea
		});
		//打开详情页面
		mui.openWindow({
			id: 'personalData',
			createNew: true
		});
	})
	//判断字符串长度
function getnum(e) {
	if (e.srcElement.textLength > 30) {
		mui.toast('个性签名最多30字');
		return false;
	}
	var num = document.getElementById("textarea-num");
	num.innerHTML = e.srcElement.textLength;
}