import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WEDDING_EVENTS } from './weddingData';

describe('wedding schedule', () => {
  it('uses the wedding itinerary as the ceremony schedule', () => {
    const engagementIndex = WEDDING_EVENTS.findIndex((event) => event.id === 'engagement');

    assert.ok(engagementIndex > WEDDING_EVENTS.findIndex((event) => event.id === 'haldi'));
    assert.ok(engagementIndex < WEDDING_EVENTS.findIndex((event) => event.id === 'baraat'));
    const engagement = WEDDING_EVENTS[engagementIndex];

    assert.equal(engagement.id, 'engagement');
    assert.equal(engagement.title, 'Engagement');
    assert.equal(engagement.marathiTitle, 'साखरपुडा');
    assert.equal(engagement.date, 'Wednesday, 25th November 2026');
    assert.equal(engagement.time, '4:00 PM onwards');
    assert.equal(engagement.timestamp, '2026-11-25T16:00:00+05:30');
    assert.equal(engagement.attire, 'Indo-western');
    assert.equal(engagement.iconName, 'engagement');

    assert.deepEqual(
      WEDDING_EVENTS.map(({ id, time, timestamp }) => ({ id, time, timestamp })),
      [
        { id: 'mehendi', time: '12:00 PM onwards', timestamp: '2026-11-24T12:00:00+05:30' },
        { id: 'haldi', time: '9:00 AM onwards', timestamp: '2026-11-25T09:00:00+05:30' },
        { id: 'engagement', time: '4:00 PM onwards', timestamp: '2026-11-25T16:00:00+05:30' },
        { id: 'baraat', time: '8:00 AM sharp', timestamp: '2026-11-26T08:00:00+05:30' },
        { id: 'varmala', time: '9:30 AM sharp', timestamp: '2026-11-26T09:30:00+05:30' },
        { id: 'pheras', time: '1:30 PM sharp', timestamp: '2026-11-26T13:30:00+05:30' },
        { id: 'bidai', time: '4:30 PM', timestamp: '2026-11-26T16:30:00+05:30' },
      ],
    );
  });
});
