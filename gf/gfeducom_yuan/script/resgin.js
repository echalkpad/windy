// JavaScript Document


/*-------注册验证-----------*/
$().ready(function() {
	 $("#signupForm").validate({
		rules: {
			username:{
				required: true,
				},
			telphone:{
				required: true,
				rangelength:[11,11],
				digits: "只能输入整数"
				},
			password: {
				required: true,
				rangelength:[8,20]
				},
			email: {
				required: true,
				email:$("#email").val()
				},
			confirm_password: {
				required: true,
				equalTo: "#password",   
				rangelength:[8,20]
				}
			},
			messages: {
				username:{
					required: "用户名不能为空",
					rangelength: jQuery.format("用户名不能为空"),
				},
				telphone:{
					required: "请输入手机号",
					rangelength: jQuery.format("请输入正确的手机号"),
				},
				password: {
					required: "请输入密码",
					rangelength: jQuery.format("密码在8~20个字符之间"),
				},
				email: {
					required: "请输入邮箱",
					rangelength: jQuery.format("请输入正确的邮箱")
				},
				confirm_password: {
				required: "请输入确认密码",
				rangelength: jQuery.format("密码在8~20个字符之间"),
				equalTo: "两次输入密码不一致"
			}
		}
	});
});
