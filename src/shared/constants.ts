//endpoints urls
export const authUrl = '/auth/auth'
export const logoutUrl = '/auth/logout'
export const refreshUrl = '/auth/refresh'
export const getSidebarUrl = '/home/sidebar'
export const getDashboardUrl = '/home/dashboard'
export const getPagesUrl = '/home/pages'
export const getUsersUrl = '/users'

//admin permissions
export const P = {
    ROOT: 255,
    COMMERCE: 1 << 7,
    ADMIN: 1 << 6,
    USERS: 1 << 5,
    DEVELOP: 1 << 4,
    CONTENT: 1 << 3,
    BURIME: 1 << 2,
    SEO: 1 << 1,
    TRANSLATE: 1 << 0,
}
 