var localDoctorId = "";
var orderInfo = {};
var submitFlag = 0;
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var doctorId = self.doctorId;
	var patientId = self.patientId;
	if(!patientId || typeof(patientId) == "undefined" || patientId == ""){
		//预约时间
		var reserveAppointmentTimeValue = self.appointmentTimeValue;
		//号源ID
		var reserveSourceID = self.reserveSourceID;
		reserveInfomation.initSubmitAppointment(doctorId, reserveAppointmentTimeValue, reserveSourceID);
	}else{
		//不刷新页面只是设值就诊人信息
		reserveInfomation.getFamilyInformation(patientId);
	}
});

window.addEventListener('choosePatient',function(event){
	var patientId = event.detail.patientId;
	var relationType = event.detail.relationType;
	orderInfo = event.detail.orderInfo;
	//不刷新页面只是设值就诊人信息
	setTimeout(reserveInfomation.getPatientInformation(patientId,relationType),300);
})
 
var reserveInfomation = {
	initSubmitAppointment: function(doctorId, reserveAppointmentTimeValue, reserveSourceID) {
		var requestSlowExpertsDetails = "doctorId=" + doctorId;
//		console.log("requestSlowExpertsDetails---->:"+requestSlowExpertsDetails);
		jyapp.getApi({
			method: 'Treat/DoctorDetails',
			data: requestSlowExpertsDetails,
			timeout: 1000,
			onsuccess: function(response) {
//				console.log("DoctorDetails---->:"+JSON.stringify(response));
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					var dataValue = response.data;
					if (dataValue != null) {
						localDoctorId = dataValue.ID;
						var Name = dataValue.Name ? dataValue.Name : "--";
						var HospitalName = dataValue.HospitalName ? dataValue.HospitalName : "--";
						var DepartmentName = dataValue.DepartmentName ? dataValue.DepartmentName : "--";
						var Address = dataValue.Address ? dataValue.Address : "--";
						document.getElementById("reserveDocotrNameID").innerHTML = Name;
						document.getElementById("reserveHospitalNameID").innerHTML = HospitalName;
						document.getElementById("reserveDepartmentNameID").innerHTML = DepartmentName;
						document.getElementById("reserveAddressID").innerHTML = Address;
						document.getElementById("reserveAppointmentTimeID").innerHTML = reserveAppointmentTimeValue;
						document.getElementById("reserveSourceID").value = reserveSourceID;
						document.getElementById("reservePriceID").innerHTML = dataValue.Price + "元";
						document.getElementById("reserveEnsureID").innerHTML = "50元";
						var totalPrice = dataValue.Price + 50;
						orderInfo.oPrice = dataValue.Price;
						orderInfo.oEnsurePrice = 50;
						orderInfo.oCashCoupon = 26;
						orderInfo.oTotalPrice = totalPrice;
						document.getElementById('monyResult').innerHTML = totalPrice;
					}else{
						plus.nativeUI.alert('预约信息加载失败，请重新选择','','健医宝','确认');
						return false;
					}
				}
				
			},
			onerror: function(e) {
				console.log("initSlowExpertsDetails:" + e);
			}
		});
	},
	submitAppointment: function() {
			var patientVisits = document.getElementById("reservePatientNameID").value;
			if (patientVisits == "" || typeof(patientVisits) == "undefined" || patientVisits == "") {
				plus.nativeUI.alert("请填写/选择就诊人", "", "健医宝", "确认");
				return false;
			}
			orderInfo.oPatientVisits = patientVisits;
			var reserveIDNumberID = document.getElementById("reserveIDNumberID").value;
			if (reserveIDNumberID == "" || typeof(reserveIDNumberID) == "undefined" || patientVisits == "") {
				plus.nativeUI.alert("请填写就诊人证件号码", "", "健医宝", "确认");
				return false;
			}/*else{
				if(reserveIDNumberID.length != 18){
					plus.nativeUI.alert("请填写正确的证件号码", "", "健医宝", "确认");
					return false;
				}
			}*/
			orderInfo.oIDNumber = reserveIDNumberID;
			var reservePhoneID = document.getElementById("reservePhoneID").value;
			if (reservePhoneID == "" || typeof(reservePhoneID) == "undefined" || reservePhoneID == "") {
				plus.nativeUI.alert("请填写手机号码", "", "健医宝", "确认");
				return false;
			}else{
				if(reservePhoneID.length != 11){
					plus.nativeUI.alert("手机号码为11位数字！请正确填写！", "", "健医宝", "确认");
					return false;
				}
				var patten = /0?(13|14|15|18)[0-9]{9}/;
				if(!patten.test(reservePhoneID)){
					plus.nativeUI.alert('请输入正确的手机号码','','健医宝','确认');
					return false;
				}
			}
			orderInfo.oPhone = reservePhoneID;
			var diseaseDesc = document.getElementById("diseaseDescID").value;
			if (diseaseDesc == "" || typeof(diseaseDesc) == "undefined") {
				plus.nativeUI.alert("请填写病情描述", "", "健医宝", "确认");
				return false;
			}
			var reserveChecked = document.getElementById("reserveCheckDivID").checked;
			var reserveValue = document.getElementById("reserveCheckDivID").value;
			if (!reserveChecked || reserveValue == 0) {
				plus.nativeUI.alert("请了解阅读预约挂号协议并同意", "", "健医宝", "确认");
				return false;
			}
			var reserveDocotrNameID = document.getElementById("reserveDocotrNameID").innerText;
			orderInfo.oDoctorName = reserveDocotrNameID;
			var reserveHospitalNameID = document.getElementById("reserveHospitalNameID").innerText;
			orderInfo.oHospitalName = reserveHospitalNameID;
			var reserveDepartmentNameID = document.getElementById("reserveDepartmentNameID").innerText;
			orderInfo.oDepartmentName = reserveDepartmentNameID;
			var reserveAddressID = document.getElementById("reserveAddressID").innerText;
			orderInfo.oAddress = reserveAddressID;
			var reserveAppointmentTimeID = document.getElementById("reserveAppointmentTimeID").innerText;
			orderInfo.oPatientTime = reserveAppointmentTimeID;
			var reserveSourceID = document.getElementById("reserveSourceID").value;
			var requestOrderSubmit = 'sourceId='+reserveSourceID+'&phoneNumber='+reservePhoneID+'&idcardNumber='+reserveIDNumberID+'&patientName='+patientVisits
			+'&diseaseDescribe='+diseaseDesc+'&couponId=&doctorId='+localDoctorId+'&doctorName='+reserveDocotrNameID+'&visitDate='+reserveAppointmentTimeID+'&visitPlace='+reserveAddressID
			+'&fee='+orderInfo.oPrice+'&deposit='+orderInfo.oEnsurePrice+'&totalFee='+orderInfo.oTotalPrice;
	//		console.log("requestOrderSubmit--->："+requestOrderSubmit);
		if(submitFlag == 0){
			submitFlag ++;
			jyapp.getApi({
				method: 'Treat/OrderSubmit',
				data: requestOrderSubmit,
				timeout: 10000,
	   			showWaiting : true,
				onsuccess: function(response) {
	//				console.log("response"+JSON.stringify(response));
					if (response.code == 1) {
						if(response.data != null && response.data.order != null){
							submitFlag = 0;
							var dataValue = response.data.order;
							commomUtil.closeWebviewById('orderDetailsPay');
							mui.openWindow({
								id: 'orderDetailsPay',
								url: "orderDetailsPay.html",
								extras: {
									"orderId": dataValue.ID
								}
							});
						}else{
							submitFlag = 0;
							plus.nativeUI.alert('订单提交失败', '','健医宝', '确认');
							return false;
						}
					} else {
						submitFlag = 0;
						var msg = response.msg ? response.msg : "预约订单提交失败";
						plus.nativeUI.alert(msg, '','健医宝', '确认');
						return false;
					}
				},
				onerror: function(e) {
					submitFlag = 0;
					console.log("getCoustomerInfo:" + e);
	//				plus.nativeUI.alert(e, '','健医宝', '确认');
				}
			});
		}
		return false;
	},
	getPatientInformation: function(patientId,relationType){
		if(relationType == 0){
			//关系为本人
			reserveInfomation.getMyInformation();
		}else{
			//关系为家人/朋友
			reserveInfomation.getFamilyInformation(patientId);
		}
	},
	getFamilyInformation: function(patientId) {
		var requestFamilyInformation = 'familyId=' + patientId;
//		console.log("requestFamilyInformation--->:"+requestFamilyInformation);
		jyapp.getApi({
			method: 'Profile/FamilyInformation',
			data: requestFamilyInformation,
			timeout: 10000,
			onsuccess: function(response) {
//				console.log("FamilyInformation--->:"+JSON.stringify(response))
				if (response.code != 1) {
					document.getElementById("reservePatientNameID").value = '';
					document.getElementById("reservePhoneID").value = '';
					document.getElementById("reserveIDNumberID").value = '';
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					if (response.data != null) {
						var dataValue = response.data;
						var name = dataValue.Name ? dataValue.Name : "";
						var phone = dataValue.Mobile ? dataValue.Mobile : "";
						var idnumber = dataValue.CredentialsNo ? dataValue.CredentialsNo : "";
						document.getElementById("reservePatientNameID").value = name;
						document.getElementById("reservePhoneID").value = phone;
						document.getElementById("reserveIDNumberID").value = idnumber;
					}else{
						document.getElementById("reservePatientNameID").value = '';
						document.getElementById("reservePhoneID").value = '';
						document.getElementById("reserveIDNumberID").value = '';
					}
				}
			},
			onerror: function(e) {
				console.log("FamilyInformation:" + e);
			}
		});
	},
	getMyInformation : function(){
		jyapp.getApi({
			method: 'Profile/Index',
			timeout: 10000,
			onsuccess: function(response) {
//				console.log("getMyInformation--->:"+JSON.stringify(response))
				if (response.code != 1) {
					document.getElementById("reservePatientNameID").value = '';
					document.getElementById("reservePhoneID").value = '';
					document.getElementById("reserveIDNumberID").value = '';
					plus.nativeUI.alert(response.msg, '','健医宝', '确认');
					return false;
				} else {
					if (response.data != null && response.data.cusinfo != null) {
						var dataValue = response.data.cusinfo;
						var name = dataValue.fullname ? dataValue.fullname : "";
						var phone = dataValue.phone ? dataValue.phone : "";
						var idnumber = dataValue.idnumber ? dataValue.idnumber : "";
						document.getElementById("reservePatientNameID").value = name;
						document.getElementById("reservePhoneID").value = phone;
						document.getElementById("reserveIDNumberID").value = idnumber;
					}else{
						document.getElementById("reservePatientNameID").value = '';
						document.getElementById("reservePhoneID").value = '';
						document.getElementById("reserveIDNumberID").value = '';
					}
				}
			},
			onerror: function(e) {
				console.log("FamilyInformation:" + e);
			}
		});
	},
	reserveCheckClickEvent : function(){
		if (this.checked) {
			this.checked = true;
			this.value = 1;
		} else {
			this.checked = false;
			this.value = 0;
		}
	},
	choosePatientsInfo : function(){
		commomUtil.closeWebviewById('patient');
		mui.openWindow({
			id:'patient',
			url:'patient.html',
			createNew:true,
			extras:{
				orderInfo : orderInfo
			}
		});
	}/*,
	validateIDNumber : function(idNumber){
		console.log(idNumber);
	},
	validatePhone : function(phone){
		console.log(phone);
	}*/
}

//绑定选择就诊人信息按钮事件
document.getElementById('patient').addEventListener('click',reserveInfomation.choosePatientsInfo);

//绑定预约挂号阅读协议单选框事件
document.getElementById('reserveCheckDivID').addEventListener('click',reserveInfomation.reserveCheckClickEvent);

//绑定提交预约信息butten按钮事件
document.getElementById('reserveSubmitAppointmentID').addEventListener('click',reserveInfomation.submitAppointment);