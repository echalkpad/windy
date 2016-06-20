
document.addEventListener("keydown",function(key){
	var keyCode = key.keyCode;
	if(keyCode == 13){
		document.getElementById('sea').blur();
		cancerExpertsList.initCancerExpertsList();
	}
});

//进入列表页
mui(".hospitalList").on('tap', 'li', function() {
	var hospitalId = this.querySelectorAll('input')[0].value;
	var ohtml = this.querySelectorAll('input')[1].value;
	var cityPickerName = document.getElementById('showCityPicker').innerText;
	//触发详情页面的newsId事件
	mui.openWindow({
		id: 'cancerExpertsDoctorList',
		url: "cancerExpertsDoctorList.html",
		extras: {
			hospitalId : hospitalId,
			type:"hospitalId",
			diseaseName : ohtml,
			cityPickerName : cityPickerName
		}
	});
})
var areaLists = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
var pageIndex = 1;
var pageSize = 10;
var total = 0;
var html = "";
document.addEventListener('plusready', function() {
	//初始化地区数据
	cancerExpertsList.initCancerExpertsDqInfo();
	
	document.addEventListener( "plusscrollbottom", function(){
		pageIndex ++;
		if(total == pageSize){
			cancerExpertsList.initCancerExpertsDqInfo();
		}else{
			return false;
		}
	});
});
var cancerExpertsList = {
	initCancerExpertsList : function(){
		var areaId = document.getElementById("showCityPickerId").value;
		var keyWords = document.getElementById("sea").value;
		var requestData = 'pageIndex='+pageIndex+'&pageSize='+pageSize+'&areaId='+areaId+'&keyWords='+keyWords;
//		console.log(requestData);
		jyapp.getApi({
 			method: 'Tumour/HospitalList',
   			data:requestData,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
 				var html = "";
 				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
 					document.getElementById("cancerExpertsListwsjId").style.display="none";
 					var dataValue = data.data.list;
					total = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						html += "<li class=\"mui-table-view-cell\">";
						html += "<a class=\"mui-navigate-right\">";
						html += "<input type='hidden' value="+dataValue[i].ID+" />"
						html += "<input type='hidden' value="+dataValue[i].Name+" />"
						html += "<img src="+dataValue[i].Pic+"  onerror=\"this.src='../../img/default/pic_moren.png';this.onerror=null\" />";
						html += "<section>";
						html += "<h3>"+dataValue[i].Name+"</h3>";
						html += "<p>"+dataValue[i].Address+"</p>";
						html += "</section>";
						html += "</a>";
						html += "</li>";
					}
 				}else{
 					document.getElementById("cancerExpertsListwsjId").style.display="";
 				}
				document.getElementById("cancerExpertsyyId").innerHTML = html;
 			},
 			onerror: function(e) {
   				console.log("initCancerExpertsList:"+e);
 			}
 		});
	},
	initCancerExpertsDqInfo : function(){
		jyapp.getApi({
 			method: 'Tumour/AreaLists',
 			timeout : 10000,
 			onsuccess: function(data) {
				var html = "";
				var areas = areaLists.split(",");
				if(data && data.data){
					var areaList = new Array();
					for(var objs in data.data){
						if(data.data[objs].FatherID == 0 && !areaList[data.data[objs].spell]){
							areaList.push(data.data[objs].spell);
						}
					}
					for(var i=0;i<areaList.length;i++){
						html += "<li class=\"mui-table-view-divider mui-indexed-list-group\">"+areaList[i]+"</li>";
						for(var objs in data.data){
							if(data.data[objs].spell == areaList[i] && data.data[objs].FatherID == 0){
								html += "<li class=\"mui-table-view-cell\"><a href=\"\">"+data.data[objs].Name;
								html += "<input type='hidden' value="+data.data[objs].ID+" /></a></li>";
							}
						}
					}
					document.getElementById("showCityPicker").innerHTML = "<span>"+data.data[0].Name+"</span><label class='mui-icon-arrowdown'></label>";
					document.getElementById("showCityPickerId").value = data.data[0].ID;
					//初始化医院列表信息数据
					cancerExpertsList.initCancerExpertsList();
				}
				document.getElementById("areaCancerExpertsListId").innerHTML = html;
 			},
 			onerror: function(e) {
   				console.log("initCancerExpertsList:"+e);
 			}
 		});
	}
}

mui("#areaCancerExpertsListId").on('click', 'li', function() {
	var areaId = this.querySelectorAll('input')[0].value;
	var areaName = this.querySelectorAll('a')[0].innerText;
	document.getElementById("showCityPicker").innerHTML = "<span>"+areaName+"</span><label class='mui-icon-arrowdown'></label>";
	document.getElementById("showCityPickerId").value = areaId;
	mui('.search').popover('toggle');
	var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
	mask.show();//显示遮罩
	mask.close();//关闭遮罩
	//初始化医院列表信息数据
	cancerExpertsList.initCancerExpertsList();
})