// JavaScript Document
$(document).ready(function(){
    $(".btn_tip").on("click", function(){
        $(".transfer").toggle();
    });

});

//텍스트 드래그 추후 인풋창에 텍스트를 넣는 것이 아닌 해당 영역에 들어가야함.
$(function () {
    var draggableList = $('.p14_draggable')[0].children;
    var droppableList = $('.p14_droppable');
    draggableSet(draggableList, droppableList, 'p14');
    //고유값
    retryDraggableSet(draggableList, 'p14');
    saveDraggingText(draggableList, 'p14');
});
//무엇이 마지막으로 드래깅 되었는지 확인하는 함수
function saveDraggingText(draggableList, lastDragId){
    if( !document.querySelector(lastDragId+ '_lastDrag')){
        var lastDragging = document.createElement('span');
        $(lastDragging).attr('id', lastDragId+ '_lastDrag');
        $(lastDragging).addClass('display-none');
        draggableList[0].parentNode.parentNode.appendChild(lastDragging);
    }
}
//위치 돌아가게 만들 함수
function retryDragging(dragName, savePositionName) {
    var draggableList = $('.'+dragName)[0].children;
    var savePositionText = $('#'+savePositionName+'_saveForDragRetry')[0].innerHTML;
    var savePositionTextArray = savePositionText.split(',');
    for(var i=0; i<draggableList.length; i++){
        for(var y=0; y<savePositionTextArray.length; y+=3){
            if(draggableList[i].id == savePositionTextArray[y]){
                $(draggableList[i]).css('top', savePositionTextArray[y+1].toString()+'px');
                $(draggableList[i]).css('left', savePositionTextArray[y+2].toString()+'px');
            }
        }
    }
}
//돌아갈 위치 저장 함수
function retryDraggableSet(draggableList, retryTextId) {
    var draggableOriginPositionList = new Array();
    for(var i = 0; i<draggableList.length; i++){
        var arrayParam = [draggableList[i].id, $(draggableList[i]).offset().top, $(draggableList[i]).offset().left];
        draggableOriginPositionList.push(arrayParam);
    }
    var saveForDragRetry = document.createElement('span');
    $(saveForDragRetry).attr('id', retryTextId + '_saveForDragRetry');
    $(saveForDragRetry).addClass('display-none');
    draggableList[0].parentNode.parentNode.appendChild(saveForDragRetry);
    saveForDragRetry.innerHTML=draggableOriginPositionList.toString();
}
//init함수
function draggableSet(draggableList, droppableList, lastDragId) {
    var dragSetList = draggableList;
    var dropSetList = droppableList;
    //드래거블 및 드라퍼블 개별 셋팅
    for(var i=0; i<dragSetList.length;i++){
        $('#'+dragSetList[i].id).draggable({
            drag:function () {
                var draggingWord = $('#'+lastDragId+'_lastDrag');
                draggingWord[0].innerHTML=this.innerHTML;
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
        $(dropArea).attr('class', dropSetList[i].id);
        dropSetList[i].parentNode.appendChild(dropArea);


        //todo 추후 드랍 쪽에서 이벤트 관리를 해주어야함.
        $(dropArea).droppable({
            drop:function (event, ui) {
                var draggingWord = $('#'+lastDragId+'_lastDrag');
                var inputText = $('#'+this.classList[0]);
                //값이 있다면
                if($(inputText).val()){
                    if($(inputText).val() == draggingWord[0].innerHTML){
                        //다른 단어가 들어올 시,
                        console.log('같은 단어인데 사라짐??');
                    }else{

                        //이전 값을 원래 위치로 돌려야함
                        var savePositionText = $('#'+lastDragId+'_saveForDragRetry')[0].innerHTML;
                        var savePositionTextArray = savePositionText.split(',');
                        for(var i=0; i<savePositionTextArray.length; i++){
                            //숫자가 아니라면(id라면)
                            if(!isNumber(savePositionTextArray[i])){
                                var idForRetry = $('#'+savePositionTextArray[i]);
                                if($(inputText).val() == idForRetry[0].innerHTML){
                                    $(idForRetry).css('top', savePositionTextArray[i+1].toString()+'px');
                                    $(idForRetry).css('left', savePositionTextArray[i+2].toString()+'px');
                                }
                            }
                        }
                        //이후 들어온 값대입
                        $(inputText).val(draggingWord[0].innerHTML);
                    }
                }else{
                    //값이 비어 있다면
                    $(inputText).val(draggingWord[0].innerHTML);
                }
            }
        });
    }
}
