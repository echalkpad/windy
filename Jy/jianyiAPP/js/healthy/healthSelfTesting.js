mui.init({
	swipeBack: false
});
(function($) {
	var dts = commomUtil.getWeekDate();
	echart([0,,,,,,,],dts);
})();

function echart(data,xdata) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('echart'));
	// 指定图表的配置项和数据
	option = {
		tooltip: {
			trigger: 'axis'
		},
		grid : {
			width : 300,
			x : 45
		},
		xAxis : {
			type: 'category',
			splitLine: {
				show: false
			},
			data: xdata,
			axisLine: {
				lineStyle: {
					color: 'rgb(253, 177, 46)'
				}
			}
		},
		yAxis : {
			min : 0,
			max : 16000,
			splitNumber : 8
		},
		series : [{
			lineStyle: {
				normal: {
					color: '#00b6f6'
				}
			},
			type: 'line',
			data: data
		}]
	};
	// 使用刚指定的配置项和数据显示图表。\
	myChart.setOption(option);
}




var sugardata = new Object;
var onclickIndex = 0;
var datas = [{key:0,name:"早餐"},{key:1,name:"午餐"},{key:2,name:"晚餐"},{key:3,name:"其他"}];
var odians = document.getElementById("tab-dian").querySelectorAll('li');
var accountType = "";
var familyId = "";
var index = "";
document.addEventListener('plusready', function() {
	var self = plus.webview.currentWebview();
	index = self.index?self.index:0;
	accountType = self.accountType;
	familyId = self.familyId;
	onclickIndex = self.onclickIndex;
	//初始化数据
	healthSelfTesting.initData();
});

var healthSelfTesting = {
	initData : function(){
		//设置当前系统日期
		healthSelfTesting.initTopTime();
		//设置tab页索引选中
		healthSelfTesting.initIndexTab(index);
		if(!onclickIndex){
			onclickIndex = 0;
		}
		healthSelfTesting.initBloodShow(onclickIndex);
		
		//初始化血糖值总结 页面数据信息
		healthSelfTesting.initHealthSelfTestingBloodSugarSummary();
	//	初始化血糖表格页面数据信息
		healthSelfTesting.initHealthSelfTestingBloodSugarList();
	//	//初始化血压值总结页面数据信息
		healthSelfTesting.initHealthSelfTestingBloodPressureSummary();
	//	//初始化血压列表数据信息
		healthSelfTesting.initHealthSelfTestingBloodPressureList();
	//	//初始化当前时间血压数据
		healthSelfTesting.initHealthSelfTestingBloodPressure();
		//初始化记步功能
		healthSelfTesting.initHealthSelfTestingJibu();
	},
	initTopTime : function(){
		var dataTime = new Date();
		var times = (dataTime.getYear()+1900)+"-"+(dataTime.getMonth()<10 ? "0"+(dataTime.getMonth()+1) : dataTime.getMonth()+1) + "-" + (dataTime.getDate() < 10 ? "0"+dataTime.getDate() : dataTime.getDate());
		document.getElementById("healthSelfTestingSugarTimeId").innerHTML = times;
		document.getElementById("healthSelfTestingPressurlTimeId").innerHTML = times;
		document.getElementById("healthSelfTestingjblTimeId").innerHTML = times;
	},
	initIndexTab : function(index){
		var divs = document.getElementById("segmentedControl");
		var consultingas = divs.getElementsByTagName("a");
		if(index){
			for(var i=0;i<consultingas.length;i++){
				consultingas[i].setAttribute('class','mui-control-item');
				document.getElementById("item"+(i+1)).setAttribute("class","mui-control-content");
				if(i == index){
					consultingas[i].setAttribute('class','mui-control-item mui-active');
					document.getElementById("item"+(i+1)).setAttribute("class","mui-control-content mui-active");
				}
			}
		}
	},
	initHealthSelfTestingBloodSugar : function(onclickIndex){
		var requestData = "";
		if(accountType && familyId){
			requestData = "accountType="+accountType+"&familyId="+familyId;
		}
		jyapp.getApi({
 			method: 'HealthMeasure/BloodSugar',
 			timeout : 10000,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log("initHealthSelfTestingBloodSugar-->"+JSON.stringify(data));
   				if(data.code == 1 && data.data && data.data.list && data.data.list.length > 0){
   					sugardata = data.data.list[0];
					if(sugardata){
						var beforeContent = "";
						var afterConter = "";
						var beforehealthbeforId = "";
						var afterhealthafterId = "";
						if(onclickIndex == 0){
							beforeContent = sugardata.BeforeBreakfast;
							afterConter = sugardata.AfterBreakfast;
							beforehealthbeforId = sugardata.Id1;
							afterhealthafterId = sugardata.Id2;
						}else if(onclickIndex == 1){
							beforeContent = sugardata.BeforeLunch;
							afterConter = sugardata.AfterLunch;
							beforehealthbeforId = sugardata.Id3;
							afterhealthafterId = sugardata.Id4;
						}else if(onclickIndex == 2){
							beforeContent = sugardata.BeforeDinner;
							afterConter = sugardata.AfterDinner;
							beforehealthbeforId = sugardata.Id5;
							afterhealthafterId = sugardata.Id6;
						}else if(onclickIndex == 3){
							beforeContent = sugardata.BedTime;
							afterConter = sugardata.Other;
							beforehealthbeforId = sugardata.Id7;
							afterhealthafterId = sugardata.Id8;
						}
						//设置早餐前后血糖数据
						if(beforeContent && beforeContent != ""){
							document.getElementById("circleBefore").style.display = 'block';
							document.getElementById("xtBeforeH3").innerHTML = beforeContent;
							document.getElementById("xtBeforeInputID").value = 1;
							document.getElementById("healthypressurebeforeId").value = beforehealthbeforId;
							
						}else{
							document.getElementById("circleBefore").style.display = 'none';
							document.getElementById("xtBeforeH3").innerHTML = '';
							document.getElementById("xtBeforeInputID").value = 0;
							document.getElementById("healthypressurebeforeId").value = beforehealthbeforId;
						}
						if(afterConter && afterConter != ""){
							document.getElementById("circleafter").style.display = 'block';
							document.getElementById("xtafterH3").innerHTML = afterConter;
							document.getElementById("xtafterInputID").value = 1;
							document.getElementById("healthypressureafterId").value = afterhealthafterId;
						}else{
							document.getElementById("circleafter").style.display = 'none';
							document.getElementById("xtafterH3").innerHTML = '';
							document.getElementById("xtafterInputID").value = 0;
							document.getElementById("healthypressureafterId").value = afterhealthafterId;
						}
	   				}
					//饭前及睡前
					function CircleBefore(e) {
						jQuery(e).each(function(familyDoctor, el) {
							var num = parseInt(jQuery(this).find('h3').html());
							if(num<4){
								jQuery(e).css({
									'background':'#FE9808',
								})
							}else if(4<=num && num<=8){
								jQuery(e).css({
									'background':'rgb(55,201,70)',
								})
							}else{
								jQuery(e).css({
									'background':'#f00',
								})
							}
							num =num * 8.18+45;
							if (num <= 180) {
								jQuery(this).find('.left').css({
									'-webkit-transform': "rotate(" + num + "deg)"
								});
								jQuery(this).find('.right').css({
									'-webkit-transform': "rotate(0deg)"
								});
							} else {
								jQuery(this).find('.left').css({
									'-webkit-transform': "rotate(180deg)"
								});
								jQuery(this).find('.right').css({
									'-webkit-transform': "rotate(" + (num - 180) + "deg)"
								});
							};
						});
					}
					//饭后及其他
					function CircleAfter(e) {
						jQuery(e).each(function(familyDoctor, el) {
							var num = parseInt(jQuery(this).find('h3').html());
							if(num<5){
								jQuery(e).css({
									'background':'#FE9808',
								})
							}else if(5<=num && num<=9){
								jQuery(e).css({
									'background':'rgb(55,201,70)',
								})
							}else{
								jQuery(e).css({
									'background':'#f00',
								})
							}
							num =num * 8.18+45;
							if (num <= 180) {
								jQuery(this).find('.left').css({
									'-webkit-transform': "rotate(" + num + "deg)"
								});
								jQuery(this).find('.right').css({
									'-webkit-transform': "rotate(0deg)"
								});
							} else {
								jQuery(this).find('.left').css({
									'-webkit-transform': "rotate(180deg)"
								});
								jQuery(this).find('.right').css({
									'-webkit-transform': "rotate(" + (num - 180) + "deg)"
								});
							};
						});
					}
					
					CircleBefore('#circleBefore');
					CircleAfter('#circleafter');
				}
 			},
 			onerror: function(e) {
	   			console.log("initHealthSelfTestingBloodSugar------>:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	},
	initHealthSelfTestingBloodSugarSummary : function(){
		var requestData = "";
		if(accountType && familyId){
			requestData = "accountType="+accountType+"&familyId="+familyId;
		}
		jyapp.getApi({
 			method: 'HealthMeasure/BloodSugarSummary',
 			timeout : 10000,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				var dataValue = data.data;
				document.getElementById("bloodSugarSumSpandiId").innerHTML = dataValue.lowRecordCount+"次";
				document.getElementById("bloodSugarSumSpanzcId").innerHTML = dataValue.normalRecordCount+"次";
				document.getElementById("bloodSugarSumSpanpgId").innerHTML = dataValue.haighRecordCount+"次";
				document.getElementById("bloodSugarH3SumId").innerHTML = "已记录"+dataValue.totalRecordCount+"次";
				//设置进度条数据
				//进度条
				jQuery('.blood-sp').each(function(){
					var num = 0;
					if(dataValue.totalRecordCount){
						if(dataValue.totalRecordCount > 4){
							num = 4 * 25;
						}else{
							num = dataValue.totalRecordCount * 25;
						}
					}
					jQuery(this).css({
						'width':num+'%',
					})
				});
 			},
 			onerror: function(e) {
	   			console.log("initHealthSelfTestingBloodSugarSummary------>:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	},
	initHealthSelfTestingBloodSugarList : function(){
		var requestData = "";
		if(accountType && familyId){
			requestData = "accountType="+accountType+"&familyId="+familyId;
		}
		var bloodSuganHtml = "";
		jyapp.getApi({
 			method: 'HealthMeasure/BloodSugarList',
 			timeout : 10000,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				var dataValue = data.data.list ? data.data.list : {};
				for(var i=0;i<dataValue.length;i++){
					var BeforeBreakfast = dataValue[i].BeforeBreakfast ? dataValue[i].BeforeBreakfast : "";
					var AfterBreakfast = dataValue[i].AfterBreakfast ? dataValue[i].AfterBreakfast : "";
					var BeforeLunch = dataValue[i].BeforeLunch ? dataValue[i].BeforeLunch : "";
					var AfterLunch = dataValue[i].AfterLunch ? dataValue[i].AfterLunch : "";
					var BeforeDinner = dataValue[i].BeforeDinner ? dataValue[i].BeforeDinner : "";
					var AfterDinner = dataValue[i].AfterDinner ? dataValue[i].AfterDinner : "";
					var BedTime = dataValue[i].BedTime ? dataValue[i].BedTime : "";
					var Other = dataValue[i].Other ? dataValue[i].Other : "";
					
					var measurementDateTime = dataValue[i].MeasurementDate;
					
					var endLen = measurementDateTime.length - 2;
					var time = measurementDateTime.substring(6, endLen);
					
					bloodSuganHtml += "<tr><td>"+commomUtil.formatStringToDate(time,1)+"</td>";
					bloodSuganHtml += "<td><span class=\"qian\">"+BeforeBreakfast+"</span><span class=\"hou\">"+AfterBreakfast+"</span></td>";
					bloodSuganHtml += "<td><span class=\"qian\">"+BeforeLunch+"</span><span class=\"hou\">"+AfterLunch+"</span></td>";
					bloodSuganHtml += "<td><span class=\"qian\">"+BeforeDinner+"</span><span class=\"hou\">"+AfterDinner+"</span></td>";
					bloodSuganHtml += "<td><span class=\"qian\">"+BedTime+"</span><span class=\"hou\">"+Other+"</span></td>";
					bloodSuganHtml += "</tr>";
				}
				document.getElementById("bloodPressurTbodyHtmlId").innerHTML = bloodSuganHtml;
 			},
 			onerror: function(e) {
	   			console.log("initHealthSelfTestingBloodSugarList------>:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	},
	initHealthSelfTestingBloodPressureSummary : function(){
		var requestData = "";
		if(accountType && familyId){
			requestData = "accountType="+accountType+"&familyId="+familyId;
		}
		jyapp.getApi({
 			method: 'HealthMeasure/BloodPressureSummary',
 			timeout : 10000,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				var dataValue = data.data;
				document.getElementById("bloodPressurSumSpanpdId").innerHTML = dataValue.lowRecordCount+"次";
				document.getElementById("bloodPressurSumSpanzcId").innerHTML = dataValue.normalRecordCount+"次";
				document.getElementById("bloodPressurSumSpanpgId").innerHTML = dataValue.haighRecordCount+"次";
				document.getElementById("bloodPressurSumSpanzjId").innerHTML = "已记录"+dataValue.totalRecordCount+"次";
				
				//设置进度条数据
				//进度条
				jQuery('.blood-pre').each(function(){
					var num = 0;
					if(dataValue.recordDayCount){
						if(dataValue.recordDayCount  > 4){
							num = 4 * 25;
						}else{
							num = dataValue.recordDayCount * 25;
						}
					}
					jQuery(this).css({
						'width':num+'%',
					})
				});
 			},
 			onerror: function(e) {
	   			console.log("initHealthSelfTestingBloodPressureSummary------>:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	},
	initHealthSelfTestingBloodPressureList : function(){
		var healthSelfTestingPressurlTableIdHtml = "<caption>周血压记录</caption>";
		var timeHtml = "<tr><th>&nbsp;</th>";
		var pjszHtml = "<tr><td>平均舒张压</td>";
		var pjssHtml = "<tr><td>平均收缩压</td>";
		var pjxlHtml = "<tr><td>平均心率</td>";
		var requestData = "";
		if(accountType && familyId){
			requestData = "accountType="+accountType+"&familyId="+familyId;
		}
		jyapp.getApi({
 			method: 'HealthMeasure/BloodPressureList',
 			timeout : 10000,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				var dataValue = data.data.list ? data.data.list : {};
				for(var i=0;i<dataValue.length;i++){
					timeHtml += "<th>"+commomUtil.stringToDateFormat(dataValue[i].MeasurementDate)+"</th>";
	 				pjszHtml += "<td>"+dataValue[i].DiastolicPressure+"</td>";
	 				pjssHtml += "<td>"+dataValue[i].SystolicPressure+"</td>";
	 				pjxlHtml += "<td>"+dataValue[i].HeartRate+"</td>";
				}
 				timeHtml += "</tr>";
 				pjszHtml += "</tr>";
 				pjssHtml += "</tr>";
 				pjxlHtml += "</tr>";
 				healthSelfTestingPressurlTableIdHtml += timeHtml+pjszHtml+pjssHtml+pjxlHtml;
				document.getElementById("healthSelfTestingPressurlTableId").innerHTML = healthSelfTestingPressurlTableIdHtml;
 			},
 			onerror: function(e) {
	   			console.log("initHealthSelfTestingBloodPressureList------>:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	},
	initHealthSelfTestingBloodPressure : function(){
		var T=document.getElementById("bloodPressure1").parentNode.parentNode.parentNode;
		T.style.cssText="border-bottom:1px solid rgb(239, 239, 239);height:140px;padding:50px 0 0px;overflow:hidden;"
		var Foot=document.querySelector(".stepCounter-t-l").parentNode.parentNode;
		Foot.setAttribute('class','mui-control-content stepCounter');
		
		var requestData = "";
		if(accountType && familyId){
			requestData = "accountType="+accountType+"&familyId="+familyId;
		}
		jyapp.getApi({
 			method: 'HealthMeasure/BloodPressure',
 			timeout : 10000,
 			data : requestData,
 			onsuccess: function(data) {
// 				console.log(JSON.stringify(data));
				var dataValue = data.data;
				if(data.code == 1){
					if(dataValue){
						document.getElementById("bloodPressure1").innerHTML = dataValue[0].DiastolicPressure;
						document.getElementById("bloodPressure2").innerHTML = dataValue[0].SystolicPressure;
						document.getElementById("bloodPressure3").innerHTML = dataValue[0].HeartRate;
					}
				}else{
					plus.nativeUI.alert(data.msg,'','健医宝','','确认');
				}
 			},
 			onerror: function(e) {
	   			console.log("initHealthSelfTestingBloodPressure------>:"+e);
// 				plus.nativeUI.alert(e,'','健医宝','确认');
 			}
 		});
	},
	goxyjlOnClick : function(){
		commomUtil.closeWebviewById("healthyPressureRecord");
		mui.openWindow({
			id: 'healthyPressureRecord',
			url: "healthyPressureRecord.html",
			createNew: true,
			extras: {
				accountType:accountType,
				familyId : familyId
			}
		});
	},
	prevOnclick : function(){
		if(onclickIndex == 0){
			onclickIndex = 3;
		}else{
			onclickIndex --;
		}
		var data = datas[onclickIndex];
		document.getElementById("ctime").innerHTML="<p class=\"morning\">"+data.name+"</p>"
		for (var i = 0, len = odians.length; i < len; i++) {
			odians[i].setAttribute('class', '');
		}
		odians[onclickIndex].setAttribute('class', 'health-tab-active');
		//获取当天血糖数据信息
		healthSelfTesting.initHealthSelfTestingBloodSugar(onclickIndex);
	},
	nextOnclick : function(){
		if(onclickIndex == 3){
			onclickIndex = 0;
		}else{
			onclickIndex ++;
		}
		var data = datas[onclickIndex];
		document.getElementById("ctime").innerHTML="<p class=\"morning\">"+data.name+"</p>"
		for (var i = 0, len = odians.length; i < len; i++) {
			odians[i].setAttribute('class', '');
		}
		odians[onclickIndex].setAttribute('class', 'health-tab-active');
		//获取当天血糖数据信息
		healthSelfTesting.initHealthSelfTestingBloodSugar(onclickIndex);
	},
	xtBeforeOnclick : function(){
		var flag = this.querySelectorAll('input')[0].value;
		var bloodRecordId = this.querySelectorAll('input')[1].value;
		sugardata.flag = flag;
		commomUtil.closeWebviewById("healthyBloodRecord");
		mui.openWindow({
			id: 'healthyBloodRecord',
			url: "healthyBloodRecord.html",
			createNew: true,
			extras: {
				onclickIndex: onclickIndex,
				type:'xtBeforeOnclick',
				sugardata:sugardata,
				accountType:accountType,
				familyId : familyId,
				bloodRecordId : bloodRecordId
			}
		});
	},
	xtafterOnclick : function(){
		var flag = this.querySelectorAll('input')[0].value;
		var bloodRecordId = this.querySelectorAll('input')[1].value;
//		console.log(flag);
		if(!sugardata){
			sugardata = new Object;
		}
		sugardata.flag = flag;
		commomUtil.closeWebviewById("healthyBloodRecord");
		mui.openWindow({
			id: 'healthyBloodRecord',
			url: "healthyBloodRecord.html",
			createNew: true,
			extras: {
				onclickIndex: onclickIndex,
				type:'xtafterOnclick',
				sugardata:sugardata,
				accountType:accountType,
				familyId : familyId,
				bloodRecordId : bloodRecordId
			}
		});
	},
	initBloodShow : function(){
		var data = datas[onclickIndex];
		document.getElementById("ctime").innerHTML="<p class=\"morning\">"+data.name+"</p>"
		for (var i = 0, len = odians.length; i < len; i++) {
			odians[i].setAttribute('class', '');
		}
		odians[onclickIndex].setAttribute('class', 'health-tab-active');
		//获取当天血糖数据信息
		healthSelfTesting.initHealthSelfTestingBloodSugar(onclickIndex);
	},
	healthSelfTestingBackCell : function(){
		var webViewId = "";
		var mothed = "";
		var webViewUrl = "";
		if(!accountType || !familyId){
			webViewId = "mainHealthy";
			mothed = "newIdsMainHealthy";
			jyapp.backWebView({id:webViewId,index : 3,method:mothed});
		}else{
			webViewId = "meFamily";
			webViewUrl = "../me/meFamily.html";
			mothed = "newIdsmeFamilyBackCell";
			jyapp.backWebView({id:webViewId,url:webViewUrl,method:mothed});
		}
	},
	initHealthSelfTestingJibu : function(){
		var dts = commomUtil.getWeekDate();
		switch (plus.os.name) {
	        case "Android":
	       		echart([0,,,,,,,],dts);
	        break;
	        case "iOS":   
	        	healthSelfTesting.initHealthSelfTestIngIOSJibu(dts);
	        break;
	        default:
	        break;
	    }  
		
	},
	initHealthSelfTestIngIOSJibu : function(dts){
		plus.FPPlugin.PluginFunction("stepCount",function(success){
			//设置步数公里大卡
			if(success && success.length > 0){
				var dt = success[success.length-1];
				//设置公里数据
				document.getElementById("healthSelfTestingGlId").innerText = dt.km;
				//设置步数数据
				document.getElementById("healthSelfTestingbsId").innerHTML = dt.step +"<span>步</span>";
				//设置大卡数据
				document.getElementById("healthSelfTestingdkId").innerHTML = dt.kcal;
				//设置进度条
				var lv = dt.step > 8000 ? 100 : (dt.step / 8000)*100;
				var xianlv = success.length > 4 ? 100 : success.length * 25;
				document.getElementById('stepCounter-circle').setAttribute('style', 'width:' + lv + '%');//上面的圈
				document.querySelectorAll(".blood-pre")[1].setAttribute('style', 'width:' + xianlv + '%');//下面的线
				document.getElementById("healthSelfTestingjibuwzlvId").innerHTML = "今天完成"+lv+"%";
				var datas = [];
				for(var i=0;i<7;i++){
					if(i < success.length){
						datas[i] = success[i].step;//步数
					}else{
						datas[i] = "";
					}
				}
				echart(datas,dts);
			}else{
				healthSelfTesting.setValues(dts);
			}
		},function(error){
			healthSelfTesting.setValues(dts);
		});
	},
	setValues : function(dts){
		//设置公里数据
		document.getElementById("healthSelfTestingGlId").innerText = 0;
		//设置步数数据
		document.getElementById("healthSelfTestingbsId").innerHTML = 0 +"<span>步</span>";
		//设置大卡数据
		document.getElementById("healthSelfTestingdkId").innerHTML = 0;
		var lv = 0 / 8000;
		var xianlv = 0 * 25;
		document.getElementById('stepCounter-circle').setAttribute('style', 'width:' + lv + '%');//上面的圈
		document.querySelectorAll(".blood-pre")[1].setAttribute('style', 'width:' + xianlv + '%');//下面的线
		document.getElementById("healthSelfTestingjibuwzlvId").innerHTML = "今天完成0%";
		echart([0,0,,,,,,],dts);
	}
};

//绑定添加血压数据按钮事件
document.getElementById("goxyjl").addEventListener("click",healthSelfTesting.goxyjlOnClick);
//绑定向前转动按钮事件
document.getElementById("prevonclick").addEventListener("click",healthSelfTesting.prevOnclick,false);
//绑定向后转动按钮事件
document.getElementById("nextonclick").addEventListener("click",healthSelfTesting.nextOnclick,false);
//绑定之前按钮添加事件
document.getElementById("xtBeforeAID").addEventListener("click",healthSelfTesting.xtBeforeOnclick);
//绑定之后按钮添加事件 
document.getElementById("xtafterAID").addEventListener("click",healthSelfTesting.xtafterOnclick);

//绑定回退按钮事件
document.getElementById("healthSelfTestingBackCellId").addEventListener("tap",healthSelfTesting.healthSelfTestingBackCell);

//mui.back = function(e){
//	healthSelfTesting.healthSelfTestingBackCell();
//}

window.addEventListener("newIdsHealthSelfTesting",function(event){
	index = event.detail.index?event.detail.index:0;
	accountType = event.detail.accountType;
	familyId = event.detail.familyId;
	onclickIndex = event.detail.onclickIndex;
	//调用初始化数据方法
	healthSelfTesting.initData();
});