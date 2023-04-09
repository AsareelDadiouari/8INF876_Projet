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
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const ticket = this.ticketService.createTicket(title, description);
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

  @Put(':ticketId')
  updateUser(
    @Param('ticketId') ticketId: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('state') state: string,
  ) {
    return this.ticketService.updateTicket(ticketId, title, description, state);
  }

  @Delete(':ticketId')
  deleteUser(@Param('ticketId') ticketId: number) {
    this.ticketService.deleteTicket(ticketId);
  }
}