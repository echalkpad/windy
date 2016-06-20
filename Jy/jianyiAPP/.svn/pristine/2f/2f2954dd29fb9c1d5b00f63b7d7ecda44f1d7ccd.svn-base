var url = "http://222.73.216.65:5161";
var auth = "Bearer r8njW8UgjODs09D4OyhC5RcGMCA-KbzNnZvaWV06qINEn77t2cTjBJ1eEMlLCnUnm3ULcci9deULrMQuGgF_IVhrPjwMsWoY_zp-N5QmM4kPXlzTdqW8k8nn6K7xvG3fSEG9QpjFZ-1cHWi5SKoZ5BRncztxkEc9U7T1PhzM7puY5Jd84at9pgtgE1BK_GZxVREEZWwlOz0DjedV4wd2enDHJWArsN1lZzwpqz1HxF1FldDf";

document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	var storeID = self.storeID;
	this.healthNetworkDetailIndroduce(storeID);
});


function healthNetworkDetailIndroduce(storeID){
	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch (xhr.readyState) {
			case 4:
				if (xhr.status == 200) {
					var response = eval("(" + xhr.responseText + ")");
					var html = "";
					document.getElementById('healthNetworkDetailIndroduceId').innerHTML = html;
				} else {
//					console.log(xhr.readyState + "--:" + xhr.status + " " + xhr.statusText);
				}
				break;
			default:
				break;
		}
	};
	xhr.open("POST", url + "/store/storeindroduce");
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader("Authorization", auth);
	var requestStoreIndroduce = "storeId="+storeID;
//	console.log("requestStoreIndroduce:"+requestStoreIndroduce);
	xhr.send(requestStoreIndroduce);
}