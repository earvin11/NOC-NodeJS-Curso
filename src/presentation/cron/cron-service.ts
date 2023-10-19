import { CronJob } from 'cron';


type CronTime = string | Date;
type OnTick = () => void;


export class CronService {
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
        const job = new CronJob(
            cronTime, // cronTime es el intervalo de tiempo para realizar la tarea
            onTick // la tarea a realizar
        );
        job.start();
        return job;
    }
};