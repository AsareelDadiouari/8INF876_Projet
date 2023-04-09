enum Role {
  USER,
  ADMIN
}

export type User = {
  id?: string
  firstName?: string
  lastName?: string
  username: string
  password: string
  role: Role
}
