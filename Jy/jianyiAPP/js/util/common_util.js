var commomUtil = {};
(function($, owner) {
	/**
	 * 关闭除预加载及首页的webView
	 * @param {Object} e
	 */
	owner.closeAllWebview = function(e) {
			var webViewAll = plus.webview.all();
			var mainPage = plus.webview.getLaunchWebview();
			for (var i = 0; i < mainWebViews.length; i++) {
				//			console.log(subpages[mainWebViews[i].id] +"------->"+webViewAll[i].id+"--------->"+mainPage.id);
				if (!subpages[mainWebViews[i].id] && webViewAll[i].id != mainPage.id) {
					plus.webview.close(mainWebViews[i]);
				}
			}
		}
		/**
		 * 截取为正确的时间戳字符串
		 * @param {Object} strTime
		 */
	owner.stringSplit = function(strTime) {
		if (strTime) {
			var endLen = strTime.length - 2;
			var time = strTime.substring(6, endLen);
			return time;
		} else {
			return "";
		}
	};
	/**
	 * 将时间戳字符串转换为时间格式
	 * @param {Object} strTime
	 * @param {Object} hour 传入及只返回时分秒
	 */
	owner.stringToDate = function(strTime, hour) {
		if (strTime) {
			var endLen = strTime.length - 2;
			var time = strTime.substring(6, endLen);
			var dateNow = new Date(parseInt(time));
			time = dateNow.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");

			time = time.substring(0, 10);
			if (hour) {
				hour = dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds();
				return hour;
			}
			return time;
		} else {
			return "";
		}
	};
	owner.stringToDateFormat = function(strTime) {
		if (strTime) {
			var endLen = strTime.length - 2;
			var time = strTime.substring(6, endLen);
			time = new Date(parseInt(time)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").substr(5).split(" ")[0];
			return time;
		} else {
			return "";
		}
	};
	/**
	 * 获取时间格式为yyyy-MM-dd的字符串
	 * @param {Object} days ：传值正数则是时间往后推，负数则是往前推
	 */
	owner.getDateStr = function(days) {
		//days 传值正数则是时间往后推，负数则是往前推
		var dd = new Date();
		dd.setDate(dd.getDate() + days); //获取AddDayCount天后的日期 
		var y = dd.getYear() + 1900;
		var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
		var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
		return y + "-" + m + "-" + d;
	};
	/**
	 * 日期字符串转换成时间戳
	 * @param {Object} dateStr 格式为“yyyy-MM-dd HH:mm:ss”
	 */
	owner.get_unix_time = function(dateStr) {
		dateStr = dateStr;
		var newstr = dateStr.replace(/-/g, '/');
		var date = new Date(newstr);
		var time_str = date.getTime().toString();
		return time_str;
	};
	/**
	 * 计算两个时间之间的差值 （时间的格式都是：yyyy-MM-dd hh24:mi:ss）
	 * @param {Object} sta_str 开始时间
	 * @param {Object} end_str 结束时间
	 * @param {Object} type 0,自动适应;1,天;2,小时;3,分钟
	 */
	owner.getDataFloor = function(sta_str, end_str, type) {
		var days = "";
		//结束时间  
		if (end_str == "") {
			var endDate = new Date();
			end_str = endDate.getTime();
		}
		//开始时间  
		var dates = parseInt(end_str) - parseInt(sta_str);
		var day = parseInt(dates / (1000 * 3600 * 24)); //求出两个时间的时间差，这个是天数  
		if (type == 0) {
			if (day > 0) {
				days = parseInt(Math.floor(day)) + "天";
			} else {
				var leave1 = parseInt(dates % (1000 * 3600 * 24)); //求出两个时间的时间差，这个是小时
				var miut = Math.floor(leave1 / (3600 * 1000));
				if (miut > 0) {
					days = miut + "小时";
				} else {
					var leave2 = parseInt(leave1 % (3600 * 1000)); //计算小时数后剩余的毫秒数
					days = Math.floor(leave2 / (60 * 1000)) + "分钟";
				}
			}
		} else if (type == 1) {
			var day1 = parseInt(dates / (1000 * 3600 * 24)); //求出两个时间的时间差，这个是天数  
			days = parseInt(Math.floor(day1)) + "天";
		} else if (type == 2) {
			var leave1 = parseInt(dates % (1000 * 3600 * 24)); //求出两个时间的时间差，这个是小时
			days = Math.floor(leave1 / (3600 * 1000)) + "小时";
		} else if (type == 3) {
			var leave1 = parseInt(dates % (1000 * 3600 * 24));
			var leave2 = parseInt(leave1 % (3600 * 1000)); //计算小时数后剩余的毫秒数
			days = Math.floor(leave2 / (60 * 1000)) + "分钟";
		}
		return days;
	};
	/**
	 * 关闭除当前页面其他所有页面
	 * @param {Object} webviewId
	 */
	owner.closeAll = function(webviewId) {
		var webview = plus.webview.all();
		for (var i = 0; i < webview.length; i++) {
			var view = webview[i];
			if (view.id != webviewId) {
				plus.webview.close(plus.webview.getWebviewById(view.ID));
			}
		}

	};
	/**
	 * 关闭指定ID的窗口
	 * @param {Object} webviewId
	 */
	owner.closeWebviewById = function(webviewId) {
		var wv = plus.webview.getWebviewById(webviewId);
		if (wv) {
			wv.close();
		}
		return true;
	};

	owner.reloadWebviewById = function(webviewId) {
		var wv = plus.webview.getWebviewById(webviewId);
		if (wv) {
			wv.reload();
		}
		return true;
	};
	/**
	 * 获取字符串实际长度
	 * @param {Object} str
	 */
	owner.GetLength = function(str) {
		///<summary>获得字符串实际长度，中文2，英文1</summary>
		///<param name="str">要获得长度的字符串</param>
		var realLength = 0,
			len = str.length,
			charCode = -1;
		for (var i = 0; i < len; i++) {
			charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128) realLength += 1;
			else realLength += 2;
		}
		return realLength;
	};
	/**
	 * 转换时间戳为时间格式 yyyy-MM-dd HH:mm:ss的字符串
	 * @param {Object} dayStr ：时间戳
	 * @param {Object} format ：1:yyyy-MM-dd,2:yyyy-MM-dd HH:mm:ss
	 */
	owner.formatStringToDate = function(dayStr, format) {
		var dd = new Date(parseInt(dayStr));
		var years = dd.getYear() + 1900;
		var mouths = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
		var days = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
		if (format && format == 2) {
			var hours = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours(); //获取当前几号，不足10补0
			var minutes = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes(); //获取当前几号，不足10补0
			var seconds = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds(); //获取当前几号，不足10补0
			return years + "-" + mouths + "-" + days + " " + hours + ":" + minutes + ":" + seconds;
		} else if (format && format == 3) {
			var hours = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours(); //获取当前几号，不足10补0
			var minutes = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes(); //获取当前几号，不足10补0
			var seconds = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds(); //获取当前几号，不足10补0
			return years + "-" + mouths + "-" + days + " " + hours + ":" + minutes;
		}
		return years + "-" + mouths + "-" + days;
	};
	/**
	 * 去除数组中重复项
	 * @param {Object} arr
	 */
	owner.uniqueArray = function(array) {
//		console.log("去重前" + array);
		array.sort();
		var result = [array[0]];
		for (var i = 1; i < array.length; i++) {
			if (array[i] !== result[result.length - 1]) {
				result.push(array[i]);
			}
		}
//		console.log("去重后" + result);
		return result;
	};
	/**
	 * 获取星期
	 * @param {Object} strDate
	 */
	owner.formatDateToWeek = function(strDate) {
		var resultWeek = "";
		var currentDate = new Date(parseInt(strDate));
		var day = "";
		with(currentDate) {
			day = getDay()
		}
		if (day == 1) {
			resultWeek = "星期一";
		}
		if (day == 2) {
			resultWeek = "星期二";
		}
		if (day == 3) {
			resultWeek = "星期三";
		}
		if (day == 4) {
			resultWeek = "星期四";
		}
		if (day == 5) {
			resultWeek = "星期五";
		}
		if (day == 6) {
			resultWeek = "星期六";
		}
		if (day == 0) {
			resultWeek = "星期日";
		}
		return resultWeek;
	};
	/**
	 * 
	 * 调用方式 oninput="commomUtil.validatePhontKeyUp(local);"
	 * @param {Object} event
	 */
	owner.telInput = function(event) {
		//获取到输入框值
		var inputValue = event.srcElement.value;
		//		console.log("--->:"+inputValue);
		//替换不能输入的字符
		inputValue = inputValue.replace(/[`~!@#$%^&*()+=|\\\][\]\{\}\'\,.;*+<>/?]{1}[`~!@$%^&()+=|\\\][\]\{\}\'\,.;*+<>?]/g, '');
		//拿到需要赋值的输入框id
		var inputId = event.srcElement.attributes.id.value;
		//		console.log(inputId+"--->:"+inputValue);
		//重新设置输入框值
		document.getElementById(inputId).value = inputValue;
	};
	/**
	 * 验证输入框
	 * 调用方式 onkeyup="commomUtil.validateKeyUp(event);"
	 * @param {Object} local
	 * @param {Object} type 1:表示屏蔽特殊输入不包括标点符号，2:屏蔽包括标点符号
	 */
	owner.validateKeyUp = function(local, type) {
		//获取到输入框值
		var inputValuePre = local.value;
		//		console.log("inputValuePre---->:"+inputValuePre);
		//替换不能输入的字符
		var localReplace;
		if (type == 1) {
			localReplace = /[`~@$%^&+=|\\\][\]\{\}\'\<>?]{0,250}/g;
		} else if (type == 2) {
			localReplace = /[`~!@#$%^&*()+=|\\\][\]\{\}\'\,.:;<>/?]{0,250}/g;
		}
		var inputValueAfter = inputValuePre.replace(localReplace, '');
		//		console.log(inputValueAfter);
		//		inputValue = inputValue.replace(/[`~!@#$%^&*()+=|\\\][\]\{\}\'\,.<>/?]{1}[`~!@$%^&()+=|\\\][\]\{\}\'\,.<>?]{0,250}/g,'');
		//重新设置输入框值
		local.value = inputValueAfter;
	};
	/**
	 * 根据当前时间获取到当前一周的时间列表
	 */
	owner.getWeekDate = function(){
		var dts = [];
		var dt = new Date();
		var onetime = "";
		var day = dt.getDay();
		for(var i=0;i<7;i++){
			if((i+1) < day){
				var d = day - (i+1);
				dts[i] = owner.jsWeekDate(dt,d,"del");;
			}else{
				var d = (i+1) - day;
				dts[i] = owner.jsWeekDate(dt,d,"add");
			}
		}
		return dts;
	};
	owner.jsWeekDate = function(dt,day,type){
		var times = 24*60*60*1000*day;
		var newdt = type == "del" ? new Date(parseInt(dt.getTime() - times)) : new Date(parseInt(dt.getTime() + times));
		var time = (newdt.getMonth()+1)+"-"+newdt.getDate();
		return time;
	};
	/**
	 * 备注内容只能由中文 数字 字母 下划线英文标点符号组成
	 * @param {Object} text 需要校验的内容
	 */
	owner.validateCommon = function(text) {
		var fls = false;
		if(text){
			if(text && /^[\w\u4E00-\u9FA5\uF900-\uFA2D\,\.\;\:\"\?\!\。\，\~]*$/.test(text)){
				fls = true;
			}
		}else{
			fls = true;
		}
		return fls;
	};
}(mui, commomUtil));