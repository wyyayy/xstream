"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var ConcatProducer = /** @class */ (function () {
    function ConcatProducer(streams) {
        this.streams = streams;
        this.type = 'concat';
        this.out = null;
        this.i = 0;
    }
    ConcatProducer.prototype._start = function (out) {
        this.out = out;
        this.streams[this.i]._add(this);
    };
    ConcatProducer.prototype._stop = function () {
        var streams = this.streams;
        if (this.i < streams.length) {
            streams[this.i]._remove(this);
        }
        this.i = 0;
        this.out = null;
    };
    ConcatProducer.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        u._n(t);
    };
    ConcatProducer.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    ConcatProducer.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        var streams = this.streams;
        streams[this.i]._remove(this);
        if (++this.i < streams.length) {
            streams[this.i]._add(this);
        }
        else {
            u._c();
        }
    };
    return ConcatProducer;
}());
/**
 * Puts one stream after the other. *concat* is a factory that takes multiple
 * streams as arguments, and starts the `n+1`-th stream only when the `n`-th
 * stream has completed. It concatenates those streams together.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2---3---4-|
 * ...............--a-b-c--d-|
 *           concat
 * --1--2---3---4---a-b-c--d-|
 * ```
 *
 * Example:
 *
 * ```js
 * import concat from 'xstream/extra/concat'
 *
 * const streamA = xs.of('a', 'b', 'c')
 * const streamB = xs.of(10, 20, 30)
 * const streamC = xs.of('X', 'Y', 'Z')
 *
 * const outputStream = concat(streamA, streamB, streamC)
 *
 * outputStream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to concatenate together with other streams.
 * @param {Stream} stream2 A stream to concatenate together with other streams. Two
 * or more streams may be given as arguments.
 * @return {Stream}
 */
function concat() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new index_1.Stream(new ConcatProducer(streams));
}
exports.default = concat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uY2F0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQStFO0FBRS9FO0lBS0Usd0JBQW1CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBSnJDLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDaEIsUUFBRyxHQUFjLElBQVcsQ0FBQztRQUM1QixNQUFDLEdBQVcsQ0FBQyxDQUFDO0lBR3RCLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sR0FBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUNFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBVyxDQUFDO0lBQ3pCLENBQUM7SUFFRCwyQkFBRSxHQUFGLFVBQUcsQ0FBSTtRQUNMLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFRCwyQkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCwyQkFBRSxHQUFGO1FBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNSO0lBQ0gsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBQ0g7SUFBa0MsaUJBQTRCO1NBQTVCLFVBQTRCLEVBQTVCLHFCQUE0QixFQUE1QixJQUE0QjtRQUE1Qiw0QkFBNEI7O0lBQzVELE9BQU8sSUFBSSxjQUFNLENBQUksSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRkQseUJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmVhbSwgSW50ZXJuYWxQcm9kdWNlciwgSW50ZXJuYWxMaXN0ZW5lciwgT3V0U2VuZGVyfSBmcm9tICcuLi9pbmRleCc7XG5cbmNsYXNzIENvbmNhdFByb2R1Y2VyPFQ+IGltcGxlbWVudHMgSW50ZXJuYWxQcm9kdWNlcjxUPiwgSW50ZXJuYWxMaXN0ZW5lcjxUPiwgT3V0U2VuZGVyPFQ+IHtcbiAgcHVibGljIHR5cGUgPSAnY29uY2F0JztcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+ID0gbnVsbCBhcyBhbnk7XG4gIHByaXZhdGUgaTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RyZWFtczogQXJyYXk8U3RyZWFtPFQ+Pikge1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5zdHJlYW1zW3RoaXMuaV0uX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0cmVhbXMgPSB0aGlzLnN0cmVhbXM7XG4gICAgaWYgKHRoaXMuaSA8IHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICBzdHJlYW1zW3RoaXMuaV0uX3JlbW92ZSh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5pID0gMDtcbiAgICB0aGlzLm91dCA9IG51bGwgYXMgYW55O1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB1Ll9uKHQpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIGNvbnN0IHN0cmVhbXMgPSB0aGlzLnN0cmVhbXM7XG4gICAgc3RyZWFtc1t0aGlzLmldLl9yZW1vdmUodGhpcyk7XG4gICAgaWYgKCsrdGhpcy5pIDwgc3RyZWFtcy5sZW5ndGgpIHtcbiAgICAgIHN0cmVhbXNbdGhpcy5pXS5fYWRkKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1Ll9jKCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUHV0cyBvbmUgc3RyZWFtIGFmdGVyIHRoZSBvdGhlci4gKmNvbmNhdCogaXMgYSBmYWN0b3J5IHRoYXQgdGFrZXMgbXVsdGlwbGVcbiAqIHN0cmVhbXMgYXMgYXJndW1lbnRzLCBhbmQgc3RhcnRzIHRoZSBgbisxYC10aCBzdHJlYW0gb25seSB3aGVuIHRoZSBgbmAtdGhcbiAqIHN0cmVhbSBoYXMgY29tcGxldGVkLiBJdCBjb25jYXRlbmF0ZXMgdGhvc2Ugc3RyZWFtcyB0b2dldGhlci5cbiAqXG4gKiBNYXJibGUgZGlhZ3JhbTpcbiAqXG4gKiBgYGB0ZXh0XG4gKiAtLTEtLTItLS0zLS0tNC18XG4gKiAuLi4uLi4uLi4uLi4uLi4tLWEtYi1jLS1kLXxcbiAqICAgICAgICAgICBjb25jYXRcbiAqIC0tMS0tMi0tLTMtLS00LS0tYS1iLWMtLWQtfFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGNvbmNhdCBmcm9tICd4c3RyZWFtL2V4dHJhL2NvbmNhdCdcbiAqXG4gKiBjb25zdCBzdHJlYW1BID0geHMub2YoJ2EnLCAnYicsICdjJylcbiAqIGNvbnN0IHN0cmVhbUIgPSB4cy5vZigxMCwgMjAsIDMwKVxuICogY29uc3Qgc3RyZWFtQyA9IHhzLm9mKCdYJywgJ1knLCAnWicpXG4gKlxuICogY29uc3Qgb3V0cHV0U3RyZWFtID0gY29uY2F0KHN0cmVhbUEsIHN0cmVhbUIsIHN0cmVhbUMpXG4gKlxuICogb3V0cHV0U3RyZWFtLmFkZExpc3RlbmVyKHtcbiAqICAgbmV4dDogKHgpID0+IGNvbnNvbGUubG9nKHgpLFxuICogICBlcnJvcjogKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICogICBjb21wbGV0ZTogKCkgPT4gY29uc29sZS5sb2coJ2NvbmNhdCBjb21wbGV0ZWQnKSxcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAZmFjdG9yeSB0cnVlXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtMSBBIHN0cmVhbSB0byBjb25jYXRlbmF0ZSB0b2dldGhlciB3aXRoIG90aGVyIHN0cmVhbXMuXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtMiBBIHN0cmVhbSB0byBjb25jYXRlbmF0ZSB0b2dldGhlciB3aXRoIG90aGVyIHN0cmVhbXMuIFR3b1xuICogb3IgbW9yZSBzdHJlYW1zIG1heSBiZSBnaXZlbiBhcyBhcmd1bWVudHMuXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmNhdDxUPiguLi5zdHJlYW1zOiBBcnJheTxTdHJlYW08VD4+KTogU3RyZWFtPFQ+IHtcbiAgcmV0dXJuIG5ldyBTdHJlYW08VD4obmV3IENvbmNhdFByb2R1Y2VyKHN0cmVhbXMpKTtcbn1cbiJdfQ==