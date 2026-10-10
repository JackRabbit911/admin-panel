import { tagPatterns, resolveTag, type TagType, type ApiArg } from './tags';

const getTagInfo = (arg: ApiArg) => {
    if (typeof arg === 'string') return { url: arg, providesTags: undefined, invalidatesTags: undefined };
    return { url: arg.url, providesTags: arg.providesTags, invalidatesTags: arg.invalidatesTags };
};

export const invalidatesTagsFn = () => (_: unknown, __: unknown, arg: ApiArg): TagType[] => {
    const { url, invalidatesTags } = getTagInfo(arg);
    const tag = resolveTag(invalidatesTags, tagPatterns, url);
    return tag ? [tag] : [];
};

export const providesTagsFn = () => (_: unknown, __: unknown, arg: ApiArg): TagType[] => {
    const { url, providesTags } = getTagInfo(arg);
    const tag = resolveTag(providesTags, tagPatterns, url);
    return tag ? [tag] : [];
};
