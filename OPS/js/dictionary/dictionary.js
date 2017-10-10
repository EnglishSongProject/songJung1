$(document).ready(function(){

    allWordsLoad();

    // 단어 클릭시
    $("#words").on("click", "span", function() {
        var englishWord = $(this).text();
        $("#flashcard > #word").text(englishWord);

        $.each(words, function (index) {
            if(words[index].name == englishWord){
                $("#flashcard > #word_meaning").text(words[index].meaning);
                $("#flashcard_example > #description").text(words[index].description);
                $("#flashcard_example > #description2").text(words[index].description2);
                $("#btn_mp3_a").off('click');
                $("#btn_mp3_a").on("click", function(){
                    playAudio('./media/audio/WORD/'+words[index].unit+'/'+words[index].mp3+'.mp3', 'single');
                });
            }
        })
    });

    $('.lesson_btn_list').on('click', 'li', function () {

        var lessonBtnList = $('.lesson_btn_list');
        lessonBtnList = lessonBtnList[0].children;
        for(var i =0; i<lessonBtnList.length; i++){
            if($(lessonBtnList[i]).hasClass('on')){
                $(lessonBtnList[i]).removeClass('on');
            }
        }
        $(this).addClass('on');
        $("#words > span").detach();


        if(this.innerHTML == '전체'){
            $("#words > span").detach();
            allWordsLoad();
        }


        var lesson = this.innerHTML;
        words.map(function (item) {
            if(item.unit == lesson){
                console.log('일치'+lesson);
                var itemNameForTag =  item.name.replace(/[^A-Za-z\d_-]+/g,''); // 문자열공백,특수문자제거
                var wordSpan = "<span class='active-purple' name='" + itemNameForTag +"'>" + item.name + "</span>";
                $(function () {
                    $('#words').append(wordSpan);
                })
            }

        });
    });
});
function allWordsLoad() {
    words.map(function (item) {
        console.log(item);
        var itemNameForTag = item.name.replace(/[^A-Za-z\d_-]+/g, ''); // 문자열공백,특수문자제거
        var wordSpan = "<span class='active-purple' name='" + itemNameForTag + "'>" + item.name + "</span>";
        $(function () {
            $('#words').append(wordSpan);
        })
    });
}

