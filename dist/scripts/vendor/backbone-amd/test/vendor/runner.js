!function(){"use strict";function e(){window.document.addEventListener("DOMContentLoaded",function(){var e=[];QUnit.log(function(n){var t;n.result||(t=n.message||"","undefined"!=typeof n.expected&&(t&&(t+=", "),t+="expected: "+n.expected+", but was: "+n.actual,n.source&&(t+="\n"+n.source)),e.push("Failed assertion: "+t))}),QUnit.testDone(function(n){var t,o,a=n.module+": "+n.name;if(n.failed)for(console.log("Test failed: "+a),t=0,o=e.length;t<o;t++)console.log("    "+e[t]);e.length=0}),QUnit.done(function(e){console.log("Took "+e.runtime+"ms to run "+e.total+" tests. "+e.passed+" passed, "+e.failed+" failed."),"function"==typeof window.callPhantom&&window.callPhantom({name:"QUnit.done",data:e})})},!1)}var n=require("system").args;2!==n.length&&(console.error("Usage:\n  phantomjs runner.js [url-of-your-qunit-testsuite]"),phantom.exit(1));var t=n[1],o=require("webpage").create();o.onConsoleMessage=function(e){console.log(e)},o.onInitialized=function(){o.evaluate(e)},o.onCallback=function(e){var n,t;e&&"QUnit.done"===e.name&&(n=e.data,t=!n||n.failed,phantom.exit(t?1:0))},o.open(t,function(e){if("success"!==e)console.error("Unable to access network: "+e),phantom.exit(1);else{var n=o.evaluate(function(){return"undefined"==typeof QUnit||!QUnit});n&&(console.error("The `QUnit` object is not present on this page."),phantom.exit(1))}})}();