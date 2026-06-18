"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthMailerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
const path_1 = require("path");
let AuthMailerService = AuthMailerService_1 = class AuthMailerService {
    configService;
    logger = new common_1.Logger(AuthMailerService_1.name);
    passwordResetTemplate;
    constructor(configService) {
        this.configService = configService;
    }
    async sendPasswordResetEmail(email) {
        const sendGridConfig = this.getSendGridConfig();
        const html = this.renderTemplate(this.loadPasswordResetTemplate(), {
            brandIconUrl: this.getBrandIconUrl(),
            recipientName: email.recipientName,
            resetPasswordUrl: email.resetPasswordUrl,
            supportEmail: sendGridConfig.supportEmail,
        });
        await this.sendSendGridEmail({
            to: email.to,
            subject: 'Recuperacao de senha - Bora Peticionar',
            html,
        }, sendGridConfig, 'Nao foi possivel enviar o email de recuperacao');
    }
    async sendPetitionPdfEmail(email) {
        const sendGridConfig = this.getSendGridConfig();
        const html = this.renderTemplate(`
        <p>Ola.</p>
        <p>Segue em anexo o PDF da peticao solicitada no Bora Peticionar.</p>
        <p>Caso tenha duvidas, fale conosco pelo email {{supportEmail}}.</p>
      `, {
            supportEmail: sendGridConfig.supportEmail,
        });
        await this.sendSendGridEmail({
            to: email.to,
            subject: `Peticao ${email.petitionId} - Bora Peticionar`,
            html,
            attachments: [
                {
                    content: email.pdfBuffer.toString('base64'),
                    filename: email.pdfFilename,
                    type: 'application/pdf',
                    disposition: 'attachment',
                },
            ],
        }, sendGridConfig, 'Nao foi possivel enviar a peticao por email');
    }
    getSendGridConfig() {
        const apiKey = this.getConfigValue([
            'SENDGRID_API_KEY',
            'SEND_GRID_API_KEY',
            'SENDGRID_APIKEY',
            'SEND_GRID_APIKEY',
        ]);
        const fromEmail = this.getConfigValue([
            'SEND_GRID_MAIL',
            'SENDGRID_FROM_EMAIL',
            'SEND_GRID_FROM_EMAIL',
        ])?.toLowerCase();
        if (!apiKey || !fromEmail) {
            throw new common_1.InternalServerErrorException('Configuracao do SendGrid incompleta');
        }
        if (!this.isEmail(fromEmail)) {
            throw new common_1.InternalServerErrorException('SEND_GRID_MAIL deve ser um email remetente valido');
        }
        const fromName = this.normalizeConfigValue(this.configService.get('SENDGRID_FROM_NAME')) || 'Bora Peticionar';
        const supportEmail = this.normalizeConfigValue(this.configService.get('SUPPORT_EMAIL')) || fromEmail;
        return { apiKey, fromEmail, fromName, supportEmail };
    }
    async sendSendGridEmail(email, sendGridConfig, failureMessage) {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sendGridConfig.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [{ email: email.to }],
                        subject: email.subject,
                    },
                ],
                from: {
                    email: sendGridConfig.fromEmail,
                    name: sendGridConfig.fromName,
                },
                content: [
                    {
                        type: 'text/html',
                        value: email.html,
                    },
                ],
                ...(email.attachments?.length
                    ? { attachments: email.attachments }
                    : {}),
            }),
        });
        if (!response.ok) {
            const sendGridError = await this.readSendGridError(response);
            this.logger.error(`SendGrid retornou status ${response.status}: ${sendGridError}`);
            throw new common_1.BadGatewayException(this.buildSendGridExceptionResponse(response.status, sendGridError, sendGridConfig.fromEmail, failureMessage));
        }
    }
    loadPasswordResetTemplate() {
        if (this.passwordResetTemplate) {
            return this.passwordResetTemplate;
        }
        const possiblePaths = [
            (0, path_1.join)(__dirname, 'templates', 'password-reset.html'),
            (0, path_1.join)(process.cwd(), 'src', 'auth', 'templates', 'password-reset.html'),
            (0, path_1.join)(process.cwd(), 'dist', 'auth', 'templates', 'password-reset.html'),
            (0, path_1.join)(process.cwd(), 'dist', 'src', 'auth', 'templates', 'password-reset.html'),
        ];
        const templatePath = possiblePaths.find((path) => (0, fs_1.existsSync)(path));
        if (!templatePath) {
            throw new common_1.InternalServerErrorException('Template de recuperacao de senha nao encontrado');
        }
        this.passwordResetTemplate = (0, fs_1.readFileSync)(templatePath, 'utf8');
        return this.passwordResetTemplate;
    }
    renderTemplate(template, variables) {
        return Object.entries(variables).reduce((html, [key, value]) => html.replaceAll(`{{${key}}}`, this.escapeHtml(value)), template);
    }
    getBrandIconUrl() {
        const configured = this.configService.get('BRAND_ICON_URL');
        if (configured)
            return configured;
        const frontendUrl = this.configService.get('FRONTEND_URL');
        if (!frontendUrl)
            return '';
        return `${frontendUrl.replace(/\/$/, '')}/favicon.ico`;
    }
    getConfigValue(keys) {
        return keys
            .map((key) => this.configService.get(key))
            .map((value) => this.normalizeConfigValue(value))
            .find((value) => Boolean(value));
    }
    normalizeConfigValue(value) {
        return value?.trim().replace(/^['"]|['"]$/g, '');
    }
    isEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    async readSendGridError(response) {
        const fallback = response.statusText || 'Erro nao informado pelo SendGrid';
        try {
            const body = await response.text();
            if (!body)
                return fallback;
            try {
                const parsed = JSON.parse(body);
                if (parsed.errors?.length) {
                    return parsed.errors
                        .map((error) => [error.message, error.field && `field: ${error.field}`]
                        .filter(Boolean)
                        .join(' '))
                        .join('; ');
                }
                if (parsed.message)
                    return parsed.message;
            }
            catch {
                return body.slice(0, 1000);
            }
            return body.slice(0, 1000);
        }
        catch {
            return fallback;
        }
    }
    buildSendGridExceptionResponse(sendGridStatus, sendGridError, fromEmail, message) {
        const response = {
            message,
            sendGridStatus,
            sendGridError,
        };
        if (sendGridError.toLowerCase().includes('verified sender identity')) {
            response.configuredFromEmail = fromEmail;
            response.hint =
                'O email configurado em SEND_GRID_MAIL precisa estar verificado em Sender Authentication no SendGrid para ser usado como remetente.';
        }
        return response;
    }
    escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
};
exports.AuthMailerService = AuthMailerService;
exports.AuthMailerService = AuthMailerService = AuthMailerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthMailerService);
//# sourceMappingURL=auth-mailer.service.js.map