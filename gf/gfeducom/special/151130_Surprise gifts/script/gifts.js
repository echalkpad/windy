$(function(){
	
	var winW = $(window).width();
	if(winW<768){
		var sH = $('.wmsg').width();
		$('.secli').height(sH*3);
		$(window).resize(function(){
			var sH = $('.wmsg').width();
			$('.secli').height(sH*3);		
		})		
	}else{

		var sH = $('.wmsg').width();

		$('.secli').height($('.wmsg li:first-child').width());
		$(window).resize(function(){
			var sH = $('.wmsg').width();
			$('.secli').height($('.wmsg li:first-child').width());
		})
	}


	$(window).resize(function(){
		var winW = $(window).width();
		if(winW<768){
			var sH = $('.wmsg').width();
			$('.secli').height(sH*3);
			$(window).resize(function(){
				var sH = $('.wmsg').width();
				$('.secli').height(sH*3);		
			})		
		}else{

			var sH = $('.wmsg').width();

			$('.secli').height($('.wmsg li:first-child').width());
			$(window).resize(function(){
				var sH = $('.wmsg').width();
				$('.secli').height($('.wmsg li:first-child').width());
			})
		}
	})

})

//抽奖
var lottery={
	index:-1,	//当前转动到哪个位置，起点位置
	count:0,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	speed:20,	//初始转动速度
	times:0,	//转动次数
	cycle:30,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	init:function(id){
		if ($("#"+id).find(".lottery-unit").length>0) {
			$lottery = $("#"+id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find(".lottery-unit-"+this.index).addClass("activei");
		};
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(".lottery-unit-"+index).removeClass("activei");
		index += 1;
		if (index>count-1) {
			index = 0;
		};
		
		$(lottery).find(".lottery-unit-"+index).addClass("activei");
		this.index=index;
		return false;
	},
	stop:function(index){
		this.prize=2;
	//	this.prize=index;
		return false;
	}
};

//var number = 2;

function roll(){
	lottery.times += 1;
	lottery.roll();
	if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize=2;
		lottery.times=0;
		click=false;
	}else{
		if (lottery.times<lottery.cycle) {
			lottery.speed -= 10;
		}else if(lottery.times==lottery.cycle) {
		//	var index = 2;   
			var rand = Math.random()*(lottery.count)|0;
			var rand3 = rand*3;
		//	console.log(rand);
			if(rand3!=0){
				rand3 = rand3-1;
			}else{
				rand3 = 16;
			}
			var index = (rand3<13)? rand3:2;
			//console.log('index:'+index);
		//	number = index;
			lottery.prize = parseInt(index);		
		}else{
			if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}
		if (lottery.speed<40) {
			lottery.speed=40;
		};
		lottery.timer = setTimeout(roll,lottery.speed);
	}
	return false;
}

var click=false;

window.onload=function(){
	lottery.init('lottery');
	$("#btnjp").click(function(){
		if (click) {
			return false;
		}else{
			lottery.speed=100;
			roll();
			click=true;
			return false;
		}
	});
};

//倒计时
  var currentDate = new Date();
  var strEndTime = "2015/10/8";
  var EndTime=new Date(strEndTime);
  
  var days= EndTime - currentDate; 
  EndTimeMsg = parseInt(days / 1000);

  function show() {
	d = Math.floor(EndTimeMsg / 60 / 60 / 24);  
    h = Math.floor(EndTimeMsg /60/60 - (24*d));
    m = Math.floor(EndTimeMsg/60 - (24*60*d) - (60*h));
    s = Math.floor(EndTimeMsg - (24*60*60*d) - (60*60*h) - (60*m));   
    EndTimeMsg--;
    
    $('#ds').attr('src',"images/"+parseInt(d/10)+".png")
    $('#df').attr('src',"images/"+parseInt(d%10)+".png")
    $('#hs').attr('src',"images/"+parseInt(h/10)+".png")
    $('#hf').attr('src',"images/"+parseInt(h%10)+".png")
    $('#ms').attr('src',"images/"+parseInt(m/10)+".png")
    $('#mf').attr('src',"images/"+parseInt(m%10)+".png")
    $('#ss').attr('src',"images/"+parseInt(s/10)+".png")
    $('#sf').attr('src',"images/"+parseInt(s%10)+".png")
    
    if (EndTimeMsg < 0)
    {
        
    $('#ds').attr('src',"images/"+0+".png")
    $('#df').attr('src',"images/"+0+".png")
    $('#hs').attr('src',"images/"+0+".png")
    $('#hf').attr('src',"images/"+0+".png")
    $('#ms').attr('src',"images/"+0+".png")
    $('#mf').attr('src',"images/"+0+".png")
    $('#ss').attr('src',"images/"+0+".png")
    $('#sf').attr('src',"images/"+0+".png")
    }
  }
  setInterval("show()", 1000)

