document.addEventListener('plusready', function() {
	//初始化疾病列表
	slowDiseaseTypes.initSlowDiseaseTypes();
});

var slowDiseaseTypes = {
	initSlowDiseaseTypes: function() {
		mui.init({
			swipeBack: true //启用右滑关闭功能
		});
		var arr = new Array();
		var con = new Array();
		jyapp.getApi({
   			method: 'Treat/Diseases',
	   		showWaiting : true,
   			timeout : 10000,
   			onsuccess: function(response) {
// 				console.log("initSlowDiseaseTypes-->:"+JSON.stringify(response));
				var agreeTime = commomUtil.getDateStr(30);
   				var dataTypesValues = response.data.diseaseTypes;
   				if(dataTypesValues != null){
	 				for(var i = 0; i < dataTypesValues.length; i++){
	 					var firstArr = {};
	 					firstArr.text = dataTypesValues[i].TypeName;
	 					firstArr.value = dataTypesValues[i].ID;
	 					arr.push(firstArr);
	 				}
   				}
//				console.log("arr---->:"+JSON.stringify(arr));
   				var dataValues = response.data.diseases;
   				if(dataValues != null){
		 			for(var j = 0; j < dataValues.length; j++){
		 				var secondArr = {};
		 				secondArr.text = dataValues[j].Name;
		 				secondArr.value = dataValues[j].DiseaseTypeID;
		 				con.push(secondArr);
		 			}
//					console.log("con---->:"+JSON.stringify(con));
					var controls = document.getElementById("segmentedControlsSlow");
					var contents = document.getElementById("segmentedControlContentsSlow");
					var html = [''];
					for (i = 0; i < arr.length; i++) {
						html.push('<a class="mui-control-item" href="#content' + i + '">' + arr[i].text + '</a>');/*<input type="text" value="' + arr[i].value + '">*/
					}
					controls.innerHTML = html.join('');
					html = [];
					for (i = 0; i < arr.length; i++) {
						html.push('<div id="content' + i + '" class="mui-control-content"><ul class="mui-table-view">');
						for (j = 0; j < con.length; j++) {
							if(con[j].value == arr[i].value){
								html.push('<li class="mui-table-view-cell">' + con[j].text + '<input type="hidden" value="'+con[j].value+'" /><input type="hidden" value="'+con[j].text+'" /></li>');
							}
						}
						html.push('</ul></div>');
					}
					contents.innerHTML = html.join('');
					//默认选中第一个
					controls.querySelector('.mui-control-item').classList.add('mui-active');
					contents.querySelector('.mui-control-content').classList.add('mui-active');
   				}
   			},
   			onerror: function(e) {
   				console.log("initinitSlowDiseaseTypeValue:"+e);
   			}
   		});
	}
}
