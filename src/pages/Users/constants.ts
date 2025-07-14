export const validation = {
    'name': {
        required: 'Part of the username is required',
        pattern: {
            value: /^[\p{L}\s\-.]*$/u,
            message: 'The field contains invalid characters',
        }
    },
}
