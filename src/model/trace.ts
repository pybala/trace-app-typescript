
interface Trace {
    start_ts: string;
    end_ts: string;
    trace_id: string;
    service_name: string;
    caller_span: string;
    span: string;
}

interface TraceSpan {
    service: string;
    start: string;
    end: string;
    calls: TraceSpan[];
    caller_span: string;
    span: string;
}

export { Trace, TraceSpan }