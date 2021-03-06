var accountType = "";
var familyId = "";

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	accountType = self.accountType;
	familyId = self.familyId;
	document.getElementById('dateTime').innerText = commomUtil.formatStringToDate(new Date().getTime(),3);
})

var day = "";
var healthyPressure = {
	healthBPtime1Onclick : function(){
		var optionsJson = this.getAttribute('data-options') || '{}';
		var options = JSON.parse(optionsJson);
		var id = this.getAttribute('id');
		/*
		 * 首次显示时实例化组件
		 * 示例为了简洁，将 options 放在了按钮的 dom 上
		 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
		 */
		var picker = new mui.DtPicker(options);
		picker.show(function(rs) {
			/*
			 * rs.value 拼合后的 value
			 * rs.text 拼合后的 text
			 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
			 * rs.m 月，用法同年
			 * rs.d 日，用法同年
			 * rs.h 时，用法同年
			 * rs.i 分（minutes 的第二个字母），用法同年
			 */
			var dt = new Date;
			dt.setYear(rs.y.value);
			dt.setMonth(rs.m.value - 1);
			dt.setDate(rs.d.value);
			dt.setHours(rs.h.value);
			dt.setMinutes(rs.i.value);
			
			
			var dttime = new Date().getTime();
			var str = dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
			if(dttime < dt.getTime()){
				plus.nativeUI.alert('测量时间不能大于当前时间！','','健医宝','确认');
				return false;
			}
			document.getElementById('dateTime').innerText =str+' '+ rs.text;
			/* 
			 * 返回 false 可以阻止选择框的关闭
			 * return false;
			 */
			/*
			 * 释放组件资源，释放后将将不能再操作组件
			 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
			 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
			 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
			 */
			picker.dispose();
		});
	}
}

//绑定测量时间控件
document.getElementById("healthBP-time2").addEventListener("tap",healthyPressure.healthBPtime1Onclick);
var detailPage = null;
var checkId = 1;
mui("header").on('click', '#healthyPressureSubmit', function() {
	if(checkId == 1){
		checkId ++;
		var diastolicPressure = document.getElementById("diastolicPressure").innerText;
		var systolicPressure = document.getElementById("systolicPressure").innerText;
		var heartRate = document.getElementById("heartRate").innerText;
		var dateTime = document.getElementById('dateTime').innerText;
		var description = document.getElementById("description").value;
		if(!diastolicPressure){
			plus.nativeUI.alert("舒张压为必填项，不能为空！",'','健医宝','确认');
			return false;
		}
		if(!systolicPressure){
			plus.nativeUI.alert("收缩压为必填项，不能为空！",'','健医宝','确认');
			return false;
		}
		if(!heartRate){
			plus.nativeUI.alert("心率为必填项，不能为空！",'','健医宝','确认');
			return false;
		}
		if(!dateTime){
			plus.nativeUI.alert("测量时间为必填项，不能为空！",'','健医宝','确认');
			checkId = 1;
			return false;
		}
		if(parseInt(diastolicPressure) > parseInt(systolicPressure)){
			plus.nativeUI.alert("舒张压不能大于收缩压！",'','健医宝','确认');
			checkId = 1;
			return false;
		}
		var requestData = "diastolicPressure="+diastolicPressure+"&systolicPressure="+systolicPressure+"&heartRate="+heartRate+"&dateTime="+dateTime+"&description="+description+"&familyId="+familyId+"&accountType="+accountType;
//		console.log(requestData);
		jyapp.getApi({
		method: 'HealthMeasure/BloodPressureAdd',
		data:requestData,
		timeout : 10000,
		showWaiting: true,
		onsuccess: function(data) {
			checkId = 1;
//			console.log(JSON.stringify(data));
			if(data.code == 1){
				//打开详情页面          
				commomUtil.closeWebviewById("healthSelfTesting");
				mui.openWindow({
					id: 'healthSelfTesting',
					url: "healthSelfTesting.html",
					createNew: true,
					extras : {
						index : 1,
						familyId : familyId,
						 accountType : accountType
					},
					show: {
						aniShow: "slide-in-top"
					}
				});
			}else{
				plus.nativeUI.alert(data.msg,'','健医宝','确认');
			}
		},
		onerror: function(e) {
			checkId = 1;
	   		console.log("healthyPressureSubmit------>:"+e);
//			plus.nativeUI.alert(e,'','健医宝','确认');
		}
	});
	}
})

var S=document.getElementById("scroll");
var perHigh=document.getElementById("systolicPressure");
var S2=document.getElementById("scroll2");
var perLow=document.getElementById("diastolicPressure");
var S3=document.getElementById("scroll3");
var perHeartRate=document.getElementById("heartRate");
Touch(S,-1737,55.3,perHigh);//高压
Touch(S2,-1200,45.2,perLow);//低压
Touch(S3,-2090,15.174,perHeartRate);//心率
function Touch(m,n,y,j){
	var num=0;
	m.addEventListener('touchstart',function(evt){
    	var touch = evt.touches[0]; //获取开始触点
        var x = (touch.pageX)|0; //页面开始触点X坐标
        startX = x;
	},false);
	var t = 0;
	m.addEventListener('touchmove',function(event){
		event.preventDefault();
        var touch = event.touches[0]; //获取结束触点
        var endX = (touch.pageX)|0; //页面结束触点X坐标
		t=startX-endX; //滑动距离
		var d=jQuery(m).css('background-position-x');
		d=parseInt(d);
		num=d-t/10;
		if(d<140){
			if(n<num && num<=130){
				m.style.backgroundPosition=num+"px";
			}else if(num<=n){
				m.style.backgroundPosition=n+"px";
				num=n;
			}else if(num>=130){
				num = 130;
				m.style.backgroundPosition = num + "px";
			}
		}
		var Z=y-num/8.9;
		Z=Z.toFixed(1);
		j.innerHTML=parseInt(Math.abs(Z));
	},false)
}


