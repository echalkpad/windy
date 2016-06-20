//新增地址
mui(".mui-content").on('tap', '#shippingNewAddress', function() {
	mui.openWindow({
		id: 'saNewAddress',
		url: "saNewAddress.html"
	});
});
//绑定点击事件
mui('#shippingAddressId').on('tap', 'li', function() {
	var addressId = this.querySelectorAll('input')[0].value;
	var addressName = this.querySelectorAll('p')[0].innerText+this.querySelectorAll('input')[2].value;
	var ConsigneeName = this.querySelectorAll('span')[0].innerText;
	var Mobile = this.querySelectorAll('strong')[0].innerText;
	var IsDefault = this.querySelectorAll('input')[1].value;
	var webviewId = "";
	var webviewMethod = "";
	var webviewUrl = "";
	if(type == 0){
		webviewId = "package-about";
		webviewUrl = "package-about.html";
		webviewMethod = "newIdspackageAbout";
	}else if(type == 1){
		webviewId = "clientsAbout";
		webviewUrl = "clientsAbout.html";
		webviewMethod = "newIdsclientsAbout";
	}
	var config = {
		id : webviewId,
		url : webviewUrl,
		method : webviewMethod,
		extras : {
			addressId : addressId,
			addressName : addressName,
			ConsigneeName : ConsigneeName,
			Mobile : Mobile,
			IsDefault : IsDefault
		}
	}
	jyapp.backWebView(config);
});
var type = 0;
document.addEventListener("plusready",function(){
	var self = plus.webview.currentWebview();
	type = self.type;
	//加载数据
	shippingAddress.initData();
});
var defultAddress = "";
var shippingAddress = {
	initData : function(){
		var url = 'Profile/AddresList';
		jyapp.getApi({
			method: url,
			onsuccess: function(data) {
//				console.log('-' + JSON.stringify(data))
				if (data.code == 1) {
					var oManagement = document.getElementById("shippingAddressId");
					var ohtml = '';
					var Addr1, Addr2 = [];
					for (var i = 0; i < data.data.length; i++) {
						var dataValue = data.data[i];
						if (data.data[i].Addr) {
							Addr1 = data.data[i].Addr.split("|")[0].replace("undefined","");
							Addr2 = data.data[i].Addr.split("|")[1].replace("undefined","");
						}
						ohtml += '<li class="mui-table-view-cell default mui-radio">';
						ohtml += '<input type="hidden" value='+dataValue.ID+' />';
						ohtml += '<input type="hidden" value='+dataValue.IsDefault+' />';
						ohtml += '<input type="hidden" value='+Addr2+' />';
						ohtml += '<a href="">';
						ohtml += '<h2>收件人：<span>'+dataValue.ConsigneeName+'</span><strong>'+dataValue.Mobile+'</strong></h2>';
						ohtml += '<p>'+Addr1+'</p>';
						if(dataValue.IsDefault == 1){
							defultAddress = dataValue;
							ohtml += '<em>默认</em>';
							ohtml += '<input type="radio"  name="radio" checked/>';
						}else{
							ohtml += '<input type="radio"  name="radio"/>';	
						}
						
						ohtml += '</a>';
						ohtml += '</li>';
					}
					oManagement.innerHTML = ohtml;
				}
			},
			onerror: function(e) {
				mui.toast(e.msg);
			}
		});
	},
	backCellWebview : function(){
		if(defultAddress !=""){
			var addressId = defultAddress.ID;
			var addressName = defultAddress.Addr.split("|")[0];
			var ConsigneeName = defultAddress.ConsigneeName;
			var Mobile = defultAddress.Mobile;
			var IsDefault = defultAddress.IsDefault;
			var webviewId = "";
			var webviewMethod = "";
			var webviewUrl = "";
			if(type == 0){
				webviewId = "package-about";
				webviewUrl = "package-about.html";
				webviewMethod = "newIdspackageAbout";
			}else if(type == 1){
				webviewId = "clientsAbout";
				webviewUrl = "clientsAbout.html";
				webviewMethod = "newIdsclientsAbout";
			}
			var config = {
				id : webviewId,
				url : webviewUrl,
				method : webviewMethod,
				extras : {
					addressId : addressId,
					addressName : addressName,
					ConsigneeName : ConsigneeName,
					Mobile : Mobile,
					IsDefault : IsDefault
				}
			}
		}else{
			var config = {
				id : webviewId,
				url : webviewUrl
			}
		}
		jyapp.backWebView(config);
		
	}
};
window.addEventListener("newIdsshippingAddress",function(event){
	//加载数据
	shippingAddress.initData();
});
//绑定回退按钮事件
document.getElementById("shippingAddressBackCellId").addEventListener("tap",shippingAddress.backCellWebview);