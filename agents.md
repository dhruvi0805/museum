# Museum Agent Specification

## Overview
Create an AI assistant agent for the "Timeline of Art Movements" museum website. The agent should support content curation, structured timeline generation, user learning flow, and recommendation of artists/artworks in each era.

## Goals
- Represent the full art history timeline from cave paintings to mid-century modern.
- Focus deeply on Early Modern (1900–1945) and Mid-Century (1945–1970).
- Support learner personas (beginners through enthusiasts).
- Generate concise era summaries, key characteristics, and notable artists/artworks.

## Core Features
1. Timeline Data Generation
   - Produce a structured list of movements with start/end era and key features.
   - Include 3-5 landmark artists and 2-3 representative works for each movement.
   - Add category tags: `ancient`, `medieval`, `early-modern`, `mid-century`, `modernism`, `postmodern`.

2. Content Blocks / Pages
   - Era introduction paragraph (5-7 sentences).
   - “Why it matters” quick bullet section.
   - Visual / style cues (color mood, composition focus, material/technique notes).

3. Artist Deep Dives (~4 idols)
   - Wassily Kandinsky (Abstract Expressionism / Bauhaus context)
   - Claude Monet (Impressionism)
   - László Moholy-Nagy (Constructivism, Bauhaus pedagogy)
   - A classic counterpart (e.g., Michelangelo or Caravaggio for historical contrast)

4. Learning Tools
   - Quick quiz generation (multiple choice, matching, true/false).
   - Glossary terms (e.g., chiaroscuro, impasto, automaatism, synesthesia).
   - “Compare & contrast” action prompts for two movements.

5. UX-focused API interface
   - Provide data endpoints for `GET /api/eras`, `GET /api/artists`, `GET /api/essays`.
   - Avoid direct HTML, return JSON-ready objects for Next.js page rendering.

6. Metadata & SEO
   - Auto-output title and description for each era.
   - Suggested canonical internal nav labels.

## Agent Behavior & Policies
- Always cite trustworthy art history sources; if uncertain, flag as `requires-review`.
- Use friendly, education-first voice; avoid overly academic jargon for beginner mode.
- Highlight connections between art movements and culture/politics.

## Follow-up Questions
1. Which content depth is preferred for a first release? (brief cards only, moderate essays, or full article-length sections)  
2. Do you want a “timeline slider” UI with animation states, or static chronological cards?  
3. Should the agent produce image asset prompts (AI image generation style) or only text-based narrative?  
4. Any technical constraints (runtime, API performance, localization/language support)?  
5. Which era gets the “featured home page slot” on launch? (answer chooses from Early Modern / Mid-Century / Classic)
