var IsDefault = 1;
var detailPage = null;
var isF = false; //判断是不是添加地址
var Mobile = document.getElementById("Mobile");
var ConsigneeName = document.getElementById("ConsigneeName");
var Addr1 = document.getElementById("Addr1");
var Addr2 = document.getElementById("Addr2");
var submitAddress = document.getElementById("submitAddress");
var defaultAddress = document.getElementById("defaultAddress");

mui.plusReady(function() {
	newAddress.select();
	var self = plus.webview.currentWebview();
	if (self.addid != undefined) {
		var title = document.querySelector(".mui-title");
		title.innerText = '修改地址';
		isF = self.addid;
		var Addr1 = self.Addr1;
		var Addr2 = self.Addr2;
		var ConsigneeName = self.ConsigneeName;
		var Mobile = self.Mobile;
		var oIsDefault = self.IsDefault;
		newAddress.init(Addr1, Addr2, ConsigneeName, Mobile, oIsDefault);
	}
})

mui('.mui-bar-nav').on('tap', '#submitAddress', function() {
		newAddress.submitAddress()
	})
	//submitAddress.addEventListener('tap', function() {
	//	newAddress.submitAddress()
	//})
	//初始化预加载详情页面
mui.init({
	preloadPages: [{
		id: 'personalData',
		url: '../../me/personalData.html'
	}]
});
var detailPage = null;
var newAddress = {
	init: function(Addr1N, Addr2N, ConsigneeNameN, MobileN, oIsDefault) {
		ConsigneeName.value = ConsigneeNameN;
		Addr1.value = Addr1N;
		Addr2.value = Addr2N;
		submitAddress.value = ConsigneeNameN;
		oIsDefault != 0 ? defaultAddress.setAttribute('class', 'mui-switch mui-switch-mini mui-active') : defaultAddress.setAttribute('class', 'mui-switch mui-switch-mini');
	},
	select:function(){
		(function($, doc) {
				$.init();
				$.ready(function() {//级联示例
					var cityPicker3 = new $.PopPicker({
						layer: 3
					});
					cityPicker3.setData(cityData);
					var cityResult3 = doc.getElementById('Addr1');
					cityResult3.addEventListener('tap', function(event) {
						cityPicker3.show(function(items) {
							cityResult3.value =   (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
						});
					}, false);
				});
			})(mui, document);
	},
	submitAddress: function() {
		var reg = /0?(13|14|15|18|17)[0-9]{9}/;
		if (ConsigneeName.value == '' || Addr1.value == '' || Addr2.value == '' || Mobile.value == '') {
			mui.toast('请补全地址信息再重试！');
			return false
		}
		if (!reg.test(Mobile.value)) {
			mui.toast('手机号码格式不正确！');
			return false
		}
		var url = 'Profile/AddresUpdate';

		if (defaultAddress.getAttribute('class', 'mui-switch mui-switch-mini') == 'mui-switch mui-switch-mini') {
			IsDefault = 0;
		}
		var data1 = 'IsDefault=' + IsDefault + '&ConsigneeName=' + ConsigneeName.value + '&Mobile=' + Mobile.value.toString() + '&Addr=' + Addr1.value + '|' + Addr2.value;
		if (!!isF) {
			data1 = data1 + '&ID=' + isF
		}

		ajax(url, data1, function(data) {
			if (!!isF) {
				mui.toast('修改地址成功！');
				//获得详情页面
				if (!detailPage) {
					detailPage = plus.webview.getWebviewById('personalData');
				}
				//触发详情页面的newsId事件
				mui.fire(detailPage, 'newAddress');
				//打开详情页面          
				mui.openWindow({
					id: 'personalData',
					url: '../../me/personalData.html'
				});
				return
			}
			mui.toast('增加地址成功！');
			//获得详情页面
			if (!detailPage) {
				detailPage = plus.webview.getWebviewById('personalData');
			}
			//触发详情页面的newsId事件
			mui.fire(detailPage, 'newAddress');
			//打开详情页面          
			mui.openWindow({
				id: 'personalData',
				url: '../../me/personalData.html'
			});
		})
	}
}

function ajax(url, data, ca) {
	jyapp.getApi({
		method: url,
		data: data,
		onsuccess: function(data) {
			//			console.log(JSON.stringify(data))
			if (data.code == 1) {
				if (ca) ca(data.data);
			}
		},
		onerror: function(e) {
			//			console.log(JSON.stringify(e))
			mui.toast(e.msg);
		}
	});
}

