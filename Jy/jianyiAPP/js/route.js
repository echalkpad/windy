/******main页面******/
//打开支付码页面
mui(".mui-bar").on('tap', '#btn-pay', function() {
		mui.openWindow({
			id: 'indexPayment',
			url: "../html/pay/indexPayment.html"
		});
	})
	/******index页面******/
	
//首页-->热门服务
mui(".mui-content").on('tap', '#goPopularServices', function() {
		mui.openWindow({
			id: 'popularServices',
			url: "popularServices.html"
		});
	})
	//健康测量页面
mui(".mui-content").on('tap', '#goHealthSelfTesting', function() {
	mui.openWindow({
		id: 'healthSelfTesting',
		url: "../html/healthy/healthSelfTesting.html"
	});
})

//健康咨询页面
mui(".mui-content").on('tap', '#healthInformation', function() {
	mui.openWindow({
		id: 'indexHealthInformation',
		url: "../html/healthInformation/indexHealthInformation.html"
	});
})

//健康详情
mui("#jkzx").on('tap', 'li', function() {
	plus.webview.close(plus.webview.getWebviewById('indexHealthDetails'));
	var healthConsultationId = this.querySelectorAll('input')[0].value;
	mui.openWindow({
		id: 'indexHealthDetails',
		url: "healthInformation/indexHealthDetails.html",
		createNew: true,
		extras: {
			"healthConsultationId": healthConsultationId
		}
	});
})

//健康网点
mui("#healthNetworkDetail").on('tap', 'li', function() {
		mui.openWindow({
			id: 'healthNetworkDetail',
			url: "healthNetworkDetail.html"
		});
	})
	//图片轮播页
mui('#mainIndexBannerDivID').on('tap', '.mui-slider-item', function() {
		var url = this.getAttribute('url');
		var description = this.getAttribute('description');
		if (url == null) {
			return false;
		}
		mui.openWindow({
			id: 'sliper',
			url: 'sliper.html',
			extras: {
				url: url,
				description: description
			}
		})
	})
	/******************************************healthy页面**********************************************/

//健康评估
//mui(".mui-content").on('tap', '#HealthAssessment', function() {
//		plus.nativeUI.alert("敬请期待！", function() {}, "键医宝", "OK");
//
//	})
//健康自诊
//mui(".mui-content").on('tap', '#healthSelfTesting', function() {
//		plus.nativeUI.alert("敬请期待！", function() {}, "键医宝", "OK");
//	})

//基因检测
mui("#healthJumpDivID").on('tap', '#geneticTesting', function() {
		mui.openWindow({
			id: 'geneticTesting',
			url: "../html/healthy/geneticDiagnosis/geneticDiagnosis.html"
		});
	})
	//体检
mui("#healthJumpDivID").on('tap', '#jumpCheckBodyAID', function() {
		mui.openWindow({
			id: 'healthExamination',
			url: "../html/healthy/healthExamination/healthExamination.html"
		});
	})
	//疗养
mui("#healthJumpDivID").on('tap', '#recuperate', function() {
		mui.openWindow({
			id: 'spa',
			url: "../html/healthy/spa/spa.html"
		});
	})
	/*****************************************************用药页面*********************************************/

//用药日历页面
/*mui(".mui-bar-nav").on('tap', '.mc-date', function() {
		mui.openWindow({
			id: 'mainMctime',
			url: "../html/mainMctime.html"
		});
})*/
//用药切换家人页面
mui(".mui-bar-nav").on('tap', '#btn-swich', function() {
	var accountType = this.querySelectorAll('input')[0].value;
	var familyId = this.querySelectorAll('input')[1].value;
	mui.openWindow({
		id: 'switchFamily',
		url: "../html/medication/switchFamily.html",
		extras: {
			accountType: accountType,
			familyId: familyId
		}
	});
});
//用药页面
mui("body").on('tap', '.date-return', function() {
	mui.openWindow({
		id: 'mainMedication',
		url: "../html/mainMedication.html"
	});
})

//用药安全
mui(".yy-bottom").on('tap', '#drugSafety', function() {
	mui.openWindow({
		id: 'drugSafety',
		url: "../html/medication/drugSafety.html"
	});
})

//用药安全查询结果
mui(".mui-content").on('tap', '#drugResults', function() {
	mui.openWindow({
		id: 'drugResults',
		url: "drugResults.html"
	});
})

//用药方法管理
mui(".mui-bar").on('tap', '#medicationManage', function() {
	mui.openWindow({
		id: 'medicationManage',
		url: "medicationManage.html"
	});
})

/******问诊页面******/
//预约挂号
mui(".mui-content").on('tap', '#appointmentRegister', function() {
	mui.openWindow({
		id: 'appointmentRegister',
		url: "../html/appointmentRegister/appointmentRegister.html"
	});
})

//肿瘤专家列表
mui(".expertsEntrance").on('tap', '#cancerExpertsList', function() {
	mui.openWindow({
		id: 'cancerExpertsList',
		url: "cancerExpertsList.html"
	});
})

//肿瘤专家-按疾病
mui(".mui-content").on('tap', '#cancerDiseaseTypes', function() {
	mui.openWindow({
		id: 'cancerDiseaseTypes',
		url: "cancerDiseaseTypes.html"
	});
})

//肿瘤专家-按搜索
mui(".mui-content").on('tap', '#cancerExpertsSearch', function() {
	mui.openWindow({
		id: 'cancerExpertsSearch',
		url: "cancerExpertsSearch.html"
	});
})

//肿瘤专家-图片轮播
mui('#cancerExpertsBannerDivID').on('tap', '.mui-slider-item', function() {
	var data = this.getAttribute('URL');
	var description = this.getAttribute('description');
	if (data == null || data == 'null') {
		return false;
	}
	mui.openWindow({
		id: 'sliper',
		url: '../sliper.html',
		extras: {
			description: description,
			url: data
		}
	})
})

//免费咨询
/*mui(".mui-content").on("tap", "#cancerExpertsmfzx", function() {
		var cancerExpertsmfzxwebview = plus.webview.create('http://guahao.tv/', 'mfzx', {}, {
			preload: "preload webview"
		});
		cancerExpertsmfzxwebview.show();
	})*/
//肿瘤专家热门活动医生详情
mui("#cancerExpertsHavId").on('tap', 'li', function() {
		var cancerExpertsId = this.querySelectorAll('input')[0].value;
		plus.webview.close(plus.webview.getWebviewById("cancerExpertsDetails"));
		mui.openWindow({
			id: 'cancerExpertsDetails',
			url: "cancerExpertsDetails.html",
			createNew: true,
			extras: {
				doctorId: cancerExpertsId
			}
		});
	})
	//肿瘤专家推荐医师医生详情
mui("#cancerExpertstuijianId").on('tap', 'li', function() {
		var cancerExpertsId = this.querySelectorAll('input')[0].value;
		plus.webview.close(plus.webview.getWebviewById("cancerExpertsDetails"));
		mui.openWindow({
			id: 'cancerExpertsDetails',
			url: "cancerExpertsDetails.html",
			createNew: true,
			extras: {
				doctorId: cancerExpertsId
			}
		});
	})
	//肿瘤专家按疾病搜索医生列表
mui("#segmentedControlContents").on('tap', 'li', function() {
		var diseaseId = this.querySelectorAll('input')[0].value;
		var diseaseName = this.querySelectorAll('input')[1].value;
		plus.webview.close(plus.webview.getWebviewById("cancerExpertsDoctorList"));
		mui.openWindow({
			id: 'cancerExpertsDoctorList',
			url: "cancerExpertsDoctorList.html",
			createNew: true,
			extras: {
				doctorId: diseaseId,
				type: "doctorId",
				diseaseName: diseaseName
			}
		});
	})
	//搜索专家肿瘤专家医生详情
mui("#cancerExpertsSearchysId").on('tap', 'li', function() {
		var cancerExpertsId = this.querySelectorAll('input')[0].value;
		plus.webview.close(plus.webview.getWebviewById("cancerExpertsDetails"));
		mui.openWindow({
			id: 'cancerExpertsDetails',
			url: "cancerExpertsDetails.html",
			createNew: true,
			extras: {
				doctorId: cancerExpertsId
			}
		});
	})
	//搜索专家肿瘤专家医院医生列表
mui("#cancerExpertsSearchyyId").on('tap', 'li', function() {
		var hospitalId = this.querySelectorAll('input')[0].value;
		var ohtml = this.querySelectorAll('input')[1].value;
		var cityPickerName = this.querySelectorAll('input')[2].value;
		plus.webview.close(plus.webview.getWebviewById("cancerExpertsDoctorList"));
		mui.openWindow({
			id: 'cancerExpertsDoctorList',
			url: "cancerExpertsDoctorList.html",
			createNew: true,
			extras: {
				hospitalId: hospitalId,
				type: "hospitalId",
				diseaseName: ohtml,
				cityPickerName: cityPickerName
			}
		});
	})
	//肿瘤专家医生列表跳转到医生详情页面
mui("#cancerExpertsDoctorListId").on('tap', 'li', function() {
		var cancerExpertsId = this.querySelectorAll('input')[0].value;
		plus.webview.close(plus.webview.getWebviewById("cancerExpertsDetails"));
		mui.openWindow({
			id: 'cancerExpertsDetails',
			url: "cancerExpertsDetails.html",
			createNew: true,
			extras: {
				doctorId: cancerExpertsId
			}
		});
	})
	//紧急救援
mui(".mui-content").on('tap', '#emergencyRescue', function() {
		mui.openWindow({
			id: 'emergencyRescue',
			url: "../html/emergencyRescue.html"
		});
	})
	//慢病专家
mui(".mui-content").on('tap', '#SlowExperts', function() {
	mui.openWindow({
		id: 'SlowExperts',
		url: "../html/SlowExperts/SlowExperts.html"
	});
})

//慢病专家列表
mui(".expertsEntrance").on('tap', '#SlowExpertsList', function() {
		mui.openWindow({
			id: 'SlowExpertsList',
			url: "SlowExpertsList.html"
		});
	})
	//慢病专家-按疾病
mui(".mui-content").on('tap', '#SlowDiseaseTypes', function() {
	mui.openWindow({
		id: 'SlowDiseaseTypes',
		url: "SlowDiseaseTypes.html"
	});
})

//慢病专家-按搜索
mui(".mui-content").on('tap', '#SearchSlowExperts', function() {
	mui.openWindow({
		id: 'SlowExpertsSearch',
		url: "SlowExpertsSearch.html"
	});
})

////慢病专家医生详情
//mui("#SlowExpertsDetails").on('tap', 'li', function() {
//	var doctorId = this.querySelectorAll('input')[0].value;
//	mui.openWindow({
//		id: 'SlowExpertsDetails',
//		url: "SlowExpertsDetails.html",
//		extras: {
//			doctorId: doctorId
//		}
//	});
//})

//慢病专家-图片轮播
mui('#slowBannerDivID').on('tap', '.mui-slider-item', function() {
		var data = this.getAttribute('URL');
		var description = this.getAttribute('description');
		if (data == null || data == 'null') {
			return false;
		}
		mui.openWindow({
			id: 'sliper',
			url: '../sliper.html',
			extras: {
				description: description,
				url: data
			}
		})
	})
	//我的页面

//修改密码
mui(".mui-content").on('tap', '#changePassword', function() {
	mui.openWindow({
		id: 'changePassword',
		url: "changePassword.html",
		createNew: true,
	});
})

//修改手机号
mui(".mui-content").on('tap', '#ModifyPhone', function() {
	mui.openWindow({
		id: 'ModifyPhone',
		url: "ModifyPhone.html",
		createNew: true,
	});
})

//地址管理
mui(".mui-content").on('tap', '#addressManagement', function() {
	mui.openWindow({
		id: 'addressManagement',
		url: "addressManagement.html",
		createNew: true,
	});
})

//新增地址
mui(".mui-bar").on('tap', '#newAddress', function() {
	mui.openWindow({
		id: 'newAddress',
		url: "newAddress.html",
		createNew: true,
	});
})

//个性签名
mui(".mui-content").on('tap', '#signature', function() {
	var ohtml = document.getElementById("signatureResult").innerText;
	mui.openWindow({
		id: 'signature',
		url: "signature.html",
		extras: {
			"sign": ohtml
		}
	});
})

//健康档案
mui(".mui-content").on('tap', '#healthRecordsOne', function() {
	mui.openWindow({
		id: 'healthRecords',
		url: "../html/me/healthRecords.html",
	});
})

////我的家人
//mui(".mui-content").on('tap', '#meFamily', function() {
//		mui.openWindow({
//			id: 'meFamily',
//			url: "../html/me/meFamily.html"
//		});
//	})
//我的家人空的时候点击新增家人
//mui(".mui-content").on('tap', '#addFamily', function() {
//		mui.openWindow({
//			id: 'addFamily',
//			url: 'addFamily.html'
//		})
//	})
//新增家人
mui("body").on('tap', '.addFamily', function() {
	mui.openWindow({
		id: 'addFamily',
		url: "addFamily.html",
		createNew: true
	});
})

//健e卡
mui(".mui-table-view").on('tap', '#JeCard', function() {
	mui.openWindow({
		id: 'JeCard',
		url: "../html/me/JeCard.html"
	});
})

//我的保单
mui(".mui-table-view").on('tap', '#guaranteeSlip', function() {
	mui.openWindow({
		id: 'guaranteeSlip',
		url: "../html/me/guaranteeSlip.html"
	});
})

//我的服务
mui(".mui-table-view").on('tap', '#myOrder', function() {
	mui.openWindow({
		id: 'myOrder',
		url: "../html/me/myOrder.html"
	});
})

//肿瘤专家-医生详情
mui(".doctor").on('tap', 'li', function() {
		mui.openWindow({
			id: 'cancerExpertsDetails',
			url: "cancerExpertsDetails.html"
		});
	})
	//肿瘤专家-医生列表
mui(".cancerDiseases").on('tap', 'li', function() {
		mui.openWindow({
			id: 'cancerExpertsDoctorList',
			url: "cancerExpertsDoctorList.html",
			createNew: true
		});
	})
	//肿瘤专家-订单详情
mui(".mui-bar").on('tap', '#goCancerOrderList', function() {
	//	plus.webview.close(plus.webview.getWebviewById("cancerOrderList"));
	mui.openWindow({
		id: 'cancerOrderList',
		url: "cancerOrderList.html"
	});
})

//慢病专家按疾病搜索医生列表
mui("#segmentedControlContentsSlow").on('tap', 'li', function() {
		var requestDisease = this.querySelectorAll('input')[0].value;
		var titleName = this.querySelectorAll('input')[1].value;
		mui.openWindow({
			id: 'SlowExpertsDoctorList',
			url: "SlowExpertsDoctorList.html",
			extras: {
				"requestDisease": requestDisease,
				"titleName": titleName,
				"areaName": "全国"
			}
		});
	})
	//	//慢病专家-医生列表
	//mui(".slowDiseases").on('tap', 'li', function() {
	//	var requestDisease = this.querySelectorAll('input')[0].value;
	//	mui.openWindow({
	//		id: 'SlowExpertsDoctorList',
	//		url: "SlowExpertsDoctorList.html",
	//		extras: {
	//			"requestDisease": requestDisease
	//		}
	//	});
	//})

//慢病专家-订单
mui(".mui-control-content").on('tap', '#slowExpertsAskAppointmentID', function() {
	mui.openWindow({
		id: 'reserveInformation',
		url: "reserveInformation.html",
	});
})

//肿瘤专家->>待确定
mui("#canccerConfirmed").on('click', 'li', function() {
	var orderId = this.querySelectorAll('input')[0].value;
	var backid = document.getElementById("backcancerOrderListWebviewId").value;
	var backurl = document.getElementById("backcancerOrderListWebviewUrl").value;
	mui.openWindow({
		id: 'orderDetailsConfirmed',
		url: "orderDetailsConfirmed.html",
		extras: {
			orderId: orderId,
			status: '待确认',
			backurl: backurl?backurl:"0",
			backid: backid?backid:"0"
		}
	});
})

//肿瘤专家->>待支付
mui("#non-payment").on('click', 'li', function() {
		var orderId = this.querySelectorAll('input')[0].value;
		commomUtil.closeWebviewById("orderDetailsPay");
		var backid = document.getElementById("backcancerOrderListWebviewId").value;
		var backurl = document.getElementById("backcancerOrderListWebviewUrl").value;
		mui.openWindow({
			id: 'orderDetailsPay',
			url: "orderDetailsPay.html",
			createNew: true,
			extras: {
				orderId: orderId,
				backurl: backurl?backurl:"0",
				backid: backid?backid:"0"
			}
		});
	})
	//肿瘤专家->>待就诊
mui("#orderSee").on('click', 'li', function() {
		var orderId = this.querySelectorAll('input')[0].value;
		var backid = document.getElementById("backcancerOrderListWebviewId").value;
		var backurl = document.getElementById("backcancerOrderListWebviewUrl").value;
		mui.openWindow({
			id: 'orderDetailsConfirmed',
			url: "orderDetailsConfirmed.html",
			extras: {
				orderId: orderId,
				status: '待就诊',
				backurl: backurl?backurl:"0",
				backid: backid?backid:"0"
			}
		});
	})
	//肿瘤专家->>待评价
mui("#orderEvaluation").on('click', 'li', function() {
		var orderId = this.querySelectorAll('input')[0].value;
		commomUtil.closeWebviewById("orderDetailsEvaluate");
		var backid = document.getElementById("backcancerOrderListWebviewId").value;
		var backurl = document.getElementById("backcancerOrderListWebviewUrl").value;
		mui.openWindow({
			id: 'orderDetailsEvaluate',
			url: "orderDetailsEvaluate.html",
			createNew: true,
			extras: {
				orderId: orderId,
				backurl: backurl?backurl:"0",
				backid: backid?backid:"0"
			}
		});
	})
	//肿瘤专家->>已完成
mui("#orderFinish").on('click', 'li', function() {
	var orderId = this.querySelectorAll('input')[0].value;
	var backid = document.getElementById("backcancerOrderListWebviewId").value;
	var backurl = document.getElementById("backcancerOrderListWebviewUrl").value;
	mui.openWindow({
		id: 'orderDetailsFinish',
		url: "orderDetailsFinish.html",
		extras: {
			orderId: orderId,
			backurl: backurl?backurl:"0",
			backid: backid?backid:"0"
		}
	});
})

//慢病专家->>待支付
mui("#slow-non-payment").on('tap', 'li', function() {
		plus.webview.close(plus.webview.getWebviewById('orderDetailsPay'));
		var orderId = this.querySelectorAll('input')[0].value;
		var backurl = document.getElementById("backslowOrderListWebviewUrl").value;
		var backid = document.getElementById("backslowOrderListWebviewId").value;
		mui.openWindow({
			id: 'orderDetailsPay',
			url: "orderDetailsPay.html",
			createNew: true,
			extras: {
				orderId: orderId,
				backurl: backurl?backurl:"0",
				backid: backid?backid:"0"
			}
		});
	})
	//慢病专家->>待就诊
mui("#slow-orderSee").on('tap', 'li', function() {
		plus.webview.close(plus.webview.getWebviewById('solwOrderDetailsSee'));
		var orderId = this.querySelectorAll('input')[0].value;
		var backurl = document.getElementById("backslowOrderListWebviewUrl").value;
		var backid = document.getElementById("backslowOrderListWebviewId").value;
		mui.openWindow({
			id: 'solwOrderDetailsSee',
			url: "orderDetailsSee.html",
			extras: {
				orderId: orderId,
				status: '待就诊',
				backurl: backurl?backurl:"0",
				backid: backid?backid:"0"
			}
		});
	})
	//慢病专家->>待评价
mui("#slow-orderEvaluation").on('tap', 'li', function() {
		plus.webview.close(plus.webview.getWebviewById('slowOrderDetailsEvaluate'));
		var orderId = this.querySelectorAll('input')[0].value;
		var backurl = document.getElementById("backslowOrderListWebviewUrl").value;
		var backid = document.getElementById("backslowOrderListWebviewId").value;
		mui.openWindow({
			id: 'slowOrderDetailsEvaluate',
			url: "orderDetailsEvaluate.html",
			createNew: true,
			extras: {
				orderId: orderId,
				backurl: backurl?backurl:"0",
				backid: backid?backid:"0"
			}
		});
	})
	//慢病专家->>已完成
mui("#slow-orderFinish").on('tap', 'li', function() {
	plus.webview.close(plus.webview.getWebviewById('slowOrderDetailsFinish'));
	var orderId = this.querySelectorAll('input')[0].value;
	var backurl = document.getElementById("backslowOrderListWebviewUrl").value;
	var backid = document.getElementById("backslowOrderListWebviewId").value;
	mui.openWindow({
		id: 'slowOrderDetailsFinish',
		url: "orderDetailsFinish.html",
		extras: {
			orderId: orderId,
			backurl: backurl?backurl:"0",
			backid: backid?backid:"0"
		}
	});
})

//肿瘤专家服务投诉->>肿瘤首页
mui("#cancer").on('tap', '#refer', function() {
	mui.openWindow({
		id: 'cancerExperts',
		url: "cancerExperts.html",
	});
})

//咨询记录-待支付
mui("#consultingRecordItem1Id").on('click', 'li', function() {
	var orderId = this.querySelectorAll('input')[0].value;
	var backid = document.getElementById("backWebviewId").value;
	var backurl = document.getElementById("backWebviewUrl").value;
	//	commomUtil.closeWebviewById("payOrderFailure");
	mui.openWindow({
		id: 'payOrderFailure',
		url: "../../html/pay/payOrderFailure.html",
		//		createNew: true,
		extras: {
			backurl: backurl?backurl:"0",
			backid: backid?backid:"0",
			orderId: orderId
		}
	});
})

//咨询记录-支付评价
mui("#consultingRecordItem2Id").on('tap', 'li', function() {
	var orderId = this.querySelectorAll('input')[0].value;
	var backid = document.getElementById("backWebviewId").value;
	var backurl = document.getElementById("backWebviewUrl").value;
	commomUtil.closeWebviewById("orderEvaluation");
	mui.openWindow({
		id: 'orderEvaluation',
		url: "../../html/pay/orderEvaluation.html",
		createNew: true,
		extras: {
			backurl: backurl?backurl:"0",
			backid: backid?backid:"0",
			orderId: orderId
		}
	});
})

//咨询记录-支付完成
mui("#consultingRecordItem3Id").on('tap', 'li', function() {
		var orderId = this.querySelectorAll('input')[0].value;
		var backid = document.getElementById("backWebviewId").value;
		var backurl = document.getElementById("backWebviewUrl").value;
		commomUtil.closeWebviewById("orderFinish");
		mui.openWindow({
			id: 'orderFinish',
			url: "../../html/pay/orderFinish.html",
			createNew: true,
			extras: {
				backurl: backurl?backurl:"0",
				backid: backid?backid:"0",
				orderId: orderId
			}
		});
	})
	//mui("#indexHealthInfoCategoryID").on('tap', 'li', function() {
	//	var healthConsultationId = this.querySelectorAll('input')[0].value;
	//	mui.openWindow({
	//		id: 'indexHealthDetails',
	//		url: "indexHealthDetails.html",
	//		extras: {
	//			"healthConsultationId": healthConsultationId
	//		}
	//	});
	//})

////用药方案编辑-更新用药
//mui(".editor").on('tap', '#medicationSchemeListUlID', function() {
//	var medPlanID = this.querySelectorAll('input')[0].value;
//	mui.openWindow({
//		id: 'medicationPlanEdit',
//		url: "medicationPlanEdit.html",
//		extras: {
//			"medPlanID": medPlanID
//		}
//	});
//
//});

/*我的订单页面*/

//刷卡消费
mui(".mui-table-view-cell").on('tap', '#expense', function() {
	mui.openWindow({
		id: 'expense',
		url: 'expense.html'
	})
});
//我的订单点击家庭医生
mui(".mui-table-view-cell").on('tap', '#doctor', function() {
		plus.webview.close(plus.webview.getWebviewById("consultingRecords"));
		mui.openWindow({
			id: 'consultingRecords',
			url: "../familyDoctor/consultingRecords.html",
			extras: {
				backurl: "../me/myOrder.html",
				backid: "myOrder"
			}
		})
	})
	//我的订单点击慢病专家订单列表
mui(".mui-table-view-cell").on('tap', '#meSlowOrderList', function() {
	plus.webview.close(plus.webview.getWebviewById("slowOrderList"));
	mui.openWindow({
		id: 'slowOrderList',
		url: "../SlowExperts/slowOrderList.html",
		createNew: true,
		extras: {
			backurl: "../me/myOrder.html",
			backid: "myOrder"
		}
	});
});
//我的订单点击肿瘤专家订单列表
mui(".mui-table-view-cell").on('tap', '#meCancerOrderList', function() {
	plus.webview.close(plus.webview.getWebviewById("cancerOrderList"));
	mui.openWindow({
		id: 'cancerOrderList',
		url: "../cancerExperts/cancerOrderList.html",
		createNew: true,
		extras: {
			backurl: "../me/myOrder.html",
			backid: "myOrder"
		}
	})
})

//肿瘤专家->>我要预约
mui(".mui-content").on("tap", "#cancerExpertsmfzx", function() {
	mui.openWindow({
		id: 'freeConsultation',
		url: "freeConsultation.html"
	})
})

//预约咨询->>我要咨询
mui('.mui-bar').on('tap', '#meConsult', function() {
	mui.openWindow({
		id: 'meConsult',
		url: "meConsult.html"
	})
})

//预约咨询->>我要咨询
mui('.mui-content').on('tap', '#longWeight', function() {
		mui.openWindow({
			id: 'weight',
			url: "weight.html"
		})
	})
	/****************************************我的家人******************************************************/
	//我的家人->>健康档案
mui('#myFamily').on('tap', '.meFamily-jkda', function() {
		var familyId = this.parentNode.getAttribute('fid');
		mui.openWindow({
			id: 'healthRecords',
			url: "healthRecords.html",
			createNew: true,
			extras: {
				"accountType": 1,
				'familyId': familyId
			}
		})
	})
	//我的家人->>血糖血压
mui('#myFamily').on('tap', '.meFamily-xtxy', function() {
		var familyId = this.parentNode.getAttribute('fid');
		plus.webview.close(plus.webview.getWebviewById('healthSelfTesting'));
		mui.openWindow({
			id: 'healthSelfTesting',
			url: "../healthy/healthSelfTesting.html",
			createNew: true,
			extras: {
				"accountType": 1,
				'familyId': familyId
			}
		})
	})
	//我的家人->>用药提醒
mui('#myFamily').on('tap', '.meFamily-yytx', function() {
	plus.webview.close(plus.webview.getWebviewById('medicationManage'));
	var familyId = this.parentNode.getAttribute('fid');
	mui.openWindow({
		id: 'medicationManage',
		url: "../medication/medicationManage.html",
		createNew: true,
		extras: {
			"accountType": 1,
			"familyId": familyId,
			"isFamilyType": 1
		}
	})
})

////预约信息->>就诊人
//mui('.mui-content').on('tap', '#patient', function() {
//	mui.openWindow({
//		id: 'patient',
//		url: "patient.html",
//	})
//})

//预约信息->>优惠券
//mui('.mui-content').on('tap', '#coupons', function() {
//	mui.openWindow({
//		id: 'coupons',
//		url: "coupons.html",
//	})
//})

//2016-5-23我的订单页面新增跳转
//我的基因检测订单
mui('.mui-content').on('tap', '#meGeneticOrder', function() {
		mui.openWindow({
			id: 'meGeneticOrder',
			url: "../../html/healthy/geneticDiagnosis/geneticOrder.html",
			extras: {
				backurl: "../../me/myOrder.html",
				backid: "myOrder",
				index : 0
			}
		})
	})
	//我的疗养订单
mui('.mui-content').on('tap', '#meSpaOrder', function() {
		mui.openWindow({
			id: 'meSpaOrder',
			url: "../../html/healthy/spa/spaOrder.html",
			extras: {
				backurl: "../../me/myOrder.html",
				backid: "myOrder",
				index : 0
			}
		})
	})
	//我的体检订单
mui('.mui-content').on('tap', '#meHealthExaminationOrder', function() {
	mui.openWindow({
		id: 'meHealthExaminationOrder',
		url: "../../html/healthy/healthExamination/healthExaminationOrder.html",
		extras: {
			backurl: "../../me/myOrder.html",
			backid: "myOrder",
			index : 0
		}
	});
});

	//我的消息列表
mui('.mui-bar').on('tap', '#btn-msg', function() {
	console.log('1');
	mui.openWindow({
		id: 'message',
		url: "message/message.html",
	});
});


	//对症寻药
mui('.mui-content').on('tap', '#DrugSafety', function() {
	mui.openWindow({
		id: 'symptomaticMedicine',
		url: "medication/symptomaticMedicine/symptomaticMedicine.html",
	});
});