
/*
element -- 目标元素
type -- 事件执行程序名称
handler -- 执行函数
 */

var EventUtil = {
	addHandler : function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
			if (type == 'mousewheel') {
				element.addEventListener('DOMMouseScroll', handler, false);
			}
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},

	// 这里我会使用ev = ev || window.event
	getEvent : function (event) {
		return event ? event : window.event;
	},

	getTarget: function (event) {
		return event.target || event.srcElement;
	},

	getRelatedTarget: function (event) {
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	},

	// getPageX 和 getPageY 是我自己写的，已检验

	getPageX: function (event) {
		event.pageX = event.pageX ? event.pageX : event.clientY+(document.body.scrollLeft || document.documentElement.scrollLeft);
		return event.pageX;
	},

	getPageY: function (event) {
		event.pageY = event.pageY ? event.pageY : event.clientY+(document.body.scrollTop || document.documentElement.scrollTop);
		return event.pageY;
	},

	/*这里我会使用
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	*/
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	removeHandler : function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},

	// 目前cancelBubble在标准浏览器下也支持了，
	// 所以要取消冒泡直接使用event.cancelBubble = true就可以了

	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},


	// getScrollDetail 是我自己写的，已检验 true -- 向上

	getScrollDetail: function (event) {
		if (event.wheelDelta) {
			return event.wheelDelta > 0 ? true : false;
		} else {
			return event.detail < 0 ? true : false;
		}
	},

	getButton: function (event) {
		if (document.implementation.hasFeature('MouseEvents', '2.0')) {
			return event.button;
		} else {
			switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	}
}