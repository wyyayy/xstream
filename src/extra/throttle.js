"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var ThrottleOperator = /** @class */ (function () {
    function ThrottleOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'throttle';
        this.out = null;
        this.id = null;
    }
    ThrottleOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ThrottleOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.id = null;
    };
    ThrottleOperator.prototype.clearInterval = function () {
        var id = this.id;
        if (id !== null) {
            clearInterval(id);
        }
        this.id = null;
    };
    ThrottleOperator.prototype._n = function (t) {
        var _this = this;
        var u = this.out;
        if (!u)
            return;
        if (this.id)
            return;
        u._n(t);
        this.id = setInterval(function () {
            _this.clearInterval();
        }, this.dt);
    };
    ThrottleOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._e(err);
    };
    ThrottleOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._c();
    };
    return ThrottleOperator;
}());
/**
 * Emits event and drops subsequent events until a certain amount of silence has passed.
 *
 * Marble diagram:
 *
 * ```text
 * --1-2-----3--4----5|
 *     throttle(60)
 * --1-------3-------5-|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import throttle from 'xstream/extra/throttle'
 *
 * const stream = fromDiagram('--1-2-----3--4----5|')
 *  .compose(throttle(60))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 3
 * > 5
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function throttle(period) {
    return function throttleOperator(ins) {
        return new index_1.Stream(new ThrottleOperator(period, ins));
    };
}
exports.default = throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUEwQztBQUUxQztJQUtFLDBCQUFtQixFQUFVLEVBQ1YsR0FBYztRQURkLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBTDFCLFNBQUksR0FBRyxVQUFVLENBQUM7UUFDbEIsUUFBRyxHQUFjLElBQVcsQ0FBQztRQUM1QixPQUFFLEdBQVEsSUFBSSxDQUFDO0lBSXZCLENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sR0FBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFXLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDakIsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFDRSxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtZQUNmLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuQjtRQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFFRCw2QkFBRSxHQUFGLFVBQUcsQ0FBSTtRQUFQLGlCQVFDO1FBUEMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLElBQUksQ0FBQyxFQUFFO1lBQUUsT0FBTztRQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUM7WUFDcEIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsNkJBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELDZCQUFFLEdBQUY7UUFDRSxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDVCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbkRELElBbURDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILGtCQUFvQyxNQUFjO0lBQ2hELE9BQU8sMEJBQTBCLEdBQWM7UUFDN0MsT0FBTyxJQUFJLGNBQU0sQ0FBSSxJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQztBQUNKLENBQUM7QUFKRCwyQkFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3IsIFN0cmVhbX0gZnJvbSAnLi4vaW5kZXgnO1xuXG5jbGFzcyBUaHJvdHRsZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICd0aHJvdHRsZSc7XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxUPiA9IG51bGwgYXMgYW55O1xuICBwcml2YXRlIGlkOiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgaW5zOiBTdHJlYW08VD4pIHtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxUPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gICAgdGhpcy5pZCA9IG51bGw7XG4gIH1cblxuICBjbGVhckludGVydmFsKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5pZDtcbiAgICBpZiAoaWQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaWQpO1xuICAgIH1cbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgfVxuXG4gIF9uKHQ6IFQpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgaWYgKHRoaXMuaWQpIHJldHVybjtcbiAgICB1Ll9uKHQpO1xuICAgIHRoaXMuaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLmNsZWFySW50ZXJ2YWwoKTtcbiAgICB9LCB0aGlzLmR0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHRoaXMuY2xlYXJJbnRlcnZhbCgpO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB0aGlzLmNsZWFySW50ZXJ2YWwoKTtcbiAgICB1Ll9jKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBFbWl0cyBldmVudCBhbmQgZHJvcHMgc3Vic2VxdWVudCBldmVudHMgdW50aWwgYSBjZXJ0YWluIGFtb3VudCBvZiBzaWxlbmNlIGhhcyBwYXNzZWQuXG4gKlxuICogTWFyYmxlIGRpYWdyYW06XG4gKlxuICogYGBgdGV4dFxuICogLS0xLTItLS0tLTMtLTQtLS0tNXxcbiAqICAgICB0aHJvdHRsZSg2MClcbiAqIC0tMS0tLS0tLS0zLS0tLS0tLTUtfFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGZyb21EaWFncmFtIGZyb20gJ3hzdHJlYW0vZXh0cmEvZnJvbURpYWdyYW0nXG4gKiBpbXBvcnQgdGhyb3R0bGUgZnJvbSAneHN0cmVhbS9leHRyYS90aHJvdHRsZSdcbiAqXG4gKiBjb25zdCBzdHJlYW0gPSBmcm9tRGlhZ3JhbSgnLS0xLTItLS0tLTMtLTQtLS0tNXwnKVxuICogIC5jb21wb3NlKHRocm90dGxlKDYwKSlcbiAqXG4gKiBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiBpID0+IGNvbnNvbGUubG9nKGkpLFxuICogICBlcnJvcjogZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSxcbiAqICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIGBgYHRleHRcbiAqID4gMVxuICogPiAzXG4gKiA+IDVcbiAqID4gY29tcGxldGVkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gcGVyaW9kIFRoZSBhbW91bnQgb2Ygc2lsZW5jZSByZXF1aXJlZCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRocm90dGxlPFQ+KHBlcmlvZDogbnVtYmVyKTogKGluczogU3RyZWFtPFQ+KSA9PiBTdHJlYW08VD4ge1xuICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGVPcGVyYXRvcihpbnM6IFN0cmVhbTxUPikge1xuICAgIHJldHVybiBuZXcgU3RyZWFtPFQ+KG5ldyBUaHJvdHRsZU9wZXJhdG9yKHBlcmlvZCwgaW5zKSk7XG4gIH07XG59XG4iXX0=