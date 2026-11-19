# Amravati Wedding Itinerary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the outdated itinerary with a readable, one-page Amravati wedding schedule and align the site's venue details with the official hotel listing.

**Architecture:** Keep wedding schedule and venue details in `src/constants/weddingData.ts`. Generate a searchable, single-page PDF from those values and the site's existing local illustrations, then place the same PDF at the app's existing download path and under `output/pdf/`.

**Tech Stack:** TypeScript data constants, Python with ReportLab/Pillow/FontTools for PDF creation, PyMuPDF for extraction/render inspection, Vite production build.

**Spec:** `docs/superpowers/specs/2026-11-20-amravati-wedding-itinerary-design.md`

## Global Constraints

- Single-page, tall portrait PDF grouped chronologically under 24, 25, and 26 November 2026.
- Use the site's ivory, antique-gold, and burgundy palette, bundled fonts, and available ceremony illustrations; use typographic medallions where no matching image exists.
- Official address: `NH-6, Nagpur Highway Road, Borgaon (Dharmale), Amravati, Maharashtra 444901`.
- Use the wedding schedule's seven events and the 8:00 AM Baraat time; identify the Varmala venue as `Solitaire 1, Ground Floor`.
- Use a Google Maps search URL based on the official hotel name and address; do not use the hotel's stale embedded map.
- Preserve the supplied source PDF and unrelated existing `tmp/` contents.
- Add no dependencies and make no backend changes.

## Review Focus

- Event order and date grouping: manually inspect extracted PDF text for all seven events under the correct date.
- Schedule accuracy: manually compare each printed time and location with `WEDDING_EVENTS`, especially the 8:00 AM Baraat and Solitaire 1.
- Directions: inspect the visible official address and the PDF link annotation target.
- Page legibility: render the one-page PDF and inspect all text, spacing, contrast, and image crops.
- App integration: confirm the existing download link still points to `public/downloads/wedding-itinerary.pdf` and run a production build. No automated tests are added or run.

---

### Task 1: Align venue data with the official listing

**Files:**
- Modify: `src/constants/weddingData.ts`

**Interfaces:**
- Consumes: the existing `VENUE_ADDRESS`, `VENUE_MAPS_URL`, and `WEDDING_EVENTS` exports.
- Produces: corrected address and Maps search URL for `VenueSection`, plus the official `Solitaire 1` label for the Varmala event.

- [x] Update `VENUE_ADDRESS` to `NH-6, Nagpur Highway Road, Borgaon (Dharmale), Amravati, Maharashtra 444901`.
- [x] Set `VENUE_MAPS_URL` to a Google Maps search URL for Enrise by Sayaji, Amravati, using the official address as its query.
- [x] Change the Varmala event's `venueName` to `Solitaire 1, Ground Floor`; leave its date, time, and other event values unchanged.
- [x] Inspect the changed constants and confirm the display venue and schedule now use the approved values.

### Task 2: Create and integrate the itinerary PDF

**Files:**
- Create: `tmp/pdfs/build_itinerary.py` (temporary generator; remove after producing and checking the PDFs)
- Create: `output/pdf/amravati-wedding-itinerary.pdf`
- Modify: `public/downloads/wedding-itinerary.pdf`

**Interfaces:**
- Consumes: the seven-event schedule and corrected venue values from Task 1; images in `public/images/`; fonts in `public/fonts/`.
- Produces: one searchable PDF, identical at the output and app download paths.

- [x] Build one tall portrait page with day group headings, event title, time, room, and attire for each event.
- [x] Include Enrise by Sayaji, the verified street address, a clickable Maps search link, and the existing RSVP phone number.
- [x] Use available ceremony illustrations; use simple typographic medallions for Baraat and Bidai, which have no matching local event image.
- [x] Include all seven events in chronological order and preserve their displayed names and times from the schedule; use `8:00 AM` for Baraat.
- [x] Write the final PDF under `output/pdf/`, then copy identical bytes to `public/downloads/wedding-itinerary.pdf`. Do not overwrite the supplied personal PDF.

### Task 3: Verify and clean up

**Files:**
- Inspect: `output/pdf/amravati-wedding-itinerary.pdf`
- Inspect: `public/downloads/wedding-itinerary.pdf`
- Remove: temporary render images, converted fonts, and PDF generator under `tmp/pdfs/` after the final render review.

**Interfaces:**
- Consumes: the two generated PDF files from Task 2.
- Produces: a visually checked PDF that is reachable from the app's existing download button.

- [x] Extract PDF text and confirm one page, all seven events, correct dates/times/locations, address, and RSVP number.
- [x] Confirm the Google Maps link annotation uses the intended search URL.
- [x] Render the final page to PNG and inspect text legibility, card spacing, image crops, border alignment, and footer.
- [x] Confirm both PDF copies are byte-identical and the existing app download URL remains unchanged.
- [x] Run `npm run build` to check the TypeScript data edits; do not run the test suite.
- [x] Remove only the temporary files created for this PDF task, preserving unrelated existing `tmp/` content.
