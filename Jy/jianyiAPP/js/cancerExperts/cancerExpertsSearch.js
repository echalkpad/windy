document.addEventListener('plusready', function(){
	//初始化医生详情信息数据
	cancerExpertsSearch.initcancerExpertsSearch();
	
})

document.addEventListener("keydown",function(key){
	if(key.keyCode == 13){
		document.getElementById('cancerExpertsSearchkeyWordsId').blur();
		cancerExpertsSearch.initcancerExpertsSearch();
	}
})

var cancerExpertsSearch = {
	initcancerExpertsSearch : function(){
		var keyWords = document.getElementById("cancerExpertsSearchkeyWordsId").value;
		var requestData = "keyWords="+keyWords;
		jyapp.getApi({
 			method: 'Tumour/SearchComposite',
 			timeout : 10000,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
// 				console.log(JSON.stringify(data.data.hospitalList));
// 				console.log(JSON.stringify(data.data.doctorList));
 				var cancerExpertsSearchyyIdhtml = "";
 				var cancerExpertsSearchysIdhtml = "";
 				if(data.code != 1){
 					plus.nativeUI.alert(data.msg,'','健医宝','确认');
 					return false;
 				}else{
 					if(data.data != null && data.data.hospitalList != null && data.data.hospitalList.list.length > 0){
 						document.getElementById('cancerExpertsSearchHosID').style.display = 'none';
 						var datayyValue = data.data.hospitalList.list;
 						for(var i=0;i<datayyValue.length;i++){
		 					cancerExpertsSearchyyIdhtml +="<li class=\"mui-table-view-cell\">";
							cancerExpertsSearchyyIdhtml +="<a href=\"#\">";
							cancerExpertsSearchyyIdhtml += "<input type='hidden' value="+datayyValue[i].ID+" />"
							cancerExpertsSearchyyIdhtml += "<input type='hidden' value="+datayyValue[i].Name+" />"
							cancerExpertsSearchyyIdhtml += "<input type='hidden' value="+datayyValue[i].AreaName+" />"
							cancerExpertsSearchyyIdhtml +="<img src="+datayyValue[i].Pic+"  onerror=\"this.src='../../img/default/pic_moren.png';this.onerror=null\" />";
							cancerExpertsSearchyyIdhtml +="<section>";
							cancerExpertsSearchyyIdhtml +="<h3>"+datayyValue[i].Name+"</h3>";
							cancerExpertsSearchyyIdhtml +="<p>"+datayyValue[i].Grade+"&nbsp;特色： "+datayyValue[i].Characteristic+"<span>预约量：<small>"+datayyValue[i].OrderCount +"</small></span></p>";
							cancerExpertsSearchyyIdhtml +="</section>";
							cancerExpertsSearchyyIdhtml +="</a>";
							cancerExpertsSearchyyIdhtml +="</li>";
		 				}
 					}else{
 						document.getElementById('cancerExpertsSearchHosID').style.display = 'block';
 					}
 					if(data.data != null && data.data.doctorList != null && data.data.doctorList.list.length > 0){
 						document.getElementById('cancerExpertsSearchDocID').style.display = 'none';
 						var dataysValue = data.data.doctorList.list;
		 				for(var i=0;i<dataysValue.length;i++){
		 					var Name = dataysValue[i].Name ? dataysValue[i].Name : "--";
		 					var Title = dataysValue[i].Title ? dataysValue[i].Title : "--";
		 					var HospitalName = dataysValue[i].HospitalName ? dataysValue[i].HospitalName : "--";
		 					var departmentName = dataysValue[i].departmentName ? dataysValue[i].departmentName : "--";
		 					cancerExpertsSearchysIdhtml +="<li class=\"mui-table-view-cell\">";
							cancerExpertsSearchysIdhtml +="<a href=\"#\">";
							cancerExpertsSearchysIdhtml += "<input type='hidden' value="+dataysValue[i].ID+" />"
							cancerExpertsSearchysIdhtml +="<img src="+dataysValue[i].Pic+"  onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" />";
							cancerExpertsSearchysIdhtml +="<section>";
							cancerExpertsSearchysIdhtml +="<h3>"+Name+"&nbsp;"+Title+"</h3>";
							cancerExpertsSearchysIdhtml +="<p>"+HospitalName+"&nbsp;"+departmentName+"<span>预约量：<small>"+dataysValue[i].OrderCount+"</small></span></p>";
							cancerExpertsSearchysIdhtml +="<strong>"+dataysValue[i].Price+"<em>元</em></strong>";
							cancerExpertsSearchysIdhtml +="</section>";
							cancerExpertsSearchysIdhtml +="</a>";
							cancerExpertsSearchysIdhtml +="</li>";
		 				}
 					}else{
 						document.getElementById('cancerExpertsSearchDocID').style.display = 'block';
 					}
 				}
 				document.getElementById("cancerExpertsSearchyyId").innerHTML = cancerExpertsSearchyyIdhtml;
 				document.getElementById("cancerExpertsSearchysId").innerHTML = cancerExpertsSearchysIdhtml;
 			},
 			onerror: function(e) {
 				console.log("e-------->:"+e);
 			}
 		});
	}
}