import type { CurrentUser } from "store/currentUser/types";

export type LoginSuccess = {
  bearer: string;
  refresh: string;
  user: CurrentUser;
}

export type FormField = {
  status: string;
  value: string;
  message: string;
}

export type LoginFormData = {
  email: FormField;
  password: FormField;
}

