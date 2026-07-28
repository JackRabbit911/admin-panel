import { P_ADMIN, P_ROOT } from "shared/constants"

export const getDisabled = (adminRole: number, userRole: number) => {
    const allowBan = ((adminRole & P_ADMIN) === P_ADMIN && (userRole < P_ADMIN)) ||
        (adminRole & P_ROOT) === P_ROOT

    const allowAdmin = (((adminRole & P_ADMIN) === P_ADMIN)) && adminRole > userRole

    return {
        disabledAdmin: !allowAdmin,
        disabledRemove: (adminRole & P_ROOT) !== P_ROOT,
        disabledBan: !allowBan,
    }
}

export const getAdminBtnLabel = (userRole: number) => {
    if ((userRole & P_ADMIN) > 0) {
        return 'Change rights'
    }

    return 'Invite to Admin'
}
