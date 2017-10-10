$(document).ready(function () {
   var checkedNum = 1;
   $(".Q_A_inner1 .false").click(function(){
      if(checkedNum == 1){
         $(".load_02").show();
         $(".cir_goal").removeClass("t01").addClass("t02");
         checkedNum = 2
      }
   })
   $(".Q_A_inner2 .true").click(function(){
      if(checkedNum == 2){
         $(".load_03").show();
         $(".cir_goal").removeClass("t02").addClass("t03");
         checkedNum = 3
      }
   })
   $(".Q_A_inner3 .false").click(function(){
      if(checkedNum == 3){
         $(".load_04").show();
         $(".cir_goal").removeClass("t03").addClass("t04");
         checkedNum = 4;
      }
   })
   $(".Q_A_inner4 .true").click(function(){
      if(checkedNum == 4){
         $(".load_05").show();
         $(".cir_goal").removeClass("t04").addClass("t05")
         checkedNum = 5
      }
   })

   $("#bt_A_a").click(function(){
      if(checkedNum == 5){
         alert("정답입니다");
         showAnswer()
      }else{
         alert("오답입니다");
         showAnswer()
         checkedNum = 6
      }
   })

   $("#bt_A_r").on("click",function(){
      $(".road_school img:not(:last)").hide();
      $(".load_01").show();
      $(".cir_goal").removeClass().addClass("cir_goal t01");
      hideAnswer()
      checkedNum = 1;
   })

   function showAnswer(){
      $(".Q_A_inner .on").css({
         border: "3px solid red"
      })
   }
   function hideAnswer(){
      $(".Q_A_inner .on").css({
         border: "3px solid transparent"
      })
   }
});
