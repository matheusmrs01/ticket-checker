import { IsString } from 'class-validator';

export class TicketResponseDto {
  @IsString()
  barCode: string;

  @IsString()
  amount: number;

  @IsString()
  expirationDate: Date;

  constructor(data: TicketResponseDto) {
    Object.assign(this, data);
  }
}
