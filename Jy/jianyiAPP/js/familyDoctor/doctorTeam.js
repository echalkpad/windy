var pageIndex = 1;
var pageSize = 10;
var total = 0;
var html = "";
document.addEventListener('plusready', function() {
	doctorTeam.initDoctorTeam();
	//加载下拉刷新事件
	document.addEventListener( "plusscrollbottom", function(){
		pageIndex ++;
		if(total == pageSize){
			doctorTeam.setTs('doctorTeamContent','doctorTeamTips',0);
			doctorTeam.initDoctorTeam();
		}else{
			doctorTeam.setTs('doctorTeamContent','doctorTeamTips',1);
			return false;
		}
	});
});
var doctorTeam = {
	initDoctorTeam :function(){
		jyapp.getApi({
 			method: 'DoctorOnline/DoctorList',
 			data:'pageIndex='+pageIndex+'&pageSize='+pageSize,
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.data!=null && data.data.list!=null && data.data.list.length>0){
					var dataValue = data.data.list;
					total = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var skilled = dataValue[i].Skilled ? dataValue[i].Skilled : "";
						html += "<li class=\"mui-table-view-cell mui-media\">";
						html += "<a href=\"javascript:;\" onclick=\"doctorTeam.onclickdoctorTeamDetails("+dataValue[i].ID+")\">";
						html += "<img class=\"mui-media-object mui-pull-left\" src=\""+dataValue[i].Pic+"\" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\">";
						html += "<div class=\"mui-media-body\">";
						html += "<h2 class=\"mui-ellipsis\">"+dataValue[i].Name+"<span>"+dataValue[i].Title+"</span></h2>";
						html += "<p class=\"mui-ellipsis\">接诊量："+dataValue[i].OrderCount+"</p>";
						html += "<p class=\"mui-ellipsis\">"+dataValue[i].HospitalName+" "+dataValue[i].departmentName+"</p>";
						html += "</div>";
						html += "<p class=\"mui-media-p ellipsis\">擅长："+skilled+"</p>";
						html += "</a>";
						html += "</li>";
					}
	//				console.log(html);
					document.getElementById("doctorTeamId").innerHTML = html;
				}else{
					total=0;
				}
 			},
 			onerror: function(e) {
	   			console.log("initDoctorTeam------>:"+e);
 			}
 		});
	},
	onclickdoctorTeamDetails : function(doctorTeamid){
		mui.openWindow({
			id: 'doctorTeamDetails',
			url: "doctorTeamDetails.html",
			extras : {
				"doctorTeamid" : doctorTeamid
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

}
