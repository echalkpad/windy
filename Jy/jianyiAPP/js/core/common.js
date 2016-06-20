﻿(function($, owner) {
	/**
	 * 触摸结束的时候触发
	 * 触发所有文本输入框失去焦点，从而使键盘关闭
	 * 文本框前后，点击是不生效，只有手指滑动屏幕才能生效
	 */
	document.addEventListener('touchmove', function() {
		var inputsFlag = this.getElementsByTagName('input');
		for (var i = 0; i < inputsFlag.length; i++) {
			if (document.activeElement.id == inputsFlag[i].id) {
				inputsFlag[i].blur();
				break;
			}
		}
		var textareaFlag = this.getElementsByTagName('textarea');
		for (var i = 0; i < textareaFlag.length; i++) {
			if (document.activeElement.id == textareaFlag[i].id) {
				textareaFlag[i].blur();
				break;
			}
		}
	});
	var w = null;
	owner.mainWebViews = {
		"main":"main.html",
		"mainIndex":"mainIndex",
		"mainInterrogation":"mainInterrogation",
		"mainMedication":"mainMedication",
		"mainHealthy":"mainHealthy",
		"mainMe":"mainMe",
		"indexHealthInformation":"indexHealthInformation",
		"SlowExpertsDetails" : "SlowExpertsDetails"
	};
	var checkUrls = "indexHealthInformationSlowExpertsDetails";
	/**
	 * 回退到指定页面，并关闭其他子页
	 * @param {Object} config
	 * @param object webviewId要回退的页面id
	 * @param object method要回退页面时候自定义事件名称
	 * @param {Object} extras回退页面自定义事件参数
	 * 
	 */
	owner.backWebView = function(config){
		var wview = plus.webview.getWebviewById(config.id);
		var id = wview ? wview.id : "";
		if(config.method && wview){
			mui.fire(wview,config.method,config.extras);
		}
		//当页面在回退时候将回退页面后面的子页全部关闭
		var wvs = plus.webview.all();
		var mianPage = plus.webview.getLaunchWebview();
		var fls = false;
		var num = 0;
		for(var i=0;i<wvs.length;i++){
			if(config.id == wvs[i].id){
				fls = true;
				num = i;
			}
			if(fls && wvs[i].id != mianPage.id && !jyapp.mainWebViews[wvs[i].id] && i > num){
				wvs[i].close();
			}
		}
		if(jyapp.mainWebViews[config.id] && checkUrls.indexOf(config.id) == -1){
			var mianPage = plus.webview.getLaunchWebview();
			mui.openWindow({
				id : mianPage.id,
				url : mianPage.url,
				extras : {
					index:config.index
				}
			});
		}else{
			if(wview){
				wview.show();
			}else{
				mui.openWindow({
					id : config.id,
					url : config.url,
					extras : config.extras
				});
			}
		}
		
	}
	/*
	 * 获取token
	 * 
	 */
	owner.getToken = function(config) {
		if (!w && config.showWaiting) {
			w = plus.nativeUI.showWaiting();
		}

		if (!config) {
			return;
		}
		var xhr = new plus.net.XMLHttpRequest();
		xhr.onreadystatechange = function() {
			switch (xhr.readyState) {
				case 4:
					if (w) {
						w.close();
						w = null;
					}
					if (xhr.status == 200) {
						var data = null;
						try {
							data = JSON.parse(xhr.responseText);
							//console.log(data.access_token);
							if (config.grantType && config.grantType == "client") {
								plus.storage.setItem("access_token_client", data.access_token);
								plus.storage.setItem("refresh_token_client", data.refresh_token);
								plus.storage.setItem("expires_in_client", data.expires_in);
							} else {
								plus.storage.setItem("access_token", data.access_token);
								plus.storage.setItem("refresh_token", data.refresh_token);
								plus.storage.setItem("expires_in", data.expires_in);
							}
							return config.onsuccess(data);
						} catch (e) {
							return config.onerror("获取token失败:" + e.message);
						}
					} else {
						config.onerror("获取token失败：" + xhr.status + xhr.responseText);
					}
					break;
				default:
					break;
			}
		}
		xhr.open("POST", jyapp.config.tokenUrl);
		xhr.setRequestHeader('Authorization', jyapp.config.authorization);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		var data = null;

		if (config.grantType && config.grantType == "client") {
			data = "grant_type=client_credentials";
		} else {
			//获取系统类型 Android = 1, IOS = 2
			var devicetype = "1";
			if (plus.os.name && plus.os.name == 'Android') {
				devicetype = "2";
			}
			//获取消息推送的 唯一标识
			var info = plus.push.getClientInfo();
			var channelid = info.clientid;
			plus.storage.setItem("channelid", channelid);

			data = "grant_type=password&username=" + config.account + "&password=" + config.password + "&channelid=" + channelid + "&devicetype=" + devicetype;
		}

		// 发送HTTP请求
		xhr.send(data);
	}

	/*
	 * 获取服务端API
	 * config配置
	 * 属性：
	 *		method:方法
	 *		data:post的data数据		
	 *      requestHeader： http请求头
	 *		timeout: 请求服务器的超时时间，单位为毫秒（ms）
	 *      showWaiting:true,是否自动显示loading
	 *		withCredentials: 是否支持跨域请求
	 *      tokenType:token的类型(客户端授权模式：client，密码模式：password)，客户端授权模式在用户未登录情况调用服务器api时使用(如：激活、注册等接口)，默认为password
	 * 事件：
	 *		onsuccess:请求数据成功
	 *		onerror：请求数据失败
	 *		onreadystatechange: 网络请求状态发生变化事件
	 *		onloadstart: 网络请求开始事件
	 *		onprogress: 网络请求传输数据事件
	 *		onabort: 网络请求取消事件
	 *		onerror: 网络请求错误事件
	 *		onload: 网络请求成功事件
	 *		ontimeout: 网络请求超时事件
	 *		onloadend: 网络请求结束事件
	 * 使用实例:
	 * 		jyapp.getApi({
	 *			method: 'DoctorOnline/DoctorList',
	 *			data:'',
	 *          requestHeader:{
	 * 	         	Content-Type:'application/x-www-form-urlencoded'
	 *  		},
	 *			onsuccess: function(data) {
	 *				console.log(JSON.stringify(data));
	 *			},
	 *			onerror: function(e) {
	 *				alert(e);
	 *			}
	 *		});
	 */

	owner.getApi = function(config) {
		if (!w && config.showWaiting) {
			w = plus.nativeUI.showWaiting();
		}

		if (!config) {
			return;
		}

		var xhr = new plus.net.XMLHttpRequest();

		if (config.timeout) {
			xhr.timeout = config.timeout;
			if (config.ontimeout) {
				xhr.ontimeout = config.ontimeout;
			}
		}

		xhr.onreadystatechange = function() {
//						console.log(xhr.responseText);
			switch (xhr.readyState) {
				case 4:
					if (w) {
						w.close();
						w = null;
					}
					plus.nativeUI.closeWaiting();
					if (xhr.status == 200) {
						try {
							var data = JSON.parse(xhr.responseText);
							return config.onsuccess(data);
						} catch (e) {
							return config.onerror(e.message);
						}
					} else {
						if (xhr.status == 401) {
							if (plus.storage.getItem("lauchFlag")) {
								owner.logout(true);
							}
						} else {
							return config.onerror("获取数据失败：" + xhr.status + xhr.responseText);
						}
					}
					break;
				default:
					break;
			}
		}
		var url = null;
		if (!jyapp.config.apiUrl) {
			return;
		} else {
			url = jyapp.config.apiUrl;
			if (config.method) {
				url = url + config.method;
			}
		}

		xhr.open("POST", url);
		//设置请求头
		if (config.requestHeader) {
			for (var i in config.requestHeader) {
				xhr.setRequestHeader(i, config.requestHeader[i]);
			}
		} else {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		if (config.tokenType && config.tokenType == "client") {
			xhr.setRequestHeader('Authorization', 'Bearer ' + plus.storage.getItem("access_token_client"));
			//			console.log('Bearer ' + plus.storage.getItem("access_token_client"));
		} else {
			xhr.setRequestHeader('Authorization', 'Bearer ' + plus.storage.getItem("access_token"));
			//			console.log('-----Bearer ' + plus.storage.getItem("access_token"));
		}

		//xhr.setRequestHeader('Authorization', 'Bearer gfDuuvNMV2LsngLTei0RRkN18exaFFgNnqn-nu5Ys3Z0_EgJVVQvhkvelD5vpsBm93TnMLMtbKGCV71SU-DACIX3QsrES8T-pmCF2jy1_oJXQifZDtTX8We-xY35dMJ1EJqUKo2xYFjBr0BLq9pOAz6T9a_J0ppPLxjAu6MkOwlCSsnbYvRIcDdVKO7wtctvOv43Vhj0Lsdp9qYOxAi2PVvsJEIsiYCo1TBWs6zT2YxK6czQgeiwgvZIKp4PjuJGjy5LtsD_czZ50sEuxhu0nFlbz70SZvnuqLIJowuKiUkBXx7NRr-Ef6lqlMV-4W6LgWqD-Tx6ENe-djeozCXBrk2pMmTHIL6ri0ZMwW8O0aZmOIG3');

		// 发送HTTP请求
		if (config.data) {
			xhr.send(config.data);
		} else {
			xhr.send();
		}
	};

	/*
	 * 文件上传
	 *	 var files = []; //需要上传的文件列表{name:'',path:''}
	 *	 files.push({name: 'testfile',path: path});
	
	 *	 jyapp.upLoad({
	 *		 method: 'DoctorOnline/DoctorCall',
	 *		 data:{
	 * 				departmentId:'35536',
	 *  			phoneNumber:'18516115656',
	 *  			problemDescription:'请求测试ssssssssssdfdsfdsfdsdsf'
	 * 		 },
	 *		 files: files,
	 *		 onsuccess: function(d) {
	 *		 	console.log(JSON.stringify(d));
	 *		 },
	 *		 onerror: function(e) {
	 *			console.log(e);
	 *	 	}
	 *	 });
	 */
	owner.upLoad = function(config) {
		var w = plus.nativeUI.showWaiting();
		var task = plus.uploader.createUpload(jyapp.config.apiUrl + config.method, {
				method: "POST"
			},
			function(t, status) {
				// 上传完成
				if (status == 200) {
					w.close();
					w = null;
					try {
						var data = JSON.parse(t.responseText);
						return config.onsuccess(data);
					} catch (e) {
						return config.onerror("上传失败:" + e.message);
					}
				} else {
					w.close();
					w = null;
					return config.onerror("上传失败:" + status);
				}
			}
		);

		if (config.data) {
			for (var i in config.data) {
				task.addData(i, config.data[i]);
			}
		}

		if (config.tokenType && config.tokenType == "client") {
			task.setRequestHeader('Authorization', 'Bearer ' + plus.storage.getItem("access_token_client"));
		} else {
			task.setRequestHeader('Authorization', 'Bearer ' + plus.storage.getItem("access_token"));
		}

		if (config.files && config.files.length > 0) {
			owner.compressImage(config.files, task, 0)
		} else {
			task.start();
		}
	};

	owner.compressImage = function(files, task, i) {
		var f = files[i];
		//压缩上传图片
		var dst = '_doc/compressimage' + f.path.substring(f.path.lastIndexOf("/"), f.path.length);
		//console.log(dst);
		plus.zip.compressImage({
				src: f.path,
				dst: dst,
				overwrite: true,
				quality: 20
			},
			function() {
				task.addFile(dst, {
					key: f.name
				});
				if (i == (files.length - 1)) {
					task.start();
					return;
				} else {
					owner.compressImage(files, task, ++i);
				}
			},
			function(error) {
				task.addFile(f.path, {
					key: f.name
				});
				if (i == (files.length - 1)) {
					task.start();
					return;
				} else {
					owner.compressImage(files, task, ++i);
				}
			});
	}

	//登出
	owner.logout = function(b) {
		if (!b) {
			//后台注销登录
			var info = plus.push.getClientInfo();
			var channelid = info.clientid;
			owner.getApi({
				method: 'Comment/DeleteChannel',
				data: 'ChannelID=' + channelid,
				onsuccess: function(r) {
//					console.log(JSON.stringify(r));
				},
				onerror: function(e) {
//					console.log(e);
				}
			});
		}

		//清除应用存储数据
		plus.storage.removeItem("access_token_client");
		plus.storage.removeItem("refresh_token_client");
		plus.storage.removeItem("expires_in_client");
		plus.storage.removeItem("access_token");
		plus.storage.removeItem("refresh_token");
		plus.storage.removeItem("expires_in");
		plus.storage.removeItem("FamilyDate");
		localStorage.removeItem("oneInfo");
		plus.storage.removeItem("channelid");
		//关闭除首页预加载页面外的所有页面
		owner.backWebView({id: 'login',url: '../login.html'});
		//关闭个人资料预加载页面
//		var ws = plus.webview.getWebviewById('personalData');
//		if (ws) {
//			plus.webview.close(ws);
//		}
		//跳转到登录页面
//		mui.openWindow({
//			id: 'login',
//			url: '../login.html'
//		});
	};
}(mui, jyapp));