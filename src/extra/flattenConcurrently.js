"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var FCIL = /** @class */ (function () {
    function FCIL(out, op) {
        this.out = out;
        this.op = op;
    }
    FCIL.prototype._n = function (t) {
        this.out._n(t);
    };
    FCIL.prototype._e = function (err) {
        this.out._e(err);
    };
    FCIL.prototype._c = function () {
        this.op.less();
    };
    return FCIL;
}());
var FlattenConcOperator = /** @class */ (function () {
    function FlattenConcOperator(ins) {
        this.ins = ins;
        this.type = 'flattenConcurrently';
        this.active = 1; // number of outers and inners that have not yet ended
        this.out = null;
    }
    FlattenConcOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    FlattenConcOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.active = 1;
        this.out = null;
    };
    FlattenConcOperator.prototype.less = function () {
        if (--this.active === 0) {
            var u = this.out;
            if (!u)
                return;
            u._c();
        }
    };
    FlattenConcOperator.prototype._n = function (s) {
        var u = this.out;
        if (!u)
            return;
        this.active++;
        s._add(new FCIL(u, this));
    };
    FlattenConcOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    FlattenConcOperator.prototype._c = function () {
        this.less();
    };
    return FlattenConcOperator;
}());
exports.FlattenConcOperator = FlattenConcOperator;
/**
 * Flattens a "stream of streams", handling multiple concurrent nested streams
 * simultaneously.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens concurrently. It works like this: when the input stream
 * emits a nested stream, *flattenConcurrently* will start imitating that
 * nested one. When the next nested stream is emitted on the input stream,
 * *flattenConcurrently* will also imitate that new one, but will continue to
 * imitate the previous nested streams as well.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *     flattenConcurrently
 * -----a--b----c-1--d-2---3--
 * ```
 *
 * @return {Stream}
 */
function flattenConcurrently(ins) {
    return new index_1.Stream(new FlattenConcOperator(ins));
}
exports.default = flattenConcurrently;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbkNvbmN1cnJlbnRseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsYXR0ZW5Db25jdXJyZW50bHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBdUU7QUFFdkU7SUFDRSxjQUFtQixHQUFjLEVBQ2IsRUFBMEI7UUFEM0IsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNiLE9BQUUsR0FBRixFQUFFLENBQXdCO0lBQzlDLENBQUM7SUFFRCxpQkFBRSxHQUFGLFVBQUcsQ0FBSTtRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxpQkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxpQkFBRSxHQUFGO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFFRDtJQUtFLDZCQUFtQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUpsQyxTQUFJLEdBQUcscUJBQXFCLENBQUM7UUFDNUIsV0FBTSxHQUFXLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtRQUMzRSxRQUFHLEdBQWMsSUFBVyxDQUFDO0lBR3BDLENBQUM7SUFFRCxvQ0FBTSxHQUFOLFVBQU8sR0FBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxtQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFXLENBQUM7SUFDekIsQ0FBQztJQUVELGtDQUFJLEdBQUo7UUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ2YsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ1I7SUFDSCxDQUFDO0lBRUQsZ0NBQUUsR0FBRixVQUFHLENBQVk7UUFDYixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGdDQUFFLEdBQUYsVUFBRyxHQUFRO1FBQ1QsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELGdDQUFFLEdBQUY7UUFDRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBM0NZLGtEQUFtQjtBQTZDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILDZCQUErQyxHQUFzQjtJQUNuRSxPQUFPLElBQUksY0FBTSxDQUFJLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRkQsc0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBTdHJlYW0sIE91dFNlbmRlciwgSW50ZXJuYWxMaXN0ZW5lcn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5jbGFzcyBGQ0lMPFQ+IGltcGxlbWVudHMgSW50ZXJuYWxMaXN0ZW5lcjxUPiwgT3V0U2VuZGVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIG91dDogU3RyZWFtPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIG9wOiBGbGF0dGVuQ29uY09wZXJhdG9yPFQ+KSB7XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgdGhpcy5vdXQuX24odCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIHRoaXMub3V0Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICB0aGlzLm9wLmxlc3MoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmxhdHRlbkNvbmNPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFN0cmVhbTxUPiwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdmbGF0dGVuQ29uY3VycmVudGx5JztcbiAgcHJpdmF0ZSBhY3RpdmU6IG51bWJlciA9IDE7IC8vIG51bWJlciBvZiBvdXRlcnMgYW5kIGlubmVycyB0aGF0IGhhdmUgbm90IHlldCBlbmRlZFxuICBwdWJsaWMgb3V0OiBTdHJlYW08VD4gPSBudWxsIGFzIGFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zOiBTdHJlYW08U3RyZWFtPFQ+Pikge1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5hY3RpdmUgPSAxO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gIH1cblxuICBsZXNzKCk6IHZvaWQge1xuICAgIGlmICgtLXRoaXMuYWN0aXZlID09PSAwKSB7XG4gICAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgICBpZiAoIXUpIHJldHVybjtcbiAgICAgIHUuX2MoKTtcbiAgICB9XG4gIH1cblxuICBfbihzOiBTdHJlYW08VD4pIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdGhpcy5hY3RpdmUrKztcbiAgICBzLl9hZGQobmV3IEZDSUwodSwgdGhpcykpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgdGhpcy5sZXNzKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIFwic3RyZWFtIG9mIHN0cmVhbXNcIiwgaGFuZGxpbmcgbXVsdGlwbGUgY29uY3VycmVudCBuZXN0ZWQgc3RyZWFtc1xuICogc2ltdWx0YW5lb3VzbHkuXG4gKlxuICogSWYgdGhlIGlucHV0IHN0cmVhbSBpcyBhIHN0cmVhbSB0aGF0IGVtaXRzIHN0cmVhbXMsIHRoZW4gdGhpcyBvcGVyYXRvciB3aWxsXG4gKiByZXR1cm4gYW4gb3V0cHV0IHN0cmVhbSB3aGljaCBpcyBhIGZsYXQgc3RyZWFtOiBlbWl0cyByZWd1bGFyIGV2ZW50cy4gVGhlXG4gKiBmbGF0dGVuaW5nIGhhcHBlbnMgY29uY3VycmVudGx5LiBJdCB3b3JrcyBsaWtlIHRoaXM6IHdoZW4gdGhlIGlucHV0IHN0cmVhbVxuICogZW1pdHMgYSBuZXN0ZWQgc3RyZWFtLCAqZmxhdHRlbkNvbmN1cnJlbnRseSogd2lsbCBzdGFydCBpbWl0YXRpbmcgdGhhdFxuICogbmVzdGVkIG9uZS4gV2hlbiB0aGUgbmV4dCBuZXN0ZWQgc3RyZWFtIGlzIGVtaXR0ZWQgb24gdGhlIGlucHV0IHN0cmVhbSxcbiAqICpmbGF0dGVuQ29uY3VycmVudGx5KiB3aWxsIGFsc28gaW1pdGF0ZSB0aGF0IG5ldyBvbmUsIGJ1dCB3aWxsIGNvbnRpbnVlIHRvXG4gKiBpbWl0YXRlIHRoZSBwcmV2aW91cyBuZXN0ZWQgc3RyZWFtcyBhcyB3ZWxsLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtOlxuICpcbiAqIGBgYHRleHRcbiAqIC0tKy0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLVxuICogICBcXCAgICAgICAgXFxcbiAqICAgIFxcICAgICAgIC0tLS0xLS0tLTItLS0zLS1cbiAqICAgIC0tYS0tYi0tLS1jLS0tLWQtLS0tLS0tLVxuICogICAgIGZsYXR0ZW5Db25jdXJyZW50bHlcbiAqIC0tLS0tYS0tYi0tLS1jLTEtLWQtMi0tLTMtLVxuICogYGBgXG4gKlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmbGF0dGVuQ29uY3VycmVudGx5PFQ+KGluczogU3RyZWFtPFN0cmVhbTxUPj4pOiBTdHJlYW08VD4ge1xuICByZXR1cm4gbmV3IFN0cmVhbTxUPihuZXcgRmxhdHRlbkNvbmNPcGVyYXRvcihpbnMpKTtcbn1cbiJdfQ==