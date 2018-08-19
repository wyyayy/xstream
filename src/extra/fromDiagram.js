"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var DiagramProducer = /** @class */ (function () {
    function DiagramProducer(diagram, opt) {
        this.diagram = diagram.trim();
        this.errorVal = (opt && opt.errorValue) ? opt.errorValue : '#';
        this.timeUnit = (opt && opt.timeUnit) ? opt.timeUnit : 20;
        this.values = (opt && opt.values) ? opt.values : {};
        this.tasks = [];
    }
    DiagramProducer.prototype._start = function (out) {
        var L = this.diagram.length;
        for (var i = 0; i < L; i++) {
            var c = this.diagram[i];
            var time = this.timeUnit * i;
            switch (c) {
                case '-':
                    break;
                case '#':
                    this.schedule({ type: 'error', value: this.errorVal, time: time }, out);
                    break;
                case '|':
                    this.schedule({ type: 'complete', time: time }, out);
                    break;
                default:
                    var val = this.values.hasOwnProperty(c) ? this.values[c] : c;
                    this.schedule({ type: 'next', value: val, time: time }, out);
                    break;
            }
        }
    };
    DiagramProducer.prototype.schedule = function (notification, out) {
        var id = setInterval(function () {
            switch (notification.type) {
                case 'next':
                    out._n(notification.value);
                    break;
                case 'error':
                    out._e(notification.value);
                    break;
                case 'complete':
                    out._c();
                    break;
            }
            clearInterval(id);
        }, notification.time);
    };
    DiagramProducer.prototype._stop = function () {
        this.tasks.forEach(function (id) { return clearInterval(id); });
    };
    return DiagramProducer;
}());
exports.DiagramProducer = DiagramProducer;
/**
 * Creates a real stream out of an ASCII drawing of a stream. Each string
 * character represents an amount of time passed (by default, 20 milliseconds).
 * `-` characters represent nothing special, `|` is a symbol to mark the
 * completion of the stream, `#` is an error on the stream, and any other
 * character is a "next" event.
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 *
 * const stream = fromDiagram('--a--b---c-d--|')
 *
 * stream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * The character `a` represent emission of the event `'a'`, a string. If you
 * want to emit something else than a string, you need to provide those values
 * in the options argument.
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 *
 * const stream = fromDiagram('--a--b---c-d--|', {
 *   values: {a: 10, b: 20, c: 30, d: 40}
 * })
 *
 * stream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * That way, the stream will emit the numbers 10, 20, 30, 40. The `options`
 * argument may also take `timeUnit`, a number to configure how many
 * milliseconds does each represents, and `errorValue`, a value to send out as
 * the error which `#` represents.
 *
 * @factory true
 * @param {string} diagram A string representing a timeline of values, error,
 * or complete notifications that should happen on the output stream.
 * @param options An options object that allows you to configure some additional
 * details of the creation of the stream.
 * @return {Stream}
 */
function fromDiagram(diagram, options) {
    return new index_1.Stream(new DiagramProducer(diagram, options));
}
exports.default = fromDiagram;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbURpYWdyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9tRGlhZ3JhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFvRTtBQWNwRTtJQU9FLHlCQUFZLE9BQWUsRUFDZixHQUF3QjtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsZ0NBQU0sR0FBTixVQUFPLEdBQTBCO1FBQy9CLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsRUFBRTtnQkFDVCxLQUFLLEdBQUc7b0JBQ04sTUFBTTtnQkFDUixLQUFLLEdBQUc7b0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN0RSxNQUFNO2dCQUNSLEtBQUssR0FBRztvQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ25ELE1BQU07Z0JBQ1I7b0JBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzNELE1BQU07YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVPLGtDQUFRLEdBQWhCLFVBQWlCLFlBQTBCLEVBQUUsR0FBMEI7UUFDckUsSUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBQ3JCLFFBQVEsWUFBWSxDQUFDLElBQUksRUFBRTtnQkFDekIsS0FBSyxNQUFNO29CQUNULEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixNQUFNO2dCQUNSLEtBQUssT0FBTztvQkFDVixHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsTUFBTTtnQkFDUixLQUFLLFVBQVU7b0JBQ2IsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNULE1BQU07YUFDVDtZQUNELGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCwrQkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBMURELElBMERDO0FBMURZLDBDQUFlO0FBNEQ1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQUNILHFCQUFvQyxPQUFlLEVBQUUsT0FBNEI7SUFDL0UsT0FBTyxJQUFJLGNBQU0sQ0FBTSxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRkQsOEJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmVhbSwgSW50ZXJuYWxQcm9kdWNlciwgSW50ZXJuYWxMaXN0ZW5lcn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZyb21EaWFncmFtT3B0aW9ucyB7XG4gIHZhbHVlcz86IE9iamVjdDtcbiAgZXJyb3JWYWx1ZT86IGFueTtcbiAgdGltZVVuaXQ/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBOb3RpZmljYXRpb24ge1xuICB0eXBlOiAnbmV4dCcgfCAnZXJyb3InIHwgJ2NvbXBsZXRlJztcbiAgdmFsdWU/OiBhbnk7XG4gIHRpbWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIERpYWdyYW1Qcm9kdWNlciBpbXBsZW1lbnRzIEludGVybmFsUHJvZHVjZXI8YW55PiB7XG4gIHByaXZhdGUgZGlhZ3JhbTogc3RyaW5nO1xuICBwcml2YXRlIHZhbHVlczogT2JqZWN0O1xuICBwcml2YXRlIGVycm9yVmFsOiBhbnk7XG4gIHByaXZhdGUgdGltZVVuaXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSB0YXNrczogQXJyYXk8YW55PjtcblxuICBjb25zdHJ1Y3RvcihkaWFncmFtOiBzdHJpbmcsXG4gICAgICAgICAgICAgIG9wdD86IEZyb21EaWFncmFtT3B0aW9ucykge1xuICAgIHRoaXMuZGlhZ3JhbSA9IGRpYWdyYW0udHJpbSgpO1xuICAgIHRoaXMuZXJyb3JWYWwgPSAob3B0ICYmIG9wdC5lcnJvclZhbHVlKSA/IG9wdC5lcnJvclZhbHVlIDogJyMnO1xuICAgIHRoaXMudGltZVVuaXQgPSAob3B0ICYmIG9wdC50aW1lVW5pdCkgPyBvcHQudGltZVVuaXQgOiAyMDtcbiAgICB0aGlzLnZhbHVlcyA9IChvcHQgJiYgb3B0LnZhbHVlcykgPyBvcHQudmFsdWVzIDoge307XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogSW50ZXJuYWxMaXN0ZW5lcjxhbnk+KSB7XG4gICAgY29uc3QgTCA9IHRoaXMuZGlhZ3JhbS5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBMOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLmRpYWdyYW1baV07XG4gICAgICBjb25zdCB0aW1lID0gdGhpcy50aW1lVW5pdCAqIGk7XG4gICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJyMnOlxuICAgICAgICAgIHRoaXMuc2NoZWR1bGUoe3R5cGU6ICdlcnJvcicsIHZhbHVlOiB0aGlzLmVycm9yVmFsLCB0aW1lOiB0aW1lfSwgb3V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnfCc6XG4gICAgICAgICAgdGhpcy5zY2hlZHVsZSh7dHlwZTogJ2NvbXBsZXRlJywgdGltZTogdGltZX0sIG91dCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc3QgdmFsID0gdGhpcy52YWx1ZXMuaGFzT3duUHJvcGVydHkoYykgPyB0aGlzLnZhbHVlc1tjXSA6IGM7XG4gICAgICAgICAgdGhpcy5zY2hlZHVsZSh7dHlwZTogJ25leHQnLCB2YWx1ZTogdmFsLCB0aW1lOiB0aW1lfSwgb3V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjaGVkdWxlKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLCBvdXQ6IEludGVybmFsTGlzdGVuZXI8YW55Pikge1xuICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc3dpdGNoIChub3RpZmljYXRpb24udHlwZSkge1xuICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICBvdXQuX24obm90aWZpY2F0aW9uLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIG91dC5fZShub3RpZmljYXRpb24udmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb21wbGV0ZSc6XG4gICAgICAgICAgb3V0Ll9jKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICB9LCBub3RpZmljYXRpb24udGltZSk7XG4gIH1cblxuICBfc3RvcCgpIHtcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goaWQgPT4gY2xlYXJJbnRlcnZhbChpZCkpO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHJlYWwgc3RyZWFtIG91dCBvZiBhbiBBU0NJSSBkcmF3aW5nIG9mIGEgc3RyZWFtLiBFYWNoIHN0cmluZ1xuICogY2hhcmFjdGVyIHJlcHJlc2VudHMgYW4gYW1vdW50IG9mIHRpbWUgcGFzc2VkIChieSBkZWZhdWx0LCAyMCBtaWxsaXNlY29uZHMpLlxuICogYC1gIGNoYXJhY3RlcnMgcmVwcmVzZW50IG5vdGhpbmcgc3BlY2lhbCwgYHxgIGlzIGEgc3ltYm9sIHRvIG1hcmsgdGhlXG4gKiBjb21wbGV0aW9uIG9mIHRoZSBzdHJlYW0sIGAjYCBpcyBhbiBlcnJvciBvbiB0aGUgc3RyZWFtLCBhbmQgYW55IG90aGVyXG4gKiBjaGFyYWN0ZXIgaXMgYSBcIm5leHRcIiBldmVudC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgZnJvbURpYWdyYW0gZnJvbSAneHN0cmVhbS9leHRyYS9mcm9tRGlhZ3JhbSdcbiAqXG4gKiBjb25zdCBzdHJlYW0gPSBmcm9tRGlhZ3JhbSgnLS1hLS1iLS0tYy1kLS18JylcbiAqXG4gKiBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiAoeCkgPT4gY29uc29sZS5sb2coeCksXG4gKiAgIGVycm9yOiAoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyciksXG4gKiAgIGNvbXBsZXRlOiAoKSA9PiBjb25zb2xlLmxvZygnY29uY2F0IGNvbXBsZXRlZCcpLFxuICogfSlcbiAqIGBgYFxuICpcbiAqIFRoZSBjaGFyYWN0ZXIgYGFgIHJlcHJlc2VudCBlbWlzc2lvbiBvZiB0aGUgZXZlbnQgYCdhJ2AsIGEgc3RyaW5nLiBJZiB5b3VcbiAqIHdhbnQgdG8gZW1pdCBzb21ldGhpbmcgZWxzZSB0aGFuIGEgc3RyaW5nLCB5b3UgbmVlZCB0byBwcm92aWRlIHRob3NlIHZhbHVlc1xuICogaW4gdGhlIG9wdGlvbnMgYXJndW1lbnQuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGZyb21EaWFncmFtIGZyb20gJ3hzdHJlYW0vZXh0cmEvZnJvbURpYWdyYW0nXG4gKlxuICogY29uc3Qgc3RyZWFtID0gZnJvbURpYWdyYW0oJy0tYS0tYi0tLWMtZC0tfCcsIHtcbiAqICAgdmFsdWVzOiB7YTogMTAsIGI6IDIwLCBjOiAzMCwgZDogNDB9XG4gKiB9KVxuICpcbiAqIHN0cmVhbS5hZGRMaXN0ZW5lcih7XG4gKiAgIG5leHQ6ICh4KSA9PiBjb25zb2xlLmxvZyh4KSxcbiAqICAgZXJyb3I6IChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSxcbiAqICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdjb25jYXQgY29tcGxldGVkJyksXG4gKiB9KVxuICogYGBgXG4gKlxuICogVGhhdCB3YXksIHRoZSBzdHJlYW0gd2lsbCBlbWl0IHRoZSBudW1iZXJzIDEwLCAyMCwgMzAsIDQwLiBUaGUgYG9wdGlvbnNgXG4gKiBhcmd1bWVudCBtYXkgYWxzbyB0YWtlIGB0aW1lVW5pdGAsIGEgbnVtYmVyIHRvIGNvbmZpZ3VyZSBob3cgbWFueVxuICogbWlsbGlzZWNvbmRzIGRvZXMgZWFjaCByZXByZXNlbnRzLCBhbmQgYGVycm9yVmFsdWVgLCBhIHZhbHVlIHRvIHNlbmQgb3V0IGFzXG4gKiB0aGUgZXJyb3Igd2hpY2ggYCNgIHJlcHJlc2VudHMuXG4gKlxuICogQGZhY3RvcnkgdHJ1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRpYWdyYW0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgdGltZWxpbmUgb2YgdmFsdWVzLCBlcnJvcixcbiAqIG9yIGNvbXBsZXRlIG5vdGlmaWNhdGlvbnMgdGhhdCBzaG91bGQgaGFwcGVuIG9uIHRoZSBvdXRwdXQgc3RyZWFtLlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgdGhhdCBhbGxvd3MgeW91IHRvIGNvbmZpZ3VyZSBzb21lIGFkZGl0aW9uYWxcbiAqIGRldGFpbHMgb2YgdGhlIGNyZWF0aW9uIG9mIHRoZSBzdHJlYW0uXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZyb21EaWFncmFtKGRpYWdyYW06IHN0cmluZywgb3B0aW9ucz86IEZyb21EaWFncmFtT3B0aW9ucyk6IFN0cmVhbTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBTdHJlYW08YW55PihuZXcgRGlhZ3JhbVByb2R1Y2VyKGRpYWdyYW0sIG9wdGlvbnMpKTtcbn1cbiJdfQ==