import { BadRequestException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TicketParamsDto } from '../dtos/params.dto';

@ValidatorConstraint({ name: 'customText', async: false })
export class TicketValidator implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    const query = args.object as TicketParamsDto;
    const digitableLineLength = query.digitableLine.length;
    if (digitableLineLength < 47 || digitableLineLength > 48) {
      throw new BadRequestException(
        'The typeable line of the ticket must have 47 or 48 characters.',
      );
    }

    const regexOnlyNumbers = /^[0-9]+$/;
    if (!regexOnlyNumbers.test(query.digitableLine)) {
      throw new BadRequestException(
        'The typeable line of the ticket must contain only numbers.',
      );
    }

    return true;
  }
}
