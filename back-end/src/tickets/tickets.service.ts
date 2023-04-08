import { Injectable } from '@nestjs/common';
import { Ticket } from './tickets.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  insertTicket(name: string, description: string) {
    const id = uuidv4();
    const newTicket = new Ticket(id, name, description, 'user');
    this.tickets.push(newTicket);
    return id;
  }

  getTickets() {
    return [...this.tickets];
  }

  getTicket(id: string) {
    return this.getTicketById(id)[0];
  }

  updateTicket(id: string, login: string, password: string) {
    const [targetTicket, index] = this.getTicketById(id);
    const nup = { ...targetTicket, login, password };
    const newTicket = new Ticket(id, nup.login, nup.password, nup.state);
    this.tickets[index] = newTicket;
    return newTicket;
  }

  deleteTicket(id: string) {
    const [_, index] = this.getTicketById(id);
    this.tickets.splice(index, 1);
  }

  private getTicketById(id: string): [Ticket, number] {
    const index = this.tickets.findIndex((t) => t.id == id);
    return [this.tickets[index], index];
  }
}
