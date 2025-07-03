import type { LoginFormData } from "store/login/types";

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const isValid = ({ email, password }: LoginFormData): boolean =>
    (EMAIL_REGEXP.test(email.value) && password.value.length > 2)
