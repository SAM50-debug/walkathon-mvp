
---

### Improved `ARCHITECTURE.md`

```markdown
# Architecture

## System Overview

The Walkathon 1.0 project is a static event website with one functional workflow: certificate generation.

The system is composed of three main parts:

1. presentation layer
2. interaction layer
3. certificate generation layer

An additional API file exists for serial generation, but it is not currently part of the live frontend flow.

---

## High-Level Architecture

```text
User
→ Static Website (HTML/CSS/JS)
→ UI Interaction Logic
→ External Serial API (Google Apps Script)
→ Canvas Certificate Rendering
→ PNG Download
