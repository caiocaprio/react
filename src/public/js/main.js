
var Main={init:function(){Menu.init(),Modal.init(),AcessibilityService.init(),this.addEventListeners();},addEventListeners:function(){console.log("addEventListeners",this.$menuToogleButton);}},Menu={$bodyHtml:null,$nav:null,$menuToogleButton:null,$navFullMenu:null,heightMenu:0,init:function(){this.$bodyHtml=$("body,html"),this.$nav=$(".box-menu .navbar"),this.$navFullMenu=$(".nav-full-menu"),this.$menuToogleButton=this.$nav.find(".navbar-toggle"),this.addEventListeners();},addEventListeners:function(){var i=this;i.$menuToogleButton.click(function(){$(this);$(this).hasClass("collapsed")?i.fixMenuMobile():i.unfixMenuMobile();});},fixMenuMobile:function(){this.heightMenu=$("header nav.navbar.navbar-default").height()+$("header .box-toolbar").height()+1,this.$bodyHtml.removeClass("overflow-auto").addClass("overflow-hidden"),this.$bodyHtml.stop().animate({scrollTop:0},0,"swing"),this.$navFullMenu.addClass("fixed"),this.$navFullMenu.css({top:this.heightMenu,height:"-moz-calc(100% - "+this.heightMenu+"px)",height:"-webkit-calc(100% - "+this.heightMenu+"px)",height:"calc(100% - "+this.heightMenu+"px)"});},unfixMenuMobile:function(){this.$navFullMenu.removeClass("fixed"),this.$navFullMenu.css({top:"initial",height:"auto"}),this.$bodyHtml.removeClass("overflow-hidden").addClass("overflow-auto");}},Modal={props:null,clearTime:null,init:function(){this.addEventListeners();},addEventListeners:function(){$("body").append('<div class="modal fade modal-link" id="modalLink" tabindex="-1" role="dialog" aria-labelledby="modalLink" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\x3c!-- 16:9 aspect ratio --\x3e<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div class="box-iframe"><iframe class="embed-responsive-item" src="" id="iframeLinkModal"  allowscriptaccess="always">></iframe></div></div></div></div></div>'),$("#modalLink").on("show.bs.modal",this.openModal),$("#modalLink").on("hide.bs.modal",this.closeModal);},openModal:function(i){var t=$(this),e=$(i.relatedTarget);clearTimeout(this.clearTime),this.props={width:e.data("width")?e.data("width"):"400px",height:e.data("height")?e.data("height"):"300px",class:e.data("class")?e.data("class"):"",src:e.data("src")?e.data("src"):""},t.find("#iframeLinkModal").fadeOut(0),t.find("#iframeLinkModal").attr("src",this.props.src),t.find("#iframeLinkModal").on("load",function(){t.find("#iframeLinkModal").fadeIn(500);}),t.find(".modal-dialog").css({width:this.props.width,height:this.props.height});},closeModal:function(){var i=this,t=$(this);i.clearTime=setTimeout(function(){t.find(".modal-dialog").css({width:"auto",height:"auto"}),t.removeClass(i.props.class),$("#iframeLinkModal").attr("src","");},1500);}},AcessibilityService={$html:null,init:function(){var i=this;console.log("AcessibilityService"),i.$html=$("html"),$(".alto-contraste a").click(function(){i.toggleHighContrast();}),$(".aumentar-fonte a").click(function(){i.increaseFontSize();}),$(".diminuir-fonte a").click(function(){i.decreaseFontSize();}),i.loadPreferences();},toggleHighContrast:function(){this.$html.hasClass("high-contrast")?(this.$html.removeClass("high-contrast"),this.createCookie("high-contrast",!1)):(this.$html.addClass("high-contrast"),this.createCookie("high-contrast",!0));},getActualFontSize:function(){var i="";return this.$html.removeClass(function(t,e){return i=(e.match(/(^|\s)size-[-]{0,1}\d+/g)||[]).join("");}),""==(i=i.trim().split(" ")[0])?0:parseInt(i.match(/-([-]{0,1}\d+$)/)[1]);},increaseFontSize:function(){var i=this.getActualFontSize();i<3&&i++,this.applyFontSize(i);},decreaseFontSize:function(){var i=this.getActualFontSize();i>-1&&i--,this.applyFontSize(i);},applyFontSize:function(i){0!=i?(this.$html.addClass("size-"+i),this.createCookie("font-size","size-"+i)):this.createCookie("font-size","");},loadPreferences:function(){var i=this.readCookie("font-size");null!=i&&this.$html.addClass(i);var t,e=this.readCookie("high-contrast");try{t=JSON.parse(e.toLowerCase());}catch(i){t=!1;}
t?this.$html.addClass("high-contrast"):this.$html.removeClass("high-contrast");},createCookie:function(i,t){null==$.cookie||void 0!=window.bowser&&1==bowser.msie&parseFloat(bowser.version)<9?document.cookie=i+"="+t:$.cookie(i,t,{domain:getDomain(),path:"/"});},readCookie:function(i){try{return $.cookie(i);}catch(s){for(var t=i+"=",e=document.cookie.split(";"),a=null,n=0;n<e.length;n++){for(var o=e[n];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length);}
return a;}}};$(document).ready(function(){Main.init();});