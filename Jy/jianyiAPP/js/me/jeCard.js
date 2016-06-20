mui.plusReady(function() {
	var newDate = localStorage.getItem('oneInfo');
	var card_balance = document.getElementById("card_balance"); //账户余额
	var bonus_total = document.getElementById("bonus_total"); //红包金额
	var policy_balance = document.getElementById("policy_balance"); //保单金额

	jyapp.getApi({
		method: 'Profile/CardInfo',
		onsuccess:function(data) {
			card_balance.innerText = JSON.stringify(data.data.policys[0].balance);
			bonus_total.innerText = JSON.parse(newDate).bonus_total;
			policy_balance.innerText = JSON.stringify(data.data.policys[0].recharge);
		},
		onerror: function(e) {
			alert(e);
		}
	});
})