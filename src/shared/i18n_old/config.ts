import { detectLangByAttribute } from "./utils"
// import { detectLangByUri } from "./utils"
import { fetchTranslate } from "./utils"
// import { fetchAllMap } from "./utils"
import type { GetText, TranslateType } from "./types"

const { protocol, hostname } = window.location
const host = `${protocol}//${hostname}`

export const SUPPORTED_LANGS = {
    ru: 'Русский',
    en: 'English',
    de: 'Deutsch',
}
export const DEFAULT_LANG = 'ru'

export const limit = null //cache limit in pairs key-valaue
export const delay = 100 //debounse delay im ms
export const getTranslateUri = `${host}/api/gettranslate`

console.log(getTranslateUri);

export const defaultTranslateKeys = ['Loading', 'Invalid email address', 'Log Out']

export const detectLang = (): string => detectLangByAttribute()
// export const detectLang = (): string => detectLangByUri()

//fetch translate by array keys
export const getTranslate = (lang: string, keys: string[] | null): Promise<TranslateType> => fetchTranslate(lang, keys)

//fetch all translates
// export const getTranslate = (lang: string, keys: null): Promise<TranslateType> => fetchAllMap(lang, keys)

export type Type__ = {
    __: GetText;
}

export type Typet = {
    t: GetText;
}
