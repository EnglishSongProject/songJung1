var xa=apn.inheritWidget(apn.widgets["apn.wgt.rect"]);delete xa.styleMap.textPadding,delete xa.styleMap.textValign,delete xa.styleMap.dragX,delete xa.styleMap.dragY,delete xa.styleMap.dragInParent,delete xa.styleMap.dragContainParent,xa.APX_NO_POINTER_EV=!0,xa.editor=xa.editor||{},xa.editor.states={normal:"Normal",readonly:"Readonly"},xa.editor.properties={ty:{title:"Type",input:[{title:"Text",value:""},{title:"Number",value:"number"}]},mxl:{title:"MaxLength",input:""},sly:{title:"ScrollBarY",input:[{title:"Auto",value:""},{title:"Always",value:"s"},{title:"Hidden",value:"h"}]}},xa.properties=xa.properties||{},xa.properties.state="normal",xa.scriptInfo={wgtData:{selection:{help:"{start:0-based Number,end:1-based Number}\nSelection area of text"}},wgtRun:{focus:{param:"true",help:"Set focus on this input."}}},xa.exeSetState=function(t,e,n){"readonly"==n?(e.apxInputTag.readOnly=!0,e.apxInputTag.placeholder=""):(e.apxInputTag.readOnly=!1,e.apxInputTag.placeholder=t.wgtGetProperty(e.apnOID,"apxText")||"")},xa.exeCreateTag=function(t,e,n,a,i,r){var p;t.o.standAlone&&r&&(p=apn.CExe.getElementByAttr("div","data-apx-id",r))?(p.apnCur={},p.apnCur.apxCreatedFromTag=!0):(p=document.body.$TAG("div",{style:"position:absolute;box-sizing:border-box;"}),p.apnCur={});var o=apn.Project.getLayout(t.project).property.CExe,s="";o&&o.lng&&"N"==o.lng.ime||(s="ime-mode:active;");var l=n.create.data;if(l.styles&&!l.styles.textMultiLine)p.apnCur.apxCreatedFromTag?p.apxInputTag="input"==p.firstChild.tagName.toLowerCase()?p.firstChild:p.firstChild.firstChild:p.apxInputTag=p.$TAG("input",{type:l.properties&&l.properties.attrs&&l.properties.attrs.ty?l.properties.attrs.ty:"text",style:s+"opacity:1;color:inherit;text-decoration:inherit;background-color:transparent;text-align:inherit;font:inherit;position:absolute;left:0px;top:0px;margin:0px;padding:0px;height:100%;width:100%;border:none;outline:none;"});else{var u="auto";l.properties&&l.properties.attrs&&"s"==l.properties.attrs.sly?u="scroll":l.properties&&l.properties.attrs&&"h"==l.properties.attrs.sly&&(u="hidden"),l.styles.textValign="top",p.apnCur.apxCreatedFromTag?p.apxInputTag="textarea"==p.firstChild.tagName.toLowerCase()?p.firstChild:p.firstChild.firstChild:(p.apxInputTag=p.$TAG("textarea",{style:s+"opacity:1;color:inherit;text-decoration:inherit;background-color:transparent;text-align:inherit;font:inherit;position:absolute;left:0px;top:0px;overflow-y:"+u+";overflow-x:hidden;resize:none;margin:0px;padding:0px;height:100%;width:100%;border:none;outline:none;"}),p.apxInputTag.$A({class:"apnCExeScroll"}))}if(l.properties&&l.properties.attrs&&l.properties.attrs.mxl){var d=bx.$checkNaN(parseInt(l.properties.attrs.mxl));d&&(p.apxInputTag.setAttribute("maxlength",d),l.properties&&l.properties.attrs&&"number"==l.properties.attrs.ty&&p.apxInputTag.setAttribute("max",Math.pow(10,d)-1))}var x={start:0,end:0};return bx.Event.add(p.apxInputTag,"input",function(){this.parentNode.apnOID&&(x.start=this.selectionStart,x.end=this.selectionEnd,e.wgtSetProperty(this.parentNode.apnOID,"selection",x,!0),e.fireEvent("inputChange",void 0,this.parentNode.apnOID))},!1),bx.Event.add(p.apxInputTag,"focus",function(){bx.HCL.DV.isIOS()&&"input"==this.tagName&&bx.DOM.isVisible(this)&&(this.style.height="auto",this.style.top=(p.clientHeight-this.offsetHeight)/2+"px",p.style.overflow="hidden"),this.parentNode.apnOID&&e.fireEvent("inputFocus",void 0,this.parentNode.apnOID)},!1),bx.Event.add(p.apxInputTag,"blur",function(){this.parentNode.apnOID&&e.fireEvent("inputBlur",void 0,this.parentNode.apnOID)},!1),bx.Event.add(p.apxInputTag,"select",function(){this.parentNode.apnOID&&(x.start=this.selectionStart,x.end=this.selectionEnd,e.wgtSetProperty(this.parentNode.apnOID,"selection",x,!0))},!1),p.apxInputTag.apxOnEvent=function(t,n,a,i){"click"==n&&(x.start=this.selectionStart,x.end=this.selectionEnd,e.wgtSetProperty(this.parentNode.apnOID,"selection",x,!0))},p.apxInputTag.$CSS("textShadow","inherit"),p.apnOnSetText=function(t,e,n,a,i,r,p,o,s,l){if(n&&(t._initValign=n),a&&(t._initAlign=a),void 0!==i&&(t._initMultiLine=i),void 0!==r&&(t._initWordWrap=r),void 0!==p&&(t._initFont=p),l&&(t._initFontSize=l),o&&(t._initLtrSp=o),s&&(t._initLnSp=s),p=p||t._initFont,s=s||t._initLnSp,o=o||t._initLtrSp,l){var u=1.2;apn.fonts&&apn.fonts[p]&&void 0!==apn.fonts[p].height&&(u=apn.fonts[p].height);var d=l*u;s&&(d+=s),t.apxInputTag.style.lineHeight=d+"px",o?t.apxInputTag.style.letterSpacing=o+"px":t.apxInputTag.style.letterSpacing="normal"}},p},xa.exeRenderTag=function(t,e,n,a,i,r){return apn.widgets.utils.exeRenderTag.call(this,void 0,t,e,n,a,i,r)},xa.pubOnGetHTML=function(t,e,n,a){function i(t,e,n,a){var i="",r=apn.Project.getLayout(t).property.CExe;r&&r.lng&&"N"==r.lng.ime||(i+="ime-mode:active;");var p,o="",s=apn.Project.getExeModule(t);if(s.IStub_pubProcWgtAttr&&(p=s.IStub_pubProcWgtAttr(t,e,n))&&p.attr0)for(var l in p.attr0)void 0!==p.attr0[l]&&(o+=" "+l+'="'+p.attr0[l]+'"');var u=t.pages[e].objects[n].create.data;if(i+="opacity:1;color:inherit;text-decoration:inherit;background-color:"+(a.style.fillStyle||"rgba(0,0,0,0)")+";text-align:inherit;font:inherit;position:relative;left:0px;top:0px;margin:0px;padding:0px;height:100%;width:100%;border:none;outline:none;",u.styles&&!u.styles.textMultiLine)return"<input"+o+' type="'+(u.properties&&u.properties.attrs&&u.properties.attrs.ty?u.properties.attrs.ty:"text")+'" style="'+i+'"></input>';var d="auto";return u.properties&&u.properties.attrs&&"s"==u.properties.attrs.sly?d="scroll":u.properties&&u.properties.attrs&&"h"==u.properties.attrs.sly&&(d="hidden"),i+="overflow-y:"+d+";overflow-x:hidden;resize:none;","<textarea"+o+' style="'+i+'" class="apnCExeScroll"></textarea>'}return apn.widgets.utils.getHTML.call(this,void 0,t,e,n,i,a)},xa.exeOnLoad=function(t,e){function n(t,n){t==e&&i.apxInputTag.focus()}function a(t,n){t==e&&n&&i.apxInputTag.setSelectionRange(n.start,n.end)}var i=t.wgtTag(e);t.wgtSetProperty(e,"selection",{start:0,end:0},!0),t.wgtListenProperty(e,"focus",n),t.wgtListenProperty(e,"selection",a)},xa.exeOnStart=function(t,e){t.fireEvent("inputSet",void 0,e)},xa.exeInputGet=function(t,e){return e.apxInputTag.value},xa.exeInputSet=function(t,e,n){return e.apxInputTag.value!=n&&t.fireEvent("inputSet",void 0,e.apnOID),e.apxInputTag.value=n},xa.edtOnBuildEvent=function(t,e,n,a){a.inputChange={value:"inputChange",title:apn.P.eventTitle.inputChange},a.inputSet={value:"inputSet",title:apn.P.eventTitle.inputSet},a.inputFocus={value:"inputFocus",title:apn.P.eventTitle.inputFocus},a.inputBlur={value:"inputBlur",title:apn.P.eventTitle.inputBlur}},uxWgtInputText=xa;
var xa=apn.inheritWidget(apn.widgets["apn.wgt.rect"]);xa.styleMap={title:!0,visibility:!0,alpha:!0},xa.APX_NO_POINTER_EV=!0,xa.properties=xa.properties||{},xa.properties.attrs={cfg:{c:"",n:"",v:""}},xa.exeCreateTag=function(t,e,a,n,i,p){var r;t.o.standAlone&&p&&(r=apn.CExe.getElementByAttr("div","data-apx-id",p))?(r.style.overflow="hidden",r.apnCur={},r.apnCur.apxCreatedFromTag=!0):(r=document.body.$TAG("div",{style:"position:absolute;overflow:hidden;box-sizing:border-box;"}),r.apnCur={}),r.apnCur.apxCreatedFromTag?r.apxInputTag="input"==r.firstChild.tagName.toLowerCase()?r.firstChild:r.firstChild.firstChild:(r.apxInputTag=r.$TAG("input",{type:"checkbox",style:(t.o.standAlone?"":"-webkit-appearance:checkbox;")+"margin:0px;padding:0px;height:100%;width:100%;outline:none;"}),a.create.data.properties.attrs.cfg.n&&r.apxInputTag.setAttribute("name",a.create.data.properties.attrs.cfg.n),a.create.data.properties.attrs.cfg.v&&r.apxInputTag.setAttribute("value",a.create.data.properties.attrs.cfg.v),"Y"==a.create.data.properties.attrs.cfg.c&&(r.apxInputTag.checked=!0));return bx.Event.add(r.apxInputTag,"change",function(){this.parentNode.apnOID&&e.fireEvent("inputChange",void 0,this.parentNode.apnOID)},!1),r},xa.exeRenderTag=function(t,e,a,n,i,p){return apn.widgets.utils.exeRenderTag.call(this,void 0,t,e,a,n,i,p)},xa.pubOnGetHTML=function(t,e,a,n){function i(t,e,a,n){var i,p="",r=apn.Project.getExeModule(t);if(r.IStub_pubProcWgtAttr&&(i=r.IStub_pubProcWgtAttr(t,e,a))&&i.attr0)for(var d in i.attr0)void 0!==i.attr0[d]&&(p+=" "+d+'="'+i.attr0[d]+'"');var o=t.pages[e].objects[a].create.data;o.properties.attrs.cfg.n&&(p+=' name="'+o.properties.attrs.cfg.n+'"'),o.properties.attrs.cfg.v&&(p+=' value="'+o.properties.attrs.cfg.v+'"'),"Y"==o.properties.attrs.cfg.c&&(p+=' checked="checked"');var u="";return u+="margin:0px;padding:0px;height:100%;width:100%;outline:none;","<input"+p+' type="checkbox" style="'+u+'"></input>'}return apn.widgets.utils.getHTML.call(this,void 0,t,e,a,i,n)},xa.exeOnStart=function(t,e){var a=t.wgtTag(e);a.apxInputTag.checked&&t.fireEvent("inputSet",void 0,e)},xa.exeInputGet=function(t,e){return e.apxInputTag.checked},xa.exeInputSet=function(t,e,a){return e.apxInputTag.checked!=a&&(e.apxInputTag.checked=!!a,t.fireEvent("inputSet",void 0,e.apnOID)),e.apxInputTag.checked},xa.onEdit=void 0,xa.edtOnConfig=function(t,e){function a(){eduLib.edtInputApplyAll(t,n),t.wgtSetProperty(e,"cfg",i)}var n,i=t.wgtGetProperty(e,"cfg");(n=t.dlgDoModal(600,400,a))&&(eduLib.edtInputAdd(t,n,{type:"select",title:apn.CExe.GL({ko:"체크됨",en:"Checked"}),value:i,key:"c",options:[{title:apn.CExe.GL({ko:"예",en:"Yes"}),value:"Y"},{title:apn.CExe.GL({ko:"아니오",en:"No"}),value:""}],join:!0}),eduLib.edtInputAdd(t,n,{type:"space"}),eduLib.edtInputAdd(t,n,{type:"title",title:apn.CExe.GL({ko:"HTML 태그 속성 추가",en:"More HTML Tag attributes"})}),eduLib.edtInputAdd(t,n,{type:"text",title:"'name'",value:i,key:"n",join:!0}),eduLib.edtInputAdd(t,n,{type:"text",title:"'value'",value:i,key:"v",join:!0}),eduLib.edtInputAdd(t,n,{type:"message",value:"※ "+apn.CExe.GL({ko:"HTML 태그 속성을 추가합니다. 이것은 컨텐츠 외부의 실행 환경에서 필요한 경우 사용하도록 하기 위한 것입니다.",en:"Add more attributes to this HTML tag if needs for outside execution environment."}),join:!0}))},xa.edtOnBuildEvent=function(t,e,a,n){n.inputChange={value:"inputChange",title:apn.P.eventTitle.inputChange},n.inputSet={value:"inputSet",title:apn.P.eventTitle.inputSet}},xa.edtOnDraw=function(t,e,a,n,i,p,r,d){var o=a.strokeStyle,u=a.fillStyle,l=a.lineWidth;a.strokeStyle="#9f9f9f",a.fillStyle="#ffffff",a.lineWidth=2,p>r?(n+=(p-r)/2,p=r):p<r&&(i+=(r-p)/2,r=p),a.fillRect(n,i,p,r),a.strokeRect(n,i,p,r);var c=t.getObjectByID(e);"Y"==c.data.properties.attrs.cfg.c&&(a.fillStyle=a.strokeStyle,a.fillRect(n+.3*p,i+.3*r,.4*p,.4*r)),a.strokeStyle=o,a.fillStyle=u,a.lineWidth=l},uxWgtInputChk=xa;
var xa=apn.inheritWidget(apn.widgets["apn.wgt.rect"]);xa.styleMap={title:!0,visibility:!0,alpha:!0},xa.APX_NO_POINTER_EV=!0,xa.properties=xa.properties||{},xa.properties.attrs={uxInpRdo:!0,cfg:{c:"",n:"",v:""}},xa.exeCreateTag=function(t,e,a,n,i,p){var r;t.o.standAlone&&p&&(r=apn.CExe.getElementByAttr("div","data-apx-id",p))?(r.style.overflow="hidden",r.apnCur={},r.apnCur.apxCreatedFromTag=!0):(r=document.body.$TAG("div",{style:"position:absolute;overflow:hidden;box-sizing:border-box;"}),r.apnCur={}),r.apnCur.apxCreatedFromTag?r.apxInputTag="input"==r.firstChild.tagName.toLowerCase()?r.firstChild:r.firstChild.firstChild:(r.apxInputTag=r.$TAG("input",{type:"radio",style:"margin:0px;padding:0px;height:100%;width:100%;outline:none;"}),a.create.data.properties.attrs.cfg.n&&r.apxInputTag.setAttribute("name",a.create.data.properties.attrs.cfg.n),a.create.data.properties.attrs.cfg.v&&r.apxInputTag.setAttribute("value",a.create.data.properties.attrs.cfg.v),"Y"==a.create.data.properties.attrs.cfg.c&&(r.apxInputTag.checked=!0));var o=this;return bx.Event.add(r.apxInputTag,"change",function(){this.parentNode.apnOID&&(e.fireEvent("inputChange",void 0,this.parentNode.apnOID),o.grpNoti(e,this.parentNode.apnOID,!0))},!1),r},xa.exeRenderTag=function(t,e,a,n,i,p){return apn.widgets.utils.exeRenderTag.call(this,void 0,t,e,a,n,i,p)},xa.pubOnGetHTML=function(t,e,a,n){function i(t,e,a,n){var i,p="",r=apn.Project.getExeModule(t);if(r.IStub_pubProcWgtAttr&&(i=r.IStub_pubProcWgtAttr(t,e,a))&&i.attr0)for(var o in i.attr0)void 0!==i.attr0[o]&&(p+=" "+o+'="'+i.attr0[o]+'"');var d=t.pages[e].objects[a].create.data;d.properties.attrs.cfg.n&&(p+=' name="'+d.properties.attrs.cfg.n+'"'),d.properties.attrs.cfg.v&&(p+=' value="'+d.properties.attrs.cfg.v+'"'),"Y"==d.properties.attrs.cfg.c&&(p+=' checked="checked"');var u="";return u+="margin:0px;padding:0px;height:100%;width:100%;outline:none;","<input"+p+' type="radio" style="'+u+'"></input>'}return apn.widgets.utils.getHTML.call(this,void 0,t,e,a,i,n)},xa.grpSet=function(t,e){function a(a){n=t.wgtTag(a),n.apxInputTag&&!n.apxInputTag.name&&(n.apxInputTag.name=e)}var n;t.utlIterateInGroup(e,"uxInpRdo",a),a(e)},xa.grpNoti=function(t,e,a){function n(e){t.fireEvent(a?"inputChange":"inputSet",void 0,e)}t.utlIterateInGroup(e,"uxInpRdo",n)},xa.exeOnStart=function(t,e){var a=t.wgtTag(e);this.grpSet(t,e),a.apxInputTag.checked&&(t.fireEvent("inputSet",void 0,e),this.grpNoti(t,e))},xa.exeInputGet=function(t,e){return e.apxInputTag.checked},xa.exeInputSet=function(t,e,a){return e.apxInputTag.checked!=a&&(e.apxInputTag.checked=!!a,t.fireEvent("inputSet",void 0,e.apnOID),e.apxInputTag.checked&&this.grpNoti(t,e.apnOID)),e.apxInputTag.checked},xa.onEdit=void 0,xa.edtOnConfig=function(t,e){function a(){eduLib.edtInputApplyAll(t,n),t.wgtSetProperty(e,"cfg",i)}var n,i=t.wgtGetProperty(e,"cfg");(n=t.dlgDoModal(600,400,a))&&(eduLib.edtInputAdd(t,n,{type:"select",title:apn.CExe.GL({ko:"선택됨",en:"Selected"}),value:i,key:"c",options:[{title:apn.CExe.GL({ko:"예",en:"Yes"}),value:"Y"},{title:apn.CExe.GL({ko:"아니오",en:"No"}),value:""}],join:!0}),eduLib.edtInputAdd(t,n,{type:"message",value:"※ "+apn.CExe.GL({ko:"그룹으로 묶으면 서로 Toggle 동작을 합니다.",en:"If group this type of widgets, they will toggle in the group."}),join:!0}),eduLib.edtInputAdd(t,n,{type:"space"}),eduLib.edtInputAdd(t,n,{type:"title",title:apn.CExe.GL({ko:"HTML 태그 속성 추가",en:"More HTML Tag attributes"})}),eduLib.edtInputAdd(t,n,{type:"text",title:"'name'",value:i,key:"n",join:!0}),eduLib.edtInputAdd(t,n,{type:"text",title:"'value'",value:i,key:"v",join:!0}),eduLib.edtInputAdd(t,n,{type:"message",value:"※ "+apn.CExe.GL({ko:"HTML 태그 속성을 추가합니다. 이것은 컨텐츠 외부의 실행 환경에서 필요한 경우 사용하도록 하기 위한 것입니다.\n'name'이 지정되면, 편집에 의한 그룹보다 우선하므로 지정할 경우 정확히 입력해야 합니다.",en:"Add more attributes to this HTML tag if needs for outside execution environment.\nIf 'name' is manually set, it will override edited group toggle action."}),join:!0}))},xa.edtOnBuildEvent=function(t,e,a,n){n.inputChange={value:"inputChange",title:apn.P.eventTitle.inputChange},n.inputSet={value:"inputSet",title:apn.P.eventTitle.inputSet}},xa.edtOnDraw=function(t,e,a,n,i,p,r,o){var d=a.strokeStyle,u=a.fillStyle,l=a.lineWidth;a.strokeStyle="#9f9f9f",a.fillStyle="#ffffff",a.lineWidth=2,p>r?(n+=(p-r)/2,p=r):p<r&&(i+=(r-p)/2,r=p),bx.CCanvasWnd.drawEllipse(a,!0,!0,n,i,p,r);var g=t.getObjectByID(e);"Y"==g.data.properties.attrs.cfg.c&&(a.fillStyle=a.strokeStyle,bx.CCanvasWnd.drawEllipse(a,!0,!0,n+.3*p,i+.3*r,.4*p,.4*r)),a.strokeStyle=d,a.fillStyle=u,a.lineWidth=l},uxWgtInputRadio=xa;
var xa=apn.inheritWidget(uxWgtBtnImage);xa.apdNoEditState=!0,xa.editor={noIconThumb:!0},xa.properties.attrs.selectType="check",xa.properties.attrs.btnType="text",xa.styles={textPadding:0},xa.properties.attrs.local=xa.properties.attrs.local||{v:"",iS:{mediaID:void 0,pos:""}},xa.properties.attrs.v=2,xa.properties.attrs.ofl="O",xa.exeCreateTag=apn.widgets["apn.wgt.singleText"].exeCreateTag,xa.exeRenderTag=apn.widgets["apn.wgt.singleText"].exeRenderTag,xa.pubOnGetHTML=apn.widgets["apn.wgt.singleText"].pubOnGetHTML,xa.exeOnScreenRefresh=void 0,xa.I_exeOnStateChange=function(e,t,a){function i(){o.qchoiceImg&&("disabled"==e.wgtGetProperty(t,"apxState")||"checked"==e.wgtGetProperty(t,"apxState")?o.qchoiceImgTag.style.display="block":o.qchoiceImgTag.style.display="none")}var o=e.wgtTag(t),g=e.wgtGetProperty(t,"local");g.iS.mediaID&&(("disabled"==a||"checked"==a)&&void 0===o.qchoiceImg?(o.qchoiceImg=null,o.qchoiceImgTag=o.$TAG("img",{style:"position:absolute;display:none;"}),o.qchoiceImgTag.onload=function(){o.qchoiceImg=!0,o.qchoiceImgTag.style.width=(this.natualWidth||this.width)*(1/e.getZoomX())+"px",o.qchoiceImgTag.style.height=(this.natualHeight||this.height)*(1/e.getZoomY())+"px",o.qchoiceImgTag.style.left=(parseInt(o.style.width)-parseInt(o.qchoiceImgTag.style.width))/2+"px",o.qchoiceImgTag.style.top=(parseInt(o.style.height)-parseInt(o.qchoiceImgTag.style.height))/2+"px","L"==g.iS.pos?(o.qchoiceImgTag.style.left="auto",o.qchoiceImgTag.style.right=o.style.width):"R"==g.iS.pos?(o.qchoiceImgTag.style.left="auto",o.qchoiceImgTag.style.left=o.style.width):"T"==g.iS.pos?(o.qchoiceImgTag.style.top="auto",o.qchoiceImgTag.style.bottom=o.style.height):"B"==g.iS.pos&&(o.qchoiceImgTag.style.top="auto",o.qchoiceImgTag.style.top=o.style.height),i()},o.qchoiceImgTag.src=e.mediaURL(g.iS.mediaID)):o.qchoiceImg&&i())},xa.I_edtOnConfig=function(e,t,a,i,o,g){var a=e.wgtGetProperty(t,"local");eduLib.edtInputAdd(e,o,{type:"text",title:"선택값",key:"v",value:a,join:!0}),eduLib.edtInputAdd(e,o,{type:"message",value:"※ '선택값'이 없으면 입력된 Text를 값으로 사용합니다. 이것은 편집 편의를 위한 것입니다.",join:!0}),eduLib.edtInputAdd(e,o,{type:"image",title:"선택 표시 이미지",value:a,key:"iS",join:!0}),eduLib.edtInputAdd(e,o,{type:"select",title:"선택 표시 이미지 위치",key:"pos",value:a.iS,options:[{title:"좌측",value:"L"},{title:"우측",value:"R"},{title:"상단",value:"T"},{title:"하단",value:"B"},{title:"중앙",value:""}],join:!0}),eduLib.edtInputAdd(e,o,{type:"space"})},xa.I_edtOnConfig_save=function(e,t,a,i,o,g){e.wgtSetProperty(t,"local",a)},abrKrsWgtQchoice=xa;
