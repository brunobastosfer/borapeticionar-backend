import { BadGatewayException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthMailerService } from './auth-mailer.service';

describe('AuthMailerService', () => {
  let service: AuthMailerService;
  let configValues: Record<string, string | undefined>;
  const fetchMock = jest.fn();

  beforeEach(() => {
    configValues = {
      SENDGRID_API_KEY: 'SG.test-key',
      SEND_GRID_MAIL: 'no-reply@borapeticionar.com',
      SENDGRID_FROM_EMAIL: 'legacy@borapeticionar.com',
      SENDGRID_FROM_NAME: 'Bora Peticionar',
      FRONTEND_URL: 'https://app.borapeticionar.com',
      SUPPORT_EMAIL: 'suporte@borapeticionar.com',
    };

    fetchMock.mockResolvedValue({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    service = new AuthMailerService({
      get: jest.fn((key: string) => configValues[key]),
    } as unknown as ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send password reset email through SendGrid', async () => {
    await service.sendPasswordResetEmail({
      to: 'usuario@example.com',
      recipientName: 'Usuario Teste',
      resetPasswordUrl:
        'https://app.borapeticionar.com/reset-password?token=abc',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.sendgrid.com/v3/mail/send',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer SG.test-key',
          'Content-Type': 'application/json',
        }),
      }),
    );

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(payload.from).toEqual({
      email: 'no-reply@borapeticionar.com',
      name: 'Bora Peticionar',
    });
    expect(payload.personalizations[0].to).toEqual([
      { email: 'usuario@example.com' },
    ]);
    expect(payload.personalizations[0].subject).toBe(
      'Recuperacao de senha - Bora Peticionar',
    );
    expect(payload.content[0].value).toContain(
      'https://app.borapeticionar.com/reset-password?token=abc',
    );
  });

  it('should send petition PDF email with attachment', async () => {
    const pdfBuffer = Buffer.from('%PDF-1.4');

    await service.sendPetitionPdfEmail({
      to: 'destino@example.com',
      petitionId: 'petition1',
      pdfFilename: 'peticao-petition1.pdf',
      pdfBuffer,
    });

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(payload.personalizations[0].to).toEqual([
      { email: 'destino@example.com' },
    ]);
    expect(payload.personalizations[0].subject).toBe(
      'Peticao petition1 - Bora Peticionar',
    );
    expect(payload.attachments).toEqual([
      {
        content: pdfBuffer.toString('base64'),
        filename: 'peticao-petition1.pdf',
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ]);
  });

  it('should include SendGrid details when provider rejects verified sender', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      text: jest.fn().mockResolvedValue(
        JSON.stringify({
          errors: [
            {
              message:
                'The from address does not match a verified Sender Identity',
              field: 'from.email',
            },
          ],
        }),
      ),
    });

    try {
      await service.sendPasswordResetEmail({
        to: 'usuario@example.com',
        recipientName: 'Usuario Teste',
        resetPasswordUrl: 'https://app.borapeticionar.com/reset-password',
      });
      fail('Expected sendPasswordResetEmail to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(BadGatewayException);
      expect((error as BadGatewayException).getResponse()).toEqual(
        expect.objectContaining({
          message: 'Nao foi possivel enviar o email de recuperacao',
          sendGridStatus: 403,
          configuredFromEmail: 'no-reply@borapeticionar.com',
          hint: expect.stringContaining('SEND_GRID_MAIL'),
        }),
      );
    }
  });

  it('should normalize configured sender email before sending', async () => {
    configValues.SEND_GRID_MAIL = ' No-Reply@BoraPeticionar.COM ';

    await service.sendPetitionPdfEmail({
      to: 'destino@example.com',
      petitionId: 'petition1',
      pdfFilename: 'peticao-petition1.pdf',
      pdfBuffer: Buffer.from('%PDF-1.4'),
    });

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(payload.from.email).toBe('no-reply@borapeticionar.com');
  });

  it('should support legacy SendGrid sender env name', async () => {
    configValues.SEND_GRID_MAIL = undefined;

    await service.sendPetitionPdfEmail({
      to: 'destino@example.com',
      petitionId: 'petition1',
      pdfFilename: 'peticao-petition1.pdf',
      pdfBuffer: Buffer.from('%PDF-1.4'),
    });

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(payload.from.email).toBe('legacy@borapeticionar.com');
  });
});
