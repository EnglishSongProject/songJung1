/**
 * Created by sr01-02 on 2017-09-15.
 */
/**
 * Created by wonhuiryu on 2017-09-09.
 */
    // Global variable to track current file name.
var currentFile = "";
function playAudio(path, btnId, target) {
    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            var btn = document.getElementById(btnId);

            oAudio.style.position = "absolute";
            oAudio.style.width = "200px";

            //Skip loading if current file hasn't changed.
            if (path !== currentFile) {
                oAudio.src = path;
                currentFile = path;
            }

            if(btnId == 'single'){
                if (oAudio.paused){
                    oAudio.play();
                }else{
                    oAudio.pause();
                }

                /*다른 오디오를 정지상태(플레이 가능사진)으로 바꿔준다*/
                var idForPlayAudioClose = document.getElementsByClassName('playAudio');
                for (var i = 0; i < idForPlayAudioClose.length; i++) {
                    idForPlayAudioClose[i].src = "./images/icon/headphone.png";
                }
            }else {
                // Tests the paused attribute and set state.
                if (oAudio.paused) {
                    oAudio.play();

                    /*팝업*/
                    removePopup()
                    popup = document.createElement("div")
                    popup.className = "popup"
                    target.parentNode.appendChild(popup);
                    popup.style.top = (target.offsetTop - 10) + "px";
                    popup.style.left = (target.offsetLeft + 40) + "px";
                    oAudio.style.top = (target.getBoundingClientRect().top - 6 +  window.scrollY) + "px";
                    oAudio.style.left = (target.getBoundingClientRect().left + 45 ) + "px";

                    oAudio.style.display='block';
                    var idForPlayAudioClose = document.getElementsByClassName('playAudio');
                    for (var i = 0; i < idForPlayAudioClose.length; i++) {
                        idForPlayAudioClose[i].src = "./images/icon/headphone.png";
                    }
                    btn.src = "./images/icon/pause.png";
                }
                else {
                    removePopup()
                    oAudio.pause();
                    oAudio.style.display='none';
                    btn.src = "./images/icon/headphone.png";

                }
                oAudio.addEventListener("ended", function (e) {
                    removePopup()
                    btn.src = "./images/icon/headphone.png";
                    oAudio.style.display='none';
                });
            }
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            //if(window.console && console.error("Error:" + e));
        }
    }
}
//슬라이더 js
var imageSlide = {

    init : function(){

        var slide_content = document.getElementsByClassName('slider_content');
        for(var i=0,j=slide_content.length; i<j; i++){
            var slider_image = slide_content[i].getElementsByClassName('slider_image')[0];
            var image = slider_image.children;
            var thumbnail = slide_content[i].getElementsByClassName('slider_thumbnail')[0];
            var thumbnail_list = thumbnail.children;
            slider_image.firstElementChild.classList.add('on');
            for(var m=0,n=thumbnail_list.length; m<n; m++){
                if(m===0) thumbnail_list[m].classList.add('on');
                thumbnail_list[m].addEventListener('mousedown',imageSlide.showImg,false);
                image[m].addEventListener('touchstart', imageSlide.swipe.swiper, false);
                image[m].addEventListener('touchmove', imageSlide.swipe.swiper, false);
                image[m].addEventListener('touchend',imageSlide.swipe.swiper, false);
            }
        }
    },


    showImg  : function(){
        var content =  this.parentNode.parentNode.parentNode;
        var index = parseInt(this.getAttribute('data-num'));
        var slide = content.getElementsByClassName('slider_image')[0];
        this.parentNode.getElementsByClassName('on')[0].classList.remove('on');
        this.classList.add('on');
        slide.getElementsByClassName('on')[0].classList.remove('on');
        slide.children[index-1].classList.add('on');
    },

    buttonAction : {

        prevImageShow : function(){
            console.log(this)
            var slide = this.getElementsByClassName('slider_image')[0];
            var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
            var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('num'));
            if(index === 1) {
                return false;
            }else{
                slide.getElementsByClassName('on')[0].classList.remove('on');
                slide.children[index-2].classList.add('on');
                thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                thumbnail.children[index-2].classList.add('on');
            }


        },

        nextImageShow : function(){
            var slide = this.getElementsByClassName('slider_image')[0];
            var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
            var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('num'));

            if(index === slide.children.length) {
                return false;
            }
            else {
                slide.getElementsByClassName('on')[0].classList.remove('on');
                slide.children[index].classList.add('on');
                thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                thumbnail.children[index].classList.add('on');
            }
        }
    },
    swipe : {
        touch : null,
        start_x : null,
        start_y : null,
        end_x : null,
        end_y : null,
        move : false,
        swiper : function(event){
            if (typeof event !== 'undefined') {
                if (typeof event.touches !== 'undefined') {
                    imageSlide.swipe.touch = event.touches[0];
                    if(event.type === 'touchstart'){
                        imageSlide.swipe.start_x = Math.floor(imageSlide.swipe.touch.pageX);
                        imageSlide.swipe.start_y = Math.floor(imageSlide.swipe.touch.pageY);
                        imageSlide.swipe.move = false;
                    }else if(event.type === 'touchmove'){
                        imageSlide.swipe.move = true;
                        imageSlide.swipe.end_x = Math.floor(imageSlide.swipe.touch.pageX);
                        imageSlide.swipe.end_y = Math.floor(imageSlide.swipe.touch.pageY);
                    }else if(event.type === 'touchend'){
                        if(imageSlide.swipe.move) imageSlide.swipe.start_x - imageSlide.swipe.end_x > 0 ? imageSlide.buttonAction.prevImageShow.call(this.parentNode.parentNode.parentNode.parentNode) : imageSlide.buttonAction.nextImageShow.call(this.parentNode.parentNode.parentNode.parentNode)

                    }
                }
            }
        }
    }
}
function removePopup(){
   var popup = document.querySelector(".popup");
   if(popup){
        popup.parentNode.removeChild(popup);
    }
}
