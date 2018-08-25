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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQWdGO0FBRWhGO0lBQ0UscUJBQW1CLEdBQXFCLEVBQVUsRUFBcUI7UUFBcEQsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtJQUV2RSxDQUFDO0lBRUQsd0JBQUUsR0FBRixVQUFHLENBQU07UUFFUCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCx3QkFBRSxHQUFGLFVBQUcsR0FBUTtRQUVULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCx3QkFBRSxHQUFGO1FBRUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFFRDtJQU1FLHdCQUFtQixDQUFjLEVBQVMsR0FBYztRQUFyQyxNQUFDLEdBQUQsQ0FBQyxDQUFhO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUxqRCxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLFFBQUcsR0FBcUIsSUFBVyxDQUFDO1FBRW5DLFFBQUcsR0FBYSxFQUFFLENBQUM7SUFJM0IsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFFRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDdkI7WUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sR0FBcUI7UUFFMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFFRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQVcsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUFFLEdBQUYsVUFBRyxDQUFJO1FBRUwsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUFFLEdBQUYsVUFBRyxHQUFRO1FBRVQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELDJCQUFFLEdBQUY7UUFFRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDWCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBdkRELElBdURDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILGdCQUFrQyxDQUFjO0lBRTlDLE9BQU8sd0JBQXdCLEdBQWM7UUFFM0MsT0FBTyxJQUFJLGNBQU0sQ0FBVyxJQUFJLGNBQWMsQ0FBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUM7QUFDSixDQUFDO0FBTkQseUJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciwgU3RyZWFtLCBJbnRlcm5hbExpc3RlbmVyLCBPdXRTZW5kZXIsIE5PX0lMIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5jbGFzcyBTZXBhcmF0b3JJTDxUPiBpbXBsZW1lbnRzIEludGVybmFsTGlzdGVuZXI8YW55PiwgT3V0U2VuZGVyPEFycmF5PFQ+PiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvdXQ6IFN0cmVhbTxBcnJheTxUPj4sIHByaXZhdGUgb3A6IEJ1ZmZlck9wZXJhdG9yPFQ+KVxuICB7XG4gIH1cblxuICBfbih0OiBhbnkpXG4gIHtcbiAgICB0aGlzLm9wLmZsdXNoKCk7XG4gIH1cblxuICBfZShlcnI6IGFueSlcbiAge1xuICAgIHRoaXMub3V0Ll9lKGVycik7XG4gIH1cblxuICBfYygpXG4gIHtcbiAgICB0aGlzLm9wLmZsdXNoKCk7XG4gICAgdGhpcy5vdXQuX2MoKTtcbiAgfVxufVxuXG5jbGFzcyBCdWZmZXJPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIEFycmF5PFQ+PiB7XG4gIHB1YmxpYyB0eXBlID0gJ2J1ZmZlcic7XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxBcnJheTxUPj4gPSBudWxsIGFzIGFueTtcbiAgcHJpdmF0ZSBzaWw6IEludGVybmFsTGlzdGVuZXI8YW55PjtcbiAgcHJpdmF0ZSBhY2M6IEFycmF5PFQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIHM6IFN0cmVhbTxhbnk+LCBwdWJsaWMgaW5zOiBTdHJlYW08VD4pXG4gIHtcbiAgfVxuXG4gIGZsdXNoKClcbiAge1xuICAgIGlmICh0aGlzLmFjYy5sZW5ndGggPiAwKVxuICAgIHtcbiAgICAgIHRoaXMub3V0Ll9uKHRoaXMuYWNjKTtcbiAgICAgIHRoaXMuYWNjID0gW107XG4gICAgfVxuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPEFycmF5PFQ+Pik6IHZvaWRcbiAge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gICAgdGhpcy5zaWwgPSBuZXcgU2VwYXJhdG9ySUwob3V0LCB0aGlzKTtcbiAgICB0aGlzLnMuX2FkZCh0aGlzLnNpbCk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLmZsdXNoKCk7XG4gICAgdGhpcy5pbnMuX3JlbW92ZSh0aGlzKTtcbiAgICB0aGlzLm91dCA9IG51bGwgYXMgYW55O1xuICAgIHRoaXMucy5fcmVtb3ZlKHRoaXMuc2lsKTtcbiAgICB0aGlzLnNpbCA9IE5PX0lMO1xuICB9XG5cbiAgX24odDogVClcbiAge1xuICAgIHRoaXMuYWNjLnB1c2godCk7XG4gIH1cblxuICBfZShlcnI6IGFueSlcbiAge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB1Ll9lKGVycik7XG4gIH1cblxuICBfYygpXG4gIHtcbiAgICBjb25zdCBvdXQgPSB0aGlzLm91dDtcbiAgICBpZiAoIW91dCkgcmV0dXJuO1xuICAgIHRoaXMuZmx1c2goKTtcbiAgICBvdXQuX2MoKTtcbiAgfVxufVxuXG4vKipcbiAqIEJ1ZmZlcnMgYSBzdHJlYW0gdXNpbmcgYSBzZXBhcmF0b3Igc3RyZWFtLiBSZXR1cm5zIGEgc3RyZWFtIHRoYXQgZW1pdHNcbiAqIGFycmF5cy5cbiAqXG4gKiBNYXJibGUgZGlhZ3JhbTpcbiAqXG4gKiBgYGB0ZXh0XG4gKiAtLTEtLTItLTMtLTQtLTUtLTYtLTctLTgtLTl8XG4gKiBidWZmZXIoIC1hLS0tLS0tLS0tYi0tLS0tLS0tLWN8IClcbiAqIC0tLS0tLS0tLVsxLDIsM10tLS1bNCw1LDZdLS0tWzcsOCw5XXxcbiAqIGBgYFxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIGltcG9ydCBidWZmZXIgZnJvbSAneHN0cmVhbS9leHRyYS9idWZmZXInXG4gKlxuICogY29uc3Qgc291cmNlID0geHMucGVyaW9kaWMoNTApLnRha2UoMTApO1xuICogY29uc3Qgc2VwYXJhdG9yID0geHMucGVyaW9kaWMoMTcwKS50YWtlKDMpO1xuICogY29uc3QgYnVmZmVyZWQgPSBzb3VyY2UuY29tcG9zZShidWZmZXIoc2VwYXJhdG9yKSk7XG4gKlxuICogYnVmZmVyZWQuYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiBhcnIgPT4gY29uc29sZS5sb2coYXJyKSxcbiAqICAgZXJyb3I6IGVyciA9PiBjb25zb2xlLmVycm9yKGVycilcbiAqIH0pO1xuICogYGBgXG4gKlxuICogYGBgdGV4dFxuICogPiBbMCwgMSwgMl1cbiAqID4gWzMsIDQsIDVdXG4gKiA+IFs2LCA3LCA4XVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJlYW19IHNlcGFyYXRvciBTb21lIG90aGVyIHN0cmVhbSB0aGF0IGlzIHVzZWQgdG8ga25vdyB3aGVuIHRvXG4gKiBzcGxpdCB0aGUgb3V0cHV0IHN0cmVhbS5cbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVmZmVyPFQ+KHM6IFN0cmVhbTxhbnk+KTogKGluczogU3RyZWFtPFQ+KSA9PiBTdHJlYW08QXJyYXk8VD4+XG57XG4gIHJldHVybiBmdW5jdGlvbiBidWZmZXJPcGVyYXRvcihpbnM6IFN0cmVhbTxUPilcbiAge1xuICAgIHJldHVybiBuZXcgU3RyZWFtPEFycmF5PFQ+PihuZXcgQnVmZmVyT3BlcmF0b3I8VD4ocywgaW5zKSk7XG4gIH07XG59XG4iXX0=