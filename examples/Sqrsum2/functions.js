const redis = require("redis");

channel = 'SIMULATOR'
channel_rcv = 'SIMULATOR_RCV'

function sqr(ins, outs, context, cb) {
    console.log("---SQR---")

    const client = redis.createClient();

    key = `${context.appId}:${context.wfname}:${context.procId - 1}`
    client.publish(channel, key)

    client.on("message", function(channel, message) {
        console.log(message);
        console.log(channel);
        outs.square.data = [5]
        cb(null, outs)
    })

    client.subscribe(channel_rcv)
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
