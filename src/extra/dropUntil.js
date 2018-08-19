"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var OtherIL = /** @class */ (function () {
    function OtherIL(out, op) {
        this.out = out;
        this.op = op;
    }
    OtherIL.prototype._n = function (t) {
        this.op.up();
    };
    OtherIL.prototype._e = function (err) {
        this.out._e(err);
    };
    OtherIL.prototype._c = function () { };
    return OtherIL;
}());
var DropUntilOperator = /** @class */ (function () {
    function DropUntilOperator(o, // o = other
    ins) {
        this.o = o;
        this.ins = ins;
        this.type = 'dropUntil';
        this.out = null;
        this.oil = index_1.NO_IL; // oil = other InternalListener
        this.on = false;
    }
    DropUntilOperator.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new OtherIL(out, this));
        this.ins._add(this);
    };
    DropUntilOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = null;
        this.oil = index_1.NO_IL;
    };
    DropUntilOperator.prototype.up = function () {
        this.on = true;
        this.o._remove(this.oil);
        this.oil = index_1.NO_IL;
    };
    DropUntilOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        if (!this.on)
            return;
        u._n(t);
    };
    DropUntilOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    DropUntilOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this._stop();
        u._c();
    };
    return DropUntilOperator;
}());
exports.DropUntilOperator = DropUntilOperator;
/**
 * Starts emitting the input stream when another stream emits a next event. The
 * output stream will emit no items if another stream is empty.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3--4----5----6---
 *   dropUntil( --------a--b--| )
 * ---------------------5----6|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropUntil from 'xstream/extra/dropUntil'
 *
 * const other = xs.periodic(220).take(1)
 *
 * const stream = xs.periodic(50)
 *   .take(6)
 *   .compose(dropUntil(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 4
 * > 5
 * > completed
 * ```
 *
 * #### Arguments:
 *
 * @param {Stream} other Some other stream that is used to know when the output
 * stream of this operator should start emitting.
 * @return {Stream}
 */
function dropUntil(other) {
    return function dropUntilOperator(ins) {
        return new index_1.Stream(new DropUntilOperator(other, ins));
    };
}
exports.default = dropUntil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcFVudGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJvcFVudGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQThFO0FBRTlFO0lBQ0UsaUJBQW1CLEdBQWMsRUFDYixFQUF3QjtRQUR6QixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2IsT0FBRSxHQUFGLEVBQUUsQ0FBc0I7SUFDNUMsQ0FBQztJQUVELG9CQUFFLEdBQUYsVUFBRyxDQUFJO1FBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxvQkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxvQkFBRSxHQUFGLGNBQU0sQ0FBQztJQUNULGNBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQUVEO0lBTUUsMkJBQW1CLENBQWMsRUFBRSxZQUFZO0lBQzVCLEdBQWM7UUFEZCxNQUFDLEdBQUQsQ0FBQyxDQUFhO1FBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBVztRQU4xQixTQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ25CLFFBQUcsR0FBYyxJQUFXLENBQUM7UUFDNUIsUUFBRyxHQUEwQixhQUFLLENBQUMsQ0FBQywrQkFBK0I7UUFDbkUsT0FBRSxHQUFZLEtBQUssQ0FBQztJQUk1QixDQUFDO0lBRUQsa0NBQU0sR0FBTixVQUFPLEdBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBVyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsYUFBSyxDQUFDO0lBQ25CLENBQUM7SUFFRCw4QkFBRSxHQUFGO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELDhCQUFFLEdBQUYsVUFBRyxDQUFJO1FBQ0wsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsOEJBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsOEJBQUUsR0FBRjtRQUNFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQWhERCxJQWdEQztBQWhEWSw4Q0FBaUI7QUFrRDlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNILG1CQUFxQyxLQUFrQjtJQUNyRCxPQUFPLDJCQUEyQixHQUFjO1FBQzlDLE9BQU8sSUFBSSxjQUFNLENBQUksSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsNEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBJbnRlcm5hbExpc3RlbmVyLCBTdHJlYW0sIE91dFNlbmRlciwgTk9fSUx9IGZyb20gJy4uL2luZGV4JztcblxuY2xhc3MgT3RoZXJJTDxUPiBpbXBsZW1lbnRzIEludGVybmFsTGlzdGVuZXI8YW55PiwgT3V0U2VuZGVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIG91dDogU3RyZWFtPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIG9wOiBEcm9wVW50aWxPcGVyYXRvcjxUPikge1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIHRoaXMub3AudXAoKTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgdGhpcy5vdXQuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge31cbn1cblxuZXhwb3J0IGNsYXNzIERyb3BVbnRpbE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdkcm9wVW50aWwnO1xuICBwdWJsaWMgb3V0OiBTdHJlYW08VD4gPSBudWxsIGFzIGFueTtcbiAgcHJpdmF0ZSBvaWw6IEludGVybmFsTGlzdGVuZXI8YW55PiA9IE5PX0lMOyAvLyBvaWwgPSBvdGhlciBJbnRlcm5hbExpc3RlbmVyXG4gIHByaXZhdGUgb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbzogU3RyZWFtPGFueT4sIC8vIG8gPSBvdGhlclxuICAgICAgICAgICAgICBwdWJsaWMgaW5zOiBTdHJlYW08VD4pIHtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxUPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuby5fYWRkKHRoaXMub2lsID0gbmV3IE90aGVySUwob3V0LCB0aGlzKSk7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vLl9yZW1vdmUodGhpcy5vaWwpO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gICAgdGhpcy5vaWwgPSBOT19JTDtcbiAgfVxuXG4gIHVwKCk6IHZvaWQge1xuICAgIHRoaXMub24gPSB0cnVlO1xuICAgIHRoaXMuby5fcmVtb3ZlKHRoaXMub2lsKTtcbiAgICB0aGlzLm9pbCA9IE5PX0lMO1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICBpZiAoIXRoaXMub24pIHJldHVybjtcbiAgICB1Ll9uKHQpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHRoaXMuX3N0b3AoKTtcbiAgICB1Ll9jKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBTdGFydHMgZW1pdHRpbmcgdGhlIGlucHV0IHN0cmVhbSB3aGVuIGFub3RoZXIgc3RyZWFtIGVtaXRzIGEgbmV4dCBldmVudC4gVGhlXG4gKiBvdXRwdXQgc3RyZWFtIHdpbGwgZW1pdCBubyBpdGVtcyBpZiBhbm90aGVyIHN0cmVhbSBpcyBlbXB0eS5cbiAqXG4gKiBNYXJibGUgZGlhZ3JhbTpcbiAqXG4gKiBgYGB0ZXh0XG4gKiAtLS0xLS0tMi0tLS0tMy0tNC0tLS01LS0tLTYtLS1cbiAqICAgZHJvcFVudGlsKCAtLS0tLS0tLWEtLWItLXwgKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tNS0tLS02fFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGRyb3BVbnRpbCBmcm9tICd4c3RyZWFtL2V4dHJhL2Ryb3BVbnRpbCdcbiAqXG4gKiBjb25zdCBvdGhlciA9IHhzLnBlcmlvZGljKDIyMCkudGFrZSgxKVxuICpcbiAqIGNvbnN0IHN0cmVhbSA9IHhzLnBlcmlvZGljKDUwKVxuICogICAudGFrZSg2KVxuICogICAuY29tcG9zZShkcm9wVW50aWwob3RoZXIpKVxuICpcbiAqIHN0cmVhbS5hZGRMaXN0ZW5lcih7XG4gKiAgIG5leHQ6IGkgPT4gY29uc29sZS5sb2coaSksXG4gKiAgIGVycm9yOiBlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICogICBjb21wbGV0ZTogKCkgPT4gY29uc29sZS5sb2coJ2NvbXBsZXRlZCcpXG4gKiB9KVxuICogYGBgXG4gKlxuICogYGBgdGV4dFxuICogPiA0XG4gKiA+IDVcbiAqID4gY29tcGxldGVkXG4gKiBgYGBcbiAqXG4gKiAjIyMjIEFyZ3VtZW50czpcbiAqXG4gKiBAcGFyYW0ge1N0cmVhbX0gb3RoZXIgU29tZSBvdGhlciBzdHJlYW0gdGhhdCBpcyB1c2VkIHRvIGtub3cgd2hlbiB0aGUgb3V0cHV0XG4gKiBzdHJlYW0gb2YgdGhpcyBvcGVyYXRvciBzaG91bGQgc3RhcnQgZW1pdHRpbmcuXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRyb3BVbnRpbDxUPihvdGhlcjogU3RyZWFtPGFueT4pOiAoaW5zOiBTdHJlYW08VD4pID0+IFN0cmVhbTxUPiB7XG4gIHJldHVybiBmdW5jdGlvbiBkcm9wVW50aWxPcGVyYXRvcihpbnM6IFN0cmVhbTxUPik6IFN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08VD4obmV3IERyb3BVbnRpbE9wZXJhdG9yKG90aGVyLCBpbnMpKTtcbiAgfTtcbn1cbiJdfQ==