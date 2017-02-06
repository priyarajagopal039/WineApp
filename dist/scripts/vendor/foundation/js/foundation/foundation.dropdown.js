!function(t,e,s,i){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"5.5.3",settings:{active_class:"open",disabled_class:"disabled",mega_class:"mega",align:"bottom",is_hover:!1,hover_timeout:150,opened:function(){},closed:function(){}},init:function(e,s,i){Foundation.inherit(this,"throttle"),t.extend(!0,this.settings,s,i),this.bindings(s,i)},events:function(i){var a=this,o=a.S;o(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(e){var s=o(this).data(a.attr_name(!0)+"-init")||a.settings;s.is_hover&&!Modernizr.touch||(e.preventDefault(),o(this).parent("[data-reveal-id]").length&&e.stopPropagation(),a.toggle(t(this)))}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(t){var e,s,i=o(this);clearTimeout(a.timeout),i.data(a.data_attr())?(e=o("#"+i.data(a.data_attr())),s=i):(e=i,s=o("["+a.attr_name()+'="'+e.attr("id")+'"]'));var n=s.data(a.attr_name(!0)+"-init")||a.settings;o(t.currentTarget).data(a.data_attr())&&n.is_hover&&a.closeall.call(a),n.is_hover&&a.open.apply(a,[e,s])}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(t){var e,s=o(this);if(s.data(a.data_attr()))e=s.data(a.data_attr(!0)+"-init")||a.settings;else var i=o("["+a.attr_name()+'="'+o(this).attr("id")+'"]'),e=i.data(a.attr_name(!0)+"-init")||a.settings;a.timeout=setTimeout(function(){s.data(a.data_attr())?e.is_hover&&a.close.call(a,o("#"+s.data(a.data_attr()))):e.is_hover&&a.close.call(a,s)}.bind(this),e.hover_timeout)}).on("click.fndtn.dropdown",function(e){var i=o(e.target).closest("["+a.attr_name()+"-content]"),n=i.find("a");if(n.length>0&&"false"!==i.attr("aria-autoclose")&&a.close.call(a,o("["+a.attr_name()+"-content]")),(e.target===s||t.contains(s.documentElement,e.target))&&!(o(e.target).closest("["+a.attr_name()+"]").length>0))return!o(e.target).data("revealId")&&i.length>0&&(o(e.target).is("["+a.attr_name()+"-content]")||t.contains(i.first()[0],e.target))?void e.stopPropagation():void a.close.call(a,o("["+a.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+a.attr_name()+"-content]",function(){a.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+a.attr_name()+"-content]",function(){a.settings.closed.call(this)}),o(e).off(".dropdown").on("resize.fndtn.dropdown",a.throttle(function(){a.resize.call(a)},50)),this.resize()},close:function(e){var s=this;e.each(function(i){var a=t("["+s.attr_name()+"="+e[i].id+"]")||t("aria-controls="+e[i].id+"]");a.attr("aria-expanded","false"),s.S(this).hasClass(s.settings.active_class)&&(s.S(this).css(Foundation.rtl?"right":"left","-99999px").attr("aria-hidden","true").removeClass(s.settings.active_class).prev("["+s.attr_name()+"]").removeClass(s.settings.active_class).removeData("target"),s.S(this).trigger("closed.fndtn.dropdown",[e]))}),e.removeClass("f-open-"+this.attr_name(!0))},closeall:function(){var e=this;t.each(e.S(".f-open-"+this.attr_name(!0)),function(){e.close.call(e,e.S(this))})},open:function(t,e){this.css(t.addClass(this.settings.active_class),e),t.prev("["+this.attr_name()+"]").addClass(this.settings.active_class),t.data("target",e.get(0)).trigger("opened.fndtn.dropdown",[t,e]),t.attr("aria-hidden","false"),e.attr("aria-expanded","true"),t.focus(),t.addClass("f-open-"+this.attr_name(!0))},data_attr:function(){return this.namespace.length>0?this.namespace+"-"+this.name:this.name},toggle:function(t){if(!t.hasClass(this.settings.disabled_class)){var e=this.S("#"+t.data(this.data_attr()));0!==e.length&&(this.close.call(this,this.S("["+this.attr_name()+"-content]").not(e)),e.hasClass(this.settings.active_class)?(this.close.call(this,e),e.data("target")!==t.get(0)&&this.open.call(this,e,t)):this.open.call(this,e,t))}},resize:function(){var e=this.S("["+this.attr_name()+"-content].open"),s=t(e.data("target"));e.length&&s.length&&this.css(e,s)},css:function(t,e){var s=Math.max((e.width()-t.width())/2,8),i=e.data(this.attr_name(!0)+"-init")||this.settings,a=t.parent().css("overflow-y")||t.parent().css("overflow");if(this.clear_idx(),this.small()){var o=this.dirs.bottom.call(t,e,i);t.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:o.top}),t.css(Foundation.rtl?"right":"left",s)}else if("visible"!==a){var n=e[0].offsetTop+e[0].offsetHeight;t.attr("style","").css({position:"absolute",top:n}),t.css(Foundation.rtl?"right":"left",s)}else this.style(t,e,i);return t},style:function(e,s,i){var a=t.extend({position:"absolute"},this.dirs[i.align].call(e,s,i));e.attr("style","").css(a)},dirs:{_base:function(t,i){var a=this.offsetParent(),o=a.offset(),n=t.offset();n.top-=o.top,n.left-=o.left,n.missRight=!1,n.missTop=!1,n.missLeft=!1,n.leftRightFlag=!1;var r,d=e.innerWidth;r=s.getElementsByClassName("row")[0]?s.getElementsByClassName("row")[0].clientWidth:d;var l=(d-r)/2,h=r;if(!this.hasClass("mega")&&!i.ignore_repositioning){var f=this.outerWidth(),c=t.offset().left;t.offset().top<=this.outerHeight()&&(n.missTop=!0,h=d-l,n.leftRightFlag=!0),c+f>c+l&&c-l>f&&(n.missRight=!0,n.missLeft=!1),c-f<=0&&(n.missLeft=!0,n.missRight=!1)}return n},top:function(t,e){var s=Foundation.libs.dropdown,i=s.dirs._base.call(this,t,e);return this.addClass("drop-top"),1==i.missTop&&(i.top=i.top+t.outerHeight()+this.outerHeight(),this.removeClass("drop-top")),1==i.missRight&&(i.left=i.left-this.outerWidth()+t.outerWidth()),(t.outerWidth()<this.outerWidth()||s.small()||this.hasClass(e.mega_menu))&&s.adjust_pip(this,t,e,i),Foundation.rtl?{left:i.left-this.outerWidth()+t.outerWidth(),top:i.top-this.outerHeight()}:{left:i.left,top:i.top-this.outerHeight()}},bottom:function(t,e){var s=Foundation.libs.dropdown,i=s.dirs._base.call(this,t,e);return 1==i.missRight&&(i.left=i.left-this.outerWidth()+t.outerWidth()),(t.outerWidth()<this.outerWidth()||s.small()||this.hasClass(e.mega_menu))&&s.adjust_pip(this,t,e,i),s.rtl?{left:i.left-this.outerWidth()+t.outerWidth(),top:i.top+t.outerHeight()}:{left:i.left,top:i.top+t.outerHeight()}},left:function(t,e){var s=Foundation.libs.dropdown.dirs._base.call(this,t,e);return this.addClass("drop-left"),1==s.missLeft&&(s.left=s.left+this.outerWidth(),s.top=s.top+t.outerHeight(),this.removeClass("drop-left")),{left:s.left-this.outerWidth(),top:s.top}},right:function(t,e){var s=Foundation.libs.dropdown.dirs._base.call(this,t,e);this.addClass("drop-right"),1==s.missRight?(s.left=s.left-this.outerWidth(),s.top=s.top+t.outerHeight(),this.removeClass("drop-right")):s.triggeredRight=!0;var i=Foundation.libs.dropdown;return(t.outerWidth()<this.outerWidth()||i.small()||this.hasClass(e.mega_menu))&&i.adjust_pip(this,t,e,s),{left:s.left+t.outerWidth(),top:s.top}}},adjust_pip:function(t,e,s,i){var a=Foundation.stylesheet,o=8;t.hasClass(s.mega_class)?o=i.left+e.outerWidth()/2-8:this.small()&&(o+=i.left-8),this.rule_idx=a.cssRules.length;var n=".f-dropdown.open:before",r=".f-dropdown.open:after",d="left: "+o+"px;",l="left: "+(o-1)+"px;";1==i.missRight&&(o=t.outerWidth()-23,n=".f-dropdown.open:before",r=".f-dropdown.open:after",d="left: "+o+"px;",l="left: "+(o-1)+"px;"),1==i.triggeredRight&&(n=".f-dropdown.open:before",r=".f-dropdown.open:after",d="left:-12px;",l="left:-14px;"),a.insertRule?(a.insertRule([n,"{",d,"}"].join(" "),this.rule_idx),a.insertRule([r,"{",l,"}"].join(" "),this.rule_idx+1)):(a.addRule(n,d,this.rule_idx),a.addRule(r,l,this.rule_idx+1))},clear_idx:function(){var t=Foundation.stylesheet;"undefined"!=typeof this.rule_idx&&(t.deleteRule(this.rule_idx),t.deleteRule(this.rule_idx),delete this.rule_idx)},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown"),this.S("html, body").off(".fndtn.dropdown"),this.S(e).off(".fndtn.dropdown"),this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,window,window.document);