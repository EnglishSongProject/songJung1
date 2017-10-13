/**
 * Created by sr01-02 on 2017-09-15.
 */
$(function () {
    $('.btn_word').on('click', function () {
       $('.intro_word').css('display', 'block');
    });
    $('.close_icon').on('click',function () {
        $('.intro_word').css('display', 'none');
    })
});