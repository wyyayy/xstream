import xs from '../src/index';
import delay from '../src/extra/delay';
import { Listener } from '..';


class AnswerToLifeAndUniverseAndEverything
{
  [Symbol.toPrimitive](hint: any)
  {
    if (hint === 'string')
    {
      return 'Like, 42, man';
    } 
    else if (hint === 'number')
    {
      return 42;
    } 
    else
    {
      // when pushed, most classes (except Date)
      // default to returning a number primitive
      return 42;
    }
  }
}

let answer = new AnswerToLifeAndUniverseAndEverything();
console.log(-answer);
console.log(Number(answer));
console.log('' + answer);
console.log(String(answer));


function Test(p1: any, p2?: any):void
{
  console.log(arguments.length);

}

Test(1);
Test(1, 2);

class MyMatcher
{
  value: any;

  constructor(value: any)
  {
    this.value = value;
  }
  [Symbol.match](string: any) 
  {
    let index = string.indexOf(this.value);
    if (index === -1)
    {
      return null;
    }
    return [this.value];
  }
}
let fooMatcher = 'foobar'.match(new MyMatcher('foo'));
let barMatcher = 'foobar'.match(new MyMatcher('bar'));

//assert.deepEqual(spreadableTest, [1, 2, 3, 4, <Collection>]);

// let producer = 
// {
//     start: function(listener: Listener<string>)
//     {
//         this.id = setInterval(() => listener.next('yo'), 1000);
//     },

//     stop: function()
//     {
//         clearInterval(this.id);
//     },

//     id: 0,
// };

// // This fellow delivers a 'yo' next event every 1 second
// let stream1 = xs.create(producer);
// stream1.subscribe({next: (x)=>
//     {
//         console.log(x);
//     }});

/// --- Override for of with Symbol.iterator
// class Collection 
// {
//     *[Symbol.iterator]()
//     {
//         let i = 0;
//         while (this[i] !== undefined)
//         {
//             yield this[i];
//             ++i;
//         }
//     }
// }
// let myCollection = new Collection();
// myCollection[0] = 1;
// myCollection[1] = 2;
// for (let value of myCollection)
// {
//     console.log(value); // 1, then 2
// }