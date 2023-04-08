import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Post()
  insertTickets(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    const ticketId = this.ticketService.insertTicket(name, description);
    return {
      id: ticketId,
    };
  }

  @Get()
  getAllTickets() {
    return this.ticketService.getTickets();
  }

  @Get(':ticketId')
  getTicket(@Param('ticketId') ticketId: string) {
    return this.ticketService.getTicket(ticketId);
  }

  @Put(':ticketId')
  updateUser(
    @Param('ticketId') ticketId: string,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return this.ticketService.updateTicket(ticketId, name, description);
  }

  @Delete(':ticketId')
  deleteUser(@Param('ticketId') ticketId: string) {
    this.ticketService.deleteTicket(ticketId);
  }
}
