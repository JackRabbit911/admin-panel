import { P } from "shared/constants"

export const getDisabled = (adminRole: number, userRole: number) => {
    const allowBan = ((adminRole & P.ADMIN) === P.ADMIN && (userRole < P.ADMIN)) ||
        (adminRole & P.ROOT) === P.ROOT

    const allowAdmin = (((adminRole & P.ADMIN) === P.ADMIN)) && adminRole > userRole

    return {
        disabledAdmin: !allowAdmin,
        disabledRemove: (adminRole & P.ROOT) !== P.ROOT,
        disabledBan: !allowBan,
    }
}

export const getAdminBtnLabel = (userRole: number) => {
    if ((userRole & P.ADMIN) > 0) {
        return 'Change rights'
    }

    return 'Invite to Admin'
}

export const checkBoxDisabled = (value: number, adminRole: number) => value >= adminRole

export const numberToBits = (num: number): boolean[] =>
  Array.from({ length: 8 }, (_, i) => ((num >> (7 - i)) & 1) === 1)

export const bitsToNumber = (bits: boolean[]): number =>
  bits.reduce((acc, bit, i) => (bit ? acc + (1 << (7 - i)) : acc), 0)
