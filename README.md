# Walkathon 1.0 Event Website

A single-page event website for RIMT University’s Walkathon 1.0 that showcases event highlights and allows participants to generate downloadable certificates.

## Overview

This project combines two purposes in one static website:

1. an event microsite for presenting Walkathon 1.0
2. a certificate generation tool for participants

The site introduces the event, displays event media, and provides a form where participants can enter their details to generate a personalized certificate.

## What the System Does

- presents Walkathon 1.0 as an environmental awareness event
- shows event photos in a gallery with lightbox viewing
- shows event videos in modal-based playback
- generates participant certificates using a certificate template and canvas rendering
- downloads the generated certificate as a PNG image

## Core Features

### Event Presentation
The homepage communicates the event theme, purpose, and identity through:
- hero section
- event description
- branded footer
- visual styling centered on a green sustainability theme

### Photo Gallery
The gallery displays event images in a masonry-style layout.  
Each image can be opened in a fullscreen modal for closer viewing.

### Video Highlights
The site includes video cards that open embedded Google Drive video previews in a modal.

### Certificate Generation
Participants can:
- enter full name
- enter department
- generate a personalized certificate
- download the final certificate image

The certificate is drawn dynamically on an HTML canvas using a predesigned background template.

## Project Structure

```text
walkathon-mvp-main/
├── index.html              # Page structure and sections
├── style.css               # Global styling and layout
├── script.js               # Interactions, modals, certificate generation
├── api/
│   └── generateSerial.js   # Serverless serial generator (currently unused by frontend)
├── assets/
│   ├── certificate/
│   │   ├── certificate-template.jpeg
│   │   └── certificate-template.png
│   └── images/
│       ├── poster1.jpeg ... poster8.jpg
│       ├── rimt-logo.png
│       ├── video1-thumb.png
│       ├── video2-thumb.png
│       └── video3-thumb.png
Certificate Generation Flow
User input
→ POST request to serial-number endpoint
→ serial number returned
→ certificate template loaded
→ participant name, department, and serial drawn on canvas
→ download enabled
Technical Notes
The site is built with plain HTML, CSS, and JavaScript
Animations use AOS (Animate On Scroll)
Certificate rendering uses the Canvas API
Video playback uses embedded Google Drive preview links
The current frontend uses an external Google Apps Script endpoint for serial generation
Important Implementation Detail

The repository includes api/generateSerial.js, which provides a serial-number API using an in-memory counter.
However, the current frontend does not use this endpoint. Instead, it sends certificate requests to an external Google Apps Script URL.

This means:

serial generation is currently dependent on an external service
the included local API is scaffolded but not integrated into the active flow
Limitations
no participant validation beyond non-empty input fields
certificate generation depends on an external serial service
no persistent participant database in this repository
local/serverless API counter is not globally reliable for production use
no admin interface or certificate record lookup
Use Cases
event showcase microsites
certificate distribution pages
campus or institutional event websites
lightweight static campaign pages with a utility workflow
License

MIT
