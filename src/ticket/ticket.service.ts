import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  async findTicket() {
    return { ticket: 'ticket' };
  }
}
