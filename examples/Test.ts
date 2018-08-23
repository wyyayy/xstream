import xs from '../src/index';
import delay from '../src/extra/delay';
import { Listener } from '..';

class Tester
{
  public member1: number = 123;

  public Start()
  {
    // let stream = xs.of(10, 20, 30, 40, 41, 42);

    // stream.addListener({
    //   next: x => 
    //   {
    //     console.log(this.member1);
    //     //console.log(x);
    //   },
    //   error: err => console.error(err),
    //   complete: () => console.log('done'),
    // });

    this.TestLambda(x =>
    {
      console.log(this.member1);
    });

    this.TestLambda(this.TestFunc);

  }

  public TestFunc = ()=>
  {
    console.log(this.member1);
  }

  public TestLambda(func: (v: any) => void)
  {
    func(null);
  }
}

let tester = new Tester();
tester.Start();

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
