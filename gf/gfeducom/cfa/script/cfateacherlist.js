// JavaScript Document
$(function(){
	$('.sbtbox').hide();
	
	$('#sidebtn').on('click',function(){
		$('.sbtbox').show();
	});
	$('#close').on('click',function(){
		$('.sbtbox').hide();	
	})
});


