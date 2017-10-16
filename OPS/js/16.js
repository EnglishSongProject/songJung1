$(function () {
    $("#self_check").click(function(){
        $("#self_check_div").toggleClass("on");

        if($("#self_check_div").hasClass("on")){
            $("#self_check").css('left', '0');
        }else{
            $("#self_check").css('left', '720px');
        }
    });

    $("#bo_1_button").click(function(){
       $("#bo_1").show();
    });

    $("#bo_2_button").click(function(){
        $("#bo_2").show();
    });

    $("#bo_3_button").click(function(){
        $("#bo_3").show();
    });

    $("#sim_1_button").click(function(){
        $("#sim_1").show();
    });

    $("#sim_2_button").click(function(){
        $("#sim_2").show();
    });

    $("#sim_3_button").click(function(){
        $("#sim_3").show();
    });

    $("#btn_self_review").click(function(){
        $("#self_review_div").show();
    });

    $("#btn_danwon").click(function(){
       $("#danwon").show();
    });

     $("#danwon").click(function(){
        $(".popup").hide();
     });


    $(".btn_pu_close").click(function(){
       $(".popup").hide();
    });

    setDictionary();

})
