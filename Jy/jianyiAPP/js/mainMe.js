mui.plusReady(function() {
	//存储字典里的信息
	(function($, doc) {
		$.init();
		$.ready(function() {
			var url = 'system/GetAllDictionaryRe';
			jyapp.getApi({
				method: url,
				onsuccess: function(data) {
					var FamilyDate = {
						'Gender': data.data.Gender,
						'Relation': data.data.Relation,
						'IDCard': data.data.IDCard,
					};
					plus.storage.setItem("FamilyDate", JSON.stringify(FamilyDate));
				},
				onerror: function(e) {
					mui.toast(e);
				}
			});
		});
	})(mui, document);
	//初始化
	mainMe.init();
	//绑定注销事件
	document.getElementById('logout').addEventListener('tap', function(event) {
		jyapp.logout();
	});
})

var mainMe = {
	init: function() {
		jyapp.getApi({
			method: 'Profile/Index',
			onsuccess: function(data) {
				//												console.log('-----------' + JSON.stringify(data));
				var newData = {};
				if (data.data == null) {
					newData = {
						'fullname': '', //全名
						'jycardnumber': 0000000000000000, //卡号
						'phone': '', //手机号
						'idtype': '', //证件类型
						'gender': '', //性别
						'idnumber': '', //证件号码
						'nickname': '', //昵称
						'card_balance': '', //原则上红包余额+保单余额,实际使用字段值
						'policy_balance': '', //保单额
						'coupon_count': '', //卡券数
						'bonus_count': '', //红包个数
						'bonus_total': '', //红包额
						'effc_days': '', //保单过期天数
						'nickname': '', //昵称
						'Head': '' //头像
					}
				} else {
					newData = {
						'fullname': data.data.cusinfo.fullname, //全名
						'jycardnumber': data.data.cusinfo.jycardnumber, //卡号
						'phone': data.data.cusinfo.phone, //手机号
						'idtype': data.data.cusinfo.idtype, //证件类型
						'gender': data.data.cusinfo.gender, //性别
						'idnumber': data.data.cusinfo.idnumber, //证件号码
						'nickname': data.data.cusinfo.nickname, //昵称
						'card_balance': data.data.card_balance, //原则上红包余额+保单余额,实际使用字段值
						'policy_balance': data.data.policy_balance, //保单额
						'coupon_count': data.data.coupon_count, //卡券数
						'bonus_count': data.data.bonus_count, //红包个数
						'bonus_total': data.data.bonus_total, //红包额
						'effc_days': data.data.effc_days, //保单过期天数
						'nickname': data.data.cusinfo.nickname, //昵称
						'Head': data.data.cusinfo.Head //头像
					}
				}
				var oFullname = document.getElementById("fullname");
				var oSex = document.getElementById("sex");
				var oCard = document.getElementById("JeCard");
				//个性签名和设置头像
				jyapp.getApi({
					method: 'Profile/PersonData',
					onsuccess: function(data) {
						//						console.log(JSON.stringify(data))
						if (data.data == null) {
							return false
						}
						document.getElementById("sign").innerHTML = data.data.sign == '' ? '' : data.data.sign;
						var mePic = document.getElementById('mePic');
						if (data.data.Head != null) {
							mePic.setAttribute('src', data.data.Head);
							mePic.setAttribute('onerror', "this.src='../img/default/huiyuan_touxiang.png';this.onerror=null");
						}
					},
					onerror: function(e) {
						mui.toast(e);
					}
				});
				oFullname.innerHTML = newData.fullname;
				newData.jycardnumber == null ? oCard.querySelector('span').innerHTML = '0000000000000000' : oCard.querySelector('span').innerHTML = newData.jycardnumber;
				localStorage.setItem("oneInfo", JSON.stringify(newData));
				if (newData.gender == '' || newData.gender == null) {
					return
				} else if (newData.gender == 1) {
					oSex.setAttribute('class', 'sex-man');
				} else {
					oSex.setAttribute('class', 'sex-wuman');
				}
			},
			onerror: function(e) {
				mui.toast(e);
			}
		});
	},
}

//我的家人
document.getElementById("meFamily").addEventListener('tap', function() {
		mui.openWindow({
			id: 'meFamily',
			url: "../html/me/meFamily.html",
			createNew: true,
		});
	})
	//个人资料
document.getElementById("personalData").addEventListener('tap', function() {

	//关闭子页面所有的webview
	//	var ws1 = plus.webview.getWebviewById('personalData');
	//	var ws2 = plus.webview.getWebviewById('newAddress');
	//	var ws3 = plus.webview.getWebviewById('addressManagement');
	//	var ws4 = plus.webview.getWebviewById('ModifyPhone');
	//	var ws5 = plus.webview.getWebviewById('changePassword');
	//	var ws = [ws1, ws2, ws3, ws4, ws5];
	//	if (ws1 || ws2 || ws3 || ws4 || ws5) {
	//		for (var i = 0, len = ws.length; i < len; i++) {
	//			plus.webview.close(ws[i]);
	//		}
	//	}
	mui.openWindow({
		id: 'personalData',
		url: "../html/me/personalData.html",
		createNew: true,
	});
})