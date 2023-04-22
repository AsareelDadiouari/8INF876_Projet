import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'username',
    nullable: false,
    default: '',
  })
  username: string;
  @Column({
    name: 'password',
    nullable: false,
    default: '',
  })
  password: string;
  @Column({
    name: 'role',
    nullable: false,
    default: 'user',
  })
  role: string;

  constructor(username: string, password: string, role: string) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
