import type { WeddingEvent } from '../types';

const formatIsoToUtcCompact = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toISOString().replace(/-|:|\.\d+/g, '');
};

export const getGoogleCalendarUrl = (event: WeddingEvent): string => {
  const startDate = new Date(event.timestamp);
  // Default duration: 2 hours
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const startFormatted = formatIsoToUtcCompact(startDate.toISOString());
  const endFormatted = formatIsoToUtcCompact(endDate.toISOString());

  const title = encodeURIComponent(`Travis & Sayali Wedding: ${event.title}`);
  const details = encodeURIComponent(`${event.description}\n\nAttire: ${event.attire}`);
  const location = encodeURIComponent(`${event.venueName}, Amravati`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}`;
};

export const downloadIcsFile = (event: WeddingEvent): void => {
  const startDate = new Date(event.timestamp);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const startFormatted = formatIsoToUtcCompact(startDate.toISOString());
  const endFormatted = formatIsoToUtcCompact(endDate.toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Travis and Sayali Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:Travis & Sayali: ${event.title}`,
    `DESCRIPTION:${event.description} | Attire: ${event.attire}`,
    `LOCATION:${event.venueName}, Amravati`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-travis-sayali-wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
