function getnum(e) {
	if (e.srcElement.textLength > 200) {
		plus.nativeUI.alert('请填写性别，年龄，症状,最少10字，最多200字','','健医宝','确认');
		return false;
	}
	var num = document.getElementById("textarea-num");
	num.innerHTML = e.srcElement.textLength;

}