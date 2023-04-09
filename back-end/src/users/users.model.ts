import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'login',
    nullable: false,
    default: '',
  })
  login: string;
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

  constructor(login: string, password: string, role: string) {
    this.login = login;
    this.password = password;
    this.role = role;
  }
}
