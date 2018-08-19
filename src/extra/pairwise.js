"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var PairwiseOperator = /** @class */ (function () {
    function PairwiseOperator(ins) {
        this.ins = ins;
        this.type = 'pairwise';
        this.val = null;
        this.has = false;
        this.out = null;
    }
    PairwiseOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    PairwiseOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.has = false;
        this.out = null;
        this.val = null;
    };
    PairwiseOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        if (this.has) {
            var prev = this.val;
            this.val = t;
            u._n([prev, t]);
        }
        else {
            this.val = t;
            this.has = true;
        }
    };
    PairwiseOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    PairwiseOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        u._c();
    };
    return PairwiseOperator;
}());
/**
 * Group consecutive pairs of events as arrays. Each array has two items.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3-----4-----5--------|
 *       pairwise
 * -------[1,2]-[2,3]-[3,4]-[4,5]----|
 * ```
 *
 * Example:
 *
 * ```js
 * import pairwise from 'xstream/extra/pairwise'
 *
 * const stream = xs.of(1, 2, 3, 4, 5, 6).compose(pairwise)
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > [1,2]
 * > [2,3]
 * > [3,4]
 * > [4,5]
 * > [5,6]
 * > completed
 * ```
 *
 * @return {Stream}
 */
function pairwise(ins) {
    return new index_1.Stream(new PairwiseOperator(ins));
}
exports.default = pairwise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpcndpc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWlyd2lzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUEwQztBQUUxQztJQU1FLDBCQUFtQixHQUFjO1FBQWQsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUwxQixTQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ2pCLFFBQUcsR0FBYSxJQUFJLENBQUM7UUFDckIsUUFBRyxHQUFZLEtBQUssQ0FBQztRQUN0QixRQUFHLEdBQW1CLElBQVcsQ0FBQztJQUd6QyxDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLEdBQW1CO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGdDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQVcsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsNkJBQUUsR0FBRixVQUFHLENBQUk7UUFDTCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBRUQsNkJBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsNkJBQUUsR0FBRjtRQUNFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILGtCQUFvQyxHQUFjO0lBQ2hELE9BQU8sSUFBSSxjQUFNLENBQVMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFGRCwyQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3IsIFN0cmVhbX0gZnJvbSAnLi4vaW5kZXgnO1xuXG5jbGFzcyBQYWlyd2lzZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgW1QsIFRdPiB7XG4gIHB1YmxpYyB0eXBlID0gJ3BhaXJ3aXNlJztcbiAgcHJpdmF0ZSB2YWw6IFQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBoYXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIG91dDogU3RyZWFtPFtULCBUXT4gPSBudWxsIGFzIGFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zOiBTdHJlYW08VD4pIHtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxbVCwgVF0+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5oYXMgPSBmYWxzZTtcbiAgICB0aGlzLm91dCA9IG51bGwgYXMgYW55O1xuICAgIHRoaXMudmFsID0gbnVsbDtcbiAgfVxuXG4gIF9uKHQ6IFQpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgaWYgKHRoaXMuaGFzKSB7XG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy52YWw7XG4gICAgICB0aGlzLnZhbCA9IHQ7XG4gICAgICB1Ll9uKFtwcmV2IGFzIFQsIHRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWwgPSB0O1xuICAgICAgdGhpcy5oYXMgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB1Ll9jKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBHcm91cCBjb25zZWN1dGl2ZSBwYWlycyBvZiBldmVudHMgYXMgYXJyYXlzLiBFYWNoIGFycmF5IGhhcyB0d28gaXRlbXMuXG4gKlxuICogTWFyYmxlIGRpYWdyYW06XG4gKlxuICogYGBgdGV4dFxuICogLS0tMS0tLTItLS0tLTMtLS0tLTQtLS0tLTUtLS0tLS0tLXxcbiAqICAgICAgIHBhaXJ3aXNlXG4gKiAtLS0tLS0tWzEsMl0tWzIsM10tWzMsNF0tWzQsNV0tLS0tfFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHBhaXJ3aXNlIGZyb20gJ3hzdHJlYW0vZXh0cmEvcGFpcndpc2UnXG4gKlxuICogY29uc3Qgc3RyZWFtID0geHMub2YoMSwgMiwgMywgNCwgNSwgNikuY29tcG9zZShwYWlyd2lzZSlcbiAqXG4gKiBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiBpID0+IGNvbnNvbGUubG9nKGkpLFxuICogICBlcnJvcjogZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSxcbiAqICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIGBgYHRleHRcbiAqID4gWzEsMl1cbiAqID4gWzIsM11cbiAqID4gWzMsNF1cbiAqID4gWzQsNV1cbiAqID4gWzUsNl1cbiAqID4gY29tcGxldGVkXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhaXJ3aXNlPFQ+KGluczogU3RyZWFtPFQ+KTogU3RyZWFtPFtULCBUXT4ge1xuICByZXR1cm4gbmV3IFN0cmVhbTxbVCwgVF0+KG5ldyBQYWlyd2lzZU9wZXJhdG9yKGlucykpO1xufVxuIl19