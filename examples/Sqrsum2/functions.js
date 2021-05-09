const routine = require('../../pub_sub/routine');

function sqr(ins, outs, context, cb) {
    console.log("---SQR---")

    routine.routine(ins, outs, context, () => {
        outs.square.data = [5]
        cb(null, outs)
    })
}

// stateful function
var cnt=0;
var acc=0.0;
function sum(ins, outs, context, cb) {
    console.log("---SUM---")

    cnt += 1;

    routine.routine(ins, outs, context, () => {
        if (cnt < 3) {
            cb(null, null);
        } else {
            console.log(acc);
            outs.sum.data = [acc];
            cnt = 0; acc = 0;
            cb(null, outs);
        }
    })
}

exports.sqr = sqr;
exports.sum = sum;
