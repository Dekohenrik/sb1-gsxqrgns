export interface Nationality {
  code: string;
  name: string;
  flag: string;
}

export const NATIONALITIES: Nationality[] = [
  { code: 'dk', name: 'Danish', flag: '🇩🇰' },
  { code: 'us', name: 'American', flag: '🇺🇸' },
  { code: 'gb', name: 'British', flag: '🇬🇧' },
  { code: 'se', name: 'Swedish', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  // Add more nationalities as needed
];