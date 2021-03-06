
class Animal
{
    public age: number;
    public name: string;
}

interface IMap<T>
{
    [key: number]: T;
}

class MyMap<T> implements IMap<T>
{
    [index: string]: T;
}

let myMap = new MyMap<Animal>();
myMap["a"] = new Animal();
let ret = myMap["a"];
console.log(ret);

//let keys: keyof IMap<number> = 1; // string
//let value: IMap<number>['foo'] = 111; // number

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
