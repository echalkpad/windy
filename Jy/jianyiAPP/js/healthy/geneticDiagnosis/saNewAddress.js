var IsDefault = 1;
var detailPage = null;
var isF = false; //判断是不是添加地址
var Mobile = document.getElementById("Mobile");
var ConsigneeName = document.getElementById("ConsigneeName");
var Addr1 = document.getElementById("Addr1");
var Addr2 = document.getElementById("Addr2");
var submitAddress = document.getElementById("submitAddress");
var defaultAddress = document.getElementById("defaultAddress");

mui('.mui-bar-nav').on('tap', '#submitAddress', function() {
	newAddress.submitAddress()
})
	//submitAddress.addEventListener('tap', function() {
	//	newAddress.submitAddress()
	//})

var newAddress = {
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
				return
			}
			mui.toast('增加地址成功！');
			var config = {
				id : "shippingAddress",
				method : "newIdsshippingAddress"
			}
			jyapp.backWebView(config);
		})
	}
}

function ajax(url, data, ca) {
//	console.log(url, data)
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