/*测试地址*/
var tokenUrl = "http://222.73.216.65:5171/token", //token地址
	apiUrl = "http://222.73.216.65:5161/", //接口地址
	authorization = "Basic YXBwMTIzOjEyMzQ1Ng=="; //客户端授权

/*
 * 1.未登录状态下请求接口使用 客户端模式的token
 * 2.登录状态下请求接口使用 密码模式的token
 * 3.请求接口必须带token 
 */

//获取token 客户端模式（client credentials）
//function getToken() {
//	var xhr = new plus.net.XMLHttpRequest();
//	xhr.onreadystatechange = function() {
//		switch (xhr.readyState) {
//			case 4:
//				if (xhr.status == 200) {
//					console.log(xhr.responseText);
//				} else {
//					console.log("获取数据失败：" + xhr.status);
//				}
//				break;
//			default:
//				break;
//		}
//	}
//	xhr.open("POST", tokenUrl);
//	
//	xhr.setRequestHeader('Authorization', authorization);
//	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//
//	// 发送HTTP请求
//	xhr.send("grant_type=client_credentials");
//}

//获取token 密码模式
function getToken(username, password) {
	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch (xhr.readyState) {
			case 4:
				if (xhr.status == 200) {
					var data = null;
					try {
						data = JSON.parse(xhr.responseText);
						plus.storage.setItem("access_token", data.access_token);
						plus.storage.setItem("refresh_token", data.refresh_token);
						plus.storage.setItem("expires_in", data.expires_in);
					} catch (e) {
						console.log("获取数据失败");
						return;
					}
				} else {
					console.log("获取数据失败：" + xhr.status);
				}
				break;
			default:
				break;
		}
	}
	xhr.open("POST", tokenUrl);
	xhr.setRequestHeader('Authorization', authorization);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	// 发送HTTP请求
	xhr.send("grant_type=password&username=6600005006809488&password=123456&channelid=1&devicetype=3");

}

function getApi() {
	getToken();
	var token = JSON.parse(plus.storage.getItem("token"));

	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch (xhr.readyState) {
			case 4:
				if (xhr.status == 200) {
					console.log(xhr.responseText);
				} else {
					console.log("获取数据失败：" + xhr.status);
				}
				break;
			default:
				break;
		}
	}
	xhr.open("POST", apiUrl + "DoctorOnline/DoctorList");
	xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	// 发送HTTP请求
	xhr.send();

}

function login() {

}