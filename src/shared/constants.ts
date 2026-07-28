//endpoints urls
export const authUrl = '/auth/auth'
export const logoutUrl = '/auth/logout'
export const refreshUrl = '/auth/refresh'
export const getSidebarUrl = '/home/sidebar'
export const getDashboardUrl = '/home/dashboard'
export const getPagesUrl = '/home/pages'
export const getUsersUrl = '/users'

//admin permissions
export const P_TRANSLATE = 1 << 0
export const P_SEO = 1 << 1
export const P_BURIME = 1 << 2
export const P_CONTENT = 1 << 3
export const P_DEVELOP = 1 << 4
export const P_USERS = 1 << 5
export const P_ADMIN = 1 << 6
export const P_COMMERCE = 1 << 7
export const P_ROOT = 255
 