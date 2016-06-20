document.addEventListener('plusready', function(){
	//初始化医生详情信息数据
	cancerExpertsTypes.initcancerExpertsTypes();
	
})

var cancerExpertsTypes = {
	initcancerExpertsTypes : function(){
		jyapp.getApi({
 			method: 'Tumour/DiseaseList',
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
// 				console.log(JSON.stringify(data.data.diseaseTypes));
// 				console.log(JSON.stringify(data.data.diseases));
 				var segmentedControlshtml = "";
 				var segmentedControlContentshtml = "";
 				var diseaseTypes = data.data.diseaseTypes;
 				var diseases = data.data.diseases;
 				for(var i=0;i<diseaseTypes.length;i++){
 					segmentedControlshtml += "<a class=\"mui-control-item\" href=\"#content"+i+"\">"+diseaseTypes[i].TypeName+"</a>";
 					segmentedControlContentshtml += "<div id=\"content"+i+"\" class=\"mui-control-content\"><ul class=\"mui-table-view\">";
 					for(var j=0;j<diseases.length;j++){
 						if(diseaseTypes[i].ID == diseases[j].DiseaseTypeID){
 							segmentedControlContentshtml += "<li class=\"mui-table-view-cell\"><a href=\"\" ><input type='hidden' value="+diseases[j].ID+" /><input type='hidden' value="+diseases[j].Name+" />"+diseases[j].Name+"</a></li>";
 						}
 					}
 					segmentedControlContentshtml += "</ul></div>";
 				}
 				document.getElementById("segmentedControls").innerHTML = segmentedControlshtml;
				document.getElementById("segmentedControlContents").innerHTML = segmentedControlContentshtml;
				document.getElementById("segmentedControls").querySelector('.mui-control-item').classList.add('mui-active');
				document.getElementById("segmentedControlContents").querySelector('.mui-control-content').classList.add('mui-active');
 			},
 			onerror: function(e) {
 				console.log("e-------->:"+e);
 			}
 		});
	}
}