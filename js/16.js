$(function () {
    var $currentPopup = null;

    $("#self_check").click(function(){
        if($currentPopup){
            closePopup($currentPopup)
        }

        $("#self_check_div").toggleClass("on");

        if($("#self_check_div").hasClass("on")){
            $("#self_check").css('left', '0');
        }else{
            $("#self_check").css('left', '720px');
        }
    });

    $("#btn_self_review").click(function(){
        openPopup($("#self_review_div"));
    });

    $("#btnLessonExam").click(function(){
        openPopup($("#danwon"));
    });

    $(".btn_pu_close").on('click',function(){
        if($currentPopup){
            closePopup($currentPopup)
        }
    });

    // 단원평가
     $("#danwon").click(function(){
        $(this).hide();
     });

    function openPopup($Item){
        if($currentPopup){
            $currentPopup.hide();
        }
        $Item.show();
        $currentPopup = $Item;
    }

    function closePopup($Item){
        $Item.hide();
        $Item = null;
    }

    // setDictionary();

    setAudio();
    setPopVideo();
});
