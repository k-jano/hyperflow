const Client = require('./client');

function routine(ins, outs, context, cb) {
    key = `${context.appId}:${context.wfname}:${context.procId - 1}:${context.firingId}`

    const pub = new Client();
    const sub = new Client(key);

    pub.publish(key)
    pub.quit()
    sub.subscribe(cb, outs)
}

module.exports = {
    routine: routine
}