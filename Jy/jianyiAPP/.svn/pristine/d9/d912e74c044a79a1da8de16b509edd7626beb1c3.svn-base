function plusReady() {
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		//console.log("当前应用版本：" + inf.version);
		checkUpdate(inf.version);
	});
}
if (window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

//整包更新
function SDKUpdate(inf) {
	var btn=["立即更新", "取　　消"];
	if(inf.IsforcedUpdate==1){
		btn=["立即更新"];
	}
	// 提示用户是否升级
	plus.nativeUI.confirm(inf.Note, function(i) {
		if (0 == i.index) {
			plus.runtime.openURL(inf.Url);
		}
	}, inf.Title, btn); 
}

// 检测更新
function checkUpdate(v) {
	//plus.nativeUI.showWaiting("检测资源...");
	jyapp.getApi({
		method: 'Comment/AppVesion',
		data: 'v=' + v,
		onsuccess: function(r) {
			//plus.nativeUI.closeWaiting();
			//console.log(JSON.stringify(r));
			if (r.code == 1) {
				if (r.data.UpdateType == 1||r.data.UpdateType == 2) {
					//资源更新
					downWgt(r.data.Url);
				} else {
					//整包更新
					r.data.Note=r.data.Note.replace(/\<br>/g, "\n");
					if(plus.os.name=="iOS"){
						r.data.Url="itms-apps://itunes.apple.com/us/app/jian-yi-bao/id1109826346?l=zh&ls=1&mt=8";
					}
					SDKUpdate(r.data);
				}
			}
		},
		onerror: function(e) {
			//plus.nativeUI.closeWaiting();
			//console.log(e);
		}
	});
}

// 下载wgt资源
function downWgt(wgtUrl) {
	var w = plus.nativeUI.showWaiting("正在下载更新中...");
	//console.log("开始下载");
	plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(d, status) {
		if (status == 200) {
			w.close();
			//console.log("开始ok");
			//console.log("下载wgt成功：" + d.filename);
			installWgt(d.filename); // 安装wgt包
		} else {
			w.close();
			//console.log("开始失败");
			//console.log("下载wgt失败！");
			plus.nativeUI.alert("下载更新失败！");
		}
	}).start();
}

// 更新应用资源
function installWgt(path) {
	var w = plus.nativeUI.showWaiting("正在更新中...");
	plus.runtime.install(path, {}, function() {
		w.close();
		//console.log("安装wgt文件成功！");
		plus.nativeUI.alert("更新完成！", function() {
			plus.runtime.restart();
		});
	}, function(e) {
		w.close();
		//console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("更新失败[" + e.code + "]");
	});
}