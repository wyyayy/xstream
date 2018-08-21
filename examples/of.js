var xs = require('../index').default;

var stream = xs.of(10, 20, 30, 40, 41, 42);

stream.addListener({
  next: x => 
    {
       console.log(x)
    },
  error: err => console.error(err),
  complete: () => console.log('done'),
});

stream.addListener({
    next: x => 
      {
         console.log(x + 1)
      },
    error: err => console.error(err),
    complete: () => console.log('done'),
  });
  