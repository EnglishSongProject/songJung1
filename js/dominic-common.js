// Complete - playAudio = 문장 or 단어 음성 플레이
// btnSupplement = 보충 팝업 열기
// btnSupplementClose = 보충 팝업 닫기
// btnDeepen = 심화 팝업 열기
// btnDeepenClose = 심화 팝업 닫기
// btnRolePlay = 롤플레이
// btnMoviePlay = 영상플레이
// btnMovieStop = 영상정지
// btnMoviePause = 영상일시정지
// btnMovieMute = 영상음소거
// btnAudioPopup = 음성 플레이 팝업
// Complete - btnAudioPlay = 음성플레이
// Complete - btnAudioStop = 음성정지
// Complete - btnAudioPause = 음성일시정지
// btnAudioAllPlay = 음성 전체 플레이
// btnEnglishSubtitles = 영어 자막
// btnKoreanSubtitles = 한글자막
// btnTranslation = 번역
// btnScript = 대본
// btnAnswer = 답안
// btnReset = 다시하기
// btnZoom = 확대보기
// btnWeDoRang = 위두랑 연결 버튼
// btnPopup = 팝업
// btnWordDictionary = 낱말 사전
// btnGame = 게임
// btnSelfReview = 셀프리뷰
// btnLessonExam = 단원평가
// btnWritePopup = 쓰기 팝업

var audioPopup = $('.audio-popup');
var audioPopupHeight = audioPopup.height();
var audioPopupWidth = audioPopup.width();
var audioPopupMargin = 10;
var audioProgressBar = audioPopup.find('.progress_bar');
var audioControlButton = audioPopup.find('.controll_bar');
var audioElement = $('.myAudio');

$(function () {
    /**
     * Button Audio Popup
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnAudioPopup').click(function (e) {
        e.preventDefault();

        var audioFileName = getAudioFilePath($(this));
        audioElement.prop('src', audioFileName);

        var popupPosition = $(this).attr('data-position');
        if (popupPosition !== undefined && popupPosition !== null && popupPosition !== '') {
            popupPosition = popupPosition.toUpperCase();
        }

        var buttonPosition = $(this).offset();
        var buttonWidth = $(this).width();

        switch (popupPosition) {
            case 'LEFT':
                audioPopup.css({
                    'left': (buttonPosition.left - audioPopupWidth - buttonWidth) + 'px',
                    'top': buttonPosition.top + 'px'
                });
                break;
            case 'RIGHT':
                audioPopup.css({
                    'left': (buttonPosition.left + buttonWidth + audioPopupMargin) + 'px',
                    'top': buttonPosition.top + 'px'
                });
                break;
            case 'BOTTOM':
                audioPopup.css({
                    'left': buttonPosition.left + 'px',
                    'top': (buttonPosition.top + audioPopupHeight) + 'px'
                });
                break;
            case 'COORDINATES':
                var popupCoordinates = $(this).attr('data-coordinates');

                if (popupCoordinates === undefined || popupCoordinates === null || popupCoordinates === '') {
                    return false;
                } else {
                    popupCoordinates = popupCoordinates.split(',');
                }

                audioPopup.css({
                    'left': popupCoordinates[0],
                    'top': popupCoordinates[1]
                });
                break;
            default:
                audioPopup.css({
                    'left': buttonPosition.left + 'px',
                    'top': (buttonPosition.top - audioPopupHeight - audioPopupMargin) + 'px'
                });
                break;
        }

        audioPopup.show();
        audioControlButton.css('left', audioProgressBar.position().left - (audioControlButton.width() / 2));
        audioElement[0].play();
    });

    /**
     * Button Audio Play
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    audioPopup.on('click', '.btnAudioPlay', function (e) {
        e.preventDefault();

        audioElement[0].play();
    }).on('click', '.btnAudioPause', function (e) {
        e.preventDefault();

        $('.btnAudioPause').addClass('btn_audio_play btnAudioPlay').removeClass('btn_audio_pause btnAudioPause');

        audioElement[0].pause();
    }).on('click', '.btnAudioStop', function (e) {
        e.preventDefault();

        allPlayAudioStop();

        audioElement[0].pause();
    });

    /**
     * Button Audio Close Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     * @Complete    Complete
     */
    $('.btnAudioClose').click(function (e) {
        e.preventDefault();

        allPlayAudioStop();

        audioElement[0].pause();
        audioPopup.hide();
    });

    /**
     * Word Dictionary Popup Open Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnWordDictionary').click(function (e) {
        e.preventDefault();

        $('.intro_word').css('display', 'block');
    });

    /**
     * Word Dictionary Popup Close Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnDictionaryClose').click(function (e) {
        e.preventDefault();

        $('.intro_word').css('display', 'none');
    });

    /**
     * Play Audio (Word or Sentence) - No Audio Popup
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     * @Complete    Complete
     */
    $('.playAudio').click(function (e) {
        e.preventDefault();

        audioPopup.hide();
        allPlayAudioStop();

        var audioFileName = getAudioFilePath($(this));
        audioElement.prop('src', audioFileName);
        audioElement[0].play();

        $(this).addClass('currentPlayingAudio');
        if ($(this).hasClass('changeNotColor') === false) {
            $(this).css('color', 'purple');
        }
    });

    /**
     * Audio Element Event Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    audioElement.on('ended', function () {
        var currentPlayingAudio = $('.currentPlayingAudio');
        if (currentPlayingAudio.hasClass('changeNotColor') === false) {
            currentPlayingAudio.css('color', 'rgb(43, 46, 52)');
        }
        currentPlayingAudio.removeClass('currentPlayingAudio');
        $('.btnAudioPause').addClass('btn_audio_play btnAudioPlay').removeClass('btn_audio_pause btnAudioPause');
        audioElement.prop('currentTime', 0);
    }).on('playing', function () {
        $('.btnAudioPlay').addClass('btn_audio_pause btnAudioPause').removeClass('btn_audio_play btnAudioPlay');
    }).on('timeupdate', function () {
        var currentTime = audioElement[0].currentTime; // Return Play Time
        var durationTime = audioElement[0].duration; // All Play Time
        var playTimePercentage = currentTime / durationTime * 100;

        audioControlButton.css('left', audioProgressBar.position().left + ((audioProgressBar.width() / 100) * playTimePercentage) - (audioControlButton.width() / 2));
    });

    $('body').on('click', '.btnReset', function (e) {
        /**
         * Reset Button Action
         * @Author      Dominic-Kim
         * @Date        2017.10.21.
         */
        e.preventDefault();

        var answerType = $(this).attr('data-answer-type');
        if (answerType !== undefined && answerType !== null && answerType !== '') {
            answerType = answerType.toUpperCase();
        }

        var resetForm = $(this).attr('data-id').replace(' ', '');
        if (resetForm !== undefined && resetForm !== null && resetForm !== '') {
            resetForm = resetForm.split(',');

            $.each(resetForm, function (index, value) {
                var currentForm = $('#' + value);
                switch(currentForm.prop('type')) {
                    default:
                        currentForm.val('');
                        break;
                }
            });
        }

        var answerElements = $(this).attr('data-answer').replace(' ', '');
        if (answerElements !== undefined && answerElements !== null && answerElements !== '') {
            answerElements = answerElements.split(',');

            switch(answerType) {
                case 'CHECKBOX':
                    $.each(resetForm, function (index, answerElement) {
                        $('#' + answerElement).prop('checked', false).addClass('correct').removeClass('false');
                    });
                    break;
                case 'RADIO':
                    $.each(resetForm, function (index, answerElement) {
                        $('#' + answerElement).prop('checked', false).addClass('correct').removeClass('false');
                    });
                    break;
                default:
                    $.each(answerElements, function (index, answerElement) {
                        $('#' + answerElement).hide();
                    });
                    break;
            }

            $(this).addClass('btnAnswer').removeClass('btnReset');
        }
    }).on('click', '.btnAnswer', function (e) {
        /**
         * Answer Check Button Action
         * @Author      Dominic-Kim
         * @Date        2017.10.21.
         */
        e.preventDefault();

        var answerType = $(this).attr('data-answer-type');
        if (answerType !== undefined && answerType !== null && answerType !== '') {
            answerType = answerType.toUpperCase();
        }

        var answerElements = $(this).attr('data-answer').replace(' ', '');
        if (answerElements !== undefined && answerElements !== null && answerElements !== '') {
            answerElements = answerElements.split(',');

            switch(answerType) {
                case 'CHECKBOX':
                    $.each(answerElements, function (index, answerElement) {
                        $('#' + answerElement).prop('checked', true).addClass('false').removeClass('correct');
                    });
                    break;
                case 'RADIO':
                    $.each(answerElements, function (index, answerElement) {
                        $('#' + answerElement).prop('checked', true).addClass('false').removeClass('correct');
                    });
                    break;
                default:
                    $.each(answerElements, function (index, answerElement) {
                        $('#' + answerElement).show();
                    });
                    break;
            }

            $(this).addClass('btnReset').removeClass('btnAnswer');
        } else {
            return false;
        }
    });

    /**
     * Script Popup Open Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnScript').click(function (e) {
        e.preventDefault();

        var scriptLayer = $('#' + $(this).attr('data-script'));
        var scriptButtonOffset = $(this).offset();

        scriptLayer.css({'left': scriptButtonOffset.left, 'top':scriptButtonOffset.top + $(this).height() + audioPopupMargin});
        scriptLayer.toggle();
    });

    /**
     * Script Popup Close Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnScriptClose').click(function (e) {
        e.preventDefault();

        $(this).closest('.scriptPopup').hide();
    });

    /**
     * Custom Radio Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('input[type=checkbox]').change(function (e) {
        e.preventDefault();

        var sameID = $(this).attr('data-radio');
        if (sameID !== undefined && sameID !== null && sameID !== '') {
            $('input[data-radio=' + sameID + ']').prop('checked', false);
            $(this).prop('checked', true);
        }
    });

    /**
     * Supplement Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnSupplement').click(function (e) {
        e.preventDefault();

        $('#' + $(this).attr('data-id')).toggle();
    });

    /**
     * Supplement Close Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnSupplementClose').click(function (e) {
        e.preventDefault();

        $(this).closest('.popup').toggle();
    });

    /**
     * Deepen Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnDeepen').click(function (e) {
        e.preventDefault();

        $('#' + $(this).attr('data-id')).toggle();
    });

    /**
     * Deepen Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnDeepenClose').click(function (e) {
        e.preventDefault();

        $(this).closest('.popup').toggle();
    });

    /**
     * Translation Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnTranslation').click(function (e) {
        e.preventDefault();

        $('#' + $(this).attr('data-id')).toggle();
    });

    /**
     * Write Popup Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnWritePopup').click(function (e) {
        e.preventDefault();

        var buttonWidth = $(this).width();
        var popupOffset = $(this).offset();

        $('#' + $(this).attr('data-id')).css({
            'left':popupOffset.left + buttonWidth + audioPopupMargin,
            'top':$(this).offset().top
        }).toggle();
    });

    /**
     * Write Popup Close Button Action
     * @Author      Dominic-Kim
     * @Date        2017.10.21.
     */
    $('.btnWritePopupClose').click(function (e) {
        e.preventDefault();

        $(this).closest('.popup').toggle();
    });

    /**
     * WeDoRang Popup Open Action
     * @Author      Dominic-Kim
     * @Date        2017.10.22.
     */
    $('.btnWeDoRang').click(function (e) {
        e.preventDefault();

        $('#wedorang-popup').toggle();
    });

    /**
     * WeDoRang Popup Close Action
     * @Author      Dominic-Kim
     * @Date        2017.10.22.
     */
    $('.btnWeDoRangClose').click(function (e) {
        e.preventDefault();

        $('#wedorang-popup').toggle();
    });
});


/**
 * All Playing Audio Stop & Audio Popup Hide
 * @Author      Dominic-Kim
 * @Date        2017.10.21.
 */
function allPlayAudioStop() {
    var currentPlayingAudio = $('.currentPlayingAudio');
    if (currentPlayingAudio.hasClass('changeNotColor') === false) {
        currentPlayingAudio.css('color', 'rgb(43, 46, 52)');
    }
    currentPlayingAudio.removeClass('currentPlayingAudio');

    audioElement.prop('currentTime', 0);
}

/**
 * Get Audio File Path
 * @Author      Dominic-Kim
 * @Date        2017.10.21.
 * @param       _this
 * @returns     {string}
 */
function getAudioFilePath(_this) {
    var audioFileName = _this.attr('data-name');
    audioFileName = audioFileName.split('_');
    return './media/audio/' + audioFileName[0] + '/' + audioFileName[1] + '/' + audioFileName.join('_') + '.mp3';
}
