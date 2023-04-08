import {User} from "./user";

enum Status {
  PENDING,
  RESOLVED,
  CANCELLED
}

export type Ticket = {
  id: string
  status: Status
  number: number
  holder: User
}
