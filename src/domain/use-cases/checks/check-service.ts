import { HttpClinet } from '../../../config/plugins/axios.plugin';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}
    
    async execute(url: string): Promise<boolean> {
        try {
           const req = await HttpClinet.get(url);
           
           if(!req) {
            throw new Error(`Error on check service ${ url }`);
           } 

           const log = new LogEntity({
            message: `Service ${ url } working`,
            level: LogSeverityLevel.low,
            origin: 'check-service.ts'
        });
           
           this.logRepository.saveLog(log);
           this.succesCallback();
           return true;
        } catch (error) {
            const errorMsg = `${url}is not ok ${error}`
            const log = new LogEntity({
                level: LogSeverityLevel.hight,
                message: errorMsg,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);
            this.errorCallback('error');
            return false
        }
    }
};