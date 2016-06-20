var packType = 0;
var addressId = "";

//提交预约
mui(".btn").on('tap', '#clientsGeneticOrder', function() {
	clientsAbout.submitClientsAbout();
})

//选择地址
mui(".mui-content").on('tap', '#clientsShippingAddress', function() {
	clientsAbout.quitBlur();
	mui.openWindow({
		id: 'shippingAddress',
		url: "shippingAddress.html",
		extras : {
			type : 1
		}
	});
})

function hasClass(elements, cName) {
	return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};

function addClass(elements, cName) {
	if (!hasClass(elements, cName)) {
		elements.className += " " + cName;
	};
};

function removeClass(elements, cName) {
	if (hasClass(elements, cName)) {
		elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
	};
};
function att(e) {
	var aLi = e.parentNode.children;
	for (var i = 0; i < aLi.length; i++) {
		removeClass(aLi[i], 'selector');
		addClass(e, 'selector');
	}
}
mui('.clientsStyle').on('tap', 'li', function() {
	if (hasClass(this, 'selector')) {
		removeClass(this, 'selector');
	} else {
		att(this);
		packType=this.querySelectorAll('input')[0].value;
	}
})

document.addEventListener("plusready",function(){
	//初始化套餐类型数据
	clientsAbout.initPackageTypeData();
	//初始化性别按钮事件
	clientsAbout.initClientsAboutSex();
});

var clientsAbout = {
	initPackageTypeData : function(){
		jyapp.getApi({
   			method: 'System/GetDictionaryByType',
   			data:'typeCode=GeneDetecttType',
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var choosePackageqblxHtml = "";
				if(data.code == 1 && data.data && data.data && data.data.length > 0){
					var dataValue = data.data;
					for(var i=0;i<dataValue.length;i++){
						var classType = i==0 ? "selector" : "";
						if(i == 0){
							packType = dataValue[i].ID;
						}
						choosePackageqblxHtml += "<li class=\""+classType+"\"><span>"+dataValue[i].Name+"</span>";
						choosePackageqblxHtml += "<input type='hidden' value=\""+dataValue[i].ID+"\" />"; 
						choosePackageqblxHtml += "</li>";
					}
				}
				document.getElementById("clientsAboutpackageTypeId").innerHTML = choosePackageqblxHtml;
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	initClientsAboutSex : function(){
		var userSex = new mui.PopPicker();
		var data = [{
			text : "女",
			value : "0"
		},{
			text : "男",
			value : "1"
		}];
		userSex.setData(data);
		var showSexButton = document.getElementById('clientsSex');
		var sexResult = document.getElementById('clientsSexResult');
		var sexID = document.getElementById('clientsSexValueId');
		showSexButton.addEventListener('tap', function(event) {
			clientsAbout.quitBlur();
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
		clientsAbout.getFamilyAndMyself(userPepole);
		var meRelation = document.getElementById('clientsPatient');
		var relationResult = document.getElementById('clientsPatientResult');
		meRelation.addEventListener('tap', function(event) {
			clientsAbout.quitBlur();
			userPepole.show(function(items) {
				var s = JSON.stringify(items[0].text);
				var pepoleId = JSON.stringify(items[0].value);
				s = s.replace("\"", "").replace("\"", "");
				document.getElementById('clientsAboutNameId').value = s;
//				relationResult.innerText = "";
				relationResult.innerText = s;
				relationResult.setAttribute('pepoleId', pepoleId);
				//选择体检人自动填充
				clientsAbout.AutoFillInput(pepoleId);
			});
		}, false);
	},
	quitBlur : function(){
		document.getElementById("clientsAboutNameId").blur();
		document.getElementById("clientsAboutAgeId").blur();
		document.getElementById("clientsAboutMobelId").blur();
		document.getElementById("clientsAboutCommonId").blur();
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
					clientsAbout.getMyInformation();
				}else{
					//关系为家人/朋友
					clientsAbout.getFamilyInformation(peopleId);
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
					var age = dataValue.idnumber ? year - parseInt(dataValue.idnumber.substr(6,4)) : "";
					document.getElementById('clientsSexResult').innerText = gender;
					document.getElementById('clientsSexValueId').value = genderValue;
					document.getElementById('clientsAboutAgeId').value = age;
					document.getElementById('clientsAboutMobelId').value = phone;
				}else{
					document.getElementById('clientsAboutNameId').value = "";
					document.getElementById('clientsSexResult').innerText = "请选择";
					document.getElementById('clientsSexValueId').value = "";
					document.getElementById('clientsAboutAgeId').value = "";
					document.getElementById('clientsAboutMobelId').value = "";
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				}
			},
			onerror: function(e) {
				document.getElementById('clientsAboutNameId').value = "";
				document.getElementById('clientsSexResult').innerText = "请选择";
				document.getElementById('clientsSexValueId').value = "";
				document.getElementById('clientsAboutAgeId').value = "";
				document.getElementById('clientsAboutMobelId').value = "";
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
					document.getElementById('clientsSexResult').innerText = gender;
					document.getElementById('clientsSexValueId').value = genderValue;
					document.getElementById('clientsAboutAgeId').value = age;
					document.getElementById('clientsAboutMobelId').value = phone;
				}else{
					document.getElementById('clientsAboutNameId').value = "";
					document.getElementById('clientsSexResult').innerText = "请选择";
					document.getElementById('clientsSexValueId').value = "";
					document.getElementById('clientsAboutAgeId').value = "";
					document.getElementById('clientsAboutMobelId').value = "";
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				}
			},
			onerror: function(e) {
				document.getElementById('clientsAboutNameId').value = "";
				document.getElementById('clientsSexResult').innerText = "请选择";
				document.getElementById('clientsSexValueId').value = "";
				document.getElementById('clientsAboutAgeId').value = "";
				document.getElementById('clientsAboutMobelId').value = "";
				console.log("FamilyInformation:" + e);
			}
		});
	},
	submitClientsAbout : function(){
		clientsAbout.quitBlur();
		var clientsAboutNameId = document.getElementById("clientsAboutNameId").value;
		if (!clientsAboutNameId || clientsAboutNameId == "") {
			plus.nativeUI.alert('姓名必须填写！','','健医宝','确认');
			return false;
		}
		var clientsSexValueId = document.getElementById("clientsSexValueId").value;
		if (!clientsSexValueId || clientsSexValueId == "") {
			plus.nativeUI.alert('性别必须填写！','','健医宝','确认');
			return false;
		}
		var clientsAboutAgeId = document.getElementById("clientsAboutAgeId").value;
		if (!clientsAboutAgeId || clientsAboutAgeId == "") {
			plus.nativeUI.alert('年龄必须填写！','','健医宝','确认');
			return false;
		}
		if(!/^([0-9]|[0-9]{2}|120)$/.test(clientsAboutAgeId)){
			plus.nativeUI.alert('年龄不合法，请重新填写！','','健医宝','确认');
			return false;
		}
		var clientsAboutMobelId = document.getElementById("clientsAboutMobelId").value;
		if (!clientsAboutMobelId || clientsAboutMobelId == "") {
			plus.nativeUI.alert('电话号码必须填写！','','健医宝','确认');
			return false;
		}
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(clientsAboutMobelId))){ 
			plus.nativeUI.alert('手机号码为非法号码，请输入正确手机号！','','健医宝','确认');
	        return false; 
	    } 
		if (!addressId || addressId == "") {
			plus.nativeUI.alert('收货地址必须填写！','','健医宝','确认');
			return false;
		}
		var clientsAboutCommonId = document.getElementById("clientsAboutCommonId").value;
		if(!commomUtil.validateCommon(clientsAboutCommonId)){
			plus.nativeUI.alert('订单备注内容不合法,备注内容只能由中文 数字 字母 下划线组成！','','健医宝','确认');
			return false;
		}
		if(clientsAboutCommonId && (clientsAboutCommonId.length < 5 || clientsAboutCommonId.length > 250)){
			plus.nativeUI.alert('订单备注内容不合法，最少5个字并且最多250个字！','','健医宝','确认');
			return false;
		}
//		clientsAboutCommonId = clientsAboutCommonId ? escape(clientsAboutCommonId).replace(/%/g,"\\") : "";
		var requestData = "OrgID=&PackageID=&PackageType="+packType+"&Name="+clientsAboutNameId+"&Sex="+clientsSexValueId;
		requestData += "&Age="+clientsAboutAgeId+"&Mobile="+clientsAboutMobelId+"&Remark="+clientsAboutCommonId+"&AddressID="+addressId;
//		console.log(requestData);
		jyapp.getApi({
			method: 'GeneDetection/SubmitAppointment',
			data:requestData,
			timeout : 10000,
			onsuccess: function(data) {
//				console.log(JSON.stringify(data));
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
};
window.addEventListener("newIdsclientsAbout",function(event){
	//设置地址数据
	addressId = event.detail.addressId;
	var addressName = event.detail.addressName;
	var ConsigneeName = event.detail.ConsigneeName;
	var Mobile = event.detail.Mobile;
	var IsDefault = event.detail.IsDefault;
	var html = '';
	
	html +='<li class="mui-table-view-cell default haveAddress"><a href="" class="mui-navigate-right" id="clientsShippingAddress">';
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
	document.getElementById("clientsAboutAddressUlid").innerHTML = html;
});