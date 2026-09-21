import type { WeddingEvent, CoupleDetails } from '../types';

export const VENUE_NAME    = 'Enrise by Sayaji, Amravati';
export const VENUE_ADDRESS = 'Badnera Road, near Rajapeth, Amravati, Maharashtra 444601';
export const VENUE_MAPS_URL = 'https://maps.app.goo.gl/7qAekfVEArnXt6XR6';
export const HOST_PHONE    = '918805775117';
export const DISPLAY_PHONE = '+91 88057 75117';

export const COUPLE_DATA: CoupleDetails = {
  groomName:    'Travis Hale',
  groomTitle:   'Groom',
  groomParents: 'Late Mr. Tyrone Duddley Hale and Late Mrs. Janet Tyrone Hale',
  brideName:    'Sayali Dharpal',
  brideTitle:   'Bride',
  brideParents: 'Mr. Narendra Devidasrao Dharpal and Mrs. Meena Narendra Dharpal',
  weddingDate:  '26th November 2026',
  venueName:    VENUE_NAME,
  venueAddress: VENUE_ADDRESS,
  mapsUrl:      VENUE_MAPS_URL,
  hostPhone:    HOST_PHONE,
  displayPhone: DISPLAY_PHONE,
};

export const COPY = {
  families:        'The Dharpal & Hale Families',
  formalLine:      'Cordially Invite You to Join Us for the Wedding Celebrations of',
  withLoveHeading: 'With Love From Us',
  withLoveBody:    "All our favourite people are going to be in one place for one very special weekend, and we couldn't ask for more. Come ready for lots of love, laughter, and memories we'll be talking about for years.",
  blessingClosing: 'With warmth and blessings',
  ganesh:          '॥ श्री गणेशाय नमः ॥',
  subtext:         'अक्षता आणि आशीर्वादासाठी सस्नेह निमंत्रण',
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id:          'mehendi',
    title:       'Mehendi',
    marathiTitle:'मेहंदी',
    date:        'Tuesday, 24th November 2026',
    time:        '10:00 AM onwards',
    timestamp:   '2026-11-24T10:00:00+05:30',
    description: "An afternoon of colours, laughter, and intricate henna art. Come in your brightest outfits and let the stories begin.",
    marathiDescription: 'रंगीबेरंगी मेहंदीच्या सुरांमध्ये एक आनंदाचा सोहळा.',
    attire:      'Bright greens, pinks & festive colours',
    venueName:   VENUE_NAME,
    iconName:    'mehendi',
  },
  {
    id:          'haldi',
    title:       'Haldi',
    marathiTitle:'हळदी',
    date:        'Wednesday, 25th November 2026',
    time:        '9:00 AM onwards',
    timestamp:   '2026-11-25T09:00:00+05:30',
    description: "The most fun you will have getting messy. Wear something you do not mind turning golden, because the haldi will find you.",
    marathiDescription: 'हळदीच्या सोनेरी रंगात रंगूया सर्वांनी मिळून.',
    attire:      'Auspicious yellow & white',
    venueName:   VENUE_NAME,
    iconName:    'haldi',
  },
  {
    id:          'baraat',
    title:       'Baraat',
    marathiTitle:'वरात',
    date:        'Thursday, 26th November 2026',
    time:        '8:30 AM',
    timestamp:   '2026-11-26T08:30:00+05:30',
    description: 'The groom arrives with dhol, dancing, and the whole family riding together. Come join the procession.',
    marathiDescription: 'ढोल-ताशांच्या गजरात नवरदेवाचे भव्य आगमन.',
    attire:      'Royal festive traditional',
    venueName:   VENUE_NAME,
    iconName:    'baraat',
  },
  {
    id:          'varmala',
    title:       'Antarpat & Varmala',
    marathiTitle:'अंतरपाट व वरमाला',
    date:        'Thursday, 26th November 2026',
    time:        '9:30 AM (Shubh Muhurat)',
    timestamp:   '2026-11-26T09:30:00+05:30',
    description: "The moment we've all been waiting for. Watch Travis and Sayali begin their forever in the most beautiful way.",
    marathiDescription: 'मंगलाष्टकांच्या स्वरांमध्ये अंतरपाट हटवून वरमाला अर्पण, शुभमंगल सावधान!',
    attire:      'Traditional Maharashtrian Nauvari / formal ethnic',
    venueName:   VENUE_NAME,
    iconName:    'varmala',
  },
  {
    id:          'pheras',
    title:       'Saptapadi & Pheras',
    marathiTitle:'सप्तपदी आणि फेरे',
    date:        'Thursday, 26th November 2026',
    time:        '12:30 PM',
    timestamp:   '2026-11-26T12:30:00+05:30',
    description: 'Seven steps, seven promises, one eternal bond. Around the sacred fire, a lifetime of togetherness begins.',
    marathiDescription: 'अग्नीदेवतेला साक्षी ठेवून पवित्र सप्तपदी: सात वचने, एक जन्म.',
    attire:      'Paithani saree & silk sherwani',
    venueName:   VENUE_NAME,
    iconName:    'pheras',
  },
  {
    id:          'bidai',
    title:       'Bidai',
    marathiTitle:'पाठवणी',
    date:        'Thursday, 26th November 2026',
    time:        '4:00 PM',
    timestamp:   '2026-11-26T16:00:00+05:30',
    description: 'As the day draws to a close, we bid a loving farewell. Happy tears, warm hugs, and the beginning of a beautiful new chapter.',
    marathiDescription: 'डोळ्यांत सुखाश्रू आणि ओठांवर आशीर्वाद, नव्या आयुष्याचा शुभारंभ.',
    attire:      'Formal wedding elegance',
    venueName:   VENUE_NAME,
    iconName:    'bidai',
  },
];
