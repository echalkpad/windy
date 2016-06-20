// 设置系统状态栏背景
if (window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
mui.init({
  preloadPages:[
    {
      url:'html/main.html',
      id:'main'
    }
  ]
});
function plusReady() {
	plus.navigator.setStatusBarBackground("#00B6F3");
	plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackTranslucent');
	mui('body').on('tap', '#open', function() {
		mui.openWindow({
			url: 'html/main.html',
			id: 'main',
			createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		})
	})
}