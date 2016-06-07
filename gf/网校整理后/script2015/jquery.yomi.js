setTimeout("count_down()",1000);//设置每一秒调用一次倒计时函数
//获取容器元素 var times_container = document.getElementById("times_container");
//window.alert(document.getElementById("Live_Time").innerHTML);
//根据天，时，分，秒的ID找到相对应的元素

var time_day = document.getElementById("yomiday");
var time_dayB = document.getElementById("yomidayB");

var time_hour = document.getElementById("yomihour");
var time_hourB = document.getElementById("yomihourB");

var time_minute = document.getElementById("yomimin");
var time_minuteB = document.getElementById("yomiminB");

var time_second = document.getElementById("yomisec");
var time_secondB = document.getElementById("yomisecB");

var time_end = new Date(document.getElementById("Live_Time").innerHTML);  // 设定活动结束结束时间

time_end = time_end.getTime();

 

//定义倒计时函数

function count_down(){

   var time_now = new Date();  // 获取当前时间

   time_now = time_now.getTime();

   var time_distance = time_end - time_now;  // 时间差：活动结束时间减去当前时间  

   var int_day, int_hour, int_minute, int_second;  

 if(time_distance >= 0){  

     // 相减的差数换算成天数  

     int_day = Math.floor(time_distance/86400000)

     time_distance -= int_day * 86400000;

 

 // 相减的差数换算成小时

        int_hour = Math.floor(time_distance/3600000)

        time_distance -= int_hour * 3600000; 

 

// 相减的差数换算成分钟  

     int_minute = Math.floor(time_distance/60000)   

    time_distance -= int_minute * 60000;

 

 // 相减的差数换算成秒数 

      int_second = Math.floor(time_distance/1000)   

 

    // 判断小时小于10时，前面加0进行占位

        if(int_hour < 10)

        int_hour = "0" + int_hour; 

 

// 判断分钟小于10时，前面加0进行占位     

  if(int_minute < 10)   

   int_minute = "0" + int_minute; 

 

 // 判断秒数小于10时，前面加0进行占位

       if(int_second < 10)

       int_second = "0" + int_second;      

 

// 显示倒计时效果      

time_day.innerHTML = int_day;
time_dayB.innerHTML = int_day;

time_hour.innerHTML = int_hour;
time_hourB.innerHTML = int_hour;

time_minute.innerHTML = int_minute;
time_minuteB.innerHTML = int_minute;

time_second.innerHTML = int_second;
time_secondB.innerHTML = int_second;

setTimeout("count_down()",1000);

    }else{

//如果您想在活动结束后提示什么信息，就写在下边的单引号内

 times_container.innerHTML='对不起，活动结束，倒计时完毕!!';

      }

}