import {Operator, InternalListener, Stream, OutSender, NO_IL} from '../index';

class SeparatorIL<T> implements InternalListener<any>, OutSender<Stream<T>> {
  constructor(public output: Stream<Stream<T>>,
              private op: SplitOperator<T>) {
  }

  _n(t: any) {
    this.op.up();
  }

  _e(err: any) {
    this.output._e(err);
  }

  _c() {
    this.op.curr._c();
    this.output._c();
  }
}

export class SplitOperator<T> implements Operator<T, Stream<T>> {
  public type = 'split';
  public curr: Stream<T> = new Stream<T>();
  public output: Stream<Stream<T>> = null as any;
  private sil: InternalListener<any> = NO_IL; // sil = separator InternalListener

  constructor(public s: Stream<any>, // s = separator
              public input: Stream<T>) {
  }

  _start(out: Stream<Stream<T>>): void {
    this.output = out;
    this.s._add(this.sil = new SeparatorIL<T>(out, this));
    this.input._add(this);
    out._n(this.curr);
  }

  _stop(): void {
    this.input._remove(this);
    this.s._remove(this.sil);
    this.curr = new Stream<T>();
    this.output = null as any;
    this.sil = NO_IL;
  }

  up(): void {
    this.curr._c();
    this.output._n(this.curr = new Stream<T>());
  }

  _n(t: T) {
    if (!this.output) return;
    this.curr._n(t);
  }

  _e(err: any) {
    const u = this.output;
    if (!u) return;
    u._e(err);
  }

  _c() {
    const u = this.output;
    if (!u) return;
    this.curr._c();
    u._c();
  }
}

/**
 * Splits a stream using a separator stream. Returns a stream that emits
 * streams.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--9|
 *  split( --a----b--- )
 * ---------------------------|
 *   :        :    :
 *   1--2--3-|:    :
 *            4--5|:
 *                 -6--7--8--9|
 * ```
 *
 * Example:
 *
 * ```js
 * import split from 'xstream/extra/split'
 * import concat from 'xstream/extra/concat'
 *
 * const source = xs.periodic(50).take(10)
 * const separator = concat(xs.periodic(167).take(2), xs.never())
 * const result = source.compose(split(separator))
 *
 * result.addListener({
 *   next: stream => {
 *     stream.addListener({
 *       next: i => console.log(i),
 *       error: err => console.error(err),
 *       complete: () => console.log('inner completed')
 *     })
 *   },
 *   error: err => console.error(err),
 *   complete: () => console.log('outer completed')
 * })
 * ```
 *
 * ```text
 * > 0
 * > 1
 * > 2
 * > inner completed
 * > 3
 * > 4
 * > 5
 * > inner completed
 * > 6
 * > 7
 * > 8
 * > 9
 * > inner completed
 * > outer completed
 * ```
 *
 * @param {Stream} separator Some other stream that is used to know when to
 * split the output stream.
 * @return {Stream}
 */
export default function split<T>(separator: Stream<any>): (ins: Stream<T>) => Stream<Stream<T>> {
  return function splitOperator(ins: Stream<T>): Stream<Stream<T>> {
    return new Stream<Stream<T>>(new SplitOperator(separator, ins));
  };
}
