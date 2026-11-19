# Amravati Wedding Itinerary Design

## Intent

Turn the supplied flattened poster into a clear, shareable, single-page wedding itinerary for Sayali Dharpal and Travis Hale. The existing PDF has a readable schedule structure but rasterized text, an outdated Baraat time, and a room-name mismatch.

## Chosen approach

- Rebuild the poster as a tall, single-page PDF grouped chronologically under 24, 25, and 26 November 2026.
- Use the site's ivory, antique-gold, and burgundy palette, self-hosted fonts, and available ceremony illustrations. Use simple typographic medallions where the site has no matching event image.
- Show the official venue name, address, and a Google Maps search link. The official hotel listing gives `NH-6, Nagpur Highway Road, Borgaon (Dharmale), Amravati, Maharashtra 444901`; its embedded map points to a different property, so the PDF will use a search link based on the official hotel name and address.
- Use the site schedule as the event source: seven events, including Baraat at 8:00 AM and Varmala at Solitaire 1, Ground Floor.
- Replace `public/downloads/wedding-itinerary.pdf` so the existing download button serves the updated itinerary. Also deliver a copy under `output/pdf/` and update the shared venue address, map link, and Varmala room label in `src/constants/weddingData.ts` so the page and PDF agree.
- Keep the source PDF unchanged.

## Alternatives considered

- Retain the photo-collage layout and manually recreate its event panels. This preserves the original mood but keeps the schedule dense and gives fewer cues for scanning by day.
- Rebuild a cleaner, day-grouped schedule with the site's existing visual language. This is the selected option because it improves legibility and aligns the PDF with the invitation site.

## Scope and checks

- No new dependencies or backend changes.
- Check extracted PDF text for all seven events, times, and locations; render the final page and inspect spacing, legibility, and links.
- Preserve the existing unrelated untracked `tmp/` content.
