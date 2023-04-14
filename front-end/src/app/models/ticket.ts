enum Status {
  PENDING,
  RESOLVED,
  CANCELLED
}

export type Ticket = {
  id: string | number
  idUser: string
  title: string
  description: string
  state: Status
}
