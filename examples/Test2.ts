import xs from '../src/index';
import delay from '../src/extra/delay';


function log(target: any, key: any, descriptor: any)
{
    console.log(`${key} was called!`);
}

class P 
{
    @log
    foo()
    {
        console.log("dddd");
    }
}
const p = new P();
p.foo();

// printed to console :
// foo was called!
// Do something



let sym1 = Symbol();
let sym2 = Symbol();
let obj: any = {};
obj[sym1] = 123;
obj[sym2] = 456;
console.log(obj[sym1]);
console.log(obj[sym2]);


let stream = xs.periodic(500)
    .compose(delay(1000))
    .filter(i => i % 2 === 0)
    .map(i => i * i)
    .endWhen(xs.periodic(5000).take(1));

// So far, the stream is idle.
// As soon as it gets its first listener, it starts executing.
// stream.addListener({
//     next: i => console.log(i),
//     error: err => console.error(err),
//     complete: () => console.log('completed'),
// });

/// Subscribe onNext
stream.subscribe((x: number) =>
{
    console.log(x);
});

/// Subscribe onComplete
stream.subscribe(() =>
{
    console.log("--- End ---");
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
