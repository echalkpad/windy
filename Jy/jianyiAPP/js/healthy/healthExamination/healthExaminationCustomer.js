//初始化
document.addEventListener('plusready', function() {
	//初始化体检页面选择层
	healthExaminationCoustomer.selectInit();
});
var healthExaminationPeople = '';
var submitIndex = 0;
var healthExaminationCoustomer = {
	selectInit : function() {
		//体检人
		var userPepole = new mui.PopPicker();
		//初始化体检人弹出层
		healthExaminationCoustomer.getFamilyAndMyself(userPepole);
		var meRelation = document.getElementById('meRelation');
		var relationResult = document.getElementById('relationResult');
		meRelation.addEventListener('tap', function(event) {
			userPepole.show(function(items) {
				var s = JSON.stringify(items[0].text);
				var pepoleId = JSON.stringify(items[0].value);
				s = s.replace("\"", "").replace("\"", "");
				document.getElementById('peopleNameID').value = s;
//				relationResult.innerText = "";
				relationResult.innerText = s;
				relationResult.setAttribute('pepoleId', pepoleId);
				//选择体检人自动填充
				healthExaminationCoustomer.AutoFillInput(pepoleId);
			});
		}, false);
		//初始化性别弹出层
		var userSex = new mui.PopPicker();
		userSex.setData([{
			"value": 1,
			"text": "女"
		}, {
			"value": 2,
			"text": "男"
		}]);
		var showSexButton = document.getElementById('meSex');
		var sexResult = document.getElementById('sexResult');
		showSexButton.addEventListener('tap', function(event) {
			userSex.show(function(items) {
				var s = JSON.stringify(items[0].text);
				var sexid = JSON.stringify(items[0].value);
				s = s.replace("\"", "").replace("\"", "");
				sexResult.innerText = s;
				sexResult.setAttribute('sexid', sexid);
				document.getElementById('healthExamGenderID').value = sexid;
			});
		}, false);
		//初始化婚否弹出层
		var userMarry = new mui.PopPicker();
		userMarry.setData([{
			"value": 1,
			"text": "未婚"
		}, {
			"value": 2,
			"text": "已婚"
		}, {
			"value": 3,
			"text": "离异"
		}]);
		var marryButton = document.getElementById('marry');
		var marryResult = document.getElementById('marryResult');
		marryButton.addEventListener('tap', function(event) {
			userMarry.show(function(items) {
				var s = JSON.stringify(items[0].text);
				var marryid = JSON.stringify(items[0].value);
				s = s.replace("\"", "").replace("\"", "");
				marryResult.innerText = s;
				marryResult.setAttribute('marryid', marryid);
				document.getElementById('healthExamMarryID').value = marryid;
			});
		}, false);
		//初始化日期弹出层
		var result = mui('#birthResult')[0];
		var btns = mui('#mebirthday');
		btns.each(function(i, btn) {
			btn.addEventListener('tap', function() { 
				var beginDates = commomUtil.getDateStr(3).split('-');
//				console.log("beginDates:"+beginDates[0]+"-"+beginDates[1]+"-"+beginDates[2]);
				var beginDate = new Date(beginDates[0],beginDates[1],beginDates[2]);
				var endDates = commomUtil.getDateStr(15).split('-');
//				console.log("endDates:"+endDates[0]+"-"+endDates[1]+"-"+endDates[2]);
				var endDate = new Date(endDates[0],endDates[1],endDates[2]);
				var id = this.getAttribute('id');
				var picker = new mui.DtPicker({
				    type: "date",//设置日历初始视图模式
				    beginDate: beginDate,//设置开始日期
				    endDate: endDate,//设置结束日期
				    labels: ["年", "月", "日"]//设置默认标签区域提示语
				});
				picker.show(function(rs) {
					result.innerText = rs.text;
					picker.dispose();
				});
			}, false);
		});
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
					healthExaminationCoustomer.getMyInformation();
				}else{
					//关系为家人/朋友
					healthExaminationCoustomer.getFamilyInformation(peopleId);
				}
				break;
			}
		}
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
//				console.log("FamilyInformation--->:"+JSON.stringify(response))
				if (response.code != 1) {
					document.getElementById('healthExamGenderID').value = "";
					document.getElementById('sexResult').innerText = "";
					document.getElementById('healthExamPhoneNum').value = "";
					document.getElementById('healthExamIDnumber').value = "";
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					if (response.data != null) {
						var dataValue = response.data;
						var gender = '';
						if(dataValue.Gender == 1){
							gender = '女';
						}else if(dataValue.Gender == 2){
							gender = '男';
						} else{
							gender = '请选择';
						}
						var healthExamGender = dataValue.Gender ? dataValue.Gender : 0;
						var phone = dataValue.Mobile ? dataValue.Mobile : "";
						var idnumber = dataValue.CredentialsNo ? dataValue.CredentialsNo : "";
						document.getElementById('healthExamGenderID').value = healthExamGender;
						document.getElementById('sexResult').innerText = gender;
						document.getElementById('healthExamPhoneNum').value = phone;
						document.getElementById('healthExamIDnumber').value = idnumber;
					}else{
						document.getElementById('healthExamGenderID').value = "";
						document.getElementById('sexResult').innerText = "";
						document.getElementById('healthExamPhoneNum').value = "";
						document.getElementById('healthExamIDnumber').value = "";
					}
				}
			},
			onerror: function(e) {
				document.getElementById('healthExamGenderID').value = "";
				document.getElementById('sexResult').innerText = "";
				document.getElementById('healthExamPhoneNum').value = "";
				document.getElementById('healthExamIDnumber').value = "";
				console.log("FamilyInformation:" + e);
			}
		});
	},
	getMyInformation : function(){
		jyapp.getApi({
			method: 'Profile/Index',
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("getMyInformation--->:"+JSON.stringify(response))
				if (response.code != 1) {
					document.getElementById('healthExamGenderID').value = "";
					document.getElementById('sexResult').innerText = "";
					document.getElementById('healthExamPhoneNum').value = "";
					document.getElementById('healthExamIDnumber').value = "";
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					if (response.data != null && response.data.cusinfo != null) {
						var dataValue = response.data.cusinfo;
						var gender = '';
						if(dataValue.gender == 1){
							gender = '女';
						}else if(dataValue.gender == 2){
							gender = '男';
						}else{
							gender = '请选择';
						}
						var healthExamGender = dataValue.gender ? dataValue.gender : 0;
						var phone = dataValue.phone ? dataValue.phone : "";
						var idnumber = dataValue.idnumber ? dataValue.idnumber : "";
						document.getElementById('healthExamGenderID').value = healthExamGender;
						document.getElementById('sexResult').innerText = gender;
						document.getElementById('healthExamPhoneNum').value = phone;
						document.getElementById('healthExamIDnumber').value = idnumber;
					}else{
						document.getElementById('healthExamGenderID').value = "";
						document.getElementById('sexResult').innerText = "";
						document.getElementById('healthExamPhoneNum').value = "";
						document.getElementById('healthExamIDnumber').value = "";
					}
				}
			},
			onerror: function(e) {
				document.getElementById('healthExamGenderID').value = "";
				document.getElementById('sexResult').innerText = "";
				document.getElementById('healthExamPhoneNum').value = "";
				document.getElementById('healthExamIDnumber').value = "";
				console.log("FamilyInformation:" + e);
			}
		});
	},
	SubmitAppointment : function(requestSubmitAppointment){
//		console.log("requestSubmitAppointment---->:"+requestSubmitAppointment);
		jyapp.getApi({
			method: 'HealthExamination/SubmitAppointment',
			data: requestSubmitAppointment,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				console.log("SubmitAppointment---->:"+JSON.stringify(response));
				if(response.code != 1){
					submitIndex = 0;
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					//需要跳转订单待确认页面
					var config = {
						id : 'healthExaminationOrder',
						url : 'healthExaminationOrder.html',
						extras: {
							index: 0
						}
					}
					jyapp.backWebView(config);
				}
			},
			onerror: function(e) {
				submitIndex = 0;
				console.log("SubmitAppointment:" + e);
			}
		});
	},
	validateSubmit : function(){
		if(submitIndex == 0){
			submitIndex++;
			//验证提交
			var VisitDate = document.getElementById('birthResult').innerText;
			if(!VisitDate || typeof(VisitDate) == 'undefined' || VisitDate == "" || VisitDate == "请选择"){
				submitIndex = 0;
				plus.nativeUI.alert('请选择预约体检时间','','健医宝','确认');
				return false;
			}
			var examName = document.getElementById('peopleNameID').value;
			if(!examName || typeof(examName) == 'undefined' || examName == ""){
				submitIndex = 0;
				plus.nativeUI.alert('请填写体检人姓名','','健医宝','确认');
				return false;
			}
			var healthExamGender = document.getElementById('healthExamGenderID').value;
			if(!healthExamGender || typeof(healthExamGender) == 'undefined' || healthExamGender == ""){
				submitIndex = 0;
				plus.nativeUI.alert('请选择体检人性别','','健医宝','确认');
				return false;
			}
			var healthExamMarry = document.getElementById('healthExamMarryID').value;
			if(!healthExamMarry || typeof(healthExamMarry) == 'undefined' || healthExamMarry == ""){
				submitIndex = 0;
				plus.nativeUI.alert('请选择体检人婚否','','健医宝','确认');
				return false;
			}
			var healthExamPhoneNum = document.getElementById('healthExamPhoneNum').value;
			if(!healthExamPhoneNum || typeof(healthExamPhoneNum) == 'undefined' || healthExamPhoneNum == ""){
				submitIndex = 0;
				plus.nativeUI.alert('请填写体检人手机号码','','健医宝','确认');
				return false;
			}else{
				if(healthExamPhoneNum.length != 11){
					submitIndex = 0;
					plus.nativeUI.alert('手机号码为11位数字！请正确填写！', '', '健医宝', '确认');
					return false;
				}
				var patten = /0?(13|14|15|18)[0-9]{9}/;
				if(!patten.test(healthExamPhoneNum)){
					submitIndex = 0;
					plus.nativeUI.alert('请输入正确的手机号码','','健医宝','确认');
					return false;
				}
			}
			var healthExamIDnumber = document.getElementById('healthExamIDnumber').value;
			if(!healthExamIDnumber || typeof(healthExamIDnumber) == 'undefined' || healthExamIDnumber == ""){
				submitIndex = 0;
				plus.nativeUI.alert('请填写体检人证件号码','','健医宝','确认');
				return false;
			}
			var healthExamRemark = document.getElementById('healthExamRemarkID').value;
			if(!commomUtil.validateCommon(healthExamRemark)){
				plus.nativeUI.alert('备注不能有特殊字符','','健医宝','确认');
				return false;
			}
			var healthExamRemarkLen = commomUtil.GetLength(healthExamRemark);
			if (healthExamRemarkLen > 500) {
				submitIndex = 0;
				plus.nativeUI.alert("备注不能超过250个汉字", "", "健医宝", "确认");
				return false;
			}
			healthExamRemark = healthExamRemark ? healthExamRemark : "";
			var requestSubmitAppointment = 'VisitDate='+VisitDate+"&Name="+examName+"&Sex="+parseInt(healthExamGender)
			+"&IsMarry="+parseInt(healthExamMarry)+"&Mobile="+healthExamPhoneNum+"&CardID="+healthExamIDnumber
			+"&Name=&Remark="+healthExamRemark;
			//验证完成，提交体检预约
			healthExaminationCoustomer.SubmitAppointment(requestSubmitAppointment);
		}
	}
}

//绑定提交预约按钮事件
document.getElementById('healthExaminationCoustomer_btn').addEventListener('click',healthExaminationCoustomer.validateSubmit);