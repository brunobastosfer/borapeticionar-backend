import { ConfigService } from '@nestjs/config';
type PasswordResetEmail = {
    to: string;
    recipientName: string;
    resetPasswordUrl: string;
};
type PetitionPdfEmail = {
    to: string;
    petitionId: string;
    pdfFilename: string;
    pdfBuffer: Buffer;
};
export declare class AuthMailerService {
    private readonly configService;
    private readonly logger;
    private passwordResetTemplate?;
    constructor(configService: ConfigService);
    sendPasswordResetEmail(email: PasswordResetEmail): Promise<void>;
    sendPetitionPdfEmail(email: PetitionPdfEmail): Promise<void>;
    private getSendGridConfig;
    private sendSendGridEmail;
    private loadPasswordResetTemplate;
    private renderTemplate;
    private getBrandIconUrl;
    private getConfigValue;
    private normalizeConfigValue;
    private isEmail;
    private readSendGridError;
    private buildSendGridExceptionResponse;
    private escapeHtml;
}
export {};
