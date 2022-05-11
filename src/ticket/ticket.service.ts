import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketResponseDto } from './dtos/ticketResponse.dto';

@Injectable()
export class TicketService {
  async getTicketInformation(digitableLine: string) {
    const barCode =
      digitableLine.length === 47
        ? this.getBarCode(digitableLine)
        : this.getBarCodeToDigitableLineWith48Characters(digitableLine);

    const amount = this.getValue(barCode, digitableLine.length);

    const salaryFactor = barCode.substring(5, 9);
    const expirationDate = this.getDueDate(
      parseFloat(salaryFactor),
      digitableLine.length,
    );

    return new TicketResponseDto({
      barCode,
      amount,
      expirationDate,
    });
  }

  private getValue(valueField: string, digitableLineLength: number) {
    const amountValue =
      digitableLineLength == 47
        ? parseFloat(
            valueField.substring(9, 17) + '.' + valueField.substring(17, 19),
          )
        : parseFloat(
            valueField.substring(4, 12) + '.' + valueField.substring(12, 15),
          );
    return amountValue.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }

  private getDueDate(salaryFactorField: number, digitableLineLength: number) {
    if (!salaryFactorField && digitableLineLength == 47) {
      throw new BadRequestException('Incorrect salary factor.');
    } else if (digitableLineLength === 48) {
      return null;
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

  private getBarCodeToDigitableLineWith48Characters(digitableLine: string) {
    const barCode =
      digitableLine.substring(0, 11) +
      digitableLine.substring(12, 23) +
      digitableLine.substring(24, 35) +
      digitableLine.substring(36, 47);
    return barCode;
  }
}
