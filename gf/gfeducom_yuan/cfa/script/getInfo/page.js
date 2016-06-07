$(function(){

	$(".name input").focus(function(){
		$(".reg .name_tip p").css("display","none");
	})

	$(".phone input").focus(function(){
		$(".reg .phone_tip p").css("display","none");
	})

	$(".email input").focus(function(){
		$(".reg .email_tip p").css("display","none");
	})
	
	$("#closebox").click(function(){
		$(".popbox").css("display","none");
	})

})


	function isMobilePhone(value) {
	    if (value.search(/^1[3|4|5|8|7][0-9]\d{8}$/) == -1){
	        return false;
	    }else{
	        return true;
	    }
	}
	function isEmail(value) {
	    if(value.search(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) == -1)
	        return false;
	    else
	        return true;
	}
	