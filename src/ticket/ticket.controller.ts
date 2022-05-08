import { Controller, Get, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketParamsDto } from './dtos/params.dto';

@Controller('boleto')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(':digitableLine')
  async findTicket(@Param() params: TicketParamsDto) {
    return this.ticketService.findTicket(params.digitableLine);
  }
}
