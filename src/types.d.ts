import * as http from 'http';

declare module 'http' {
    export interface IncomingMessage extends http.IncomingMessage {
        params?: Record<string,string>;
    }
}