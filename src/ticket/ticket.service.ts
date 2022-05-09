import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketResponseDto } from './dtos/ticketResponse.dto';

@Injectable()
export class TicketService {
  async findTicket(digitableLine: string) {
    const barCode = this.getBarCode(digitableLine);

    const amount = this.getValue(digitableLine.substring(9, 19));
    const expirationDate = this.getDueDate(parseFloat(salaryFactor));

    return new TicketResponseDto({
      barCode: digitableLine,
      amount,
      expirationDate,
    });
  }

  private getValue(valueField: string) {
    return parseFloat(
      valueField.substring(0, 8) + '.' + valueField.substring(8, 10),
    );
  }

  private getDueDate(salaryFactorField: number) {
    if (!salaryFactorField) {
      throw new BadRequestException('Incorrect salary factor.');
    }

    const baseDueDate = new Date('07-10-1997');
    baseDueDate.setDate(baseDueDate.getDate() + salaryFactorField);
    return baseDueDate;
  }
  private getBarCode(digitableLine: string) {
    const institutionCode = digitableLine.substring(0, 3);
    const currencyCode = digitableLine.substring(3, 4);
    const freeField = digitableLine.substring(4, 9);
    const moreFreeField = digitableLine.substring(10, 20);
    const restOfFreeField = digitableLine.substring(21, 31);
    const dvOfCodeBar = digitableLine.substring(32, 33);
    const salaryFactor = digitableLine.substring(33, 37);
    const amount = digitableLine.substring(37, 47);

    const barCode =
      institutionCode +
      currencyCode +
      dvOfCodeBar +
      salaryFactor +
      amount +
      freeField +
      moreFreeField +
      restOfFreeField;

    return barCode;
  }
}
