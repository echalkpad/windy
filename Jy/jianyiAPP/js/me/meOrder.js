mui.plusReady(function() {
	getOrder(3);
})

function getOrder(type) {
	var data = 'orderType='+type+'&pageIndex=1&pageSize=10';
//	console.log(data);
	jyapp.getApi({
		method: 'DoctorOnline/OrderList',
		data: data,
		onsuccess: function(data) {
//			console.log(JSON.stringify(data));
		},
		onerror: function(e) {
			alert(e);
		}
	});
//	alert(1);
}