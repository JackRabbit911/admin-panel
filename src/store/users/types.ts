export type UsersInfo = {
  total: number;
  list: User[];
}

export type User = {
  id: number;
  name: string;
}

export type UsersPagination = {
  pageNumber: number;
  perPage: number;
}
