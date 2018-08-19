import xs from '../src/index';
import delay from '../src/extra/delay';

let stream = xs.periodic(1000)
            .compose(delay(11000))
            .filter(i => i % 2 === 0)
            .map(i => i * i)
            .endWhen(xs.periodic(15000).take(1));

        // So far, the stream is idle.
        // As soon as it gets its first listener, it starts executing.
        stream.addListener({
            next: i => console.log(i),
            error: err => console.error(err),
            complete: () => console.log('completed'),
        });