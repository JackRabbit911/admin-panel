export const validation = {
    'name': {
        pattern: {
            value: /^[\p{L}\s\-.]*$/u,
            message: 'The field contains invalid characters',
        }
    },
}
