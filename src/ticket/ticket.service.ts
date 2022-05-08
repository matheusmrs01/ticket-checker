import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketResponseDto } from './dtos/ticketResponse.dto';

@Injectable()
export class TicketService {
  async findTicket(digitableLine: string) {
    //TODO: passar a linha digitavel para um barcode
    const salaryFactor = digitableLine.substring(5, 9);
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
}
