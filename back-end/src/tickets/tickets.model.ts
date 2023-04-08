import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'title',
    nullable: false,
    default: '',
  })
  public title: string;
  @Column({
    name: 'description',
    nullable: true,
    default: '',
  })
  public description: string;
  @Column({
    name: 'state',
    nullable: true,
    default: '',
  })
  public state: string;

  constructor(title: string, description: string, state: string) {
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
