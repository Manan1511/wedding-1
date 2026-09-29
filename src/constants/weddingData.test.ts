import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WEDDING_EVENTS } from './weddingData';

describe('wedding schedule', () => {
  it('places the engagement between Haldi and Baraat with its scheduled details', () => {
    const engagementIndex = WEDDING_EVENTS.findIndex((event) => event.id === 'engagement');

    assert.ok(engagementIndex > WEDDING_EVENTS.findIndex((event) => event.id === 'haldi'));
    assert.ok(engagementIndex < WEDDING_EVENTS.findIndex((event) => event.id === 'baraat'));
    const engagement = WEDDING_EVENTS[engagementIndex];

    assert.equal(engagement.id, 'engagement');
    assert.equal(engagement.title, 'Engagement');
    assert.equal(engagement.marathiTitle, 'साखरपुडा');
    assert.equal(engagement.date, 'Wednesday, 25th November 2026');
    assert.equal(engagement.time, '4:30 PM');
    assert.equal(engagement.timestamp, '2026-11-25T16:30:00+05:30');
    assert.equal(engagement.attire, 'Indo-western');
    assert.equal(engagement.iconName, 'engagement');
  });
});
