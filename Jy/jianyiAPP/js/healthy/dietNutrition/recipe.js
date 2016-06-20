
//食疗菜谱
mui(".slider-group").on('tap', 'li', function() {
	var cookBookId = this.querySelectorAll("input")[0].value;
	var cookBookName = this.querySelectorAll("input")[1].value;
	mui.openWindow({
		id: 'dietRecipes',
		url: "dietRecipes.html",
		extras: {
			"cookBookId" : cookBookId,
			"cookBookName" : cookBookName
		}
	});
})
var diseaseId = 0;
var dietNutritions = "";
var recipeContent = '';
var pageIndex = 1;
var pageSize = 10;
var total = 0;
document.addEventListener("plusready",function(){
	var self = plus.webview.currentWebview();
	diseaseId = self.diseaseId?self.diseaseId:0;
	dietNutritions = self.dietNutritions;
	//初始化tab数据
	healthyRecipe.initTapData();
	
	//初始化所有上拉加载。
	document.addEventListener("plusscrollbottom",function(){
		if(total == pageSize){
			healthyRecipe.setTs("recipeDivid","recipespanId",0);
			pageIndex ++;
			healthyRecipe.initTapData();
		}else{
			healthyRecipe.setTs("recipeDivid","recipespanId",1);
		}
	});
});

var healthyRecipe = {
	initTapData : function(){
		var recipeTapHtml = "";
		var disease = dietNutritions.Disease;
		var recipeTitleName = dietNutritions.TpyeName;
		for(var i=0;i<disease.length;i++){
			var className = "mui-control-item";
			if(diseaseId == disease[i].ID){
				className = "mui-control-item mui-active";
			}
			recipeTapHtml += '<a class="'+className+'" >'+disease[i].Name;
			recipeTapHtml += '<input type="hidden" value='+disease[i].ID+' />';
			recipeTapHtml += '</a>';
		}
		document.getElementById("recipeTapId").innerHTML = recipeTapHtml;
		document.getElementById("recipeTitleId").innerHTML = recipeTitleName;
		//初始化食谱套餐
		healthyRecipe.initData();
	},
	initData : function(){
//		console.log('diseaseId ='+diseaseId+"&temp="+Math.random());
		jyapp.getApi({
			method: 'FoodHealth/CookBookList',
			data:"diseaseId="+diseaseId+"&pageIndex="+pageIndex+"&pageSize="+pageSize+"&temp="+Math.random(),
			timeout: 10000,
			showWaiting:true,
			onsuccess:function(reqonse){
//				console.log(JSON.stringify(reqonse));
				if(reqonse.code==1&&reqonse.data!=null&&reqonse.data.length>0){
					document.getElementById("recipezwsj").style.display = "none";
					total = reqonse.data.length;
					for(var i=0;i<reqonse.data.length;i++){
						recipeContent +='<li><a href="">';
						recipeContent +='<img src="'+reqonse.data[i].Pic+'" alt="" />';
						recipeContent +='<h2>'+reqonse.data[i].Name+'</h2>';
						recipeContent +='<p>'+reqonse.data[i].Effect+'</p>';
						recipeContent +='<input type="hidden" value='+reqonse.data[i].ID+' />';
						recipeContent +='<input type="hidden" value='+reqonse.data[i].Name+' />';
						recipeContent +='</a></li>';
					}
					document.getElementById('recipeContentUlId').innerHTML=recipeContent;
				}else{
					if(recipeContent == ''){
						document.getElementById('recipeContentUlId').innerHTML=recipeContent;
						document.getElementById("recipezwsj").style.display = "";
					}
				}
			},
			onerror:function(e){
				document.getElementById('recipeContentUlId').innerHTML="";
				document.getElementById("recipezwsj").style.display = "";
				console.log(e);
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
//绑定top点击事件
mui("#recipeTapId").on("tap","a",function(){
	recipeContent = '';
	var pageIndex = 1;
	var total = 0;
	diseaseId = this.querySelectorAll("input")[0].value;
	//初始化食谱套餐
	healthyRecipe.initData();
});