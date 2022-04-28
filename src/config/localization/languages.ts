import { Language } from "@kenjiwb/uikit"

export const EN: Language = {
  locale: "en-US",
  language: "English",
  code: "en",
  flag: "/locales/flag/en.svg",
}
export const ID: Language = {
  locale: "id",
  language: "Indonesian",
  code: "id",
  flag: "/locales/flag/id.svg",
}
export const TH: Language = {
  locale: "th",
  language: "Thai",
  code: "th",
  flag: "/locales/flag/th.svg",
}
export const VI: Language = {
  locale: "vi",
  language: "Vietnamese",
  code: "vi",
  flag: "/locales/flag/vi.svg",
}
export const ZHCN: Language = {
  locale: "zh-CN",
  language: "简体中文",
  code: "zh-cn",
  flag: "/locales/flag/zh-cn.svg",
}
export const ZHTW: Language = {
  locale: "zh-TW",
  language: "繁體中文",
  code: "zh-tw",
  flag: "/locales/flag/zh-tw.svg",
}
export const JA: Language = {
  locale: "ja",
  language: "日本",
  code: "ja",
  flag: "/locales/flag/ja.svg",
}

export const KO: Language = {
  locale: "ko",
  language: "한국어",
  code: "ko",
  flag: "/locales/flag/ko.svg",
}

export const languages = {
  "en-US": EN,
  id: ID,
  th: TH,
  vi: VI,
  "zh-CN": ZHCN,
  ja: JA,
  ko: KO,
}

export const languageList = Object.values(languages)
