## Hyperflow
Modyfiaction of Hyperflow WMS, to be compatible with [Cache Simulator](https://github.com/k-jano/Cache-Simulator)

Instead of job execution, the Hyperflow send messages to the Redis cluster and subscribe for the response messages. There this messages are consumed by Simulator and the response in send back. To adopt any function please see following example of ``command_print`` function

```
const routine = require('../pub_sub/routine');

...

function command_print(ins, outs, context, cb) {
    console.log("Executing", context.appId, context.procId, context.firingId);
    var exec = context.executor.executable,
        args = context.executor.args.join(' ');

    // New behaviour
    routine.routine(ins, outs, context, () => {
        cb(null, outs)
    })

    // Old behaviour
    // setTimeout(function() {
    //     console.log(exec, args);
    //     cb(null, outs);
    // }, 1);
}
```

To run hyperflow
```
yarn hflow
```