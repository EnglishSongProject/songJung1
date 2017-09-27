
//======================================= 동영상 팝업의 위치 설정하기
var imgPath = "images/common/player/";
var thumbPath = "images/";


// ******************************************************************************
// 미디어 컨트롤 : 초기 설정
var idxr=0;
var timeID;
//
var scriptHeight = 0; //자막파일의 최종높이
var scriptMax = 280;

//따라 말하기 기능
var playMode = 'normal'; //normal:보면서 듣기, repeat:따라 말하기, role:역할놀이
var roleNum = 1; //롤플레잉시 묵음을 할 사람 이름 0:그냥 재생, 1~n: 사람 번호
var repeatInfo = {seq:-1, wait:false, pauseTime:0, pauseCount:0, delay:0, limit:[20, 160] };
var scriptIdx = 0; //따라 말하기에서 현재 스크립트 위치를 참조함
var sectionIdx = 0; //normal에서 구간재생시 쓰임

function setPause(){
	var vdo = document.querySelector('#vdo');
	if (ispaused || vdo.paused){
		return;
	}

	vdo.pause();	

	var info = mediaInfo[idxr]; //sync:, syncText:
	var ctime = info.sync[repeatInfo.seq]; //[1, 5.00, 9.00](순번, 시작시간, 끝시간)
	repeatInfo.delay = Math.abs(ctime[2] - ctime[1]) * 1000;

	//console.log("ctime: " + ctime);
	//console.log("delaytime: " + delaytime);

	repeatInfo.pauseTime = new Date().getTime() + repeatInfo.delay;
	repeatInfo.pauseCount = 0;
	repeatInfo.wait = true;

	var waiter = document.getElementById('waiter_wrap');
	waiter.style.visibility = "visible";
	setWaiter();
}
function removeWaiter(){
	var waiter = document.getElementById('waiter_wrap');
	waiter.style.visibility = "hidden";
	repeatInfo.seq = -1;
	repeatInfo.wait = false;
}
function setWaiter(){
	//repeatInfo.pauseTime

	var now = new Date().getTime();
	var past = repeatInfo.pauseTime - now;
	//console.log(past);
	
	var vdo = document.querySelector('#vdo');
	var ball = document.getElementById('waitBall');
	var waiter = document.getElementById('waiter_wrap');

	if (past<=0){
		repeatInfo.wait = false;
		repeatInfo.seq = -1;

		//waiter 꺼주기		
		waiter.style.visibility = "hidden";	
		ball.style.left = repeatInfo.limit[0] + "px";
		removeWaiter();
		vdo.play();
	}else{
		var d = Math.max(0, repeatInfo.delay - past);
		var w = Math.abs(repeatInfo.limit[1] - repeatInfo.limit[0]);
		var rate = Math.max(0, Math.min(1, d/repeatInfo.delay));
		var cx = parseInt(repeatInfo.limit[0] + (w * rate));
		ball.style.left =  parseInt(cx) + "px";
		console.log([ball, cx, ball.style.left]);
	}
}



function setJump(){	
	removeWaiter();
	setCaption();
}

function setCaption(){


	var vdo = document.querySelector('#vdo');
	var play = document.querySelector('#play');

	if (vdo){
		var ctime = vdo.currentTime;
		var info = mediaInfo[idxr]; //sync:, syncText:
		var str = "";
		//[1.500, 08.000],
		//[8.001, 21.000]

		var txtInfo = null;
		var seq = -1;
		for (var i=0;i<info.sync.length;i++){
			if (ctime>=info.sync[i][1] && ctime<=info.sync[i][2]){
				seq = i;
				txtInfo = info.syncText[i];
				break;
			}
		}

		if (playMode == 'normal' && sectionIdx != 0){
			//구간 재생 체크
			var stime = mediaInfo[idxr].section[sectionIdx-1];
			//console.log([ctime, stime[0], stime[1]]);
			if (ctime>=stime[1]){
				console.log  ("구간 재생의 끝> 재생 가능한 상태로");
				ispaused = false;						
				removeWaiter();
				//
				vdo.pause();
				play.src = './images/common/controls/vdo/btnPlay.png';
			}
		}
		
		if (txtInfo){
			
			var vObj = $("#vdo"); //JQuery
			str = txtInfo[2]; //영문자막


			var whoNum = txtInfo[1];			

			//-------------------
			//롤플레이에 의한 묵음
			if (playMode == 'normal'){
				//모든 목소리 정상 재생

			}else if (playMode == 'repeat'){

				//현재 표시할 자막이 있음
				if (repeatInfo.seq == seq){
					//이미 진입한 자막과 같다
				}else{
					console.log ("새로 진입");
					repeatInfo.seq = seq;
				}

			}else{
				//role				
				if (whoNum == roleNum){					
					vObj.prop('muted', true); //mute
				}else{
					vObj.prop('muted', false);
					roleMute.on = false;
				}
			}

		}else{
			//자막이 비는 시간
			if (playMode == 'repeat'){
				if (repeatInfo.seq != -1){
					console.log  ("재생중인 자막의 끝");
					setPause();
				}		
			}
		}		
		document.querySelector('.txt_one').innerHTML = str;


		//재생중에 해당
		if (playMode == 'repeat'){
			if (seq == -1){
				//자막이 없음
				repeatInfo.seq = -1;

			}else{
				//표시할 자막이 있음
				if (repeatInfo.seq == -1){
					//자막이 없었음, 새로 진입
					repeatInfo.seq = seq;
				}else{
				}
			}
		}		
	}	
}




function mediaInit(idx) {
	idxr = idx;
	//
	var wrap = document.querySelector('#vwrap'),
	videoWrap = wrap.getElementsByClassName('videoWrap');
	AllOff();
	if(videoWrap.length > 0) {
		mediaType(idx);
	}	
}

function mediaClose(){
	clearInterval(timeID);
	repeatInfo.wait = false;
	repeatInfo.seq = -1;

	var waiter = document.getElementById('waiter_wrap');
	waiter.style.visibility = "visible";


	var vdo = document.querySelector('#vdo');
	if(vdo){		
		vdo.currentTime = 0;
		setProg(0);
		$('#vdo').remove();
	}	
	var videoContainer = document.querySelector('.videoContainer');
	if (videoContainer){		
		$('.videoContainer').remove();
	}


}


// 미디어 컨트롤 : 이벤트
function mediaType(idx) {
	var sc = mediaInfo[idx];
	//
	var src = sc.folder[0];
	var wrap = document.querySelector('#vwrap'),
		ani = wrap.getElementsByClassName('ani'),
		videoWrap = wrap.getElementsByClassName('videoWrap');
	
	//타이틀 
	document.querySelector('.media_tt').innerHTML = mediaInfo[idx].title;


	//영한 자막 생성
	/*
	syncText: [
		// 동영상 텍스트
		[1, 1, 'There is a map. Austrailia and Republic south africa is in where.', '남반구에 위치한 오스트레일리아나 남아프리카 공화국에는 이런 지도가 있대.'],
		[1, 2, 'Whe is?', '왜 그럴까?']		
		]

		role:[['Teacher','선생님'],['Student','학생']],
		rolePos:[100, 50, 200], //'선생님:'의 넓이와 콜론의 x좌표 

		*/
	var who = '';
	var strAll = '';	
	var rowSize_en = 50;
	var rowSize_kr = 50;
	var pos_fy = 10;
	var margin_top = 20;
	var margin_han = 25;
	var margin_row = 20;
	var i;

	for (var i=0;i<sc.syncText.length;i++){
		var lineOne = sc.syncText[i];
		//role:[['Teacher','선생님'],['Student','학생']],
		//[4, 1, 'specially.', '특별히'],

		//en - 영문 자막 생성
		var whoIdx = lineOne[1]-1;
		//console.log("whoIdx: " + whoIdx);

		var who_e = sc.role[whoIdx][0] + ":";
		var str_e = lineOne[2];
		pos_y =  margin_top + (i*rowSize_en);
		var e_who = "<div class='txt_who'"
			+ " id='who_en" + i + "'"
			+ " style='position:absolute; text-align:right;"				
			+ " width:"+ sc.rolePos[0] +"px;"
			+ "left:"+ sc.rolePos[1] +"px;"
			+ "top:"+ pos_y +"px;"
			+ "'>"
			+ who_e +"</div>";

		var e_str = "<div class='txt_txt'"
			+ " id='txt_en" + i + "'"
			+ " style='position:absolute; left:" + sc.rolePos[2] + "px;"
			+ " top:"+ pos_y +"px;"
			+ "'>"
			+ str_e +"</div>";
		strAll += e_who + e_str;

		
		//글kr - 한글 자막 생성
		var who_k = sc.role[whoIdx][1] + ":";
		var str_k = lineOne[3];
		pos_y =  margin_top + (i*rowSize_kr) + margin_han;
		var k_who = "<div class='txt_who'"
			+ " id='who_kr" + i + "'"
			+ " style='position:absolute; text-align:right;"			
			+ " width:"+ sc.rolePos[0] +"px;"
			+ "left:"+ sc.rolePos[1] +"px;"
			+ "top:"+ pos_y +"px;"
			+ "'>"
			+ who_k +"</div>";

		var k_str = "<div class='txt_txt'"
			+ " id='txt_kr" + i + "'"
			+ " style='position:absolute; left:" + sc.rolePos[2] + "px;"
			+ " top:"+ pos_y +"px;"
			+ "'>"
			+ str_k +"</div>";
		strAll += k_who + k_str;

	}
	var scPaper = document.querySelector('.txt_sct');
	scPaper.innerHTML = strAll;


	//높이 정렬하기	
	var who;	
	var txt;
	var maxHeight = 0;
	pos_y = margin_top;
	for (var i=0;i<sc.syncText.length;i++){
		who = $('#who_en' + i);
		txt = $('#txt_en' + i);
		who.css('top', pos_y + "px");
		txt.css('top', pos_y + "px");
		maxHeight = Math.max(who.height(), txt.height());
		pos_y+= maxHeight + margin_row;

		//console.log('pos_y: ' + i + "> "+ pos_y);

		who = $('#who_kr' + i);
		txt = $('#txt_kr' + i);
		who.css('top', pos_y + "px");
		txt.css('top', pos_y + "px");
		maxHeight = Math.max(who.height(), txt.height());
		if (i<sc.syncText.length-1){
			pos_y+= maxHeight + margin_row;
		}else{
			pos_y+= maxHeight;
		}
	}
	scriptHeight = pos_y;
	var overH = Math.max(0, scriptHeight - scriptMax);
	var em = document.querySelector('.scController');
	if (overH>0){
		em.style.display = 'block';
	}else{
		em.style.display = 'none';
	}

	


	var ani_p = ani[0];
	var videoWrap_p = videoWrap[0];

	//videoWrap_p는 videoWrap의 첫번째 요소	
	if(document.querySelector('.videoContainer')){
		//기존 비디오가 있으면 삭제
		//document.querySelector('.videoContainer').remove();
	}
	if(document.querySelector('#vdo')){
		//document.querySelector('#vdo').remove();
	}

	var videoContainer = createElement('div', videoWrap_p, 'videoContainer');
	var videoContainerHTML = '';//document.querySelector('.videoContainer');
	var splitSrc = src.split('/', '4');
	
	// 비디오 태그 생성
	//<div class="txt">*동영상의 대표 이미지를 poster로 지정해야 함</div>
	var posterStr = './media/'+ splitSrc[2] +'/'+ splitSrc[3] +'.jpg';
	videoContainerHTML = '<video bgcolor="#ffffff" id="vdo" title="movie" poster="' + posterStr + '" class="vdos" controls="" webkit-playsinline="" playsinline=""><source src="'+ src +'.mp4" type="video/mp4"></source></video>';
	videoContainerHTML += '<img class="thumImg" src="' + posterStr + '" />';
	videoContainer.innerHTML = videoContainerHTML;

	
	//section: 구간재생 아이콘 설정
	var section = sc.section;
	var thumbStr = "<div class='thumb_box'><img id='thumb_box' src='" + imgPath + "thumbbox.png' /></div>";
	for (var i=0;i<=section.length;i++){
		var di = section.length - i; //오른쪽을 먼저 배치함
		var lineOne = section[i]; // 동영상 구간 재생 [시작시간, 종료시간], 이미지는 규칙적임
		var thImg = thumbPath + pageNum + "/thumb" + (idxr) + "_" +  di + ".png";
		var dstr = "<div class='thumb_one' id='tb"+di+"' style='right:" + (i * 70) + "px;'><img id='th" + di + "' src='" + thImg + "' /></div>";

		thumbStr+=dstr;
		console.log(dstr);
	}
	//console.log(thumbStr);

	var thumbList = document.querySelector('.thumb_list');
	thumbList.innerHTML = thumbStr;

	sectionIdx = 0;
	var box = document.querySelector('.thumb_box');
	box.style.right = ((section.length * 70) - 2) + "px";

	for (var i=0;i<=section.length;i++){		
		$("#th" + i).bind("mousedown", function(){
			sectionIdx = targetNum($(this));
			sectionPlay();
		});
	}


	setTimeout(function () {
		initVdo();
	});	

	showhideScript(0); //영어보기가 기본
}
function sectionPlay(){
	var vdo = document.querySelector('#vdo');
	var play = document.querySelector('#play')

	ispaused = false;
	removeWaiter();
	setCaption();

	if (sectionIdx == 0){
		vdo.currentTime = 0;
	}else{
		var stime = mediaInfo[idxr].section[sectionIdx-1];
		vdo.currentTime = stime[0];
		console.log(stime);
	}
	//선택된 구간 이미지
	showSectionThumb();

	var vdo = document.querySelector('#vdo');
	var play = document.querySelector('#play');
	document.querySelector('.thumImg').style.display = 'none';	
	play.src = './images/common/controls/vdo/btnPause.png';
	vdo.play();	
}
function showSectionThumb(){
	var thx = $('#tb' + sectionIdx).position().left -2;
	var box = document.querySelector('.thumb_box');
	box.style.left = thx + "px";
	//$('#thumb_box').position().left = thx + "px";
	console.log(thx);
}

function targetNum(obj){
	//클래스 이름 중 맨 뒤의 한자리 숫자를 리턴함
	//var obj = $(this);
	var classname = obj.attr('id');	
	var num = classname.charAt(classname.length-1);
	return parseInt(num);
}

function initVdo(){
	var vdo = document.querySelector('#vdo'),
		play = document.querySelector('#play'),
		stop = document.querySelector('#stop'),
		videoContainer = document.querySelector('.videoContainer');

	vdo.controls = false;
	vdo.paused = false;
	vdo.currentTime = 0;	

	ispaused = false;
	removeWaiter();
	setCaption();
	setProg(0);

	play.src = './images/common/controls/vdo/btnPlay.png';

	//재생시간이 바뀔때마다 호출되나 간격이 너무 멀다, Interval로 대신 함
	//vdo.addEventListener('timeupdate', onTimeupdate, false);
	if (timeID){
		clearInterval(timeID);
	}
	timeID = setInterval(onTimeupdate, 10);

	//전체 길이가 왔을때 실행해야 함
	vdo.addEventListener('ended', onTimeupdate, false);
	$('#vdo').on('ended', onComplete); //재생을 모두 마치면 호출함
}
function onComplete(){
	console.log('complete..');
	initVdo();
}
function onTimeupdate() {
	var vdo = document.querySelector('#vdo'),
		playBar = document.querySelector('#playBar'),
		play = document.querySelector('#play'),
		stop = document.querySelector('#stop');

	var curmins = Math.floor(Math.round(vdo.currentTime) / 60),
		cursecs = Math.floor(Math.round(vdo.currentTime) - curmins * 60),
		durmins = Math.floor(Math.round(vdo.duration) / 60),
		dursecs = Math.floor(Math.round(vdo.duration) - durmins * 60);

	if(cursecs < 10) { cursecs = '0' + cursecs; }
	if(dursecs < 10) { dursecs = '0' + dursecs; }
	if(curmins < 10) { curmins = '0' + curmins; }
	if(durmins < 10) { durmins = '0' + durmins; }

	curtime = document.querySelector('.time_pos');
	durtime = document.querySelector('.time_dur');
	curtime.innerHTML = curmins + ':' + cursecs;
	durtime.innerHTML = durmins + ':' + dursecs;

	
	//console.log ([vdo.currentTime, vdo.duration]);
	var rate = Math.min(1, vdo.currentTime/vdo.duration);
	if (vdo.paused){
	}else{
		setProg(rate);		
	}	
	if (repeatInfo.wait){
		setWaiter();			
	}
}


//동영상 컨트롤러 관련
var progLimit = [0, 740];
var per = 0; //재생 시간
var ispaused = true; //사용자 동작 전에 재생중이었는지 저장함

var dragOn = 0; //0은 디폴트, 1은 프로그래스, 2는 볼륨
var dragxy = 0; //마우스와 드래그 요소의 좌표 오차
var capturedButton = null;


//사운드 볼륨 관련
var spk = 1; //음소거 저장 (1, 0)
var vol = 1;

var propVolume = "soundvolume";
var propSpk = "soundspk";
var volLimit = [0, 58];

var scLimit = [2, 198]; //대본 스크롤바 이동영역


$(document).ready(function(){
	//동영상 컨트롤 동작
	$("#prog_ball").bind("mousedown", function(){
		var vdo = document.querySelector('#vdo');
		ispaused = vdo.paused;
		vdo.pause();

		dragOn = 1;
		barDown(event);
	});
	$("#prog_mouse").bind("mousedown", function(){
		var vdo = document.querySelector('#vdo');
		ispaused = vdo.paused;
		vdo.pause();
		//
		dragOn = 1;
		barDown(event);
	});
	$("#prog_mouse").bind("onmouseup", function(){
		barUp(event);		
	});

	//볼륨 컨트롤 버튼동작
	$('#vol_spk').on('click',function(){
		if (spk == 0){
			spk = 1;
		}else{
			spk = 0;
		}
		setCookie(propSpk, spk, 10);
		showVol(vol);
	});

	//볼륨 드래그 동작
	$("#vol_mouse").bind("mousedown", function(){
		dragOn = 2;
		barDown(event);
		//
		spk = 1;
		setCookie(propSpk, spk, 10);
		showVol(vol);
	});
	$("#vol_mouse").bind("onmouseup", function(){
		barUp(event);
	});

	//자막 드래그 볼
	$(".sc_ball").bind("mousedown", function(event){
		dragxy = event.clientY - ($('.sc_paper').position().top + $('.scController').position().top + $(this).position().top);
		//console.log("dragxy: " + dragxy);
		dragOn = 3;
		barDown(event);
	});
	//자막 드래그 바닥
	$(".sc_bg").bind("mousedown", function(event){
		var ball_Half_H = parseInt($('.sc_ball').height() /2);
		var pos = event.clientY - ($('.sc_paper').position().top + $('.script_wrap').position().top + $('.scController').position().top);
		pos -= ball_Half_H;
		//console.log("dragxy: " + event.clientY);		
		var limit = scLimit;
		var pos = Math.max(limit[0], Math.min(limit[1], pos));
		setSc(pos);
	});


	applyCookieVol();
	setProg(per);

	//재생 버튼
	var play = document.querySelector('#play');
	play.addEventListener('click', function () {
		var vdo = document.querySelector('#vdo');
		var play = document.querySelector('#play');
		document.querySelector('.thumImg').style.display = 'none';
		

		if(vdo.paused) {			
			if (playMode == 'repeat' && repeatInfo.wait){
				removeWaiter();
				play.src = './images/common/controls/vdo/btnPlay.png';
				vdo.pause();
			}else{
				//재생
				if (playMode == "normal" && sectionIdx !=0){
					var stime = mediaInfo[idxr].section[sectionIdx-1];
					if (vdo.currentTime>=stime[1]){
						//구간 재생이 종료되어 되돌림
						vdo.currentTime = stime[0];
					}
				}
				play.src = './images/common/controls/vdo/btnPause.png';
				vdo.play();
			}
		} else {
			//일시 정지
			play.src = './images/common/controls/vdo/btnPlay.png';
			vdo.pause();
		}
	}, false);
	


	// 정지 버튼
	var stop = document.querySelector('#stop');
	stop.addEventListener('click', function() {
		console.log('stop..');
		var vdo = document.querySelector('#vdo');
		var play = document.querySelector('#play');
		play.src = './images/common/controls/vdo/btnPlay.png';
		vdo.currentTime = 0;
		vdo.pause();

		//
		removeWaiter();
		setProg(0);
	}, false);



	//자막 버튼
	var btn_cap = document.querySelector('#prog_cap');
	btn_cap.addEventListener('click', function (e) {
		//console.log('#prog_cap.click');
		var em = document.querySelector('.caption_wrap');
		var tm = document.querySelector('.script_wrap');
		var scy = [50, 0];
		if (em.style.display == 'none'){
			em.style.display = 'block';
			tm.style.top = scy[0] + "px";
		}else{
			em.style.display = 'none';
			tm.style.top = scy[1] + "px";
		}
	}, false);

	//대본 버튼
	var btn_sct = document.querySelector('#prog_sct');
	btn_sct.addEventListener('click', function () {
		var em = document.querySelector('.script_wrap');
		if (em.style.display == 'none'){
			em.style.display = 'block';
		}else{
			em.style.display = 'none';
		}
	}, false);


	//영, 한영, 한
	var btn_en = document.querySelector('.btn_en');
	btn_en.addEventListener('click', function () {
		showhideScript(0);	
	}, false);
	var btn_ek = document.querySelector('.btn_ek');
	btn_ek.addEventListener('click', function () {
		showhideScript(1);			
	}, false);
	var btn_kr = document.querySelector('.btn_kr');
	btn_kr.addEventListener('click', function () {
		showhideScript(2);			
	}, false);

});


function showhideScript(num){
	var sc = mediaInfo[idxr];
	var who, txt;
	if (num == 0){
		//0:영, 1:영한, 2:한
	}
	for (var i=0;i<sc.syncText.length;i++){
		who = $('#who_en' + i);
		txt = $('#txt_en' + i);
		who.css('visibility', (num == 0 || num == 1) ? "visible" : "hidden");
		txt.css('visibility', (num == 0 || num == 1) ? "visible" : "hidden");
	
		who = $('#who_kr' + i);
		txt = $('#txt_kr' + i);
		who.css('visibility', (num == 1 || num == 2) ? "visible" : "hidden");
		txt.css('visibility', (num == 1 || num == 2) ? "visible" : "hidden");
	}


	var iconList = ['icon_en','icon_ke','icon_kr'];
	var imgList = ['player_ke_en','player_ke_ke','player_ke_kr'];
	for (i=0;i<3;i++){
		var obj = document.getElementById(iconList[i]);
		if (i == num){
			obj.src = imgPath+imgList[i] + "1.png";
		}else{
			obj.src = imgPath+imgList[i] + "0.png";
		}
	}
}

//컨트롤 동작에 필요
function onButtonLoseCapture(){
	onButtonUp();
}

function OnButtonUp () {
	if (capturedButton) {
		if (window.removeEventListener) {	// all browsers except IE before version 9
			window.removeEventListener ("mouseup", OnButtonUp, true);
		}else {
			if (capturedButton.releaseCapture) {	// IE before version 9
				capturedButton.detachEvent ("onlosecapture", OnButtonLoseCapture);
				capturedButton.releaseCapture ();
			}
		}
		capturedButton = null;
	}	
	document.onmousemove = null;
	barUp();
	dragOn = 0;
}

function btnCapture(button){
	capturedButton = button;
	if (window.addEventListener) {	// all browsers except IE before version 9
		window.addEventListener ("mouseup", OnButtonUp, true);
	}else {
		if (button.setCapture) {	// IE before version 9
			button.attachEvent ("onlosecapture", OnButtonLoseCapture);
			button.setCapture ();
		}
	}
}


//사운드 볼륨 관련
function applyCookieVol(){	
	var savedVol = 100;

	if(window.localStorage) {
		for(var key in localStorage) {			
			if (key == propVolume){
				savedVol = parseInt(localStorage.getItem(key));				
			}else if (key == propSpk){
				spk = parseInt(localStorage.getItem(key));
			}
		}
	}else{
		var cookieVol = getCookie(propVolume);
		if (cookieVol){
			savedVol = parseInt(cookieVol);
		}
		var cookieSpk = getCookie(propSpk);
		if (cookieSpk){
			spk = parseInt(cookieSpk);
		}
	}
	//
	
	vol = savedVol/100;
	setVol(vol);
}
function getCookie(cookieName)	{
	var search = cookieName + "=";
	var cookie = document.cookie;

	// 현재 쿠키가 존재할 경우
	if( cookie.length > 0)	{
		startIndex = cookie.indexOf( cookieName );
		if(startIndex != -1){		
			startIndex += cookieName.length;
			endIndex = cookie.indexOf( ";", startIndex );
			if( endIndex == -1){
				endIndex = cookie.length;
			}
			// 쿠키값을 추출하여 리턴
			return unescape( cookie.substring( startIndex + 1, endIndex ) );
		}else{
			// 쿠키 내에 해당 쿠키가 존재하지 않을 경우
			return false;
		}
	}else{
		// 쿠키 자체가 없을 경우
		return false;
	}
}


function setCookie( cookieName, cookieValue, expireDate){
	var today = new Date();	
	if(window.localStorage) {
		localStorage.setItem(cookieName, cookieValue);
	}else{
		today.setDate(today.getDate() + parseInt(expireDate));
		document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + today.toGMTString() + ";"
	}
}


//마우스 동작
function barDown(event){
	button = event.currentTarget;
	btnCapture(button);
	document.onmousemove = barDrag;
	barDrag(event);
}

function barDrag(event){
	var limit = progLimit;
	var fx = $('.progController').position().left + $('#prog_gray').position().left;
	fy = 0;

	if (dragOn == 1){
	}else if (dragOn == 2){
		limit = volLimit;
		fx = $('.volController').position().left + $('#vol_gray').position().left;
	}else if (dragOn == 3){
		limit = scLimit;
		fy = $('.sc_paper').position().top + $('.scController').position().top;
	}

	var w = Math.abs(limit[0] - limit[1]);
	var cx = event.clientX - fx;
	var cy = event.clientY - fy - dragxy;
	//cx = Math.max(limit[0], Math.min(limit[1], cx)) - limit[0];
	
	var rate = cx/w;
	//console.log ("rate: " + [cx, rate]);

	if (dragOn == 1){		
		setProg(rate);
		if (rate == 0){
			document.querySelector('.thumImg').style.display = 'block';
		}else{
			document.querySelector('.thumImg').style.display = 'none';
			var vdo = document.querySelector('#vdo');
			vdo.currentTime = vdo.duration * rate;
			//console.log(vdo.currentTime);
		}
	}else if (dragOn == 2){		
		setVol(rate);
	}else if (dragOn == 3){
		cy = Math.max(limit[0], Math.min(limit[1], cy));
		setSc(cy);
	}
}


function barUp(){
	if (dragOn == 1){
		//console.log("ispaused: " + ispaused);
		if (ispaused == false){
			//재생중이었음
			var vdo = document.querySelector('#vdo');
			vdo.play();
		}
	}
	dragOn = 0;	
}

function setProg(rate){
	per = Math.max(0, Math.min(1, rate));		
	var w = Math.abs(progLimit[0] - progLimit[1]);
	var cx = parseInt(progLimit[0] + (per * w));

	var pObj = document.getElementById('prog_color');	
	pObj.style.width =  parseInt(cx) + "px";

	pObj = document.getElementById('prog_ball');
	pObj.style.left =  parseInt(cx - 10) + "px";

	setCaption();
}

function setSc(cy){
	var tm = document.querySelector('.sc_ball');
	tm.style.top =  parseInt(cy) + "px";
	var rate = (cy - scLimit[0])/Math.abs(scLimit[0] - scLimit[1]);
	
	var overH = Math.max(0, scriptHeight - scriptMax);
	var sch = parseInt(-overH * rate);

	tm = $('.script_txt');
	tm.css('top', sch + "px");

	//console.log([cy, rate, scriptHeight, overH, sch ]);
}

function setCaption1(){
}



function setVol(rate){
	vol = Math.max(0, Math.min(1, rate));
	var p = parseInt(rate * 100);
	var volPercent = Math.max(0, Math.min(100, p));
	setCookie(propVolume, volPercent, 10);
	//
	showVol(vol);
}

function showVol(rate){
	if (spk == 0){
		rate = 0;
	}
	
	var snd = document.getElementById('vol_color');		
	var w = Math.abs(volLimit[0] - volLimit[1]);
	snd.style.width = (volLimit[0] + (rate * w)) + "px";

	//var vdo = document.querySelector('#vdo');
	//vdo.volume = rate;
	var element = document.getElementById('vdo');
	if (element){
		element.volume = rate;
	}
	


	

	var speaker = document.getElementById('img_spk');
	if (spk == 0){
		speaker.src = imgPath+"mov_spk0.png";
	}else{
		speaker.src = imgPath+"mov_spk1.png";
	}
}

function AllOff(){
	$("video, audio").each(function(){
		$(this).get(0).pause();
		$(this).parent().find('.play_pause_button').removeClass('pause');
		$(this).parent().find('.play_pause_button').addClass('play');
		$(this).parent().find('.play_pause_button').html('재생');
	});
}

function layerAclose(){
	if($('.summarize_pop'))$('.summarize_pop').hide();
	if($('.ref .title'))$('.ref .title').removeClass('active').parent().children('.text').hide();
	if($('.learning_goal .learning_goal_img'))$('.learning_goal .learning_goal_img').removeClass('active').parent().children('.learning_goal_text').hide();
	if($('.a_ps'))$('.a_ps').hide();
	if($('.b_ps')){$('.b_ps').hide()};
	if($('.s_p_answer')){$('.s_p_answer').hide();};
	if($('.ex_answer')){$('.ex_answer').hide().parent().removeClass('active');};
}
function createElement (type, targetElement, className, width, height) {
	var createObject = document.createElement(type);

	if (className !== undefined) createObject.className = className;
	if (width !== undefined) 	 createObject.style.width = width + 'px';
	if (height !== undefined) 	 createObject.style.height = height + 'px';

	targetElement.appendChild(createObject);
	return createObject;
}