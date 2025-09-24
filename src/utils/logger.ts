import pino from 'pino';
import pretty from 'pino-pretty';
import {createWriteStream} from 'fs';


const fileStream = createWriteStream('log.txt', {flags: 'a'});
const consoleStream = pretty({colorize: true, destination: process.stdout});
const streams = [
    {
        level: 'debug',
        stream: fileStream
    },
    {
        level: 'info',
        stream: consoleStream
    }]
const logger = pino({level: 'info'}, pino.multistream(streams));

export default class console {
    public static log = (args: any) => logger.info(args);
    public static info = (args: any) => logger.info(args);
    public static warning = (args: any) => logger.warn(args);
    public static error = (args: any) => logger.error(args);
}