import { TextEncoder, TextDecoder } from "util";
import { ReadableStream } from "web-streams-polyfill";

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.ReadableStream = ReadableStream;