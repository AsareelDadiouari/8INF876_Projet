export class Ticket {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public state: string,
  ) {}
}