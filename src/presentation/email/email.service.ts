import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plungin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
};

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody
            });

            return true;
            
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'logs';
        const htmlBody = `
            <h3>Logs del sistema</h3>
            <p>lorem ipsum lorem</p>
            <p>Ver adjuntos</p>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' }
        ];

        return this.sendEmail({to, subject, htmlBody, attachments})
    }
}