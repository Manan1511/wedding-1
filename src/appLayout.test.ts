import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const appSource = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

describe('invitation layout', () => {
  it('places the itinerary directly after the venue directions', () => {
    const venueIndex = appSource.indexOf('<VenueSection />');
    const itineraryIndex = appSource.indexOf('<ItinerarySection />');

    assert.ok(venueIndex >= 0);
    assert.ok(itineraryIndex > venueIndex);
    assert.doesNotMatch(
      appSource.slice(venueIndex + '<VenueSection />'.length, itineraryIndex),
      /<\w+Section\s*\/>/,
    );
  });
});
