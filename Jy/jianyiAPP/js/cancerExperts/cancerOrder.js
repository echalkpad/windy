var uploadfiles = new Array();
var twouploadfiles = new Array();
var checkId = 1;
var doctor = "";
// 扩展API加载完毕后调用onPlusReady回调函数
document.addEventListener("plusready", onPlusReady, false);
// 扩展API加载完毕，现在可以正常调用扩展API 
function onPlusReady() {
	var self = plus.webview.currentWebview();
	doctor = self.doctor;
	var Name = doctor.data.Name ? doctor.data.Name : "--";
	var Title = doctor.data.Title ? doctor.data.Title : "--";
	var HospitalName = doctor.data.HospitalName ? doctor.data.HospitalName : "--";
	var departmentName = doctor.data.departmentName ? doctor.data.departmentName : "--";
	document.getElementById("cancerOrderImgId").src = doctor.data.Pic ? doctor.data.Pic : "../../img/default/yisheng_touxiang.png";
	document.getElementById("cancerOrderH2Id").innerHTML = Name+"<span>"+Title+"</span>";
	document.getElementById("cancerOrderP1Id").innerHTML = "接诊量："+doctor.data.OrderCount+" <span class=\"xingxing\">★"+doctor.data.Score+"</span>";
	document.getElementById("cancerOrderP2Id").innerHTML = HospitalName+" "+departmentName;
}
// 从相册中选择图片 
function galleryImg() {
	// 从相册中选择图片
//	console.log("从相册中选择图片:");
	plus.gallery.pick(function(path) {
		var upload = document.getElementById("upload");
		var div = document.createElement('div');
		div.setAttribute('class', 'img-div');
		var img = document.createElement('img');
		img.setAttribute('src', path);
		var a = document.createElement('a');
		a.setAttribute('id', 'img-a');
		div.appendChild(img);
		div.appendChild(a);
		upload.appendChild(div);
	}, function(e) {
//		console.log("取消选择图片");
	}, {
		filter: "image"
	});
}
// 从相册中选择多张图片 
function galleryImgs() {
	var childsNodes = document.getElementById("upload").querySelectorAll("img");
	if(childsNodes.length >= 4){
		plus.nativeUI.alert('最多添加4张哦','','健医宝','确认');
		return false
	}
	// 从相册中选择图片
//	console.log("从相册中选择多张图片:");
	plus.gallery.pick(function(e) {
		var num = twouploadfiles.length + e.files.length ;
		if (e.files.length > 4 || num > 4) {
			plus.nativeUI.alert('最多添加4张哦','','健医宝','确认');
			return false
		} else {
			for (var i = 0, len = e.files.length; i < len; i++) {
				var files = {
					name:e.files[i],
					path:e.files[i]
				}
				uploadfiles.push(files);
				twouploadfiles.push(files);
				var div = document.createElement('div');
				div.setAttribute('class', 'img-div');
				var img = document.createElement('img');
				img.setAttribute('src', e.files[i]);
				var a = document.createElement('a');
				a.setAttribute('id', 'img-a');
				div.appendChild(img);
				div.appendChild(a);
				upload.appendChild(div);
			}
		}

	}, function(e) {
//		console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: true
	});
}
//删除照片
mui("#upload").on('tap', '#img-a', function() {
	twouploadfiles = new Array();
	var odivv = document.getElementById("upload");
	odivv.removeChild(this.parentNode);
	var childsNodes = document.getElementById("upload").querySelectorAll("img");
	for(var i=0;i<childsNodes.length;i++){
		var files = {
			name:childsNodes[i].src,
			path:childsNodes[i].src
		}
		twouploadfiles.push(files);
	}
})

	//判断字符串长度 
function getnum(e) {
	if (e.srcElement.textLength > 200) {
		mui.toast('最少10字，最多200字');
		return false;
	}
	var num = document.getElementById("textarea-num");
	num.innerHTML = e.srcElement.textLength;
}
function getnum2(e) {
	if (e.srcElement.textLength > 200) {
		mui.toast('最少10字，最多200字');
		return false;
	}
	var num2 = document.getElementById("textarea-num2");
	num2.innerHTML = e.srcElement.textLength;
}

	//肿瘤专家-订单列表
document.getElementById("cancerOrderList").addEventListener("click",function(){
	if(checkId == 1){
		checkId ++;
		//获取姓名
		var name = document.getElementById("nameId").value;
		if (!name || name == "") {
			checkId = 1;
			plus.nativeUI.alert('姓名不能为空！','','健医宝','确认');
			return false;
		}
		//获取电话号码
		var phone = document.getElementById("phoneId").value;
		if (!phone || phone == "") {
			checkId = 1;
			plus.nativeUI.alert('电话不能为空！','','健医宝','确认');
			return false;
		}
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
			checkId = 1;
			plus.nativeUI.alert('手机号码为非法号码，请输入正确手机号！','','健医宝','确认');
	        return false; 
	    } 
		//获取病例情况
		var confirmed = document.getElementById("textarea").value;
		if (!confirmed || confirmed == "") {
			checkId = 1;
			plus.nativeUI.alert('病情描述不能为空！','','健医宝','确认');
			return false;
		}
		if(confirmed.length < 10 || confirmed.length > 200){
			checkId = 1;
			plus.nativeUI.alert('病情描述最少10字，最多200字！','','健医宝','确认');
			return false;
		}
		//获取帮助
		var helpContext = document.getElementById("textarea2").value;
		if (!helpContext || helpContext == "") {
			checkId = 1;
			plus.nativeUI.alert('希望帮助内容不能为空！','','健医宝','确认');
			return false;
		}
		if(helpContext.length < 10 || helpContext.length > 200){
			checkId = 1;
			plus.nativeUI.alert('希望帮助内容最少10字，最多200字！','','健医宝','确认');
			return false;
		}
		var requestData ={
			'doctorThirdId': doctor.data.ThirdID,
			'patientName': name,
			'patientPhone': phone,
			'diseaseDescribe': confirmed,
			'hopeDescribe': helpContext,
			'doctorId': doctor.data.ID+"",
			'userSex': "1",
			'recommendType': "2"
		};
//		console.log(JSON.stringify(requestData));
//		console.log(JSON.stringify(twouploadfiles));
		jyapp.upLoad({
			method: 'Tumour/SubmitAppointment',
			data:requestData,
			files:twouploadfiles,
			timeout : 10000,
			onsuccess: function(data) {
				checkId = 1;
//				console.log(JSON.stringify(data));
				var status = data.code;
				if(status == 1){
					var config = {
						id : "cancerOrderList",
						url : "cancerOrderList.html",
						method : "newIdsCancerOrderList",
						extras : {
							backurl: "",
							backid : "",
							index : 0
						}
					}
					jyapp.backWebView(config);
				}else{
					plus.nativeUI.alert(data.msg,'','健医宝','确认');
				}
			},
			onerror: function(e) {
				checkId = 1;
				console.log("onClickhealthyCod"+e);
			}
		});
	}
});
