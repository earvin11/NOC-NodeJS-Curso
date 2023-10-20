export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    hight = 'hight'
};

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
};

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor ({ message, level, origin, createdAt = new Date() }: LogEntityOptions) {
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJSON = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);
        const log = new LogEntity({ message, level, origin, createdAt });        
        return log;
    }
};