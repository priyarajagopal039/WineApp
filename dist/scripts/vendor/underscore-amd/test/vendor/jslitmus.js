// JSLitmus.js
//
// History:
//   2008-10-27: Initial release
//   2008-11-09: Account for iteration loop overhead
//   2008-11-13: Added OS detection
//   2009-02-25: Create tinyURL automatically, shift-click runs tests in reverse
//
// Copyright (c) 2008-2009, Robert Kieffer
// All Rights Reserved
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the
// Software), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

!function(){var t="unknown platform",e=navigator.userAgent,n=["Windows","iPhone OS","(Intel |PPC )?Mac OS X","Linux"].join("|"),r=new RegExp("(("+n+") [^ );]*)").test(e)?RegExp.$1:null;r||(r=new RegExp("(("+n+")[^ );]*)").test(e)?RegExp.$1:null);var i=/(Chrome|MSIE|Safari|Opera|Firefox)/.test(e)?RegExp.$1:null,s=new RegExp("(Version|"+i+")[ /]([^ ;]*)"),o=i&&s.test(e)?RegExp.$2:null,t=r&&i&&o?i+" "+o+" on "+r:"unknown platform",u={escape:function(t){return t=t.replace(/,/g,"\\,"),t=escape(t),t=t.replace(/\+/g,"%2b"),t=t.replace(/ /g,"+")},$:function(t){return document.getElementById(t)},F:function(){},status:function(t){var e=u.$("jsl_status");e&&(e.innerHTML=t||"")},toLabel:function(t){return t==1/0?"Infinity":t>1e9?(t=Math.round(t/1e8),t/10+"B"):t>1e6?(t=Math.round(t/1e5),t/10+"M"):t>1e3?(t=Math.round(t/100),t/10+"K"):t},extend:function(t,e){for(var n in e)t[n]=e[n];return t},join:function(t,e,n){if(t.join)return t.join(e);var r=[];for(var i in t)r.push(i+e+t[i]);return r.join(n)},indexOf:function(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0;n<this.length;n++)if(t[n]===e)return n;return-1}},a=function(t,e){if(!e)throw new Error("Undefined test function");if(!/function[^\(]*\(([^,\)]*)/.test(e.toString()))throw new Error('"'+t+'" test: Test is not a valid Function object');this.loopArg=RegExp.$1,this.name=t,this.f=e};u.extend(a,{CALIBRATIONS:[new a("calibrating loop",function(t){for(;t--;);}),new a("calibrating function",u.F)],calibrate:function(t){for(var e=0;e<a.CALIBRATIONS.length;e++){var n=a.CALIBRATIONS[e];if(n.running)return!0;if(!n.count)return n.isCalibration=!0,n.onStop=t,n.run(2e4),!0}return!1}}),u.extend(a.prototype,{INIT_COUNT:10,MAX_COUNT:1e9,MIN_TIME:.5,onChange:u.F,onStop:u.F,reset:function(){delete this.count,delete this.time,delete this.running,delete this.error},run:function(t){t=t||this.INIT_COUNT,u.status(this.name+" x "+t),this.running=!0;var e=this;setTimeout(function(){e._run(t)},200)},_run:function(t){var e=this;if(e.isCalibration||!a.calibrate(function(){e.run(t)})){this.error=null;try{var n,r=this.f,i=t;if(n=new Date,this.loopArg)r(t);else for(;i--;)r();if(this.time=Math.max(1,new Date-n)/1e3,this.count=t,this.period=this.time/t,this.running=this.time<=this.MIN_TIME,this.running){var s=this.MIN_TIME/this.time,o=Math.pow(2,Math.max(1,Math.ceil(Math.log(s)/Math.log(2))));if(t*=o,t>this.MAX_COUNT)throw new Error("Max count exceeded.  If this test uses a looping function, make sure the iteration loop is working properly.")}}catch(t){this.reset(),this.error=t}this.running?e.run(t):(u.status(""),e.onStop(e)),this.onChange(this)}},getHz:function(t){var e=this.period;if(t&&!this.isCalibration){var n=a.CALIBRATIONS[this.loopArg?0:1];e=e<1.2*n.period?0:e-n.period}return Math.round(1/e)},toString:function(){return this.name+" - "+this.time/this.count+" secs"}});var l="<style>     #jslitmus {font-family:sans-serif; font-size: 12px;}     #jslitmus a {text-decoration: none;}     #jslitmus a:hover {text-decoration: underline;}     #jsl_status {       margin-top: 10px;       font-size: 10px;       color: #888;     }     A IMG  {border:none}     #test_results {       margin-top: 10px;       font-size: 12px;       font-family: sans-serif;       border-collapse: collapse;       border-spacing: 0px;     }     #test_results th, #test_results td {       border: solid 1px #ccc;       vertical-align: top;       padding: 3px;     }     #test_results th {       vertical-align: bottom;       background-color: #ccc;       padding: 1px;       font-size: 10px;     }     #test_results #test_platform {       color: #444;       text-align:center;     }     #test_results .test_row {       color: #006;       cursor: pointer;     }     #test_results .test_nonlooping {       border-left-style: dotted;       border-left-width: 2px;     }     #test_results .test_looping {       border-left-style: solid;       border-left-width: 2px;     }     #test_results .test_name {white-space: nowrap;}     #test_results .test_pending {     }     #test_results .test_running {       font-style: italic;     }     #test_results .test_done {}     #test_results .test_done {       text-align: right;       font-family: monospace;     }     #test_results .test_error {color: #600;}     #test_results .test_error .error_head {font-weight:bold;}     #test_results .test_error .error_body {font-size:85%;}     #test_results .test_row:hover td {       background-color: #ffc;       text-decoration: underline;     }     #chart {       margin: 10px 0px;       width: 250px;     }     #chart img {       border: solid 1px #ccc;       margin-bottom: 5px;     }     #chart #tiny_url {       height: 40px;       width: 250px;     }     #jslitmus_credit {       font-size: 10px;       color: #888;       margin-top: 8px;     }     </style>",c='<div id="jslitmus">       <button onclick="JSLitmus.runAll(event)">Run Tests</button>       <button id="stop_button" disabled="disabled" onclick="JSLitmus.stop()">Stop Tests</button>       <br >       <br >       <input type="checkbox" style="vertical-align: middle" id="test_normalize" checked="checked" onchange="JSLitmus.renderAll()""> Normalize results       <table id="test_results">         <colgroup>           <col />           <col width="100" />         </colgroup>         <tr><th id="test_platform" colspan="2">'+t+'</th></tr>         <tr><th>Test</th><th>Ops/sec</th></tr>         <tr id="test_row_template" class="test_row" style="display:none">           <td class="test_name"></td>           <td class="test_result">Ready</td>         </tr>       </table>       <div id="jsl_status"></div>       <div id="chart" style="display:none">       <a id="chart_link" target="_blank"><img id="chart_image"></a>       TinyURL (for chart):       <iframe id="tiny_url" frameBorder="0" scrolling="no" src=""></iframe>       </div>       <a id="jslitmus_credit" title="JSLitmus home page" href="http://code.google.com/p/jslitmus" target="_blank">Powered by JSLitmus</a>     </div>';window.JSLitmus={_tests:[],_queue:[],params:{},_init:function(){var t=(location+"").match(/([^?#]*)(#.*)?$/);if(t)for(var e=t[1].split("&"),n=0;n<e.length;n++){var r=e[n].split("=");if(r.length>1){var i=r.shift(),s=r.length>1?r.join("="):r[0];this.params[i]=s}}return document.write(l),window.addEventListener?window.addEventListener("load",this._setup,!1):document.addEventListener?document.addEventListener("load",this._setup,!1):window.attachEvent&&window.attachEvent("onload",this._setup),this},_setup:function(){var t=u.$("jslitmus_container");t||document.body.appendChild(t=document.createElement("div")),t.innerHTML=c;for(var e=0;e<JSLitmus._tests.length;e++)JSLitmus.renderTest(JSLitmus._tests[e])},renderAll:function(){for(var t=0;t<JSLitmus._tests.length;t++)JSLitmus.renderTest(JSLitmus._tests[t]);JSLitmus.renderChart()},renderChart:function(){var t=JSLitmus.chartUrl();u.$("chart_link").href=t,u.$("chart_image").src=t,u.$("chart").style.display="",u.$("tiny_url").src="http://tinyurl.com/api-create.php?url="+escape(t)},renderTest:function(t){if(!t._row){var e=u.$("test_row_template");if(!e)return;t._row=e.cloneNode(!0),t._row.style.display="",t._row.id="",t._row.onclick=function(){JSLitmus._queueTest(t)},t._row.title="Run "+t.name+" test",e.parentNode.appendChild(t._row),t._row.cells[0].innerHTML=t.name}var n=t._row.cells[1],r=[t.loopArg?"test_looping":"test_nonlooping"];if(t.error)r.push("test_error"),n.innerHTML='<div class="error_head">'+t.error+'</div><ul class="error_body"><li>'+u.join(t.error,": ","</li><li>")+"</li></ul>";else if(t.running)r.push("test_running"),n.innerHTML="running";else if(u.indexOf(JSLitmus._queue,t)>=0)r.push("test_pending"),n.innerHTML="pending";else if(t.count){r.push("test_done");var i=t.getHz(u.$("test_normalize").checked);n.innerHTML=i!=1/0?i:"&infin;"}else n.innerHTML="ready";n.className=r.join(" ")},test:function(t,e){var n=new a(t,e);JSLitmus._tests.push(n),n.onChange=JSLitmus.renderTest,n.onStop=function(t){JSLitmus.onTestFinish&&JSLitmus.onTestFinish(t),JSLitmus.currentTest=null,JSLitmus._nextTest()},this.renderTest(n)},runAll:function(t){t=t||window.event;for(var e=t&&t.shiftKey,n=JSLitmus._tests.length,r=0;r<n;r++)JSLitmus._queueTest(JSLitmus._tests[e?n-r-1:r])},stop:function(){for(;JSLitmus._queue.length;){var t=JSLitmus._queue.shift();JSLitmus.renderTest(t)}},_nextTest:function(){if(!JSLitmus.currentTest){var t=JSLitmus._queue.shift();t?(u.$("stop_button").disabled=!1,JSLitmus.currentTest=t,t.run(),JSLitmus.renderTest(t),JSLitmus.onTestStart&&JSLitmus.onTestStart(t)):(u.$("stop_button").disabled=!0,JSLitmus.renderChart())}},_queueTest:function(t){u.indexOf(JSLitmus._queue,t)>=0||(JSLitmus._queue.push(t),JSLitmus.renderTest(t),JSLitmus._nextTest())},chartUrl:function(){for(var e=(JSLitmus._tests.length,[]),n=[],r=0,i=-1e10,s=u.$("test_normalize").checked,o=0;o<JSLitmus._tests.length;o++){var a=JSLitmus._tests[o];if(a.count){var l=a.getHz(s),c=l!=1/0?l:0;n.push(c),e.push("t"+u.escape(a.name+"("+u.toLabel(l)+")")+",000000,0,"+e.length+",10"),i=Math.max(c,i)}}if(e.length<=0)return null;var h=document.getElementsByTagName("title");h=h&&h.length?h[0].innerHTML:null;var d=[];h&&d.push(h),d.push("Ops/sec ("+t+")");var p=[u.toLabel(r),u.toLabel(i)],f=250,m=15,_=5,g=e.length*(m+_)+30+20*d.length,L={chtt:escape(d.join("|")),chts:"000000,10",cht:"bhg",chd:"t:"+n.join(","),chds:r+","+i,chxt:"x",chxl:"0:|"+p.join("|"),chsp:"0,1",chm:e.join("|"),chbh:[m,0,_].join(","),chs:f+"x"+g};return"http://chart.apis.google.com/chart?"+u.join(L,"=","&")}},JSLitmus._init()}();