import { Injectable } from '@nestjs/common';
import { Logger, LoggerOptions } from 'winston'
import * as winston from 'winston';
@Injectable()
export class LoggerService {

    private readonly logger: Logger;

    private static loggerOption: LoggerOptions = {
        transports: [
            new winston.transports.Console()
        ]
    }
    constructor(private context: string) {
        this.logger = (winston as any).createLogger(
            LoggerService.loggerOption
        )
    }

    log(messege: string) {
        this.logger.warn(messege, {
            context: this.context
        })
    }

    error(messege: string, trace?: any) {
        const currentDate = new Date();
        this.logger.error(`${messege} -> (${trace})`, {
            timestamp: currentDate,
            context: this.context
        })
    }

}
