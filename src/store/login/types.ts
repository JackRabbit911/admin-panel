export type LoginPayload = {
    email: string;
    password: string;
};

export type CurrentUser = {
    id: number;
    name: string;
};

export type LoginError = {
   email: {
    status: string;
    msg: string;
  };
  password: {
    status: string;
    msg: string;
  };
}

export type LoginSuccess = {
  bearer: string;
  refresh: string;
  user: CurrentUser;
}

