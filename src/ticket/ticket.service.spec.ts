import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  correctDigitableLine,
  correctDigitableLineWith48Characters,
  correctResponseValue,
  correctResponseValueForOtherTest,
  incorrectDigitableLine,
} from './ticket.mocks';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TicketService],
      providers: [TicketService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  describe('Test ticket service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should a show ticket informations for digitable line with 47 characters', async () => {
      const result = await service.getTicketInformation(correctDigitableLine);

      expect(result).toEqual(correctResponseValue);
    });

    it('should a show ticket informations for digitable line with 48 characters', async () => {
      const result = await service.getTicketInformation(
        correctDigitableLineWith48Characters,
      );

      expect(result).toEqual(correctResponseValueForOtherTest);
    });

    it('should throw BadRequest error for salary factor incorrect', async () => {
      try {
        await service.getTicketInformation(incorrectDigitableLine);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
