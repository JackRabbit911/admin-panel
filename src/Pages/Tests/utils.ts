import { dumpDbUrl, getDropTablesUrl, getTruncateUrl } from "shared/constants";

export type ActionType = 'dump' | 'truncate' | 'drop';

export const actionResolve = (action: ActionType) => {
    switch (action) {
        case 'dump':
            return {
                title: 'Dump',
                message: 'Dump database',
                url: dumpDbUrl,
                messageSuccess: 'The database dump was completed successfully',
            }
        case 'truncate':
            return {
                title: 'Truncate',
                message: 'Selected tables will be truncated!',
                url: getTruncateUrl,
                messageSuccess: 'The selected tables was truncated successfully',
            }
        case 'drop':
            return {
                title: 'Drop',
                message: 'Selected tables will be removed!',
                url: getDropTablesUrl,
                method: 'DELETE',
                messageSuccess: 'The selected tables was removed successfully',
            }
    }
}
