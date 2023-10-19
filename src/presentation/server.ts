import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';


export class Server {
    public static start() {
        console.log('Server started...');
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://localhost:3000/posts';
                new CheckService(
                    () => console.log(`${ url } it's ok`),
                    (error) => console.error(error)
                ).execute(url);
            }
        );        
    }
};