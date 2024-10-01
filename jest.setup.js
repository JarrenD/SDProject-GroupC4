import { TextEncoder, TextDecoder } from "util";
import { ReadableStream } from "web-streams-polyfill";
import 'whatwg-fetch';
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.ReadableStream = ReadableStream;