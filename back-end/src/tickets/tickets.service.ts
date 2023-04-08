import { Injectable } from '@nestjs/common';
import { Ticket } from './tickets.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  createTicket(name: string, description: string) {
    const newTicket = new Ticket(name, description, 'pending');
    this.ticketRepository.save(newTicket);
    return newTicket;
  }

  getTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  getTicket(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id: id } });
  }

  async updateTicket(
    id: number,
    title: string,
    description: string,
    state: string,
  ) {
    const ticket = await this.ticketRepository.findOne({ where: { id: id } });
    ticket.title = title;
    ticket.description = description;
    ticket.state = state;
    await this.ticketRepository.update(id, ticket);
    return ticket;
  }

  async deleteTicket(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
