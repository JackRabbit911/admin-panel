type UserProp = {
    own: number;
    total: number;
    allow: boolean;
}

export type Author = {
    id: number;
    alias: string;
}

export type Book = {
    id: number;
    title: string;
}

type UserAuthors = {
    list: Author[];
} & UserProp

type UserBooks = {
    list: Book[];
} & UserProp

export type User = {
    id: number;
    name: string;
    email: string;
    phone?: number | string;
    dob?: string;
    sex?: number;
    created: string;
    role: number | null;
    avatarUrl: string | null;
    authors?: UserAuthors | null;
    books?: UserBooks | null;
    posts?: number;
    comments?: number;
    rating?: number;
}
