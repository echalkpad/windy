//提交预约
mui(".btn").on('tap', '#packageGeneticOrder', function() {
	
	packageabout.submitPackageAbout();
//	mui.openWindow({
//		id: 'geneticOrder',
//		url: "geneticOrder.html"
//	});
})

//选择地址
mui(".mui-content").on('tap', '#packageShippingAddress', function() {
	packageabout.quitBlur();
	mui.openWindow({
		id: 'shippingAddress',
		url: "shippingAddress.html",
		extras : {
			type : 0
		}
	});
})
var Pageckage = "";
var addressId = "";
document.addEventListener("plusready",function(){
	var self = plus.webview.currentWebview();
	Pageckage = self.Pageckage;
	//初始化数据
	packageabout.initData();
	//添加选择性别事件
	packageabout.initSex();
});
var packageabout = {
	initData : function(){
		document.getElementById("packageaboutPriceid").innerHTML = "¥"+Pageckage.PresentPrice;
		document.getElementById("packageaboutjcNameId").innerHTML = Pageckage.PackageName;
		document.getElementById("packageaboutgsNameId").innerHTML = Pageckage.StoreName;
	},
	initSex : function(){
		var userSex = new mui.PopPicker();
		var data = [{
			text : "女",
			value : "0"
		},{
			text : "男",
			value : "1"
		}];
		userSex.setData(data);
		var showSexButton = document.getElementById('packageSex');
		var sexResult = document.getElementById('packageSexResult');
		var sexID = document.getElementById('packageSexValueId');
		showSexButton.addEventListener('tap', function(event) {
			packageabout.quitBlur();
			userSex.show(function(items) {
				var s = items[0].text;
				var v = items[0].value;
				sexResult.innerText = s;
				sexID.value = v;
			});
		}, false);
		
		//体检人
		var userPepole = new mui.PopPicker();
		//初始化体检人弹出层
		packageabout.getFamilyAndMyself(userPepole);
		var meRelation = document.getElementById('packageAboutPeopleId');
		var relationResult = document.getElementById('packageAboutResultid');
		meRelation.addEventListener('tap', function(event) {
			packageabout.quitBlur();
			userPepole.show(function(items) {
				var s = JSON.stringify(items[0].text);
				var pepoleId = JSON.stringify(items[0].value);
				s = s.replace("\"", "").replace("\"", "");
				document.getElementById('packageaboutNameId').value = s;
//				relationResult.innerText = "";
				relationResult.innerText = s;
				relationResult.setAttribute('pepoleId', pepoleId);
				//选择体检人自动填充
				packageabout.AutoFillInput(pepoleId);
			});
		}, false);
		
	},
	quitBlur : function(){
		document.getElementById("packageaboutNameId").blur();
		document.getElementById("packageaboutAgeId").blur();
		document.getElementById("packageaboutMobelId").blur();
		document.getElementById("packageaboutCommonId").blur();
	},
	getFamilyAndMyself : function(userPepole){
		jyapp.getApi({
			method: 'profile/FamilyAndMyself',
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("getFamilyAndMyself:"+JSON.stringify(response));
				if (response.code != 1) {
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					if (response.data != null && response.data.length > 0) {
						var dataValues = response.data;
						healthExaminationPeople = dataValues;
						var data = new Array();
						for (var i = 0; i < dataValues.length; i++) {
							var familyAndMyself = {};
							familyAndMyself.value = dataValues[i].id;
							familyAndMyself.text = dataValues[i].name;
							data.push(familyAndMyself);
						}
						userPepole.setData(data);
					}
				}
			},
			onerror: function(e) {
				console.log("getFamilyAndMyself:" + e);
			}
		});
	},
	AutoFillInput: function(peopleId){
		for(var i = 0;i < healthExaminationPeople.length; i++){
			if(peopleId == healthExaminationPeople[i].id){
				var relationType = healthExaminationPeople[i].relation;
				if(relationType == 0){
					//关系为本人
					packageabout.getMyInformation();
				}else{
					//关系为家人/朋友
					packageabout.getFamilyInformation(peopleId);
				}
				break;
			}
		}
	},
	getMyInformation : function(){
		jyapp.getApi({
			method: 'Profile/Index',
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log(JSON.stringify(response));
				if(response && response.code == 1 && response.data && response.data.cusinfo){
					var dataValue = response.data.cusinfo;
					var genderValue = 0;
					var gender = '';
					if(dataValue.gender == 1){
						gender = '女';
						genderValue = 0;
					}else if(dataValue.gender == 2){
						gender = '男';
						genderValue = 1;
					}else{
						gender = '请选择';
					}
					var phone = dataValue.phone ? dataValue.phone : "";
					var year = new Date().getYear() + 1900;
//					console.log(year);
					var age = dataValue.idnumber ? year - parseInt(dataValue.idnumber.substr(6,4)) : "";
					document.getElementById('packageSexResult').innerText = gender;
					document.getElementById('packageSexValueId').value = genderValue;
					document.getElementById('packageaboutAgeId').value = age;
					document.getElementById('packageaboutMobelId').value = phone;
				}else{
					document.getElementById('packageaboutNameId').value = "";
					document.getElementById('packageSexResult').innerText = "请选择";
					document.getElementById('packageSexValueId').value = "";
					document.getElementById('packageaboutAgeId').value = "";
					document.getElementById('packageaboutMobelId').value = "";
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				}
			},
			onerror: function(e) {
				document.getElementById('packageaboutNameId').value = "";
				document.getElementById('packageSexResult').innerText = "请选择";
				document.getElementById('packageSexValueId').value = "";
				document.getElementById('packageaboutAgeId').value = "";
				document.getElementById('packageaboutMobelId').value = "";
				console.log("FamilyInformation:" + e);
			}
		});
	},
	getFamilyInformation: function(familyId) {
		var requestFamilyInformation = 'familyId=' + familyId;
//		console.log("requestFamilyInformation--->:"+requestFamilyInformation);
		jyapp.getApi({
			method: 'Profile/FamilyInformation',
			data: requestFamilyInformation,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log(JSON.stringify(response));
				if(response && response.code == 1 && response.data){
					var dataValue = response.data;
					var genderValue = 0;
					var gender = '';
					if(dataValue.Gender == 1){
						gender = '女';
						genderValue = 0;
					}else if(dataValue.Gender == 2){
						gender = '男';
						genderValue = 1;
					}else{
						gender = '请选择';
					}
					var phone = dataValue.Mobile ? dataValue.Mobile : "";
					var year = new Date().getYear() + 1900;
					var endLen = dataValue.Birthday.length - 2;
					var time = dataValue.Birthday.substring(6, endLen);
					var age = dataValue.Birthday ? year - parseInt(commomUtil.formatStringToDate(time,3).substr(0,4)) : "";
					age = age == 0 ? "" : age;
					document.getElementById('packageSexResult').innerText = gender;
					document.getElementById('packageSexValueId').value = genderValue;
					document.getElementById('packageaboutAgeId').value = age;
					document.getElementById('packageaboutMobelId').value = phone;
				}else{
					document.getElementById('packageaboutNameId').value = "";
					document.getElementById('packageSexResult').innerText = "请选择";
					document.getElementById('packageSexValueId').value = "";
					document.getElementById('packageaboutAgeId').value = "";
					document.getElementById('packageaboutMobelId').value = "";
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				}
			},
			onerror: function(e) {
				document.getElementById('packageaboutNameId').value = "";
				document.getElementById('packageSexResult').innerText = "请选择";
				document.getElementById('packageSexValueId').value = "";
				document.getElementById('packageaboutAgeId').value = "";
				document.getElementById('packageaboutMobelId').value = "";
				console.log("FamilyInformation:" + e);
			}
		});
	},
	submitPackageAbout : function(){
		packageabout.quitBlur();
		var packageaboutName = document.getElementById("packageaboutNameId").value;
		if (!packageaboutName || packageaboutName == "") {
			plus.nativeUI.alert('姓名必须填写！','','健医宝','确认');
			return false;
		}
		var packageSexValue = document.getElementById("packageSexValueId").value;
		if (!packageSexValue || packageSexValue == "") {
			plus.nativeUI.alert('性别必须填写！','','健医宝','确认');
			return false;
		}
		var packageaboutAge = document.getElementById("packageaboutAgeId").value;
		console.log(packageaboutAge);
		if (!packageaboutAge || packageaboutAge == "") {
			plus.nativeUI.alert('年龄必须填写！','','健医宝','确认');
			return false;
		}
		if(!/^([0-9]|[0-9]{2}|120)$/.test(packageaboutAge)){
			plus.nativeUI.alert('年龄不合法，请重新填写！','','健医宝','确认');
			return false;
		}
		var packageaboutMobel = document.getElementById("packageaboutMobelId").value;
		if (!packageaboutMobel || packageaboutMobel == "") {
			plus.nativeUI.alert('电话号码必须填写！','','健医宝','确认');
			return false;
		}
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(packageaboutMobel))){ 
			plus.nativeUI.alert('手机号码为非法号码，请输入正确手机号！','','健医宝','确认');
	        return false; 
	    } 
		if (!addressId || addressId == "") {
			plus.nativeUI.alert('收货地址必须填写！','','健医宝','确认');
			return false;
		}
		var packageaboutCommon = document.getElementById("packageaboutCommonId").value;
		if(!commomUtil.validateCommon(packageaboutCommon)){
			plus.nativeUI.alert('订单备注内容不合法,备注内容只能由中文 数字 字母 下划线组成！','','健医宝','确认');
			return false;
		}
		if(packageaboutCommon && (packageaboutCommon.length < 5 || packageaboutCommon.length > 250)){
			plus.nativeUI.alert('订单备注内容不合法，最少5个字并且最多250个字！','','健医宝','确认');
			return false;
		}
//		packageaboutCommon = packageaboutCommon ? escape(packageaboutCommon).replace(/%/g,"\\") : "";
		var requestData = "OrgID="+Pageckage.OrganizationId+"&PackageID="+Pageckage.ID+"&PackageType=&Name="+packageaboutName+"&Sex="+packageSexValue;
		requestData += "&Age="+packageaboutAge+"&Mobile="+packageaboutMobel+"&Remark="+packageaboutCommon+"&AddressID="+addressId;
//		console.log(requestData);
		jyapp.getApi({
			method: 'GeneDetection/SubmitAppointment',
			data:requestData,
			timeout : 10000,
			onsuccess: function(data) {
				console.log(JSON.stringify(data));
				if(data.code == 1){
					var config = {
						id : "geneticOrder",
						url : "geneticOrder.html",
						method : "newidsGeneticOrder",
						extras : {
							index : 0
						}
					}
					jyapp.backWebView(config);
				}else{
					plus.nativeUI.alert(data.msg,'','健医宝','确认');
				}
			},
			onerror: function(e) {
				console.log(e);
			}
		});
		
	}
}

window.addEventListener("newIdspackageAbout",function(event){
	//设置地址数据
//	console.log(JSON.stringify(event.detail));
	addressId = event.detail.addressId;
	var addressName = event.detail.addressName;
	var ConsigneeName = event.detail.ConsigneeName;
	var Mobile = event.detail.Mobile;
	var IsDefault = event.detail.IsDefault;
	var html = '';
	
	html +='<li class="mui-table-view-cell default haveAddress"><a href="" class="mui-navigate-right" id="packageShippingAddress">';
	html +='<section>';
	html +='<h2>收件人：<span>'+ConsigneeName+'</span><strong>'+Mobile+'</strong></h2>';
	html +='<p>'+addressName+'</p>';
	if(IsDefault == 1){
		html += '<em>默认</em>';
	}
	html +='</section>';
	html +='<article>';
	html +='<h2>收货地址</h2>';
	html +='<span class="mui-badge mui-badge-inverted">请添加收货地址</span>';
	html +='</article>';
	html +='</a></li>';
	document.getElementById("packageaboutAddressIdUl").innerHTML = html;
});

document.getElementById("packageaboutNameId").addEventListener("blur",function(){
	var oldName = document.getElementById("packageAboutResultid").innerText;
	var newName =document.getElementById("packageaboutNameId").value;
	if(oldName != newName){
		document.getElementById("packageAboutResultid").innerText = "";
	}
});
