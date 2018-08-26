import xs, { RxEvtType } from '../src/index';
import { Subscription } from "../src/index";
import delay from '../src/extra/delay';

//let stream = xs.periodic(500).endWhen(xs.periodic(2100).take(1));
let stream = xs.periodic(500).endWhen(xs.periodic(2100));
//let stream = xs.periodic(500).take(4);
//let stream = xs.of(10, 20, 30, 40);

let subscription: Subscription;

let listener =
{
    next: (x: any) => 
    {
        console.log(x);
        // if (x === 2)
        // {
        //     console.log("reset");
        //     let temp = stream.subscribe(listener);
        //     subscription.unsubscribe();
        //     subscription = temp;
        // }
    },
    complete: () =>
    {
        console.log("complete");
        stream.subscribe(listener);
        let a = 0;
        a++;
    }
};

subscription = stream.subscribe(listener);

// stream.subscribeOf((x: number) =>
// {
//     console.log(x);
// });

// /// Subscribe onComplete
// stream.subscribeOf(() =>
// {
//     console.log("--- End ---");

//     stream.subscribeOf((x: number) =>
//     {
//         console.log(x);
//     });

// }, RxEvtType.Complete);

