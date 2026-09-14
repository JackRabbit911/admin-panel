//endpoints urls
export const authUrl = '/auth/auth'
export const logoutUrl = '/auth/logout'
export const refreshUrl = '/auth/refresh'
export const getSidebarUrl = '/home/sidebar'
export const getDashboardUrl = '/home/dashboard'
export const getPagesUrl = '/home/pages'
export const getUsersUrl = '/users'
export const getTablesUrl = '/dev/tables'
export const dumpDbUrl = '/dev/export'
export const getDumpFileName = '/dev/filename'
export const getTruncateUrl = '/dev/truncate'
export const getDropTablesUrl = '/dev/drop'
export const getDumpFilesUrl = '/dev/dumps'
export const sendDumpFileUrl = '/dev/import'
export const getClearUrl = '/dev/clear'
export const getMaintenanceUri = '/dev/maintenance'

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
 