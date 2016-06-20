document.addEventListener("plusready", function() {
	mefamily.isGoMeFamily();
});
var mefamily = {
	init: function() {
		var url = 'profile/FamilyListRe';
		jyapp.getApi({
			method: url,
			onsuccess: function(data) {
				//				console.log(JSON.stringify(data));
				var ohtml = document.getElementById("myFamily");
				var odiv = '';
				for (var i = 0, len = data.data.length; i < len; i++) {
					odiv += '<li class="mui-table-view-cell border-b" style="overflow: hidden;">';
					odiv += '<section class="myFamily-t" fid=' + data.data[i].family.ID + '>';
					odiv += '<img class="myFamily-t-img" src=' + data.data[i].family.Head + ' onerror="" id="mePic" />';
					odiv += '<div class="myFamily-t-div">';
					odiv += '<span></span>';
					odiv += '<h2>' + data.data[i].family.Name + '</h2>';
					odiv += '<p>' + data.data[i].family.Mobile + '</p>';
					odiv += '</div>';
					odiv += '<a href="" class="delFamily" style="margin-left: 10px;"><img src="../../img/me/btn_delete.png" /></a>';
					odiv += '<a href="" class="updateFamily"><img src="../../img/me/btn_bianji.png" /></a>';
					odiv += '</section>';
					odiv += '<section class="myFamily-c">';
					odiv += '<ul class="mui-table-view">';
					odiv += '<li class="mui-table-view-cell">';
					odiv += '<h2>' + data.data[i].healtyValue.diastolicPressure + '</h2>';
					odiv += '<h3>舒张压</h3>';
					odiv += '<p>mmHg</p>';
					odiv += '</li>';
					odiv += '<li class="mui-table-view-cell">';
					odiv += '<h2>' + data.data[i].healtyValue.systolicPressure + '</h2>';
					odiv += '<h3>收缩压</h3>';
					odiv += '<p>mmHg</p>';
					odiv += '</li>';
					odiv += '<li class="mui-table-view-cell">';
					odiv += '<h2>' + data.data[i].healtyValue.bloodSugarValue + '</h2>';
					odiv += '<h3>血糖</h3>';
					odiv += '<p>mmHg</p>';
					odiv += '</li>';
					odiv += '<li class="mui-table-view-cell">';
					odiv += '<h2>0</h2>';
					odiv += '<h3>计步</h3>';
					odiv += '<p>步</p>';
					odiv += '</li>';
					odiv += '</ul>';
					odiv += '</section>';
					odiv += '<section class="myFamily-b" fid=' + data.data[i].family.ID + '>';
					odiv += '<a href="" class="mui-table-view-cell meFamily-jkda"><img src="../../img/me/icon_dangan.png" />';
					odiv += '<p>健康档案</p>';
					odiv += '</a>';
					odiv += '<a href="" class="mui-table-view-cell meFamily-xtxy"><img src="../../img/me/icon_xuetang.png" alt="" />';
					odiv += '<p>血糖血压</p>';
					odiv += '</a>';
					odiv += '<a href="" class="mui-table-view-cell meFamily-yytx"><img src="../../img/me/icon_yongyao.png" alt="" />';
					odiv += '<p>用药提醒</p>';
					odiv += '</a>';
					odiv += '</section>';
					odiv += '</li>';
				}

				ohtml.innerHTML = odiv;

				//				var tpl = document.getElementById('tpl').innerHTML;
				//				document.getElementById('myFamily').innerHTML = juicer(tpl, data);
			},
			onerror: function(e) {
				mui.toast(e.msg);
			}
		})
	},
	indexFamilyDoctorBack: function() {
		var mianPage = plus.webview.getLaunchWebview();
		mui.openWindow({
			id: mianPage.id,
			url: mianPage.uri,
			extras: {
				index: 4
			}
		});
	},
	isGoMeFamily: function() {
		var odiv1 = document.getElementById("familyopen");
		var odiv2 = document.getElementById("familyclose");
		odiv1.style.display = 'none';
		odiv2.style.display = 'none';
		document.getElementById("updateFamily").style.display = 'none';
		var url = 'profile/family';
		jyapp.getApi({
			method: url,
			onsuccess: function(data) {
				if (data.data == null) {
					odiv2.style.display = 'block';
				} else {
					document.getElementById("updateFamily").style.display = 'block';
					odiv1.style.display = 'block';
				}
			},
			onerror: function(e) {
				mui.toast(e);
			}
		});
		mefamily.init();
	}
};

//删除家人
mui('.mui-table-view').on('tap', '.delFamily', function() {
		var self = this;
		var btnArray = ['取消', '确定'];
		var url = 'profile/DelFamily';
		var data = 'fid=' + parseInt(self.parentNode.getAttribute('fid'));
		mui.confirm('确定要删除您的家人？', '健医宝', btnArray, function(e) {
			if (e.index == 1) {
				//				console.log(url, data)
				jyapp.getApi({
					method: url,
					data: data,
					onsuccess: function(data) {
						//						console.log(JSON.stringify(data))
						self.parentNode.parentNode.remove();
						mui.toast('删除成功');
						document.getElementById("updateFamily").innerText='编辑';						
						mefamily.isGoMeFamily();
					},
					onerror: function(e) {
						//						console.log(JSON.stringify(e))
						mui.toast(e.msg);
					}
				})
			}
		})
	})
	//修改家人
mui('.mui-table-view').on('tap', '.updateFamily', function() {
		var fid = this.parentNode.getAttribute('fid');
		mui.openWindow({
			id: 'addFamily',
			url: "addFamily.html",
			createNew: true,
			extras: {
				'fid': fid
			}
		})
	})
	//编辑家人
document.getElementById("updateFamily").addEventListener('tap', function() {
	var obtnDel = document.getElementById('myFamily').querySelectorAll(".delFamily");
	var obtnUpdate = document.getElementById('myFamily').querySelectorAll(".updateFamily");
	if (this.innerText == '编辑') {
		this.innerText = '完成';
		for (var i = 0, len = obtnDel.length; i < len; i++) {
			obtnDel[i].style.display = 'inline';
			obtnUpdate[i].style.display = 'none';
		}
	} else {
		this.innerText = '编辑';
		for (var i = 0, len = obtnDel.length; i < len; i++) {
			obtnDel[i].style.display = 'none';
			obtnUpdate[i].style.display = 'inline';
		}
	}
	var old_back = mui.back;
	mui.back = function() {
		if (document.getElementById("updateFamily").innerText == '完成') {
			document.getElementById("updateFamily").innerText = '编辑';
			for (var i = 0, len = obtnDel.length; i < len; i++) {
				obtnDel[i].style.display = 'none';
				obtnUpdate[i].style.display = 'inline';
			}
		} else {
			old_back();
		}
	}
})

//绑定回退事件
document.getElementById("indexFamilyDoctorBackId").addEventListener("tap", mefamily.indexFamilyDoctorBack);
window.addEventListener("newIdsmeFamilyBackCell", function(event) {
	mefamily.isGoMeFamily();
	//初始化页面数据
//	mefamily.init();
});