mui.plusReady(function() {
	addressManagement.init();
})

mui('.mui-content').on('tap', 'li', function() {
	var addid = this.getAttribute('addid');
	var Addr1 = this.querySelector('.ellipsis').innerText;
	var Addr2 = this.getAttribute('Addr2');
	var ConsigneeName = this.getAttribute('ConsigneeName');
	var Mobile = this.getAttribute('Mobile');
	var IsDefault = this.getAttribute('IsDefault');
	mui.openWindow({
		id: 'newAddress',
		url: "newAddress.html",
		createNew: true,
		extras: {
			"addid": addid,
			'Addr1': Addr1,
			'Addr2': Addr2,
			'ConsigneeName': ConsigneeName,
			'Mobile': Mobile,
			'IsDefault': IsDefault
		}
	});
})

mui('#Management').on('tap', '.mui-btn', function() {
	var addid = this.parentNode.parentNode.getAttribute('addid');
	var self = this;
	addressManagement.del(self, addid);
})

var addressManagement = {
	init: function() {
		var url = 'Profile/AddresList';
		jyapp.getApi({
			method: url,
			onsuccess: function(data) {
				//				console.log('-' + JSON.stringify(data))
				if (data.code == 1) {
					var oManagement = document.getElementById("Management");
					var ohtml = '';
					var Addr1, Addr2 = [];
					for (var i = 0; i < data.data.length; i++) {
						if (data.data[i].Addr) {
							Addr1 = data.data[i].Addr.split("|")[0];
							Addr2 = data.data[i].Addr.split("|")[1];
						}
						if (data.data[i].IsDefault == 1) {
							ohtml += '<li class="mui-table-view-cell active" Mobile=' + data.data[i].Mobile + ' ConsigneeName=' + data.data[i].ConsigneeName + ' IsDefault=' + data.data[i].IsDefault + ' Addr2=' + Addr2 + ' Addr1=' + Addr1 + ' addid=' + data.data[i].ID + '>';
						} else {
							ohtml += '<li class="mui-table-view-cell" Mobile=' + data.data[i].Mobile + ' ConsigneeName=' + data.data[i].ConsigneeName + ' IsDefault=' + data.data[i].IsDefault + ' Addr2=' + Addr2 + ' Addr1=' + Addr1 + ' addid=' + data.data[i].ID + '>';

						}
						ohtml += '<div class="mui-slider-right mui-disabled">';
						ohtml += '<a class="mui-btn mui-btn-red">删除</a>';
						ohtml += '</div>';
						ohtml += '<div class="mui-slider-handle">';
						ohtml += '<a href="#" class="">';
						ohtml += '<h3>' + data.data[i].ConsigneeName + '</h3>';
						ohtml += '<p class="ellipsis">' + Addr1 + '</p>';
						ohtml += '<i></i>';
						ohtml += '</a>';
						ohtml += '</div>';
						ohtml += '</li>';
					}
					oManagement.innerHTML = ohtml;
				}
			},
			onerror: function(e) {
				mui.toast(e.msg);
			}
		});
	},
	del: function(self, addid) {
		var li = self.parentNode.parentNode;
		var btnArray = ['确定', '取消'];
		var url = 'Profile/AddresDelete';
		var data = 'addresId=' + addid;
		mui.confirm('确定要删除该地址？', '健医宝', btnArray, function(e) {
			if (e.index == 0) {
				li.parentNode.removeChild(li);
				jyapp.getApi({
					method: url,
					data: data,
					onsuccess: function(data) {
						//						console.log('1-' + JSON.stringify(data))
						if (data.code == 1) {
							mui.toast(data.msg);
						}
					},
					onerror: function(e) {
						//						console.log('--' + JSON.stringify(e))
						mui.toast(e.msg);
					}
				});
			} else {
				setTimeout(function() {
					mui.swipeoutClose(li);
				}, 0);
			}
		})
	}
}