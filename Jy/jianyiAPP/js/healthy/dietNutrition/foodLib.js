//食物类
mui('#foodLibUl').on('tap','li',function(){
	var fid = this.querySelectorAll('input')[0].value;
	var typeName = this.querySelectorAll('p')[0].innerHTML;
	mui.openWindow({
		id:'foodLibList',
		url:'foodLibList.html',
		extras:{
			"foodTypeId":fid,
			"foodTypeName":typeName,
			"type":'foodType'
		}
	})
});


mui.plusReady(function(){
	//初始化食物分类
	foodLib.initFoodType();
	
});
//键盘事件
document.addEventListener("keydown",function(key){
	var keyCode = key.keyCode;
	if(keyCode == 13){
		var foodName = document.getElementById('foodSearch').value;
		if(foodName==""){
			mui.alert("请输入食物名称");
		}else{
			mui.openWindow({
				id:'foodLibList',
				url:'foodLibList.html',
				extras:{
					"foodName":foodName,
					"type":'foodName'
				}
				
			})
		}
	}
})

var foodLib = {
	
	/**
	 * 初始化食物类别
	 */
	initFoodType:function(){
		jyapp.getApi({
			method: 'FoodHealth/FoodTypeList',
			timeout: 10000,
			showWaiting:true,
			onsuccess:function(data){
				//console.log(JSON.stringify(data));
					if(data.code==1&&data.data!=null&&data.data.length>0){
						var html='';
						for(var i=0;i<data.data.length;i++){
							var foodType = data.data[i];
							html+='<li><input type="hidden" value="'+foodType.ID+'" /><img src="'+foodType.TpyePic +'" /><p>'+foodType.TpyeName+'</p></li>'
						}
						document.getElementById('foodLibUl').innerHTML=html;
					}
				
			},
			onerror:function(e){
				console.log(e);
			}
			
			
		});
	}
	/**
	 * 搜索食物
	 */
	/*searchFood:function(){
		var foodName = document.getElementById('foodSearch').value;
		if(foodName==""){
			mui.alert("请输入食物名称");
		}else{
			//搜索食物
			jyapp.getApi({
				method: 'FoodHealth/FoodList',
				data:'foodName='+foodName,
				timeout: 10000,
				onsuccess:function(data){
//					console.log(JSON.stringify(data));
					if(data.code==1&&data.data!=null&&data.data.length>0){
						
					}
					
				},
				onerror:function(e){
					console.log(e);
				}
			});
			
		}
	}*/
	
	
	
}


