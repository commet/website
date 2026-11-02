---
name: Yaechan Lee
description: An editorial record of work, evidence, and collaboration.
colors:
  paper: "#f7f6f2"
  ink: "#242a28"
  muted: "#656b65"
  line: "#d5d9cf"
  accent: "#9c3f27"
  tint: "#eceee6"
  dark: "#26352e"
  dark-text: "#f1f2e8"
  dark-muted: "#c5cec3"
  dark-line: "#81917f"
  dark-action: "#e6ecd7"
  evidence-ground: "#e3e8e9"
typography:
  display:
    fontFamily: "Instrument Serif, serif"
    fontWeight: 400
  headline:
    fontFamily: "Pretendard, sans-serif"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Pretendard, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Pretendard, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  text-link:
    fontFamily: "Pretendard, sans-serif"
    fontSize: "14px"
    fontWeight: 550
rounded:
  square: "0"
  circle: "50%"
spacing:
  compact: "12px"
  inline: "20px"
  section: "35px"
  spread: "80px"
components:
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.text-link}"
    padding: "0 0 6px"
  text-link-hover:
    textColor: "{colors.accent}"
  language-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.circle}"
    width: "42px"
    height: "42px"
  language-button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  evidence-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "6px 0"
  evidence-tab-selected:
    textColor: "{colors.ink}"
  event-link:
    backgroundColor: "{colors.dark-action}"
    textColor: "{colors.dark}"
    rounded: "{rounded.square}"
    padding: "15px 20px"
  evidence-frame:
    backgroundColor: "{colors.evidence-ground}"
    rounded: "{rounded.square}"
    width: "100%"
---

# Design System: Yaechan Lee

## Overview

**Creative North Star: "The Editorial Work Record"**

A warm, restrained editorial world gives the work room to be examined. Book-serif names establish identity; Korean and English reading text stays in a quiet sans serif. Hairline divisions and broad margins organize the page without enclosing every thought in a card.

Real project imagery carries its own visual detail and color. The surrounding interface remains calm enough for captions, scope, and context to stay legible. A dark green field and a pale green field provide changes in reading pace within the same flat material language.

**Key Characteristics:**
- Warm paper, charcoal ink, and a restrained rust accent.
- Self-hosted serif identity paired with bilingual sans-serif reading text.
- Square evidence panels, hairline divisions, and open column layouts.
- Visible content, explicit links, and keyboard-readable control states.

Recorded from `src/index.css`, `src/components/Site.jsx`, `src/components/CaseStudy.jsx`, and `src/components/Notes.jsx` for `/`, `/case-study/fsk`, and `/case-study/strix`. Surface sequencing and product claims remain in `PRODUCT.md` and `.impeccable/direction.md`; they are not design tokens.

## Colors

The palette combines warm neutral paper with green-charcoal structure and a single rust interaction accent.

### Primary

- **Rust (`accent`)** marks identity punctuation, the small role dot, selected evidence underlines, ordinary link hover, and focus on light surfaces.

### Neutral

- **Warm Paper (`paper`)** is the page ground.
- **Charcoal Ink (`ink`)** carries headings, reading text, and strong hairlines.
- **Muted Ink (`muted`)** carries supporting prose, captions, and metadata.
- **Paper Rule (`line`)** divides sections and rows.
- **Pale Green (`tint`)** provides a quiet full-width contact field.
- **Forest Ink (`dark`)** provides the dark community field.
- **Dark Text, Dark Muted, and Dark Rule** provide its separate foreground hierarchy.
- **Dark Action** fills the event link and supplies the visible focus outline on the dark field.
- **Evidence Ground** sits behind real screenshots, including contained images with spare space.

**The Quiet Frame Rule.** Keep the surrounding site palette restrained; colors inside genuine project evidence belong to that evidence and need not match the site accent.

## Typography

**Display Font:** Instrument Serif, with serif fallback.  
**Body and Label Font:** Pretendard, with sans-serif fallback. Both primary fonts are self-hosted with swap loading.

The contrast is between bookish Latin identity and clear bilingual reading text. The scale is role-based rather than a mathematical progression. Font weights between regular and semibold use Pretendard's variable range.

### Hierarchy

- **Display:** the shared serif family and regular weight apply to identity and case names. The home name uses `clamp(70px, 8vw, 96px)` with a tight line-height of 0.9; case names use 96px with line-height 1.1. These are surface variants, not one universal display size.
- **Headline:** reading headings generally occupy 26–40px, with medium weight and comfortable line-height. The hero statement uses weight 600 and line-height 1.45; case section headings use 29px and line-height 1.5.
- **Title:** project titles use 31px and weight 550; prose subtitles use 20–21px with more leading. Writing titles use 19px, weight 450, and line-height 1.65.
- **Body:** the frontmatter defines the base reading role. Supporting homepage prose often uses 15px; case prose uses 16px with line-height 1.9. Longer introduction copy is capped at 760px, and evidence descriptions at 560px.
- **Label:** small supporting text is usually 12–14px. The system uses sentence case and normal tracking, with tabular numerals where dates or outcome figures need alignment.

**The Reading Language Rule.** Preserve word boundaries in Korean and explicit whitespace in English when headings reflow. Headings balance their lines; paragraphs can wrap long strings to prevent overflow.

## Layout

The main centered container has a 1280px maximum and 56px side gutters. At 1000px and below, gutters become 32px; at 700px and below, they become 20px. Content sections use generous vertical spacing and recurring 1px horizontal rules. Values are deliberately varied by content density rather than forced onto a single spacing multiple.

Desktop pairs a title or visual with adjacent explanatory copy. Home spreads commonly use equal columns, with 55–80px gaps; case copy uses a narrower heading column and a 100px gap. At 700px and below, these reading spreads become one column. Case metadata remains a compact label/value grid, and case metrics become individual horizontal label/value rows.

Navigation stays visible on mobile. The header reduces from 106px to 78px, with tighter navigation spacing and a 34px language button. The home name becomes `clamp(60px, 16vw, 88px)` with line-height 1; case names become 76px. Supporting mobile body text generally uses 15px.

Evidence spans the reading container. The interactive frame changes from aspect-ratio 2.336 on desktop to 1.58 on mobile while retaining `object-fit: contain`; captions keep a named full-image link. Case figures preserve their natural image ratio. Ordinary project preview imagery uses a 1.75 frame and can crop with `object-fit: cover`.

## Elevation & Depth

There are no box shadows, floating cards, gradients, or simulated material textures in the site chrome. Depth comes from alternating paper, pale green, and forest fields, from screenshot content, and from the distance between text and hairline dividers. Focus outlines are interaction affordances rather than elevation.

**The Flat Surface Rule.** Continue the page through spacing, rules, and tonal fields; keep evidence panels and editorial content flat.

## Shapes

Rectangular image panels and filled action links have square corners. The circular language switch and tiny circular role indicator are functional exceptions to that rectangular field language. Underlines and thin strokes carry control state. Arrow icons are inline stroked SVGs, usually 20px, with smaller caption and index variants.

## Components

### Text links

Quiet, underlined actions are the common navigation primitive. The reusable text link pairs a medium-weight label with an SVG arrow and a hairline lower border. Hover turns the label rust. Focus uses a 2px rust outline with 5px offset; links in the dark field use the pale action color for their outline and a light warm hover color. Hero contact actions share the same visual weight with one another.

### Navigation and language control

The masthead combines a serif wordmark, visible text links, and a circular outlined language button. The language button inverts to ink and paper on hover. It displays the destination language and has a full accessible label. A skip link appears on keyboard focus. No collapsed mobile menu or active-page pill is implemented.

### Evidence viewer

Two text tabs use a 2px rust underline and ink text for selection; inactive tabs remain muted. The selected tab is in the tab order, arrow keys switch tabs, and Home/End select the endpoints. Image, caption, headline, and description change together. The panel can receive keyboard focus. Selection is signaled by both color and the underline.

The incoming image reveals through a short clip animation (380ms with the shared easing curve). Reduced-motion preference removes animation and smooth scrolling. Case pages repeat evidence as ordinary figures with full-image links; the screenshot is never the sole explanation of the work.

### Editorial rows and project containers

Project previews are open articles, with imagery above the title and descriptive copy. Writing is a ruled list with thumbnail, title, source, and external arrow; the source column disappears on mobile. Neither pattern introduces a floating card shell. The Argus typographic panel is a working link with an accessible name and a subtle green hover change; its one-off product colors are not global palette tokens.

### Dark-field action

The event action is a full-width pale rectangle with dark text and a trailing arrow. Its hover becomes white; keyboard focus retains a light outline. The surrounding event information is organized by rules and a compact definition list. This filled treatment belongs to the dark field; ordinary page links remain textual.

### Contact pair and case details

Project and collaboration contact options have matching hierarchy, rules, text size, and email action styling. They sit side by side on desktop and stack on mobile. Case pages use definition lists for responsibility/context and for distinctly labeled figures; captions and implementation scope remain ordinary text. No input, form, chip, modal, or generic card component is implemented.

## Do's and Don'ts

### Do:

- **Do** pair real evidence with readable captions, context, and a named full-image link.
- **Do** use serif identity and sans-serif bilingual reading text for their established roles.
- **Do** retain visible keyboard focus, selected-tab underlines, and reduced-motion behavior.
- **Do** let desktop spreads collapse into a single reading column while preserving whitespace between words.
- **Do** keep the two contact paths equal in hierarchy and visual weight.

### Don't:

- **Don't** add floating card shells, shadows, or rounded screenshot panels to the flat editorial world.
- **Don't** make screenshot text carry information that must be read in surrounding prose.
- **Don't** promote one project's illustration colors or bespoke display size into the shared token system.
- **Don't** invent an input, chip, modal, or button family that the build does not implement.

Not canonized: one-off Argus panel colors, event display sizing, scrollbar/selection colors, and 10–11px ancillary copy are observed details, not reusable system defaults. The small ancillary sizes must not become the default for new reading content.
