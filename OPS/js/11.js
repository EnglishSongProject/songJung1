$(function () {
    setAudio();
    setDictionary();
	setPopVideo();
    searchLoad();
});


function searchLoad(){
    var checkedNum = 1;
    $(".r_false_01").click(function(){
       if(checkedNum == 1){
          $(".load_02").show();
          $(".cir_goal").removeClass("t01").addClass("t02");
          checkedNum = 2
       }
    })
    $(".r_true_02").click(function(){
       if(checkedNum == 2){
          $(".load_03").show();
          $(".cir_goal").removeClass("t02").addClass("t03");
          checkedNum = 3
       }
    })
    $(".r_false_03").click(function(){
       if(checkedNum == 3){
          $(".load_04").show();
          $(".cir_goal").removeClass("t03").addClass("t04");
          checkedNum = 4;
       }
    })
    $(".r_true_04").click(function(){
       if(checkedNum == 4){
          $(".load_05").show();
          $(".cir_goal").removeClass("t04").addClass("t05")
          checkedNum = 5
       }
    })

    $("#bt_A_a").click(function(){
       if(checkedNum == 5){
           //정답
          showAnswer()
       }else{
           //오답
          showAnswer()
          checkedNum = 6
       }
    })

    $("#bt_A_r").on("click",function(){
       $(".road_school img:not(:last)").hide();
       $(".load_01").show();
       $(".cir_goal").removeClass('t02 t03 t04').addClass("cir_goal t01");
       hideAnswer()
       checkedNum = 1;
    })

    function showAnswer(){
       $(".on").css({
          border: "3px solid red"
       })
    }
    function hideAnswer(){
       $(".on").css({
          border: "3px solid transparent"
       })
    }
}
