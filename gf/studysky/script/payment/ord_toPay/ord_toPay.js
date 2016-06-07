$(function(){
    $(".method .list").each(function(i){
        console.log(i);
        $(this).on("click",function(){
            $(".method .list").removeClass("active");
            $(this).addClass("active");
        })
    })
})