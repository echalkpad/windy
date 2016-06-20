/**
 * 食疗菜品详情
 */
var cookBookId = 0;
var cookBookName = '';
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	cookBookId = self.cookBookId;
	cookBookName = self.cookBookName;
	document.getElementById('dietRecipesTitle').innerHTML=cookBookName;
	dietRecipes.initdietRecipe();
})

var dietRecipes = {
	
	//加载菜品
	initdietRecipe:function(){
		jyapp.getApi({
			method:'FoodHealth/CookBook',
			data:'cookBookId='+cookBookId,
			timeout:10000,
			showWaiting:true,
			onsuccess:function(data){
				//console.log(JSON.stringify(data));
				if(data.code==1&&data.data.cookBook!=null&&data.data.cookBook.length>0){
					var dish = data.data.cookBook[0];
					var html='';
					html+='<ul class="mui-table-view"><li class="mui-table-view-cell mui-media"><a href="javascript:;">';
					html+='<img class="mui-media-object mui-pull-left" src="'+dish.Pic+'" onerror="this.src=\'../../../img/default/pic_caipu_moren.png\';this.onerror=null;">';
					html+='<div class="mui-media-body">'+dish.Name+'<p>主治疾病：'+dish.MainDiseases[0].Name+'</p></div></a></li></ul>';
					html+='<dl><dt>【食疗功效】</dt><dd><p>'+dish.Effect+'</p></dd>';
					html+='<dt>【材料】</dt><dd>';
					//console.log(JSON.stringify(dish));
					mui.each(dish.Material,function(indexMa,material){
						html+='<p>'+material.FoodName+'<span>'+material.Quantities+'</span></p>';
					});
					html+='</dd>';
					html+='<dt>【做法】</dt><dd><p>'+dish.Practice+'</p></dd></dl>';
					html+='<div class="foodMenu border-t"><h2>食疗菜谱</h2><ul>';
					mui.each(data.data.relationCookBook,function(indexRe,relCB){
						html+='<li><img src="'+relCB.Pic+'" onerror="this.src=\'../../../img/default/pic_caipu_moren.png\';this.onerror=null"/><p>'+relCB.Name+'</p></li>';
					});
					html+='</ul></div>';
					document.getElementById('dietRecipesContent').innerHTML=html;
					document.getElementById("dietRecipesTitle").innerHTML = cookBookName;
				}
				
			},
			onerror:function(e){
				console.log(e);
			}
		});
	}
}
