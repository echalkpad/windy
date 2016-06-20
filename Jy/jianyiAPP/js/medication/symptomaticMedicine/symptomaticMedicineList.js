//药品详情
mui(".mui-content").on('tap', 'li', function() {
	var MedicineId = this.querySelectorAll("input")[0].value;
	mui.openWindow({
		id: 'symptomaticMedicineDetail',
		url: "symptomaticMedicineDetail.html",
		extras: {
			"MedicineId" : MedicineId
		}
	});
})
var title = "";
var chiledId = "";
var pageIndex = 1;
var symptomaticMedicineListHtml = "";
var total = 0;
document.addEventListener("plusready",function(){
	var self = plus.webview.currentWebview();
	title = self.title;
	chiledId = self.chiledId;
	symptomaticMedicineList.initData();
	//加载下拉刷新事件
	document.addEventListener( "plusscrollbottom", function(){
		if(total == 8){
			symptomaticMedicineList.setTs("symptomaticMedicineDivId","symptomaticMedicinespanId",0);
			pageIndex ++;
			symptomaticMedicineList.initData();
		}else{
			symptomaticMedicineList.setTs("symptomaticMedicineDivId","symptomaticMedicinespanId",1);
		}
	});
});

var symptomaticMedicineList = {
	initData : function(){
		var requestData = "id="+chiledId+"&pageIndex="+pageIndex+"&pageSize=8";
//		console.log(requestData);
		jyapp.getApi({
 			method: 'SearchMedicine/DrugList',
 			timeout : 10000,
 			showWaiting: true,
 			data : requestData,
 			onsuccess: function(data) {
   				console.log(JSON.stringify(data));
   				if(data.code == 1 && data.data && data.data.tngou.length > 0){
   					total = data.data.tngou.length;
   					document.getElementById("symptomaticMeddicineListzwddId").style.display = "none";
   					for(var i=0;i<data.data.tngou.length;i++){
   						var dataValues = data.data.tngou[i];
   						symptomaticMedicineListHtml += '<li class="mui-table-view-cell mui-media">';
						symptomaticMedicineListHtml += '<a href="javascript:;">';
						symptomaticMedicineListHtml += '<input type="hidden" value="'+dataValues.id+'" />';
						symptomaticMedicineListHtml += '<img class="mui-media-object mui-pull-left" src="'+dataValues.img +'">';
						symptomaticMedicineListHtml += '<div class="mui-media-body">';
						symptomaticMedicineListHtml += '<h2>'+dataValues.name +'</h2>';
						symptomaticMedicineListHtml += '<h3>'+dataValues.type +'</h3>';
						symptomaticMedicineListHtml += '<p class="mui-ellipsis">'+dataValues.keywords +'</p>';
						symptomaticMedicineListHtml += '</div>';
						symptomaticMedicineListHtml += '</a>';
						symptomaticMedicineListHtml += '</li>';
   						
   					}
   					document.getElementById("symptomaticMedicineDetailUlId").innerHTML = symptomaticMedicineListHtml;
   					document.getElementById("searchTitle").innerHTML = "<p>"+title+"（<span>"+data.data.total+"</span>）</p>";
   				}else{
   					total = 0;
   					if(symptomaticMedicineListHtml == ""){
   						document.getElementById("symptomaticMeddicineListzwddId").style.display = "";
   					}
   				}
 			},
 			onerror: function(e) {
 				total = 0;
 				document.getElementById("symptomaticMedicineDetailUlId").innerHTML = "";
 				document.getElementById("symptomaticMeddicineListzwddId").style.display = "";
 				document.getElementById("searchTitle").innerHTML = "<p>"+title+"（<span>0</span>）</p>";
 				console.log("e-------->:"+e);
 			}
 		});
	},
	setTs : function(parentId,spanId,type){
		document.getElementById(parentId).setAttribute("class","mui-content nomore");
		if(type == 1){
			document.getElementById(spanId).innerHTML = "没有更多数据了";
		}
		setTimeout(function(){
			document.getElementById(parentId).setAttribute("class","mui-content");
		},1500);
	}
	
};
