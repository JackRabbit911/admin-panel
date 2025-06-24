import type { InputStatus } from "./types";

export const inputStatus = (status?: InputStatus) => {
    let className = 'input'
    let message = ''

    if (status) {
        switch (status.status) {
            case 'error':
                className += ' input-error'
                break
            case 'warning':
                className += ' input-warning'
                break
            case 'success':
                className += ' input-success'
                break
        }

        message = status.msg
    }

    return {
        className: className,
        message: message,
    }
}
