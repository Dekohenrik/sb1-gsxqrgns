import { format } from 'date-fns';

export interface SeasonalTheme {
  name: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  isChristmas?: boolean;
}

export const getSeasonalTheme = (date: Date): SeasonalTheme => {
  const month = format(date, 'MMMM').toLowerCase();

  const themes: Record<string, SeasonalTheme> = {
    december: {
      name: 'Christmas',
      backgroundColor: '#fff5f5',
      borderColor: '#e53e3e',
      textColor: '#742a2a',
      isChristmas: true
    },
    january: {
      name: 'Winter',
      backgroundColor: '#f8fafc',
      borderColor: '#64748b',
      textColor: '#334155'
    },
    february: {
      name: 'Winter',
      backgroundColor: '#f1f5f9',
      borderColor: '#94a3b8',
      textColor: '#475569'
    },
    march: {
      name: 'Early Spring',
      backgroundColor: '#f0fdf4',
      borderColor: '#22c55e',
      textColor: '#166534'
    },
    april: {
      name: 'Spring',
      backgroundColor: '#ecfdf5',
      borderColor: '#10b981',
      textColor: '#065f46'
    },
    may: {
      name: 'Late Spring',
      backgroundColor: '#f0fdfa',
      borderColor: '#14b8a6',
      textColor: '#115e59'
    },
    june: {
      name: 'Early Summer',
      backgroundColor: '#fefce8',
      borderColor: '#facc15',
      textColor: '#854d0e'
    },
    july: {
      name: 'Summer',
      backgroundColor: '#fff7ed',
      borderColor: '#f97316',
      textColor: '#9a3412'
    },
    august: {
      name: 'Late Summer',
      backgroundColor: '#fffbeb',
      borderColor: '#f59e0b',
      textColor: '#92400e'
    },
    september: {
      name: 'Early Fall',
      backgroundColor: '#fef3c7',
      borderColor: '#d97706',
      textColor: '#92400e'
    },
    october: {
      name: 'Fall',
      backgroundColor: '#fff7ed',
      borderColor: '#ea580c',
      textColor: '#9a3412'
    },
    november: {
      name: 'Late Fall',
      backgroundColor: '#fef2f2',
      borderColor: '#b91c1c',
      textColor: '#7f1d1d'
    }
  };

  return themes[month] || themes.january;
};