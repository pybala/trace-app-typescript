import * as os from 'os'
import * as readline from 'readline'
//import * as crypto from 'crypto'

import TraceUtil from './helpers/trace_util'
import { Trace } from './model/trace'

process.stdin.setEncoding('utf8')

let traces: { [key: string]: any } = {}
let tracesWithRoot: Array<string> = []
let buildTraceCalled: boolean = false


const rl = readline.createInterface(
    process.stdin, process.stdout
)

rl.on('line', (input) => {
    let chunk = input.toString().replace(/[\s\t\n]+$/gi, '');

    if (chunk != '') {
        let traceObj: Trace = TraceUtil.format_trace(chunk)
        //process.stdout.write(`data: ${chunk}`);
        //console.log(traceObj);

        let traceKey = traceObj['trace_id']
        if ( !traces.hasOwnProperty(traceKey) ) {
            traces[traceKey] = []
        }

        traces[traceKey].push({
            'service': traceObj['service_name'],
            'start': traceObj['start_ts'],
            'end': traceObj['end_ts'],
            'span': traceObj['span'],
            'caller_span': traceObj['caller_span'],
        })

        if (traceObj.caller_span == 'null' && !tracesWithRoot.includes(traceKey)) {
            tracesWithRoot.push(traceKey)
        }
    }

    if (chunk.trim() === '' && !buildTraceCalled) {
        TraceUtil.build_trace(traces, tracesWithRoot)
        buildTraceCalled = true
    }
});

rl.on('close', () => {
    if (!buildTraceCalled) {
        TraceUtil.build_trace(traces, tracesWithRoot)
        buildTraceCalled = true
    }
});

process.on('SIGINT', () => {
    if (!buildTraceCalled) {
        TraceUtil.build_trace(traces, tracesWithRoot)
        buildTraceCalled = true
    }
});
process.on('SIGTSTP', () => {
    if (!buildTraceCalled) {
        TraceUtil.build_trace(traces, tracesWithRoot)
        buildTraceCalled = true
    }
});
