var uploadfiles = []; //上传图片的数组
var mePic = document.getElementById("mePic") //头像
var nameResult = document.getElementById("nameResult") //姓名
var sexResult = document.getElementById("sexResult") //性别
var birthResult = document.getElementById("birthResult") //生日
	//var departmentResult = document.getElementById("departmentResult") //部门
var addressResult = document.getElementById("addressResult") //地址
var signatureResult = document.getElementById("signatureResult") //个性签名
var newDate = JSON.parse(localStorage.getItem("oneInfo"));
//拍照选择提示框
mui('.mui-table-view').on('tap', '.head-pic', function(e) {
	mui('#userPicture').popover('toggle');
});
//mui('.mui-table-view').on('tap', '#meSex', function(e) {
//	mui('#sex').popover('toggle');
//});

//点击保存
mui('.mui-bar').on('tap', '#save', function() {
		var url = 'Profile/PersonDataEdit';
		var data = {
			'fullname': newDate.fullname.toString(),
			'gender': newDate.gender,
			'departmentName': '',
			'address': addressResult.innerHTML,
			'sign': signatureResult.innerHTML.slice(0, 30),
			'phone': newDate.phone,
			'idtype': newDate.idtype,
			'idnumber': newDate.idnumber,
			'nickname': newDate.fullname
		}
//		console.log(url);
//		console.log(JSON.stringify(data));
//		console.log(JSON.stringify(uploadfiles));
		jyapp.upLoad({
			method: url,
			data: data,
			files: uploadfiles,
			timeout: 10000,
			onsuccess: function(data) {
//				console.log(JSON.stringify(data))
				mui.toast(data.msg);
				personalData.beforebackFromFamily();
			},
			onerror: function(e) {
				mui.toast(data.msg);
//				console.log(JSON.stringify(e))
			}
		});
	})
	//拍照
mui('.mui-content').on('tap', '#getCamera', function() {
		getImage();
	})
	//取照片
mui('.mui-content').on('tap', '#getCameraFOrPhone', function() {
		galleryImg();
	})
	//初始化
mui.plusReady(function() {
	var uploadfiles = []; //上传图片的数组
	var mePic = document.getElementById("mePic") //头像
	var nameResult = document.getElementById("nameResult") //姓名
	var sexResult = document.getElementById("sexResult") //性别
	var birthResult = document.getElementById("birthResult") //生日
		//var departmentResult = document.getElementById("departmentResult") //部门
	var addressResult = document.getElementById("addressResult") //地址
	var signatureResult = document.getElementById("signatureResult") //个性签名
	var newDate = JSON.parse(localStorage.getItem("oneInfo"));
	personalData.getData(); //页面加载获取数据
	//		personalData.selectInit(); //页面设置数据
})
var personalData = {
		getData: function() {
			var ophone = document.getElementById("ModifyPhone").querySelector('span');
			newDate.phone == null || newDate.phone == '' ? ophone.innerHTML = '无' : ophone.innerHTML = newDate.phone.slice(0, 3) + '****' + newDate.phone.slice(7, 11);
			nameResult.innerHTML = newDate.fullname == '' || newDate.fullname == null ? '' : newDate.fullname;
			newDate.gender == null || newDate.gender == '' ? sexResult.innerHTML = '未知' : sexResult.innerHTML = ['', '女', '男'][newDate.gender];
			jyapp.getApi({
				method: 'Profile/PersonData',
				onsuccess: function(data) {
//										console.log('头像' + JSON.stringify(data))
					if (data.data == null) {
						return false
					}
					var FamilyDate = JSON.parse(plus.storage.getItem("FamilyDate"));
					document.getElementById("idnumber").innerText = data.data.idnumber;
					setSelectFamily(FamilyDate.IDCard, data.data.idtype, function(i) {
						document.getElementById("papersResult").innerText = JSON.stringify(FamilyDate.IDCard[i].name).slice(1, -1);
						document.getElementById("papersResult").setAttribute('idtype', data.data.idtype);
					})
					birthResult.innerHTML = getNewBrithday(data.data.Birthday);
					addressResult.innerHTML = data.data.address == '' ? '无' : data.data.address;
					signatureResult.innerHTML = data.data.sign == '' ? '无' : data.data.sign;
					if (data.data.Head !== null) {
						mePic.setAttribute('src', data.data.Head);
						mePic.setAttribute('onerror', "this.src='../../img/default/huiyuan_touxiang.png';this.onerror=null");
						uploadfiles = [];
						var files = {
							name: data.data.Head,
							path: data.data.Head
						}
						uploadfiles.push(files);
					}
				},
				onerror: function(e) {
					//					alert(e);
				}
			});
		},
		selectInit: function() {
			mui.init();
			mui.ready(function() {
				var url = 'system/getalldictionary';
				ajax(url, null, function(data) {
					//证件
					var mePapers = new mui.PopPicker();
					mePapers.setData(getNewArr(data.IDCard));
					var showPapersButton = document.getElementById('mePapers');
					var papersResult = document.getElementById('papersResult');
					showPapersButton.addEventListener('tap', function(event) {
						mePapers.show(function(items) {
							var s = JSON.stringify(items[0].text);
							var idtype = JSON.stringify(items[0].id);
							s = s.replace("\"", "").replace("\"", "");
							papersResult.innerText = s;
							papersResult.setAttribute('idtype', idtype);
						});
					}, false);
				})
			});
		},
		indexFamilyDoctorBack: function() {
			var mianPage = plus.webview.getLaunchWebview();
			mui.openWindow({
				id: mianPage.id,
				url: mianPage.uri,
				extras: {
					index: 4
				}
			});
		},
		beforebackFromFamily: function(accountType, familyId) {
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
		}
	}
	//取相册
function galleryImg() {
	// 从相册中选择图片
	//	console.log("从相册中选择图片:");
	plus.gallery.pick(function(path) {
		uploadfiles = [];
		mePic.setAttribute('src', path);
		var files = {
			name: path,
			path: path
		}
		uploadfiles.push(files);
		mui('#userPicture').popover('hide');
	}, function(e) {
		//		console.log("取消选择图片");
		mui('#userPicture').popover('hide');
	}, {
		filter: "image"
	});
}
//设置图片
function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(e) {
			var path = JSON.stringify(e.toLocalURL()).slice(6, -1);
			uploadfiles = [];
			mePic.setAttribute('src', path);
			var files = {
				name: e.toLocalURL(),
				path: e.toLocalURL()
			}
			uploadfiles.push(files);
			mui('#userPicture').popover('hide');
			//			console.log('照片路径' + path);
		}, function(e) {
			//			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(e) {
		//		console.log("失败：" + e.message);
		mui('#userPicture').popover('hide');
	}, {
		filename: "_doc/camera/",
		index: 1
	});
}

function ajax(url, data, ca) {
	jyapp.getApi({
		method: url,
		data: data,
		onsuccess: function(data) {
			//			console.log(JSON.stringify(data));
			mui.toast(data.msg);
			if (data.code == 1) {
				if (ca) ca(data.data);
			}
		},
		onerror: function(e) {
			//			console.log(JSON.stringify(e));
			mui.toast(e.msg);
		}
	});
}
//设置下拉选择框
function getNewArr(data) {
	for (var i in data) {
		if (data[i].id) {
			data[i].value = data[i].id;
		}
		if (data[i].name) {
			data[i].text = data[i].name;
		}
	}
	return data;
}
//设置获取下拉选择框
function setSelectFamily(a, b, ca) {
	for (var i = 0, len = a.length; i < len; i++) {
		if (b == a[i].id) {
			if (ca) {
				ca(i);
			}
		}
	}
}
//获取生日
function getNewBrithday(data) {
	var newBrithday = '';
	newBrithday = new Date(parseInt(data.slice(6, -2))).getFullYear() + '-' + (new Date(parseInt(data.slice(6, -2))).getMonth() + 1) + '-' + new Date(parseInt(data.slice(6, -2))).getDate();
	return newBrithday
}
window.addEventListener('Signature', function(event) {
	signatureResult.innerText = event.detail.otextarea;
});

window.addEventListener('newAddress', function(event) {
	personalData.getData(); //页面加载获取数据
	//	personalData.selectInit(); //页面设置数据
});

//绑定回退事件
document.getElementById("indexFamilyDoctorBackId").addEventListener("tap", personalData.indexFamilyDoctorBack);