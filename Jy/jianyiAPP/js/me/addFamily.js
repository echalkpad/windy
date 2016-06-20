var ogender; //性别
var uploadfiles = []; //上传图片的数组
var newUploadfiles = '';
var familyId = false; ///判断是否是更新家人默认是false
var isBirthReminder = 1, //是否生日提醒
	isMedicationReminder = 1, //是否接收用药提醒
	birthReminder = document.getElementById("birthReminder"),
	medicationReminder = document.getElementById("medicationReminder");


var reg = /0?(13|14|15|18|17)[0-9]{9}/,
	reg2 = /\d{10,17}/,
	reg3 = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/;
//初始化
mui.plusReady(function() {
		addFamily.selectInit();
		addFamily.init();
	})
	//增加或者更新家人按钮
document.getElementById("submitFamily").addEventListener('tap',function(){
		addFamily.clearClass();
		addFamily.submitFamily();
})
	//点击切换是否生日提醒
birthReminder.addEventListener('tap', function() {
		this.getAttribute('class') == 'mui-switch mui-switch-mini mui-active' ? isBirthReminder = 1 : isBirthReminder = 0;
	})
	//点击切换是否接收用药提醒
medicationReminder.addEventListener('tap', function() {
		this.getAttribute('class') == 'mui-switch mui-switch-mini mui-active' ? isMedicationReminder = 1 : isMedicationReminder = 0;
	})
	//点击是否显示/隐藏遮罩层
mui('.mui-table-view').on('tap', '.head-pic', function(e) {
	mui('#userPicture').popover('toggle');
});

//点击拍照
mui('.mui-content').on('tap', '#getCamera', function() {
		getImage();
	})
	//点击取照片
mui('.mui-content').on('tap', '#getCameraFOrPhone', function() {
	galleryImg();
})
var addFamily = {
	init: function() {
		//判断是否是更新家人
		var self = plus.webview.currentWebview();
		var fid = self.fid;
		if (fid) {
			//修改标题
			document.querySelectorAll(".mui-title")[0].innerText = '修改家人';
			familyId = fid;
			var url = 'profile/FamilyInformation';
			var data = 'familyId=' + parseInt(fid);
			ajax(url, data, function(data) {
				//				console.log('--' + JSON.stringify(data));
				var FamilyDate = JSON.parse(plus.storage.getItem("FamilyDate"));
				var head = jyapp.config;
				if (data.Head !== null) {
					newUploadfiles = data.Head,
						mePic.setAttribute('src', data.Head);
					mePic.setAttribute('onerror', "this.src='../../img/default/huiyuan_touxiang.png';this.onerror=null");

				}
				document.getElementById("nameResult").value = data.Name;
				setSelectFamily(FamilyDate.Relation, data.Relation, function(i) {
					document.getElementById("relationResult").innerText = JSON.stringify(FamilyDate.Relation[i].name).slice(1, -1);
					document.getElementById("relationResult").setAttribute('relationid', data.Relation);
				})
				setSelectFamily(FamilyDate.Gender, data.Gender, function(i) {
					document.getElementById("sexResult").innerText = JSON.stringify(FamilyDate.Gender[i].name).slice(1, -1);
					document.getElementById("sexResult").setAttribute('sexid', data.Gender)
				})
				setSelectFamily(FamilyDate.IDCard, data.CredentialsType, function(i) {
					document.getElementById("papersResult").innerText = JSON.stringify(FamilyDate.IDCard[i].name).slice(1, -1);
					document.getElementById("papersResult").setAttribute('idtype', data.CredentialsType);
				})
				document.getElementById("birthResult").innerText = getNewBrithday(data.Birthday);
				document.getElementById("phoneNum").value = data.Mobile;
				document.getElementById("papersResult").value;
				document.getElementById("idnumber").value = data.CredentialsNo;
				data.IsBirthdayRemind == 1 ? document.getElementById("birthReminder").setAttribute('class', 'mui-switch mui-switch-mini mui-active') : document.getElementById("birthReminder").setAttribute('class', 'mui-switch mui-switch-mini');
				data.IsDrugRemind == 1 ? document.getElementById("medicationReminder").setAttribute('class', 'mui-switch mui-switch-mini mui-active') :
					document.getElementById("medicationReminder").setAttribute('class', 'mui-switch mui-switch-mini');
			})
		}
	},
	selectInit: function() {
		mui.init();
		mui.ready(function() {
			var url = 'system/GetAllDictionaryRe';
			ajax(url, null, function(data) {
				//性别
				var userSex = new mui.PopPicker();
				userSex.setData(getNewArr(data.Gender));
				var showSexButton = document.getElementById('meSex');
				var sexResult = document.getElementById('sexResult');
				showSexButton.addEventListener('tap', function(event) {
					userSex.show(function(items) {
						var s = JSON.stringify(items[0].text);
						var sexid = JSON.stringify(items[0].id);
						s = s.replace("\"", "").replace("\"", "");
						sexResult.innerText = s;
						sexResult.setAttribute('sexid', sexid);
					});
				}, false);
				//关系
				var meRelation = new mui.PopPicker();
				meRelation.setData(getNewArr(data.Relation));
				var showRelationButton = document.getElementById('meRelation');
				var relationResult = document.getElementById('relationResult');
				showRelationButton.addEventListener('tap', function(event) {
					meRelation.show(function(items) {
						var s = JSON.stringify(items[0].text);
						var relationid = JSON.stringify(items[0].id);
						s = s.replace("\"", "").replace("\"", "");
						relationResult.innerText = s;
						relationResult.setAttribute('relationid', relationid);
					});
				}, false);
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
//					var idtype = document.getElementById("papersResult").getAttribute('idtype');
					
				//日期
				var result = mui('#birthResult')[0];
				var btns = mui('#mebirthday');
				btns.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var optionsJson = '{"type":"date","beginYear":1900,"endYear":' + new Date().getFullYear() + '}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						var picker = new mui.DtPicker(options);
						picker.show(function(rs) {
							result.innerText = rs.text;
							picker.dispose();
						});
					}, false);
				})
			})
		});
	},
	submitFamily: function() {
		
		var name = document.getElementById("nameResult").value;
		var birthResult = document.getElementById("birthResult").innerText;
		var idnumber = document.getElementById("idnumber").value;
		var phoneNum = document.getElementById("phoneNum").value;

		
		
		var gender = document.getElementById("sexResult").getAttribute('sexid');
		var relation = document.getElementById("relationResult").getAttribute('relationid');
		var idtype = document.getElementById("papersResult").getAttribute('idtype');
		var birthResult = document.getElementById("birthResult").innerText;
		
		var url = 'profile/addfamilyRe';
		//		var data = 'Name=' + name.toString() + '&Gender=' + parseInt(gender) + '&Relation=' + parseInt(relation) + '&CredentialsType=' + parseInt(idtype) + '&CredentialsNo=' + idnumber.toString() + '&Birthday=' +
		//			birthResult.toString() + '&Mobile=' + phoneNum.toString() + '&IsBirthdayRemind=' + isBirthReminder + '&IsDrugRemind=' + isMedicationReminder;
		var data = {
			'Name': name.toString(),
			'Gender': gender,
			'Relation': relation,
			'CredentialsType': idtype,
			'CredentialsNo': idnumber.toString(),
			'Birthday': birthResult.toString(),
			'Mobile': phoneNum.toString(),
			'IsBirthdayRemind': isBirthReminder.toString(),
			'IsDrugRemind': isMedicationReminder.toString(),
		}
		if (!!familyId) {
			data = data + '&ID=' + familyId
			var data = {
				'Name': name.toString(),
				'Gender': gender,
				'Relation': relation,
				'CredentialsType': idtype,
				'CredentialsNo': idnumber.toString(),
				'Birthday': birthResult.toString(),
				'Mobile': phoneNum.toString(),
				'IsBirthdayRemind': isBirthReminder.toString(),
				'IsDrugRemind': isMedicationReminder.toString(),
				'ID': familyId,
				'Head': newUploadfiles
			}
		}
		
		/*if (!reg3.test(name) || !reg2.test(idnumber) || !reg.test(phoneNum) || gender == null || relation == null || birthResult == null) {
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}*/
		
		
		
		if (document.getElementById("nameResult").value.length<1){
//			console.log('1');
			document.getElementById("nameResult").setAttribute('class','addFamily-r selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}else if(!reg.test(phoneNum)){
//			console.log('2');
			document.getElementById("phoneNum").setAttribute('class','addFamily-r selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}else if(!reg2.test(idnumber)){
//			console.log('2');
			document.getElementById("idnumber").setAttribute('class','addFamily-r selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}else if(gender == null){
//			console.log('4');
			document.getElementById("sexResult").setAttribute('class','mui-badge mui-badge-inverted selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}else if(relation == null){
//			console.log('5');
			document.getElementById("relationResult").setAttribute('class','mui-badge mui-badge-inverted selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}else if(birthResult == '请选择'){
//			console.log('6');
			document.getElementById("birthResult").setAttribute('class','mui-badge mui-badge-inverted selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}else if(idtype == null){
//			console.log('7');
			document.getElementById("papersResult").setAttribute('class','mui-badge mui-badge-inverted selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}
		
		
		
		
//		console.log('-' + JSON.stringify(uploadfiles))
		jyapp.upLoad({
			method: url,
			data: data,
			files: uploadfiles,
			timeout: 10000,
			onsuccess: function(data) {
//				console.log('--' + JSON.stringify(data))
				mui.toast(data.msg);
				mui.openWindow({
					id: 'meFamily',
					url: 'meFamily.html',
					createNew: true
				})
			},
			onerror: function(e) {
//				console.log('--' + JSON.stringify(e))
				mui.toast(data.msg);
			}
		});
	},
	clearClass: function(){
		document.getElementById("nameResult").setAttribute('class','addFamily-r');
		document.getElementById("idnumber").setAttribute('class','addFamily-r');
		document.getElementById("phoneNum").setAttribute('class','addFamily-r');
		document.getElementById("sexResult").setAttribute('class','mui-badge mui-badge-inverted');
		document.getElementById("relationResult").setAttribute('class','mui-badge mui-badge-inverted');
		document.getElementById("birthResult").setAttribute('class','mui-badge mui-badge-inverted');
		document.getElementById("papersResult").setAttribute('class','mui-badge mui-badge-inverted');
	},
	/*clearBlur1: function(event){
		if (document.getElementById("nameResult").value.length<1){
//			console.log('1');
			document.getElementById("nameResult").setAttribute('class','addFamily-r selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}
		if(!reg.test(document.getElementById("phoneNum").value)){
//			console.log('2');
			document.getElementById("phoneNum").setAttribute('class','addFamily-r selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}
		if(!reg2.test(document.getElementById("idnumber").value)){
			console.log('3');
			document.getElementById("idnumber").setAttribute('class','addFamily-r selector');
			mui.toast('填写正确的信息格式并补全信息再重试！');
			return false
		}
	},*/
}

function ajax(url, data, ca) {
	jyapp.getApi({
		method: url,
		data: data,
		onsuccess: function(data) {
			if (data.code == 1) {
				mui.toast(data.msg);
				if (ca) ca(data.data);
			}
		},
		onerror: function(e) {
//			console.log(JSON.stringify(e))
			mui.toast(e.msg);
		}
	});
}

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
//取相册
function galleryImg() {
	// 从相册中选择图片
	//	console.log("从相册中选择图片:");
	plus.gallery.pick(function(path) {
		uploadfiles = [];
		mePic.setAttribute('src', path);
		var files = {
			'name': path,
			'path': path
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
				'name': e.toLocalURL(),
				'path': e.toLocalURL()
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
//设置下拉选择框
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


mui('.mui-content').on('tap','.mui-badge',function(){
	addFamily.clearClass();
})
