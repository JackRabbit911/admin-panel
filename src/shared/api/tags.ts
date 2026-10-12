import { getMaintenanceUri, getUsersUrl } from '../constants';

export const tagPatterns = {
    [getMaintenanceUri]: 'maintenance' as const,
    [getUsersUrl]: 'users' as const,
} as const;

export type TagType = typeof tagPatterns[keyof typeof tagPatterns];

export type ApiArg = 
    | string
    | { url: string; method?: string; body?: unknown; providesTags?: string; invalidatesTags?: string };

export function resolveTag(
    explicitTag: string | undefined,
    patterns: typeof tagPatterns,
    url: string | undefined
): TagType | undefined {
    if (!url) return undefined;
    if (explicitTag) return explicitTag as TagType;
    for (const [pattern, tag] of Object.entries(patterns) as [string, TagType][]) {
        if (url.startsWith(pattern)) return tag;
    }
    return undefined;
}
