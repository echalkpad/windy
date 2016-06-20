var useTimeList = new Array();
var oldTimeList = new Array();
(function($) {
	$.init();
	var btns;
	var num = 3
	mui('.mui-table-view').on('tap', '.addTime', function() {
		num = num + 1;
		var tag = document.createElement("li");
		var Add = document.getElementById('addTime');
		tag.setAttribute('class', 'mui-table-view-cell btn');
		tag.setAttribute('data-options', '{"type":"time","minutesInterval":"10","number":' + num + '}');
		tag.innerHTML = '<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><a href="" class="mui-navigate-right">第' + num + '次用药时间<span class="mui-badge mui-badge-inverted result"></span></a></div>';
		Add.parentNode.insertBefore(tag, Add);
	})

	var btnArray = ['确认', '取消'];
	mui('.mui-table-view').on('tap', '.mui-btn', function(event) {
		var elem = this;
		var _li = elem.parentNode.parentNode;
		var _spanValue = _li.querySelectorAll('span')[0].innerText;
		mui.confirm('确认删除该条记录？', '用药时间', btnArray, function(e) {
			if (e.index == 0) {
				_li.parentNode.removeChild(_li);
				for (var is = 0; is < oldTimeList.length; is++) {
					if (_spanValue == oldTimeList[is]) {
						useTimeList.splice(is, 1);
						oldTimeList.splice(is, 1);
					}
				}
			} else {
				setTimeout(function() {
					mui.swipeoutClose(_li);
				}, 0);
			}
		});
	});	

	mui('.mui-content').on('tap', '.btn', function() {
		var self = this;
		var optionsJson = this.getAttribute('data-options') || '{}';
		var options = JSON.parse(optionsJson);
		var num = options.number;
		var id = this.getAttribute('id');
		var picker = new $.DtPicker(options, 1);
		picker.show(function(rs) {
			var date = new Date();
			var localDate = commomUtil.formatStringToDate(date.getTime(), 1);
			var useTime = localDate + " " + rs.text + ":00";
			var flag = true;
			for (var is = 0; is < oldTimeList.length+1; is++) {
				var oldTime = oldTimeList[is] + "";
				if (oldTime == rs.text) {
					plus.nativeUI.alert("两次用药的时间不能一样", "", "健医宝", "OK");
					return false;
				}
			}
			for (var is = oldTimeList.length; is > 0; is--) {
				if (num == is) {
					flag = false;
					useTimeList.splice(num - 1, 1, useTime);
					oldTimeList.splice(num - 1, 1, rs.text);
				}
			}
			if (flag) {
				useTimeList.push(useTime);
				oldTimeList.push(rs.text);
			}
			picker.dispose();
			self.querySelector('.result').innerText = rs.text;
		});
	})

	function att(e) {
		var aLi = e.parentNode.children;
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].removeAttribute('class');
			e.setAttribute('class', 'selector')
		}
	}
	mui('.use').on('tap', 'li', function() {
		if (this.getAttribute('class', 'selector') == 'selector') {
			this.removeAttribute('class');
		} else {
			att(this);
		}
	});
	mui('.repeat').on('tap', 'li', function() {
		var a = document.getElementById('day');
		var b = document.getElementById("gday");
		if (this.getAttribute('class', 'selector') == 'selector') {
			this.removeAttribute('class')
		} else {
			if (this !== a || b) {
				a.removeAttribute('class');
				b.removeAttribute('class');
				this.setAttribute('class', 'selector')
			}
		}
	});
	mui('.repeat').on('tap', '#day', function() {
		if (this.getAttribute('class', 'selector') == 'selector') {
			att(this);
		} else {
			this.removeAttribute('class')
		}
	});
	mui('.repeat').on('tap', '#gday', function() {
		if (this.getAttribute('class', 'selector') == 'selector') {
			att(this);
		} else {
			this.removeAttribute('class')
		}
	});
	/**
	 * 是否提醒赋值
	 */
	mui('.switch').on('tap', '#isRemindTapID', function() {
		document.getElementById("descriptionID").blur();
		document.getElementById("drugNameID").blur();
		document.getElementById("dosageID").blur();
		var isRemindID = document.getElementById("isRemindID").value;
		if (isRemindID == 1) {
			document.getElementById("isRemindID").value = 0;
		} else {
			document.getElementById("isRemindID").value = 1;
		}
	});
	/**
	 * 使用要求赋值
	 */
	mui('.mui-table-view-cell').on('tap', '#requirementOlID', function(e) {
		document.getElementById("descriptionID").blur();
		document.getElementById("drugNameID").blur();
		document.getElementById("dosageID").blur();
		var requirementIDs = e.target.attributes;
		var requirementID = "";
		var type = 0;
		for (var i in requirementIDs) {
			if (requirementIDs[i].name == "item") {
				requirementID = requirementIDs[i].value;
				if (requirementID && typeof(requirementID) != "undefined" && requirementID != "") {
					document.getElementById("requirementID").value = requirementID;
				}
			}
		}
	});
	/**
	 * 重复规则赋值
	 */
	mui('.mui-table-view-cell').on('tap', '#ruleOlID', function(e) {
		document.getElementById("descriptionID").blur();
		document.getElementById("drugNameID").blur();
		document.getElementById("dosageID").blur();
		var ruleIDs = e.target.attributes;
		var ruleID = "";
		var type = 0;
		for (var i in ruleIDs) {
			if (ruleIDs[i].name == "item") {
				var ruleID = ruleIDs[i].value;
				if (ruleID && typeof(ruleID) != "undefined" && ruleID != "") {
					document.getElementById("ruleID").value = ruleID;
				}
			}
		}
	});
})(mui);

var accountTypePlan = 0;
var familyIdPlan = 0;
var isFamilyTypePlan = 0;
var indexFlag = 0;
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	accountTypePlan = self.accountType;
	familyIdPlan = self.familyId;
	isFamilyTypePlan = self.isFamilyType;
	//	console.log(accountTypePlan+" -medicationPlan- "+familyIdPlan);
});
var medicationPlan = {
		submitMedicationPlan: function() {
			if (indexFlag > 0) {
				return;
			}
			indexFlag++;
			var requestMedicationPlanAdd = {};
			var isRemind = document.getElementById("isRemindID").value;
			var drugName = document.getElementById("drugNameID").value;
			if (!drugName || drugName == "" || typeof(drugName) == "undefined") {
				indexFlag = 0;
				document.getElementById("drugNameID").focus();
				plus.nativeUI.alert("请填写药品名称", "", "健医宝", "确认");
				return false;
			}
//			} else {
//				drugName = escape(drugName).replace(/%/g, "\\");
//			}
			var dosage = document.getElementById("dosageID").value;
			if (!dosage || dosage == "" || typeof(dosage) == "undefined") {
				indexFlag = 0;
				document.getElementById("dosageID").focus();
				plus.nativeUI.alert("请先填写服用剂量", "", "健医宝", "确认");
				return false;
			} else {
				dosage = escape(dosage).replace(/%/g, "\\");
			}
			var requirement = document.getElementById("requirementID").value;
			var rule = document.getElementById("ruleID").value;
			if (useTimeList.length == 0) {
				indexFlag = 0;
				document.getElementById("useTimeListID").focus();
				plus.nativeUI.alert("请先选择用药时间", "", "健医宝", "确认");
				return false;
			}
			var description = document.getElementById("descriptionID").value;
			if (!description || description == "" || typeof(description) == "undefined") {
				description = "";
			} else {
				description = escape(description).replace(/%/g, "\\");
				var descriptiontLen = commomUtil.GetLength(description);
				if (descriptiontLen > 100) {
					indexFlag = 0;
					document.getElementById("descriptionID").focus();
					plus.nativeUI.alert("备注信息只能填写50字以内的信息", "", "健医宝", "确认");
					return false;
				}
			}
			var sort = 0;
			requestMedicationPlanAdd.sort = sort;
			requestMedicationPlanAdd.description = description;
			requestMedicationPlanAdd.useTimeList = useTimeList;
			requestMedicationPlanAdd.rule = parseInt(rule);
			requestMedicationPlanAdd.requirement = parseInt(requirement);
			requestMedicationPlanAdd.dosage = dosage;
			requestMedicationPlanAdd.drugName = drugName;
			requestMedicationPlanAdd.isRemind = parseInt(isRemind);
			if (accountTypePlan == 1) {
				requestMedicationPlanAdd.accountType = parseInt(accountTypePlan);
				requestMedicationPlanAdd.familyId = parseInt(familyIdPlan);
			}
			//		alert(accountTypePlan+" -MedicationSchemeAdd- "+familyIdPlan);
			jyapp.getApi({
				method: 'Medication/MedicationSchemeAdd',
				data: JSON.stringify(requestMedicationPlanAdd),
				requestHeader: {
					'Content-Type': 'application/json'
				},
				timeout: 10000,
				showWaiting: true,
				onsuccess: function(response) {
					if (response.code == 1) {
						commomUtil.closeWebviewById('medicationManage');
						mui.openWindow({
							id: 'medicationManage',
							url: "../../html/medication/medicationManage.html",
							createNew: true,
							extras: {
								"accountType": accountTypePlan,
								"familyId": familyIdPlan,
								"isFamilyType": isFamilyTypePlan
							}
						});
					} else {
						indexFlag = 0;
						plus.nativeUI.alert(response.msg, "", "健医宝", "确认");
						return false;
					}
				},
				onerror: function(e) {
					indexFlag = 0;
					console.log("initMedicationSchemeEdit:" + e);
				}
			});
		}
	}
	//绑定药品名称输入完成光标事件
document.getElementById('drugNameID').addEventListener('keyup', function(event) {
	if (event.keyCode == 13) {
		this.blur();
		document.getElementById('dosageID').focus();
	}
});
//绑定药品用量名称输入完成光标事件
document.getElementById('dosageID').addEventListener('keyup', function(event) {
	if (event.keyCode == 13) {
		this.blur();
	}
});