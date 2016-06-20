var ul = document.getElementById('orderFinishxingxing');
var orderFinishUl_list = ul.getElementsByTagName('span');
clearAll = function() {
	for (var i = 0; i < orderFinishUl_list.length; i++) {
		orderFinishUl_list[i].className = 'xing';
	}
}

var checkId = 0;
var orderId = "";
var backid = "";
var backurl = "";
document.addEventListener("plusready", function() {
	commomUtil.closeAll(plus.webview.currentWebview().id);
	var self = plus.webview.currentWebview();
	orderId = self.orderId;
	backid = self.backid;
	backurl = self.backurl;
	checkId = 1;
	//初始化页面数据
	orderFinish.initorderFinish(orderId);
});

var orderFinish = {
	initorderFinish : function(orderId){
		if(checkId == 1){
			checkId ++;
			jyapp.getApi({
	   			method: 'DoctorOnline/OrderDetails',
	   			data:'orderId='+orderId,
	   			timeout : 10000,
	   			onsuccess: function(data) {
	   				checkId = 1;
//	   				console.log(JSON.stringify(data));
	   				var code = data.code;
	   				order = data;
	   				if(code == 1){
	   					document.getElementById("orderFinishNameId").innerHTML = data.data.Name;
	   					document.getElementById("orderFinishTimeId").innerHTML = commomUtil.stringToDate(data.data.OrderTime);
	   					document.getElementById("orderFnishwtId").innerHTML = data.data.SickDescription;
	   					var isPicture = data.data.isPicture;
						if(isPicture){
							var picPeopleIdHtml = "";
							var pic1 = data.data.Pic1;
							if(pic1){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic1+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							var pic2 = data.data.Pic2;
							if(pic2){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic2+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							var pic3 = data.data.Pic3;
							if(pic3){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic3+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							var pic4 = data.data.Pic4;
							if(pic4){
								picPeopleIdHtml +="<div class=\"qs-img\"><img src="+pic4+" onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\" /></div>";
							}
							document.getElementById("orderFinishImgId").innerHTML = picPeopleIdHtml
						}
	   					document.getElementById("orderFinishzjId").innerHTML = data.data.DoctorSummary;
	   					var Comment = data.data.Comment ? (data.data.Comment ? data.data.Comment : "") : "";
	   					document.getElementById("familyOrderFinishpjId").innerText = Comment;
	   					clearAll();
	   					for (var i = 0; i < data.data.Score; i++) {
							orderFinishUl_list[i].className = 'xing xing-active';
						}
	   				}
	   			},
	   			onerror: function(e) {
	   				checkId = 1;
	   				console.log("initorderFinish------>:"+e);
//	   				plus.nativeUI.alert(e,'','健医宝','确认');
	   			}
	   		});
	   	}
	},
	orderFinishBackCell : function(){
		var config = {
			id : "consultingRecords",
			url: "../familyDoctor/consultingRecords.html",
			method : "newIdsConsultingRecord",
			extras : {
				backurl: backurl,
				backid : backid,
				index: 2
			}
		}
		jyapp.backWebView(config);
	}
}
//绑定回退事件
document.getElementById("orderFinishBackCellId").addEventListener("tap",orderFinish.orderFinishBackCell);
//mui.back = function(e){
//	orderFinish.orderFinishBackCell();
//}
