var newDate = JSON.parse(localStorage.getItem("oneInfo"));
mui.plusReady(function() {
	onBulr();
	if (newDate.phone == null || newDate.phone == '') {
		document.querySelector('.mui-title').innerText = '绑定手机';
		document.querySelector(".modifyphone2").style.display = 'block';
		return
	}
	var ophone = document.getElementById("ModifyPhone");
	document.querySelector(".modifyphone1").style.display = 'block';
	newDate.phone == null || newDate.phone == '' ? ophone.innerHTML = '无' : ophone.innerHTML = newDate.phone.slice(0, 3) + '****' + newDate.phone.slice(7, 11);
})

mui('.mui-content').on('tap', '.sedPhoneCod', function() {
	getPhoneCod()
});
document.addEventListener('keyup', function(event) {
	//键盘回车事件
	if (event.keyCode == 13) {
		getPhoneCod();
	}
});

function onBulr() {
	var input = document.getElementsByTagName('input')[0];
	var val = document.getElementsByTagName('input')[0].value;
	input.focus();
	input.value = '';
	input.value = val;
}

function getPhoneCod() {
	var oldPhoneCod = document.getElementById("oldPhoneCod");
	var password0 = document.getElementById("password");
	var newPhone = document.getElementById("newPhone");
	var newPhoneCod = document.getElementById("newPhoneCod");
	var newPhone1 = document.getElementById("newPhone1");
	var newPhoneCod1 = document.getElementById("newPhoneCod1");
	var password1 = document.getElementById("password1");
	var data = '';
	var reg = /^[1][35789][0-9]{9}$/;
	if (newDate.phone && newDate.phone != null && newDate.phone != "") {
		var url = 'Profile/ChangeMobileRe';
		if (newPhone.value.length < 1) {
			mui.toast('请输入新手机号！');
			return false
		}
		if (!reg.test(newPhone.value)) {
			mui.toast('手机号码格式不正确！');
			return false
		}
		if (password0.value.length < 1) {
			mui.toast('请输入支付密码！');
			return false
		}
		if (oldPhoneCod.value.length < 1) {
			mui.toast('请输入收到的旧手机号验证码！');
			return false
		}
		if (newPhoneCod.value.length < 1) {
			mui.toast('请输入收到的新手机号验证码！');
			return false
		}

		data = 'pwd=' + password0.value + '&phone=' + newPhone.value + '&checkpwd=0&authcode=' + newPhoneCod.value + '&oldPhone=' + newDate.phone + '&oldPhoneAuthcode=' + oldPhoneCod.value;
	} else {
		var url = 'Profile/ChangeMobile';
		if (newPhone1.value.length < 1) {
			mui.toast('请输入新手机号！');
			return false
		}
		if (!reg.test(newPhone1.value)) {
			mui.toast('手机号码格式不正确！');
			return false
		}
		if (newPhoneCod1.value.length < 1) {
			mui.toast('请输入收到的验证码！');
			return false
		}
		if (password1.value.length < 1) {
			mui.toast('请输入支付密码！');
			return false
		}
		data = 'pwd=' + password1.value.toString() + '&phone=' + newPhone1.value.toString() + '&checkpwd=0&authcode=' + newPhoneCod1.value.toString();
	}
	jyapp.getApi({
		method: url,
		data: data,
		onsuccess: function(data) {
//						console.log('--' + JSON.stringify(data))
			mui.toast(data.msg);
			if (data.code == 0) {
				return false
			} else {
				var beforebackFromFamily = (function() {
					if (!commomUtil.closeWebviewById('mainMe')) {
						commomUtil.closeWebviewById('mainMe');
					}
					var subpage_style = {
						top: '50px',
						bottom: '50px'
					};
					//预加载返回页面
					var mainPage = plus.webview.getLaunchWebview();
					var sub = plus.webview.create("../mainMe.html", "mainMe", subpage_style);
					mainPage.append(sub);
					mainPage.show();
				})()
			}
		},
		onerror: function(e) {
			//			console.log('-++-' + JSON.stringify(e))
			mui.toast(e.msg);
		}
	});
}

var time = time2 = null;

function minusOne(self) {
	self.style.backgroundColor = '#ccc';
	self.innerText = '等待（' + num1 + '）';
	num1--;
	if (num1 < 0 || num1 < -1) {
		clearInterval(time);
		self.style.backgroundColor = '#ff5e5e';
		self.innerText = '发送验证码';
		num1 = 59;
		time = null;
		return false
	}
}

function minusOne2(self) {
	self.style.backgroundColor = '#ccc';
	self.innerText = '等待（' + num2 + '）';
	num2--;
	if (num2 < 0 || num2 < -1) {
		clearInterval(time2);
		self.style.backgroundColor = '#ff5e5e';
		self.innerText = '发送验证码';
		num2 = 59;
		time2 = null;
		return false
	}
}
var num1 = 59;

function SmsSend(phone) {
	var self = phone;
	if (!!time) {
		return false;
	}
	var ophone = phone.parentNode.querySelector('input').value;
	var reg = /^[1][35789][0-9]{9}$/;
	if (ophone == '') {
		mui.toast('手机号码不能为空！');
		return false
	}
	if (!reg.test(ophone)) {
		mui.toast('手机号码格式不正确！');
		return false
	}
	time = setInterval(function() {
		minusOne(self);
	}, 1000);
	var url = 'sms/send';
	var data = 'mobile=' + ophone;
//	console.log('-' + data);
	jyapp.getApi({
		method: url,
		data: data,
		onsuccess: function(data) {
			mui.toast(data.msg);
		},
		onerror: function(e) {
			mui.toast(e.msg);
		}
	});
}
var num2 = 59;

function SmsSend2(phone) {
	var self = phone;
	if (!!time2) {
		return false;
	}
	var reg = /^[1][35789][0-9]{9}$/;
	time2 = setInterval(function() {
		minusOne2(self);
	}, 1000);
	var ophone = newDate.phone;
	var url = 'sms/send';
	var data = 'mobile=' + ophone;
//	console.log('+' + data);
	jyapp.getApi({
		method: url,
		data: data,
		onsuccess: function(data) {
			mui.toast(data.msg);
		},
		onerror: function(e) {
			mui.toast(e.msg);
		}
	});
}