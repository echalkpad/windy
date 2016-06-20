//对症药品
mui(".mui-col-xs-7").on('tap', 'li', function() {
	var title = this.querySelectorAll("input")[1].value;
	var chiledId = this.querySelectorAll("input")[0].value;
	mui.openWindow({
		id: 'symptomaticMedicineList',
		url: "symptomaticMedicineList.html",
		extras: {
			"title" : title,
			"chiledId" : chiledId
		}
	});
});

mui("#symptomaticMedicineItemsId").on("tap","a",function(){
	var typeId = this.querySelectorAll("input")[0].value;
	symptomaticMedicine.initsymptomaticMedicineChileds(typeId);
});
document.addEventListener("plusready",function(){
	//初始化数据
	symptomaticMedicine.initsymptomaticMedicine();
});

var symptomaticMedicine = {
	initsymptomaticMedicine : function(){
		jyapp.getApi({
 			method: 'SearchMedicine/Classify',
 			timeout : 10000,
 			showWaiting:true,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var symptomaticMedicineItemsHtml = "";
   				if(data && data.data && data.data.length > 0){
   					var typeId = "";
   					for(var i=0;i<data.data.length;i++){
   						var dataValues = data.data[i];
	   					var hrefId = "content"+i;
	   					var className = "mui-control-item";
	   					if(i== 0){
	   						className = "mui-control-item mui-active";
	   						typeId = dataValues.id;
	   					}
	   					symptomaticMedicineItemsHtml += '<a class="'+className+'" href="">';
	   					symptomaticMedicineItemsHtml += '<input type="hidden" value="'+dataValues.id+'" />';
	   					symptomaticMedicineItemsHtml += '<img src="'+dataValues.img+'" alt="" />'+dataValues.title+'</a>';
   					}
   					document.getElementById("symptomaticMedicineItemsId").innerHTML = symptomaticMedicineItemsHtml;
   					symptomaticMedicine.initsymptomaticMedicineChileds(typeId);
   				}
 			},
 			onerror: function(e) {
 				console.log("e-------->:"+e);
 			}
 		});
	},
	initsymptomaticMedicineChileds : function(typeid){
		jyapp.getApi({
 			method: 'SearchMedicine/ClassifyChild',
 			timeout : 10000,
 			showWaiting:true,
 			data : 'id='+typeid,
 			onsuccess: function(data) {
   				var medicineChiledsHtml = "";
   				document.getElementById("symptomaticMedicineItemChiledsId").innerHTML = medicineChiledsHtml;
   				if(data && data.data && data.data.length > 0){
   					for(var i=0;i<data.data.length;i++){
   						var dataValues = data.data[i];
   						var hrefId = "content"+i;
						medicineChiledsHtml += '<li class="mui-table-view-cell">'+dataValues.title;
						medicineChiledsHtml += '<input type="hidden" value="'+dataValues.id+'">';
						medicineChiledsHtml += '<input type="hidden" value="'+dataValues.title+'">';
						medicineChiledsHtml += '</li>';
   					}
   					document.getElementById("symptomaticMedicineItemChiledsId").innerHTML = medicineChiledsHtml;
   				}
 			},
 			onerror: function(e) {
 				console.log("e-------->:"+e);
 			}
 		});
	}
};
