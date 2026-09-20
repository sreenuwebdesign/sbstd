export type Language = 'te' | 'en';

export type DonationPurpose = 
  | 'General Temple Donation'
  | 'Annadanam'
  | 'Pooja & Seva'
  | 'Temple Maintenance'
  | 'Festival Contributions'
  | 'Go Seva'
  | 'Education / Charitable Activities'
  | 'Other';

export interface SevaItem {
  id: string;
  nameEn: string;
  nameTe: string;
  time: string;
  descriptionEn: string;
  descriptionTe: string;
  price: number;
  imageUrl?: string;
  duration?: string;
  devoteesAllowed?: string;
  prasadamEn: string;
  prasadamTe: string;
}

export interface FestivalItem {
  id: string;
  nameEn: string;
  nameTe: string;
  dateEn: string;
  dateTe: string;
  imageUrl: string;
  descriptionEn: string;
  descriptionTe: string;
  highlightsEn: string[];
  highlightsTe: string[];
  auspiciousTithi: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleTe: string;
  category: 'temple' | 'deity' | 'festivals' | 'poojas' | 'decorations' | 'devotees';
  imageUrl: string;
  captionEn: string;
  captionTe: string;
}

export interface DevotionalSloka {
  id: string;
  titleEn: string;
  titleTe: string;
  slokaTe: string;
  slokaEn: string;
  meaningEn: string;
  meaningTe: string;
  deity: string;
}

export interface BhajanItem {
  id: string;
  titleEn: string;
  titleTe: string;
  raga: string;
  lyricsTe: string;
  lyricsEn: string;
  duration: string;
}

export interface TempleAnnouncement {
  id: string;
  date: string;
  titleEn: string;
  titleTe: string;
  contentEn: string;
  contentTe: string;
  isUrgent?: boolean;
}

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  panNumber?: string;
  amount: number;
  purpose: DonationPurpose;
  paymentMethod: 'UPI' | 'Debit Card' | 'Credit Card' | 'Net Banking' | string;
  transactionId: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
