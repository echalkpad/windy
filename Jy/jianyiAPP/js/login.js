(function($, doc) {
	$.plusReady(function() {
		var toMain = function() {
			setTimeout(function() {
				var mianPage = plus.webview.getLaunchWebview();
				if(mianPage){
					var list = mianPage.children();
					for (var i = 0; i < list.length; i++) {
						list[i].close();
					}
				}
				mianPage.reload();
				mianPage.show();
			}, 0);
		};

		var loginButton = doc.getElementById('login');
		var accountBox = doc.getElementById('account');
		var passwordBox = doc.getElementById('password');

		loginButton.addEventListener('onclick', function(event) {
			accountBox.blur();
			passwordBox.blur();
			var loginInfo = {
				account: accountBox.value,
				password: passwordBox.value
			};
			loginInfo = loginInfo || {};
			loginInfo.account = loginInfo.account || '';
			loginInfo.password = loginInfo.password || '';
			if (loginInfo.account.length < 1) {
				plus.nativeUI.toast('请输入正确的健e卡号');
				return;
			}
			if (loginInfo.password.length < 1) {
				plus.nativeUI.toast('请输入正确的密码');
				return;
			}
			jyapp.getToken({
				account: loginInfo.account,
				password: loginInfo.password,
				showWaiting: true,
				onsuccess: function(data) {
					toMain();
				},
				onerror: function(e) {
					plus.nativeUI.toast("用户名或密码错误");
				}
			});

		});

		// 绑定form表单提交事件
		document.getElementById('login-form').addEventListener('submit', function(e) {
			e.preventDefault(); // 阻止默认事件
			accountBox.blur();
			passwordBox.blur();
			var loginInfo = {
				account: accountBox.value,
				password: passwordBox.value
			};
			loginInfo = loginInfo || {};
			loginInfo.account = loginInfo.account || '';
			loginInfo.password = loginInfo.password || '';
			if (loginInfo.account.length < 1) {
				plus.nativeUI.toast('请输入正确的健e卡号');
				return;
			}
			if (loginInfo.password.length < 1) {
				plus.nativeUI.toast('请输入正确的密码');
				return;
			}

			jyapp.getToken({
				account: loginInfo.account,
				password: loginInfo.password,
				showWaiting: true,
				onsuccess: function(data) {
					toMain();
				},
				onerror: function(e) {
					console.log(e);
					plus.nativeUI.toast("用户名或密码错误");
				}
			});

		});

		//
		var backButtonPress = 0;
		$.back = function(event) {
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
	});
}(mui, document));

//点击显示密码
mui('#login-form').on('tap', 'small', function() {
	if (mui('#password')[0].type == 'password') {
		mui('#password')[0].type = 'text';
		document.getElementById("password").disabled = true;
		this.classList.add('pass');
	} else {
		document.getElementById("password").disabled = false;
		mui('#password')[0].type = 'password';
		this.classList.remove('pass');
	}
})