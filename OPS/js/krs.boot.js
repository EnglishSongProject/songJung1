krsPreBoot=function(e,t){function i(t){var i=!1,o=document.createElement("div"),n=document.createElement("div");if(document.body.appendChild(o),document.body.appendChild(n),o.style.cssText="font-size:35px;letter-spacing:2px;display:inline-block;visibility:hidden;",n.style.cssText="font-size:35px;letter-spacing:2.9px;display:inline-block;visibility:hidden;",o.innerHTML=n.innerHTML="예",o.offsetWidth==n.offsetWidth&&(i=!0),document.body.removeChild(o),document.body.removeChild(n),i){var s,r=apn.Project.getPages(t);if(r[e]){s=r[e];for(var a,d,p=apx.searchWidgets(t.pages[s],1,"apn.wgt.singleText"),l=0;l<p.length;l++)a=t.pages[s].objects[p[l]].create.data,a&&a.properties&&a.properties.attrs&&a.properties.attrs.frL?(d=apn.CExe.getElementByAttr("div","data-apx-id",p[l]))&&d.firstChild&&(apn.widgets["apn.wgt.singleText"].genLtrSp(a.properties.attrs.frL,"span"==d.firstChild?d.firstChild:d),a.properties.attrs.apxNoLtrSpProcessed=!0):a.properties.attrs.apxNoLtrSpProcessed=!0}}}function o(){var e=["js/aspen-apx-1.0.js"];bx.HCL.importModules(e,2,!1,n)}function n(){var e=["js/lib.js"];bx.HCL.importModules(e,2,!1,s)}function s(){var t=["wgts/wgts.js","data_"+e+".js"];bx.HCL.importModules(t,2,!1,r)}function r(t,o,n){var s;if(s=window.apnExeFile){i(s);var r,a=apn.Project.getLayout(s).property.krsCBook;a&&"Y"==a.txtSelOnlyBook&&(r=!0),a&&"Y"==a.loadOnlyBook||apxLoad({mode:"plain",pgIdx:e,noSelectable:r})}}var a;!window.navigator||navigator.userAgent.toLowerCase().indexOf("edge")==-1&&navigator.userAgent.toLowerCase().indexOf("msie")==-1&&navigator.userAgent.toLowerCase().indexOf("trident")==-1||(a=t&&void 0!==t.wait?t.wait:0,bx.HCL.getCssRule=function(){},bx.HCL.addCssRule=function(){}),void 0===a?o():setTimeout(o,a)};
"Aspen Reader ©2017 BLUEGA Inc, Release date: 10/12/2017 13:06:33"