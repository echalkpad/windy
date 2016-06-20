document.addEventListener('plusready', function() {
	//加载科室列表数据
	chooseClass.initchooseClass();
});

var detailPage = null;
var checkId = 1;
//添加列表项的点击事件
mui('.mui-content').on('tap', 'a', function(e) {
	var ohtml = this.querySelectorAll('span')[0].innerHTML;
	var chooseClassId = this.querySelectorAll('input')[0].value;
	if (!detailPage) {
		detailPage = plus.webview.getWebviewById('callDoctor');
	}

	mui.fire(detailPage, 'newsId', {
		ohtml: ohtml,
		chooseClassId : chooseClassId
	});
	plus.webview.currentWebview().close();		
		
});

var chooseClass = {
	initchooseClass : function(){
//		console.log("initchooseClass");
		jyapp.getApi({
 			method: 'DoctorOnline/DepartmentList',
 			data:'',
 			timeout : 10000,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				var html = "";
				var dataValue = data.data;
				for(var i=0;i<dataValue.length;i++){
					html += "<li class=\"mui-table-view-cell\">";
					html += "<a href=\"\" class=\"mui-navigate-right\">";
					html += "<input type=\"hidden\" value="+dataValue[i].ThirdId +" />";
					html +="<img src="+dataValue[i].Pic+" onerror=\"this.src='../../img/default/icon_keshi.png';this.onerror=null\" /><span>"+dataValue[i].Name+"</span></a>";
					html += "</li>";
				}
				document.getElementById("chooseClassId").innerHTML = html;
 			},
 			onerror: function(e) {
	   			console.log("initchooseClass------>:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	}
};
