import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  correctDigitableLine,
  correctResponseValue,
  incorrectDigitableLine,
  incorrectDigitableLineWithWords,
} from 'src/ticket/ticket.mocks';

describe('Ticket-checker (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication().useGlobalPipes(
      new ValidationPipe({
        validateCustomDecorators: true,
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Test e2e for ticket informations', () => {
    it('GET /boleto should show correct informations', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/boleto/${correctDigitableLine}`,
      );

      expect(status).toBe(HttpStatus.OK);
      expect(body).toEqual(correctResponseValue);
    });

    it('GET /boleto should error for incorrect digitable line', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/boleto/${incorrectDigitableLine}`,
      );

      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'Incorrect salary factor.',
        statusCode: 400,
      });
    });

    it('GET /boleto should give an error for the typed line with the wrong size', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/boleto/${correctResponseValue}123456`,
      );

      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'The typeable line of the ticket must have 47 characters.',
        statusCode: 400,
      });
    });

    it('GET /boleto should give error for the typed line containing letters', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/boleto/${incorrectDigitableLineWithWords}`,
      );

      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'The typeable line of the ticket must contain only numbers.',
        statusCode: 400,
      });
    });
  });
});
