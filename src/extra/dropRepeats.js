"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var empty = {};
var DropRepeatsOperator = /** @class */ (function () {
    function DropRepeatsOperator(ins, fn) {
        this.ins = ins;
        this.type = 'dropRepeats';
        this.out = null;
        this.v = empty;
        this.isEq = fn ? fn : function (x, y) { return x === y; };
    }
    DropRepeatsOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DropRepeatsOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.v = empty;
    };
    DropRepeatsOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        var v = this.v;
        if (v !== empty && this.isEq(t, v))
            return;
        this.v = t;
        u._n(t);
    };
    DropRepeatsOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    DropRepeatsOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        u._c();
    };
    return DropRepeatsOperator;
}());
exports.DropRepeatsOperator = DropRepeatsOperator;
/**
 * Drops consecutive duplicate values in a stream.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--1--1--1--2--3--4--3--3|
 *     dropRepeats
 * --1--2--1--------2--3--4--3---|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of(1, 2, 1, 1, 1, 2, 3, 4, 3, 3)
 *   .compose(dropRepeats())
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
 * > 2
 * > 1
 * > 2
 * > 3
 * > 4
 * > 3
 * > completed
 * ```
 *
 * Example with a custom isEqual function:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of('a', 'b', 'a', 'A', 'B', 'b')
 *   .compose(dropRepeats((x, y) => x.toLowerCase() === y.toLowerCase()))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > a
 * > b
 * > a
 * > B
 * > completed
 * ```
 *
 * @param {Function} isEqual An optional function of type
 * `(x: T, y: T) => boolean` that takes an event from the input stream and
 * checks if it is equal to previous event, by returning a boolean.
 * @return {Stream}
 */
function dropRepeats(isEqual) {
    if (isEqual === void 0) { isEqual = void 0; }
    return function dropRepeatsOperator(ins) {
        return new index_1.Stream(new DropRepeatsOperator(ins, isEqual));
    };
}
exports.default = dropRepeats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcFJlcGVhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcm9wUmVwZWF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUEwQztBQUMxQyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFFakI7SUFNRSw2QkFBbUIsR0FBYyxFQUNyQixFQUF5QztRQURsQyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBTDFCLFNBQUksR0FBRyxhQUFhLENBQUM7UUFDckIsUUFBRyxHQUFjLElBQVcsQ0FBQztRQUU1QixNQUFDLEdBQVksS0FBSyxDQUFDO1FBSXpCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsS0FBSyxDQUFDLEVBQVAsQ0FBTyxDQUFDO0lBQzFDLENBQUM7SUFFRCxvQ0FBTSxHQUFOLFVBQU8sR0FBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxtQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFXLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELGdDQUFFLEdBQUYsVUFBRyxDQUFJO1FBQ0wsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFRCxnQ0FBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCxnQ0FBRSxHQUFGO1FBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDVCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDO0FBMUNZLGtEQUFtQjtBQTRDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRUc7QUFDSCxxQkFBdUMsT0FBdUQ7SUFBdkQsd0JBQUEsRUFBQSxlQUFzRCxDQUFDO0lBQzVGLE9BQU8sNkJBQTZCLEdBQWM7UUFDaEQsT0FBTyxJQUFJLGNBQU0sQ0FBSSxJQUFJLG1CQUFtQixDQUFJLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFKRCw4QkFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3IsIFN0cmVhbX0gZnJvbSAnLi4vaW5kZXgnO1xuY29uc3QgZW1wdHkgPSB7fTtcblxuZXhwb3J0IGNsYXNzIERyb3BSZXBlYXRzT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIHB1YmxpYyB0eXBlID0gJ2Ryb3BSZXBlYXRzJztcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+ID0gbnVsbCBhcyBhbnk7XG4gIHB1YmxpYyBpc0VxOiAoeDogVCwgeTogVCkgPT4gYm9vbGVhbjtcbiAgcHJpdmF0ZSB2OiBUID0gPGFueT4gZW1wdHk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluczogU3RyZWFtPFQ+LFxuICAgICAgICAgICAgICBmbjogKCh4OiBULCB5OiBUKSA9PiBib29sZWFuKSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuaXNFcSA9IGZuID8gZm4gOiAoeCwgeSkgPT4geCA9PT0geTtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxUPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gICAgdGhpcy52ID0gZW1wdHkgYXMgYW55O1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICBjb25zdCB2ID0gdGhpcy52O1xuICAgIGlmICh2ICE9PSBlbXB0eSAmJiB0aGlzLmlzRXEodCwgdikpIHJldHVybjtcbiAgICB0aGlzLnYgPSB0O1xuICAgIHUuX24odCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB1Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdS5fYygpO1xuICB9XG59XG5cbi8qKlxuICogRHJvcHMgY29uc2VjdXRpdmUgZHVwbGljYXRlIHZhbHVlcyBpbiBhIHN0cmVhbS5cbiAqXG4gKiBNYXJibGUgZGlhZ3JhbTpcbiAqXG4gKiBgYGB0ZXh0XG4gKiAtLTEtLTItLTEtLTEtLTEtLTItLTMtLTQtLTMtLTN8XG4gKiAgICAgZHJvcFJlcGVhdHNcbiAqIC0tMS0tMi0tMS0tLS0tLS0tMi0tMy0tNC0tMy0tLXxcbiAqIGBgYFxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIGltcG9ydCBkcm9wUmVwZWF0cyBmcm9tICd4c3RyZWFtL2V4dHJhL2Ryb3BSZXBlYXRzJ1xuICpcbiAqIGNvbnN0IHN0cmVhbSA9IHhzLm9mKDEsIDIsIDEsIDEsIDEsIDIsIDMsIDQsIDMsIDMpXG4gKiAgIC5jb21wb3NlKGRyb3BSZXBlYXRzKCkpXG4gKlxuICogc3RyZWFtLmFkZExpc3RlbmVyKHtcbiAqICAgbmV4dDogaSA9PiBjb25zb2xlLmxvZyhpKSxcbiAqICAgZXJyb3I6IGVyciA9PiBjb25zb2xlLmVycm9yKGVyciksXG4gKiAgIGNvbXBsZXRlOiAoKSA9PiBjb25zb2xlLmxvZygnY29tcGxldGVkJylcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBgYGB0ZXh0XG4gKiA+IDFcbiAqID4gMlxuICogPiAxXG4gKiA+IDJcbiAqID4gM1xuICogPiA0XG4gKiA+IDNcbiAqID4gY29tcGxldGVkXG4gKiBgYGBcbiAqXG4gKiBFeGFtcGxlIHdpdGggYSBjdXN0b20gaXNFcXVhbCBmdW5jdGlvbjpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGRyb3BSZXBlYXRzIGZyb20gJ3hzdHJlYW0vZXh0cmEvZHJvcFJlcGVhdHMnXG4gKlxuICogY29uc3Qgc3RyZWFtID0geHMub2YoJ2EnLCAnYicsICdhJywgJ0EnLCAnQicsICdiJylcbiAqICAgLmNvbXBvc2UoZHJvcFJlcGVhdHMoKHgsIHkpID0+IHgudG9Mb3dlckNhc2UoKSA9PT0geS50b0xvd2VyQ2FzZSgpKSlcbiAqXG4gKiBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiBpID0+IGNvbnNvbGUubG9nKGkpLFxuICogICBlcnJvcjogZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSxcbiAqICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIGBgYHRleHRcbiAqID4gYVxuICogPiBiXG4gKiA+IGFcbiAqID4gQlxuICogPiBjb21wbGV0ZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGlzRXF1YWwgQW4gb3B0aW9uYWwgZnVuY3Rpb24gb2YgdHlwZVxuICogYCh4OiBULCB5OiBUKSA9PiBib29sZWFuYCB0aGF0IHRha2VzIGFuIGV2ZW50IGZyb20gdGhlIGlucHV0IHN0cmVhbSBhbmRcbiAqIGNoZWNrcyBpZiBpdCBpcyBlcXVhbCB0byBwcmV2aW91cyBldmVudCwgYnkgcmV0dXJuaW5nIGEgYm9vbGVhbi5cbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZHJvcFJlcGVhdHM8VD4oaXNFcXVhbDogKCh4OiBULCB5OiBUKSA9PiBib29sZWFuKSB8IHVuZGVmaW5lZCA9IHZvaWQgMCk6IChpbnM6IFN0cmVhbTxUPikgPT4gU3RyZWFtPFQ+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRyb3BSZXBlYXRzT3BlcmF0b3IoaW5zOiBTdHJlYW08VD4pOiBTdHJlYW08VD4ge1xuICAgIHJldHVybiBuZXcgU3RyZWFtPFQ+KG5ldyBEcm9wUmVwZWF0c09wZXJhdG9yPFQ+KGlucywgaXNFcXVhbCkpO1xuICB9O1xufVxuIl19