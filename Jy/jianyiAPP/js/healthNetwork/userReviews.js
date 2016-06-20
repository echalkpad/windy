var pageIndex = 1;
var pageSize = 10;
var total = 0;
var storeID = "";
var _cul = document.getElementById('userReviewsULId');
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	storeID = self.storeID;
	/*指定门店的评论*/
	userReviews.initStoreComment(storeID, 1, 10);
	//加载下拉刷新事件
	document.addEventListener("plusscrollbottom", function() {
		if (total == pageSize) {
			pageIndex++;
			/*指定门店的评论*/
			userReviews.initStoreComment(storeID, pageIndex, pageSize)
		} else {
			return false;
		}
	});
});

var userReviews = {
	initStoreComment : function(storeID, pageIndex, pageSize){
		var requestComment = "storeId=" + storeID + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
		jyapp.getApi({
			method: 'store/getstorecomment',
			data: requestComment,
			timeout: 10000,
			showWaiting : true,
			onsuccess: function(response) {
//				response = {"code":1,"msg":"成功","data":{"lists":[{"cardNo":"测试账号","createTime":"0000001111111111111111","content":"00000","cScore":"4"}],"totalCount":0}};
//				console.log("initStoreComment---->:"+JSON.stringify(response));
				if(response.code != 1){
					_cul.innerHTML = '';
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					document.getElementById('userReviewsZanwuID').style.display = "block";
					return false;
				}else{
					if(response.data != null && response.data.lists != null && response.data.lists.length > 0){
						document.getElementById('userReviewsZanwuID').style.display = "none";
						total = response.data.lists.length;
						for (var i = 0; i < response.data.lists.length; i++) {
							var dataValue = response.data.lists[i];
							var _cli = document.createElement('li');
							_cli.setAttribute('class','mui-table-view-cell');
							_cul.appendChild(_cli);
							var _ca = document.createElement('a');
							_cli.appendChild(_ca);
							var _ch3 = document.createElement('h3');
							_ca.appendChild(_ch3);
							var _ch3span = document.createElement('span');
							_ch3span.innerText = (dataValue.cardNo).substring(0,1)+"**";
							var _ch3time = document.createElement('time');
							var endLen = dataValue.createTime.length - 2;
							var time = dataValue.createTime.substring(6, endLen);
							time = new Date(parseInt(time)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
							time = time.substring(0, 10);
							_ch3time.innerText = time;
							_ch3.appendChild(_ch3span);
							_ch3.appendChild(_ch3time);
							var _capspan = document.createElement('p');
							_ca.appendChild(_capspan);
							for(var s = 0; s < 5; s++){
								var _cpspan = document.createElement('span');
								if(s > [5 - parseInt(dataValue.cScore)] || s == [5 - parseInt(dataValue.cScore)]){
									_cpspan.setAttribute('class','xing xing-active');
								}else{
									_cpspan.setAttribute('class','xing');
								}
								_capspan.appendChild(_cpspan);
							}
							var _capc = document.createElement('p');
							_capc.innerText = unescape((dataValue.content ? dataValue.content : "").replace(/\\/g, "%"));
							_ca.appendChild(_capc);
						}
					}else{
						_cul.innerHTML = '';
						document.getElementById('userReviewsZanwuID').style.display = "block";
						return false;
					}
				}
			},
			onerror: function(e) {
				_cul.innerHTML = '';
				document.getElementById('userReviewsZanwuID').style.display = "block";
				console.log("GetStoreComment:" + e);
			}
		});
	}
}
