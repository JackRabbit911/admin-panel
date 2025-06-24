export type LoginPayload = {
    email: string;
    password: string;
};

export type CurrentUser = {
    id: number;
    name: string;
};

export type LoginValidationError = {
   email: {
    status: string;
    msg: string;
  };
  password: {
    status: string;
    msg: string;
  };
}

export type LoginError = {
  success: false;
} & LoginValidationError

export type LoginSuccess = {
  Bearer: string;
  Refresh: string;
  user: CurrentUser;
  success: true;
}

export type TryLoginResponse = LoginError | LoginSuccess;

