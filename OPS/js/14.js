// JavaScript Document
$(document).ready(function(){
    $(".btn_tip").on("click", function(){
        $(".transfer").toggle();
    });

});

$(function () {
    var draggableList = $('.p14_draggable')[0].children;
    var droppableList = $('.p14_droppable');
    draggableSet(draggableList, droppableList);
    //고유값
    retryDraggableSet(draggableList, 'p14_saveForDragRetry');
});
//위치 돌아가게 만들 함수
function retryDragging(dragName, savePositionName) {
    var draggableList = $('.'+dragName)[0].children;
    var savePositionText = $('#'+savePositionName)[0].innerHTML;
    var savePositionTextArray = savePositionText.split(',');
    console.log(savePositionTextArray);
    for(var i=0; i<draggableList.length; i++){
        for(var y=0; y<savePositionTextArray.length; y+=3){
            if(draggableList[i].id == savePositionTextArray[y]){
/*                $(draggableList[i]).css('top', savePositionTextArray[y+1].toString()+'px');
                $(draggableList[i]).css('left', savePositionTextArray[y+2].toString()+'px');*/
            }
        }
    }
}
//돌아갈 위치 저장 함수
function retryDraggableSet(draggableList, retryTextId) {
    var draggableOriginPositionList = new Array();

    console.log(draggableList);
    for(var i = 0; i<draggableList.length; i++){
        var arrayParam = [draggableList[i].id, $(draggableList[i]).offset().top, $(draggableList[i]).offset().left];
        draggableOriginPositionList.push(arrayParam);
    }
    var saveForDragRetry = document.createElement('span');
    $(saveForDragRetry).attr('id', retryTextId);
    $(saveForDragRetry).addClass('display-none');
    draggableList[0].parentNode.parentNode.appendChild(saveForDragRetry);
    saveForDragRetry.innerHTML=draggableOriginPositionList.toString();
}
//init함수
function draggableSet(draggableList, droppableList) {
    var dragSetList = draggableList;
    var dropSetList = droppableList;
    //드래거블 및 드라퍼블 개별 셋팅
    for(var i=0; i<dragSetList.length;i++){
        $('#'+dragSetList[i].id).draggable({
            drag:function () {
                console.log(this.innerHTML);
            }
        });
        var dropArea = document.createElement('span');
        var inputDropArea = $(dropSetList[i]).offset();

/*        //추후 아스펜 작업 시, 해당 인풋에 정확한 위치를 잡는지 확인해주어야함.
        $(dropArea).css('width', '120px');
        $(dropArea).css('height', '50px');
        $(dropArea).css('position', 'absolute');
        $(dropArea).css('top', inputDropArea.top+'px');
        $(dropArea).css('left', inputDropArea.left+'px');
        dropSetList[i].parentNode.appendChild(dropArea);*/
        $(dropArea).css('width', '120px');
        $(dropArea).css('height', '50px');
        $(dropArea).css('position', 'absolute');
/*        $(dropArea).css('top', inputDropArea.top+'px');*/
        $(dropArea).css('left', inputDropArea.left+'px');
        $(dropArea).css('border', '1px solid');
        dropSetList[i].parentNode.appendChild(dropArea);

        $(dropArea).droppable({
            drop:function (event, ui) {
                console.log(this);
            }
        })
        console.log(i+'번째 드래그 리스트'+dragSetList[i] + ' 드랍리스트'+dropSetList[i] + '드랍에이리어' + dropArea);
    }
}
