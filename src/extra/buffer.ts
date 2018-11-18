import { Operator, Stream, InternalListener, OutSender, NO_IL } from '../index';

class SeparatorIL<T> implements InternalListener<any>, OutSender<Array<T>> {
  constructor(public output: Stream<Array<T>>, private op: BufferOperator<T>)
  {
  }

  _n(t: any)
  {
    this.op.flush();
  }

  _e(err: any)
  {
    this.output._e(err);
  }

  _c()
  {
    this.op.flush();
    this.output._c();
  }
}

class BufferOperator<T> implements Operator<T, Array<T>> {
  public type = 'buffer';
  public output: Stream<Array<T>> = null as any;
  private sil: InternalListener<any>;
  private acc: Array<T> = [];

  constructor(public s: Stream<any>, public input: Stream<T>)
  {
  }

  flush()
  {
    if (this.acc.length > 0)
    {
      this.output._n(this.acc);
      this.acc = [];
    }
  }

  _start(out: Stream<Array<T>>): void
  {
    this.output = out;
    this.input._add(this);
    this.sil = new SeparatorIL(out, this);
    this.s._add(this.sil);
  }

  _stop(): void
  {
    this.flush();
    this.input._remove(this);
    this.output = null as any;
    this.s._remove(this.sil);
    this.sil = NO_IL;
  }

  _n(t: T)
  {
    this.acc.push(t);
  }

  _e(err: any)
  {
    const u = this.output;
    if (!u) return;
    u._e(err);
  }

  _c()
  {
    const out = this.output;
    if (!out) return;
    this.flush();
    out._c();
  }
}

/**
 * Buffers a stream using a separator stream. Returns a stream that emits
 * arrays.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--9|
 * buffer( -a---------b---------c| )
 * ---------[1,2,3]---[4,5,6]---[7,8,9]|
 * ```
 *
 * Example:
 *
 * ```js
 * import buffer from 'xstream/extra/buffer'
 *
 * const source = xs.periodic(50).take(10);
 * const separator = xs.periodic(170).take(3);
 * const buffered = source.compose(buffer(separator));
 *
 * buffered.addListener({
 *   next: arr => console.log(arr),
 *   error: err => console.error(err)
 * });
 * ```
 *
 * ```text
 * > [0, 1, 2]
 * > [3, 4, 5]
 * > [6, 7, 8]
 * ```
 *
 * @param {Stream} separator Some other stream that is used to know when to
 * split the output stream.
 * @return {Stream}
 */
export default function buffer<T>(s: Stream<any>): (ins: Stream<T>) => Stream<Array<T>>
{
  return function bufferOperator(ins: Stream<T>)
  {
    return new Stream<Array<T>>(new BufferOperator<T>(s, ins));
  };
}
