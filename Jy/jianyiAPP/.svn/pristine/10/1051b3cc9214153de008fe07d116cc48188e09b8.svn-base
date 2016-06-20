var titleName = "";
var hospitalId = "";
var diseaseId = "";
var areaId = "";
var areaType = "";
var agreeTimeType = 2;
var agreeTime = "";
var sortType = "";
var searchKey = "";
var pageIndex = 1;
var pageSize = 10;
var diseaseId = "";
var total = 0;
var doctorListHtml = '';
var type = "";
var areaName = '';
var requestDoctors = '';
document.addEventListener('plusready', function() {
//	commomUtil.closeWebviewById('SlowExpertsDetails');
	var self = plus.webview.currentWebview();
	diseaseId = self.requestDisease;
	hospitalId = self.hospitalId;
	//显示标题
	titleName = self.titleName;
	if (!diseaseId || diseaseId == "" || typeof(diseaseId) == "undefined") {
		diseaseId = "";
	}else{
		areaType = "0";
	}
	if (!hospitalId || hospitalId == "" || typeof(hospitalId) == "undefined") {
		hospitalId = "";
	} else {
		type = "yy";
	}
	if (!titleName || titleName == "" || typeof(titleName) == "undefined") {
		titleName = "医生列表";
	}
	//显示地区
	areaName = self.areaName;
	if (!areaName || areaName == "" || typeof(areaName) == "undefined") {
		document.getElementById('search-qg-disabled').innerHTML = '全国<img src="../../img/common/btn_down.png" alt="" width="15px"/>';
	}
	document.getElementById('search-qg-disabled').innerHTML = areaName+'<img src="../../img/common/btn_down.png" alt="" width="15px"/>';
	requestDoctors = "hospitalId=" + hospitalId + "&diseaseId=" + diseaseId + "&areaId=&areaType=" + areaType + "&agreeTimeType=2&agreeTime='" + commomUtil.getDateStr(30) + "'&sortType=0&searchKey=&pageIndex=" + pageIndex + "&pageSize=" + pageSize;;
	slowExpertsDoctorList.querySlowExpertsDoctorList(requestDoctors);
	//加载下拉刷新事件
	document.addEventListener("plusscrollbottom", function() {
		if (total == pageSize) {
			pageIndex++;
			requestDoctors = "hospitalId=" + hospitalId + "&diseaseId=" + diseaseId + "&areaId=&areaType=" + areaType + "&agreeTimeType=2&agreeTime='" + commomUtil.getDateStr(30) + "'&sortType=0&searchKey=&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
			slowExpertsDoctorList.querySlowExpertsDoctorList(requestDoctors);
		} else {
			return false;
		}
	});
	if(!plus.webview.getWebviewById('SlowExpertsDetails')){
		//初始化预加载详情页面
		mui.preload({
			url: 'SlowExpertsDetails.html',
			id: 'SlowExpertsDetails'
		});
	}
});

var slowExpertsDoctorList = {
	querySlowExpertsDoctorList: function(requestDoctors) {
		//初始化页面抬头Title
		document.getElementById("titleNameHID").innerHTML = titleName;
		var requestSlowExpertsDoctor = '';
		requestSlowExpertsDoctor = requestDoctors;
//		console.log("requestSlowExpertsDoctor---->:"+requestSlowExpertsDoctor);
		jyapp.getApi({
			method: 'Treat/Doctors',
			data: requestSlowExpertsDoctor,
			timeout: 10000,
	   		showWaiting : true,
			onsuccess: function(response) {
				document.getElementById("slowExpertsDoctorListZanwuID").style.display = 'none';
//				console.log("querySlowExpertsDoctorList---->:"+JSON.stringify(response));
				if(response.code != 1){
					plus.nativeUI.alert(response.msg,'','健医宝','确认');
					return;
				}else{
					var dataValue = response.data;
					if (dataValue != null) {
						document.getElementById("slowExpertsDoctorListID").innerHTML = "";
						document.getElementById("slowExpertsDoctorListZanwuID").style.display = 'none';
//						doctorListHtml = '';
						total = dataValue.length;
						for (var i = 0; i < dataValue.length; i++) {
							var name = dataValue[i].name ? dataValue[i].name : "--";
							var title = dataValue[i].title ? dataValue[i].title : "--";
							var hospitaltName = dataValue[i].hospitaltName ? dataValue[i].hospitaltName : "--";
							var departmentName = dataValue[i].departmentName ? dataValue[i].departmentName : "--";
							var appointmentNumber = dataValue[i].appointmentNumber ? dataValue[i].appointmentNumber : "0";
							var price = dataValue[i].price ? dataValue[i].price : "0";
							doctorListHtml += "<li class=\"mui-table-view-cell\">";
							doctorListHtml += "	<a href=\"\">";
							doctorListHtml += "	<input type=\"hidden\" value=" + dataValue[i].id + " />";
							doctorListHtml += "		<img src=" + dataValue[i].logoUrl + " onerror=\"this.src='../../img/default/yisheng_touxiang.png';this.onerror=null\"/>";
							doctorListHtml += "		<section>";
							doctorListHtml += "			<h3>" + name + "&nbsp;" + title + "</h3>";
							doctorListHtml += "			<p>" + hospitaltName + "&nbsp;" + departmentName + "<span>预约量：<small>" + appointmentNumber + "</small></span></p>";
							doctorListHtml += "			<strong>" + price + "<em>元</em></strong>";
							doctorListHtml += "		</section>";
							doctorListHtml += "	</a>";
							doctorListHtml += "</li>";
						}
						document.getElementById("slowExpertsDoctorListID").innerHTML = doctorListHtml;
					}else{
						document.getElementById("slowExpertsDoctorListID").innerHTML = "";
						document.getElementById("slowExpertsDoctorListZanwuID").style.display = 'block';
						return false;
					}
				}
			},
			onerror: function(e) {
				document.getElementById("slowExpertsDoctorListID").innerHTML = "";
				document.getElementById("slowExpertsDoctorListZanwuID").style.display = 'none';
				console.log("querySlowExpertsDoctorList:" + e);
			}
		});
	},
	doctorListScreen: function() {
		areaId = document.getElementById("doctorListDistrictValueID").value;
		if (!areaId || typeof(areaId) == "undefined" || areaId == "" || areaId == 0) {
			areaId = ""; 
		} else {
			areaType = 2;
		}
		agreeTime = document.getElementById("doctorListTimeValueID").value;
		if (!agreeTime || typeof(agreeTime) == "undefined" || agreeTime == "") {
			agreeTime = "&agreeTime='" + commomUtil.getDateStr(30) + "'";
			
		} else {
			agreeTime = "&agreeTime="+agreeTime;
			agreeTimeType = 1;
		}
		sortType = document.getElementById("doctorListFilterValueID").value;
		if (!sortType || typeof(sortType) == "undefined" || sortType == "") {
			sortType = 0;
		}
		var requestDoctorsScreen = "hospitalId=" + hospitalId + "&diseaseId=" + diseaseId + "&areaId=" + areaId + "&areaType=" + areaType + "&agreeTimeType=" + agreeTimeType + agreeTime + "&sortType=" + sortType + "&searchKey=&pageIndex=1&pageSize=10";
		slowExpertsDoctorList.querySlowExpertsDoctorList(requestDoctorsScreen);
	}
}

var detailPageDoctorList = null;
//添加列表项的点击事件
mui('#slowExpertsDoctorListID').on('tap', 'li', function(e) {
	var slowExpertsId = this.querySelectorAll('input')[0].value;
	//获得详情页面
	if (!detailPageDoctorList) {
		detailPageDoctorList = plus.webview.getWebviewById('SlowExpertsDetails');
	}
	//触发详情页面的newsId事件
	mui.fire(detailPageDoctorList, 'loadSlowExpertsListDoctorList', {
		slowExpertsIdDoctorList: slowExpertsId
	});
	//打开详情页面          
	mui.openWindow({
		id: 'SlowExpertsDetails',
		url: "SlowExpertsDetails.html"
	});
});

//搜索条件
var search_type;
var search_text;
var osearch = document.getElementById("householdDevices").querySelector('.search-ul');
var search_qg = document.getElementById("search-qg");
var search_szn = document.getElementById("search-szn");
var search_mrpx = document.getElementById("search-mrpx");
mui('.jkwd-nav').on('tap', 'a', function() {
	search_type = this;
	if (type != "yy") {
		if (this.className == 'search-qg') {
			search_qg.style.display = 'block';
			search_szn.style.display = 'none';
			search_mrpx.style.display = 'none';
		}
		if (this.className == 'search-szn') {
			search_qg.style.display = 'none';
			search_szn.style.display = 'block';
			search_mrpx.style.display = 'none';
		}
		if (this.className == 'search-mrpx') {
			search_qg.style.display = 'none';
			search_szn.style.display = 'none';
			search_mrpx.style.display = 'block';
		}
		mui('#householdDevices').popover('show');
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	} else {
		if (this.className == 'search-qg') {
			search_qg.style.display = 'none';
			search_szn.style.display = 'none';
			search_mrpx.style.display = 'none';
		}else{
			if (this.className == 'search-szn') {
				search_qg.style.display = 'none';
				search_szn.style.display = 'block';
				search_mrpx.style.display = 'none';
			}
			if (this.className == 'search-mrpx') {
				search_qg.style.display = 'none';
				search_szn.style.display = 'none';
				search_mrpx.style.display = 'block';
			}
			mui('#householdDevices').popover('show');
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		}
	}
})

mui('.search-ul').on('tap','.search-mrpx-text',function(){
	mui('#householdDevices').popover('hide');
})

mui('#householdDevices').on('tap', '.search-ul li', function() {
	var oimg = '	<img src="../../img/common/btn_down.png" alt="" width="15px"/>';
	search_type.innerHTML = this.innerText + oimg;
});

//下面是日历控件
mui.plusReady(function() {
	(function($) {
		$.hasClass = function(obj, cls) {
			return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		}

		$.addClass = function(obj, cls) {
			if (!$.hasClass(obj, cls)) obj.className += " " + cls;
		}

		$.removeClass = function(obj, cls) {
			if ($.hasClass(obj, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				obj.className = obj.className.replace(reg, ' ');
			}
		}

		$.DateUtil = {};
		$.DateUtil.addDate = function(date, inc) {
			var d = new Date(date);
			d.setTime(date.getTime() + inc * 24 * 3600 * 1000);
			return d;
		}
		$.DateUtil.getDateDiff = function(base, target) {
			return (target.getTime() - base.getTime()) / (24 * 3600 * 1000);
		}
		$.DateUtil.getToday = function() {
			var d = new Date();
			d.setHours(0, 0, 0, 0);
			return d;
		}

		//	}(mui));
		//
		//	//日历控件
		//	(function($) {

		var MonthView = (function($) {
			var MonthViewTemplate = '' +
				'<div class="mc-toolbar">' +
				'<button class="mui-btn" id="mc-btn-previous" type="button"></button>' +
				'<button class="mui-btn" id="mc-btn-today" type="button">今</button>' +
				'<button class="mui-btn" id="mc-btn-next" type="button"></button>' +
				'<p><span id="mc-date-label" class="mui-action-back">date</span></p>' +
				'</div>' +
				'<div><table class="mc-table">' +
				'<tr class="mc-table-head mc-table-row">' +
				'<th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th>' +
				'</tr>' +
				'</table></div>' +
				'<div>' +
				'<table id = "mc-table-body" class="mc-table"></table>' +
				'</div>';

			var CellViewTemplate = '<td class="mc-table-cell"><a>1</a></td>';
			var cell_selected;
			var date_selected;
			var firstDateinMonthView;

			var renderSkelekon = function(container) {
				var div = document.createElement("div");
				div.className = "mc-container"
				div.innerHTML = MonthViewTemplate;
				container.appendChild(div);

				var html = "";
				for (var i = 0; i < options.row_len; i++) {
					html += '<tr class="mc-table-row">';
					for (var j = 0; j < 7; j++) {
						html += CellViewTemplate;
					}
					html += '</tr>';
				}
				$("#mc-table-body")[0].innerHTML = html;

				var i = 0;
				$(".mc-table-cell").each(function() {
					this.setAttribute("mc-cell-familyDoctor", i++);
				});
			};
			var changeMonth = function(date, type) {
				var firstDate = getFirstDateInMonth(date);
				firstDateinMonthView = firstDate;
				var i = 1;
				var todaydate = parseInt(new Date().getMonth() + 1);
				var odate = parseInt(document.getElementById("mc-date-label").innerHTML.slice(5, 6));
				type == 'next' ? odate = parseInt(odate + 1) : odate = parseInt(odate - 1);
				$(".mc-table-cell").each(function() {
					var d = $.DateUtil.addDate(firstDate, i++);
					this.firstChild.innerHTML = "" + d.getDate();
					if (d.getTime() < date.getTime()) {
						if (isNaN(odate) || todaydate == odate) {
							this.setAttribute("disabled", "disabled");
						} else {
							this.removeAttribute("disabled");
						}

					} else {
						this.removeAttribute("disabled");
					}
					
//					当前月的日期显示
					if (d.getMonth() != date.getMonth()) {

						this.style.visibility = "hidden";
					} else {
						this.style.visibility = "inherit";
					}
					
					
					if (d.getTime() == date.getTime()) {
						$.addClass(this, "mc-cell-selected");
						cell_selected = this;
						date_selected = d;
					}

					if (d.getTime() == $.DateUtil.getToday().getTime()) {
						$.addClass(this, "mc-table-cell-today")
					} else {
						$.removeClass(this, "mc-table-cell-today")
					}
				});

			};
			var changeDate = function(date, type) {

				date && date.setHours(0, 0, 0, 0);
				if (cell_selected) {
					if (date_selected.getFullYear() == date.getFullYear() && date_selected.getMonth() == date.getMonth()) {
						var index = 1 * cell_selected.getAttribute("mc-cell-familyDoctor") + $.DateUtil.getDateDiff(date_selected, date);
						cell_selected = $(".mc-table-cell")[index];
						$.addClass(cell_selected, "mc-cell-selected");
						date_selected = date;
					} else {
						changeMonth(date, type);
					}
				} else {
					changeMonth(date, type);
				}

				$("#mc-date-label")[0].innerHTML = date_selected.getFullYear() + '年' + (date_selected.getMonth() + 1) + '月';
				clearDay();
				setDatenow();
			}
			var setDatenow = function() {
				//				if (sessionStorage.getItem('objdata') == undefined) return;
				//				var oyearT = JSON.parse(sessionStorage.getItem('objdata')).year;
				//				var omonthT = JSON.parse(sessionStorage.getItem('objdata')).month;
				//				var odayT = JSON.parse(sessionStorage.getItem('objdata')).day;
				//
				//				var odiv = mui(".mc-table-cell");
				//				var oyear = parseInt(document.getElementById("mc-date-label").innerHTML.slice(0, 4));
				//				var omonth = parseInt(document.getElementById("mc-date-label").innerHTML.slice(5, 6));
				//				for (var i = 0, len = odiv.length; i < len; i++) {
				//					odiv[i].setAttribute('class', 'mc-table-cell mc-cell-selected');
				//				}

			}

			function getFirstDateInMonth(date) {
				var d = new Date(date);
				d.setDate(1);

				var fd = $.DateUtil.addDate(d, (0 - d.getDay()));

				return fd;
			}
			var type = 'next';
			return {
				date_selected: function() {
					return date_selected
				},
				init: function(o, c) {
					options = o
					renderSkelekon(o.container);

					this.changeDate(o.date || $.DateUtil.getToday());

					//					$("#mc-table-body").on('tap', '.mc-table-cell', function() {
					//						var idx = this.getAttribute("mc-cell-familyDoctor");
					//
					//						changeDate($.DateUtil.addDate(firstDateinMonthView, idx))
					//
					//					});

					var swipeMonth = function(direction, type) {
							//							clearDay();
							var d = new Date(date_selected);
							var m = d.getMonth() + direction;
							if (m == 12) {
								d.setMonth(0);
								d.setFullYear(d.getFullYear() + 1);
							} else if (m == -1) {
								d.setMonth(11);
								d.setFullYear(d.getFullYear() - 1);
							} else {
								d.setMonth(m);
							}
							changeDate(d, type);

						}
						//					var type;
						//					var todaydate = parseInt(new Date().getMonth() + 1);
					$('.mc-toolbar').on('click', '#mc-btn-previous', function() {
						//						var odate = parseInt(document.getElementById("mc-date-label").innerHTML.slice(5, 6));
						//						odate--;
						//						if (odate < todaydate) {
						//							return
						//						}
						type = 'prev';

						swipeMonth(-1, type);
						setDisabled(type);
					});
					$('.mc-toolbar').on('click', '#mc-btn-next', function() {
						type = 'next';
						swipeMonth(1, type);
						setDisabled(type);
					});
				},

				changeDate: changeDate,
			}
		}($));

		$.fn.MCalendar = function(option) {
			var options = {
				container: this[0],
				row_len: 5,
				date: undefined,
			}

			$.extend(options, option || {});
			options.date && options.date.setHours(0, 0, 0, 0);

			var mc = {
				options: {},
				getDate: function() {
					return MonthView.date_selected();
				},
				init: function() {
					var el;
					this.options = options;
					MonthView.init(options);

				},

				show: function() {
					options.container.style.display = "initial";

				},
				hide: function() {
					options.container.style.display = 'none';
				},

				changeDate: function(date) {
					MonthView.changeDate(date)
				},
				getOneDate: function(date) {
					MonthView.changeOneDate(date)
				},

			};

			mc.init(clearDay());
			return mc;
		};

		var yesterday = mui.DateUtil.addDate(mui.DateUtil.getToday(), null);

		var MC = mui("#container").MCalendar({
			date: yesterday
		});

		mui("#btn-confirm").each(function() {
			this.addEventListener('click', function() {
				doctorListHtml = '';
				document.getElementById("slowExpertsDoctorListID").innerHTML = doctorListHtml;
				var newDateArr = [];
				var newDate = document.getElementById("mc-date-label").innerText;
				var selected = document.querySelectorAll(".mc-cell-selected");
				var a = document.querySelectorAll(".mc-cell-selected a");
				if (a.length == 0) {
//					mui.toast('您没有选择日期，请您选择日期！');
					mui('#householdDevices').popover('hide');
					slowExpertsDoctorList.querySlowExpertsDoctorList(requestDoctors);
					return false;
				}
				if (a.length > 7) {
					mui.toast('最多选择7天，请您重新选择！');
					mui('#householdDevices').popover('hide');
					clearDay();
					return false;
				}
				var agreeTimes = "";
				var lastFlag = true;
				for (var i = 0, len = a.length; i < len; i++) {

					var oyearT = JSON.parse(sessionStorage.getItem('objdata')).year;
					var omonthT = JSON.parse(sessionStorage.getItem('objdata')).month;
					var odayT = JSON.parse(sessionStorage.getItem('objdata')).day;
					for (var i = 0, len = oyearT.length; i < len; i++) {
						omonthT[i] = (omonthT[i]) < 10 ? "0" + (omonthT[i]) : (omonthT[i]);
						odayT[i] = (odayT[i]) < 10 ? "0" + (odayT[i]) : (odayT[i]);
						//选择日期
						if (i != (len - 1)) {
							agreeTimes += oyearT[i] + '-' + omonthT[i] + '-' + odayT[i] + ",";
						} else {
							agreeTimes += oyearT[i] + '-' + omonthT[i] + '-' + odayT[i];
						}
					}
				}
				document.getElementById("doctorListTimeValueID").value = agreeTimes;
				//筛选调用
				slowExpertsDoctorList.doctorListScreen();
				mui('#householdDevices').popover('hide');
			})
		});
		mui("#btn-today").each(function() {
			this.addEventListener('tap', function() {
				mui('#householdDevices').popover('hide');
			})
		});
	}(mui));
	var fleng = 0;
	var a = document.querySelectorAll(".mc-table-cell");
	for (var i = 0; i < a.length; i++) {
		if (!(a[i].getAttribute('disabled'))) {
			fleng++;
		}
	}
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	function clearDay() {
		var oselecte = document.querySelectorAll(".mc-cell-selected");
		for (var i = 0, len = oselecte.length; i < len; i++) {
			oselecte[i].setAttribute('class', 'mc-table-cell');
		}
	}
	var yearT = [];
	var monthT = [];
	var dayT = [];
	mui('.mc-table-row').on('click', '.mc-table-cell', function() {
		if (this.getAttribute('disabled')) {
			return
		}
		//		if(this.hasClass() == 'mc-cell-selected'){
		//			alert(1)
		//		}
		var oyear = parseInt(document.getElementById("mc-date-label").innerHTML.slice(0, 4));
		var omouth = parseInt(document.getElementById("mc-date-label").innerHTML.slice(5, 6));
		var day = this.querySelector('a').innerText;
		if (this.classList.contains("mc-cell-selected")) {
			this.setAttribute('class', 'mc-table-cell');
			yearT.remove(oyear);
			monthT.remove(omouth);
			dayT.remove(day);
		} else {
			yearT.push(oyear);
			monthT.push(omouth);
			dayT.push(day);
			this.setAttribute('class', 'mc-table-cell mc-cell-selected');
		}
		var objdata = {
			'year': yearT,
			'month': monthT,
			'day': dayT
		}
		sessionStorage.setItem('objdata', JSON.stringify(objdata));

	});

	function gettartime() {
		var now = new Date();
		var nowYear = now.getFullYear();
		var nowMonth = now.getMonth();
		var nowDate = now.getDate();

		var oyear = parseInt(document.getElementById("mc-date-label").innerHTML.slice(0, 4));
		var omouth = parseInt(document.getElementById("mc-date-label").innerHTML.slice(5, 6));

		if (oyear == nowYear) {
			if (nowMonth + 2 == omouth) {
				return true
			}
		} else if (oyear + 1 == nowYear && nowMonth == 1) {
			return true
		} else {
			return
		}
	}

	function setDisabled(type) {
		var odiv = document.querySelectorAll(".mc-table-cell");
		var todaydate = parseInt(new Date().getMonth() + 1);
		var odate = parseInt(document.getElementById("mc-date-label").innerHTML.slice(5, 6));

		if (odate == todaydate) {
			return
		}
		for (var i = 0, len = odiv.length; i < len; i++) {
			if (!!odiv[i].getAttribute('disabled')) {
				return
			}
			if (!!odiv[i].getAttribute('class', 'mc-cell-selected')) {
				odiv[i].setAttribute("class", "mc-table-cell");
			}
			odiv[i].setAttribute("disabled", "disabled");
		}
		var num = 21 - fleng;
		if (num !== 0) {
			if (gettartime(odiv)) {
				for (var i = 0; i < num; i++) {
					if (!!odiv[i].getAttribute('disabled')) {
						odiv[i].removeAttribute("disabled");
					}
				}
			}
		}

	}
});

///
mui.plusReady(function() {
	get_Doc_City()
});
var Doc_City = document.getElementById("Doc-city"); //城市
var Doc_district = document.getElementById("Doc-district"); //区
//获取城市
function get_Doc_City() {
	for (var i = 0, len = city.city.length; i < len; i++) {
		var _li = document.createElement("li");
		_li.setAttribute('city-id', city.city[i].ID);
		_li.innerText = city.city[i].Name.length > 6 ? city.city[i].Name.slice(0, 5) : city.city[i].Name;
		Doc_City.appendChild(_li);
	}
	get_Doc_district(2);
}
//获取区
function get_Doc_district(pid) {
	Doc_district.innerHTML = '';
	for (var i = 0, len = city.district.length; i < len; i++) {
		if (city.district[i].PID == pid) {
			var _li = document.createElement("li");
			_li.setAttribute('class', 'mui-table-view-cell');
			_li.setAttribute('district-id', city.district[i].ID);
			_li.innerText = city.district[i].Name;
			if (_li.innerText.length > 5) {
				_li.innerText = _li.innerText.slice(0, 5)
			}
			Doc_district.appendChild(_li);
		}
	}
}
//点击市
mui('#Doc-city').on('tap', 'li', function() {
	get_Doc_district(this.getAttribute('city-id'));
});
//点击区
mui('#Doc-district').on('tap', 'li', function() {
	var oimg = '	<img src="../../img/common/btn_down.png" alt="" width="15px"/>';
	search_type.innerHTML = this.innerText + oimg;
	//根据区的ID获取数据
	//	console.log(this.getAttribute('district-id'));
	document.getElementById("doctorListDistrictValueID").value = this.getAttribute('district-id');
	//筛选调用
	slowExpertsDoctorList.doctorListScreen();
	mui('#householdDevices').popover('hide');
});