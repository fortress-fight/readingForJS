function drag (obj) {
	obj.onmousedown = function (ev) {
		var ev = ev || window.ev;
		var x = ev.clientX - obj.offsetLeft;
		var y = ev.clientY - obj.offsetTop;

		if (obj.setCapture) {
			obj.setCapture();
		}

		document.onmousemove = function (ev) {
			var ev = ev || window.event;
			obj.style.top = ev.clientY - y + 'px';
			obj.style.left = ev.clientX - x + 'px';
			return false;
		}

		document.onmouseup = function () {
			document.onmousemove = document.onmouseup = null;
			if (obj.setCapture) {
				obj.releaseCapture();
			}
		}
	}
}