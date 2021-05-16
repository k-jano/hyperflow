const Client = require('./client');

function routine(ins, outs, context, cb) {
    //TODO validate context.taksId
    //key = `${context.appId}:${context.wfname}:${context.procId - 1}:${context.firingId}`
    key = context.taskId

    const pub = new Client();
    const sub = new Client(key);

    pub.publish(key, ins, outs)
    pub.quit()
    sub.subscribe(cb, outs)
}

module.exports = {
    routine: routine
}