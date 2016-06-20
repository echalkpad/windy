//食物库
mui(".diet-top").on('tap', 'a', function() {
	mui.openWindow({
		id: 'foodLib',
		url: "foodLib.html"
	});
})
var dietNutritionLists = {};
var defultid = "";
document.addEventListener("plusready",function(){
	dietNutrition.initType();
});
var dietNutrition = {
	
	initType:function (){
		jyapp.getApi({
			method: 'FoodHealth/Diseases',
			//data:'diseaseId=1',
			timeout: 10000,
			showWaiting:true,
			onsuccess:function(data){
				//console.log(JSON.stringify(data));
				if(data.code==1&&data.data!=null&&data.data.length>0){
					var dietContent = '';
					mui.each(data.data,function(index,disType){
						dietNutritionLists[index] = disType;
						dietContent+='<ul class="mui-table-view"><li class="mui-table-view-cell">';
						dietContent+='<a href="" class="mui-navigate-right"><h3>';
						dietContent +='<img src="'+disType.Icon+'" width=20 height=21 style="vertical-align:middle; onerror=\'this.src="../../../img/healthy/dietNutrition/icon_yangshengbaojian.png";this.onerror=null\' />'+disType.TpyeName;
						dietContent += '<input type="hidden" value='+index+' /><input type="hidden" value='+disType.Disease[0].ID+' />';
						dietContent+='</h3></a></li>';
						dietContent+='<li class="menuList">';
						mui.each(disType.Disease,function(index2,disease){
							dietContent += '<a href="">'+disease.Name;
							dietContent += '<input type="hidden" value='+index+' /><input type="hidden" value='+disease.ID+' />';
							dietContent += '</a>';
						});
						dietContent+='</li></ul>';
					});

					document.getElementById('dietContent').innerHTML=dietContent;
					//绑定大类型点击事件
					mui(".mui-table-view-cell").on('tap', 'a', function() {
						var num = this.querySelectorAll('input')[0].value;
						var diseaseId = this.querySelectorAll("input")[1].value;
						var dietNutritions = dietNutritionLists[num];
//						console.log(diseaseId+"-->"+JSON.stringify(dietNutritions));
						mui.openWindow({
							id: 'recipe',
							url: "recipe.html",
							extras: {
								"diseaseId" : diseaseId,
								"dietNutritions" : dietNutritions
							}
						});
					});
					//绑定子类型点击事件
					mui(".menuList").on('tap', 'a', function() {
						var num = this.querySelectorAll('input')[0].value;
						var diseaseId = this.querySelectorAll("input")[1].value;
						var dietNutritions = dietNutritionLists[num];
						console.log(diseaseId+"-->"+JSON.stringify(dietNutritions));
						mui.openWindow({
							id: 'recipe',
							url: "recipe.html",
							extras: {
								"diseaseId" : diseaseId,
								"dietNutritions" : dietNutritions
							}
						});
					});
				}
			},
			onerror:function(e){
				console.log(e);
			}
		});
	},
	/**
	 * 添加返回函数
	 */
	dietNutritionBack:function(){
		jyapp.backWebView({id:"mainHealthy",index:3});
	}
};

//菜谱
//document.getElementsByClassName("menuList").bind("tap",function(){)




	
//添加返回事件
document.getElementById('dietNutritionBack').addEventListener('click',dietNutrition.dietNutritionBack);

