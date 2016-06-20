var MedicineId = "";
document.addEventListener("plusready",function(){
	var self = plus.webview.currentWebview();
	MedicineId = self.MedicineId;
	symptomaticMedicineDetail.initData();
	
});

var symptomaticMedicineDetail = {
	initData : function(){
		var requestData = "id="+MedicineId;
//		console.log(requestData);
		jyapp.getApi({
 			method: 'SearchMedicine/DrugDetails',
 			timeout : 10000,
 			showWaiting: true,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var symptomaticMedicineDetailHtml = "";
   				if(data && data.code==1 && data.data){
   					document.getElementById("symptomaticMedicineDetailErrorId").style.display = "none";
					var dataValues = data.data;
					symptomaticMedicineDetailHtml += '<div class="symptomaticTop">';
					symptomaticMedicineDetailHtml += '<img src="'+dataValues.img+'" alt="" onerror="this.src=\'../img/default/huiyuan_touxiang.png\';this.onerror=null" />';
					symptomaticMedicineDetailHtml += '<h2>'+dataValues.name+'</h2>';
					symptomaticMedicineDetailHtml += '<h3>'+dataValues.type+'</h3>';
					symptomaticMedicineDetailHtml += '<p class="ellipsis">'+dataValues.description+'</p>';
					symptomaticMedicineDetailHtml += '</div>';
					symptomaticMedicineDetailHtml += '<div class="symptomaticBottom border-t">';
					symptomaticMedicineDetailHtml += '<article>';
					symptomaticMedicineDetailHtml += '<h2></h2>';
					symptomaticMedicineDetailHtml += '<p>药品说明书</p>';
					symptomaticMedicineDetailHtml += '</article>';
					symptomaticMedicineDetailHtml += dataValues.message;
					symptomaticMedicineDetailHtml += '</div>';
   					document.getElementById("symptomaticMedicineDetailId").innerHTML = symptomaticMedicineDetailHtml;
   				}else{
   					if(symptomaticMedicineDetailHtml == ""){
   						document.getElementById("symptomaticMedicineDetailErrorId").style.display = "";
   					}
   				}
 			},
 			onerror: function(e) {
 				document.getElementById("symptomaticMedicineDetailId").innerHTML = "";
 				document.getElementById("symptomaticMedicineDetailErrorId").style.display = "";
 				console.log("e-------->:"+e);
 			}
 		});
	}
	
};