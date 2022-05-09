import { IsString } from 'class-validator';

export class TicketResponseDto {
  @IsString()
  barCode: string;

  @IsString()
  amount: string;

  @IsString()
  expirationDate: string;

  constructor(data: TicketResponseDto) {
    Object.assign(this, data);
  }
}
