/**
 * Created by sr01-02 on 2017-09-19.
 */
$(document).ready(function () {
    imageSlide.init();
    $(".select_name").on("click",function(e){
        e.preventDefault();
        var idx = $(this).index();
        $(".eg > div").hide();
        $(".eg > div").eq(idx).show();
    });

    $(".btn_tip").on("click",function(){
        $(".tip_con").toggle()
    });
});