import xs from '../src/index';
import delay from '../src/extra/delay';

let stream = xs.periodic(1000)
    .compose(delay(1000))
    .filter(i => i % 2 === 0)
    .map(i => i * i)
    .endWhen(xs.periodic(15000).take(1));

// So far, the stream is idle.
// As soon as it gets its first listener, it starts executing.
// stream.addListener({
//     next: i => console.log(i),
//     error: err => console.error(err),
//     complete: () => console.log('completed'),
// });

stream.subscribe(x=>
    {
        console.log(x);
    });

console.log("hahahha!");


// function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][]
// {
//     return names.map(n => o[n]);
// }

// interface Person
// {
//     name: string;
//     age: number;
// }

// let person: Person = {
//     name: 'Jarid',
//     age: 35,
// };

// let props: string[] = pluck(person, ['name']);

// console.log(props);

// function stepTo(value: 1 | 2 | 3 | 4)
// {
//     console.log(value);
// }

// stepTo(2);
