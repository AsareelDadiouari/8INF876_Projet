enum Status {
  PENDING,
  RESOLVED,
  CANCELLED
}

export type Ticket = {
  id: number
  idUser: string
  title: string
  description: string
  state: Status | string
}
