import { IsString, Validate } from 'class-validator';
import { TicketValidator } from '../validators/ticket.validator';

export class TicketParamsDto {
  @IsString()
  @Validate(TicketValidator)
  digitableLine: string;
}
