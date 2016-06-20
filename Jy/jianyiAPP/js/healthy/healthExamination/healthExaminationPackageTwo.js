
//检测项目
mui('.mui-table-view').on('tap', '#healthExaminationPackageTwoTestItems', function() {
		mui.openWindow({
			id: 'healthExaminationPackageTwoTestItems',
			url: "healthExaminationPackageTwoTestItems.html"
		})
	})
	//常见问题
mui('.mui-table-view').on('tap', '#healthExaminationPackageTwoProblems', function() {
		mui.openWindow({
			id: 'healthExaminationPackageProblems',
			url: "healthExaminationPackageProblems.html"
		})
	})
	//历史评价
mui('.mui-table-view').on('tap', '#healthExaminationPackageTwoEvaluation', function() {
		mui.openWindow({
			id: 'healthExaminationPackageEvaluation',
			url: "healthExaminationPackageEvaluation.html"
		})
	})
