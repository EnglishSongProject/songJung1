$(document).ready(function(){
    // Load words
    words.map(function (item) {
        var wordSpan = "<span class='active-purple' name='" + item.name +"' >" + item.name + "</span>";
        // 단어 생성

        setTimeout(function(){
            $("#words").append(wordSpan);
        },100);

        // 단어 클릭시
        $("#words").on("click", "span", function() {
            var englishWord = $(this).text();
            $("#flashcard > #word").text(englishWord);
            if(englishWord == item.name){
                $("#flashcard > #word_meaning").text(item.meaning);
                $("#flashcard_example > #description").text(item.description);
                $("#flashcard_example > #description2").text(item.description2);
                $("#btn_mp3_a").on("click", function(){
                    playAudio('./media/audio/WORD/'+item.unit+'/'+item.mp3+'.mp3', 'single');
                });
            }
        });
    });
});


/*$(function () {
    // Load words
    words.map(function (item) {
        var wordSpan = "<span class='active-purple' name='" + item.name +"' >" + item.name + "</span>";
        // 단어 생성
        $("#words").append(wordSpan);

        // 단어 클릭시
        $("#words").on("click", "span", function() {
            var englishWord = $(this).text();
            $("#flashcard > #word").text(englishWord);
            if(englishWord == item.name){
                $("#flashcard > #word_meaning").text(item.meaning);
                $("#flashcard_example > #description").text(item.description);
                $("#flashcard_example > #description2").text(item.description2);
            }
        });
    });
});*/

/*    // 무한 scroll
    $("#words").scroll( function() {
        var elem = $("#words");

        if ( elem.scrollHeight - elem.scrollTop() - elem.outerHeight()) {

            var wordSpan = "<span class='active-purple' name='" + words.name +"' >" + words.name + "</span>";
            $("#words").append(wordSpan);
        }
    });*/







/*
// Load words
words.map(function (item) {

    var wordSpan = "<span class='active-purple' name='" + item.name +"' >" + item.name + "</span>";
    // 단어 생성
    $("#words").append(wordSpan);

    // 단어 클릭시
    $("#words").on("click", "span", function() {
        var englishWord = $(this).text();
        $("#flashcard > #word").text(englishWord);
        if(englishWord == item.name){
            $("#flashcard > #word_meaning").text(item.meaning);
            $("#flashcard_example > #description").text(item.description);
            $("#flashcard_example > #description2").text(item.description2);
        }
    });
});*/

