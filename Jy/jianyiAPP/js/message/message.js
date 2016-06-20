//公告通知列表
/*mui('.mui-content').on('tap','#noticeInform',function(){
	mui.openWindow({
		id:'',
		url:'',
	})
})*/
document.getElementById("noticeInform").addEventListener('tap', function() {
	plus.nativeUI.alert("敬请期待！", function() {}, "健医宝", "好的");
});
//订单通知列表
mui('.mui-content').on('tap','#orderInform',function(){
	mui.openWindow({
		id:'orderInform',
		url:'orderInform.html',
	})
})
