import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repostiroy.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const emailService =  new EmailService();

export class Server {
    public static start() {
        console.log('Server started...');
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute('earvinsantiago.11@gmail.com')
        // const emailService = new EmailService(
        //     fileSystemLogRepository
        // )
        // emailService.sendEmail({
        //     to: 'earvinsantiago.11@gmail.com',
        //     subject: 'logs',
        //     htmlBody: `
        //         <h3>Logs del sistema</h3>
        //         <p>lorem ipsum lorem</p>
        //       `
        // })
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://localhost:3000/posts';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } it's ok`),
        //             (error) => console.error(error)
        //         ).execute(url);
        //     }
        // ); 
    }
};