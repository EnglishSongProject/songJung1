/**
 * Created by sr01-02 on 2017-10-20.
 */

var Text = (function () {

    var textQuizClass = 'text_quiz_input';
    var textQuizInputId = 'quiz_input_';
    var textQuizAssessmentItem = 'text_quiz_assessment_item_';
    var textQuizBtnClass ='text_quiz';

    var textClearClass = 'text_clear_input';
    var textClearInputId = 'clear_input_';
    var textClearAssessmentItem = 'text_clear_assessment_item_';
    var textClearBtnClass='text_clear';
    var krsText;
    var krsTextArray = new Array();

    var textQuizInit = function (page) {
        if($('\.'+textQuizClass).length == 0){
            return;
        }else{
            var quizBtnClass = $('\.'+textQuizBtnClass);
            $('\.'+textQuizClass).each(function (idx) {
                var inputId = 'p'+page+'_'+textQuizInputId+idx;
                $(this).attr('id', inputId);
                if($(this).attr('data-num') == 0){
                    var qid = 'p'+page+'_'+textQuizAssessmentItem+idx;
                    console.log('에세스먼트아이템 qid:' + qid);
                    krsText = $('<assessmentItem data-qid=\"'+qid+'\">' +
                        '<itemBody>'+
                        '</itemBody>'+
                        '<modalFeedback>'+
                        '</modalFeedback>' +
                        '<correctResponse>'+
                        '</correctResponse>'+
                        '</assessmentItem>');
                    $(this).replaceWith(krsText).appendTo($(krsText).children('itemBody'));
                }else{
                    $(this).appendTo($(krsText).children('itemBody'));
                }
            });
        }
    };


    var TextClearInit = function (page) {
        if($('\.'+textClearClass).length == 0){
            return;
        }else {
            var clearBtnClass = $('\.' + textClearBtnClass);
            $('\.' + textClearClass).each(function (idx) {
                var inputId = 'p' + page + '_' + textClearInputId + idx;
                $(this).attr('id', inputId);
                if ($(this).attr('data-num') == 0) {
                    var qid = 'p' + page + '_' + textClearAssessmentItem + idx;
                    console.log('에세스먼트아이템 qid:' + qid);
                    krsText = $('<assessmentItem data-qid=\"' + qid + '\">' +
                        '<itemBody>' +
                        '</itemBody>' +
                        '<modalFeedback>' +
                        '</modalFeedback>' +
                        '<correctResponse>' +
                        '</correctResponse>' +
                        '</assessmentItem>');
                    $(this).replaceWith(krsText).appendTo($(krsText).children('itemBody'));
                    krsTextArray.push(krsText);
                } else {
                    $(this).appendTo($(krsText).children('itemBody'));
                }
            });
            $(clearBtnClass).each(function (idx) {
               $(this).on('click', function () {
                   $(krsTextArray[idx]).children('itemBody').children().each(function () {
                      $(this).val('');
                       //TODO 추후 캐리스 삭제로직 입혀야함. assessbody와 inputid정보를 바로 캐치할 수 있다.
                   });
               });
            });
        }
    };



    var exposeMethod = function(page, type) {
        switch(type){
            case 'quiz':
                textQuizInit(page);
                break;
            case 'clear':
                TextClearInit(page);
                break;
            default:
                console.log('해당 함수의 타입이 지정되지 않았습니다. 매개변수를 제대로 입력해주세요.');
        }
    }

    return{
        init:exposeMethod
    }

})();

