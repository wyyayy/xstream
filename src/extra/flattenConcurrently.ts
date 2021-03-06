import {Operator, Stream, OutSender, InternalListener} from '../index';

class FCIL<T> implements InternalListener<T>, OutSender<T> {
  constructor(public output: Stream<T>,
              private op: FlattenConcOperator<T>) {
  }

  _n(t: T) {
    this.output._n(t);
  }

  _e(err: any) {
    this.output._e(err);
  }

  _c() {
    this.op.less();
  }
}

export class FlattenConcOperator<T> implements Operator<Stream<T>, T> {
  public type = 'flattenConcurrently';
  private active: number = 1; // number of outers and inners that have not yet ended
  public output: Stream<T> = null as any;

  constructor(public input: Stream<Stream<T>>) {
  }

  _start(out: Stream<T>): void {
    this.output = out;
    this.input._add(this);
  }

  _stop(): void {
    this.input._remove(this);
    this.active = 1;
    this.output = null as any;
  }

  less(): void {
    if (--this.active === 0) {
      const u = this.output;
      if (!u) return;
      u._c();
    }
  }

  _n(s: Stream<T>) {
    const u = this.output;
    if (!u) return;
    this.active++;
    s._add(new FCIL(u, this));
  }

  _e(err: any) {
    const u = this.output;
    if (!u) return;
    u._e(err);
  }

  _c() {
    this.less();
  }
}

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
export default function flattenConcurrently<T>(ins: Stream<Stream<T>>): Stream<T> {
  return new Stream<T>(new FlattenConcOperator(ins));
}
