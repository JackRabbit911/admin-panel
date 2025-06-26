import type { CurrentUser } from "store/currentUser/types";

export type LoginPayload = {
    email: string;
    password: string;
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

