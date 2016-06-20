document.addEventListener('plusready', function() {
	popularServices.initPopularServicesList();
});

var popularServices = {
	initPopularServicesList : function(){
		var _pdiv = document.getElementById('applicationListAllDivID');
		jyapp.getApi({
			method: 'CustomeApplication/ApplicationListAll',
			timeout: 10000,
			showWaiting:true,
			onsuccess: function(response) {
//				console.log("initPopularServicesList---->:"+JSON.stringify(response));
				var htmlApplicationListAll = '';
				if(response.code != 1){
					
				}else{
					if(response.data && response.data.length > 0){
						var dataValues = response.data;
						for(var i = 0; i < dataValues.length; i++){
							htmlApplicationListAll += '<div class="title f13">'+dataValues[i].TpyeName+'</div>';
							htmlApplicationListAll += '<ul class="mui-table-view border-b" >';
							var appList = dataValues[i].appList;
							if(appList && appList.length > 0){
								for(s = 0; s < appList.length; s++){
									htmlApplicationListAll += '<li class="mui-table-view-cell mui-media">';
									htmlApplicationListAll += '	<a href="javascript:;">';
									htmlApplicationListAll += '		<img class="mui-media-object mui-pull-left" src="'+appList[s].Icon+'">';
									htmlApplicationListAll += '		<div class="mui-media-body f16">'+appList[s].Name;
									var buttonID = "appButtonID"+i+s;
									if(appList[s].isOpen == 1){
										htmlApplicationListAll += '			<button href="" class="popularServices-cancel" item="'+appList[s].ID+'" id="'+buttonID+'" >取消</button>';
									}else{
										htmlApplicationListAll += '			<button href="" item="'+appList[s].ID+'" id="'+buttonID+'">添加</button>';
									}
									htmlApplicationListAll += '		</div>';
									htmlApplicationListAll += '	</a>';
									htmlApplicationListAll += '</li>';
								}
							}
							htmlApplicationListAll += '</ul>';
						}
						_pdiv.innerHTML = htmlApplicationListAll;
						//初始化button点击事件
						popularServices.initButtonClickEvent(dataValues);
					}else{
						//显示暂无数据
					}
				}
			},
			onerror: function(e) {
				console.log("initPopularServicesList:" + e);
			}
		});
	},
	initButtonClickEvent : function(dataValues){
		for(var i = 0; i < dataValues.length; i++){
			var appList = dataValues[i].appList;
			for(s = 0; s < appList.length; s++){
				//绑定button的点击事件
				document.getElementById('appButtonID'+i+s).addEventListener('click',popularServices.bindOperatorPopularService);
			}
		}
	},
	bindOperatorPopularService : function(){
		var buttonObj = this;
		var _class = buttonObj.getAttribute('class');
		var _item = buttonObj.getAttribute('item');
		var method = "";
		var requestData = "appId="+_item;
//		console.log("_class:"+_class+"  _item:"+_item);
		if(!_class || _class == ""){
			method = "CustomeApplication/AddApplication";
		}else{
			method = "CustomeApplication/RemoveApplication";
		}
		jyapp.getApi({
			method: method,
			data:requestData,
			timeout: 10000,
			showWaiting:true,
			onsuccess: function(response) {
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return false;
				}else{
					if(!_class || _class == ""){
						buttonObj.innerText = "取消";
						buttonObj.setAttribute('class','popularServices-cancel');
					}else{
						buttonObj.innerText = "添加";
						buttonObj.setAttribute('class','');
					}
				}
			},
			onerror: function(e) {
				console.log("bindOperatorPopularService:" + e);
			}
		});
	},
	rebackMainIndexPage : function(){
		var config = {
			id : "mainIndex",
			method : "rebackRefresh",
			index : 0
		}
		jyapp.backWebView(config);
	}
}
//绑定返回首页按钮
document.getElementById('backIndexAID').addEventListener('click',popularServices.rebackMainIndexPage);