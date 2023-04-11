enum Status {
  PENDING,
  RESOLVED,
  CANCELLED
}

export type Ticket = {
  idUser: string
  title: string
  description: string
  state: Status
}
