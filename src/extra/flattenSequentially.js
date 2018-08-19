"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var FSInner = /** @class */ (function () {
    function FSInner(out, op) {
        this.out = out;
        this.op = op;
    }
    FSInner.prototype._n = function (t) {
        this.out._n(t);
    };
    FSInner.prototype._e = function (err) {
        this.out._e(err);
    };
    FSInner.prototype._c = function () {
        this.op.less();
    };
    return FSInner;
}());
var FlattenSeqOperator = /** @class */ (function () {
    function FlattenSeqOperator(ins) {
        this.type = 'flattenSequentially';
        this.ins = ins;
        this.out = null;
        this.open = true;
        this.active = null;
        this.activeIL = null;
        this.seq = [];
    }
    FlattenSeqOperator.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.active = null;
        this.activeIL = new FSInner(out, this);
        this.seq = [];
        this.ins._add(this);
    };
    FlattenSeqOperator.prototype._stop = function () {
        this.ins._remove(this);
        if (this.active && this.activeIL) {
            this.active._remove(this.activeIL);
        }
        this.open = true;
        this.active = null;
        this.activeIL = null;
        this.seq = [];
        this.out = null;
    };
    FlattenSeqOperator.prototype.less = function () {
        this.active = null;
        var seq = this.seq;
        if (seq.length > 0) {
            this._n(seq.shift());
        }
        if (!this.open && !this.active) {
            this.out._c();
        }
    };
    FlattenSeqOperator.prototype._n = function (s) {
        var u = this.out;
        if (!u)
            return;
        if (this.active) {
            this.seq.push(s);
        }
        else {
            this.active = s;
            s._add(this.activeIL);
        }
    };
    FlattenSeqOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    FlattenSeqOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.open = false;
        if (!this.active && this.seq.length === 0) {
            u._c();
        }
    };
    return FlattenSeqOperator;
}());
exports.FlattenSeqOperator = FlattenSeqOperator;
/**
 * Flattens a "stream of streams", handling only one nested stream at a time,
 * with no concurrency, but does not drop nested streams like `flatten` does.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens sequentially and without concurrency. It works like this:
 * when the input stream emits a nested stream, *flattenSequentially* will start
 * imitating that nested one. When the next nested stream is emitted on the
 * input stream, *flattenSequentially* will keep that in a buffer, and only
 * start imitating it once the previous nested stream completes.
 *
 * In essence, `flattenSequentially` concatenates all nested streams.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+-------------------------
 *   \        \
 *    \       ----1----2---3--|
 *    --a--b----c----d--|
 *          flattenSequentially
 * -----a--b----c----d------1----2---3--
 * ```
 *
 * @return {Stream}
 */
function flattenSequentially(ins) {
    return new index_1.Stream(new FlattenSeqOperator(ins));
}
exports.default = flattenSequentially;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlblNlcXVlbnRpYWxseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW5TZXF1ZW50aWFsbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBNEQ7QUFFNUQ7SUFDRSxpQkFBb0IsR0FBYyxFQUNkLEVBQXlCO1FBRHpCLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUF1QjtJQUM3QyxDQUFDO0lBRUQsb0JBQUUsR0FBRixVQUFHLENBQUk7UUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsb0JBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsb0JBQUUsR0FBRjtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBRUQ7SUFTRSw0QkFBWSxHQUFzQjtRQVIzQixTQUFJLEdBQUcscUJBQXFCLENBQUM7UUFTbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQVcsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQU0sR0FBTixVQUFPLEdBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxrQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQVcsQ0FBQztJQUN6QixDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQWUsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCwrQkFBRSxHQUFGLFVBQUcsQ0FBWTtRQUNiLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQXNCLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRCwrQkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCwrQkFBRSxHQUFGO1FBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ1I7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBM0VELElBMkVDO0FBM0VZLGdEQUFrQjtBQTZFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsNkJBQStDLEdBQXNCO0lBQ25FLE9BQU8sSUFBSSxjQUFNLENBQUksSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFGRCxzQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3IsIFN0cmVhbSwgSW50ZXJuYWxMaXN0ZW5lcn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5jbGFzcyBGU0lubmVyPFQ+IGltcGxlbWVudHMgSW50ZXJuYWxMaXN0ZW5lcjxUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3V0OiBTdHJlYW08VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgb3A6IEZsYXR0ZW5TZXFPcGVyYXRvcjxUPikge1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIHRoaXMub3V0Ll9uKHQpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICB0aGlzLm91dC5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgdGhpcy5vcC5sZXNzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZsYXR0ZW5TZXFPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFN0cmVhbTxUPiwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdmbGF0dGVuU2VxdWVudGlhbGx5JztcbiAgcHVibGljIGluczogU3RyZWFtPFN0cmVhbTxUPj47XG4gIHByaXZhdGUgb3BlbjogYm9vbGVhbjtcbiAgcHJpdmF0ZSBhY3RpdmU6IFN0cmVhbTxUPiB8IG51bGw7XG4gIHByaXZhdGUgYWN0aXZlSUw6IEZTSW5uZXI8VD4gfCBudWxsO1xuICBwcml2YXRlIHNlcTogQXJyYXk8U3RyZWFtPFQ+PjtcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGluczogU3RyZWFtPFN0cmVhbTxUPj4pIHtcbiAgICB0aGlzLmlucyA9IGlucztcbiAgICB0aGlzLm91dCA9IG51bGwgYXMgYW55O1xuICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlSUwgPSBudWxsO1xuICAgIHRoaXMuc2VxID0gW107XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZlID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZUlMID0gbmV3IEZTSW5uZXIob3V0LCB0aGlzKTtcbiAgICB0aGlzLnNlcSA9IFtdO1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiB0aGlzLmFjdGl2ZUlMKSB7XG4gICAgICB0aGlzLmFjdGl2ZS5fcmVtb3ZlKHRoaXMuYWN0aXZlSUwpO1xuICAgIH1cbiAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZlID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZUlMID0gbnVsbDtcbiAgICB0aGlzLnNlcSA9IFtdO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gIH1cblxuICBsZXNzKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlID0gbnVsbDtcbiAgICBjb25zdCBzZXEgPSB0aGlzLnNlcTtcbiAgICBpZiAoc2VxLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX24oc2VxLnNoaWZ0KCkgYXMgU3RyZWFtPFQ+KTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm9wZW4gJiYgIXRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLm91dC5fYygpO1xuICAgIH1cbiAgfVxuXG4gIF9uKHM6IFN0cmVhbTxUPikge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc2VxLnB1c2gocyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gcztcbiAgICAgIHMuX2FkZCh0aGlzLmFjdGl2ZUlMIGFzIEZTSW5uZXI8VD4pO1xuICAgIH1cbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuYWN0aXZlICYmIHRoaXMuc2VxLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdS5fYygpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgXCJzdHJlYW0gb2Ygc3RyZWFtc1wiLCBoYW5kbGluZyBvbmx5IG9uZSBuZXN0ZWQgc3RyZWFtIGF0IGEgdGltZSxcbiAqIHdpdGggbm8gY29uY3VycmVuY3ksIGJ1dCBkb2VzIG5vdCBkcm9wIG5lc3RlZCBzdHJlYW1zIGxpa2UgYGZsYXR0ZW5gIGRvZXMuXG4gKlxuICogSWYgdGhlIGlucHV0IHN0cmVhbSBpcyBhIHN0cmVhbSB0aGF0IGVtaXRzIHN0cmVhbXMsIHRoZW4gdGhpcyBvcGVyYXRvciB3aWxsXG4gKiByZXR1cm4gYW4gb3V0cHV0IHN0cmVhbSB3aGljaCBpcyBhIGZsYXQgc3RyZWFtOiBlbWl0cyByZWd1bGFyIGV2ZW50cy4gVGhlXG4gKiBmbGF0dGVuaW5nIGhhcHBlbnMgc2VxdWVudGlhbGx5IGFuZCB3aXRob3V0IGNvbmN1cnJlbmN5LiBJdCB3b3JrcyBsaWtlIHRoaXM6XG4gKiB3aGVuIHRoZSBpbnB1dCBzdHJlYW0gZW1pdHMgYSBuZXN0ZWQgc3RyZWFtLCAqZmxhdHRlblNlcXVlbnRpYWxseSogd2lsbCBzdGFydFxuICogaW1pdGF0aW5nIHRoYXQgbmVzdGVkIG9uZS4gV2hlbiB0aGUgbmV4dCBuZXN0ZWQgc3RyZWFtIGlzIGVtaXR0ZWQgb24gdGhlXG4gKiBpbnB1dCBzdHJlYW0sICpmbGF0dGVuU2VxdWVudGlhbGx5KiB3aWxsIGtlZXAgdGhhdCBpbiBhIGJ1ZmZlciwgYW5kIG9ubHlcbiAqIHN0YXJ0IGltaXRhdGluZyBpdCBvbmNlIHRoZSBwcmV2aW91cyBuZXN0ZWQgc3RyZWFtIGNvbXBsZXRlcy5cbiAqXG4gKiBJbiBlc3NlbmNlLCBgZmxhdHRlblNlcXVlbnRpYWxseWAgY29uY2F0ZW5hdGVzIGFsbCBuZXN0ZWQgc3RyZWFtcy5cbiAqXG4gKiBNYXJibGUgZGlhZ3JhbTpcbiAqXG4gKiBgYGB0ZXh0XG4gKiAtLSstLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIFxcICAgICAgICBcXFxuICogICAgXFwgICAgICAgLS0tLTEtLS0tMi0tLTMtLXxcbiAqICAgIC0tYS0tYi0tLS1jLS0tLWQtLXxcbiAqICAgICAgICAgIGZsYXR0ZW5TZXF1ZW50aWFsbHlcbiAqIC0tLS0tYS0tYi0tLS1jLS0tLWQtLS0tLS0xLS0tLTItLS0zLS1cbiAqIGBgYFxuICpcbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmxhdHRlblNlcXVlbnRpYWxseTxUPihpbnM6IFN0cmVhbTxTdHJlYW08VD4+KTogU3RyZWFtPFQ+IHtcbiAgcmV0dXJuIG5ldyBTdHJlYW08VD4obmV3IEZsYXR0ZW5TZXFPcGVyYXRvcihpbnMpKTtcbn1cbiJdfQ==