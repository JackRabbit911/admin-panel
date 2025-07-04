const className = 'input'

export const getClassName = (status: string) => {
    switch (status) {
        case 'error':
            return [className + ' input-error', 'text-error']
        case 'warning':
            return [className + ' input-warning', 'text-warning']
        case 'success':
            return [className + ' input-success', 'text-success']
        default:
            return [className, '']
    }
}
