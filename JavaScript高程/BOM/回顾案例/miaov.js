function getId(name){
			return document.getElementById(name);
}
function getTag(parent,tag){
	return parent.getElementsByTagName(tag);
}
function getClass(parent,name){
	return parent.getElementsByClassName(name);
}
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
/* 当css的参数个数小于3，获取否则 设置 */
function css(element, attr , val){
	if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'|| attr=='rotateY'|| attr=='rotateZ'|| attr=='scaleX'|| attr=='scaleY'|| attr=='translateY'|| attr=='translateX'|| attr=='translateZ' || attr=='skewX' || attr=='skewY'||attr=='skewZ'){
		return setTransform(element, attr , val);
	}
	if(arguments.length == 2){
		var val = element.currentStyle?element.currentStyle[attr]:getComputedStyle(element)[attr];
		if(attr=='opacity'){
			val = Math.round(val*100);
		}
		return parseFloat(val);
	} else {
		switch(attr){
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
			case 'borderWidth':
			case 'borderLeftWidth':
			case 'borderRightWidth':
			case 'borderTopWidth':
			case 'borderBottomWidth':
				val = val < 0 ? 0 : val;
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				element.style[attr] = val +"px";
				break;
			case 'opacity':
				element.style.filter= "alpha(opacity:"+val+")";
				element.style.opacity= val/100;
				break;	
			default:
				element.style[attr]=val;	
		}
	}
}
function setTransform(element,attr,val){
	if(!element["transform"]){
		element["transform"] = {};
	}
	if(typeof val == "undefined"){
		val = element["transform"][attr];
		if(typeof val == "undefined"){
			if(attr == "scale"||attr == "scaleX"||attr == "scaleY"){
				element["transform"][attr] = 100;
			} else {
				element["transform"][attr] = 0;
			}
		}
		return parseFloat(element["transform"][attr]);
	} else {
		var str = "";
		element["transform"][attr] = val;
		for(var s in element["transform"])	 {
			switch(s){
				case 'skewX':
				case 'skewY':
				case 'skewZ':
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
					str += s+"("+element["transform"][s]+"deg) ";
					break;
				case 'translateX':
				case 'translateY':
				case 'translateZ':	
					str += s+"("+element["transform"][s]+"px) ";
					break;
				default:
					str += s+"("+element["transform"][s]/100+") ";
			}
		}
		element.style.MozTransform = element.style.msTransform  = element.style.WebkitTransform = element.style.transform = str;
	}
}
function mTween(el,target,time,type,callBack) {
			clearInterval(el.timer);
			var t = 0;
			var b = {}; 
			var c = {}; 	
			var d = time/20; 
			for(var s in target) {
				b[s] = css(el,s);  
				c[s] = target[s] - b[s];
			}
			el.timer = setInterval(function(){
				t++;
				if(t>d) {
					clearInterval(el.timer);
					/*if(callBack) {
						callBack()
					}*/
					callBack&&callBack(); //回调函数 动画执行完了以后，要执行的内容 ，类型 function	
				} else {
					for(var s in target) {
						var val = Tween[type](t,b[s],c[s],d);
						css(el,s,val);
					}
				}
			},20);
		}