var originalPassword = document.getElementById("originalPassword");
var newPassword = document.getElementById("newPassword");
mui('section').on('tap', '#determine', function() {
	updataPassword();
})

document.addEventListener('keyup', function(event) {
	//键盘回车事件
	if (event.keyCode == 13) {
		updataPassword();
	}
});

function updataPassword() {
	var reg = /^[0-9a-zA-Z_!$#%]{6,20}$/;
	if (originalPassword.value.length < 1) {
		mui.toast('请输入原密码！');
		return
	}
	if (newPassword.value.length < 1) {
		mui.toast('请输入新密码！');
		return
	}
	if (!reg.test(originalPassword.value) || !reg.test(newPassword.value)) {
		mui.toast('密码由6-20位英文字母、数字或下划线组成');
		return
	}
	var InpNum = document.getElementsByTagName('input')
	for (var i = 0; i < InpNum.length; i++) {
		InpNum[i].blur();
	}
	//	console.log(originalPassword.value+'---'+newPassword.value)
	jyapp.getApi({
		method: 'Profile/ChangePassword',
		data: 'oldpwd=' + originalPassword.value.toString() + '&newpwd=' + newPassword.value.toString(),
		onsuccess: function(data) {
			//			console.log(JSON.stringify(data))
			if (data.code == 1) {
				plus.nativeUI.alert("密码修改成功， 请重新登录！", function() {
					changePassWordlogout();
				}, "健医宝", "好的");
				return
			}
			mui.toast(data.msg);
		},
		onerror: function(e) {
			//			console.log(JSON.stringify(data))
			mui.toast(data.msg);
		}
	});
}

function changePassWordlogout(b){
	plus.storage.removeItem("access_token_client");
	plus.storage.removeItem("refresh_token_client");
	plus.storage.removeItem("expires_in_client");
	plus.storage.removeItem("access_token");
	plus.storage.removeItem("refresh_token");
	plus.storage.removeItem("expires_in");
	plus.storage.removeItem("FamilyDate");
	localStorage.removeItem("oneInfo");
	plus.storage.removeItem("channelid");
	mui.openWindow({
		id: 'login',
		url: '../../login.html'
	});
}
//点击显示密码
mui('.mui-input-row').on('tap', 'i', function() {
	var Pre = this.parentNode.children[1];
	if (Pre.type == 'password') {
		Pre.type = 'text';
		this.classList.add('pass');
	} else {
		Pre.type = 'password';
		Pre.removeAttribute('readonly')
		this.classList.remove('pass');
	}
})

function check(str, t) {
	if (t.type == 'text') {
		t.setAttribute('readonly', 'true');
	} else {
		t.removeAttribute('readonly')
	}
	var temp = ""
	for (var i = 0; i < str.length; i++)
		if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255)
			temp += str.charAt(i)
	return temp
}