import { Controller, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('boleto')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('')
  async findTicket() {
    return this.ticketService.findTicket();
  }
}
