import type { RSVPFormData } from '../types';
import { HOST_PHONE } from '../constants/weddingData';

export const generateWhatsAppRsvpUrl = (
  formData: RSVPFormData,
  hostPhone: string = HOST_PHONE
): string => {
  const name        = formData.guestName.trim();
  const guestCount  = formData.numberOfGuests;
  const events      = formData.attendingEvents.length > 0
    ? formData.attendingEvents.join(', ')
    : 'All celebrations';
  const note        = formData.message.trim();

  const msg =
    `Namaskar! 🙏\n\n` +
    `I'm delighted to confirm my attendance at the wedding of *Sayali Dharpal & Travis Hale*.\n\n` +
    `• *Name:* ${name}\n` +
    `• *Guests:* ${guestCount}\n` +
    `• *Attending:* ${events}` +
    (note ? `\n• *Note:* "${note}"` : '') +
    `\n\nLooking forward to celebrating with the families in Amravati!\n` +
    `॥ शुभ विवाह ॥`;

  return `https://wa.me/${hostPhone}?text=${encodeURIComponent(msg)}`;
};
