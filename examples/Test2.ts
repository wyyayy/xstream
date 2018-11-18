import xs, { RxEvtType } from '../src/index';
import { Subscription } from "../src/index";
import delay from '../src/extra/delay';
import buffer from '../src/extra/buffer';

let stream = xs.periodic(500).endWhen(xs.periodic(2100).take(1));
//let stream = xs.periodic(500).endWhen(xs.periodic(2100));

// let streamTemp = xs.periodic(500);
// streamTemp.subscribe(x => {});
// let stream = streamTemp.endWhen(xs.periodic(2100));

/// xStream和rxjs的最大区别在于，xStream在Compose时，并没有copy一个input的state
/// 这导致当compose后的stream被stop时，按说应该reset input的state，但实际上没有
//let streamTemp = xs.periodic(100);
//streamTemp.subscribe(x => console.log(x));
//let stream = streamTemp.compose(buffer(xs.periodic(550))).take(4);

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
        setTimeout(()=>stream.subscribe(listener), 0);
        //stream.subscribe(listener);
        
        let a = 0;
        a++;
    }
};

subscription = stream.subscribe(listener);

stream.subscribeOf((x: number) =>
{
    console.log(x);
});

// /// Subscribe onComplete
// stream.subscribeOf(() =>
// {
//     console.log("--- End ---");

//     stream.subscribeOf((x: number) =>
//     {
//         console.log(x);
//     });

// }, RxEvtType.Complete);

