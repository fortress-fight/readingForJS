var Event =(function (){
    var ev = {
        clientList: {},
        listen: function (key, fn) {
            if(!this.clientList[key]) {
                this.clientList[key] = [];
            };
            this.clientList[key].push(fn);
        },
        trigger: function () {
            var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
            if (!fns && fns.length === 0){
                return false
            };
            for (var i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments);
            };
        },
        remove: function (key, fn) {
            var fns = this.clientList[key];
            if (!fns) {
                return false;
            };
            if (!fn) {
                fns && (fns.length = 0);
            } else {
                for (var i = fns.length-1;  i >= 0; i --) {
                    var _fn = fns[i];
                    if (_fn === fn) {
                        fns.splice(i, 1)
                    }
                }
            };
        }
    };
    return ev;
})();
