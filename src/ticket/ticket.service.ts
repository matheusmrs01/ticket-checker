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
    const amountValue = parseFloat(
      valueField.substring(0, 8) + '.' + valueField.substring(8, 10),
    );
    return amountValue.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }

  private getDueDate(salaryFactorField: number) {
    if (!salaryFactorField) {
      throw new BadRequestException('Incorrect salary factor.');
    }

    const baseDueDate = new Date(1997, 10, 7);
    baseDueDate.setDate(baseDueDate.getDate() + salaryFactorField);

    const day = baseDueDate.getDate().toString().padStart(2, '0');
    const month = baseDueDate.getMonth().toString().padStart(2, '0');
    const year = baseDueDate.getFullYear();

    return year + '-' + month + '-' + day;
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
