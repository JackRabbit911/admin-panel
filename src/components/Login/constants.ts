const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const validation = {
    'email': {
        required: 'Email is required',
        pattern: {
            value: EMAIL_REGEXP,
            message: 'Email is incorrect',
        }
    },
    'password': {
        required: 'Password is required',
        minLength: {
            value: 3,
            message: 'Password too short',
        },
    }
}
