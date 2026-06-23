import type { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export const BarnagardColors = {
  background: '#4A90D9',
  tile: '#FFFFFF',
  label: '#4A90D9',
  headerText: '#FFFFFF',
  footerBackground: '#000000',
  footerText: '#FFFFFF',
  footerLink: '#6EB5FF',
  badge: '#E53935',
  screenBackground: '#E9EDF2',
  sectionTitle: '#7A8699',
  card: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#8A96A8',
  textEmail: '#6B8CAE',
  link: '#4A90D9',
  logout: '#D64545',
} as const;

export type DashboardItem = {
  id: string;
  label: string;
  icon: IconName;
  badge?: number;
};

export const dashboardItems: DashboardItem[] = [
  { id: 'nyt-til', label: 'Managerment', icon: 'bell-ring-outline', badge: 1 },
  { id: 'protokol', label: 'Protokol.', icon: 'file-clock-outline' },
  { id: 'kalender', label: 'Kalender.', icon: 'calendar-month-outline' },
  { id: 'beskeder', label: 'Beskeder.', icon: 'send' },
  { id: 'dokument-1', label: 'Document.', icon: 'file-document-outline' },
  { id: 'madplan', label: 'Madplan.', icon: 'room-service-outline' },
  { id: 'sporgesk', label: 'Spørgesk.', icon: 'chart-bar' },
  { id: 'forslag', label: 'Forslag.', icon: 'vote-outline' },
  { id: 'nyt-fra', label: 'Nyt fra .', icon: 'bell-outline' },
  { id: 'medarbej', label: 'Medarbej.', icon: 'account-box-multiple-outline' },
  { id: 'dokument-2', label: 'Dokument.', icon: 'file-multiple-outline' },
  { id: 'feriekal', label: 'Feriekal.', icon: 'beach' },
  { id: 'opgaver', label: 'Opgaver.', icon: 'clipboard-check-outline' },
  { id: 'personal', label: 'Personal.', icon: 'account-group-outline' },
  { id: 'vagtplan', label: 'Vagtplan.', icon: 'calendar-clock-outline' },
];
