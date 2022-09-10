import logger from './logger_util'
import { Trace, TraceSpan } from '../model/trace'


export default class TraceUtil {

    static format_trace(log: string): any {
        const trace = log.toString().split(/[\s\t]+/)
        const spanPath = trace[4].toString().split(/[\s]*->[\s]*/)

        let traceObj:Trace = {
            start_ts: trace[0],
            end_ts: trace[1],
            trace_id: trace[2],
            service_name: trace[3],
            caller_span: spanPath[0],
            span: spanPath[1],
        }
        return traceObj
    }


    static trace_span(trace_list: any[], caller_span: string): any {
        let traceCalls: Record<string, any>[] = []

        for (let i in trace_list) {
            if (trace_list[i]['caller_span'] == caller_span) {
                let spanCalls: Array<TraceSpan> = TraceUtil.trace_span(trace_list, trace_list[i]['span'])
    
                if (spanCalls.length) {
                    trace_list[i]['calls'] = spanCalls
                }
                traceCalls.push(trace_list[i])
            }
        }
        return traceCalls
    }


    static build_trace(traces: Record<string, any>, traces_withroot: Array<string>): any {
        let traceTreeList: Array<any> = []

        for (let [traceKey, traceData] of Object.entries(traces)) {
            if (traces_withroot.includes(traceKey)) {
                let traceTree = TraceUtil.trace_span(traceData, 'null')
                traceTree = {
                    'id': traceKey,
                    'root': {
                        'service': traceTree[0]['service'],
                        'start': traceTree[0]['start'],
                        'end': traceTree[0]['end'],
                        'calls': traceTree[0]['calls']
                    }
                }
                traceTreeList.push(traceTree)
                logger.info('Trace tree', { trace_id: traceKey, trace_tree: traceTree});
            } else {
                // TODO: write to separate file
                logger.info('Trace root not found', { trace_id: traceKey });
            }
        }

        // console.log( JSON.stringify(traceTreeList) )
    }

    static print_trace(trace_list: Array<Record<string, any>>): any {
        trace_list.forEach(function(traceTree) {
            console.log(traceTree)
            console.log('-----------')
        })

        return true
    }

}