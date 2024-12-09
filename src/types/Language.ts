export type Language = 'en' | 'da' | 'en-US';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' }
];