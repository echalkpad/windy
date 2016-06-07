$(function(){

	$('#menu').mmenu();

	$(".list li").toggle(function(){
		$(this).addClass("active");
	},function(){
		$(this).removeClass("active");
	});

	$(".keep").on("click",function(){
		if($(".list li").hasClass("active")){
			$(".success_tip").show();
			$(".keep").attr("disabled",true);
			setTimeout(function(){
				$(".success_tip").hide()
				$(".keep").attr("disabled",false);
			},2000);
		}else{
			alert("至少选择一项");
		}
	})

})