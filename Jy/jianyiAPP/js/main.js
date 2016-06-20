//mui初始化
var subpages = [{
	id: "mainIndex",
	url: "mainIndex.html",
	title: "首页"
}, {
	id: "mainInterrogation",
	url: "mainInterrogation.html",
	title: "寻医"
}, {
	id: "mainMedication",
	url: "mainMedication.html",
	title: "用药"
}, {
	id: "mainHealthy",
	url: "mainHealthy.html",
	title: "健康"
}, {
	id: "mainMe",
	url: "mainMe.html",
	title: "我的"
}];
var subpage_style = {
	top: '50px',
	bottom: '50px'
};
var index = 0;
var detailPage = null;
var self = new Object;
document.addEventListener("plusready", function() {
	plus.screen.lockOrientation("portrait-primary");
	plus.navigator.setStatusBarBackground("#00B6F3");
	plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackTranslucent');
	var mianPage = plus.webview.getLaunchWebview();
	jyapp.mainWebViews[mianPage.id] = mianPage.id;
	self = plus.webview.currentWebview();
	index = self.index ? self.index : 0;
	//初始化页面
	main.initMain(mianPage);
	// 监听在线消息事件
	plus.push.addEventListener("receive", function(msg) {
		try {
			//登录后再通知
			if (plus.storage.getItem("access_token")) {
				var content = JSON.parse(msg.content);
				//医生在线--医生接诊
				if (content.infotype == 3) {
					plus.webview.close(plus.webview.getWebviewById("payOrderFailure"));
					mui.openWindow({
						id: 'hasAdmissions',
						url: "./familyDoctor/hasAdmissions.html",
						createNew: true,
						extras: {
							msg: content.data
						}
					});
				}
				//医生在线--计费通知
				if (content.infotype == 4) {
					plus.webview.close(plus.webview.getWebviewById("payOrderFailure"));
					mui.openWindow({
						id: 'payOrderFailure',
						url: "./pay/payOrderFailure.html",
						createNew: true,
						extras: {
							orderId: content.data.orderId
						}
					});
				}
				//肿瘤--通知付款
				if (content.infotype == 5) {
					plus.webview.close(plus.webview.getWebviewById("orderDetailsPay"));
					mui.openWindow({
						id: 'orderDetailsPay',
						url: "./cancerExperts/orderDetailsPay.html",
						createNew: true,
						extras: {
							orderId: content.data.orderId
						}
					});
				}
				//肿瘤--通知服务完成
				if (content.infotype == 6) {
					plus.webview.close(plus.webview.getWebviewById("cancerOrderList"));
					mui.openWindow({
						id: 'cancerOrderList',
						url: "./cancerExperts/cancerOrderList.html",
						createNew: true,
						extras: {
							index: 3
						}
					});
				}

				//用药提醒
				if (content.infotype == 9) {
					//plus.nativeUI.alert(content.data.msg);
				}

				//生日提醒
				if (content.infotype == 10) {
					//plus.nativeUI.alert(content.data);
				}
			}

		} catch (e) {}
	}, false);
	var backButtonPress = 0;
	mui.back = function(event) {
		backButtonPress++;
		if (backButtonPress > 1) {
			plus.runtime.quit();
		} else {
			plus.nativeUI.toast('再按一次退出应用');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
		return false;
	};
	//初始化需要显示的标题和a标签样式
	main.setMainATitle();
});

var main = {
	initMain: function(mianPage) {
		//获取是否显示活动页面
		var showGuide = plus.storage.getItem("lauchFlag");
		if (showGuide) {
			plus.navigator.setFullscreen(false);
			//关闭所有页面
//			var mianPage = plus.webview.getLaunchWebview();
			commomUtil.closeAll(mianPage.id);
			for (var i = 0; i < subpages.length; i++) {
				var sub = plus.webview.getWebviewById(subpages[i].id);
				if (!sub) {
					var sub = plus.webview.create(subpages[i].url, subpages[i].id, subpage_style);
					mianPage.append(sub);
				}
			}
			main.hideWebviewById(subpages[index].id);
			//
		} else {
			//显示启动导航
			mui.openWindow({
				id: 'guide',
				url: '../guidePage.html',
				show: {
					aniShow: 'none'
				},
				waiting: {
					autoShow: false
				}
			});

		}
		//关闭splash页面；
//		plus.navigator.closeSplashscreen();
	},
	hideWebviewById: function(webviewId) {
		for (var i = 0; i < subpages.length; i++) {
			if (i == index) {
				plus.webview.getWebviewById(webviewId).show();
			} else {
				var wvid = subpages[i].id;
				var webview = plus.webview.getWebviewById(wvid);
				if (webview) {
					webview.hide();
				}
			}
		}
	},
	setMainATitle: function() {
		var otitle = document.getElementById('title'),
			btnAdd = document.getElementById('btn-add'),
			btnMsg = document.getElementById('btn-msg'),
			btnPay = document.getElementById('btn-pay');
		btnSwich = document.getElementById('btn-swich');
		for (var i = 0; i < 4; i++) {
			btnMsg.style.display = 'none';
			btnPay.style.display = 'none';
			btnAdd.style.display = 'none';
			btnSwich.style.display = 'none';
		}
		switch (index) {
			case 0:
				btnMsg.style.display = 'inline-block';
				btnPay.style.display = 'inline-block';
				break;
			case 1:
				otitle.setAttribute('class', 'mui-title');
				break;
			case 2:
				btnSwich.style.display = 'inline-block';
				var myDate = new Date();
				var ohtml = '<a href="" class="btn-date" id="btn-date"><img src="../img/pharmacy_btn_date@2x.png" width="20px"/></a>';
				otitle.setAttribute('class', 'mui-title icon-date mc-date');
				break;
			case 3:
				otitle.setAttribute('class', 'mui-title');
				break;
			case 4:
				btnMsg.style.display = 'inline-block';
				break;
		}
		otitle.innerHTML = subpages[index].title;
	}
}

//导航按钮点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	var otitle = document.getElementById('title'),
		btnAdd = document.getElementById('btn-add'),
		btnMsg = document.getElementById('btn-msg'),
		btnPay = document.getElementById('btn-pay');
	btnSwich = document.getElementById('btn-swich');
	for (var i = 0; i < 4; i++) {
		btnMsg.style.display = 'none';
		btnPay.style.display = 'none';
		btnAdd.style.display = 'none';
		btnSwich.style.display = 'none';
	}
	//更换标题
	if (this.querySelector('.mui-tab-label').innerHTML == '首页') {
		index = 0;
		btnMsg.style.display = 'inline-block';
		btnPay.style.display = 'inline-block';
		otitle.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	} else if (this.querySelector('.mui-tab-label').innerHTML == '寻医') {
		index = 1;
		otitle.setAttribute('class', 'mui-title');
		otitle.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	} else if (this.querySelector('.mui-tab-label').innerHTML == '用药') {
		index = 2;
		btnSwich.style.display = 'block';
		var myDate = new Date();
		var ohtml = '<a href="" class="btn-date" id="btn-date"><img src="../img/pharmacy_btn_date@2x.png" width="20px"/></a>';
		otitle.setAttribute('class', 'mui-title icon-date mc-date');
		title.innerHTML = ohtml + (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日';
	} else if (this.querySelector('.mui-tab-label').innerHTML == '健康') {
		index = 3;
		otitle.setAttribute('class', 'mui-title');
		otitle.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	} else if (this.querySelector('.mui-tab-label').innerHTML == '我的') {
		index = 4;
		btnMsg.style.display = 'inline-block';
		otitle.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	}
	//显示目标选项卡
	//初始化页面
	main.hideWebviewById(subpages[index].id);
});
//切换家人
window.addEventListener('switchFamily', function(event) {
	var btnSwich = document.getElementById('btn-swich');
	var html = event.detail.html;
	var familyIdIndex = event.detail.familyId;
	if (!familyIdIndex || typeof(familyIdIndex) == "undefined" || familyIdIndex != "") {
		familyIdIndex = 0;
	}
	var accountTypeIndex = event.detail.accountType;
	if (!accountTypeIndex || typeof(accountTypeIndex) == "undefined" || accountTypeIndex != "") {
		accountTypeIndex = 0;
	}
	html += '<img src="../img/me/btn_qiehuan.png" width="14px" style="margin-left:5px"/>';
	html += '<input type="hidden" value="' + accountTypeIndex + '" id="accountTypeSwitchReback" />';
	html += '<input type="hidden" value="' + familyIdIndex + '" id="familyIdSwitchReback" />';
	btnSwich.innerHTML = html;
});