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
  createTicket(
    @Body('idUser') idUser: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const ticket = this.ticketService.createTicket(idUser, title, description);
    return ticket;
  }

  @Get()
  getAllTickets() {
    return this.ticketService.getTickets();
  }

  @Get(':ticketId')
  getTicket(@Param('ticketId') ticketId: number) {
    return this.ticketService.getTicket(ticketId);
  }

  @Get('/tickets/:userId')
  getUserTickets(@Param('userId') userId: string) {
    return this.ticketService.getUserTickets(userId);
  }

  @Put(':ticketId')
  updateTicket(
    @Param('ticketId') ticketId: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('state') state: string,
  ) {
    return this.ticketService.updateTicket(ticketId, title, description, state);
  }

  @Delete(':ticketId')
  deleteTicket(@Param('ticketId') ticketId: number) {
    this.ticketService.deleteTicket(ticketId);
  }
}
