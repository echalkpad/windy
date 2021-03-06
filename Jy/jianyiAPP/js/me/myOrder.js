mui.plusReady(function() {
	myOrder.init();
})

var myOrder = {
	init: function() {
		var url = 'Profile/OrderRecordSummariz';
		jyapp.getApi({
			method: url,
			onsuccess: function(data) {
				console.log(JSON.stringify(data));
				document.getElementById("docOnlin1").innerText = data.data.docOnlin.docOnlin1;
				document.getElementById("docOnlin2").innerText = data.data.docOnlin.docOnlin2;
				document.getElementById("treat1").innerText = data.data.treat.treat1;
				document.getElementById("treat2").innerText = data.data.treat.treat2;
				document.getElementById("treat3").innerText = data.data.treat.treat3;
				document.getElementById("tumour1").innerText = data.data.tumour.tumour1;
				document.getElementById("tumour2").innerText = data.data.tumour.tumour2;
				document.getElementById("tumour3").innerText = data.data.tumour.tumour3;
				document.getElementById("tumour4").innerText = data.data.tumour.tumour4;
				document.getElementById("gene1").innerText = data.data.gene.gene1;
				document.getElementById("gene2").innerText = data.data.gene.gene2;
				document.getElementById("gene3").innerText = data.data.gene.gene3;
				document.getElementById("gene4").innerText = data.data.gene.gene4;
				//				document.getElementById("healthExc1").innerText = data.data.healthExc.healthExc1;
				document.getElementById("healthExc2").innerText = data.data.conval.conval2;
				document.getElementById("healthExc3").innerText = data.data.conval.conval3;
				document.getElementById("healthExc4").innerText = data.data.conval.conval4;
				document.getElementById("conval1").innerText = data.data.healthExc.healthExc1;
				document.getElementById("conval2").innerText = data.data.healthExc.healthExc2;
				document.getElementById("conval3").innerText = data.data.healthExc.healthExc3;
				document.getElementById("conval4").innerText = data.data.healthExc.healthExc4;
				//				console.log(document.getElementById("gene1").innerText);
			},
			onerror: function(e) {
				mui.toast(e.msg);
			}
		});
	},
	myOrderBackCell: function() {
		var mianPage = plus.webview.getLaunchWebview();
		mianPage.show();
		mui.openWindow({
			id: mianPage.id,
			url: mianPage.uri,
			extras: {
				index: 4
			}
		});
	}
}

//绑定回退事件

document.getElementById("myOrderBackCellId").addEventListener("tap",myOrder.myOrderBackCell);
mui.back = function(e){
	myOrder.myOrderBackCell();
}
window.addEventListener("newidsMyOrder",function(event){
	myOrder.init();
});

