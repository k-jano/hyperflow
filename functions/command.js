const routine = require('../pub_sub/routine');

var spawn = require('cross-spawn'),
    fs = require('fs');

function command(ins, outs, context, cb) {
    var exec = context.executor.executable,
        args = context.executor.args;

    var stdoutStream, stderrStream;

    console.log("Executing:", exec, args);

//    var proc = spawn(exec, [ args ]);
    var proc = spawn(exec,  args );

    if (context.executor.stdout) {
        stdoutStream = fs.createWriteStream(context.executor.stdout, {flags: 'w'});
        proc.stdout.pipe(stdoutStream);
    }

    if (context.executor.stderr) {
        stderrStream = fs.createWriteStream(context.executor.stderr, {flags: 'w'});
        proc.stderr.pipe(stderrStream);
    }
 
    proc.stdout.on('data', function(data) {
        console.log(exec, 'stdout:' + data);
    });

    proc.stderr.on('data', function(data) {
        console.log(exec, 'stderr:' + data);
    });

    proc.on('exit', function(code) {
        console.log(exec, 'exiting with code:' + code);
        cb(null, outs);
    });

    proc.on('close', function (code, signal) {
        console.log(exec, 'terminated due to receipt of signal '+signal);
    });
}

function command_print(ins, outs, context, cb) {
    console.log("Executing", context.appId, context.procId, context.firingId);
    var exec = context.executor.executable
        //args = context.executor.args.join(' ');

    var args = null
    if (context.executor.args) {
        args = context.executor.args.join(' ')
    } else {
        args = ''
    }
    routine.routine(ins, outs, context, () => {
        cb(null, outs)
    })

    // setTimeout(function() {
    //     console.log(exec, args);
    //     cb(null, outs);
    // }, 1);
}

function command_notifyevents(ins, outs, context, cb) {
    var exec = context.executor.executable,
        args = context.executor.args;

    var eventServer = context['eventServer'];
    if(typeof eventServer !== 'undefined' && eventServer) {
        eventServer.emit("trace.job", exec, args);
    } else {
        console.log("loged: " + exec, args);
    }
    cb(null, outs);
}


exports.command = command;
exports.command_print = command_print;
exports.command_notifyevents = command_notifyevents;
