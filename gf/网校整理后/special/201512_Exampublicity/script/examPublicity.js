/**
 * javascript
 * @authors songlingxi
 * @date    2015-11-30 13:19:13
 */




	window.onload=init;
	function init(){

		var menu=document.getElementById("menuList");
		var ps=menu.getElementsByTagName("p");
		var uls=menu.getElementsByTagName("article");
		var iss=menu.getElementsByTagName('i');
		var ems=menu.getElementsByTagName('em');
		for( var i=0;i<uls.length;i++){
		(function(){
var po=i;
ps[po].onclick=function(){
for(var k=0;k<uls.length;k++){
if(uls[k].style.display=="block"){

	                    uls[k].style.display="none";
						iss[k].style.display="block";
						ems[k].style.display="none";
}
}
             uls[po].style.display="block";
				ems[po].style.display="block";
				iss[po].style.display="none";

}
})(i);
		}


		var menu2=document.getElementById("menuList2");
		var ps2=menu2.getElementsByTagName("p");
		var uls2=menu2.getElementsByTagName("article");
		var iss2=menu2.getElementsByTagName('i');
		var ems2=menu2.getElementsByTagName('em');
		for( var i=0;i<uls2.length;i++){
		(function(){
var po=i;
ps2[po].onclick=function(){
for(var k=0;k<uls2.length;k++){
if(uls2[k].style.display=="block"){

	                    uls2[k].style.display="none";
						iss2[k].style.display="block";
						ems2[k].style.display="none";
}
}
                uls2[po].style.display="block";
				ems2[po].style.display="block";
				iss2[po].style.display="none";

}
})(i);
		}




		var menu3=document.getElementById("menuList3");
		var ps3=menu3.getElementsByTagName("p");
		var uls3=menu3.getElementsByTagName("article");
		var iss3=menu3.getElementsByTagName('i');
		var ems3=menu3.getElementsByTagName('em');
		for( var i=0;i<uls3.length;i++){
		(function(){
var po=i;
ps3[po].onclick=function(){
for(var k=0;k<uls3.length;k++){
if(uls3[k].style.display=="block"){

	                    uls3[k].style.display="none";
						iss3[k].style.display="block";
						ems3[k].style.display="none";
}
}
                uls3[po].style.display="block";
				ems3[po].style.display="block";
				iss3[po].style.display="none";

}
})(i);
}


	}

