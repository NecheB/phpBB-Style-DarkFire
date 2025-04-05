//Hint Start  
// CLASS : MW_System_Load  
// Init  
function MW_System_Load(){  
this.wib = screen.width;  
this.heb = screen.height;  
this.documes = (document.getElementById || document.createElement || document.getElementsByTagName) ? true : false;  
this.objects = window.addEventListener || window.attachEvent ? window : document.addEventListener ? document : null;  
this.types = 'load';  
}  
MW_System_Load.prototype.addsevent = function(func){  
if(this.objects.addEventListener){  
this.objects.addEventListener(this.types,func,false);  
return true;  
} else if (this.objects.attachEvent){  
this.objects.attachEvent("on" + this.types,func);  
} else {  
return false;  
}  
}  
MW_System_Load.prototype.browser = function(){  
this.ver = navigator.appVersion;  
this.agent = navigator.userAgent.toLowerCase();  
this.dom = document.getElementById ? 1:0;  
this.all = document.all ? 1:0;  
this.ie5 = (this.ver.indexOf("MSIE 5")>-1 && this.dom) ? 1:0;  
this.ie6 = (this.ver.indexOf("MSIE 6")>-1 && this.dom) ? 1:0;  
this.ie4 = (document.all && !this.dom) ? 1:0;  
this.ie = this.ie4 || this.ie5 || this.ie6;  
this.opera = this.agent.indexOf("opera")>-1;  
this.gecko = (this.agent.indexOf("gecko")!=-1) ? 1:0;  
this.bw = (this.ie || this.opera || this.gecko);  
return this;  
}  
MW_System_Load.prototype.findobj = function(obj){  
this.parent = window.document;  
if(this.parent[obj]){ return this.parent[obj]; }  
if(this.parent.all && this.parent.all[obj]){ return this.parent.all[obj]; }  
if(this.parent.layers && this.parent.layers[obj]){ return this.parent.layers[obj]; }  
if(this.parent.getElementById && this.parent.getElementById(obj)){ return this.parent.getElementById(obj); }  
return null;  
}  
var MW = new MW_System_Load();  
function MW_System_Hint(){}  
MW_System_Hint.prototype.show = function(obj,str){  
var hint = MW.findobj('hint');  
if(!obj){ return; }  
if(!MW.documes){ return; }  
if(!hint){ return; }  
hint.className = 'hint';  
hint.style.left = 15;  
hint.style.top = 50;  

obj.onmouseout = function(advance){  
hint.style.width = '';  
hint.style.visibility = 'hidden';  
if(hint.firstChild) hint.removeChild(hint.firstChild);  
hint.appendChild(document.createTextNode(str));  
};  
obj.onmousemove = function(advance){  
//str = str.replace(/</g,"<");  
//str = str.replace(/>/g,">");  
hint.style.width = '';  
hint.innerHTML = str;  
vc = document.getElementsByTagName((document.compatMode && document.compatMode=="CSS1Compat") ? "HTML":"BODY")[0];  
x = window.event ? event.clientX + vc.scrollLeft : advance.pageX;  
y = window.event ? event.clientY + vc.scrollTop : advance.pageY;  
vcwidth = vc.clientWidth ? vc.clientWidth + vc.scrollLeft : window.innerWidth + window.pageXOffset;  
vcheight = vc.innerHeight ? window.innerHeight + window.pageYOffset : vc.clientHeight + vc.scrollTop;  
      if(hint.offsetWidth>500){ hint.style.width = '200'; }  
      if((x + hint.offsetWidth + 15) > vcwidth){  
       hint.style.left = x - hint.offsetWidth - 4;  
      } else {  
       hint.style.left = x + 15;  
      }  
      if((y + hint.offsetHeight + 19) > vcheight){  
       hint.style.top = y - hint.offsetHeight;  
      } else {  
       hint.style.top = y + 25;  
      }  
      //if(typeof(hint.style.MozOpacity)!="undefined"){  
      hint.style.opacity = '.80';  
      hint.style.filter = "alpha(opacity:80)";  
      //}  
      hint.style.visibility = 'visible';  
};  
}  
MW_System_Hint.prototype.initialize = function(){  
var hint = document.createElement("DIV");  
hint.setAttribute('id','hint');  
document.getElementsByTagName('body')[0].appendChild(hint);  
hint.style.visibility = 'hidden';  
var hintmarker = ['a','img','img','input','span','div','textarea'];  
var textmarker = ['title','alt','title','title','title','title','title'];  
var lenmarker = hintmarker.length;  
for(var i=0; i<lenmarker; i++) {  
atr = document.getElementsByTagName(hintmarker[i]);  
for(var j=0; j<atr.length; j++)  
if(viewhint=atr[j].getAttribute(textmarker[i])){  
      atr[j].removeAttribute(textmarker[i]);  
      HINT.show(atr[j],viewhint);  
}  
}  
}  
var HINT = new MW_System_Hint();  
if(MW.objects){ MW.addsevent(HINT.initialize); }  
//Hint End 