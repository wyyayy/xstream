"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var DebounceOperator = /** @class */ (function () {
    function DebounceOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'debounce';
        this.out = null;
        this.id = null;
        this.t = index_1.NO;
    }
    DebounceOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DebounceOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.id = null;
    };
    DebounceOperator.prototype.clearInterval = function () {
        var id = this.id;
        if (id !== null) {
            clearInterval(id);
        }
        this.id = null;
    };
    DebounceOperator.prototype._n = function (t) {
        var _this = this;
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        this.t = t;
        this.id = setInterval(function () {
            _this.clearInterval();
            u._n(t);
            _this.t = index_1.NO;
        }, this.dt);
    };
    DebounceOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._e(err);
    };
    DebounceOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        if (this.t != index_1.NO)
            u._n(this.t);
        this.t = index_1.NO;
        u._c();
    };
    return DebounceOperator;
}());
/**
 * Delays events until a certain amount of silence has passed. If that timespan
 * of silence is not met the event is dropped.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2--3--4----5|
 *     debounce(60)
 * -----1----------4--|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import debounce from 'xstream/extra/debounce'
 *
 * const stream = fromDiagram('--1----2--3--4----5|')
 *  .compose(debounce(60))
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
 * > 4
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function debounce(period) {
    return function debounceOperator(ins) {
        return new index_1.Stream(new DebounceOperator(period, ins));
    };
}
exports.default = debounce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUE4QztBQUU5QztJQU1FLDBCQUFtQixFQUFVLEVBQ1YsR0FBYztRQURkLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBTjFCLFNBQUksR0FBRyxVQUFVLENBQUM7UUFDbEIsUUFBRyxHQUFjLElBQVcsQ0FBQztRQUM1QixPQUFFLEdBQVEsSUFBSSxDQUFDO1FBQ2YsTUFBQyxHQUFRLFVBQUUsQ0FBQztJQUlwQixDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLEdBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0NBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBVyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFFRCx3Q0FBYSxHQUFiO1FBQ0UsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQixJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDO0lBRUQsNkJBQUUsR0FBRixVQUFHLENBQUk7UUFBUCxpQkFVQztRQVRDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUM7WUFDcEIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFJLENBQUMsQ0FBQyxHQUFHLFVBQUUsQ0FBQztRQUNkLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsNkJBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELDZCQUFFLEdBQUY7UUFDRSxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksVUFBRTtZQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXhERCxJQXdEQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxrQkFBb0MsTUFBYztJQUNoRCxPQUFPLDBCQUEwQixHQUFjO1FBQzdDLE9BQU8sSUFBSSxjQUFNLENBQUksSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsMkJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBTdHJlYW0sIE5PfSBmcm9tICcuLi9pbmRleCc7XG5cbmNsYXNzIERlYm91bmNlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIHB1YmxpYyB0eXBlID0gJ2RlYm91bmNlJztcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+ID0gbnVsbCBhcyBhbnk7XG4gIHByaXZhdGUgaWQ6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgdDogYW55ID0gTk87XG5cbiAgY29uc3RydWN0b3IocHVibGljIGR0OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBpbnM6IFN0cmVhbTxUPikge1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBudWxsIGFzIGFueTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgfVxuXG4gIGNsZWFySW50ZXJ2YWwoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmlkO1xuICAgIGlmIChpZCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfVxuICAgIHRoaXMuaWQgPSBudWxsO1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB0aGlzLmNsZWFySW50ZXJ2YWwoKTtcbiAgICB0aGlzLnQgPSB0O1xuICAgIHRoaXMuaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLmNsZWFySW50ZXJ2YWwoKTtcbiAgICAgIHUuX24odCk7XG4gICAgICB0aGlzLnQgPSBOTztcbiAgICB9LCB0aGlzLmR0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHRoaXMuY2xlYXJJbnRlcnZhbCgpO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB0aGlzLmNsZWFySW50ZXJ2YWwoKTtcbiAgICBpZiAodGhpcy50ICE9IE5PKSB1Ll9uKHRoaXMudCk7XG4gICAgdGhpcy50ID0gTk87XG4gICAgdS5fYygpO1xuICB9XG59XG5cbi8qKlxuICogRGVsYXlzIGV2ZW50cyB1bnRpbCBhIGNlcnRhaW4gYW1vdW50IG9mIHNpbGVuY2UgaGFzIHBhc3NlZC4gSWYgdGhhdCB0aW1lc3BhblxuICogb2Ygc2lsZW5jZSBpcyBub3QgbWV0IHRoZSBldmVudCBpcyBkcm9wcGVkLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtOlxuICpcbiAqIGBgYHRleHRcbiAqIC0tMS0tLS0yLS0zLS00LS0tLTV8XG4gKiAgICAgZGVib3VuY2UoNjApXG4gKiAtLS0tLTEtLS0tLS0tLS0tNC0tfFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGZyb21EaWFncmFtIGZyb20gJ3hzdHJlYW0vZXh0cmEvZnJvbURpYWdyYW0nXG4gKiBpbXBvcnQgZGVib3VuY2UgZnJvbSAneHN0cmVhbS9leHRyYS9kZWJvdW5jZSdcbiAqXG4gKiBjb25zdCBzdHJlYW0gPSBmcm9tRGlhZ3JhbSgnLS0xLS0tLTItLTMtLTQtLS0tNXwnKVxuICogIC5jb21wb3NlKGRlYm91bmNlKDYwKSlcbiAqXG4gKiBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiBpID0+IGNvbnNvbGUubG9nKGkpLFxuICogICBlcnJvcjogZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSxcbiAqICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIGBgYHRleHRcbiAqID4gMVxuICogPiA0XG4gKiA+IGNvbXBsZXRlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHBlcmlvZCBUaGUgYW1vdW50IG9mIHNpbGVuY2UgcmVxdWlyZWQgaW4gbWlsbGlzZWNvbmRzLlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZTxUPihwZXJpb2Q6IG51bWJlcik6IChpbnM6IFN0cmVhbTxUPikgPT4gU3RyZWFtPFQ+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlT3BlcmF0b3IoaW5zOiBTdHJlYW08VD4pIHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxUPihuZXcgRGVib3VuY2VPcGVyYXRvcihwZXJpb2QsIGlucykpO1xuICB9O1xufVxuIl19