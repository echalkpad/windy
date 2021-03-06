mui.init();
var Inp=document.querySelectorAll("input");
mui('.medication-foot').on('tap','.all',function(){
	Inp=document.querySelectorAll("input");
	if(Inp[0].checked){
		for(var i=0;i<Inp.length;i++){
			Inp[i].checked = false;
		}
	}else{
		for(var i=0;i<Inp.length;i++){
			Inp[i].checked = true;
		}
	}
});

var medicationIds = [];
//删除按钮操作
mui('.medication-foot').on('tap','.del',function(){
	Inp=document.querySelectorAll("input");
//	var medicationIds = [];
	var flag = false;
	//删除页面元素，并拼接删除集合
	for(var i=0;i<Inp.length;i++){
		if(Inp[i].checked){
			flag = true;
			var aLi=Inp[i].parentNode.parentNode;
			Inp[i].parentNode.parentNode.parentNode.removeChild(aLi)
			medicationIds.push(Inp[i].value);
		}
	}
	if(!flag){
		plus.nativeUI.alert('请至少选择一个进行删除','','健医宝','确认');
		return false;
	}
})
var accountTypeInEditor = 0;
var familyIdInEditor = 0;
var isFamilyTypeEditor = 0;
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	accountTypeInEditor = self.accountType;
	familyIdInEditor = self.familyId;
	isFamilyTypeEditor = self.isFamilyType;
	//初始化用药方案管理编辑列表
	editorMedicationManage.initMedicationSchemeList();
});
var editorMedicationManage = {
	initMedicationSchemeList: function() {
		var requestMedicationSchemeList = '';
		if (accountTypeInEditor == 1) {
			requestMedicationSchemeList = '&accountType=' + accountTypeInEditor+ '&familyId=' + familyIdInEditor;
		} else {
			requestMedicationSchemeList = '';
		}
		jyapp.getApi({
			method: 'Medication/MedicationSchemeList',
			data: requestMedicationSchemeList,
			timeout: 10000,
			onsuccess: function(response) {
				var mslUlID = document.getElementById("editorMedicationManageUlID");
				if (response.code == 1 && response.data != null && response.data != "") {
					var dataValues = response.data;
					for (var i = 0; i < dataValues.length; i++) {
						var _mslis = document.createElement('li');
						_mslis.setAttribute('class',"mui-table-view-cell mui-checkbox");
						var _msas = document.createElement('a');
						_msas.setAttribute('href',"");
//						_msas.innerText = unescape((dataValues[i].DrugName ? dataValues[i].DrugName : "--").replace(/\\/g, "%"));
						_msas.innerText = dataValues[i].DrugName ? dataValues[i].DrugName : "--";
						var ruleName = '每日';
						if(dataValues[i].Rule != 0){
							ruleName = '隔日';
						}
						var _msspans = document.createElement('span');
						_msspans.setAttribute('class','mui-badge mui-badge-inverted');
						_msspans.innerText = ruleName + dataValues[i].Count + '次，每次' + unescape((dataValues[i].Dosage ? dataValues[i].Dosage : " ").replace(/\\/g, "%"));
						_msas.appendChild(_msspans);
						var _msinputs = document.createElement('input');
						_msinputs.setAttribute('name','checkbox1');
						_msinputs.setAttribute('type','checkbox');
						_msinputs.value = dataValues[i].ID;
						_msas.appendChild(_msinputs);
						_mslis.appendChild(_msas);
						mslUlID.appendChild(_mslis);
					}
				}
			},
			onerror: function(e) {
				console.log("initEditorMedicationManageList:" + e);
			}
		});
	},
	delMedicationScheme : function(medicationIds){
		var requestMedicationSchemeDelete = '';
		if (accountTypeInEditor == 1) {
			requestMedicationSchemeDelete = '{"medicationId":['+medicationIds+'],"accountType":'+accountTypeInEditor+',"familyId":'+familyIdInEditor+'}';
		} else {
			requestMedicationSchemeDelete = '{"medicationId":['+medicationIds+']}';
		}
//		console.log("requestMedicationSchemeDelete---->:"+requestMedicationSchemeDelete);
		jyapp.getApi({
			method: 'Medication/MedicationSchemeDelete',
			data: requestMedicationSchemeDelete,
			requestHeader: {
				'Content-Type': 'application/json'
			},
			timeout: 10000,
			onsuccess: function(response) {
//				alert("isFamilyType--->:"+isFamilyTypeEditor);
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,"","健医宝","确认");
					return false;
				}else{
					commomUtil.closeWebviewById("medicationManage");
					mui.openWindow({
						id:'medicationManage',
						url:'medicationManage.html',
						createNew: true,
						extras: {
							"accountType" : accountTypeInEditor,
							"familyId" : familyIdInEditor,
							"isFamilyType":isFamilyTypeEditor
						}
					});
				}
			},
			onerror: function(e) {
				console.log("initEditorMedicationManageList:" + e);
			}
		});
	},
	submitDeleteMedPlan : function(){
		if(medicationIds.length == 0){
			commomUtil.closeWebviewById("medicationManage");
			mui.openWindow({
				id:'medicationManage',
				url:'medicationManage.html',
				createNew: true,
				extras: {
					"accountType": accountTypeInEditor,
					"familyId": familyIdInEditor,
					"isFamilyType":isFamilyTypeEditor
				}
			});
		}else{
			//当集合中有需要删除的药品计划时执行删除操作
			editorMedicationManage.delMedicationScheme(medicationIds);
		}
	}
}
