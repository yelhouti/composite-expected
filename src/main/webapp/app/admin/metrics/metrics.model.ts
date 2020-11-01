export type MetricsKey = 'jvm' | 'http.server.requests' | 'cache' | 'services' | 'databases' | 'garbageCollector' | 'processMetrics';

export type Metrics = { [key in MetricsKey]: any };

export type Thread = any;

export type ThreadDump = { threads: Thread[] };
