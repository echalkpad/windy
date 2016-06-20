//检测项目
mui("#packageContent").on('tap', 'a', function() {
	var packageId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'testingPlan',
		url: "testingPlan.html",
		extras: {
			"packageId" : packageId
		}
	});
})



var Jynav=document.getElementById("jytc-nav").children;
var JySearch=document.getElementById("jytcSearch");
var ulSearch=JySearch.getElementsByTagName('ul');

var searchIndex = 0;
//筛选
mui.each(ulSearch,function(i,t){
  Jynav[i].index = i;
  Jynav[i].onclick=function(){
  	mui('#jytcSearch').popover('show');
  	searchIndex =this.index;
  	for(var k=0;k<3;k++){
  		ulSearch[k].setAttribute('class','mui-table-view');
  	}
  	ulSearch[searchIndex].setAttribute('class','mui-table-view selector');
  }
})

//滑动
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


var pageIndex = 1;
var pageSize = 10;
var chooseTatol = 0;
var choosePackageHtml = "";
var packageType = 0;
var crowdType = 0;
var sortType = 0;
document.addEventListener("plusready",function(){
	//加载初始化数据
	choosePackage.initData();
	//加载下拉刷新事件
	document.addEventListener( "plusscrollbottom", function(){
		if(chooseTatol == pageSize){
			choosePackage.setTs("choosePackageParentId","choosePackageSpanId",0);
			pageIndex ++;
			choosePackage.initDataList();
		}else{
			choosePackage.setTs("choosePackageParentId","choosePackageSpanId",1);
		}
	});
	//绑定全部类型搜索条件点击事件
	mui("#qblxchoosePackageId").on('tap', 'li', function() {
		var qblx = this.querySelectorAll('input')[0].value;
		var qblxName = this.querySelectorAll('input')[1].value;
		packageType = qblx;
		document.getElementById("search-qblxspanId").innerHTML = qblxName;
		choosePackage.initOnclick();
	})
	//绑定全部人群搜索条件点击事件
	mui("#qbrqchoosePackageId").on('tap', 'li', function() {
		var qbrq = this.querySelectorAll('input')[0].value;
		var qbrqName = this.querySelectorAll('input')[1].value;
		crowdType = qbrq;
		document.getElementById("search-qbrqspanId").innerHTML = qbrqName;
		choosePackage.initOnclick();
	})
	//绑定智能排序搜索条件点击事件
	mui("#znpxchoosePackageId").on('tap', 'li', function() {
		var znpx = this.querySelectorAll('input')[0].value;
		var znpxName = this.querySelectorAll('input')[1].value;
		sortType = znpx;
		document.getElementById("search-znpxspanId").innerHTML = znpxName;
		choosePackage.initOnclick();
	})
	
});

var choosePackage = {
	initOnclick : function(){
		mui('#jytcSearch').popover('hide');
		pageIndex = 1;
		pageSize = 10;
		chooseTatol = 0;
		choosePackageHtml = "";
		choosePackage.initDataList();
	},
	initData : function(){
		//加载全部类型搜索条件数据
		choosePackage.initqbData();
		//加载区别人群搜索条件数据
		choosePackage.initqbrqData();
		//加载列表数据
		choosePackage.initDataList();
		
	},
	initqbData : function(){
		jyapp.getApi({
   			method: 'System/GetDictionaryByType',
   			data:'typeCode=GeneDetecttType',
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var choosePackageqblxHtml = "";
   				choosePackageqblxHtml += "<li class=\"mui-table-view-cell\">全部类型";
				choosePackageqblxHtml += "<input type='hidden' value=\"\" />"; 
				choosePackageqblxHtml += "<input type='hidden' value=\"全部类型\" />"; 
				choosePackageqblxHtml += "</li>";
				if(data.code == 1 && data.data && data.data && data.data.length > 0){
					var dataValue = data.data;
					for(var i=0;i<dataValue.length;i++){
						choosePackageqblxHtml += "<li class=\"mui-table-view-cell\">"+dataValue[i].Name;
						choosePackageqblxHtml += "<input type='hidden' value=\""+dataValue[i].ID+"\" />"; 
						choosePackageqblxHtml += "<input type='hidden' value=\""+dataValue[i].Name+"\" />"; 
						choosePackageqblxHtml += "</li>";
					}
				}
				document.getElementById("qblxchoosePackageId").innerHTML = choosePackageqblxHtml;
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	initqbrqData : function(){
		jyapp.getApi({
   			method: 'System/GetDictionaryByType',
   			data:'typeCode=GeneCrowdType',
   			timeout : 10000,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
   				var choosePackageqbrqHtml = "";
   				choosePackageqbrqHtml += "<li class=\"mui-table-view-cell\">全部人群";
				choosePackageqbrqHtml += "<input type='hidden' value=\"\" />"; 
				choosePackageqbrqHtml += "<input type='hidden' value=\"全部人群\" />"; 
				choosePackageqbrqHtml += "</li>";
				if(data.code == 1 && data.data && data.data && data.data.length > 0){
					var dataValue = data.data;
					for(var i=0;i<dataValue.length;i++){
						choosePackageqbrqHtml += "<li class=\"mui-table-view-cell\">"+dataValue[i].Name;
						choosePackageqbrqHtml += "<input type='hidden' value=\""+dataValue[i].ID+"\" />"; 
						choosePackageqbrqHtml += "<input type='hidden' value=\""+dataValue[i].Name+"\" />"; 
						choosePackageqbrqHtml += "</li>";
					}
				}
				document.getElementById("qbrqchoosePackageId").innerHTML = choosePackageqbrqHtml;
   			},
   			onerror: function(e) {
   				console.log(e);
   			}
   		});
	},
	initDataList : function(){
		var requestData = "packageType="+packageType+"&crowdType="+crowdType+"&sortType="+sortType+"&pageIndex="+pageIndex+"&pageSize="+pageSize;
//		console.log(requestData);
		jyapp.getApi({
   			method: 'GeneDetection/PackageList',
   			data:requestData,
   			timeout : 10000,
   			showWaiting:true,
   			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				if(data.code == 1 && data.data && data.data.PageckageList && data.data.PageckageList.length > 0){
					document.getElementById("choosePackagezwddId").style.display = "none";
					var dataValue = data.data.PageckageList;
					chooseTatol = dataValue.length;
					for(var i=0;i<dataValue.length;i++){
						var pic = dataValue[i].Pic2 ? dataValue[i].Pic2 : "../../../img/default/pic_moren.png";
						var PackageName = dataValue[i].PackageName ? dataValue[i].PackageName : "--";
						var ProductTypeName = dataValue[i].ProductTypeName ? dataValue[i].ProductTypeName : "类型";
						var OriginalPrice = dataValue[i].OriginalPrice ? dataValue[i].OriginalPrice : 0;
						var PresentPrice = dataValue[i].PresentPrice ? dataValue[i].PresentPrice : 0;
						var cType = choosePackage.checkcrowdType(dataValue[i].Crowd);
						choosePackageHtml +="<li class=\"mui-table-view-cell\">";
						choosePackageHtml +="<a href=\"\">";
						choosePackageHtml += "<input type='hidden' value=\""+dataValue[i].ID+"\" />"; 
						choosePackageHtml +="<img src=" + pic + " />";
						choosePackageHtml +="<section>";
						choosePackageHtml +="<h2>"+PackageName+"<span>"+ProductTypeName+"</span></h2>";
						choosePackageHtml +="<em class=\""+cType+"\"></em>";
						choosePackageHtml +="<p>市场价：<del>¥"+OriginalPrice+"</del>健e价：<strong>¥"+PresentPrice+"</strong></p>";
						choosePackageHtml +="</section>";
						choosePackageHtml +="</a>";
					  	choosePackageHtml +="</li>";
					}
				}else{
					chooseTatol = 0;
					if(choosePackageHtml == ""){
						document.getElementById("choosePackagezwddId").style.display = "";
					}
				}
				document.getElementById("choosePackageUlId").innerHTML = choosePackageHtml;
   			},
   			onerror: function(e) {
   				chooseTatol = 0;
   				document.getElementById("choosePackageUlId").innerHTML = choosePackageHtml;
   				document.getElementById("choosePackagezwddId").style.display = "";
   				console.log(e);
   			}
   		});
	},
	checkcrowdType : function(CrowdType){
		var crowdTypeClassName = "other";
		switch(CrowdType){
			case 1 :
				crowdTypeClassName = "child";
				break;
			case 2 :
				crowdTypeClassName = "man";
				break;
			case 3 :
				crowdTypeClassName = "women";
				break;
			case 4 :
				crowdTypeClassName = "mother";
				break;
			case 5 :
				crowdTypeClassName = "oldMan";
				break;
			case 6 :
				crowdTypeClassName = "other";
				break;
			case 7 :
				crowdTypeClassName = "allPeople";
				break;
		}
		return crowdTypeClassName;
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
