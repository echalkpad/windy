var useTimeList = new Array();
var oldTimeList = new Array();
var number = 0;
(function($) {})(mui);
var accountTypePlanEdit = 0;
var familyIdPlanEdit = 0;
var isFamilyTypeEdit = 0;
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var medPlanID = self.medPlanID;
	accountTypePlanEdit = self.accountType;
	familyIdPlanEdit = self.familyId;
	isFamilyTypeEdit = self.isFamilyType;
//	alert(accountTypePlanEdit+" -medicationPlanEdit- "+familyIdPlanEdit);
	//	初始化用药方案编辑
	medicationPlanEdit.initMedicationSchemeEdit(medPlanID);
});

var medicationPlanEdit = {
	initMedicationSchemeEdit: function(medPlanID) {
		if (medPlanID && medPlanID != "" && typeof(medPlanID) != "undefined") {
			var html = '';
			var requestMedicationScheme = "medicationId=" + medPlanID;
			jyapp.getApi({
				method: 'Medication/MedicationScheme',
				data: requestMedicationScheme,
				timeout: 10000,
				onsuccess: function(response) {
					if (response.code == 1 && response.data != null && response.data != "") {
						var dataValue = response.data.medication;
						document.getElementById('medicatioPlanEditID').value = dataValue.ID;
						document.getElementById('isRemindEditID').value = dataValue.IsRemind;
//						document.getElementById('drugNameEditID').value = unescape((dataValue.DrugName ? dataValue.DrugName : "").replace(/\\/g, "%"));
						document.getElementById('drugNameEditID').value = dataValue.DrugName ? dataValue.DrugName : "";
						document.getElementById('dosageEditID').value = unescape((dataValue.Dosage ? dataValue.Dosage : "").replace(/\\/g, "%"));
						document.getElementById('requirementEditID').value = dataValue.Requirement;
						var _roleModularuls = document.getElementById('roleModularID');
						var timeList = response.data.newTimeList;
						number = timeList.length;
						var timeListHtml = '';
						timeListHtml += '	<li class="mui-table-view-cell active"><h2>用药周期</h2></li>';
						timeListHtml += '	<li class="mui-table-view-cell">';
						timeListHtml += '		<input type="hidden" id="ruleEditID" value="0" />';
						timeListHtml += '		<h2>重复规则</h2>';
						timeListHtml += '		<ol class="repeat" id="ruleOlEditID">';
						timeListHtml += '			<li id="day"><span item="0">每日</span></li>';
						timeListHtml += '			<li id="gday"><span item="1">隔日</span></li>';
						timeListHtml += '		</ol>';
						timeListHtml += '	</li>';
						for (var i = 1; i < timeList.length + 1; i++) {
							timeListHtml += '	<li class="mui-table-view-cell btn" data-options={"type":"time","number":' + i + ',"minutesInterval":10}><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><a href="" class="mui-navigate-right">第' + i + '次用药时间<span class="mui-badge mui-badge-inverted result">' + timeList[i - 1].UseTime + '</span></a></div></li>';
							var date = new Date();
							var localDate = commomUtil.formatStringToDate(date.getTime(), 1);
							var useTime = localDate + " " + timeList[i - 1].UseTime + ":00";
							useTimeList.push(useTime);
							oldTimeList.push(timeList[i - 1].UseTime);
						}
						timeListHtml += '	<input type="hidden" id="useTimeListID" value=' + useTimeList + '/>';
						timeListHtml += '	<li class="mui-table-view-cell editTime" id="editTime"><strong>+</strong>添加时间</li>';
						_roleModularuls.innerHTML = timeListHtml;
						document.getElementById('descriptionEditID').value = unescape((dataValue.Description ? dataValue.Description : "").replace(/\\/g, "%"));
						//加载样式
						medicationPlanEdit.loadClass(dataValue);
					} else {
						plus.nativeUI.alert(response.msg, "", "健医宝", "确认");
						return false;
					}
				},
				onerror: function(e) {
					console.log("initMedicationSchemeEdit:" + e);
				}
			});
		}
	},
	loadClass: function(dataValue) {
		var isRemindTapEditID = document.getElementById("isRemindTapEditID");
		if (dataValue.IsRemind == 1) {
			isRemindTapEditID.className = 'mui-switch mui-switch-mini mui-active mui-pull-right';
		}
		var OlID = document.getElementById("requirementOlEditID");
		var lis = OlID.getElementsByTagName('li');
		for (var i = 0; i < lis.length; i++) {
			if (dataValue.Requirement == lis[i].getElementsByTagName('span')[0].getAttribute('item')) {
				lis[i].className = 'selector';
			}
		}
		var ruleOl = document.getElementById('ruleOlEditID');
		var ruleLis = ruleOl.getElementsByTagName('li');
		for (var i = 0; i < ruleLis.length; i++) {
			if (dataValue.Rule == ruleLis[i].getElementsByTagName('span')[0].getAttribute('item')) {
				ruleLis[i].className = 'selector';
			}
		}
		//
		medicationPlanEdit.loadEvent();
	},
	submitMedicationPlanEdit: function() {
		var requestMedicationPlanEdit = {};
		var medicatioPlanEditID = document.getElementById("medicatioPlanEditID").value;
		var isRemind = document.getElementById("isRemindEditID").value;
		var drugName = document.getElementById("drugNameEditID").value;
		if (!drugName || drugName == "" || typeof(drugName) == "undefined") {
			document.getElementById("drugNameEditID").focus();
			plus.nativeUI.alert("请填写药品名称", "", "健医宝", "确认");
			return false;
		}
//		}else{
//			drugName = escape(drugName).replace(/%/g,"\\");
//		}
		var dosage = document.getElementById("dosageEditID").value;
		if (!dosage || dosage == "" || typeof(dosage) == "undefined") {
			document.getElementById("dosageEditID").focus();
			plus.nativeUI.alert("请先填写服用剂量", "", "健医宝", "确认");
			return false;
		}else{
			dosage = escape(dosage).replace(/%/g,"\\");
		}
		var requirement = document.getElementById("requirementEditID").value;
		var rule = document.getElementById("ruleEditID").value;
		if (useTimeList.length == 0) {
			document.getElementById("useTimeListID").focus();
			plus.nativeUI.alert("请先选择用药时间", "", "健医宝", "确认");
			return false;
		}
		var description = document.getElementById("descriptionEditID").value;
		if (!description || description == "" || typeof(description) == "undefined") {
			description = "";
		} else {
			description = escape(description).replace(/%/g,"\\");
			var descriptiontLen = commomUtil.GetLength(description);
			if (descriptiontLen > 100) {
				document.getElementById("descriptionEditID").focus();
				plus.nativeUI.alert("备注信息只能填写50字以内的信息", "", "健医宝", "确认");
				return false;
			}
		}
		var sort = 0;
		requestMedicationPlanEdit.sort = sort;
		requestMedicationPlanEdit.description = description;
		requestMedicationPlanEdit.useTimeList = useTimeList;
		requestMedicationPlanEdit.rule = parseInt(rule);
		requestMedicationPlanEdit.requirement = parseInt(requirement);
		requestMedicationPlanEdit.dosage = dosage;
		requestMedicationPlanEdit.drugName = drugName;
		requestMedicationPlanEdit.isRemind = parseInt(isRemind);
		requestMedicationPlanEdit.medicationId = parseInt(medicatioPlanEditID);
		if (accountTypePlanEdit == 1) {
			requestMedicationPlanEdit.accountType = parseInt(accountTypePlanEdit);
			requestMedicationPlanEdit.familyId = parseInt(familyIdPlanEdit);
		}
		jyapp.getApi({
			method: 'Medication/MedicationSchemeEdit',
			data: JSON.stringify(requestMedicationPlanEdit),
			requestHeader: {
				'Content-Type': 'application/json'
			},
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
				if (response.code == 1) {
					commomUtil.closeWebviewById('medicationManage');
					mui.openWindow({
						id: 'medicationManage',
						url: "../../html/medication/medicationManage.html",
						createNew: true,
						extras : {
							"accountType" : accountTypePlanEdit,
							"familyId" : familyIdPlanEdit,
							"isFamilyType":isFamilyTypeEdit
						}
					});
				} else {
					plus.nativeUI.alert(response.msg, "", "健医宝", "确认");
					return false;
				}
			},
			onerror: function(e) {
				console.log("initMedicationSchemeEdit:" + e);
			}
		});
	},
	loadEvent: function() {
		mui.init();
		var btns;
		mui('.mui-content').on('tap', '.editTime', function() {
			number = number + 1;
			var tag = document.createElement("li")
			var Add = document.getElementById('editTime')
			tag.setAttribute('class', 'mui-table-view-cell btn')
			tag.setAttribute('data-options', '{"type":"time","number":' + number + ',"minutesInterval":10}')
			tag.innerHTML = '<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><a href="" class="mui-navigate-right">第' + number + '次用药时间<span class="mui-badge mui-badge-inverted result"></span></a></div>'
			Add.parentNode.insertBefore(tag, Add);
		});
	
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

		mui('.mui-content').on('click', '.btn', function() {
			var self = this;
//			console.log(this.innerHTML);
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var num = options.number;
			var id = this.getAttribute('id');

			var picker = new mui.DtPicker(options);
			picker.show(function(rs) {
				var date = new Date();
				var localDate = commomUtil.formatStringToDate(date.getTime(), 1);
				var useTime = localDate + " " + rs.text + ":00";
				var flag = true;
				for (var is = 0; is < oldTimeList.length; is++) {
					var oldTime = oldTimeList[is] + "";
					if (oldTime == rs.text){
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
				self.querySelector('.result').innerText = rs.text;
				picker.dispose();
			});
		});


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
		mui('.switch').on('tap', '#isRemindTapEditID', function() {
			document.getElementById("descriptionEditID").blur();
			document.getElementById("drugNameEditID").blur();
			document.getElementById("dosageEditID").blur();
			var divID = document.getElementById("isRemindEditID");
			if (divID.value == 1) {
				this.className = 'mui-switch mui-switch-mini mui-pull-right';
				divID.value = 0;
			} else {
				this.className = 'mui-switch mui-switch-mini mui-active mui-pull-right';
				divID.value = 1;
			}
		});
		/**
		 * 使用要求赋值
		 */
		mui('.mui-table-view-cell').on('tap', '#requirementOlEditID', function(e) {
			document.getElementById("descriptionEditID").blur();
			document.getElementById("drugNameEditID").blur();
			document.getElementById("dosageEditID").blur();
			var requirementEditIDs = e.target.attributes;
			var requirementEditID = "";
			var type = 0;
			for (var i in requirementEditIDs) {
				if (requirementEditIDs[i].name == "item") {
					requirementEditID = requirementEditIDs[i].value;
					if (requirementEditID && typeof(requirementEditID) != "undefined" && requirementEditID != "") {
						document.getElementById("requirementEditID").value = requirementEditID;
					}
				}
			}
		});
		/**
		 * 重复规则赋值
		 */
		mui('.mui-table-view-cell').on('tap', '#ruleOlEditID', function(e) {
			document.getElementById("descriptionEditID").blur();
			document.getElementById("drugNameEditID").blur();
			document.getElementById("dosageEditID").blur();
			var ruleEditIDs = e.target.attributes;
			var ruleEditID = "";
			var type = 0;
			for (var i in ruleEditIDs) {
				if (ruleEditIDs[i].name == "item") {
					var ruleEditID = ruleEditIDs[i].value;
					if (ruleEditID && typeof(ruleEditID) != "undefined" && ruleEditID != "") {
						document.getElementById("ruleEditID").value = ruleEditID;
					}
				}
			}
		});
		//绑定药品名称输入完成光标事件
		document.getElementById('drugNameEditID').addEventListener('keyup',function(event){
			if(event.keyCode == 13){
				this.blur();
				document.getElementById('dosageEditID').focus();
			}
		});
		//绑定药品用量名称输入完成光标事件
		document.getElementById('dosageEditID').addEventListener('keyup',function(event){
			if(event.keyCode == 13){
				this.blur();
			}
		});
		//绑定用药方案编辑页面提交按钮
		document.getElementById('medicationPlanEditSubmitID').addEventListener('click', medicationPlanEdit.submitMedicationPlanEdit);
	}
}