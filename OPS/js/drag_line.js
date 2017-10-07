// 함수 호출
setTimeout(function () {
    initScale();
    QUIZ.init();
}, 500);


// createElement 초기 설정
function QSAll (target) {return document.querySelectorAll(target);}

function createElement (type, targetElement, className, width, height) {
    var createObject = document.createElement(type);

    if (className !== undefined) createObject.className = className;
    if (width !== undefined) 	 createObject.style.width = width + 'px';
    if (height !== undefined) 	 createObject.style.height = height + 'px';

    targetElement.appendChild(createObject);
    return createObject;
}

// 디바이 터치 등록
var GameManager = {
    event: {
        isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
        eventSelector: function (eventType) {
            // console.log('□ this.isTouchDevice :', this.isTouchDevice);
            var selectedEvent;
            switch (eventType) {
                case 'eventDown':
                    selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown';
                    break;
                case 'eventMove':
                    selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove';
                    break;
                case 'eventUp':
                    selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup';
                    break;
                case 'eventOut':
                    selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout';
                    break;
            }
            return selectedEvent;
        }
    }
};


function QS (target) { return document.querySelector(target); }
function eventSelector (eventType, e) {
    var eventMaster;

    if (eventType === 'eventDown') {
        switch (GameManager.event.eventSelector('eventDown')) {
            case "mousedown":
                eventMaster = e;
                break;
            case "touchstart":
                e.preventDefault();
                eventMaster = e.touches.item(0);
                break;
        }
    } else if (eventType === 'eventMove') {
        switch (GameManager.event.eventSelector('eventMove')) {
            case "mousemove":
                eventMaster = e;
                break;
            case "touchmove":
                eventMaster = e.touches.item(0);
                break;
        }
    } else if (eventType === 'eventUp') {
        switch (GameManager.event.eventSelector('eventUp')) {
            case "mouseup":
                eventMaster = e;
                break;
            case "touchend":
                eventMaster = e.changedTouches[0];
                break;
        }
    } else if (eventType === 'eventOut') {
        switch (GameManager.event.eventSelector('eventOut')) {
            case "mouseout":
                eventMaster = e;
                break;
            case "touchleave":
                eventMaster = e.touches.item(0);
                break;
        }
    }
    return eventMaster;
}

// 화면 스케일(리사이즈) 설정
function initScale() {
    var wrap = document.querySelector('.wrapper');

    GameManager.event.clientWidth = document.body.clientWidth;
    GameManager.event.clientHeight = document.body.clientHeight;

    GameManager.event.wrapWidth = wrap.clientWidth;
    GameManager.event.wrapHeight = wrap.clientHeight;

    GameManager.event.zoomVertical = (GameManager.event.clientHeight / GameManager.event.wrapHeight) * 1.0;
    GameManager.event.zoomHorizontal = (GameManager.event.clientWidth / GameManager.event.wrapWidth) * 1.0;

    if(parent.ZOOMVALUE == undefined) {
        parent.ZOOMVALUE = 1;
    }
    if (GameManager.event.clientHeight < GameManager.event.clientWidth) {
        GameManager.event.zoomRate = parent.ZOOMVALUE;
    } else {
        GameManager.event.zoomRate = GameManager.event.zoomHorizontal;
    }
}


// 이벤트(설정) 추가 : mousedown, mousemove, mouseup, mouseout
function addEvent (target, eType, fnc) {
    var eventType;
    switch(eType){
        case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
        case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
        case 'mouseup':   eventType = GameManager.event.eventSelector('eventUp'); break;
        case 'mouseout':  eventType = GameManager.event.eventSelector('eventOut'); break;
    }
    return target.addEventListener(eventType, fnc, false);
}

// 이벤트(설정) 삭제 : mousedown, mousemove, mouseup, mouseout
function removeEvent (target, eType, fnc) {
    var eventType;
    switch(eType) {
        case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
        case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
        case 'mouseup':   eventType = GameManager.event.eventSelector('eventUp'); break;
        case 'mouseout':  eventType = GameManager.event.eventSelector('eventOut'); break;
    }
    return target.removeEventListener(eventType, fnc, false);
}


// 선택 사운드 (mousedown, touchstart)
function soundEvent (target, src) {
    target.addEventListener(GameManager.event.eventSelector('eventDown'), function(){
        efSound(src);
    }, false);
}


// svg : 생성
function CESVG (target, type) {
    var svgContainer = document.createElementNS('http://www.w3.org/2000/svg', type);
    target.appendChild(svgContainer);
    return svgContainer;
}



// 효과음 기본 설정
function efSound (src) {
    var efAudio = new Audio;
    var efPlay = function () {
        efAudio.removeEventListener('loadeddata', efPlay);
        efAudio.play();
    };
    efAudio.src = src;
    efAudio.addEventListener('loadeddata', efPlay);
    efAudio.load();
}


// 드래그앤드랍 : 설정
function DragDrop (param) {
    this.element = param.element;
    this.parentElment = window;
    this.createDragDrop(param);
}

// 드래그앤드랍 : 위치 이동
DragDrop.prototype.createDragDrop = function (param) {
    var dragObj = this,
        left = param.left + param.width,
        top = param.top + param.height,
        answerLine = (param.quizName !== 'dragLine') ? null : CESVG(QS('.quiz_'+ param.quizNum +' .svgContainer'), 'path'),

        startDrag = function (e) {
            e.preventDefault();
            var eventMaster = eventSelector('eventDown', e);
            dragObj.element.style.zIndex = 100;

            dragObj.offY = eventMaster.clientY - (dragObj.element.offsetTop * GameManager.event.zoomRate);
            dragObj.offX = eventMaster.clientX - (dragObj.element.offsetLeft * GameManager.event.zoomRate);

            dragObj.element.addEventListener(GameManager.event.eventSelector('eventMove'), drag, true);
            dragObj.element.addEventListener(GameManager.event.eventSelector('eventOut'), endDrag, true);
        },

        drag = function (e) {
            e.preventDefault();
            var eventMaster = eventSelector('eventMove', e);

            dragObj.newY = eventMaster.clientY - dragObj.offY;
            dragObj.newX = eventMaster.clientX - dragObj.offX;

            dragObj.element.style.left = (dragObj.newX / GameManager.event.zoomRate) + 'px';
            dragObj.element.style.top = (dragObj.newY / GameManager.event.zoomRate) + 'px';

            var newLeft = (dragObj.newX + param.width) / GameManager.event.zoomRate;
            var newTop = (dragObj.newY + param.height) / GameManager.event.zoomRate;

            if (answerLine !== null) {
                answerLine.setAttribute('d', 'M '+ left +' '+ top + ' L '+ newLeft +' '+ newTop);
            }
        },

        endDrag = function (e) {
            e.preventDefault();
            var eventMaster = eventSelector('eventUp', e);

            dragObj.element.removeEventListener(GameManager.event.eventSelector('eventMove'), drag, true);
            dragObj.element.style.zIndex = 1;
            param.callBack(e, param);
        }

    dragObj.element.addEventListener(GameManager.event.eventSelector('eventDown'), startDrag, true);
    dragObj.element.addEventListener(GameManager.event.eventSelector('eventUp'), endDrag, true);
};



// 퀴즈 : 기본 설정
var QUIZ = QUIZ || {};
QUIZ = (function(){
    var quizObj = {
        objCount: null,
        totalCount: 0,
        quizNameArray: [],
        aniArray: [],
        aniId: null,
        init: function () {
            var quiz = QSAll('.quiz'),
                popupQuiz = QSAll('.popupPageContainer .quiz');

            this.objCount = new Array(quiz.length);

            for (var i = 0; i < quiz.length; i++) {
                var quizNameArray = quiz[i].getAttribute('quiz'),
                    quizNum = i + 1;

                this.objCount[i] = 0;

                quiz[i].classList.add('quiz_' + quizNum);
                quiz[i].setAttribute('idx', quizNum.toString());

                if (quizNameArray !== null) {
                    quizNameArray = (new String(quizNameArray).indexOf(',') > -1) ? quizNameArray.split(',') : [quizNameArray];
                    this.start(quizNum, quizNameArray);
                }
                else console.log('noQuiz');
            }
        },

        start: function (quizNum, quizName) {
            this.quizNameArray.push(quizName);
            console.log(quizName);
/*            console.log(quizNum);*/
            for (var i = 0; i < quizName.length; i++) this[quizName[i]]['init'](quizNum);
        }
    }
    return quizObj;
})();


// 퀴즈 : dragLine 이벤트
QUIZ.dragLine = {
    name: 'dragLine',
    dragLineObj: null,
    dropArea: null,
    path: null,
    objSize: {width: null, height: null},
    dropSize: {width: null, height: null},
    dropPosition: [],
    objPosition: [],

    // 초기 설정
    init: function (quizNum) { console.log('>>>>>> dragLine');

        var svgContainer = CESVG(QS('.quiz_'+ quizNum), 'svg');
        svgContainer.setAttribute('class', 'svgContainer');

        this.append(quizNum);
        QUIZ.objCount[quizNum-1] += this.dragLineObj.length;

        console.log(this.dragLineObj);
        for (var i = 0; i < this.dragLineObj.length; i++) {
            this.dragLineObj[i].style.cursor = 'pointer';
            this.dragLineObj[i].setAttribute('value', i + 1);
            new DragDrop({
                quizNum: quizNum,
                quizName: this.name,
                element: this.dragLineObj[i],
                top: this.objPosition[i].top,
                left: this.objPosition[i].left,
                width: this.objSize.width,
                height: this.objSize.height,
                callBack: function (e, param) {
                    var eventMaster = eventSelector('eventUp', e),
                        dropArea = QSAll('.quiz_'+ param.quizNum +' .lineDropArea'),
                        answerCount = 0;

                    if (eventMaster !== undefined &&
                        QUIZ.dragLine.dropCompare(param.quizNum, this, dropArea, eventMaster.clientX, eventMaster.clientY)) {
                        QUIZ.dragLine.setDragObjPosition(param.quizNum, this, param, true);
                    } else {
                        QUIZ.dragLine.setDragObjPosition(param.quizNum, this, param, false);
                    }
                }
            });
        }

        this.path = QSAll('.quiz_'+ quizNum +' .svgContainer > path');

        for (var i = 0; i < this.path.length; i++) {
            this.path[i].setAttribute('class', 'answerLine');
            this.path[i].setAttribute('value', this.dragLineObj[i].getAttribute('value'));
        }
    },

    // 각 요소 위치 저장
    append: function (quizNum) {
        var svgContainer = QS('.quiz_'+ quizNum + ' .svgContainer');

        this.dragLineObj = QSAll('.quiz_'+ quizNum +' .dragLineObj');
        this.dropArea = QSAll('.quiz_'+ quizNum +' .lineDropArea');
        this.objSize.width = QS('.quiz_'+ quizNum +' .dragLineObj').offsetWidth / 2;
        this.objSize.height = QS('.quiz_'+ quizNum +' .dragLineObj').offsetHeight / 2;
        this.dropSize.width = QS('.quiz_'+ quizNum +' .lineDropArea').offsetWidth / 2;
        this.dropSize.height = QS('.quiz_'+ quizNum +' .lineDropArea').offsetHeight / 2;
        this.dropPosition = [];
        this.objPosition = [];

        for (var i = 0; i < this.dropArea.length; i++) {
            this.dropPosition.push({top: this.dropArea[i].offsetTop, left: this.dropArea[i].offsetLeft});
        }

        for (var i = 0; i < this.dragLineObj.length; i++) {
            this.objPosition.push({top: this.dragLineObj[i].offsetTop, left: this.dragLineObj[i].offsetLeft});
        }
    },

    // 드랍 영역 체크
    dropCompare: function (quizNum, dragObj, dropArea, x, y) {

        var dragObjValue = dragObj.element !== undefined ? dragObj.element.getAttribute('value') : dragObj.getAttribute('value'),
            allDap = false,
            result;

        for (var i = 0; i < dropArea.length; i++) {
            var dropValue = dropArea[i].getAttribute('value').indexOf(',') > -1 ?
                    dropArea[i].getAttribute('value').split(',') : [dropArea[i].getAttribute('value')],
                dropAreaCss = dropArea[i].getBoundingClientRect();

            if (x === undefined && y === undefined) allDap = true;

            var comparePosition = x >= dropAreaCss.left &&
                x <= (dropAreaCss.left + dropAreaCss.width) &&
                y >= dropAreaCss.top &&
                y <= dropAreaCss.top + dropAreaCss.height;

            if (comparePosition || allDap) {
                for (var j = 0; j < dropValue.length; j++) {
                    if (dragObjValue == dropValue[j]) {

                        var dLeft = QSAll('.dLeft');
                        var dRight = QSAll('.dRight');

/*                        dLeft[dragObjValue-1].childNodes[0].style.backgroundColor = '#000';
                        dRight[dragObjValue-1].childNodes[0].style.backgroundColor = '#000';*/

                        result = true;
                    }
                }
                if (result === undefined) result = false;
            }
        }
        return result;
    },

    setDragObjPosition: function (quizNum, dragObj, param, type) {
        var obj = dragObj.element !== undefined ? dragObj.element : dragObj,
            idx = obj.getAttribute('value') - 1,
            top, left, targetPath, value, dropTop, dropLeft;

        QUIZ.dragLine.append(quizNum);

        this.path = QSAll('.quiz_' + quizNum +' .svgContainer > path');

        for (var i = 0; i < this.path.length; i++) {
            if (obj.getAttribute('value') == this.path[i].getAttribute('value')) {
                targetPath = this.path[i];
            }
        }

        value = targetPath.getAttribute('value');
        for (var i = 0; i < this.dropArea.length; i++) {
            if (obj.getAttribute('value') == this.dropArea[i].getAttribute('value')) {
                dropTop = this.dropArea[i].offsetTop + this.dropSize.width;
                dropLeft = this.dropArea[i].offsetLeft + this.dropSize.height;
            }
        }

        obj.style.left = param.left + 'px';
        obj.style.top = param.top + 'px';

        left = param.left + param.width;
        top = param.top + param.height;

        if (type) {
            obj.style.pointerEvents = 'none';
            obj.classList.add(this.name + 'Complete');
            targetPath.setAttribute('d', 'M '+ left +' '+ top + ' L '+ dropLeft +' '+ dropTop);
        } else {
            targetPath.setAttribute('d', 'M '+ 0 +' '+ 0 + ' L '+ 0 +' '+ 0);
        }


        DTCaliperSensor.fire({
            correct: null, // 정답 여부입력 [true, false] 중에서 택일
            itemObject: document.querySelector('[data-qid=guideItem05]'), // 해당 문항 객체
            value: '' // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
        });
    },

    // 드래그&드랍 성공
    COMPLETE: function (correct, quizNum) {
        QUIZ.dragLine.append(quizNum);
        this.path = QSAll('.quiz_' + quizNum +' .svgContainer > path');

        if (correct) {
            for (var i = 0, path, value, left1, top1, left2, top2; i < this.path.length; i++) {
                path = this.path[i];
                value = this.dropArea[i].getAttribute('value') - 1;
                left1 = this.objPosition[i].left + this.objSize.width;
                top1 = this.objPosition[i].top + this.objSize.height;
                left2 = this.dropPosition[value].left + this.dropSize.width;
                top2 = this.dropPosition[value].top + this.dropSize.height;

                path.setAttribute('d', 'M '+ left1 +' '+ top1 + ' L '+ left2 +' '+ top2);
            }

            for (var i = 0; i < this.dragLineObj.length; i++) {
                this.dragLineObj[i].style.pointerEvents = 'none';
                this.dragLineObj[i].classList.add(this.name + 'Complete');
            }
        }
        else {
            for (var i = 0; i < this.path.length; i++) {
                this.path[i].setAttribute('d', 'M '+ 0 +' '+ 0 + ' L '+ 0 +' '+ 0);
            }
            for (var i = 0; i < this.dragLineObj.length; i++) {
                this.dragLineObj[i].style.pointerEvents = 'auto';
                this.dragLineObj[i].classList.remove(this.name + 'Complete');
            }
        }

    }
}
