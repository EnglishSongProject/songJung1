$(document).ready(function() {

    setAudio();
    setPopVideo();

    $("#p13_self_check_pen_1_1, #p13_self_check_pen_1_2, #p13_self_check_pen_1_3, #p13_self_check_pen_1_4, #p13_self_check_pen_1_5").on("click",function(){
        var obj = $(this);
        var str = obj.context.id;
        var idStr = str.substr(0, str.length-1);
        var idTh = str.substr(str.length -1, 1);
        idTh = parseInt(idTh);
        //opacity 0 초기화
        for(var i=1;i<6;i++){
            $("#"+idStr+i.toString()).css('background', '#fff');
        }
        //해당 클릭 수 만큼 opacity넣기
        for(var i=1;i<idTh+1;i++){
            $("#"+idStr+i.toString()).css('background', '#f7bd67');
        }
    });

    $("#p13_self_check_pen_2_1, #p13_self_check_pen_2_2, #p13_self_check_pen_2_3, #p13_self_check_pen_2_4, #p13_self_check_pen_2_5").on("click",function(){
        var obj = $(this);
        var str = obj.context.id;
        var idStr = str.substr(0, str.length-1);
        var idTh = str.substr(str.length -1, 1);
        idTh = parseInt(idTh);
        //opacity 0 초기화
        for(var i=1;i<6;i++){
            $("#"+idStr+i.toString()).css('background', '#fff');
        }
        //해당 클릭 수 만큼 opacity넣기
        for(var i=1;i<idTh+1;i++){
            $("#"+idStr+i.toString()).css('background', '#cae8f2');
        }
    });
});

