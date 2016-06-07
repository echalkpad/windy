$(function() {

	//手藏
	var scn = 0;
	$('.shoucang a').click(function(){
		scn++;
		if(scn%2){
			$(this).css('color','#17b3f1');
		} else{
			$(this).css('color','#999');
		}
	})
	
	//资料索取
	$(window).scroll(function(){
     var h = $(".weixin").offset().top+133;
     if($(this).scrollTop()>=h){
        $("#msgsq").css({'position':'fixed','top':'20px'});
     } else {
        $("#msgsq").css({'position':'static','top':'auto'});
     }
   });
	
	//评论信息
	$('#submit').live('click',function(){
		
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth();
		var d = date.getDay();
		var time = date.getDate();
		var hh = date.getHours();
		var mm = date.getMinutes();
		var ss = date.getSeconds();
		
		if($(this).parent().parent().children().prev('textarea').val()==''){
			return false;
		}
		
   		$('.comment').children('h3').after($("<dl><dt><img src='images/person.jpg' alt='个人头像'/></dt><dd><span class='floor'>1F</span>SDB_FREJA：<span class='time'>"+y+'-'+m+'-'+d+' '+'  '+hh+':'+mm+':'+ss+"</span></dd><dd>"+$(this).parent().parent().children('textarea').val()+"<em><a class='replaybtn' href='javacript:;'>回复</a>|<a class='zan' href='javascript:;'>赞同(<span>12</span>)</a></em> </dd></dl>"))
	})
	
	//回复
	$('.replaybtn').live('click',function(){
		if($(this).parent().parent().children('textarea').length>0){
			return false;
		}
		$(this).parent().after($("<textarea class='textarea' rows='2'></textarea><p>还能输入<i>160</i>个文字<em><a class='refbtn' href='javascript:;'>确认</a><a class='closebtn' href='javascript:;'>取消</a></em></p>"));
	})
	$('.closebtn').live('click',function(){
		$(this).parent().parent().parent().children('textarea').remove();
		$(this).parent().parent().remove();
	})
	
	$('.refbtn').live('click',function(){

		if($(this).parent().parent().parent().children().prev('textarea').val()==''){
			return false;
		}
		
		if($(this).parent().parent().parent().children('section').length>0){
			$(this).parent().parent().parent().children('section').children('i').after($("<dl><dt><a href='javascript:;'>专注100年</a>回复&nbsp;&nbsp;说：</dt><dd>"+$('.textarea').val()+"</dd></dl>"));		
		} else{
			$(this).parent().parent().after($("<section><i></i><dl><dt><a href='javascript:;'>专注100年</a>回复&nbsp;&nbsp;说：</dt><dd>"+$('.textarea').val()+"</dd></dl></section>"));		

		}
		$(this).parent().parent().parent().children('textarea').remove();
		$(this).parent().parent().remove();	

	})
	
	//点赞
	var clicknum = 0 ;
	$('.zan').live('click',function(){
		var zanN = parseInt($(this).children().text());
		clicknum++;
		if(clicknum%2 > 0) {
			var zanN = parseInt($(this).children().text());
			$(this).css('color','#17b3f1');
			++zanN;
		} else {
			var zanN = parseInt($(this).children().text());
			$(this).css('color','#999');
			--zanN;
		}
		$(this).children().text(zanN);
	})
});