"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var SeparatorIL = /** @class */ (function () {
    function SeparatorIL(out, op) {
        this.out = out;
        this.op = op;
    }
    SeparatorIL.prototype._n = function (t) {
        this.op.flush();
    };
    SeparatorIL.prototype._e = function (err) {
        this.out._e(err);
    };
    SeparatorIL.prototype._c = function () {
        this.op.flush();
        this.out._c();
    };
    return SeparatorIL;
}());
var BufferOperator = /** @class */ (function () {
    function BufferOperator(s, ins) {
        this.s = s;
        this.ins = ins;
        this.type = 'buffer';
        this.out = null;
        this.acc = [];
    }
    BufferOperator.prototype.flush = function () {
        if (this.acc.length > 0) {
            this.out._n(this.acc);
            this.acc = [];
        }
    };
    BufferOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
        this.sil = new SeparatorIL(out, this);
        this.s._add(this.sil);
    };
    BufferOperator.prototype._stop = function () {
        this.flush();
        this.ins._remove(this);
        this.out = null;
        this.s._remove(this.sil);
        this.sil = index_1.NO_IL;
    };
    BufferOperator.prototype._n = function (t) {
        this.acc.push(t);
    };
    BufferOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    BufferOperator.prototype._c = function () {
        var out = this.out;
        if (!out)
            return;
        this.flush();
        out._c();
    };
    return BufferOperator;
}());
/**
 * Buffers a stream using a separator stream. Returns a stream that emits
 * arrays.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--9|
 * buffer( -a---------b---------c| )
 * ---------[1,2,3]---[4,5,6]---[7,8,9]|
 * ```
 *
 * Example:
 *
 * ```js
 * import buffer from 'xstream/extra/buffer'
 *
 * const source = xs.periodic(50).take(10);
 * const separator = xs.periodic(170).take(3);
 * const buffered = source.compose(buffer(separator));
 *
 * buffered.addListener({
 *   next: arr => console.log(arr),
 *   error: err => console.error(err)
 * });
 * ```
 *
 * ```text
 * > [0, 1, 2]
 * > [3, 4, 5]
 * > [6, 7, 8]
 * ```
 *
 * @param {Stream} separator Some other stream that is used to know when to
 * split the output stream.
 * @return {Stream}
 */
function buffer(s) {
    return function bufferOperator(ins) {
        return new index_1.Stream(new BufferOperator(s, ins));
    };
}
exports.default = buffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQThFO0FBRTlFO0lBQ0UscUJBQW1CLEdBQXFCLEVBQVUsRUFBcUI7UUFBcEQsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtJQUN2RSxDQUFDO0lBRUQsd0JBQUUsR0FBRixVQUFHLENBQU07UUFDUCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCx3QkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCx3QkFBRSxHQUFGO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFFRDtJQU1FLHdCQUFtQixDQUFjLEVBQVMsR0FBYztRQUFyQyxNQUFDLEdBQUQsQ0FBQyxDQUFhO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUxqRCxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLFFBQUcsR0FBcUIsSUFBVyxDQUFDO1FBRW5DLFFBQUcsR0FBYSxFQUFFLENBQUM7SUFHM0IsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFDRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sR0FBcUI7UUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQVcsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUFFLEdBQUYsVUFBRyxDQUFJO1FBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUFFLEdBQUYsVUFBRyxHQUFRO1FBQ1QsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELDJCQUFFLEdBQUY7UUFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDWCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILGdCQUFrQyxDQUFjO0lBQzlDLE9BQU8sd0JBQXdCLEdBQWM7UUFDM0MsT0FBTyxJQUFJLGNBQU0sQ0FBVyxJQUFJLGNBQWMsQ0FBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQseUJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBTdHJlYW0sIEludGVybmFsTGlzdGVuZXIsIE91dFNlbmRlciwgTk9fSUx9IGZyb20gJy4uL2luZGV4JztcblxuY2xhc3MgU2VwYXJhdG9ySUw8VD4gaW1wbGVtZW50cyBJbnRlcm5hbExpc3RlbmVyPGFueT4sIE91dFNlbmRlcjxBcnJheTxUPj4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3V0OiBTdHJlYW08QXJyYXk8VD4+LCBwcml2YXRlIG9wOiBCdWZmZXJPcGVyYXRvcjxUPikge1xuICB9XG5cbiAgX24odDogYW55KSB7XG4gICAgdGhpcy5vcC5mbHVzaCgpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICB0aGlzLm91dC5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgdGhpcy5vcC5mbHVzaCgpO1xuICAgIHRoaXMub3V0Ll9jKCk7XG4gIH1cbn1cblxuY2xhc3MgQnVmZmVyT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBBcnJheTxUPj4ge1xuICBwdWJsaWMgdHlwZSA9ICdidWZmZXInO1xuICBwdWJsaWMgb3V0OiBTdHJlYW08QXJyYXk8VD4+ID0gbnVsbCBhcyBhbnk7XG4gIHByaXZhdGUgc2lsOiBJbnRlcm5hbExpc3RlbmVyPGFueT47XG4gIHByaXZhdGUgYWNjOiBBcnJheTxUPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzOiBTdHJlYW08YW55PiwgcHVibGljIGluczogU3RyZWFtPFQ+KSB7XG4gIH1cblxuICBmbHVzaCgpIHtcbiAgICBpZiAodGhpcy5hY2MubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vdXQuX24odGhpcy5hY2MpO1xuICAgICAgdGhpcy5hY2MgPSBbXTtcbiAgICB9XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08QXJyYXk8VD4+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgICB0aGlzLnNpbCA9IG5ldyBTZXBhcmF0b3JJTChvdXQsIHRoaXMpO1xuICAgIHRoaXMucy5fYWRkKHRoaXMuc2lsKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuZmx1c2goKTtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gICAgdGhpcy5zLl9yZW1vdmUodGhpcy5zaWwpO1xuICAgIHRoaXMuc2lsID0gTk9fSUw7XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgdGhpcy5hY2MucHVzaCh0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IG91dCA9IHRoaXMub3V0O1xuICAgIGlmICghb3V0KSByZXR1cm47XG4gICAgdGhpcy5mbHVzaCgpO1xuICAgIG91dC5fYygpO1xuICB9XG59XG5cbi8qKlxuICogQnVmZmVycyBhIHN0cmVhbSB1c2luZyBhIHNlcGFyYXRvciBzdHJlYW0uIFJldHVybnMgYSBzdHJlYW0gdGhhdCBlbWl0c1xuICogYXJyYXlzLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtOlxuICpcbiAqIGBgYHRleHRcbiAqIC0tMS0tMi0tMy0tNC0tNS0tNi0tNy0tOC0tOXxcbiAqIGJ1ZmZlciggLWEtLS0tLS0tLS1iLS0tLS0tLS0tY3wgKVxuICogLS0tLS0tLS0tWzEsMiwzXS0tLVs0LDUsNl0tLS1bNyw4LDldfFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGJ1ZmZlciBmcm9tICd4c3RyZWFtL2V4dHJhL2J1ZmZlcidcbiAqXG4gKiBjb25zdCBzb3VyY2UgPSB4cy5wZXJpb2RpYyg1MCkudGFrZSgxMCk7XG4gKiBjb25zdCBzZXBhcmF0b3IgPSB4cy5wZXJpb2RpYygxNzApLnRha2UoMyk7XG4gKiBjb25zdCBidWZmZXJlZCA9IHNvdXJjZS5jb21wb3NlKGJ1ZmZlcihzZXBhcmF0b3IpKTtcbiAqXG4gKiBidWZmZXJlZC5hZGRMaXN0ZW5lcih7XG4gKiAgIG5leHQ6IGFyciA9PiBjb25zb2xlLmxvZyhhcnIpLFxuICogICBlcnJvcjogZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBgYGB0ZXh0XG4gKiA+IFswLCAxLCAyXVxuICogPiBbMywgNCwgNV1cbiAqID4gWzYsIDcsIDhdXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmVhbX0gc2VwYXJhdG9yIFNvbWUgb3RoZXIgc3RyZWFtIHRoYXQgaXMgdXNlZCB0byBrbm93IHdoZW4gdG9cbiAqIHNwbGl0IHRoZSBvdXRwdXQgc3RyZWFtLlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWZmZXI8VD4oczogU3RyZWFtPGFueT4pOiAoaW5zOiBTdHJlYW08VD4pID0+IFN0cmVhbTxBcnJheTxUPj4ge1xuICByZXR1cm4gZnVuY3Rpb24gYnVmZmVyT3BlcmF0b3IoaW5zOiBTdHJlYW08VD4pIHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxBcnJheTxUPj4obmV3IEJ1ZmZlck9wZXJhdG9yPFQ+KHMsIGlucykpO1xuICB9O1xufVxuIl19