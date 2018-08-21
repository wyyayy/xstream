import xs from '../src/index';
import delay from '../src/extra/delay';
import { Listener } from '..';

let stream = xs.of(10, 20, 30, 40, 41, 42);

stream.addListener({
  next: x => 
    {
       console.log(x);
    },
  error: err => console.error(err),
  complete: () => console.log('done'),
});

stream.addListener({
    next: x => 
      {
         console.log(x + 1);
      },
    error: err => console.error(err),
    complete: () => console.log('done'),
  });

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
