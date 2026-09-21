export interface WeddingEvent {
  id: string;
  title: string;
  marathiTitle: string;
  date: string;
  time: string;
  timestamp: string; // ISO 8601 for countdown & calendar
  description: string;
  marathiDescription: string;
  attire: string;
  venueName: string;
  iconName: 'mehendi' | 'haldi' | 'baraat' | 'varmala' | 'pheras' | 'bidai';
}

export interface CoupleDetails {
  groomName: string;
  groomTitle: string;
  groomParents: string;
  brideName: string;
  brideTitle: string;
  brideParents: string;
  weddingDate: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  hostPhone: string;
  displayPhone: string;
}

export interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export interface RSVPFormData {
  guestName: string;
  numberOfGuests: number;
  attendingEvents: string[];
  message: string;
}
