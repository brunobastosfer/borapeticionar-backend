import {
  BadGatewayException,
  InternalServerErrorException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

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

type SendGridAttachment = {
  content: string;
  filename: string;
  type: string;
  disposition: 'attachment';
};

type SendGridEmail = {
  to: string;
  subject: string;
  html: string;
  attachments?: SendGridAttachment[];
};

type SendGridConfig = {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  supportEmail: string;
};

@Injectable()
export class AuthMailerService {
  private readonly logger = new Logger(AuthMailerService.name);
  private passwordResetTemplate?: string;

  constructor(private readonly configService: ConfigService) {}

  async sendPasswordResetEmail(email: PasswordResetEmail) {
    const sendGridConfig = this.getSendGridConfig();
    const html = this.renderTemplate(this.loadPasswordResetTemplate(), {
      brandIconUrl: this.getBrandIconUrl(),
      recipientName: email.recipientName,
      resetPasswordUrl: email.resetPasswordUrl,
      supportEmail: sendGridConfig.supportEmail,
    });

    await this.sendSendGridEmail(
      {
        to: email.to,
        subject: 'Recuperacao de senha - Bora Peticionar',
        html,
      },
      sendGridConfig,
      'Nao foi possivel enviar o email de recuperacao',
    );
  }

  async sendPetitionPdfEmail(email: PetitionPdfEmail) {
    const sendGridConfig = this.getSendGridConfig();
    const html = this.renderTemplate(
      `
        <p>Ola.</p>
        <p>Segue em anexo o PDF da peticao solicitada no Bora Peticionar.</p>
        <p>Caso tenha duvidas, fale conosco pelo email {{supportEmail}}.</p>
      `,
      {
        supportEmail: sendGridConfig.supportEmail,
      },
    );

    await this.sendSendGridEmail(
      {
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
      },
      sendGridConfig,
      'Nao foi possivel enviar a peticao por email',
    );
  }

  private getSendGridConfig(): SendGridConfig {
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
      throw new InternalServerErrorException(
        'Configuracao do SendGrid incompleta',
      );
    }

    if (!this.isEmail(fromEmail)) {
      throw new InternalServerErrorException(
        'SEND_GRID_MAIL deve ser um email remetente valido',
      );
    }

    const fromName =
      this.normalizeConfigValue(
        this.configService.get<string>('SENDGRID_FROM_NAME'),
      ) || 'Bora Peticionar';
    const supportEmail =
      this.normalizeConfigValue(
        this.configService.get<string>('SUPPORT_EMAIL'),
      ) || fromEmail;

    return { apiKey, fromEmail, fromName, supportEmail };
  }

  private async sendSendGridEmail(
    email: SendGridEmail,
    sendGridConfig: SendGridConfig,
    failureMessage: string,
  ) {
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

      this.logger.error(
        `SendGrid retornou status ${response.status}: ${sendGridError}`,
      );

      throw new BadGatewayException(
        this.buildSendGridExceptionResponse(
          response.status,
          sendGridError,
          sendGridConfig.fromEmail,
          failureMessage,
        ),
      );
    }
  }

  private loadPasswordResetTemplate() {
    if (this.passwordResetTemplate) {
      return this.passwordResetTemplate;
    }

    const possiblePaths = [
      join(__dirname, 'templates', 'password-reset.html'),
      join(process.cwd(), 'src', 'auth', 'templates', 'password-reset.html'),
      join(process.cwd(), 'dist', 'auth', 'templates', 'password-reset.html'),
      join(
        process.cwd(),
        'dist',
        'src',
        'auth',
        'templates',
        'password-reset.html',
      ),
    ];

    const templatePath = possiblePaths.find((path) => existsSync(path));

    if (!templatePath) {
      throw new InternalServerErrorException(
        'Template de recuperacao de senha nao encontrado',
      );
    }

    this.passwordResetTemplate = readFileSync(templatePath, 'utf8');
    return this.passwordResetTemplate;
  }

  private renderTemplate(template: string, variables: Record<string, string>) {
    return Object.entries(variables).reduce(
      (html, [key, value]) =>
        html.replaceAll(`{{${key}}}`, this.escapeHtml(value)),
      template,
    );
  }

  private getBrandIconUrl() {
    const configured = this.configService.get<string>('BRAND_ICON_URL');
    if (configured) return configured;

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    if (!frontendUrl) return '';

    return `${frontendUrl.replace(/\/$/, '')}/favicon.ico`;
  }

  private getConfigValue(keys: string[]) {
    return keys
      .map((key) => this.configService.get<string>(key))
      .map((value) => this.normalizeConfigValue(value))
      .find((value): value is string => Boolean(value));
  }

  private normalizeConfigValue(value?: string) {
    return value?.trim().replace(/^['"]|['"]$/g, '');
  }

  private isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  private async readSendGridError(response: Response) {
    const fallback = response.statusText || 'Erro nao informado pelo SendGrid';

    try {
      const body = await response.text();
      if (!body) return fallback;

      try {
        const parsed = JSON.parse(body) as {
          errors?: Array<{ message?: string; field?: string }>;
          message?: string;
        };

        if (parsed.errors?.length) {
          return parsed.errors
            .map((error) =>
              [error.message, error.field && `field: ${error.field}`]
                .filter(Boolean)
                .join(' '),
            )
            .join('; ');
        }

        if (parsed.message) return parsed.message;
      } catch {
        return body.slice(0, 1000);
      }

      return body.slice(0, 1000);
    } catch {
      return fallback;
    }
  }

  private buildSendGridExceptionResponse(
    sendGridStatus: number,
    sendGridError: string,
    fromEmail: string,
    message: string,
  ) {
    const response: {
      message: string;
      sendGridStatus: number;
      sendGridError: string;
      configuredFromEmail?: string;
      hint?: string;
    } = {
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

  private escapeHtml(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
