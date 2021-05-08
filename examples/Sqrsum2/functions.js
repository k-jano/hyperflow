const Client = require('../../pub_sub/client');

function sqr(ins, outs, context, cb) {
    console.log("---SQR---")
    // console.log(context)

    key = `${context.appId}:${context.wfname}:${context.procId - 1}:${context.firingId}`

    const pub = new Client();
    const sub = new Client(key);

    pub.publish(key)
    sub.subscribe(cb, outs)

    // var msgCount = 0
    
    // sub.on("message", function(channel, message) {
    //     msgCount += 1
    //     console.log(message);
    //     console.log(channel);
    //     outs.square.data = [5]
    //     cb(null, outs)
        
    //     if(msgCount === 1) {
    //         sub.unsubscribe();
    //         sub.quit();
    //         pub.quit();
    //     }
    // })

    // sub.subscribe(channel_rcv)
}

// stateful function
var cnt=0;
var acc=0.0;
function sum(ins, outs, context, cb) {
    console.log("---SUM---")

    var n=ins[0].data[0];
    acc += n;
    cnt += 1;

    if (cnt < 3) {
        cb(null, null);
    } else {
        console.log(acc);
        outs.sum.data = [acc];
        cnt = 0; acc = 0;
        cb(null, outs);
    }
}

exports.sqr = sqr;
exports.sum = sum;
