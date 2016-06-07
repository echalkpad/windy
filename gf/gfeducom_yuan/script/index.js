

/*index_primary*/


$(function(){
    function autoPlay(){
        var w=document.body.clientWidth;
        var h=$(window).height();
		var boxh=h-50;
        $('.index_main').css('height',h-50);
        $('').css('height',h-50);
        $('.index_projects,.index_primary').css('height',h-50);

		//四分之一盒子
		$('.indexbox').css('margin-top',boxh/2-60);
		//项目下面的盒子
		//$('.belowbox').css('display','none');
		//鼠标移入效果.animate({height:boxh,marginTop:0}, "slow");
        if(w>920){
            $('.index_primary>article').css('height',boxh/2-60);
        }

		$('.indexbox').hover(function(){
			$(this).css({height:boxh,marginTop:0});
			$(this).children('.abovebox').css('height',boxh/2-60);
            $(this).children('.belowbox').css('height',boxh/2+60);
		},function(){
			$(this).css({height:'120px',marginTop:boxh/2-60});
			$('.abovebox').css('height','120px');
		})
		if(w<=1439){
            $('.belowbox>article').css('height',boxh/8);
            $('.indexpro_financial').hover(function(){
              var H=$('.indexpro_financial .belowbox section li img').height();
              $('.indexpro_financial .belowbox h3').css('line-height',H+'px');
            })
        }else if(w<=1600){
            $('.belowbox>article').css('height',boxh/8);
            $('.indexpro_financial').hover(function(){
              $('.indexpro_financial .belowbox h3').css('line-height',20);
            })
        }else if(w<=1919){
            $('.belowbox>article').css('height',boxh/7);
            $('.indexpro_financial').hover(function(){
              $('.indexpro_financial .belowbox h3').css('line-height',20);
            })
        }else if(w<=2560){
            $('.belowbox>article').css('height',boxh/6);
            $('.indexpro_financial').hover(function(){
              $('.indexpro_financial .belowbox h3').css('line-height',20);
            })
        }else{
            $('.belowbox>article').css('height',4/21*boxh);
            $('.indexpro_financial').hover(function(){
              $('.indexpro_financial .belowbox h3').css('line-height',20);
            })
        }
        var h1=$('.index_main').height();

        /*让banner的图片宽度始终等于左侧总的宽度*/
        var w1=$('.index_primary').width();
        $('.bdIndex li img').width(w1);
        if(w<600){
            $('.bdIndex img').height(2/5*w1);
        }else{
             $('.bdIndex img').height(1/2*w1);
        }


        // 公开课部分滚动
        var timer=null;
        var num=0;
        if(w<1366){
            timer=setInterval(function(){
                num=num-30;
                if (num<-30) {
                    num=0;
                };
                $('.indexpro_corporate .belowbox section p').css({top:num})
            },3000);
        }else if(w<1920){
            timer=setInterval(function(){
                num=num-40;
                if (num<-40) {
                    num=0;
                };
                $('.indexpro_corporate .belowbox section p').css({top:num})
            },3000);
        }else{
            timer=setInterval(function(){
                num=num-50;
                if (num<-50) {
                    num=0;
                };
                $('.indexpro_corporate .belowbox section p').css({top:num})
            },3000);
        }



        /*金程考研的列表高度*/
        $('.indexpro_graduate').mouseover(function(event) {
           var imgH=$('.indexpro_graduate .belowbox li img').height();
            $('.indexpro_graduate .belowbox li').css({'height':imgH});
            
           setTimeOut(function(){
             $('.indexpro_graduate .belowbox li').each(function(i){
                var h3H = $(this).find('h3:first()').outerHeight(true);
                var divH = $(this).find('img:first()').height();
                //alert(h3H);
                console.log(divH);
                var $p = $("p", $(this)).eq(0);
                while ($p.outerHeight() > divH-h3H) {
                    $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
                };
            });
         },500)
        });



             



    }
    autoPlay();

    $(window).resize(function(){
        autoPlay();
    });




        //这里是移动端轮翻图的JS
    TouchSlide({
        delayTime:1500,
        interTime:5000,
        slideCell:"#slideBoxIndex",
        titCell:".hdIndex ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell:".bdIndex ul",
        effect:"leftLoop",
        autoPage:true,//自动分页
        autoPlay:true //自动播放
    });


});

