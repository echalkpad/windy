$(document).ready(function(){
     window_height = $(window).height();
     wh = window_height-50-295+'px';
    $('.sucontent').css('height',wh);
    $('.sucontent').css('min-height',380+'px');
    $(window).resize(function() {
        window_height = $(window).height();
        wh = window_height-50-295+'px';
        $('.sucontent').css('height',wh);
        $('.sucontent').css('min-height',380+'px');
    })

})